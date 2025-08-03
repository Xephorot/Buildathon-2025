"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { 
  MagnifyingGlassIcon, 
  DocumentTextIcon, 
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

const InsurancePortal: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [searchAddress, setSearchAddress] = useState("");
  const [assessments] = useState([
    { patientAddress: "0x123abc...", riskScore: "Bajo", status: "Completado", date: "2024-01-15" },
    { patientAddress: "0x456def...", riskScore: "Medio", status: "En Proceso", date: "2024-01-14" },
    { patientAddress: "0x789ghi...", riskScore: "Alto", status: "Pendiente", date: "2024-01-13" },
  ]);

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Portal de Compliance/Audit</h1>
          <p className="mb-4">Por favor conecta tu wallet para acceder al sistema de evaluación de riesgos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 min-h-screen p-6">
          <h2 className="text-xl font-bold mb-8">Portal Compliance</h2>
          
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 bg-slate-700 p-3 rounded-lg">
              <MagnifyingGlassIcon className="h-5 w-5" />
              <span>Buscar Paciente</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
              <ChartBarIcon className="h-5 w-5" />
              <span>Evaluaciones de Riesgo</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
              <DocumentTextIcon className="h-5 w-5" />
              <span>Documentos Autorizados</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
              <ClipboardDocumentListIcon className="h-5 w-5" />
              <span>Historial de Auditoría</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
              <UserGroupIcon className="h-5 w-5" />
              <span>Solicitudes de Acceso</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
              <ShieldCheckIcon className="h-5 w-5" />
              <span>Verificación de Cumplimiento</span>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Search Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6">Evaluación de Riesgos</h1>
            
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
                  Nueva Evaluación
                </button>
              </div>
            </div>
          </div>

          {/* Risk Assessments Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Evaluaciones de Riesgo</h2>
            
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 gap-px bg-slate-600">
                <div className="bg-slate-700 p-4 font-semibold">
                  Dirección del Paciente
                </div>
                <div className="bg-slate-700 p-4 font-semibold">
                  Puntuación de Riesgo
                </div>
                <div className="bg-slate-700 p-4 font-semibold">
                  Estado
                </div>
                <div className="bg-slate-700 p-4 font-semibold">
                  Fecha
                </div>
              </div>
              
              {assessments.map((assessment, index) => (
                <div key={index} className="grid grid-cols-4 gap-px bg-slate-600">
                  <div className="bg-slate-800 p-4">
                    {assessment.patientAddress}
                  </div>
                  <div className="bg-slate-800 p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      assessment.riskScore === 'Bajo' ? 'bg-green-600 text-white' :
                      assessment.riskScore === 'Medio' ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {assessment.riskScore}
                    </span>
                  </div>
                  <div className="bg-slate-800 p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      assessment.status === 'Completado' ? 'bg-green-600 text-white' :
                      assessment.status === 'En Proceso' ? 'bg-blue-600 text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      {assessment.status}
                    </span>
                  </div>
                  <div className="bg-slate-800 p-4">
                    {assessment.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Evaluaciones Totales</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <ChartBarIcon className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Riesgo Promedio</p>
                  <p className="text-2xl font-bold text-yellow-400">Medio</p>
                </div>
                <ShieldCheckIcon className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Cumplimiento</p>
                  <p className="text-2xl font-bold text-green-400">98.5%</p>
                </div>
                <DocumentTextIcon className="h-8 w-8 text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePortal;