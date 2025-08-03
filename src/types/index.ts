export interface User {
  address: string;
  entityType: number;
  isConnected: boolean;
}

export interface Document {
  id: number;
  patient: string;
  createdBy: string;
  ipfsHash: string;
  documentType: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  isActive: boolean;
  tags: string[];
}

export interface Permission {
  isActive: boolean;
  accessType: number;
  grantedAt: number;
  expiresAt: number;
  purpose: string;
}

export interface AuditEntry {
  action: string;
  performer: string;
  timestamp: number;
  documentId: number;
  details: string;
}
