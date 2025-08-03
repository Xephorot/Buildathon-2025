import React from 'react';
import { Wallet, AlertCircle, CheckCircle, LogOut } from 'lucide-react';
import { useWeb3 } from '../contexts/Web3Context';

interface WalletConnectProps {
  compact?: boolean;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ compact = false }) => {
  const { user, connectWallet, disconnectWallet, isLoading, error } = useWeb3();

  // Versión compacta para el header
  if (compact) {
    if (user?.isConnected) {
      return (
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/30 px-3 py-2 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
            <div className="text-sm">
              <span className="font-medium text-green-700 dark:text-green-300">Wallet Conectada</span>
              <div className="text-xs text-green-600 dark:text-green-400">
                {user.address.slice(0, 6)}...{user.address.slice(-4)}
              </div>
            </div>
          </div>
          <button
            onClick={disconnectWallet}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            title="Desconectar"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={connectWallet}
        disabled={isLoading}
        className="flex items-center space-x-2 px-3 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
      >
        <Wallet className="h-4 w-4" />
        <span>{isLoading ? 'Conectando...' : 'Conectar'}</span>
      </button>
    );
  }

  // Versión completa para el dashboard
  if (user?.isConnected) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Wallet Conectada</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.address.slice(0, 6)}...{user.address.slice(-4)}
              </p>
            </div>
          </div>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Desconectar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <div className="text-center">
        <Wallet className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Conectar Wallet</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Conecta tu MetaMask para acceder al sistema de historias clínicas
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
            <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
          </div>
        )}

        <button
          onClick={connectWallet}
          disabled={isLoading}
          className="w-full px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Conectando...' : 'Conectar MetaMask'}
        </button>
        
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          <p>Red: Arbitrum Sepolia</p>
          <p>Asegúrate de tener MetaMask instalado</p>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;
