// Configuración de red para Arbitrum Sepolia
export const NETWORK_CONFIG = {
  chainId: 421614,
  chainName: 'Arbitrum Sepolia',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
  blockExplorerUrls: ['https://sepolia.arbiscan.io/'],
};

// Función para cambiar a Arbitrum Sepolia
export const switchToArbitrumSepolia = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask no está instalado');
  }

  try {
    // Intentar cambiar a la red
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${NETWORK_CONFIG.chainId.toString(16)}` }],
    });
  } catch (switchError: any) {
    // Si la red no existe, agregarla
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${NETWORK_CONFIG.chainId.toString(16)}`,
              chainName: NETWORK_CONFIG.chainName,
              nativeCurrency: NETWORK_CONFIG.nativeCurrency,
              rpcUrls: NETWORK_CONFIG.rpcUrls,
              blockExplorerUrls: NETWORK_CONFIG.blockExplorerUrls,
            },
          ],
        });
      } catch (addError) {
        throw new Error('Error agregando la red Arbitrum Sepolia');
      }
    } else {
      throw new Error('Error cambiando a Arbitrum Sepolia');
    }
  }
};

export const isCorrectNetwork = (chainId: number) => {
  return chainId === NETWORK_CONFIG.chainId;
};
