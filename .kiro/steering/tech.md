# Technology Stack

## Blockchain & Infrastructure
- **Primary Network**: Avalanche blockchain
- **Node Architecture**: Private network with permissioned access
- **Smart Contracts**: Solidity-based contracts for access control and permissions
- **Storage**: IPFS for encrypted medical document storage

## Frontend & User Interface
- **Framework**: Scaffold-ETH 2 (Next.js + React + TypeScript)
- **Web3 Integration**: Built-in Wagmi hooks with TypeScript autocompletions
- **Wallet Integration**: RainbowKit for seamless wallet connectivity (MetaMask, WalletConnect, etc.)
- **Smart Contract Interaction**: Custom hooks for reading/writing to deployed contracts
- **Development Tools**: Built-in contract debugging and block explorer
- **Client-side Encryption**: Browser-based encryption before IPFS upload

## Cryptography & Security
- **Encryption Scheme**: ECIES (Elliptic Curve Integrated Encryption Scheme) or similar
- **Access Control**: Delegated decryption with smart contract permission management
- **Alternative Solutions**: Consider Lit Protocol for complex cryptographic operations

## Development Considerations
- **MVP Complexity**: High - requires sophisticated encryption/decryption flows
- **Critical Path**: Client-side encryption → IPFS storage → Smart contract permissions → Delegated access
- **Risk Areas**: Cryptographic implementation, cross-user decryption flows

## Common Commands
*Using Scaffold-ETH 2 development stack*

```bash
# Scaffold-ETH 2 setup and development
yarn install        # Install dependencies
yarn chain          # Start local Hardhat network
yarn deploy         # Deploy contracts to local network
yarn start          # Start Next.js frontend
yarn verify         # Verify contracts on network

# Development workflow
yarn compile        # Compile smart contracts
yarn test           # Run contract tests
yarn build          # Build for production
yarn generate       # Generate account for deployment

# Network-specific deployments
yarn deploy --network avalanche-local
yarn deploy --network avalanche-testnet
yarn deploy --network avalanche-mainnet
```