# Development Workflow - Decentralized Medical Records System

## Overview

This document provides step-by-step instructions for implementing each component of the decentralized medical records system. It serves as a practical guide for developers, ensuring consistent development practices and proper integration procedures.

---

## 1. Development Environment Setup

### 1.1 Prerequisites Installation

#### Required Software
```powershell
# Install Node.js (v18 or later)
winget install OpenJS.NodeJS

# Install Git
winget install Git.Git

# Install Visual Studio Code
winget install Microsoft.VisualStudioCode

# Install MetaMask browser extension
# Visit: https://metamask.io/download/
```

#### Verify Installations
```powershell
node --version  # Should be v18+
npm --version   # Should be v8+
git --version   # Should be v2.30+
code --version  # Should show VS Code version
```

### 1.2 Project Setup

#### Clone and Install Dependencies
```powershell
# Navigate to project directory
cd "e:\Hackatones\Etherum\Buildaton-2025\Backend"

# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
yarn install

# Install hardhat dependencies
cd packages/hardhat
yarn install

# Return to root
cd ../../../
```

#### Environment Configuration
```powershell
# Copy environment template
cp .env.example .env

# Edit environment variables
code .env
```

**Required Environment Variables:**
```bash
# Blockchain Configuration
AVALANCHE_RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
PRIVATE_KEY=your_wallet_private_key_here
DEPLOYER_PRIVATE_KEY=your_deployer_private_key_here

# IPFS Configuration
IPFS_API_URL=https://ipfs.infura.io:5001
IPFS_GATEWAY_URL=https://ipfs.io/ipfs/
IPFS_PROJECT_ID=your_ipfs_project_id
IPFS_PROJECT_SECRET=your_ipfs_project_secret

# Application Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your_database_url_here

# Security Configuration
ENCRYPTION_KEY=your_32_byte_encryption_key
JWT_SECRET=your_jwt_secret_here
```

### 1.3 IDE Configuration

#### VS Code Extensions
```powershell
# Install recommended extensions
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-json
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-eslint
code --install-extension juanblanco.solidity
```

#### Workspace Settings
```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "solidity.defaultCompiler": "localNodeModule",
  "solidity.compileUsingRemoteVersion": "v0.8.19",
  "files.associations": {
    "*.sol": "solidity"
  }
}
```

---

## 2. Component Development Lifecycle

### 2.1 Smart Contract Development

#### Development Process
1. **Create Contract File**
   ```powershell
   # Navigate to contracts directory
   cd contracts/
   
   # Create new contract file
   code NewContract.sol
   ```

2. **Implement Contract Logic**
   ```solidity
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.19;
   
   import "./AccessControl.sol";
   
   contract NewContract is AccessControl {
       // Contract implementation
   }
   ```

3. **Compile Contract**
   ```powershell
   # Navigate to hardhat directory
   cd frontend/packages/hardhat/
   
   # Compile contracts
   yarn compile
   ```

4. **Write Tests**
   ```powershell
   # Create test file
   code test/NewContract.test.ts
   ```

5. **Run Tests**
   ```powershell
   # Run specific test
   yarn test test/NewContract.test.ts
   
   # Run all tests
   yarn test
   ```

6. **Deploy Contract**
   ```powershell
   # Deploy to local network
   yarn deploy --network localhost
   
   # Deploy to testnet
   yarn deploy --network avalancheFuji
   ```

#### Contract Development Standards
```solidity
// Standard contract structure
contract ExampleContract {
    // State variables
    mapping(address => bool) public authorized;
    
    // Events
    event AuthorizationChanged(address user, bool authorized);
    
    // Modifiers
    modifier onlyAuthorized() {
        require(authorized[msg.sender], "Not authorized");
        _;
    }
    
    // Constructor
    constructor() {
        authorized[msg.sender] = true;
    }
    
    // External functions
    function setAuthorization(address user, bool auth) external onlyAuthorized {
        authorized[user] = auth;
        emit AuthorizationChanged(user, auth);
    }
    
    // Internal functions
    function _validateUser(address user) internal view returns (bool) {
        return authorized[user];
    }
}
```

### 2.2 Service Layer Development

#### Service Creation Process
1. **Create Service Directory**
   ```powershell
   cd frontend/packages/nextjs/services/
   mkdir new-service
   cd new-service
   ```

2. **Create Service Files**
   ```powershell
   # Main service file
   code NewService.ts
   
   # Type definitions
   code types.ts
   
   # Utility functions
   code utils.ts
   
   # Export barrel
   code index.ts
   ```

3. **Implement Service Class**
   ```typescript
   // NewService.ts
   import { Contract } from 'ethers';
   import { ServiceError } from '../common/errors';
   
   export class NewService {
     private contract: Contract;
     
     constructor(contract: Contract) {
       this.contract = contract;
     }
     
     async performOperation(data: OperationData): Promise<OperationResult> {
       try {
         const tx = await this.contract.operation(data);
         await tx.wait();
         return { success: true, transactionHash: tx.hash };
       } catch (error) {
         throw new ServiceError('Operation failed', error);
       }
     }
   }
   ```

4. **Add Type Definitions**
   ```typescript
   // types.ts
   export interface OperationData {
     id: string;
     value: number;
     metadata: string;
   }
   
   export interface OperationResult {
     success: boolean;
     transactionHash: string;
     error?: string;
   }
   ```

5. **Create Tests**
   ```powershell
   cd ../../__tests__/services/
   code new-service.test.ts
   ```

6. **Run Service Tests**
   ```powershell
   cd ../../
   npm test services/new-service
   ```

#### Service Development Standards
```typescript
// Standard service structure
export class ExampleService {
  private readonly contract: Contract;
  private readonly logger: Logger;
  
  constructor(contract: Contract, logger: Logger) {
    this.contract = contract;
    this.logger = logger;
  }
  
  // Public methods with error handling
  async publicMethod(param: string): Promise<Result> {
    this.logger.info('Starting operation', { param });
    
    try {
      const result = await this._performOperation(param);
      this.logger.info('Operation completed', { result });
      return result;
    } catch (error) {
      this.logger.error('Operation failed', { error, param });
      throw new ServiceError('Operation failed', error);
    }
  }
  
  // Private helper methods
  private async _performOperation(param: string): Promise<Result> {
    // Implementation details
  }
}
```

### 2.3 Frontend Component Development

#### Component Creation Process
1. **Create Component Directory**
   ```powershell
   cd frontend/packages/nextjs/components/
   mkdir feature-name
   cd feature-name
   ```

2. **Create Component Files**
   ```powershell
   # Main component
   code FeatureComponent.tsx
   
   # Component styles (if needed)
   code FeatureComponent.module.css
   
   # Component tests
   code FeatureComponent.test.tsx
   
   # Export barrel
   code index.ts
   ```

3. **Implement Component**
   ```typescript
   // FeatureComponent.tsx
   import React, { useState, useEffect } from 'react';
   import { useContractService } from '~/hooks/useContractService';
   
   interface FeatureComponentProps {
     data: ComponentData;
     onAction: (result: ActionResult) => void;
   }
   
   export const FeatureComponent: React.FC<FeatureComponentProps> = ({
     data,
     onAction
   }) => {
     const [loading, setLoading] = useState(false);
     const contractService = useContractService();
     
     const handleAction = async () => {
       setLoading(true);
       try {
         const result = await contractService.performAction(data);
         onAction(result);
       } catch (error) {
         console.error('Action failed:', error);
       } finally {
         setLoading(false);
       }
     };
     
     return (
       <div className="feature-component">
         <h2>{data.title}</h2>
         <button onClick={handleAction} disabled={loading}>
           {loading ? 'Processing...' : 'Perform Action'}
         </button>
       </div>
     );
   };
   ```

4. **Create Custom Hooks**
   ```powershell
   cd ../../hooks/feature-name/
   code useFeatureData.ts
   ```

5. **Implement Hook**
   ```typescript
   // useFeatureData.ts
   import { useState, useEffect } from 'react';
   import { useContractService } from '../useContractService';
   
   export const useFeatureData = (id: string) => {
     const [data, setData] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const contractService = useContractService();
     
     useEffect(() => {
       const fetchData = async () => {
         try {
           const result = await contractService.getData(id);
           setData(result);
         } catch (err) {
           setError(err);
         } finally {
           setLoading(false);
         }
       };
       
       fetchData();
     }, [id, contractService]);
     
     return { data, loading, error };
   };
   ```

6. **Write Component Tests**
   ```typescript
   // FeatureComponent.test.tsx
   import { render, screen, fireEvent } from '@testing-library/react';
   import { FeatureComponent } from './FeatureComponent';
   
   describe('FeatureComponent', () => {
     it('renders correctly', () => {
       const mockData = { title: 'Test Feature' };
       const mockOnAction = jest.fn();
       
       render(
         <FeatureComponent data={mockData} onAction={mockOnAction} />
       );
       
       expect(screen.getByText('Test Feature')).toBeInTheDocument();
     });
     
     it('handles action click', async () => {
       const mockData = { title: 'Test Feature' };
       const mockOnAction = jest.fn();
       
       render(
         <FeatureComponent data={mockData} onAction={mockOnAction} />
       );
       
       fireEvent.click(screen.getByText('Perform Action'));
       
       // Add assertions for action handling
     });
   });
   ```

#### Component Development Standards
```typescript
// Standard component structure
interface ComponentProps {
  // Required props
  data: DataType;
  onAction: (result: ActionResult) => void;
  
  // Optional props
  className?: string;
  disabled?: boolean;
}

export const StandardComponent: React.FC<ComponentProps> = ({
  data,
  onAction,
  className = '',
  disabled = false
}) => {
  // State management
  const [localState, setLocalState] = useState(initialState);
  
  // Custom hooks
  const { loading, error } = useFeatureHook(data.id);
  
  // Event handlers
  const handleAction = useCallback(async () => {
    try {
      const result = await performAction(data);
      onAction(result);
    } catch (error) {
      // Handle error
    }
  }, [data, onAction]);
  
  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // Render
  return (
    <div className={`standard-component ${className}`}>
      {/* Component JSX */}
    </div>
  );
};
```

---

## 3. Testing Procedures

### 3.1 Unit Testing

#### Smart Contract Tests
```powershell
# Run contract tests
cd frontend/packages/hardhat/
yarn test

# Run specific test file
yarn test test/AccessControl.test.ts

# Run tests with coverage
yarn test --coverage
```

#### Service Tests
```powershell
# Run service tests
cd frontend/packages/nextjs/
npm test services/

# Run specific service test
npm test services/encryption.test.ts

# Watch mode for development
npm test --watch services/
```

#### Component Tests
```powershell
# Run component tests
npm test components/

# Run specific component test
npm test components/patient/Dashboard.test.tsx

# Update snapshots
npm test --updateSnapshot
```

### 3.2 Integration Testing

#### End-to-End Testing Setup
```powershell
# Install Playwright
cd frontend/packages/nextjs/
npm install @playwright/test

# Run E2E tests
npx playwright test

# Run specific test
npx playwright test tests/patient-flow.spec.ts
```

#### Integration Test Example
```typescript
// tests/patient-flow.spec.ts
import { test, expect } from '@playwright/test';

test('patient can upload and view medical record', async ({ page }) => {
  // Connect wallet and login
  await page.goto('/patient/dashboard');
  await page.click('[data-testid="connect-wallet"]');
  
  // Upload record
  await page.click('[data-testid="upload-record"]');
  await page.setInputFiles('#file-input', 'test-record.pdf');
  await page.fill('#record-title', 'Test Medical Record');
  await page.click('[data-testid="submit-upload"]');
  
  // Verify upload success
  await expect(page.locator('[data-testid="upload-success"]')).toBeVisible();
  
  // Navigate to records list
  await page.click('[data-testid="view-records"]');
  
  // Verify record appears in list
  await expect(page.locator('text=Test Medical Record')).toBeVisible();
});
```

### 3.3 Performance Testing

#### Load Testing
```powershell
# Install Artillery
npm install -g artillery

# Run load test
artillery run load-test.yml
```

#### Performance Monitoring
```typescript
// Performance monitoring in components
import { performance } from 'perf_hooks';

const PerformanceWrapper: React.FC = ({ children }) => {
  useEffect(() => {
    const start = performance.now();
    
    return () => {
      const end = performance.now();
      console.log(`Component render time: ${end - start}ms`);
    };
  }, []);
  
  return <>{children}</>;
};
```

---

## 4. Code Review Process

### 4.1 Pre-Review Checklist

#### Developer Checklist
- [ ] **Code compiles** without errors or warnings
- [ ] **All tests pass** (unit, integration, e2e)
- [ ] **Code coverage** meets minimum requirements (80%)
- [ ] **ESLint** passes without errors
- [ ] **Prettier** formatting applied
- [ ] **Type checking** passes (TypeScript)
- [ ] **Security scan** passes (no critical issues)
- [ ] **Documentation** updated for new features

#### Commit Standards
```powershell
# Use conventional commit messages
git commit -m "feat: add patient record upload functionality"
git commit -m "fix: resolve encryption key derivation issue"
git commit -m "docs: update API documentation"
git commit -m "test: add integration tests for specialist portal"
```

### 4.2 Review Process

#### Creating Pull Request
```powershell
# Create feature branch
git checkout -b feature/patient-record-upload

# Make changes and commit
git add .
git commit -m "feat: implement patient record upload"

# Push to remote
git push origin feature/patient-record-upload

# Create PR via GitHub CLI or web interface
gh pr create --title "Add patient record upload" --body "Implements IPFS-based record upload with encryption"
```

#### Review Criteria
1. **Code Quality**
   - Clean, readable code
   - Proper error handling
   - Consistent coding style
   - Appropriate comments

2. **Security**
   - Input validation
   - Access control checks
   - No hardcoded secrets
   - Secure data handling

3. **Performance**
   - Efficient algorithms
   - Proper caching
   - Minimal re-renders
   - Optimized queries

4. **Testing**
   - Adequate test coverage
   - Edge cases covered
   - Integration scenarios tested
   - Performance benchmarks met

### 4.3 Review Tools

#### Automated Checks
```yaml
# .github/workflows/pr-checks.yml
name: PR Checks
on: [pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: securecodewarrior/github-action-add-sarif@v1
      - run: npm audit
```

---

## 5. Integration Procedures

### 5.1 Component Integration

#### Integration Order
1. **Smart Contracts** → Deploy and verify
2. **Service Layer** → Implement and test with contracts
3. **UI Components** → Connect to services
4. **End-to-End Testing** → Verify complete workflows

#### Integration Testing
```powershell
# Start local blockchain
cd frontend/packages/hardhat/
yarn chain

# Deploy contracts
yarn deploy --network localhost

# Start frontend
cd ../nextjs/
yarn dev

# Run integration tests
yarn test:integration
```

### 5.2 Service Integration

#### Contract Service Integration
```typescript
// Integration test example
describe('Contract Service Integration', () => {
  beforeAll(async () => {
    // Deploy contracts
    const contracts = await deployContracts();
    
    // Initialize services
    contractService = new ContractService(contracts);
    encryptionService = new EncryptionService();
    ipfsService = new IPFSService();
  });
  
  it('should handle complete record upload flow', async () => {
    // Test complete integration
    const file = new File(['test data'], 'test.pdf');
    const encrypted = await encryptionService.encrypt(file);
    const ipfsHash = await ipfsService.upload(encrypted);
    const result = await contractService.createRecord(ipfsHash);
    
    expect(result.success).toBe(true);
  });
});
```

### 5.3 Error Handling Integration

#### Global Error Handler
```typescript
// Global error boundary
class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log error to service
    ErrorService.logError(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    
    return this.props.children;
  }
}
```

---

## 6. Deployment Workflow

### 6.1 Staging Deployment

#### Environment Setup
```powershell
# Deploy to staging
cd frontend/packages/hardhat/
yarn deploy --network avalancheFuji

# Update frontend config
cd ../nextjs/
npm run build:staging
npm run deploy:staging
```

#### Staging Verification
```powershell
# Run staging tests
npm run test:staging

# Performance check
npm run lighthouse:staging

# Security scan
npm run security:staging
```

### 6.2 Production Deployment

#### Pre-deployment Checklist
- [ ] **All tests pass** on staging
- [ ] **Security audit** completed
- [ ] **Performance benchmarks** met
- [ ] **Documentation** updated
- [ ] **Backup procedures** verified
- [ ] **Rollback plan** prepared

#### Production Deployment Steps
```powershell
# 1. Deploy smart contracts
cd frontend/packages/hardhat/
yarn deploy --network avalanche

# 2. Verify contracts
yarn verify --network avalanche

# 3. Build and deploy frontend
cd ../nextjs/
npm run build:production
npm run deploy:production

# 4. Update DNS and CDN
npm run update:dns
npm run invalidate:cdn

# 5. Run smoke tests
npm run test:smoke:production
```

#### Post-deployment Verification
```powershell
# Monitor deployment
npm run monitor:production

# Check all endpoints
npm run healthcheck:production

# Verify user flows
npm run test:e2e:production
```

---

## 7. Debugging Procedures

### 7.1 Common Issues and Solutions

#### Smart Contract Issues
```powershell
# Debug failed transactions
yarn hardhat console --network localhost

# Check contract state
const contract = await ethers.getContract("MedicalRecords");
const state = await contract.getState();
console.log(state);

# Verify contract deployment
yarn verify --network localhost CONTRACT_ADDRESS
```

#### Frontend Issues
```typescript
// Debug service calls
const debugService = {
  async callWithLogging(fn, ...args) {
    console.log('Calling:', fn.name, 'with args:', args);
    try {
      const result = await fn(...args);
      console.log('Result:', result);
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};
```

#### IPFS Issues
```powershell
# Check IPFS connection
curl https://ipfs.infura.io:5001/api/v0/version

# Verify file upload
curl -X POST -F file=@test.txt https://ipfs.infura.io:5001/api/v0/add

# Check gateway access
curl https://ipfs.io/ipfs/YOUR_HASH
```

### 7.2 Debugging Tools

#### Browser DevTools
```typescript
// Add debugging helpers
window.debugApp = {
  contracts: contractService,
  services: { encryption, ipfs, contracts },
  utils: { formatError, logState }
};

// Usage in console
debugApp.contracts.getRecord('0x123...');
```

#### Network Debugging
```powershell
# Monitor network traffic
cd frontend/packages/nextjs/
npm install --save-dev http-proxy-middleware

# Add proxy configuration for debugging
```

### 7.3 Log Analysis

#### Application Logging
```typescript
// Structured logging
const logger = {
  info: (message, data) => console.log(JSON.stringify({
    level: 'info',
    message,
    data,
    timestamp: new Date().toISOString()
  })),
  
  error: (message, error, data) => console.error(JSON.stringify({
    level: 'error',
    message,
    error: error.message,
    stack: error.stack,
    data,
    timestamp: new Date().toISOString()
  }))
};
```

---

## 8. Documentation Requirements

### 8.1 Code Documentation

#### Smart Contract Documentation
```solidity
/**
 * @title MedicalRecords
 * @notice Manages medical records on the blockchain
 * @dev Implements IPFS hash storage with access control
 */
contract MedicalRecords {
    /**
     * @notice Creates a new medical record
     * @param ipfsHash The IPFS hash of the encrypted record
     * @param patient The patient's address
     * @return recordId The unique identifier for the record
     */
    function createRecord(
        string memory ipfsHash,
        address patient
    ) external returns (uint256 recordId) {
        // Implementation
    }
}
```

#### Service Documentation
```typescript
/**
 * Service for handling medical record operations
 * @example
 * const service = new MedicalRecordsService(contract);
 * const result = await service.createRecord(data);
 */
export class MedicalRecordsService {
    /**
     * Creates a new medical record
     * @param data - The record data to store
     * @returns Promise resolving to the operation result
     * @throws {ServiceError} When the operation fails
     */
    async createRecord(data: RecordData): Promise<OperationResult> {
        // Implementation
    }
}
```

#### Component Documentation
```typescript
/**
 * Component for uploading medical records
 * @param props - Component properties
 * @param props.onUpload - Callback fired when upload completes
 * @param props.maxFileSize - Maximum file size in bytes
 * @example
 * <RecordUpload 
 *   onUpload={(result) => console.log(result)} 
 *   maxFileSize={10485760} 
 * />
 */
export const RecordUpload: React.FC<RecordUploadProps> = ({
    onUpload,
    maxFileSize = 10485760
}) => {
    // Implementation
};
```

### 8.2 API Documentation

#### Generate API Documentation
```powershell
# Install documentation tools
npm install --save-dev typedoc @compodoc/compodoc

# Generate contract documentation
yarn typedoc --out docs/contracts contracts/

# Generate service documentation
yarn typedoc --out docs/services services/

# Generate component documentation
yarn compodoc -p tsconfig.json -s -d docs/components
```

### 8.3 User Documentation

#### README Updates
```markdown
## Development Setup

### Prerequisites
- Node.js v18+
- Yarn v1.22+
- MetaMask browser extension

### Installation
\`\`\`bash
git clone [repository-url]
cd decentralized-medical-records
yarn install
\`\`\`

### Running the Application
\`\`\`bash
# Start local blockchain
yarn chain

# Deploy contracts
yarn deploy

# Start frontend
yarn dev
\`\`\`
```

---

## 9. Version Control Practices

### 9.1 Branching Strategy

#### Branch Naming Convention
```
main                    # Production-ready code
develop                 # Integration branch
feature/[feature-name]  # New features
fix/[bug-description]   # Bug fixes
hotfix/[urgent-fix]     # Production hotfixes
release/[version]       # Release preparation
```

#### Branch Management
```powershell
# Create feature branch
git checkout -b feature/patient-dashboard

# Keep branch updated
git fetch origin
git rebase origin/develop

# Merge feature
git checkout develop
git merge --no-ff feature/patient-dashboard
git branch -d feature/patient-dashboard
```

### 9.2 Commit Guidelines

#### Commit Message Format
```
type(scope): subject

body

footer
```

#### Examples
```
feat(patient): add medical record upload functionality

Implements IPFS-based file storage with client-side encryption.
Supports multiple file formats and validates file size limits.

Closes #123
```

### 9.3 Release Management

#### Version Tagging
```powershell
# Create release tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# List tags
git tag -l

# Checkout specific version
git checkout v1.0.0
```

---

## 10. Quality Assurance Gates

### 10.1 Code Quality Metrics

#### Coverage Requirements
- **Smart Contracts:** 100% coverage (security critical)
- **Services:** 90% coverage
- **Components:** 80% coverage
- **Integration Tests:** All critical paths covered

#### Performance Benchmarks
- **Page Load Time:** < 3 seconds
- **Transaction Confirmation:** < 30 seconds
- **File Upload:** < 60 seconds for 10MB files
- **Search Response:** < 1 second

### 10.2 Security Requirements

#### Security Checklist
- [ ] **Input validation** on all user inputs
- [ ] **Access control** verified for all operations
- [ ] **Encryption** used for sensitive data
- [ ] **Audit logging** for all actions
- [ ] **Error handling** doesn't leak sensitive information

#### Security Tools
```powershell
# Run security audit
npm audit

# Solidity security analysis
yarn slither contracts/

# Frontend security scan
npm run security:scan
```

### 10.3 Deployment Gates

#### Pre-deployment Requirements
- [ ] **All tests pass** (unit + integration + e2e)
- [ ] **Security scan** passes
- [ ] **Performance benchmarks** met
- [ ] **Code review** completed
- [ ] **Documentation** updated

#### Post-deployment Verification
- [ ] **Smoke tests** pass
- [ ] **Health checks** pass
- [ ] **Monitoring** active
- [ ] **Logs** flowing correctly

---

## Troubleshooting Guide

### Common Development Issues

#### Node.js/NPM Issues
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

#### MetaMask Connection Issues
```typescript
// Check MetaMask availability
if (typeof window.ethereum === 'undefined') {
  console.error('MetaMask not installed');
  return;
}

// Request account access
await window.ethereum.request({ method: 'eth_requestAccounts' });
```

#### IPFS Connection Issues
```powershell
# Test IPFS connection
curl -X POST "https://ipfs.infura.io:5001/api/v0/version"

# Check IPFS configuration
echo $IPFS_PROJECT_ID
echo $IPFS_PROJECT_SECRET
```

### Getting Help

#### Internal Resources
- **Development Team:** Contact via Slack #dev-team
- **Documentation:** Check docs/ directory
- **Issue Tracker:** GitHub Issues

#### External Resources
- **Avalanche Docs:** https://docs.avax.network/
- **Scaffold-ETH 2:** https://docs.scaffoldeth.io/
- **IPFS Docs:** https://docs.ipfs.io/

---

## Workflow Summary

1. **Setup Environment** → Install dependencies and configure environment
2. **Create Feature Branch** → Follow branching strategy
3. **Implement Component** → Follow development standards
4. **Write Tests** → Ensure adequate coverage
5. **Run Quality Checks** → Lint, test, security scan
6. **Create Pull Request** → Follow review process
7. **Code Review** → Address feedback
8. **Integration Testing** → Verify component integration
9. **Deploy to Staging** → Test in staging environment
10. **Production Deployment** → Deploy with verification
11. **Monitor and Document** → Ensure successful deployment

This workflow ensures consistent, high-quality development while maintaining security and performance standards throughout the development lifecycle.
