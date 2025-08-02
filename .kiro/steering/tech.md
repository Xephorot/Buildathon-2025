# Technology Stack

## Blockchain & Infrastructure
- **Primary Network**: Avalanche blockchain
- **Node Architecture**: Private network with permissioned access
- **Smart Contracts**: Solidity-based contracts for access control and permissions
- **Storage**: IPFS for encrypted medical document storage

## Frontend & User Interface
- **Framework**: React.js for web application
- **Wallet Integration**: Web3 wallet connectivity for patient and insurer access
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
*Note: This is a conceptual project - specific build commands will depend on chosen implementation stack*

```bash
# Typical Web3 development setup
npm install
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run test suite
truffle compile      # Compile smart contracts
truffle migrate      # Deploy contracts
```