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
├── contracts/          # Legacy smart contracts directory
│   ├── .gitkeep
│   └── AuditTrail.sol  # Basic audit trail contract
├── figma 2025.pdf      # Design specifications
├── frontend/           # Scaffold-ETH 2 monorepo structure
│   ├── packages/
│   │   ├── hardhat/    # Smart contract development environment
│   │   │   ├── contracts/      # Solidity smart contracts
│   │   │   │   ├── AccessControl.sol
│   │   │   │   ├── AuditTrail.sol
│   │   │   │   ├── MedicalRecords.sol
│   │   │   │   └── YourContract.sol
│   │   │   ├── deploy/         # Deployment scripts
│   │   │   ├── test/           # Contract tests
│   │   │   ├── typechain-types/ # Generated TypeScript types
│   │   │   └── hardhat.config.ts
│   │   └── nextjs/     # Next.js frontend application
│   │       ├── app/            # Next.js app directory structure
│   │       │   ├── blockexplorer/
│   │       │   ├── debug/
│   │       │   ├── insurance/  # Insurance company portal
│   │       │   ├── patient/    # Patient dashboard
│   │       │   ├── specialist/ # Medical specialist portal
│   │       │   ├── layout.tsx
│   │       │   └── page.tsx    # Landing page with role-based navigation
│   │       ├── components/     # React components
│   │       │   ├── scaffold-eth/
│   │       │   ├── Footer.tsx
│   │       │   ├── Header.tsx
│   │       │   └── ThemeProvider.tsx
│   │       ├── contracts/      # Contract deployment info
│   │       ├── hooks/          # Custom React hooks
│   │       │   └── scaffold-eth/
│   │       ├── services/       # Web3 and store services
│   │       ├── utils/          # Utility functions
│   │       └── scaffold.config.ts
│   ├── package.json    # Monorepo package configuration
│   └── yarn.lock       # Yarn workspace lock file
├── hardhat.config.js   # Legacy Hardhat configuration
├── images/             # Project images and assets
│   └── Equipo.jpeg
├── Information/        # Project documentation and requirements
│   ├── Idea 2.pdf
│   ├── Idea 2.txt
│   └── Mas detalles.txt
├── medichaintest/      # Additional test environment
├── node_modules/       # Root dependencies
├── package.json        # Root package configuration
├── package-lock.json   # Dependency lock file
├── README.md           # Project documentation
├── scripts/            # Legacy deployment scripts
│   ├── .gitkeep
│   ├── deploy.js
│   └── verify-setup.js
└── tests/              # Legacy test suites
    ├── .gitkeep
    ├── setup.test.js
    └── test-helper.js
```

**Key Observations:**
- Project has successfully migrated to Scaffold-ETH 2 architecture
- Smart contracts are now located in `frontend/packages/hardhat/contracts/`
- Next.js frontend with role-based routing (patient, specialist, insurance)
- TypeScript integration with auto-generated contract types
- Yarn workspaces for monorepo management
- Legacy structure still present for backward compatibility

### Implementation Status & Next Steps

**Current Status**: The project has successfully completed the Scaffold-ETH 2 migration (Task 2 from implementation plan). The architecture is now properly structured for medical records development.

**Completed Implementation:**
- ✅ Scaffold-ETH 2 framework setup with Next.js, React, and TypeScript
- ✅ Monorepo structure with separate hardhat and nextjs packages
- ✅ Role-based routing structure (patient, specialist, insurance portals)
- ✅ Basic smart contracts (AccessControl, MedicalRecords, AuditTrail)
- ✅ TypeScript contract type generation
- ✅ Landing page with role-based navigation

**Current Architecture Strengths:**
- Clean separation between contract development and frontend
- TypeScript integration throughout the stack
- Built-in Web3 development tools and debugging
- Scalable component organization by user role
- Automated contract type generation for type safety

**Next Development Priorities:**
1. **Smart Contract Implementation** (Task 3): Complete the core contract functionality
2. **Encryption Services** (Task 4): Implement client-side ECIES encryption
3. **IPFS Integration** (Task 5): Add document storage and retrieval
4. **Role-specific UI Development** (Tasks 7-10): Build out the portal interfaces

## Architecture Patterns

### Smart Contract Design

- Use OpenZeppelin contracts for security standards
- Implement role-based access control (RBAC)
- Separate data storage from business logic
- Include emergency pause functionality

### Frontend Architecture (Scaffold-ETH 2)

**Current Architecture:**
- Next.js-based architecture with app directory routing
- Wagmi hooks with TypeScript autocompletions for contract interactions
- RainbowKit integration for wallet connection management
- Custom Scaffold hooks for medical records functionality
- Built-in debugging tools and block explorer
- Separate service layers for Web3, store management, and utilities
- Role-based page structure with dedicated portals for each user type

### Security Patterns

- Client-side encryption before IPFS upload
- Never store private keys in frontend code
- Validate all smart contract interactions
- Implement proper error handling for Web3 operations

## Code Style Guidelines

### File Naming

- Smart contracts: `PascalCase.sol` (e.g., `MedicalRecords.sol`)
- Next.js app routes: `page.tsx`, `layout.tsx` in directory structure
- React components: `PascalCase.tsx` (e.g., `PatientDashboard.tsx`)
- Custom hooks: `usePascalCase.ts` (e.g., `useMedicalRecords.ts`)
- Utilities: `camelCase.ts` (e.g., `encryptionUtils.ts`)
- Configuration: `*.config.ts` (e.g., `scaffold.config.ts`)
- Test files: `*.test.ts` or `*.spec.ts`

### Development Rules

- Use TypeScript throughout the entire stack (enforced by Scaffold-ETH 2)
- Leverage automatic contract type generation in `typechain-types/`
- Include comprehensive JSDoc comments for utility functions
- Implement proper error boundaries in React components
- Use Scaffold's built-in environment variable management
- Follow Solidity best practices (checks-effects-interactions pattern)
- Utilize Scaffold's custom hooks for consistent contract interactions
- Organize components by user role (patient/, specialist/, insurance/)
- Use Next.js app directory routing for better performance and SEO

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
