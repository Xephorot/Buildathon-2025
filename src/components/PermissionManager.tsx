import React, { useState, useEffect, useCallback } from 'react';
import { Shield, User, Building, Check, X, Clock, Search } from 'lucide-react';
import { useWeb3 } from '../contexts/Web3Context';
import { PermissionType, EntityType, PERMISSION_TYPE_LABELS, ENTITY_TYPE_LABELS } from '../config/contracts';

interface Permission {
  entity: string;
  entityType: EntityType;
  permissionType: PermissionType;
  expirationTime: number;
  isActive: boolean;
  timestamp: number;
}

const PermissionManager: React.FC = () => {
  const { user, contracts } = useWeb3();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [showGrantForm, setShowGrantForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPermission, setNewPermission] = useState({
    entity: '',
    permissionType: PermissionType.READ,
    duration: 7 // días
  });

  const loadPermissions = useCallback(async () => {
    if (!contracts.accessControl) return;
    
    setLoading(true);
    try {
      // En un sistema real, implementarías eventos para obtener todos los permisos
      // Por ahora simulamos algunos permisos
      const mockPermissions: Permission[] = [
        {
          entity: '0xDoctor123...456',
          entityType: EntityType.DOCTOR,
          permissionType: PermissionType.READ,
          expirationTime: Date.now() + 7 * 24 * 60 * 60 * 1000,
          isActive: true,
          timestamp: Date.now() - 86400000
        },
        {
          entity: '0xInsurance789...012',
          entityType: EntityType.INSURANCE,
          permissionType: PermissionType.READ,
          expirationTime: Date.now() + 30 * 24 * 60 * 60 * 1000,
          isActive: true,
          timestamp: Date.now() - 172800000
        }
      ];
      
      setPermissions(mockPermissions);
    } catch (error) {
      console.error('Error cargando permisos:', error);
    } finally {
      setLoading(false);
    }
  }, [contracts.accessControl]);

  useEffect(() => {
    if (user && contracts.accessControl) {
      loadPermissions();
    }
  }, [user, contracts.accessControl, loadPermissions]);

  const handleGrantPermission = async () => {
    if (!contracts.accessControl || !user) return;

    setLoading(true);
    try {
      const expirationTime = Math.floor(Date.now() / 1000) + (newPermission.duration * 24 * 60 * 60);
      
      const tx = await contracts.accessControl.grantAccess(
        newPermission.entity,
        newPermission.permissionType,
        expirationTime
      );

      await tx.wait();
      
      // Recargar permisos
      await loadPermissions();
      
      // Limpiar formulario
      setNewPermission({
        entity: '',
        permissionType: PermissionType.READ,
        duration: 7
      });
      setShowGrantForm(false);
      
    } catch (error: any) {
      console.error('Error otorgando permiso:', error);
      alert(`Error: ${error.reason || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokePermission = async (entity: string) => {
    if (!contracts.accessControl || !user) return;

    if (!window.confirm('¿Estás seguro de que quieres revocar este permiso?')) return;

    setLoading(true);
    try {
      const tx = await contracts.accessControl.revokeAccess(entity);
      await tx.wait();
      
      // Recargar permisos
      await loadPermissions();
      
    } catch (error: any) {
      console.error('Error revocando permiso:', error);
      alert(`Error: ${error.reason || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredPermissions = permissions.filter(permission => {
    if (!searchTerm) return true;
    
    return permission.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
           ENTITY_TYPE_LABELS[permission.entityType].toLowerCase().includes(searchTerm.toLowerCase()) ||
           PERMISSION_TYPE_LABELS[permission.permissionType].toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEntityIcon = (type: EntityType) => {
    switch (type) {
      case EntityType.DOCTOR:
        return <User className="h-5 w-5 text-blue-600" />;
      case EntityType.INSURANCE:
        return <Building className="h-5 w-5 text-green-600" />;
      case EntityType.AUDITOR:
        return <Shield className="h-5 w-5 text-purple-600" />;
      default:
        return <User className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPermissionColor = (type: PermissionType) => {
    const colors = {
      [PermissionType.READ]: 'bg-blue-100 text-blue-800',
      [PermissionType.WRITE]: 'bg-orange-100 text-orange-800',
      [PermissionType.FULL]: 'bg-red-100 text-red-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const isExpired = (expirationTime: number) => {
    return expirationTime < Date.now();
  };

  const isExpiringSoon = (expirationTime: number) => {
    const threeDays = 3 * 24 * 60 * 60 * 1000;
    return expirationTime - Date.now() < threeDays && !isExpired(expirationTime);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Permisos</h2>
            <p className="text-gray-600 dark:text-gray-400">Controla quién tiene acceso a tus historias clínicas</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowGrantForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Shield className="h-5 w-5" />
          <span>Otorgar Permiso</span>
        </button>
      </div>

      {/* Búsqueda */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por dirección, tipo de entidad o tipo de permiso..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Permisos Activos</p>
              <p className="text-2xl font-bold text-gray-900">
                {permissions.filter(p => p.isActive && !isExpired(p.expirationTime)).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Expiran Pronto</p>
              <p className="text-2xl font-bold text-gray-900">
                {permissions.filter(p => isExpiringSoon(p.expirationTime)).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <X className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Expirados</p>
              <p className="text-2xl font-bold text-gray-900">
                {permissions.filter(p => isExpired(p.expirationTime)).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de permisos */}
      <div className="bg-white rounded-lg shadow-md">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando permisos...</p>
          </div>
        ) : filteredPermissions.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredPermissions.map((permission, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getEntityIcon(permission.entityType)}
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-gray-900">{permission.entity}</p>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                          {ENTITY_TYPE_LABELS[permission.entityType]}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getPermissionColor(permission.permissionType)}`}>
                          {PERMISSION_TYPE_LABELS[permission.permissionType]}
                        </span>
                        <span>Otorgado: {formatDate(permission.timestamp)}</span>
                        <span>Expira: {formatDate(permission.expirationTime)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isExpired(permission.expirationTime) ? (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                        Expirado
                      </span>
                    ) : isExpiringSoon(permission.expirationTime) ? (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                        Expira pronto
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                        Activo
                      </span>
                    )}

                    {permission.isActive && !isExpired(permission.expirationTime) && (
                      <button
                        onClick={() => handleRevokePermission(permission.entity)}
                        className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Revocar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron permisos</p>
          </div>
        )}
      </div>

      {/* Modal para otorgar permiso */}
      {showGrantForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Otorgar Nuevo Permiso</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección de la Entidad
                </label>
                <input
                  type="text"
                  value={newPermission.entity}
                  onChange={(e) => setNewPermission({ ...newPermission, entity: e.target.value })}
                  placeholder="0x..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Permiso
                </label>
                <select
                  value={newPermission.permissionType}
                  onChange={(e) => setNewPermission({ ...newPermission, permissionType: parseInt(e.target.value) as PermissionType })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.entries(PERMISSION_TYPE_LABELS).map(([type, label]) => (
                    <option key={type} value={type}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duración (días)
                </label>
                <select
                  value={newPermission.duration}
                  onChange={(e) => setNewPermission({ ...newPermission, duration: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1}>1 día</option>
                  <option value={7}>7 días</option>
                  <option value={30}>30 días</option>
                  <option value={90}>90 días</option>
                  <option value={365}>1 año</option>
                </select>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Importante:</strong> Una vez otorgado, este permiso permitirá a la entidad 
                  acceder a tus historias clínicas según el nivel de acceso seleccionado.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex space-x-3">
              <button
                onClick={handleGrantPermission}
                disabled={loading || !newPermission.entity}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Otorgando...' : 'Otorgar Permiso'}
              </button>
              <button
                onClick={() => setShowGrantForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionManager;
