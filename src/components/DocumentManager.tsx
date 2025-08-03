import React, { useState, useEffect, useCallback } from 'react';
import { FileText, Plus, Eye, Edit, Search, Calendar, User } from 'lucide-react';
import { useWeb3 } from '../contexts/Web3Context';
import { DocumentType, DOCUMENT_TYPE_LABELS } from '../config/contracts';

interface Document {
  id: string;
  patient: string;
  ipfsHash: string;
  documentType: DocumentType;
  title: string;
  description: string;
  keywords: string[];
  timestamp: number;
  isActive: boolean;
}

const DocumentManager: React.FC = () => {
  const { user, contracts } = useWeb3();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<DocumentType | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDocument, setNewDocument] = useState({
    patient: '',
    ipfsHash: '',
    documentType: DocumentType.MEDICAL_HISTORY,
    title: '',
    description: '',
    keywords: ''
  });

  const loadDocuments = useCallback(async () => {
    if (!contracts.medicalRecords) return;
    
    setLoading(true);
    try {
      // En un sistema real, implementarías eventos para obtener todos los documentos
      // Por ahora simulamos algunos documentos
      const mockDocuments: Document[] = [
        {
          id: '1',
          patient: '0x1234...5678',
          ipfsHash: 'QmTest1...',
          documentType: DocumentType.MEDICAL_HISTORY,
          title: 'Historia Clínica General',
          description: 'Historia clínica completa del paciente',
          keywords: ['diabetes', 'hipertension'],
          timestamp: Date.now() - 86400000,
          isActive: true
        },
        {
          id: '2',
          patient: '0x1234...5678',
          ipfsHash: 'QmTest2...',
          documentType: DocumentType.LAB_RESULTS,
          title: 'Resultados de Laboratorio',
          description: 'Análisis de sangre completo',
          keywords: ['sangre', 'glucosa'],
          timestamp: Date.now() - 172800000,
          isActive: true
        }
      ];
      
      setDocuments(mockDocuments);
    } catch (error) {
      console.error('Error cargando documentos:', error);
    } finally {
      setLoading(false);
    }
  }, [contracts.medicalRecords]);

  useEffect(() => {
    if (user && contracts.medicalRecords) {
      loadDocuments();
    }
  }, [user, contracts.medicalRecords, loadDocuments]);

  useEffect(() => {
    if (user && contracts.medicalRecords) {
      loadDocuments();
    }
  }, [user, contracts.medicalRecords, loadDocuments]);

  const handleAddDocument = async () => {
    if (!contracts.medicalRecords || !user) return;

    setLoading(true);
    try {
      const keywords = newDocument.keywords.split(',').map(k => k.trim()).filter(k => k);
      
      const tx = await contracts.medicalRecords.addDocument(
        newDocument.patient || user.address,
        newDocument.ipfsHash,
        newDocument.documentType,
        newDocument.title,
        newDocument.description,
        keywords
      );

      await tx.wait();
      
      // Recargar documentos
      await loadDocuments();
      
      // Limpiar formulario
      setNewDocument({
        patient: '',
        ipfsHash: '',
        documentType: DocumentType.MEDICAL_HISTORY,
        title: '',
        description: '',
        keywords: ''
      });
      setShowAddForm(false);
      
    } catch (error: any) {
      console.error('Error agregando documento:', error);
      alert(`Error: ${error.reason || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesFilter = filter === 'ALL' || doc.documentType === filter;
    const matchesSearch = !searchTerm || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDocumentTypeColor = (type: DocumentType) => {
    const colors = {
      [DocumentType.MEDICAL_HISTORY]: 'bg-blue-100 text-blue-800',
      [DocumentType.LAB_RESULTS]: 'bg-green-100 text-green-800',
      [DocumentType.IMAGING]: 'bg-purple-100 text-purple-800',
      [DocumentType.PRESCRIPTION]: 'bg-orange-100 text-orange-800',
      [DocumentType.INSURANCE_CLAIM]: 'bg-red-100 text-red-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FileText className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestión de Documentos</h2>
            <p className="text-gray-600">Administra las historias clínicas y documentos médicos</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nuevo Documento</span>
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="sm:w-64">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as DocumentType | 'ALL')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">Todos los tipos</option>
              {Object.entries(DOCUMENT_TYPE_LABELS).map(([type, label]) => (
                <option key={type} value={type}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de documentos */}
      <div className="bg-white rounded-lg shadow-md">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando documentos...</p>
          </div>
        ) : filteredDocuments.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDocumentTypeColor(doc.documentType)}`}>
                        {DOCUMENT_TYPE_LABELS[doc.documentType]}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{doc.description}</p>
                    
                    <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>Paciente: {doc.patient}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(doc.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span>IPFS: {doc.ipfsHash.substring(0, 12)}...</span>
                      </div>
                    </div>
                    
                    {doc.keywords.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {doc.keywords.map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <Edit className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron documentos</p>
          </div>
        )}
      </div>

      {/* Modal para agregar documento */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Nuevo Documento Médico</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección del Paciente
                </label>
                <input
                  type="text"
                  value={newDocument.patient}
                  onChange={(e) => setNewDocument({ ...newDocument, patient: e.target.value })}
                  placeholder={`Dejar vacío para usar tu dirección (${user?.address})`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hash IPFS del Documento
                </label>
                <input
                  type="text"
                  value={newDocument.ipfsHash}
                  onChange={(e) => setNewDocument({ ...newDocument, ipfsHash: e.target.value })}
                  placeholder="QmHash..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Documento
                </label>
                <select
                  value={newDocument.documentType}
                  onChange={(e) => setNewDocument({ ...newDocument, documentType: parseInt(e.target.value) as DocumentType })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.entries(DOCUMENT_TYPE_LABELS).map(([type, label]) => (
                    <option key={type} value={type}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={newDocument.title}
                  onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                  placeholder="Título del documento"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={newDocument.description}
                  onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                  placeholder="Descripción del documento"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Palabras Clave (separadas por comas)
                </label>
                <input
                  type="text"
                  value={newDocument.keywords}
                  onChange={(e) => setNewDocument({ ...newDocument, keywords: e.target.value })}
                  placeholder="diabetes, hipertensión, cardiología"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex space-x-3">
              <button
                onClick={handleAddDocument}
                disabled={loading || !newDocument.ipfsHash || !newDocument.title || !newDocument.description}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Guardando...' : 'Guardar Documento'}
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManager;
