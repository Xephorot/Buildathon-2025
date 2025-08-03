// Direcciones de los contratos desplegados en Arbitrum Sepolia
export const CONTRACT_ADDRESSES = {
  AccessControl: '0xE581f2a4840fdb1CAc660876Fdd512980846Ad04',
  MedicalRecords: '0xC6902Cdd7732DFA81c3d14431D0F1de670BC1747',
  AuditTrail: '0xD587fA568C2a48a9ae8b5793796C9e71c201f059',
};

// ABIs de los contratos (versiones simplificadas para el frontend)
export const CONTRACT_ABIS = {
  AccessControl: [
    "function registerPatient() external",
    "function registerEntity(address _entity, uint8 _entityType) external",
    "function grantAccess(address _entity, uint8 _accessType, uint256 _expiresAt, string _purpose) external",
    "function revokeAccess(address _entity) external",
    "function checkPermission(address _patient, address _entity, uint8 _accessType) external view returns (bool)",
    "function getEntityType(address _entity) external view returns (uint8)",
    "function getGrantedEntities(address _patient) external view returns (address[])",
    "function getPermission(address _patient, address _entity) external view returns (tuple(bool isActive, uint8 accessType, uint256 grantedAt, uint256 expiresAt, string purpose))",
    "event AccessGranted(address indexed patient, address indexed entity, uint8 accessType, uint256 expiresAt, string purpose)",
    "event AccessRevoked(address indexed patient, address indexed entity, uint256 revokedAt)",
    "event EntityRegistered(address indexed entity, uint8 entityType)"
  ],
  
  MedicalRecords: [
    "function addDocument(address _patient, string _ipfsHash, string _documentType, string _description, string[] _tags) external returns (uint256)",
    "function getDocument(uint256 _documentId) external view returns (tuple(uint256 id, address patient, address createdBy, string ipfsHash, string documentType, string description, uint256 createdAt, uint256 updatedAt, bool isActive, string[] tags))",
    "function getPatientDocuments(address _patient) external view returns (uint256[])",
    "function getTotalDocuments() external view returns (uint256)",
    "function updateDocumentMetadata(uint256 _documentId, string _description, string[] _tags) external",
    "function deactivateDocument(uint256 _documentId) external",
    "event DocumentAdded(uint256 indexed documentId, address indexed patient, address indexed createdBy, string documentType, string ipfsHash)",
    "event DocumentUpdated(uint256 indexed documentId, address indexed updatedBy, uint256 updatedAt)"
  ],
  
  AuditTrail: [
    "function getTotalAuditEntries() external view returns (uint256)",
    "function getAuditTrail(address _patient, uint256 _start, uint256 _limit) external view returns (tuple(string action, address performer, uint256 timestamp, uint256 documentId, string details)[])"
  ]
};

// Tipos de entidad
export enum EntityType {
  PATIENT = 0,
  DOCTOR = 1,
  INSURANCE = 2,
  AUDITOR = 3,
}

// Tipos de acceso/permisos
export enum PermissionType {
  READ = 0,
  WRITE = 1,
  FULL = 2,
}

// Tipos de documentos médicos
export enum DocumentType {
  MEDICAL_HISTORY = 0,
  LAB_RESULTS = 1,
  IMAGING = 2,
  PRESCRIPTION = 3,
  INSURANCE_CLAIM = 4
}

// Mapeo de tipos para mostrar
export const ENTITY_TYPE_LABELS = {
  [EntityType.PATIENT]: 'Paciente',
  [EntityType.DOCTOR]: 'Doctor',
  [EntityType.INSURANCE]: 'Compañía de Seguros',
  [EntityType.AUDITOR]: 'Auditor',
};

export const PERMISSION_TYPE_LABELS = {
  [PermissionType.READ]: 'Solo Lectura',
  [PermissionType.WRITE]: 'Lectura y Escritura',
  [PermissionType.FULL]: 'Acceso Completo',
};

export const DOCUMENT_TYPE_LABELS = {
  [DocumentType.MEDICAL_HISTORY]: 'Historia Clínica',
  [DocumentType.LAB_RESULTS]: 'Resultados de Laboratorio',
  [DocumentType.IMAGING]: 'Imágenes Médicas',
  [DocumentType.PRESCRIPTION]: 'Receta Médica',
  [DocumentType.INSURANCE_CLAIM]: 'Reclamación de Seguro'
};
