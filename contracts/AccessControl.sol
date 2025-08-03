// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title AccessControl
 * @dev Contract for managing access permissions to medical records
 * Allows patients to grant/revoke access to insurance services and medical professionals
 */
contract AccessControl {
    // Enums for different types of access
    enum AccessType {
        READ,
        WRITE,
        FULL
    }
    enum EntityType {
        PATIENT,
        DOCTOR,
        INSURANCE,
        AUDITOR
    }

    // Struct to store access permission details
    struct Permission {
        bool isActive;
        AccessType accessType;
        uint256 grantedAt;
        uint256 expiresAt;
        string purpose; // Purpose of access (e.g., "Insurance claim review")
    }

    // Mappings
    mapping(address => EntityType) public entityTypes;
    mapping(address => mapping(address => Permission)) public permissions; // patient => entity => permission
    mapping(address => address[]) public grantedEntities; // patient => list of entities with access

    // Events
    event AccessGranted(
        address indexed patient,
        address indexed entity,
        AccessType accessType,
        uint256 expiresAt,
        string purpose
    );

    event AccessRevoked(
        address indexed patient,
        address indexed entity,
        uint256 revokedAt
    );

    event EntityRegistered(address indexed entity, EntityType entityType);

    // Modifiers
    modifier onlyPatient() {
        require(
            entityTypes[msg.sender] == EntityType.PATIENT,
            "AccessControl: Only patients can perform this action"
        );
        _;
    }

    modifier onlyRegisteredEntity() {
        require(
            entityTypes[msg.sender] != EntityType.PATIENT ||
                msg.sender != address(0),
            "AccessControl: Entity must be registered"
        );
        _;
    }

    modifier validAddress(address _addr) {
        require(_addr != address(0), "AccessControl: Invalid address");
        _;
    }

    /**
     * @dev Register an entity with its type
     * @param _entity Address of the entity to register
     * @param _entityType Type of entity (DOCTOR, INSURANCE, AUDITOR)
     */
    function registerEntity(
        address _entity,
        EntityType _entityType
    ) external validAddress(_entity) {
        require(
            _entityType != EntityType.PATIENT,
            "AccessControl: Use registerPatient for patients"
        );
        entityTypes[_entity] = _entityType;
        emit EntityRegistered(_entity, _entityType);
    }

    /**
     * @dev Register a patient
     */
    function registerPatient() external {
        entityTypes[msg.sender] = EntityType.PATIENT;
        emit EntityRegistered(msg.sender, EntityType.PATIENT);
    }

    /**
     * @dev Grant access to an entity for the patient's medical records
     * @param _entity Address of the entity to grant access to
     * @param _accessType Type of access to grant
     * @param _expiresAt Timestamp when access expires (0 for no expiration)
     * @param _purpose Purpose of the access
     */
    function grantAccess(
        address _entity,
        AccessType _accessType,
        uint256 _expiresAt,
        string calldata _purpose
    ) external onlyPatient validAddress(_entity) {
        require(
            entityTypes[_entity] != EntityType.PATIENT,
            "AccessControl: Cannot grant access to another patient"
        );
        require(
            _expiresAt == 0 || _expiresAt > block.timestamp,
            "AccessControl: Expiration must be in the future"
        );

        // If this is a new permission, add to grantedEntities list
        if (!permissions[msg.sender][_entity].isActive) {
            grantedEntities[msg.sender].push(_entity);
        }

        permissions[msg.sender][_entity] = Permission({
            isActive: true,
            accessType: _accessType,
            grantedAt: block.timestamp,
            expiresAt: _expiresAt,
            purpose: _purpose
        });

        emit AccessGranted(
            msg.sender,
            _entity,
            _accessType,
            _expiresAt,
            _purpose
        );
    }

    /**
     * @dev Revoke access from an entity
     * @param _entity Address of the entity to revoke access from
     */
    function revokeAccess(
        address _entity
    ) external onlyPatient validAddress(_entity) {
        require(
            permissions[msg.sender][_entity].isActive,
            "AccessControl: No active permission to revoke"
        );

        permissions[msg.sender][_entity].isActive = false;

        // Remove from grantedEntities list
        address[] storage entities = grantedEntities[msg.sender];
        for (uint i = 0; i < entities.length; i++) {
            if (entities[i] == _entity) {
                entities[i] = entities[entities.length - 1];
                entities.pop();
                break;
            }
        }

        emit AccessRevoked(msg.sender, _entity, block.timestamp);
    }

    /**
     * @dev Check if an entity has permission to access patient's records
     * @param _patient Address of the patient
     * @param _entity Address of the entity requesting access
     * @param _accessType Type of access being requested
     * @return bool Whether the entity has the required permission
     */
    function checkPermission(
        address _patient,
        address _entity,
        AccessType _accessType
    ) external view returns (bool) {
        Permission memory permission = permissions[_patient][_entity];

        // Check if permission is active
        if (!permission.isActive) {
            return false;
        }

        // Check if permission has expired
        if (
            permission.expiresAt != 0 && block.timestamp > permission.expiresAt
        ) {
            return false;
        }

        // Check access type hierarchy: FULL > WRITE > READ
        if (_accessType == AccessType.READ) {
            return true; // Any permission type allows read access
        } else if (_accessType == AccessType.WRITE) {
            return
                permission.accessType == AccessType.WRITE ||
                permission.accessType == AccessType.FULL;
        } else if (_accessType == AccessType.FULL) {
            return permission.accessType == AccessType.FULL;
        }

        return false;
    }

    /**
     * @dev Get all entities that have access to a patient's records
     * @param _patient Address of the patient
     * @return Array of entity addresses with active permissions
     */
    function getGrantedEntities(
        address _patient
    ) external view returns (address[] memory) {
        return grantedEntities[_patient];
    }

    /**
     * @dev Get permission details for a specific patient-entity pair
     * @param _patient Address of the patient
     * @param _entity Address of the entity
     * @return Permission struct with all details
     */
    function getPermission(
        address _patient,
        address _entity
    ) external view returns (Permission memory) {
        return permissions[_patient][_entity];
    }

    /**
     * @dev Get entity type for an address
     * @param _entity Address to check
     * @return EntityType of the address
     */
    function getEntityType(address _entity) external view returns (EntityType) {
        return entityTypes[_entity];
    }
}
