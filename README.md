# 🏥 Histo Bit - Decentralized Medical Records System

**Buildathon 2025 Project - Team: YOUR CRYPTO HEALTH**

A revolutionary blockchain-based platform that empowers patients with complete sovereignty over their medical data while enabling secure, permissioned access for medical specialists and insurance companies. Built on Avalanche's private network infrastructure using Scaffold-ETH 2.

## 🌟 Key Features

- **🔐 Patient Data Sovereignty**: Complete control over medical records with blockchain-based ownership
- **🛡️ Secure Encryption**: Client-side ECIES encryption before IPFS storage
- **⚡ Granular Access Control**: Smart contract-based permission management with expiration dates
- **📋 Immutable Audit Trail**: Complete logging of all access events and permission changes
- **👥 Multi-Role Support**: Dedicated portals for Patients, Medical Specialists, and Insurance Companies
- **🌐 Avalanche Integration**: Built for private network deployment with public testnet support

## 🏗️ Project Structure

```
/
├── frontend/                    # Scaffold-ETH 2 Application
│   ├── packages/
│   │   ├── hardhat/            # Smart contracts & deployment
│   │   │   ├── contracts/      # Solidity contracts
│   │   │   ├── deploy/         # Deployment scripts
│   │   │   └── test/           # Contract tests
│   │   └── nextjs/             # Next.js frontend
│   │       ├── app/            # App router pages
│   │       │   ├── patient/    # Patient portal
│   │       │   ├── specialist/ # Medical specialist portal
│   │       │   └── insurance/  # Insurance company portal
│   │       ├── components/     # React components
│   │       ├── hooks/          # Custom Web3 hooks
│   │       └── utils/          # Utilities & helpers
├── contracts/                   # Additional contract sources
├── .kiro/                      # Kiro IDE specifications
└── README.md
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Blockchain**: Avalanche (Mainnet, Fuji Testnet, Local)
- **Smart Contracts**: Solidity 0.8.20 with Hardhat
- **Web3 Integration**: Wagmi, Viem, RainbowKit
- **Storage**: IPFS for encrypted medical documents
- **Encryption**: ECIES (Elliptic Curve Integrated Encryption Scheme)
- **Styling**: Tailwind CSS with DaisyUI
- **Development**: Scaffold-ETH 2 framework

## 🚀 Quick Start

### Prerequisites

- **Node.js** (>= v20.18.3) - [Download](https://nodejs.org/)
- **Yarn** (v3.2.3 included in project)
- **Git** - [Download](https://git-scm.com/)

### Installation & Setup

1. **Clone the repository:**

```bash
git clone <repository-url>
cd decentralized-medical-records
```

2. **Navigate to frontend directory:**

```bash
cd frontend
```

3. **Install dependencies:**

```bash
# Use the project's yarn version
node .yarn/releases/yarn-3.2.3.cjs install
```

### 🏃‍♂️ Running the Application

**You need 3 terminals for full development setup:**

#### Terminal 1: Start Local Blockchain

```bash
cd frontend
node .yarn/releases/yarn-3.2.3.cjs chain
```

This starts a local Hardhat network on `http://localhost:8545`

#### Terminal 2: Deploy Smart Contracts

```bash
cd frontend
node .yarn/releases/yarn-3.2.3.cjs deploy
```

This deploys all medical records contracts to the local network

#### Terminal 3: Start Frontend Application

```bash
cd frontend
node .yarn/releases/yarn-3.2.3.cjs start
```

Visit the app at: `http://localhost:3000`

## 📋 Available Commands

### Development Commands

```bash
# Frontend development
node .yarn/releases/yarn-3.2.3.cjs start          # Start Next.js dev server
node .yarn/releases/yarn-3.2.3.cjs build          # Build for production

# Blockchain development
node .yarn/releases/yarn-3.2.3.cjs chain          # Start local Hardhat network
node .yarn/releases/yarn-3.2.3.cjs deploy         # Deploy contracts
node .yarn/releases/yarn-3.2.3.cjs compile        # Compile contracts
node .yarn/releases/yarn-3.2.3.cjs test           # Run contract tests

# Account management
node .yarn/releases/yarn-3.2.3.cjs generate       # Generate new account
node .yarn/releases/yarn-3.2.3.cjs account        # Show account info

# Code quality
node .yarn/releases/yarn-3.2.3.cjs lint           # Lint code
node .yarn/releases/yarn-3.2.3.cjs format         # Format code
```

### Alternative Yarn Commands (if yarn is globally installed)

```bash
yarn start    # Start frontend
yarn chain    # Start blockchain
yarn deploy   # Deploy contracts
yarn test     # Run tests
```

## 🌐 Network Configuration

The application supports multiple Avalanche networks:

- **Hardhat Local** (Chain ID: 31337) - Development
- **Avalanche Mainnet** (Chain ID: 43114) - Production
- **Avalanche Fuji** (Chain ID: 43113) - Testnet
- **Avalanche Local** (Chain ID: 43112) - Local Avalanche node

## 🔧 Environment Configuration

Create `.env.local` in `frontend/packages/nextjs/`:

```bash
# Wallet Connect Project ID (get from https://cloud.walletconnect.com)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Alchemy API Key (optional, for better RPC performance)
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key

# IPFS Configuration (when implementing IPFS storage)
NEXT_PUBLIC_IPFS_API_URL=http://localhost:5001
NEXT_PUBLIC_IPFS_GATEWAY_URL=http://localhost:8080
```

## 🏥 User Portals

### 👤 Patient Portal (`/patient`)

- Upload and manage medical records
- Control access permissions for specialists and insurers
- View audit trail of data access
- Manage document encryption and sharing

### 🩺 Medical Specialist Portal (`/specialist`)

- Access authorized patient records
- Request access to additional patient data
- View medical history with proper permissions
- Maintain professional audit compliance

### 🏢 Insurance Portal (`/insurance`)

- Conduct risk assessments with authorized data
- Perform policy underwriting analysis
- Access permitted medical records for evaluation
- Generate compliance reports

## 🧪 Testing

### Smart Contract Tests

```bash
cd frontend
node .yarn/releases/yarn-3.2.3.cjs hardhat:test
```

### Frontend Tests

```bash
cd frontend
node .yarn/releases/yarn-3.2.3.cjs next:test
```

## 🔍 Debugging

- **Debug Contracts**: Visit `http://localhost:3000/debug` to interact with deployed contracts
- **Block Explorer**: Visit `http://localhost:3000/blockexplorer` to explore local blockchain
- **Network Issues**: Check that local blockchain is running on port 8545

## 📚 Smart Contracts

- **AccessControl.sol**: Manages permissions and role-based access
- **MedicalRecords.sol**: Stores medical record metadata and IPFS hashes
- **AuditTrail.sol**: Immutable logging of all system interactions
- **YourContract.sol**: Example contract for testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Buildathon 2025

This project was developed for Buildathon 2025, focusing on revolutionizing healthcare data management through blockchain technology and patient empowerment.

**Team**: YOUR CRYPTO HEALTH  
**Focus**: Decentralized Medical Records for Private Insurance  
**Technology**: Avalanche + Scaffold-ETH 2
