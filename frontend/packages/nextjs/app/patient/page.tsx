"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import Link from "next/link";
import PatientSidebar from "~~/components/PatientSidebar";
import { 
  DocumentTextIcon, 
  ClipboardDocumentListIcon,
  UserIcon,
  ClockIcon,
  ShieldCheckIcon,
  CloudArrowUpIcon
} from "@heroicons/react/24/outline";

const PatientDashboard: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [patientName, setPatientName] = useState("Juan Pérez");

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Panel del Paciente</h1>
          <p className="mb-4">Por favor conecta tu wallet para acceder a tus registros médicos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex">
        <PatientSidebar />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Bienvenido, {patientName}</h1>
            <p className="text-gray-600">Gestiona tus registros médicos de forma segura y descentralizada</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <ClipboardDocumentListIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Documentos</h3>
              <div className="text-2xl font-bold text-primary">4</div>
              <p className="text-sm text-gray-500">Registros médicos</p>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <ShieldCheckIcon className="h-8 w-8 text-success mb-4" />
              <h3 className="text-lg font-semibold mb-2">Permisos Activos</h3>
              <div className="text-2xl font-bold text-success">2</div>
              <p className="text-sm text-gray-500">Accesos otorgados</p>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <ClockIcon className="h-8 w-8 text-info mb-4" />
              <h3 className="text-lg font-semibold mb-2">Actividad</h3>
              <div className="text-2xl font-bold text-info">12</div>
              <p className="text-sm text-gray-500">Eventos recientes</p>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <UserIcon className="h-8 w-8 text-warning mb-4" />
              <h3 className="text-lg font-semibold mb-2">Perfil</h3>
              <div className="text-sm font-bold text-warning">Completo</div>
              <p className="text-sm text-gray-500">Estado del perfil</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <Link href="/patient/upload" className="btn btn-primary w-full">
                  <CloudArrowUpIcon className="h-5 w-5" />
                  Subir Nuevo Documento
                </Link>
                <Link href="/patient/permissions" className="btn btn-outline w-full">
                  <ShieldCheckIcon className="h-5 w-5" />
                  Gestionar Permisos
                </Link>
                <Link href="/patient/records" className="btn btn-outline w-full">
                  <ClipboardDocumentListIcon className="h-5 w-5" />
                  Ver Mis Registros
                </Link>
              </div>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Actividad Reciente</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <DocumentTextIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Documento subido</p>
                    <p className="text-sm text-gray-600">Prescription - Antibiotics</p>
                    <p className="text-xs text-gray-500">Hace 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <ShieldCheckIcon className="h-5 w-5 text-success" />
                  <div>
                    <p className="font-medium">Permiso otorgado</p>
                    <p className="text-sm text-gray-600">Dr. Maria Rodriguez</p>
                    <p className="text-xs text-gray-500">Hace 1 día</p>
                  </div>
                </div>
                <div className="text-center">
                  <Link href="/patient/activity" className="btn btn-ghost btn-sm">
                    Ver todo el historial →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="bg-base-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Información del Paciente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre del Paciente</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Dirección de Wallet</label>
                <input
                  type="text"
                  value={connectedAddress}
                  readOnly
                  className="input input-bordered w-full bg-base-200"
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button className="btn btn-primary">
                Actualizar Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;