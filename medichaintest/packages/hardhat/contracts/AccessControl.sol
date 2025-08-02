// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AccessControl {
    address public admin;

    mapping(address => mapping(address => bool)) private permissions;

    event AccessGranted(address indexed patient, address indexed grantee);//para los pacientes patientsera el indexado
    event AccessRevoked(address indexed patient, address indexed grantee);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyPatient(address _patient) {
        require(msg.sender == _patient, "No estas autorizado"); //solamente el paciente puede dar el acceso
        _;
    }

    function grantAccess(address _grantee) public {
        permissions[msg.sender][_grantee] = true;
        emit AccessGranted(msg.sender, _grantee);
    }

    function revokeAccess(address _grantee) public {
        permissions[msg.sender][_grantee] = false;
        emit AccessRevoked(msg.sender, _grantee);
    }

    function hasAccess(address _patient, address _viewer) public view returns (bool) {
        return permissions[_patient][_viewer];
    }
}

