// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Interfaz para llamar funciones del contrato AuditTrail, avisa al compilador que access control puede llamar la función 
interface IAuditTrail {
    function logPermissionChange(address _target, string calldata _action, string calldata _details) external;
}

contract AccessControl {
    address public admin;
    IAuditTrail public auditTrail; //llamando a audittrail es decir declarando variables

    mapping(address => mapping(address => bool)) public permissions;

    event AccessGranted(address indexed patient, address indexed grantee);
    event AccessRevoked(address indexed patient, address indexed grantee);

    constructor(address _auditTrailAddress) {
        admin = msg.sender;
        auditTrail = IAuditTrail(_auditTrailAddress); //asjuste del constructor...
    }

    function grantAccess(address _grantee) public {
        permissions[msg.sender][_grantee] = true;
        emit AccessGranted(msg.sender, _grantee);

        auditTrail.logPermissionChange(
            _grantee,
            "GRANT_ACCESS",
            "Acceso aprovado por el paciente"
        );
    }

    function revokeAccess(address _grantee) public {
        permissions[msg.sender][_grantee] = false;
        emit AccessRevoked(msg.sender, _grantee);

        auditTrail.logPermissionChange(
            _grantee,
            "REVOKE_ACCESS",
            "Acceso revocado"
        );
    }

    function hasAccess(address _patient, address _viewer) public view returns (bool) {
        return permissions[_patient][_viewer];
    }
}
