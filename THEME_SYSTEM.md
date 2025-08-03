# Sistema de Temas - Histo Bit

## Descripción

El sistema de temas permite a los usuarios alternar entre modo claro y oscuro en la aplicación. El tema se aplica dinámicamente y se guarda en el localStorage del navegador.

## Características

### 🌞 Tema Claro

- Fondo blanco/gris claro
- Texto negro/gris oscuro
- Elementos de interfaz con colores claros
- Ideal para uso diurno

### 🌙 Tema Oscuro

- Fondo gris oscuro/negro
- Texto blanco/gris claro
- Elementos de interfaz con colores oscuros
- Ideal para uso nocturno y reduce la fatiga visual

## Implementación

### Contexto de Tema

- **Archivo**: `src/contexts/ThemeContext.tsx`
- **Funcionalidad**: Maneja el estado global del tema
- **Persistencia**: Guarda la preferencia en localStorage
- **Detección automática**: Respeta la preferencia del sistema operativo

### Componente de Alternador

- **Archivo**: `src/components/ThemeToggle.tsx`
- **Ubicación**: En el header de la aplicación
- **Iconos**: Sol para tema claro, Luna para tema oscuro

### Configuración de Tailwind

- **Archivo**: `tailwind.config.js`
- **Modo oscuro**: Configurado con `darkMode: 'class'`
- **Clases**: Utiliza el prefijo `dark:` para estilos del tema oscuro

## Uso de Clases CSS

### Patrones Comunes

```css
/* Fondos */
bg-white dark:bg-gray-800          /* Fondo principal */
bg-gray-50 dark:bg-gray-900        /* Fondo de página */
bg-gray-100 dark:bg-gray-700       /* Fondo secundario */

/* Textos */
text-gray-900 dark:text-white      /* Texto principal */
text-gray-600 dark:text-gray-400   /* Texto secundario */
text-gray-500 dark:text-gray-500   /* Texto terciario */

/* Bordes */
border-gray-200 dark:border-gray-700    /* Bordes principales */
border-gray-300 dark:border-gray-600    /* Bordes de inputs */

/* Estados de hover */
hover:bg-gray-50 dark:hover:bg-gray-700    /* Hover backgrounds */
```

### Colores Específicos por Componente

```css
/* Botones primarios */
bg-blue-600 dark:bg-blue-500
hover:bg-blue-700 dark:hover:bg-blue-600

/* Botones de éxito */
bg-green-600 dark:bg-green-500
hover:bg-green-700 dark:hover:bg-green-600

/* Alertas de error */
bg-red-50 dark:bg-red-900/30
border-red-200 dark:border-red-700
text-red-700 dark:text-red-300
```

## Componentes Actualizados

- ✅ **App.tsx** - Layout principal y proveedores
- ✅ **Dashboard.tsx** - Panel principal
- ✅ **WalletConnect.tsx** - Conexión de wallet
- ✅ **DocumentManager.tsx** - Gestión de documentos (parcial)
- ✅ **PermissionManager.tsx** - Gestión de permisos (parcial)
- ✅ **ThemeToggle.tsx** - Alternador de temas

## Estilos Personalizados

### CSS Global (`index.css`)

- Transiciones suaves entre temas
- Gradientes adaptativos
- Scrollbar personalizada para tema oscuro
- Estilos de placeholder para inputs

### Características Adicionales

1. **Transiciones suaves**: Cambios animados entre temas
2. **Persistencia**: La preferencia se mantiene entre sesiones
3. **Detección automática**: Respeta la configuración del SO
4. **Accesibilidad**: Mantiene el contraste adecuado

## Próximos Pasos

### Componentes Pendientes

- [ ] **UserRegistration.tsx** - Formulario de registro
- [ ] Modales y popups adicionales
- [ ] Componentes de notificaciones

### Mejoras Futuras

- [ ] Más variantes de temas (ej: temas de alto contraste)
- [ ] Personalización de colores por usuario
- [ ] Tema automático basado en hora del día
- [ ] Animaciones mejoradas para transiciones

## Uso

### Para Desarrolladores

```tsx
// Importar el hook
import { useTheme } from "../contexts/ThemeContext";

// Usar en componente
const { theme, toggleTheme, setTheme } = useTheme();

// Aplicar clases condicionales
<div className="bg-white dark:bg-gray-800">
  <h1 className="text-gray-900 dark:text-white">Título</h1>
</div>;
```

### Para Usuarios

1. Localizar el botón de tema en el header (icono de sol/luna)
2. Hacer clic para alternar entre modo claro y oscuro
3. La preferencia se guarda automáticamente

El sistema respeta la configuración del sistema operativo por defecto, pero permite override manual por parte del usuario.
