"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  CalendarIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  KeyIcon
} from "@heroicons/react/24/outline";
import PatientSidebar from "~~/components/PatientSidebar";

const PatientProfile: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    nombre: "Juan Pérez",
    email: "juan.perez@email.com",
    telefono: "+591 7123-4567",
    fechaNacimiento: "1985-03-15",
    cedula: "12345678",
    direccion: "Av. Ballivián 123, La Paz, Bolivia",
    tipoSangre: "O+",
    alergias: "Penicilina, Mariscos",
    contactoEmergencia: "María Pérez - +591 7987-6543",
    seguroMedico: "Seguro Universal de Salud"
  });

  if (!connectedAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-base-content">Mi Perfil</h1>
          <p className="mb-4 text-base-content">Por favor conecta tu wallet para ver tu perfil.</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // Aquí iría la lógica para guardar los datos
    setIsEditing(false);
    console.log("Guardando datos del perfil:", profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Aquí podrías revertir los cambios si es necesario
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex">
        <PatientSidebar />
        
        <div className="flex-1 p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-base-content">Mi Perfil</h1>
                <p className="text-base-content/70">Gestiona tu información personal y médica</p>
              </div>
              <div className="flex gap-2">
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary"
                  >
                    Editar Perfil
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={handleCancel}
                      className="btn btn-ghost"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={handleSave}
                      className="btn btn-primary"
                    >
                      Guardar Cambios
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-base-100 p-6 rounded-lg shadow-md">
                <div className="text-center mb-6">
                  <div className="avatar placeholder mb-4">
                    <div className="bg-primary text-primary-content rounded-full w-24">
                      <span className="text-3xl">{profileData.nombre.charAt(0)}</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-base-content">{profileData.nombre}</h2>
                  <p className="text-base-content/70">{profileData.email}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <IdentificationIcon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-base-content/70">Cédula de Identidad</p>
                      <p className="font-medium text-base-content">{profileData.cedula}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-base-content/70">Fecha de Nacimiento</p>
                      <p className="font-medium text-base-content">
                        {new Date(profileData.fechaNacimiento).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <KeyIcon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-base-content/70">Wallet Address</p>
                      <p className="font-mono text-xs text-base-content">
                        {connectedAddress?.slice(0, 10)}...{connectedAddress?.slice(-8)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Card */}
              <div className="bg-base-100 p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-semibold mb-4 text-base-content flex items-center gap-2">
                  <ShieldCheckIcon className="h-5 w-5" />
                  Seguridad
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base-content/70">Autenticación 2FA</span>
                    <span className="badge badge-success">Activa</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base-content/70">Wallet Conectada</span>
                    <span className="badge badge-success">Verificada</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base-content/70">Encriptación</span>
                    <span className="badge badge-success">ECIES</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <div className="bg-base-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-6 text-base-content">Información Personal</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">
                      <span className="label-text">Nombre Completo</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={profileData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-base-200 rounded-lg">
                        <p className="text-base-content">{profileData.nombre}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Correo Electrónico</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        className="input input-bordered w-full"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-base-200 rounded-lg">
                        <p className="text-base-content">{profileData.email}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Teléfono</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        className="input input-bordered w-full"
                        value={profileData.telefono}
                        onChange={(e) => handleInputChange('telefono', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-base-200 rounded-lg">
                        <p className="text-base-content">{profileData.telefono}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Fecha de Nacimiento</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        className="input input-bordered w-full"
                        value={profileData.fechaNacimiento}
                        onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-base-200 rounded-lg">
                        <p className="text-base-content">{new Date(profileData.fechaNacimiento).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="label">
                      <span className="label-text">Dirección</span>
                    </label>
                    {isEditing ? (
                      <textarea
                        className="textarea textarea-bordered w-full"
                        rows={2}
                        value={profileData.direccion}
                        onChange={(e) => handleInputChange('direccion', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-base-200 rounded-lg">
                        <p className="text-base-content">{profileData.direccion}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="bg-base-100 p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-semibold mb-6 text-base-content">Información Médica</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">
                      <span className="label-text">Tipo de Sangre</span>
                    </label>
                    {isEditing ? (
                      <select
                        className="select select-bordered w-full"
                        value={profileData.tipoSangre}
                        onChange={(e) => handleInputChange('tipoSangre', e.target.value)}
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-base-200 rounded-lg">
                        <p className="text-base-content">{profileData.tipoSangre}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Seguro Médico</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={profileData.seguroMedico}
                        onChange={(e) => handleInputChange('seguroMedico', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-base-200 rounded-lg">
                        <p className="text-base-content">{profileData.seguroMedico}</p>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="label">
                      <span className="label-text">Alergias</span>
                    </label>
                    {isEditing ? (
                      <textarea
                        className="textarea textarea-bordered w-full"
                        rows={2}
                        placeholder="Enumera tus alergias separadas por comas"
                        value={profileData.alergias}
                        onChange={(e) => handleInputChange('alergias', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-base-200 rounded-lg">
                        <p className="text-base-content">{profileData.alergias || "Ninguna alergia registrada"}</p>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="label">
                      <span className="label-text">Contacto de Emergencia</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Nombre - Teléfono"
                        value={profileData.contactoEmergencia}
                        onChange={(e) => handleInputChange('contactoEmergencia', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-base-200 rounded-lg">
                        <p className="text-base-content">{profileData.contactoEmergencia}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;