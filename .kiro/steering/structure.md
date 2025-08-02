---
inclusion: always
---

# Project Structure & Architecture Guidelines

## Directory Organization

### Current Structure

```
/
├── .env.example         # Environment configuration template
├── .git/               # Git repository metadata
├── .gitignore          # Git ignore rules
├── .kiro/              # Kiro IDE configuration
│   ├── hooks/          # Agent hooks
│   ├── specs/          # Project specifications
│   └── steering/       # Steering rules and guidelines
├── .vscode/            # VS Code configuration
├── brainstorm/         # Project ideation documents
│   ├── IDEA 1.docx
│   ├── IDEA 2.docx
│   ├── IDEA 3.docx
│   └── IDEA 4.docx
├── cache/              # Build artifacts and compilation cache
│   └── solidity-files-cache.json
├── contracts/          # Solidity smart contracts (currently empty)
│   └── .gitkeep
├── figma 2025.pdf      # Design specifications
├── frontend/           # React.js web application
│   ├── build/          # Production build output
│   ├── node_modules/   # Frontend dependencies
│   ├── public/         # Static assets
│   ├── src/            # Source code
│   ├── package.json    # Frontend package configuration
│   └── package-lock.json
├── hardhat.config.js   # Hardhat configuration for Avalanche
├── images/             # Project images and assets
│   └── Equipo.jpeg
├── Information/        # Project documentation and requirements
│   ├── Idea 2.pdf
│   ├── Idea 2.txt
│   └── Mas detalles.txt
├── node_modules/       # Root dependencies
├── package.json        # Root package configuration
├── package-lock.json   # Dependency lock file
├── README.md           # Project documentation
├── scripts/            # Deployment and utility scripts
│   ├── .gitkeep
│   ├── deploy.js
│   └── verify-setup.js
└── tests/              # Test suites
    ├── .gitkeep
    ├── setup.test.js
    └── test-helper.js
```

**Key Observations:**
- Project uses traditional React structure in `frontend/` (not yet migrated to Scaffold-ETH 2)
- Smart contracts directory exists but is currently empty
- Hardhat configuration is present at root level
- Test infrastructure is set up but minimal
- Documentation and brainstorming materials are well-organized

### Recommended Structure for Implementation

**Current Status**: The project is in early stages with basic Hardhat setup and traditional React frontend. The following structure represents the target architecture after migrating to Scaffold-ETH 2 as outlined in the implementation tasks.

**Target Structure (Post Scaffold-ETH 2 Migration):**

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

**Migration Status**: Currently using traditional React setup in `frontend/` directory. Task 2 in the implementation plan covers migration to Scaffold-ETH 2.

**Target Architecture:**
- Next.js-based architecture with server-side rendering capabilities
- Wagmi hooks with TypeScript autocompletions for contract interactions
- RainbowKit for seamless wallet connection management
- Custom Scaffold hooks extending base functionality for medical records
- Built-in debugging tools and block explorer integration
- Separate service layers for encryption, IPFS, and blockchain operations

**Current Architecture:**
- Traditional React.js application in `frontend/` directory
- Basic Web3 integration setup
- Standard React Router and component structure

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
