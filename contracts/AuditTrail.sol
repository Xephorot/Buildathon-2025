// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./AccessControl.sol";
import "./MedicalRecords.sol";

/**
 * @title AuditTrail
 * @dev Contract for immutable audit logging of all system activities
 * Provides compliance logging for medical record access and permission changes
 */
contract AuditTrail {
    // Enums for different types of audit events
    enum AuditAction {
        ACCESS_GRANTED,
        ACCESS_REVOKED,
        DOCUMENT_ACCESSED,
        DOCUMENT_CREATED,
        DOCUMENT_UPDATED,
        DOCUMENT_DEACTIVATED,
        PERMISSION_CHECKED,
        ENTITY_REGISTERED
    }

    // Struct to store audit log entries
    struct AuditEntry {
        uint256 id;
        address actor; // Who performed the action
        address target; // Who/what was affected (patient, document owner, etc.)
        AuditAction action;
        uint256 documentId; // 0 if not document-related
        string details; // Additional context or metadata
        uint256 timestamp;
        bytes32 dataHash; // Hash of relevant data for integrity verification
    }

    // Contract state
    AccessControl public accessControl;
    MedicalRecords public medicalRecords;
    uint256 private nextAuditId;

    // Mappings
    mapping(uint256 => AuditEntry) public auditEntries;
    mapping(address => uint256[]) public actorAuditTrail; // actor => audit entry IDs
    mapping(address => uint256[]) public targetAuditTrail; // target => audit entry IDs
    mapping(uint256 => uint256[]) public documentAuditTrail; // documentId => audit entry IDs
    mapping(AuditAction => uint256[]) public actionAuditTrail; // action => audit entry IDs

    // Daily activity counters for compliance reporting
    mapping(uint256 => uint256) public dailyActivityCount; // day (timestamp / 86400) => count

    // Events
    event AuditLogCreated(
        uint256 indexed auditId,
        address indexed actor,
        address indexed target,
        AuditAction action,
        uint256 documentId,
        uint256 timestamp
    );

    event ComplianceAlert(
        address indexed entity,
        string alertType,
        string description,
        uint256 timestamp
    );

    // Modifiers
    modifier onlyAuthorizedContracts() {
        require(
            msg.sender == address(accessControl) ||
                msg.sender == address(medicalRecords) ||
                msg.sender == address(this),
            "AuditTrail: Only authorized contracts can create audit logs"
        );
        _;
    }

    modifier onlyAuditor() {
        require(
            accessControl.getEntityType(msg.sender) ==
                AccessControl.EntityType.AUDITOR,
            "AuditTrail: Only auditors can perform this action"
        );
        _;
    }

    modifier validAuditId(uint256 _auditId) {
        require(
            _auditId > 0 && _auditId < nextAuditId,
            "AuditTrail: Invalid audit ID"
        );
        _;
    }

    /**
     * @dev Constructor
     * @param _accessControl Address of the AccessControl contract
     */
    constructor(address _accessControl) {
        require(
            _accessControl != address(0),
            "AuditTrail: Invalid AccessControl address"
        );
        accessControl = AccessControl(_accessControl);
        nextAuditId = 1; // Start audit IDs from 1
    }

    /**
     * @dev Set the MedicalRecords contract address (called after deployment)
     * @param _medicalRecords Address of the MedicalRecords contract
     */
    function setMedicalRecordsContract(address _medicalRecords) external {
        require(
            address(medicalRecords) == address(0),
            "AuditTrail: MedicalRecords already set"
        );
        require(
            _medicalRecords != address(0),
            "AuditTrail: Invalid MedicalRecords address"
        );
        medicalRecords = MedicalRecords(_medicalRecords);
    }

    /**
     * @dev Log an access event (reading/viewing of medical records)
     * @param _patient Address of the patient whose records were accessed
     * @param _accessor Address of the entity accessing the records
     * @param _documentId ID of the accessed document (0 if general access)
     * @param _accessType Type of access performed
     * @param _purpose Purpose or context of the access
     */
    function logAccess(
        address _patient,
        address _accessor,
        uint256 _documentId,
        string calldata _accessType,
        string calldata _purpose
    ) external onlyAuthorizedContracts {
        string memory details = string(
            abi.encodePacked(
                "AccessType: ",
                _accessType,
                ", Purpose: ",
                _purpose
            )
        );

        bytes32 dataHash = keccak256(
            abi.encodePacked(
                _patient,
                _accessor,
                _documentId,
                _accessType,
                _purpose,
                block.timestamp
            )
        );

        _createAuditEntry(
            _accessor,
            _patient,
            AuditAction.DOCUMENT_ACCESSED,
            _documentId,
            details,
            dataHash
        );

        // Check for suspicious activity patterns
        _checkSuspiciousActivity(_accessor, _patient);
    }

    /**
     * @dev Log a permission change event
     * @param _patient Address of the patient
     * @param _entity Address of the entity whose permissions changed
     * @param _action Whether access was granted or revoked
     * @param _accessType Type of access granted/revoked
     * @param _expiresAt Expiration timestamp (for grants)
     */
    function logPermissionChange(
        address _patient,
        address _entity,
        string calldata _action, // "GRANTED" or "REVOKED"
        string calldata _accessType,
        uint256 _expiresAt
    ) external onlyAuthorizedContracts {
        AuditAction action = keccak256(bytes(_action)) ==
            keccak256(bytes("GRANTED"))
            ? AuditAction.ACCESS_GRANTED
            : AuditAction.ACCESS_REVOKED;

        string memory details = string(
            abi.encodePacked(
                "AccessType: ",
                _accessType,
                _expiresAt > 0
                    ? string(
                        abi.encodePacked(", ExpiresAt: ", _uint2str(_expiresAt))
                    )
                    : ", No Expiration"
            )
        );

        bytes32 dataHash = keccak256(
            abi.encodePacked(
                _patient,
                _entity,
                _action,
                _accessType,
                _expiresAt,
                block.timestamp
            )
        );

        _createAuditEntry(
            _patient, // Patient is the actor for permission changes
            _entity, // Entity is the target
            action,
            0, // No specific document
            details,
            dataHash
        );
    }

    /**
     * @dev Log a document operation (create, update, deactivate)
     * @param _actor Address performing the action
     * @param _patient Address of the patient (document owner)
     * @param _documentId ID of the document
     * @param _action Type of document action
     * @param _details Additional details about the operation
     */
    function logDocumentOperation(
        address _actor,
        address _patient,
        uint256 _documentId,
        string calldata _action,
        string calldata _details
    ) external onlyAuthorizedContracts {
        AuditAction auditAction;

        if (keccak256(bytes(_action)) == keccak256(bytes("CREATED"))) {
            auditAction = AuditAction.DOCUMENT_CREATED;
        } else if (keccak256(bytes(_action)) == keccak256(bytes("UPDATED"))) {
            auditAction = AuditAction.DOCUMENT_UPDATED;
        } else if (
            keccak256(bytes(_action)) == keccak256(bytes("DEACTIVATED"))
        ) {
            auditAction = AuditAction.DOCUMENT_DEACTIVATED;
        } else {
            revert("AuditTrail: Invalid document action");
        }

        bytes32 dataHash = keccak256(
            abi.encodePacked(
                _actor,
                _patient,
                _documentId,
                _action,
                _details,
                block.timestamp
            )
        );

        _createAuditEntry(
            _actor,
            _patient,
            auditAction,
            _documentId,
            _details,
            dataHash
        );
    }

    /**
     * @dev Get audit trail for a specific entity (as actor)
     * @param _entity Address of the entity
     * @param _fromIndex Starting index for pagination
     * @param _limit Maximum number of entries to return
     * @return Array of audit entry IDs
     */
    function getAuditTrail(
        address _entity,
        uint256 _fromIndex,
        uint256 _limit
    ) external view onlyAuditor returns (uint256[] memory) {
        uint256[] storage trail = actorAuditTrail[_entity];
        uint256 endIndex = _fromIndex + _limit;
        if (endIndex > trail.length) {
            endIndex = trail.length;
        }

        uint256[] memory result = new uint256[](endIndex - _fromIndex);
        for (uint256 i = _fromIndex; i < endIndex; i++) {
            result[i - _fromIndex] = trail[i];
        }

        return result;
    }

    /**
     * @dev Get audit trail for a specific patient (as target)
     * @param _patient Address of the patient
     * @param _fromIndex Starting index for pagination
     * @param _limit Maximum number of entries to return
     * @return Array of audit entry IDs
     */
    function getPatientAuditTrail(
        address _patient,
        uint256 _fromIndex,
        uint256 _limit
    ) external view returns (uint256[] memory) {
        // Allow patients to view their own audit trail, or auditors to view any
        require(
            msg.sender == _patient ||
                accessControl.getEntityType(msg.sender) ==
                AccessControl.EntityType.AUDITOR,
            "AuditTrail: Unauthorized access to patient audit trail"
        );

        uint256[] storage trail = targetAuditTrail[_patient];
        uint256 endIndex = _fromIndex + _limit;
        if (endIndex > trail.length) {
            endIndex = trail.length;
        }

        uint256[] memory result = new uint256[](endIndex - _fromIndex);
        for (uint256 i = _fromIndex; i < endIndex; i++) {
            result[i - _fromIndex] = trail[i];
        }

        return result;
    }

    /**
     * @dev Get audit trail for a specific document
     * @param _documentId ID of the document
     * @return Array of audit entry IDs
     */
    function getDocumentAuditTrail(
        uint256 _documentId
    ) external view onlyAuditor returns (uint256[] memory) {
        return documentAuditTrail[_documentId];
    }

    /**
     * @dev Get audit entries by action type
     * @param _action Type of action to filter by
     * @param _fromIndex Starting index for pagination
     * @param _limit Maximum number of entries to return
     * @return Array of audit entry IDs
     */
    function getAuditTrailByAction(
        AuditAction _action,
        uint256 _fromIndex,
        uint256 _limit
    ) external view onlyAuditor returns (uint256[] memory) {
        uint256[] storage trail = actionAuditTrail[_action];
        uint256 endIndex = _fromIndex + _limit;
        if (endIndex > trail.length) {
            endIndex = trail.length;
        }

        uint256[] memory result = new uint256[](endIndex - _fromIndex);
        for (uint256 i = _fromIndex; i < endIndex; i++) {
            result[i - _fromIndex] = trail[i];
        }

        return result;
    }

    /**
     * @dev Get audit entry details by ID
     * @param _auditId ID of the audit entry
     * @return AuditEntry struct with all details
     */
    function getAuditEntry(
        uint256 _auditId
    ) external view validAuditId(_auditId) returns (AuditEntry memory) {
        return auditEntries[_auditId];
    }

    /**
     * @dev Get daily activity count for compliance reporting
     * @param _day Day timestamp (timestamp / 86400)
     * @return Number of activities for that day
     */
    function getDailyActivityCount(
        uint256 _day
    ) external view onlyAuditor returns (uint256) {
        return dailyActivityCount[_day];
    }

    /**
     * @dev Get total number of audit entries
     * @return Total audit entries count
     */
    function getTotalAuditEntries() external view returns (uint256) {
        return nextAuditId - 1;
    }

    /**
     * @dev Verify the integrity of an audit entry
     * @param _auditId ID of the audit entry to verify
     * @return bool Whether the audit entry's hash is valid
     */
    function verifyAuditIntegrity(
        uint256 _auditId
    ) external view validAuditId(_auditId) returns (bool) {
        AuditEntry memory entry = auditEntries[_auditId];

        // Reconstruct the hash based on the stored data
        bytes32 reconstructedHash = keccak256(
            abi.encodePacked(
                entry.actor,
                entry.target,
                entry.documentId,
                entry.details,
                entry.timestamp
            )
        );

        return reconstructedHash == entry.dataHash;
    }

    // Internal functions

    /**
     * @dev Internal function to create an audit entry
     */
    function _createAuditEntry(
        address _actor,
        address _target,
        AuditAction _action,
        uint256 _documentId,
        string memory _details,
        bytes32 _dataHash
    ) internal {
        uint256 auditId = nextAuditId++;

        auditEntries[auditId] = AuditEntry({
            id: auditId,
            actor: _actor,
            target: _target,
            action: _action,
            documentId: _documentId,
            details: _details,
            timestamp: block.timestamp,
            dataHash: _dataHash
        });

        // Update mappings
        actorAuditTrail[_actor].push(auditId);
        targetAuditTrail[_target].push(auditId);
        actionAuditTrail[_action].push(auditId);

        if (_documentId > 0) {
            documentAuditTrail[_documentId].push(auditId);
        }

        // Update daily activity counter
        uint256 day = block.timestamp / 86400;
        dailyActivityCount[day]++;

        emit AuditLogCreated(
            auditId,
            _actor,
            _target,
            _action,
            _documentId,
            block.timestamp
        );
    }

    /**
     * @dev Check for suspicious activity patterns
     */
    function _checkSuspiciousActivity(
        address _accessor,
        address _patient
    ) internal {
        // Check for excessive access in a short time period
        uint256[] storage trail = actorAuditTrail[_accessor];
        uint256 recentCount = 0;
        uint256 timeWindow = 3600; // 1 hour

        // Count accesses in the last hour
        for (uint256 i = trail.length; i > 0 && i > trail.length - 50; i--) {
            AuditEntry memory entry = auditEntries[trail[i - 1]];
            if (block.timestamp - entry.timestamp <= timeWindow) {
                if (
                    entry.action == AuditAction.DOCUMENT_ACCESSED &&
                    entry.target == _patient
                ) {
                    recentCount++;
                }
            } else {
                break;
            }
        }

        // Alert if excessive access detected
        if (recentCount > 20) {
            // More than 20 accesses per hour
            emit ComplianceAlert(
                _accessor,
                "EXCESSIVE_ACCESS",
                "Excessive document access detected within 1 hour",
                block.timestamp
            );
        }
    }

    /**
     * @dev Convert uint to string (utility function)
     */
    function _uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
