"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ShieldCheckIcon, ClockIcon, UserIcon } from "@heroicons/react/24/outline";
import PatientSidebar from "~~/components/PatientSidebar";

interface Permission {
  id: string;
  grantedTo: string;
  grantedToName: string;
  documents: string[];
  expiresAt: string;
  status: 'active' | 'expired' | 'revoked';
}

const PatientPermissions: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  // Mock data
  const permissions: Permission[] = [
    {
      id: "1",
      grantedTo: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
      grantedToName: "Dr. Maria Rodriguez - Cardiología",
      documents: ["Reporte Médico - 2024-01-15", "Resultados de Lab - 2024-01-10"],
      expiresAt: "2024-03-15",
      status: 'active'
    },
    {
      id: "2", 
      grantedTo: "0x8ba1f109551bD432803012645Hac136c0532925a",
      grantedToName: "Hospital San Juan - Emergencias",
      documents: ["Resultados de Rayos X - 2024-01-20"],
      expiresAt: "2024-02-20",
      status: 'expired'
    }
  ];

  const availableDocuments = [
    "Reporte Médico - 2024-01-15",
    "Resultados de Lab - 2024-01-10", 
    "Resultados de Rayos X - 2024-01-20",
    "Receta - 2024-01-25"
  ];

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Gestionar Permisos</h1>
          <p className="mb-4">Por favor conecta tu wallet para gestionar los permisos de acceso.</p>
        </div>
      </div>
    );
  }

  const handleGrantAccess = () => {
    // Handle granting access logic
    setShowGrantModal(false);
    setSelectedDocuments([]);
  };

  const handleRevokeAccess = (permissionId: string) => {
    // Handle revoking access logic
    console.log("Revocando acceso para permiso:", permissionId);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex">
        <PatientSidebar />
        
        <div className="flex-1 p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-base-content">Permisos de Acceso</h1>
                <p className="text-base-content/70">Gestiona quién puede acceder a tus registros médicos</p>
              </div>
              <button 
                onClick={() => setShowGrantModal(true)}
                className="btn btn-primary"
              >
                Otorgar Nuevo Acceso
              </button>
            </div>
          </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <ShieldCheckIcon className="h-8 w-8 text-success mb-4" />
          <h3 className="text-lg font-semibold mb-2">Permisos Activos</h3>
          <div className="text-2xl font-bold text-success">
            {permissions.filter(p => p.status === 'active').length}
          </div>
          <p className="text-sm text-gray-500">Actualmente otorgados</p>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <ClockIcon className="h-8 w-8 text-warning mb-4" />
          <h3 className="text-lg font-semibold mb-2">Expiran Pronto</h3>
          <div className="text-2xl font-bold text-warning">1</div>
          <p className="text-sm text-gray-500">En 30 días</p>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          <UserIcon className="h-8 w-8 text-info mb-4" />
          <h3 className="text-lg font-semibold mb-2">Total Destinatarios</h3>
          <div className="text-2xl font-bold text-info">
            {new Set(permissions.map(p => p.grantedTo)).size}
          </div>
          <p className="text-sm text-gray-500">Direcciones únicas</p>
        </div>
      </div>

      <div className="bg-base-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-6">Permisos Actuales</h3>
        
        <div className="space-y-4">
          {permissions.map((permission) => (
            <div key={permission.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-lg">{permission.grantedToName}</h4>
                  <p className="text-sm text-gray-600 font-mono">{permission.grantedTo}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${
                    permission.status === 'active' ? 'badge-success' :
                    permission.status === 'expired' ? 'badge-warning' : 'badge-error'
                  }`}>
                    {permission.status === 'active' ? 'activo' : 
                     permission.status === 'expired' ? 'expirado' : 'revocado'}
                  </span>
                  {permission.status === 'active' && (
                    <button 
                      onClick={() => handleRevokeAccess(permission.id)}
                      className="btn btn-error btn-sm"
                    >
                      Revocar
                    </button>
                  )}
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-medium mb-2">Documentos Accesibles:</p>
                <div className="flex flex-wrap gap-2">
                  {permission.documents.map((doc, index) => (
                    <span key={index} className="badge badge-outline">{doc}</span>
                  ))}
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Expira: {new Date(permission.expiresAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
          
          {permissions.length === 0 && (
            <div className="text-center py-8 text-gray-600">
              <ShieldCheckIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No se han otorgado permisos aún</p>
              <p className="text-sm">Haz clic en &quot;Otorgar Nuevo Acceso&quot; para compartir tus registros médicos</p>
            </div>
          )}
        </div>
      </div>

      {/* Grant Access Modal */}
      {showGrantModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Otorgar Acceso a Registros Médicos</h3>
            
            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Dirección del Destinatario</span>
                </label>
                <input 
                  type="text" 
                  placeholder="0x..." 
                  className="input input-bordered w-full" 
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Nombre del Destinatario (Opcional)</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Nombre del Dr. o Hospital" 
                  className="input input-bordered w-full" 
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">El Acceso Expira</span>
                </label>
                <input type="date" className="input input-bordered w-full" />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Seleccionar Documentos para Compartir</span>
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {availableDocuments.map((doc, index) => (
                    <label key={index} className="label cursor-pointer justify-start gap-3">
                      <input 
                        type="checkbox" 
                        className="checkbox" 
                        checked={selectedDocuments.includes(doc)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDocuments([...selectedDocuments, doc]);
                          } else {
                            setSelectedDocuments(selectedDocuments.filter(d => d !== doc));
                          }
                        }}
                      />
                      <span className="label-text">{doc}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button 
                onClick={() => setShowGrantModal(false)}
                className="btn btn-ghost"
              >
                Cancelar
              </button>
              <button 
                onClick={handleGrantAccess}
                disabled={selectedDocuments.length === 0}
                className="btn btn-primary"
              >
                Otorgar Acceso
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default PatientPermissions;