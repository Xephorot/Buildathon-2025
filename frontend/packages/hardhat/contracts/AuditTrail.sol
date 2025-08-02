// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AuditTrail {
    struct AuditEntry {
        address actor; // Quien realizó la acción
        address target; // Sobre quién/qué se realizó la acción
        string action; // Tipo de acción realizada
        string details; // Detalles adicionales de la acción
        uint256 timestamp; // Cuando ocurrió
        bytes32 dataHash; // Hash de los datos relacionados (opcional)
    }

    // Array inmutable de entradas de auditoría
    AuditEntry[] private auditLog;

    // Mapping para acceso rápido por actor
    mapping(address => uint256[]) private entriesByActor;

    // Mapping para acceso rápido por target
    mapping(address => uint256[]) private entriesByTarget;

    // Eventos para transparencia
    event AccessLogged(address indexed actor, address indexed target, string action, uint256 indexed entryIndex);

    event PermissionChangeLogged(
        address indexed actor,
        address indexed target,
        string action,
        uint256 indexed entryIndex
    );

    event AuditEntryCreated(uint256 indexed entryIndex, address indexed actor, address indexed target);

    /**
     * @dev Registra un acceso a datos médicos
     * @param _target Dirección del paciente cuyos datos fueron accedidos
     * @param _details Detalles del acceso (ej: "Viewed medical record #3")
     * @param _dataHash Hash opcional de los datos accedidos
     */
    function logAccess(address _target, string memory _details, bytes32 _dataHash) public {
        uint256 entryIndex = _createAuditEntry(msg.sender, _target, "ACCESS", _details, _dataHash);

        emit AccessLogged(msg.sender, _target, "ACCESS", entryIndex);
    }

    /**
     * @dev Registra un cambio de permisos
     * @param _target Dirección afectada por el cambio de permisos
     * @param _action Tipo de cambio ("GRANT_ACCESS", "REVOKE_ACCESS", etc.)
     * @param _details Detalles del cambio de permisos
     */
    function logPermissionChange(address _target, string memory _action, string memory _details) public {
        uint256 entryIndex = _createAuditEntry(msg.sender, _target, _action, _details, bytes32(0));

        emit PermissionChangeLogged(msg.sender, _target, _action, entryIndex);
    }

    /**
     * @dev Función interna para crear entradas de auditoría
     */
    function _createAuditEntry(
        address _actor,
        address _target,
        string memory _action,
        string memory _details,
        bytes32 _dataHash
    ) internal returns (uint256) {
        AuditEntry memory newEntry = AuditEntry({
            actor: _actor,
            target: _target,
            action: _action,
            details: _details,
            timestamp: block.timestamp,
            dataHash: _dataHash
        });

        auditLog.push(newEntry);
        uint256 entryIndex = auditLog.length - 1;

        // Actualizar índices para acceso rápido
        entriesByActor[_actor].push(entryIndex);
        entriesByTarget[_target].push(entryIndex);

        emit AuditEntryCreated(entryIndex, _actor, _target);

        return entryIndex;
    }

    /**
     * @dev Obtiene una entrada específica del audit trail
     * @param _index Índice de la entrada en el audit log
     */
    function getAuditEntry(
        uint256 _index
    )
        public
        view
        returns (
            address actor,
            address target,
            string memory action,
            string memory details,
            uint256 timestamp,
            bytes32 dataHash
        )
    {
        require(_index < auditLog.length, "Entrada de auditoria invalida");

        AuditEntry memory entry = auditLog[_index];
        return (entry.actor, entry.target, entry.action, entry.details, entry.timestamp, entry.dataHash);
    }

    /**
     * @dev Obtiene el audit trail completo (usar con cuidado en producción)
     * @param _offset Índice de inicio
     * @param _limit Número máximo de entradas a retornar
     */
    function getAuditTrail(uint256 _offset, uint256 _limit) public view returns (AuditEntry[] memory) {
        require(_offset < auditLog.length, "Offset invalido");

        uint256 end = _offset + _limit;
        if (end > auditLog.length) {
            end = auditLog.length;
        }

        uint256 length = end - _offset;
        AuditEntry[] memory result = new AuditEntry[](length);

        for (uint256 i = 0; i < length; i++) {
            result[i] = auditLog[_offset + i];
        }

        return result;
    }

    /**
     * @dev Obtiene entradas de auditoría por actor
     * @param _actor Dirección del actor
     * @param _offset Índice de inicio
     * @param _limit Número máximo de entradas a retornar
     */
    function getAuditTrailByActor(
        address _actor,
        uint256 _offset,
        uint256 _limit
    ) public view returns (AuditEntry[] memory) {
        uint256[] memory indices = entriesByActor[_actor];
        require(_offset < indices.length, "Offset invalido");

        uint256 end = _offset + _limit;
        if (end > indices.length) {
            end = indices.length;
        }

        uint256 length = end - _offset;
        AuditEntry[] memory result = new AuditEntry[](length);

        for (uint256 i = 0; i < length; i++) {
            result[i] = auditLog[indices[_offset + i]];
        }

        return result;
    }

    /**
     * @dev Obtiene entradas de auditoría por target
     * @param _target Dirección del target
     * @param _offset Índice de inicio
     * @param _limit Número máximo de entradas a retornar
     */
    function getAuditTrailByTarget(
        address _target,
        uint256 _offset,
        uint256 _limit
    ) public view returns (AuditEntry[] memory) {
        uint256[] memory indices = entriesByTarget[_target];
        require(_offset < indices.length, "Offset invalido");

        uint256 end = _offset + _limit;
        if (end > indices.length) {
            end = indices.length;
        }

        uint256 length = end - _offset;
        AuditEntry[] memory result = new AuditEntry[](length);

        for (uint256 i = 0; i < length; i++) {
            result[i] = auditLog[indices[_offset + i]];
        }

        return result;
    }

    /**
     * @dev Obtiene el número total de entradas en el audit log
     */
    function getAuditLogLength() public view returns (uint256) {
        return auditLog.length;
    }

    /**
     * @dev Obtiene el número de entradas por actor
     */
    function getEntriesCountByActor(address _actor) public view returns (uint256) {
        return entriesByActor[_actor].length;
    }

    /**
     * @dev Obtiene el número de entradas por target
     */
    function getEntriesCountByTarget(address _target) public view returns (uint256) {
        return entriesByTarget[_target].length;
    }

    /**
     * @dev Verifica la integridad de una entrada específica
     * @param _index Índice de la entrada
     * @param _expectedHash Hash esperado para verificación
     */
    function verifyEntry(uint256 _index, bytes32 _expectedHash) public view returns (bool) {
        require(_index < auditLog.length, "Entrada invalida");

        AuditEntry memory entry = auditLog[_index];
        bytes32 computedHash = keccak256(
            abi.encodePacked(entry.actor, entry.target, entry.action, entry.details, entry.timestamp, entry.dataHash)
        );

        return computedHash == _expectedHash;
    }
}
