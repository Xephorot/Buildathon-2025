"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { 
  DocumentTextIcon, 
  ClipboardDocumentListIcon,
  UserIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

const PatientDashboard: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [patientName, setPatientName] = useState("Juan Pérez");
  const [walletAddress] = useState("0x123abc...");

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Panel del paciente</h1>
          <p className="mb-4">Por favor conecta tu wallet para acceder a tus registros médicos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 min-h-screen p-6">
          <h2 className="text-xl font-bold mb-8">Panel del paciente</h2>
          
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 bg-slate-700 p-3 rounded-lg">
              <DocumentTextIcon className="h-5 w-5" />
              <span>Registro de Datos</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
              <ClipboardDocumentListIcon className="h-5 w-5" />
              <span>Lista de Documentos Médicos</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
              <UserIcon className="h-5 w-5" />
              <span>Mi perfil</span>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">Registro de Datos</h1>
          
          {/* Patient Data Form */}
          <div className="bg-slate-800 p-6 rounded-lg mb-8">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre del Paciente</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Dirección de Wallet</label>
                <input
                  type="text"
                  value={walletAddress}
                  readOnly
                  className="w-full bg-slate-700 text-gray-400 p-3 rounded-lg border border-slate-600"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                Subir Nuevo Dato
              </button>
            </div>
          </div>

          {/* Additional Patient Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <ClipboardDocumentListIcon className="h-6 w-6 mr-2" />
                Documentos Médicos
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-700 rounded-lg">
                  <p className="text-sm text-gray-300">No hay documentos médicos registrados</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <ClockIcon className="h-6 w-6 mr-2" />
                Actividad Reciente
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-700 rounded-lg">
                  <p className="text-sm text-gray-300">No hay actividad reciente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;