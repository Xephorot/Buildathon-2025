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
│   │   ├── blockchain-architect-review.kiro.hook
│   │   └── structure-doc-sync.kiro.hook
│   ├── specs/          # Project specifications
│   │   └── decentralized-medical-records/
│   │       ├── requirements.md
│   │       └── tasks.md
│   └── steering/       # Steering rules and guidelines
│       ├── product.md
│       ├── structure.md
│       └── tech.md
├── .vscode/            # VS Code configuration
│   └── settings.json
├── brainstorm/         # Project ideation documents
│   ├── IDEA 1.docx
│   ├── IDEA 2.docx
│   ├── IDEA 3.docx
│   └── IDEA 4.docx
├── cache/              # Build artifacts and compilation cache
│   └── solidity-files-cache.json
├── contracts/          # Legacy smart contracts directory
│   ├── AccessControl.sol
│   ├── AuditTrail.sol
│   └── MedicalRecords.sol
├── figma 2025.pdf      # Design specifications
├── frontend/           # Scaffold-ETH 2 monorepo structure
│   ├── .cursor/        # Cursor IDE configuration
│   │   └── rules/
│   ├── .github/        # GitHub workflows
│   │   └── workflows/
│   ├── .husky/         # Git hooks
│   │   └── pre-commit
│   ├── .yarn/          # Yarn 3.2.3 configuration
│   │   ├── cache/      # Yarn cache
│   │   ├── plugins/    # Yarn plugins
│   │   └── releases/   # Yarn binary (yarn-3.2.3.cjs)
│   ├── node_modules/   # Root frontend dependencies
│   ├── packages/
│   │   ├── hardhat/    # Smart contract development environment
│   │   │   ├── artifacts/      # Compiled contract artifacts
│   │   │   │   ├── build-info/
│   │   │   │   ├── contracts/
│   │   │   │   └── hardhat/
│   │   │   ├── cache/          # Hardhat cache
│   │   │   │   └── solidity-files-cache.json
│   │   │   ├── contracts/      # Solidity smart contracts
│   │   │   │   ├── AccessControl.sol
│   │   │   │   ├── AuditTrail.sol
│   │   │   │   ├── MedicalRecords.sol
│   │   │   │   └── YourContract.sol
│   │   │   ├── deploy/         # Deployment scripts
│   │   │   │   ├── 00_deploy_your_contract.ts
│   │   │   │   ├── 01_deploy_access_control.ts
│   │   │   │   ├── 02_deploy_medical_records.ts
│   │   │   │   └── 03_deploy_audit_trail.ts
│   │   │   ├── deployments/    # Deployment artifacts
│   │   │   │   └── localhost/
│   │   │   ├── node_modules/   # Hardhat-specific dependencies
│   │   │   ├── scripts/        # Utility scripts
│   │   │   │   ├── generateAccount.ts
│   │   │   │   ├── generateTsAbis.ts
│   │   │   │   ├── importAccount.ts
│   │   │   │   ├── listAccount.ts
│   │   │   │   ├── revealPK.ts
│   │   │   │   └── runHardhatDeployWithPK.ts
│   │   │   ├── test/           # Contract tests
│   │   │   │   ├── .gitkeep
│   │   │   │   └── YourContract.ts
│   │   │   ├── typechain-types/ # Generated TypeScript types
│   │   │   │   ├── factories/
│   │   │   │   ├── AccessControl.ts
│   │   │   │   ├── AuditTrail.ts
│   │   │   │   ├── common.ts
│   │   │   │   ├── hardhat.d.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── MedicalRecords.ts
│   │   │   │   └── YourContract.ts
│   │   │   ├── .env.example
│   │   │   ├── .gitignore
│   │   │   ├── .prettierrc.json
│   │   │   ├── eslint.config.mjs
│   │   │   ├── hardhat.config.ts
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   └── nextjs/     # Next.js frontend application
│   │       ├── .next/          # Next.js build output
│   │       │   ├── cache/
│   │       │   ├── server/
│   │       │   ├── static/
│   │       │   ├── types/
│   │       │   ├── app-build-manifest.json
│   │       │   ├── build-manifest.json
│   │       │   ├── package.json
│   │       │   ├── react-loadable-manifest.json
│   │       │   └── trace
│   │       ├── app/            # Next.js app directory structure
│   │       │   ├── blockexplorer/
│   │       │   ├── debug/
│   │       │   ├── insurance/  # Insurance company portal
│   │       │   ├── patient/    # Patient dashboard
│   │       │   ├── specialist/ # Medical specialist portal
│   │       │   ├── layout.tsx
│   │       │   ├── not-found.tsx
│   │       │   └── page.tsx    # Landing page with role-based navigation
│   │       ├── components/     # React components
│   │       │   ├── assets/
│   │       │   ├── scaffold-eth/
│   │       │   ├── Footer.tsx
│   │       │   ├── Header.tsx
│   │       │   ├── ScaffoldEthAppWithProviders.tsx
│   │       │   ├── SwitchTheme.tsx
│   │       │   └── ThemeProvider.tsx
│   │       ├── contracts/      # Contract deployment info
│   │       │   ├── deployedContracts.ts
│   │       │   └── externalContracts.ts
│   │       ├── hooks/          # Custom React hooks
│   │       │   └── scaffold-eth/
│   │       ├── node_modules/   # Next.js-specific dependencies
│   │       ├── public/         # Static assets
│   │       │   ├── favicon.png
│   │       │   ├── logo.svg
│   │       │   ├── manifest.json
│   │       │   └── thumbnail.jpg
│   │       ├── services/       # Web3 and store services
│   │       │   ├── store/
│   │       │   └── web3/
│   │       ├── styles/         # CSS styles
│   │       │   └── globals.css
│   │       ├── types/          # TypeScript type definitions
│   │       │   └── abitype/
│   │       ├── utils/          # Utility functions
│   │       │   └── scaffold-eth/
│   │       ├── .env.example
│   │       ├── .gitignore
│   │       ├── .prettierrc.js
│   │       ├── eslint.config.mjs
│   │       ├── next-env.d.ts
│   │       ├── next.config.ts
│   │       ├── package.json
│   │       ├── postcss.config.js
│   │       ├── scaffold.config.ts
│   │       ├── tsconfig.json
│   │       └── vercel.json
│   ├── .gitignore
│   ├── .lintstagedrc.js
│   ├── .yarnrc.yml
│   ├── CONTRIBUTING.md
│   ├── LICENCE
│   ├── package.json    # Monorepo package configuration
│   ├── README.md
│   └── yarn.lock       # Yarn workspace lock file
├── hardhat.config.js   # Legacy Hardhat configuration
├── images/             # Project images and assets
│   └── Equipo.jpeg
├── Information/        # Project documentation and requirements
│   ├── Idea 2.pdf
│   ├── Idea 2.txt
│   └── Mas detalles.txt
├── node_modules/       # Root dependencies (extensive)
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
- Project has successfully migrated to Scaffold-ETH 2 architecture with Yarn 3.2.3 workspaces
- Smart contracts are located in both legacy `contracts/` and active `frontend/packages/hardhat/contracts/`
- Complete Next.js 15 frontend with role-based routing (patient, specialist, insurance)
- TypeScript integration with auto-generated contract types in `typechain-types/`
- Comprehensive development tooling (ESLint, Prettier, Husky, lint-staged)
- Yarn workspaces for monorepo management with proper dependency isolation
- Legacy structure maintained for backward compatibility and migration reference
- Kiro IDE integration with specifications and steering documents

### Implementation Status & Next Steps

**Current Status**: The project has successfully completed the Scaffold-ETH 2 migration and basic infrastructure setup (Tasks 1-2 from implementation plan). The architecture is fully structured and ready for core feature development.

**Completed Implementation:**
- ✅ Scaffold-ETH 2 framework setup with Next.js 15, React 19, and TypeScript
- ✅ Yarn 3.2.3 workspaces monorepo structure with separate hardhat and nextjs packages
- ✅ Role-based routing structure with dedicated portals (patient/, specialist/, insurance/)
- ✅ Smart contracts foundation (AccessControl, MedicalRecords, AuditTrail, YourContract)
- ✅ TypeScript contract type generation with typechain
- ✅ Deployment scripts for all medical records contracts
- ✅ Development tooling (ESLint, Prettier, Husky git hooks, lint-staged)
- ✅ Landing page with role-based navigation structure
- ✅ Comprehensive project specifications and requirements documentation

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
- Next.js 15 with app directory routing and React 19
- Wagmi 2.x hooks with TypeScript autocompletions for contract interactions
- RainbowKit 2.x integration for wallet connection management
- Custom Scaffold hooks for medical records functionality
- Built-in debugging tools and block explorer at `/debug`
- Separate service layers for Web3, store management, and utilities
- Role-based page structure with dedicated portals for each user type
- Tailwind CSS with DaisyUI for consistent styling
- Yarn 3.2.3 workspaces for efficient dependency management
- TypeScript throughout with strict type checking
- Automated contract type generation with typechain

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
- Leverage automatic contract type generation in `frontend/packages/hardhat/typechain-types/`
- Include comprehensive JSDoc comments for utility functions
- Implement proper error boundaries in React components
- Use Scaffold's built-in environment variable management
- Follow Solidity best practices (checks-effects-interactions pattern)
- Utilize Scaffold's custom hooks for consistent contract interactions
- Organize components by user role (patient/, specialist/, insurance/)
- Use Next.js 15 app directory routing for better performance and SEO
- Follow Yarn 3.2.3 workspace conventions for dependency management
- Use Husky git hooks for pre-commit linting and formatting
- Maintain consistent code style with ESLint and Prettier
- Use Tailwind CSS with DaisyUI for component styling
- Implement proper error handling for Web3 operations with Wagmi

### Testing Requirements

- Unit tests for all smart contract functions
- Integration tests for Web3 interactions
- Component tests for critical UI flows
- End-to-end tests for complete user journeys

## Development Workflow

### Getting Started

1. **Navigate to frontend directory**: `cd frontend`
2. **Install dependencies**: `node .yarn/releases/yarn-3.2.3.cjs install`
3. **Start local blockchain**: `node .yarn/releases/yarn-3.2.3.cjs chain` (Terminal 1)
4. **Deploy contracts**: `node .yarn/releases/yarn-3.2.3.cjs deploy` (Terminal 2)
5. **Start frontend**: `node .yarn/releases/yarn-3.2.3.cjs start` (Terminal 3)

### Available Commands

```bash
# Frontend development
node .yarn/releases/yarn-3.2.3.cjs start          # Start Next.js dev server
node .yarn/releases/yarn-3.2.3.cjs build          # Build for production

# Blockchain development
node .yarn/releases/yarn-3.2.3.cjs chain          # Start local Hardhat network
node .yarn/releases/yarn-3.2.3.cjs deploy         # Deploy contracts
node .yarn/releases/yarn-3.2.3.cjs compile        # Compile contracts
node .yarn/releases/yarn-3.2.3.cjs test           # Run contract tests
```

### Project URLs

- **Frontend Application**: `http://localhost:3000`
- **Local Blockchain**: `http://localhost:8545`
- **Block Explorer**: `http://localhost:3000/blockexplorer`
- **Contract Debugging**: `http://localhost:3000/debug`

## Critical Implementation Notes

- **Encryption Flow**: Encrypt → IPFS → Smart Contract Permission → Delegated Access
- **Web3 Integration**: Support MetaMask and WalletConnect for broad compatibility
- **IPFS Storage**: Use pinning services for data persistence
- **Avalanche Network**: Configure for both testnet and mainnet deployment
- **Error Handling**: Implement graceful degradation for Web3 connection issues
- **Yarn Workspaces**: Use the project's Yarn 3.2.3 binary for all commands
- **TypeScript**: Leverage auto-generated contract types for type safety
