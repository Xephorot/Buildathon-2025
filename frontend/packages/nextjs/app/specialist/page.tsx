"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { 
  MagnifyingGlassIcon, 
  DocumentTextIcon, 
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

const SpecialistPortal: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [searchAddress, setSearchAddress] = useState("");
  const [authorizedPatients] = useState([
    { address: "0x123abc...", action: "Ver Historial Médico" },
    { address: "0x456def...", action: "Ver Historial Médico" },
    { address: "0x789ghi...", action: "Ver Historial Médico" },
  ]);

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Portal Médico</h1>
          <p className="mb-4">Por favor conecta tu wallet para acceder a los registros de pacientes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 min-h-screen p-6">
          <h2 className="text-xl font-bold mb-8">Portal Médico</h2>
          
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 bg-slate-700 p-3 rounded-lg">
              <MagnifyingGlassIcon className="h-5 w-5" />
              <span>Buscar Paciente</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
              <DocumentTextIcon className="h-5 w-5" />
              <span>Documentos Autorizados</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
              <ClipboardDocumentListIcon className="h-5 w-5" />
              <span>Historial de Tratamiento</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
              <UserGroupIcon className="h-5 w-5" />
              <span>Solicitudes de Acceso</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
              <ShieldCheckIcon className="h-5 w-5" />
              <span>Verificación Profesional</span>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Search Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6">Buscar Paciente</h1>
            
            <div className="bg-slate-800 p-6 rounded-lg mb-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Ingresar dirección de wallet del paciente"
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  className="flex-1 bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                  Solicitar Acceso
                </button>
              </div>
            </div>
          </div>

          {/* Authorized Documents Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Documentos Autorizados</h2>
            
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 gap-px bg-slate-600">
                <div className="bg-slate-700 p-4 font-semibold">
                  Dirección de Wallet del Paciente
                </div>
                <div className="bg-slate-700 p-4 font-semibold">
                  Acciones
                </div>
              </div>
              
              {authorizedPatients.map((patient, index) => (
                <div key={index} className="grid grid-cols-2 gap-px bg-slate-600">
                  <div className="bg-slate-800 p-4">
                    {patient.address}
                  </div>
                  <div className="bg-slate-800 p-4">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                      {patient.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistPortal;