"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { DocumentIcon, EyeIcon, ShareIcon, TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import PatientSidebar from "~~/components/PatientSidebar";

interface MedicalRecord {
  id: string;
  title: string;
  type: string;
  date: string;
  provider: string;
  size: string;
  isShared: boolean;
  description?: string;
}

const PatientRecords: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("todos");
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  // Mock data en español
  const records: MedicalRecord[] = [
    {
      id: "1",
      title: "Examen Físico Anual",
      type: "Reporte Médico",
      date: "2024-01-15",
      provider: "Hospital San Juan",
      size: "2.3 MB",
      isShared: true,
      description: "Examen físico anual completo con análisis de sangre y signos vitales"
    },
    {
      id: "2",
      title: "Resultados de Análisis de Sangre",
      type: "Resultados de Laboratorio",
      date: "2024-01-10",
      provider: "Lab Central",
      size: "1.1 MB",
      isShared: true,
      description: "Hemograma completo y panel metabólico"
    },
    {
      id: "3",
      title: "Radiografía de Tórax",
      type: "Rayos X/Imágenes",
      date: "2024-01-20",
      provider: "Centro de Imágenes",
      size: "5.7 MB",
      isShared: false,
      description: "Radiografía de tórax para examen de rutina"
    },
    {
      id: "4",
      title: "Receta - Antibióticos",
      type: "Receta Médica",
      date: "2024-01-25",
      provider: "Dr. Maria Rodriguez",
      size: "0.5 MB",
      isShared: false,
      description: "Receta de antibióticos para infección respiratoria"
    }
  ];

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "todos" || record.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const recordTypes = ["todos", ...new Set(records.map(r => r.type))];

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-base-content">Mis Registros Médicos</h1>
          <p className="mb-4 text-base-content">Por favor conecta tu wallet para ver tus registros.</p>
        </div>
      </div>
    );
  }

  const handleViewRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
  };

  const handleDeleteRecord = (recordId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este registro? Esta acción no se puede deshacer.")) {
      console.log("Eliminando registro:", recordId);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex">
        <PatientSidebar />
        
        <div className="flex-1 p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-base-content">Mis Registros Médicos</h1>
                <p className="text-base-content/70">Ve y gestiona tus documentos médicos encriptados</p>
              </div>
              <Link href="/patient/upload" className="btn btn-primary">
                Subir Nuevo Registro
              </Link>
            </div>
          </div>

      {/* Search and Filter */}
      <div className="bg-base-100 p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar registros por título o proveedor..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <select 
              className="select select-bordered"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {recordTypes.map(type => (
                <option key={type} value={type}>
                  {type === "todos" ? "Todos los Tipos" : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-base-100 p-6 rounded-lg shadow-md">
            <div className="flex items-start justify-between mb-4">
              <DocumentIcon className="h-8 w-8 text-primary" />
              <div className="flex gap-2">
                {record.isShared && (
                  <span className="badge badge-success badge-sm">Compartido</span>
                )}
                <span className="badge badge-outline badge-sm">{record.type}</span>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg mb-2 text-base-content">{record.title}</h3>
            <p className="text-base-content/70 text-sm mb-3">{record.description}</p>
            
            <div className="space-y-1 text-sm text-base-content/70 mb-4">
              <p><span className="font-medium">Proveedor:</span> {record.provider}</p>
              <p><span className="font-medium">Fecha:</span> {new Date(record.date).toLocaleDateString()}</p>
              <p><span className="font-medium">Tamaño:</span> {record.size}</p>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => handleViewRecord(record)}
                className="btn btn-primary btn-sm flex-1"
              >
                <EyeIcon className="h-4 w-4" />
                Ver
              </button>
              <Link 
                href="/patient/permissions"
                className="btn btn-outline btn-sm"
              >
                <ShareIcon className="h-4 w-4" />
              </Link>
              <button 
                onClick={() => handleDeleteRecord(record.id)}
                className="btn btn-error btn-sm"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <DocumentIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-base-content">No se encontraron registros</h3>
          <p className="text-base-content/70 mb-4">
            {searchTerm || filterType !== "todos" 
              ? "Intenta ajustar tu búsqueda o criterios de filtro"
              : "Sube tu primer registro médico para comenzar"
            }
          </p>
          {!searchTerm && filterType === "todos" && (
            <Link href="/patient/upload" className="btn btn-primary">
              Subir Primer Registro
            </Link>
          )}
        </div>
      )}

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">{selectedRecord.title}</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-base-content/70">Tipo</p>
                  <p className="text-base-content">{selectedRecord.type}</p>
                </div>
                <div>
                  <p className="font-medium text-base-content/70">Fecha</p>
                  <p className="text-base-content">{new Date(selectedRecord.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-medium text-base-content/70">Proveedor</p>
                  <p className="text-base-content">{selectedRecord.provider}</p>
                </div>
                <div>
                  <p className="font-medium text-base-content/70">Tamaño del Archivo</p>
                  <p className="text-base-content">{selectedRecord.size}</p>
                </div>
              </div>
              
              {selectedRecord.description && (
                <div>
                  <p className="font-medium text-base-content/70">Descripción</p>
                  <p className="text-base-content">{selectedRecord.description}</p>
                </div>
              )}
              
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-sm text-base-content/70 mb-2">Vista Previa del Documento</p>
                <div className="bg-base-100 border-2 border-dashed border-base-300 rounded-lg p-8 text-center">
                  <DocumentIcon className="h-12 w-12 text-base-content/40 mx-auto mb-2" />
                  <p className="text-base-content/70">La vista previa del documento se mostrará aquí</p>
                  <button className="btn btn-primary btn-sm mt-2">Descargar Original</button>
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button 
                onClick={() => setSelectedRecord(null)}
                className="btn btn-ghost"
              >
                Cerrar
              </button>
              <button className="btn btn-primary">
                Descargar
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

export default PatientRecords;