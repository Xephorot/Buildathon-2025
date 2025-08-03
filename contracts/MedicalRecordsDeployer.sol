// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./AccessControl.sol";
import "./MedicalRecords.sol";
import "./AuditTrail.sol";

/**
 * @title MedicalRecordsDeployer
 * @dev Contract to deploy and configure the complete medical records system
 */
contract MedicalRecordsDeployer {
    AccessControl public accessControl;
    MedicalRecords public medicalRecords;
    AuditTrail public auditTrail;

    address public deployer;
    bool public isDeployed;

    event SystemDeployed(
        address indexed accessControl,
        address indexed medicalRecords,
        address indexed auditTrail,
        address deployer
    );

    event EntityRegistered(
        address indexed entity,
        AccessControl.EntityType entityType,
        string name
    );

    modifier onlyDeployer() {
        require(
            msg.sender == deployer,
            "MedicalRecordsDeployer: Only deployer can call this function"
        );
        _;
    }

    modifier notDeployed() {
        require(!isDeployed, "MedicalRecordsDeployer: System already deployed");
        _;
    }

    constructor() {
        deployer = msg.sender;
    }

    /**
     * @dev Deploy the complete medical records system
     */
    function deploySystem() external onlyDeployer notDeployed {
        // Deploy AccessControl contract first
        accessControl = new AccessControl();

        // Deploy MedicalRecords contract with AccessControl address
        medicalRecords = new MedicalRecords(address(accessControl));

        // Deploy AuditTrail contract with AccessControl address
        auditTrail = new AuditTrail(address(accessControl));

        // Configure AuditTrail with MedicalRecords address
        auditTrail.setMedicalRecordsContract(address(medicalRecords));

        isDeployed = true;

        emit SystemDeployed(
            address(accessControl),
            address(medicalRecords),
            address(auditTrail),
            deployer
        );
    }

    /**
     * @dev Register a healthcare provider (doctor/clinic)
     * @param _entity Address of the healthcare provider
     * @param _name Name of the healthcare provider for identification
     */
    function registerHealthcareProvider(
        address _entity,
        string calldata _name
    ) external onlyDeployer {
        require(isDeployed, "MedicalRecordsDeployer: System not deployed yet");
        require(
            _entity != address(0),
            "MedicalRecordsDeployer: Invalid entity address"
        );

        accessControl.registerEntity(_entity, AccessControl.EntityType.DOCTOR);

        emit EntityRegistered(_entity, AccessControl.EntityType.DOCTOR, _name);
    }

    /**
     * @dev Register an insurance company
     * @param _entity Address of the insurance company
     * @param _name Name of the insurance company for identification
     */
    function registerInsuranceCompany(
        address _entity,
        string calldata _name
    ) external onlyDeployer {
        require(isDeployed, "MedicalRecordsDeployer: System not deployed yet");
        require(
            _entity != address(0),
            "MedicalRecordsDeployer: Invalid entity address"
        );

        accessControl.registerEntity(
            _entity,
            AccessControl.EntityType.INSURANCE
        );

        emit EntityRegistered(
            _entity,
            AccessControl.EntityType.INSURANCE,
            _name
        );
    }

    /**
     * @dev Register an auditor
     * @param _entity Address of the auditor
     * @param _name Name of the auditor for identification
     */
    function registerAuditor(
        address _entity,
        string calldata _name
    ) external onlyDeployer {
        require(isDeployed, "MedicalRecordsDeployer: System not deployed yet");
        require(
            _entity != address(0),
            "MedicalRecordsDeployer: Invalid entity address"
        );

        accessControl.registerEntity(_entity, AccessControl.EntityType.AUDITOR);

        emit EntityRegistered(_entity, AccessControl.EntityType.AUDITOR, _name);
    }

    /**
     * @dev Get deployed contract addresses
     * @return Addresses of the three main contracts
     */
    function getContractAddresses()
        external
        view
        returns (address, address, address)
    {
        require(isDeployed, "MedicalRecordsDeployer: System not deployed yet");
        return (
            address(accessControl),
            address(medicalRecords),
            address(auditTrail)
        );
    }

    /**
     * @dev Transfer deployer role to another address
     * @param _newDeployer Address of the new deployer
     */
    function transferDeployerRole(address _newDeployer) external onlyDeployer {
        require(
            _newDeployer != address(0),
            "MedicalRecordsDeployer: Invalid new deployer address"
        );
        deployer = _newDeployer;
    }

    /**
     * @dev Get system deployment status
     * @return Whether the system has been deployed
     */
    function getDeploymentStatus() external view returns (bool) {
        return isDeployed;
    }
}
