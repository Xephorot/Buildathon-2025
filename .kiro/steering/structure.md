# Project Structure

## Current Organization

```
/
├── .git/                 # Git version control
├── .kiro/               # Kiro AI assistant configuration
│   ├── hooks/           # Agent hooks for automation
│   └── steering/        # AI guidance documents
├── .vscode/             # VS Code workspace settings
└── Information/         # Project documentation and analysis
    ├── Idea 2.pdf       # Original project concept (PDF)
    ├── Idea 2.txt       # Detailed project analysis
    └── Mas detalles.txt # Additional project details (Spanish)
```

## Recommended Structure for Implementation

When developing this project, consider organizing code as follows:

```
/
├── contracts/           # Solidity smart contracts
│   ├── MedicalRecords.sol
│   ├── AccessControl.sol
│   └── migrations/
├── frontend/           # React web application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/      # Page components
│   │   ├── utils/      # Encryption/Web3 utilities
│   │   └── hooks/      # Custom React hooks
│   ├── public/
│   └── package.json
├── backend/            # Optional API layer
├── docs/              # Technical documentation
├── tests/             # Test suites
└── scripts/           # Deployment and utility scripts
```

## Key Architectural Principles

- **Separation of Concerns**: Keep smart contracts, frontend, and utilities clearly separated
- **Security First**: Isolate cryptographic operations in dedicated utility modules
- **User-Centric Design**: Separate patient and insurer interfaces/workflows
- **Documentation**: Maintain clear documentation for complex cryptographic flows

## File Naming Conventions

- Smart contracts: PascalCase (e.g., `MedicalRecords.sol`)
- Components: PascalCase (e.g., `PatientDashboard.jsx`)
- Utilities: camelCase (e.g., `encryptionUtils.js`)
- Constants: UPPER_SNAKE_CASE (e.g., `CONTRACT_ADDRESSES.js`)