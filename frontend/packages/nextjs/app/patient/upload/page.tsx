"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { DocumentIcon, CloudArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import PatientSidebar from "~~/components/PatientSidebar";

const PatientUpload: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Subir Registros Médicos</h1>
          <p className="mb-4">Por favor conecta tu wallet para subir documentos.</p>
        </div>
      </div>
    );
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    setIsUploading(true);
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    setIsUploading(false);
    setUploadProgress(0);
    setSelectedFiles([]);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex">
        <PatientSidebar />
        
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-base-content">Subir Registros Médicos</h1>
            <p className="text-base-content/70">Encripta y almacena de forma segura tus documentos médicos</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Seleccionar Documentos</h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Arrastra y suelta tus documentos médicos aquí</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="btn btn-primary">
                  Elegir Archivos
                </label>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                <p>Formatos soportados: PDF, JPG, PNG, DOC, DOCX</p>
                <p>Tamaño máximo de archivo: 10MB por archivo</p>
              </div>

              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold">Archivos Seleccionados:</h4>
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <DocumentIcon className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="btn btn-ghost btn-sm"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Información del Documento</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text">Tipo de Documento</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option>Seleccionar tipo de documento</option>
                    <option>Reporte Médico</option>
                    <option>Resultados de Laboratorio</option>
                    <option>Rayos X/Imágenes</option>
                    <option>Receta Médica</option>
                    <option>Registro de Vacunación</option>
                    <option>Otro</option>
                  </select>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Fecha del Documento</span>
                  </label>
                  <input type="date" className="input input-bordered w-full" />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Proveedor de Salud</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Nombre del hospital o clínica" 
                    className="input input-bordered w-full" 
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Descripción (Opcional)</span>
                  </label>
                  <textarea 
                    placeholder="Breve descripción del documento"
                    className="textarea textarea-bordered w-full"
                    rows={3}
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Hacer este documento compartible</span>
                    <input type="checkbox" className="checkbox" defaultChecked />
                  </label>
                </div>
              </div>

              {isUploading && (
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Subiendo...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <progress className="progress progress-primary w-full" value={uploadProgress} max="100"></progress>
                </div>
              )}

              <div className="mt-6 space-y-3">
                <button 
                  onClick={handleUpload}
                  disabled={selectedFiles.length === 0 || isUploading}
                  className="btn btn-primary w-full"
                >
                  {isUploading ? "Subiendo..." : "Subir Documentos"}
                </button>
                <p className="text-xs text-gray-600 text-center">
                  Los documentos serán encriptados antes de subirlos y almacenados de forma segura en IPFS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientUpload;