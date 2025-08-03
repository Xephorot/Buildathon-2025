import React, { useState } from 'react';
import { User, UserPlus, Building, Stethoscope, Shield } from 'lucide-react';
import { useWeb3 } from '../contexts/Web3Context';
import { EntityType, ENTITY_TYPE_LABELS } from '../config/contracts';

const UserRegistration: React.FC = () => {
  const { user, contracts } = useWeb3();
  const [selectedType, setSelectedType] = useState<EntityType>(EntityType.PATIENT);
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (!contracts.accessControl || !user) return;

    setIsRegistering(true);
    setMessage('');

    try {
      let tx;
      
      if (selectedType === EntityType.PATIENT) {
        tx = await contracts.accessControl.registerPatient();
      } else {
        // Para otros tipos, registramos la misma dirección (en un sistema real serían direcciones diferentes)
        tx = await contracts.accessControl.registerEntity(user.address, selectedType);
      }

      await tx.wait();
      setMessage(`✅ Registrado exitosamente como ${ENTITY_TYPE_LABELS[selectedType]}`);
      
      // Actualizar el tipo de usuario después del registro
      window.location.reload();
      
    } catch (error: any) {
      console.error('Error registrando usuario:', error);
      setMessage(`❌ Error: ${error.reason || error.message}`);
    } finally {
      setIsRegistering(false);
    }
  };

  const getEntityIcon = (type: EntityType) => {
    switch (type) {
      case EntityType.PATIENT:
        return <User className="h-6 w-6" />;
      case EntityType.DOCTOR:
        return <Stethoscope className="h-6 w-6" />;
      case EntityType.INSURANCE:
        return <Building className="h-6 w-6" />;
      case EntityType.AUDITOR:
        return <Shield className="h-6 w-6" />;
      default:
        return <User className="h-6 w-6" />;
    }
  };

  if (!user) {
    return (
      <div className="text-center text-gray-500">
        Conecta tu wallet para registrarte en el sistema
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <UserPlus className="h-8 w-8 text-blue-600" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Registro de Usuario</h2>
          <p className="text-gray-600">Selecciona tu tipo de usuario en el sistema</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tipo de Usuario
          </label>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(ENTITY_TYPE_LABELS).map(([type, label]) => {
              const entityType = parseInt(type) as EntityType;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(entityType)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedType === entityType
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    {getEntityIcon(entityType)}
                    <span className="font-medium">{label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Descripción del Rol:</h4>
          <div className="text-sm text-gray-600">
            {selectedType === EntityType.PATIENT && (
              <p>Como paciente, podrás controlar quién tiene acceso a tus historias clínicas y otorgar permisos específicos.</p>
            )}
            {selectedType === EntityType.DOCTOR && (
              <p>Como doctor, podrás crear y gestionar documentos médicos para tus pacientes (con su autorización).</p>
            )}
            {selectedType === EntityType.INSURANCE && (
              <p>Como compañía de seguros, podrás acceder a historias clínicas con permisos otorgados por los pacientes.</p>
            )}
            {selectedType === EntityType.AUDITOR && (
              <p>Como auditor, tendrás acceso para supervisar y auditar el uso del sistema según las regulaciones.</p>
            )}
          </div>
        </div>

        {message && (
          <div className={`p-3 rounded-lg ${
            message.includes('✅') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <button
          onClick={handleRegister}
          disabled={isRegistering}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isRegistering ? 'Registrando...' : `Registrarse como ${ENTITY_TYPE_LABELS[selectedType]}`}
        </button>

        <div className="text-xs text-gray-500 text-center">
          <p>Dirección: {user.address}</p>
          <p>Red: Arbitrum Sepolia</p>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
