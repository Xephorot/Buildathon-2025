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
  ChartBarIcon,
  HomeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Portal de Compliance/Audit</h1>
          <p className="mb-4">Por favor conecta tu wallet para acceder al sistema de evaluación de riesgos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-base-100 min-h-screen p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-8 text-primary">Portal Compliance</h2>
          
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 bg-primary text-primary-content p-3 rounded-lg">
              <HomeIcon className="h-5 w-5" />
              <span>Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
              <ChartBarIcon className="h-5 w-5" />
              <span>Evaluaciones de Riesgo</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
              <ClipboardDocumentListIcon className="h-5 w-5" />
              <span>Historial de Auditoría</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
              <DocumentTextIcon className="h-5 w-5" />
              <span>Documentos Autorizados</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
              <ShieldCheckIcon className="h-5 w-5" />
              <span>Verificación de Cumplimiento</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
              <UserGroupIcon className="h-5 w-5" />
              <span>Solicitudes de Acceso</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
              <MagnifyingGlassIcon className="h-5 w-5" />
              <span>Buscar Paciente</span>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard de Compliance y Auditoría</h1>
            <p className="text-gray-600">Supervisión y evaluación de riesgos con datos autorizados de pacientes</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <ChartBarIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Evaluaciones Totales</h3>
              <div className="text-2xl font-bold text-primary">156</div>
              <p className="text-sm text-gray-500">Evaluaciones completadas</p>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <ExclamationTriangleIcon className="h-8 w-8 text-warning mb-4" />
              <h3 className="text-lg font-semibold mb-2">Riesgo Promedio</h3>
              <div className="text-2xl font-bold text-warning">Medio</div>
              <p className="text-sm text-gray-500">Nivel de riesgo</p>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <CheckCircleIcon className="h-8 w-8 text-success mb-4" />
              <h3 className="text-lg font-semibold mb-2">Cumplimiento</h3>
              <div className="text-2xl font-bold text-success">98.5%</div>
              <p className="text-sm text-gray-500">Nivel de cumplimiento</p>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <DocumentTextIcon className="h-8 w-8 text-info mb-4" />
              <h3 className="text-lg font-semibold mb-2">Auditorías</h3>
              <div className="text-2xl font-bold text-info">24</div>
              <p className="text-sm text-gray-500">Este mes</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <button className="btn btn-primary w-full">
                  <ChartBarIcon className="h-5 w-5" />
                  Nueva Evaluación de Riesgo
                </button>
                <button className="btn btn-outline w-full">
                  <ClipboardDocumentListIcon className="h-5 w-5" />
                  Generar Reporte de Auditoría
                </button>
                <button className="btn btn-outline w-full">
                  <ShieldCheckIcon className="h-5 w-5" />
                  Verificar Cumplimiento
                </button>
                <button className="btn btn-outline w-full">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  Buscar Paciente
                </button>
              </div>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Buscar Paciente</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Ingresar dirección de wallet del paciente"
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  className="input input-bordered w-full"
                />
                <button className="btn btn-primary w-full">
                  Nueva Evaluación
                </button>
              </div>
            </div>
          </div>

          {/* Recent Assessments */}
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-6">Evaluaciones de Riesgo Recientes</h3>
            
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Dirección del Paciente</th>
                    <th>Puntuación de Riesgo</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.map((assessment, index) => (
                    <tr key={index}>
                      <td>
                        <span className="font-mono text-sm">{assessment.patientAddress}</span>
                      </td>
                      <td>
                        <div className={`badge ${
                          assessment.riskScore === 'Bajo' ? 'badge-success' :
                          assessment.riskScore === 'Medio' ? 'badge-warning' :
                          'badge-error'
                        }`}>
                          {assessment.riskScore}
                        </div>
                      </td>
                      <td>
                        <div className={`badge ${
                          assessment.status === 'Completado' ? 'badge-success' :
                          assessment.status === 'En Proceso' ? 'badge-info' :
                          'badge-ghost'
                        }`}>
                          {assessment.status}
                        </div>
                      </td>
                      <td>{assessment.date}</td>
                      <td>
                        <button className="btn btn-ghost btn-sm">Ver Detalles</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Compliance Alerts */}
          <div className="mt-8 bg-base-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Alertas de Cumplimiento</h3>
            <div className="space-y-4">
              <div className="alert alert-warning">
                <ExclamationTriangleIcon className="h-6 w-6" />
                <div>
                  <h4 className="font-semibold">Evaluación Pendiente</h4>
                  <p className="text-sm">3 evaluaciones de riesgo requieren revisión manual</p>
                </div>
              </div>
              <div className="alert alert-info">
                <CheckCircleIcon className="h-6 w-6" />
                <div>
                  <h4 className="font-semibold">Cumplimiento Actualizado</h4>
                  <p className="text-sm">Todas las auditorías del mes han sido completadas exitosamente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePortal;