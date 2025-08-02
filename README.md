# Decentralized Medical Records System

# MODIFY WITH MORE INFO ABOUT THE BUILDATHON

# YOUR CRYPTO HEALTH

A blockchain-based platform that empowers patients with complete sovereignty over their medical data while enabling secure, permissioned access for insurance companies. Built on Avalanche's private network infrastructure.

## Project Structure

```
/
├── contracts/           # Solidity smart contracts
├── frontend/           # React web application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/      # Page components
│   │   ├── utils/      # Encryption/Web3 utilities
│   │   └── hooks/      # Custom React hooks
│   ├── public/
│   └── package.json
├── tests/             # Test suites
├── scripts/           # Deployment and utility scripts
├── cache/             # Build cache
└── artifacts/         # Compiled contracts
```

## Technology Stack

- **Blockchain**: Avalanche private network
- **Smart Contracts**: Solidity with Hardhat
- **Frontend**: React.js with Web3 integration
- **Storage**: IPFS for encrypted medical documents
- **Encryption**: ECIES (Elliptic Curve Integrated Encryption Scheme)
- **Testing**: Hardhat for contracts, Jest for frontend

## Setup and Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd decentralized-medical-records
```

2. Install dependencies:

```bash
npm run install-all
```

This will install both root and frontend dependencies.

### Development Commands

```bash
# Start frontend development server
npm run dev

# Compile smart contracts
npm run compile

# Run contract tests
npm test

# Run frontend tests
cd frontend && npm test

# Deploy contracts
npm run deploy
```

## Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
# Avalanche Network Configuration
AVALANCHE_PRIVATE_RPC=http://localhost:9650/ext/bc/C/rpc
AVALANCHE_PRIVATE_CHAIN_ID=43114
PRIVATE_KEY=your_private_key_here

# IPFS Configuration
IPFS_API_URL=http://localhost:5001
IPFS_GATEWAY_URL=http://localhost:8080
```

## Network Configuration

The project is configured for multiple Avalanche networks:

- **hardhat**: Local development network
- **avalanche_local**: Local Avalanche node
- **avalanche_fuji**: Avalanche testnet
- **avalanche_private**: Private Avalanche network

## Testing

### Smart Contract Tests

```bash
npx hardhat test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Key Features

- **Patient Data Sovereignty**: Complete control over medical records
- **Secure Encryption**: Client-side ECIES encryption before IPFS storage
- **Granular Access Control**: Smart contract-based permission management
- **Audit Trail**: Immutable logging of all access events
- **Multi-Role Support**: Patient, Specialist, and Hospital portals

## License

MIT License
