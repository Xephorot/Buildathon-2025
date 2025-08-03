# Instalación y Configuración del Frontend - Histo Bit

## Prerrequisitos

1. **Node.js** (versión 16 o superior)
2. **npm** o **yarn**
3. **MetaMask** instalado en el navegador
4. **ETH de prueba** en Arbitrum Sepolia

## Configuración de la Red Arbitrum Sepolia en MetaMask

Antes de usar la aplicación, configura Arbitrum Sepolia en MetaMask:

### Configuración Manual:

- **Network Name:** Arbitrum Sepolia
- **RPC URL:** `https://sepolia-rollup.arbitrum.io/rpc`
- **Chain ID:** `421614`
- **Currency Symbol:** `ETH`
- **Block Explorer:** `https://sepolia.arbiscan.io/`

### Configuración Automática:

La aplicación intentará agregar la red automáticamente cuando te conectes.

## Obtener ETH de Prueba

1. Visita [Arbitrum Sepolia Faucet](https://faucet.arbitrum.io/)
2. Conecta tu wallet
3. Solicita ETH de prueba
4. Espera la confirmación

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar la aplicación en modo desarrollo
npm start

# Construir para producción
npm run build
```

## Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run test` - Ejecuta las pruebas
- `npm run eject` - Expone la configuración de webpack (¡irreversible!)

## Uso de la Aplicación

### 1. Conectar Wallet

- Haz clic en "Conectar Wallet" en la esquina superior derecha
- Autoriza la conexión en MetaMask
- Asegúrate de estar en la red Arbitrum Sepolia

### 2. Registro de Usuario

- Ve a la sección "Registro"
- Selecciona tu tipo de usuario (Paciente, Doctor, Seguro, Auditor)
- Confirma la transacción en MetaMask

### 3. Gestión de Documentos

- Accede a "Documentos" para ver y agregar historias clínicas
- Sube documentos con hash IPFS
- Categoriza por tipo de documento

### 4. Control de Permisos

- Ve a "Permisos" para gestionar accesos
- Otorga permisos temporales a entidades específicas
- Revoca accesos cuando sea necesario

### 5. Dashboard

- Visualiza estadísticas de tu actividad
- Monitorea accesos recientes
- Ve el estado de la red

## Contratos Desplegados

Los contratos están desplegados en Arbitrum Sepolia:

- **AccessControl:** `0xE581f2a4840fdb1CAc660876Fdd512980846Ad04`
- **MedicalRecords:** `0xC6902Cdd7732DFA81c3d14431D0F1de670BC1747`
- **AuditTrail:** `0xD587fA568C2a48a9ae8b5793796C9e71c201f059`

## Características

### 🔐 Seguridad

- Control de acceso basado en blockchain
- Permisos granulares (lectura, escritura, completo)
- Expiración automática de permisos

### 📱 Interfaz Responsive

- Diseño adaptativo para móviles y desktop
- Interfaz intuitiva con Tailwind CSS
- Componentes reutilizables

### ⛓️ Integración Blockchain

- Conexión directa con Arbitrum Sepolia
- Transacciones de bajo costo
- Verificación en tiempo real

### 📊 Dashboard Completo

- Estadísticas en tiempo real
- Historial de actividades
- Gestión de permisos

## Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Dashboard.tsx
│   ├── DocumentManager.tsx
│   ├── PermissionManager.tsx
│   ├── UserRegistration.tsx
│   └── WalletConnect.tsx
├── contexts/           # Contextos React
│   └── Web3Context.tsx
├── config/            # Configuraciones
│   ├── contracts.ts
│   └── network.ts
├── types/             # Tipos TypeScript
│   ├── global.d.ts
│   └── index.ts
├── App.tsx            # Componente principal
├── index.tsx          # Punto de entrada
└── index.css          # Estilos globales
```

## Solución de Problemas

### Error: "Cannot find module 'react'"

```bash
npm install react react-dom @types/react @types/react-dom
```

### Error: "MetaMask not detected"

- Instala MetaMask desde [metamask.io](https://metamask.io/)
- Recarga la página después de la instalación

### Error: "Wrong network"

- Cambia a Arbitrum Sepolia en MetaMask
- La aplicación puede agregar la red automáticamente

### Transacciones fallan

- Verifica que tengas ETH suficiente para gas
- Asegúrate de estar en la red correcta
- Revisa que los contratos estén accesibles

## Desarrollo

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
REACT_APP_ARBITRUM_SEPOLIA_RPC=https://sepolia-rollup.arbitrum.io/rpc
REACT_APP_ACCESS_CONTROL_ADDRESS=0xE581f2a4840fdb1CAc660876Fdd512980846Ad04
REACT_APP_MEDICAL_RECORDS_ADDRESS=0xC6902Cdd7732DFA81c3d14431D0F1de670BC1747
REACT_APP_AUDIT_TRAIL_ADDRESS=0xD587fA568C2a48a9ae8b5793796C9e71c201f059
```

### Extensión de Funcionalidades

Para agregar nuevas características:

1. **Nuevos Contratos:** Actualiza `src/config/contracts.ts`
2. **Nuevos Componentes:** Agrega en `src/components/`
3. **Nuevas Rutas:** Modifica `src/App.tsx`
4. **Nuevos Tipos:** Define en `src/types/`

## Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo LICENSE para más detalles.

## Soporte

Para reportar problemas o solicitar características:

1. Abre un issue en el repositorio
2. Describe el problema detalladamente
3. Incluye pasos para reproducir el error

---

**¡Listo!** Ya tienes un sistema completo de historias clínicas basado en blockchain funcionando en Arbitrum Sepolia. 🎉
