// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./AccessControl.sol";

/**
 * @title MedicalRecords
 * @dev Contract for managing medical document metadata and ownership
 * Integrates with AccessControl for permission management
 */
contract MedicalRecords {
    // Struct to store document metadata
    struct Document {
        uint256 id;
        address patient;
        address createdBy; // Doctor or medical professional who created the document
        string ipfsHash; // IPFS hash of the encrypted document
        string documentType; // e.g., "Lab Result", "Prescription", "Diagnosis"
        string description;
        uint256 createdAt;
        uint256 updatedAt;
        bool isActive;
        string[] tags; // Searchable tags
    }

    // Contract state
    AccessControl public accessControl;
    uint256 private nextDocumentId;

    // Mappings
    mapping(uint256 => Document) public documents;
    mapping(address => uint256[]) public patientDocuments; // patient => document IDs
    mapping(address => uint256[]) public createdDocuments; // doctor => document IDs they created
    mapping(string => uint256[]) public documentsByType; // document type => document IDs

    // Events
    event DocumentAdded(
        uint256 indexed documentId,
        address indexed patient,
        address indexed createdBy,
        string documentType,
        string ipfsHash
    );

    event DocumentUpdated(
        uint256 indexed documentId,
        address indexed updatedBy,
        uint256 updatedAt
    );

    event DocumentDeactivated(
        uint256 indexed documentId,
        address indexed deactivatedBy,
        uint256 deactivatedAt
    );

    // Modifiers
    modifier onlyAccessControl() {
        require(
            msg.sender == address(accessControl),
            "MedicalRecords: Only AccessControl contract can call this"
        );
        _;
    }

    modifier validDocumentId(uint256 _documentId) {
        require(
            _documentId > 0 && _documentId < nextDocumentId,
            "MedicalRecords: Invalid document ID"
        );
        require(
            documents[_documentId].isActive,
            "MedicalRecords: Document is not active"
        );
        _;
    }

    modifier onlyAuthorized(
        address _patient,
        AccessControl.AccessType _accessType
    ) {
        require(
            msg.sender == _patient ||
                accessControl.checkPermission(
                    _patient,
                    msg.sender,
                    _accessType
                ),
            "MedicalRecords: Unauthorized access"
        );
        _;
    }

    modifier onlyDoctor() {
        require(
            accessControl.getEntityType(msg.sender) ==
                AccessControl.EntityType.DOCTOR,
            "MedicalRecords: Only doctors can perform this action"
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
            "MedicalRecords: Invalid AccessControl address"
        );
        accessControl = AccessControl(_accessControl);
        nextDocumentId = 1; // Start document IDs from 1
    }

    /**
     * @dev Add a new medical document
     * @param _patient Address of the patient the document belongs to
     * @param _ipfsHash IPFS hash of the encrypted document
     * @param _documentType Type of the document
     * @param _description Description of the document
     * @param _tags Array of tags for the document
     * @return documentId The ID of the created document
     */
    function addDocument(
        address _patient,
        string calldata _ipfsHash,
        string calldata _documentType,
        string calldata _description,
        string[] calldata _tags
    )
        external
        onlyDoctor
        onlyAuthorized(_patient, AccessControl.AccessType.WRITE)
        returns (uint256)
    {
        // Validate inputs
        _validateDocumentInputs(_patient, _ipfsHash, _documentType);

        uint256 documentId = nextDocumentId++;

        // Create and populate document
        _createDocument(
            documentId,
            _patient,
            _ipfsHash,
            _documentType,
            _description,
            _tags
        );

        // Update mappings
        _updateDocumentMappings(documentId, _patient, _documentType);

        emit DocumentAdded(
            documentId,
            _patient,
            msg.sender,
            _documentType,
            _ipfsHash
        );

        return documentId;
    }

    /**
     * @dev Internal function to validate document inputs
     */
    function _validateDocumentInputs(
        address _patient,
        string calldata _ipfsHash,
        string calldata _documentType
    ) internal pure {
        require(
            _patient != address(0),
            "MedicalRecords: Invalid patient address"
        );
        require(
            bytes(_ipfsHash).length > 0,
            "MedicalRecords: IPFS hash cannot be empty"
        );
        require(
            bytes(_documentType).length > 0,
            "MedicalRecords: Document type cannot be empty"
        );
    }

    /**
     * @dev Internal function to create and populate document
     */
    function _createDocument(
        uint256 _documentId,
        address _patient,
        string calldata _ipfsHash,
        string calldata _documentType,
        string calldata _description,
        string[] calldata _tags
    ) internal {
        Document storage newDocument = documents[_documentId];
        newDocument.id = _documentId;
        newDocument.patient = _patient;
        newDocument.createdBy = msg.sender;
        newDocument.ipfsHash = _ipfsHash;
        newDocument.documentType = _documentType;
        newDocument.description = _description;
        newDocument.createdAt = block.timestamp;
        newDocument.updatedAt = block.timestamp;
        newDocument.isActive = true;

        // Copy tags
        for (uint i = 0; i < _tags.length; i++) {
            newDocument.tags.push(_tags[i]);
        }
    }

    /**
     * @dev Internal function to update document mappings
     */
    function _updateDocumentMappings(
        uint256 _documentId,
        address _patient,
        string calldata _documentType
    ) internal {
        patientDocuments[_patient].push(_documentId);
        createdDocuments[msg.sender].push(_documentId);
        documentsByType[_documentType].push(_documentId);
    }

    /**
     * @dev Get a document by ID
     * @param _documentId ID of the document to retrieve
     * @return Document struct with all details
     */
    function getDocument(
        uint256 _documentId
    )
        external
        view
        validDocumentId(_documentId)
        onlyAuthorized(
            documents[_documentId].patient,
            AccessControl.AccessType.READ
        )
        returns (Document memory)
    {
        return documents[_documentId];
    }

    /**
     * @dev Update document metadata (not the actual document content)
     * @param _documentId ID of the document to update
     * @param _description New description
     * @param _tags New tags array
     */
    function updateDocumentMetadata(
        uint256 _documentId,
        string calldata _description,
        string[] calldata _tags
    )
        external
        validDocumentId(_documentId)
        onlyAuthorized(
            documents[_documentId].patient,
            AccessControl.AccessType.WRITE
        )
    {
        Document storage document = documents[_documentId];

        document.description = _description;
        document.updatedAt = block.timestamp;

        // Clear existing tags and add new ones
        delete document.tags;
        for (uint i = 0; i < _tags.length; i++) {
            document.tags.push(_tags[i]);
        }

        emit DocumentUpdated(_documentId, msg.sender, block.timestamp);
    }

    /**
     * @dev Deactivate a document (soft delete)
     * @param _documentId ID of the document to deactivate
     */
    function deactivateDocument(
        uint256 _documentId
    )
        external
        validDocumentId(_documentId)
        onlyAuthorized(
            documents[_documentId].patient,
            AccessControl.AccessType.FULL
        )
    {
        documents[_documentId].isActive = false;
        emit DocumentDeactivated(_documentId, msg.sender, block.timestamp);
    }

    /**
     * @dev Get all document IDs for a patient
     * @param _patient Address of the patient
     * @return Array of document IDs
     */
    function getPatientDocuments(
        address _patient
    )
        external
        view
        onlyAuthorized(_patient, AccessControl.AccessType.READ)
        returns (uint256[] memory)
    {
        return patientDocuments[_patient];
    }

    /**
     * @dev Get all document IDs created by a doctor
     * @param _doctor Address of the doctor
     * @return Array of document IDs
     */
    function getCreatedDocuments(
        address _doctor
    ) external view returns (uint256[] memory) {
        require(
            msg.sender == _doctor ||
                accessControl.getEntityType(msg.sender) ==
                AccessControl.EntityType.AUDITOR,
            "MedicalRecords: Unauthorized access to created documents"
        );
        return createdDocuments[_doctor];
    }

    /**
     * @dev Get all document IDs of a specific type
     * @param _documentType Type of documents to retrieve
     * @return Array of document IDs
     */
    function getDocumentsByType(
        string calldata _documentType
    ) external view returns (uint256[] memory) {
        require(
            accessControl.getEntityType(msg.sender) ==
                AccessControl.EntityType.AUDITOR,
            "MedicalRecords: Only auditors can access documents by type"
        );
        return documentsByType[_documentType];
    }

    /**
     * @dev Get document tags
     * @param _documentId ID of the document
     * @return Array of tags
     */
    function getDocumentTags(
        uint256 _documentId
    )
        external
        view
        validDocumentId(_documentId)
        onlyAuthorized(
            documents[_documentId].patient,
            AccessControl.AccessType.READ
        )
        returns (string[] memory)
    {
        return documents[_documentId].tags;
    }

    /**
     * @dev Get total number of documents in the system
     * @return Total number of documents
     */
    function getTotalDocuments() external view returns (uint256) {
        return nextDocumentId - 1;
    }

    /**
     * @dev Check if a document exists and is active
     * @param _documentId ID of the document to check
     * @return bool Whether the document exists and is active
     */
    function documentExists(uint256 _documentId) external view returns (bool) {
        return
            _documentId > 0 &&
            _documentId < nextDocumentId &&
            documents[_documentId].isActive;
    }
}
