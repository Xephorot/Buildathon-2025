import React from 'react';
import { Activity, FileText, Shield, User, Calendar, TrendingUp } from 'lucide-react';
import { useWeb3 } from '../contexts/Web3Context';
import WalletConnect from './WalletConnect';

const Dashboard: React.FC = () => {
  const { user, userType } = useWeb3();

  const mockStats = {
    documentsCount: 12,
    activePermissions: 3,
    recentActivity: 8,
    lastAccess: Date.now() - 86400000 // 1 día atrás
  };

  const recentActivities = [
    {
      id: 1,
      action: 'Documento médico agregado',
      entity: 'Dr. García',
      timestamp: Date.now() - 3600000,
      type: 'document'
    },
    {
      id: 2,
      action: 'Permiso otorgado',
      entity: 'Seguro Nacional',
      timestamp: Date.now() - 7200000,
      type: 'permission'
    },
    {
      id: 3,
      action: 'Historia clínica consultada',
      entity: 'Dr. Martínez',
      timestamp: Date.now() - 10800000,
      type: 'access'
    }
  ];

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'permission':
        return <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'access':
        return <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Bienvenido a Histo Bit
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Sistema de Historias Clínicas Blockchain - Para comenzar, conecta tu wallet de MetaMask
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">¿Qué puedes hacer?</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Controlar el acceso a tus historias clínicas</li>
                <li>• Otorgar permisos temporales a médicos y seguros</li>
                <li>• Gestionar documentos médicos de forma segura</li>
                <li>• Auditar todos los accesos a tu información</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Componente de conexión de wallet */}
        <div className="max-w-md mx-auto">
          <WalletConnect />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Resumen de tu actividad en el sistema</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {userType ? `Usuario ${userType}` : 'Usuario Conectado'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.address.substring(0, 6)}...{user.address.substring(38)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Documentos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockStats.documentsCount}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600 dark:text-green-400">+2 este mes</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Permisos Activos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockStats.activePermissions}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">3 entidades autorizadas</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Actividad Reciente</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockStats.recentActivity}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">En los últimos 7 días</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Último Acceso</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {formatDate(mockStats.lastAccess)}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Desde Arbitrum Sepolia</span>
          </div>
        </div>
      </div>

      {/* Actividad reciente y accesos rápidos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actividad reciente */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Actividad Reciente</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.entity}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{formatDate(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
              Ver toda la actividad
            </button>
          </div>
        </div>

        {/* Accesos rápidos */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Accesos Rápidos</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border-2 border-gray-200 dark:border-slate-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Nuevo Documento</p>
              </button>
              
              <button className="p-4 border-2 border-gray-200 dark:border-slate-600 rounded-lg hover:border-green-300 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Gestionar Permisos</p>
              </button>
              
              <button className="p-4 border-2 border-gray-200 dark:border-slate-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors">
                <Activity className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Ver Auditoría</p>
              </button>
              
              <button className="p-4 border-2 border-gray-200 dark:border-slate-600 rounded-lg hover:border-orange-300 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-colors">
                <User className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Mi Perfil</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estado de la red */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Estado de la Red</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Arbitrum Sepolia</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Red activa</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Contratos Desplegados</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">3 contratos activos</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Gas Estimado</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">~0.001 ETH por tx</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
