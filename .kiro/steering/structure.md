---
inclusion: always
---

# Project Structure & Architecture Guidelines

## Directory Organization

### Current Structure

- `contracts/` - Solidity smart contracts for Avalanche blockchain
- `frontend/` - React.js web application with Web3 integration
- `scripts/` - Deployment and utility scripts
- `tests/` - Test suites for contracts and frontend
- `cache/` - Build artifacts and compilation cache
- `Information/` - Project documentation and requirements

### Required Module Structure

```
contracts/
├── MedicalRecords.sol    # Core medical record storage contract
├── AccessControl.sol     # Permission management contract
└── migrations/           # Deployment scripts

packages/nextjs/
├── components/
│   ├── patient/         # Patient-specific UI components
│   ├── insurer/         # Insurance company UI components
│   ├── medic/           # Medical provider UI components
│   └── scaffold-eth/    # Extended Scaffold-ETH 2 components
├── hooks/
│   ├── scaffold-eth/    # Custom Scaffold hooks for medical records
│   ├── useEncryption.ts # ECIES encryption utilities hook
│   ├── useIPFS.ts       # IPFS storage operations hook
│   └── useMedicalRecords.ts # Medical records contract interactions
├── pages/
│   ├── patient/         # Patient dashboard and management
│   ├── medic/           # Medical provider portal
│   ├── insurance/       # Insurance company portal
│   └── api/             # Next.js API routes for IPFS/encryption
├── utils/
│   ├── encryption.ts    # Cryptographic utilities
│   ├── ipfs.ts         # IPFS client configuration
│   └── scaffold-eth/    # Extended Scaffold utilities
└── contracts/           # Contract ABIs and deployment info

packages/hardhat/
├── contracts/
│   ├── MedicalRecords.sol
│   ├── AccessControl.sol
│   └── AuditTrail.sol
├── deploy/              # Deployment scripts
├── test/                # Contract tests
└── hardhat.config.ts    # Avalanche network configuration
```

## Architecture Patterns

### Smart Contract Design

- Use OpenZeppelin contracts for security standards
- Implement role-based access control (RBAC)
- Separate data storage from business logic
- Include emergency pause functionality

### Frontend Architecture (Scaffold-ETH 2)

- Next.js-based architecture with server-side rendering capabilities
- Wagmi hooks with TypeScript autocompletions for contract interactions
- RainbowKit for seamless wallet connection management
- Custom Scaffold hooks extending base functionality for medical records
- Built-in debugging tools and block explorer integration
- Separate service layers for encryption, IPFS, and blockchain operations

### Security Patterns

- Client-side encryption before IPFS upload
- Never store private keys in frontend code
- Validate all smart contract interactions
- Implement proper error handling for Web3 operations

## Code Style Guidelines

### File Naming

- Smart contracts: `PascalCase.sol` (e.g., `MedicalRecords.sol`)
- Next.js pages: `kebab-case.tsx` (e.g., `patient-dashboard.tsx`)
- React components: `PascalCase.tsx` (e.g., `PatientDashboard.tsx`)
- Custom hooks: `usePascalCase.ts` (e.g., `useMedicalRecords.ts`)
- Utilities: `camelCase.ts` (e.g., `encryptionUtils.ts`)
- Constants: `UPPER_SNAKE_CASE.ts` (e.g., `CONTRACT_ADDRESSES.ts`)
- Test files: `*.test.ts` or `*.spec.ts`

### Development Rules

- Use TypeScript throughout the entire stack (enforced by Scaffold-ETH 2)
- Leverage Scaffold-ETH 2's automatic contract type generation
- Include comprehensive JSDoc comments for utility functions
- Implement proper error boundaries in React components
- Use Scaffold's built-in environment variable management
- Follow Solidity best practices (checks-effects-interactions pattern)
- Utilize Scaffold's custom hooks for consistent contract interactions

### Testing Requirements

- Unit tests for all smart contract functions
- Integration tests for Web3 interactions
- Component tests for critical UI flows
- End-to-end tests for complete user journeys

## Critical Implementation Notes

- **Encryption Flow**: Encrypt → IPFS → Smart Contract Permission → Delegated Access
- **Web3 Integration**: Support MetaMask and WalletConnect for broad compatibility
- **IPFS Storage**: Use pinning services for data persistence
- **Avalanche Network**: Configure for both testnet and mainnet deployment
- **Error Handling**: Implement graceful degradation for Web3 connection issues
