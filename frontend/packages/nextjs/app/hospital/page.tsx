"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  DocumentMagnifyingGlassIcon,
  HomeIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const HospitalPortal: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Portal de Clínica</h1>
          <p className="mb-4">Por favor conecta tu wallet para acceder a las herramientas de evaluación de riesgo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-base-100 min-h-screen p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-8 text-primary">Portal de Clínica</h2>

          <nav className="space-y-2">
            <div className="flex items-center space-x-3 bg-primary text-primary-content p-3 rounded-lg">
              <HomeIcon className="h-5 w-5" />
              <span>Dashboard</span>
            </div>

            <Link
              href="/hospital/assessments"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors"
            >
              <ChartBarIcon className="h-5 w-5" />
              <span>Evaluaciones de Riesgo</span>
            </Link>

            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
              <UserGroupIcon className="h-5 w-5" />
              <span>Pacientes</span>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
              <DocumentMagnifyingGlassIcon className="h-5 w-5" />
              <span>Registros Autorizados</span>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
              <ClipboardDocumentListIcon className="h-5 w-5" />
              <span>Reportes</span>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
              <ShieldCheckIcon className="h-5 w-5" />
              <span>Gestión de Pólizas</span>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-base-200 cursor-pointer transition-colors">
              <CogIcon className="h-5 w-5" />
              <span>Configuración</span>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard de Clínica</h1>
            <p className="text-gray-600">
              Evaluación de riesgo y suscripción de pólizas con datos autorizados de pacientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <ChartBarIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Evaluaciones de Riesgo</h3>
              <div className="text-2xl font-bold text-primary">12</div>
              <p className="text-sm text-gray-500">Evaluaciones completadas</p>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <DocumentMagnifyingGlassIcon className="h-8 w-8 text-success mb-4" />
              <h3 className="text-lg font-semibold mb-2">Registros Autorizados</h3>
              <div className="text-2xl font-bold text-success">45</div>
              <p className="text-sm text-gray-500">Registros disponibles</p>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <ShieldCheckIcon className="h-8 w-8 text-info mb-4" />
              <h3 className="text-lg font-semibold mb-2">Pólizas Activas</h3>
              <div className="text-2xl font-bold text-info">28</div>
              <p className="text-sm text-gray-500">Pólizas en gestión</p>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <UserGroupIcon className="h-8 w-8 text-warning mb-4" />
              <h3 className="text-lg font-semibold mb-2">Pacientes</h3>
              <div className="text-2xl font-bold text-warning">156</div>
              <p className="text-sm text-gray-500">Pacientes registrados</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <Link href="/hospital/assessments/new" className="btn btn-primary w-full">
                  <ChartBarIcon className="h-5 w-5" />
                  Nueva Evaluación de Riesgo
                </Link>
                <Link href="/hospital/assessments" className="btn btn-outline w-full">
                  <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                  Ver Todas las Evaluaciones
                </Link>
                <button className="btn btn-outline w-full">
                  <ShieldCheckIcon className="h-5 w-5" />
                  Gestión de Pólizas
                </button>
                <button className="btn btn-outline w-full">
                  <UserGroupIcon className="h-5 w-5" />
                  Buscar Paciente
                </button>
              </div>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Actividad Reciente</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <ChartBarIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Evaluación completada</p>
                    <p className="text-sm text-gray-600">Paciente #12345 - Riesgo Medio</p>
                    <p className="text-xs text-gray-500">Hace 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <ShieldCheckIcon className="h-5 w-5 text-success" />
                  <div>
                    <p className="font-medium">Póliza aprobada</p>
                    <p className="text-sm text-gray-600">Póliza #POL-2024-001</p>
                    <p className="text-xs text-gray-500">Hace 4 horas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <DocumentMagnifyingGlassIcon className="h-5 w-5 text-info" />
                  <div>
                    <p className="font-medium">Nuevo registro autorizado</p>
                    <p className="text-sm text-gray-600">Paciente #12346</p>
                    <p className="text-xs text-gray-500">Hace 6 horas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Evaluaciones Recientes</h3>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>ID Paciente</th>
                    <th>Fecha de Evaluación</th>
                    <th>Puntuación de Riesgo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="font-mono">#12345</span>
                    </td>
                    <td>2024-01-25</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="badge badge-warning">Medio</div>
                        <span>65/100</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-success">Completado</span>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-sm">Ver Detalles</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="font-mono">#12346</span>
                    </td>
                    <td>2024-01-24</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="badge badge-success">Bajo</div>
                        <span>35/100</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-success">Completado</span>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-sm">Ver Detalles</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="font-mono">#12347</span>
                    </td>
                    <td>2024-01-23</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="badge badge-error">Alto</div>
                        <span>85/100</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-warning">En Revisión</span>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-sm">Ver Detalles</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalPortal;
