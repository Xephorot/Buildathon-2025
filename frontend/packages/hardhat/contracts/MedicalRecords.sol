// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MedicalRecords {
    struct Document {
        string ipfsHash;
        string description;
        uint256 timestamp;
    }

    mapping(address => Document[]) private records;

    event DocumentAdded(address indexed patient, string ipfsHash);
    event DocumentUpdated(address indexed patient, uint indexed docIndex);

    function addDocument(string memory _ipfsHash, string memory _description) public {
        records[msg.sender].push(Document({
            ipfsHash: _ipfsHash,
            description: _description,
            timestamp: block.timestamp
        }));
        emit DocumentAdded(msg.sender, _ipfsHash);
    }

    function getDocument(address _patient, uint _index) public view returns (string memory, string memory, uint256) {
        require(_index < records[_patient].length, "Historial invalido");
        Document memory doc = records[_patient][_index];
        return (doc.ipfsHash, doc.description, doc.timestamp);
    }

    function updateDocumentMetadata(uint _index, string memory _newDescription) public {
        require(_index < records[msg.sender].length, "Historial Invalido");
        records[msg.sender][_index].description = _newDescription;
        emit DocumentUpdated(msg.sender, _index);
    }

    function getDocumentCount(address _patient) public view returns (uint) {
        return records[_patient].length;
    }
}
