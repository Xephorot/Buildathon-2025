"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import Link from "next/link";
import { 
  MagnifyingGlassIcon, 
  DocumentTextIcon, 
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  HomeIcon
} from "@heroicons/react/24/outline";

const SpecialistPortal: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [searchAddress, setSearchAddress] = useState("");
  const [authorizedPatients] = useState([
    { address: "0x123abc...", name: "Juan Pérez", action: "Ver Historial Médico" },
    { address: "0x456def...", name: "María García", action: "Ver Historial Médico" },
    { address: "0x789ghi...", name: "Carlos López", action: "Ver Historial Médico" },
  ]);

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Portal Médico</h1>
          <p className="mb-4">Por favor conecta tu wallet para acceder a los registros de pacientes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-base-100 min-h-screen p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-8 text-primary">Portal Médico</h2>
          
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 bg-primary text-primary-content p-3 rounded-lg">
              <HomeIcon className="h-5 w-5" />
              <span>Dashboard</span>
            </div>
            
            <Link href="/specialist/patients" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
              <UserGroupIcon className="h-5 w-5" />
              <span>Mis Pacientes</span>
            </Link>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
              <MagnifyingGlassIcon className="h-5 w-5" />
              <span>Buscar Paciente</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
              <DocumentTextIcon className="h-5 w-5" />
              <span>Documentos Autorizados</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
              <ClipboardDocumentListIcon className="h-5 w-5" />
              <span>Historial de Tratamiento</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
              <ShieldCheckIcon className="h-5 w-5" />
              <span>Verificación Profesional</span>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard Médico</h1>
            <p className="text-gray-600">Accede a los registros médicos autorizados por tus pacientes</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <UserGroupIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Pacientes</h3>
              <div className="text-2xl font-bold text-primary">{authorizedPatients.length}</div>
              <p className="text-sm text-gray-500">Con acceso autorizado</p>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <DocumentTextIcon className="h-8 w-8 text-success mb-4" />
              <h3 className="text-lg font-semibold mb-2">Documentos</h3>
              <div className="text-2xl font-bold text-success">15</div>
              <p className="text-sm text-gray-500">Registros disponibles</p>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <ClipboardDocumentListIcon className="h-8 w-8 text-info mb-4" />
              <h3 className="text-lg font-semibold mb-2">Consultas</h3>
              <div className="text-2xl font-bold text-info">8</div>
              <p className="text-sm text-gray-500">Este mes</p>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <ShieldCheckIcon className="h-8 w-8 text-warning mb-4" />
              <h3 className="text-lg font-semibold mb-2">Verificación</h3>
              <div className="text-sm font-bold text-warning">Verificado</div>
              <p className="text-sm text-gray-500">Estado profesional</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <Link href="/specialist/patients" className="btn btn-primary w-full">
                  <UserGroupIcon className="h-5 w-5" />
                  Ver Mis Pacientes
                </Link>
                <button className="btn btn-outline w-full">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  Buscar Nuevo Paciente
                </button>
                <button className="btn btn-outline w-full">
                  <DocumentTextIcon className="h-5 w-5" />
                  Documentos Recientes
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
                  Solicitar Acceso
                </button>
              </div>
            </div>
          </div>

          {/* Recent Patients */}
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-6">Pacientes Recientes</h3>
            
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>Dirección de Wallet</th>
                    <th>Documentos Disponibles</th>
                    <th>Última Consulta</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {authorizedPatients.map((patient, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                              <span className="text-xs">{patient.name.charAt(0)}</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{patient.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="font-mono text-sm">{patient.address}</span>
                      </td>
                      <td>
                        <span className="badge badge-primary">3 documentos</span>
                      </td>
                      <td>
                        <span className="text-sm text-gray-600">Hace 2 días</span>
                      </td>
                      <td>
                        <Link 
                          href={`/specialist/patients/${patient.address}/records`}
                          className="btn btn-ghost btn-sm"
                        >
                          Ver Registros
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistPortal;