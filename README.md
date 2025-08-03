# 🌐 Histo Bit - Frontend

## 📋 Estructura del Frontend

Este proyecto incluye una aplicación React completa para interactuar con los contratos inteligentes de Histo Bit.

### 🎯 Funcionalidades

- 🔐 Conexión con MetaMask
- 👤 Registro de usuarios (Paciente, Doctor, Seguro, Auditor)
- 📄 Gestión de documentos médicos
- 🔒 Control de permisos granular
- 📊 Dashboard para cada tipo de usuario
- 🔍 Visualización de auditoría

### 🛠️ Tecnologías

- **React** + **TypeScript**
- **ethers.js** para interacción con blockchain
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **React Hook Form** para formularios
- **Lucide React** para iconos

### 📦 Instalación

```bash
# Crear aplicación React
npx create-react-app medical-records-frontend --template typescript
cd medical-records-frontend

# Instalar dependencias
npm install ethers @types/node
npm install -D tailwindcss postcss autoprefixer
npm install react-router-dom @types/react-router-dom
npm install react-hook-form
npm install lucide-react

# Configurar Tailwind
npx tailwindcss init -p
```

### 🚀 Configuración

1. Configura las direcciones de los contratos en `src/config/contracts.ts`
2. Actualiza la configuración de red en `src/config/network.ts`
3. Ejecuta `npm start` para iniciar el desarrollo

### 📱 Componentes Principales

- **WalletConnect**: Conexión con MetaMask
- **Dashboard**: Panel principal por tipo de usuario
- **DocumentManager**: Gestión de documentos médicos
- **PermissionManager**: Control de permisos
- **UserRegistration**: Registro de usuarios

### 🌐 Red de Despliegue

- **Arbitrum Sepolia** (Testnet)
- Costos mínimos de transacción
- Confirmaciones rápidas
