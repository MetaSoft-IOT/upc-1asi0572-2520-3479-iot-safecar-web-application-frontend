# SafeCar Frontend - Aplicación Web IoT

<div align="center">
  
  **SafeCar - Soluciones IoT para Servicios Automotrices**
  
  ![Vue.js](https://img.shields.io/badge/Vue.js-3.5.22-4FC08D?style=flat&logo=vue.js&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat&logo=vite&logoColor=white)
  ![PrimeVue](https://img.shields.io/badge/PrimeVue-4.4.0-007ACC?style=flat&logo=primevue&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-20.19.0+-339933?style=flat&logo=node.js&logoColor=white)
</div>

## 📋 Descripción del Proyecto

SafeCar es una aplicación web frontend desarrollada para la gestión integral de servicios automotrices con tecnología IoT. La plataforma permite a talleres mecánicos gestionar solicitudes de servicio, historial de mantenimiento, seguimiento de vehículos en tiempo real mediante dispositivos IoT, y análisis predictivo para optimizar el mantenimiento vehicular.

### 🎯 Características Principales

- **Dashboard Ejecutivo**: Métricas y KPIs en tiempo real
- **Gestión de Solicitudes de Servicio**: Control completo de citas y servicios
- **Historial de Servicios**: Registro detallado de mantenimientos realizados
- **Monitoreo IoT de Vehículos**: Telemetría en tiempo real y análisis predictivo
- **Gestión de Talleres**: Registro y administración de talleres
- **Internacionalización**: Soporte para múltiples idiomas (ES/EN)
- **Interfaz Responsiva**: Diseño adaptable para escritorio y móviles

## 🛠️ Stack Tecnológico

### Frontend Framework
- **Vue.js 3.5.22** - Framework principal con Composition API
- **Vite 7.1.7** - Build tool y servidor de desarrollo
- **Vue Router 4.5.1** - Enrutamiento SPA

### UI/UX Framework
- **PrimeVue 4.4.0** - Librería de componentes UI
- **PrimeFlex 4.0.0** - Sistema de layout CSS flexbox
- **PrimeIcons 7.0.0** - Iconografía
- **@primevue/themes 4.4.0** - Sistema de temas (Aura)

### Estado y Comunicación
- **Pinia 3.0.3** - Gestión de estado global
- **Axios 1.12.2** - Cliente HTTP para APIs
- **Vue i18n 9.14.5** - Internacionalización

### Herramientas de Desarrollo
- **@vitejs/plugin-vue 6.0.1** - Plugin Vue para Vite
- **vite-plugin-vue-devtools 8.0.2** - DevTools para Vue

## 📁 Estructura del Proyecto

```
src/
├── assets/                    # Recursos estáticos
│   └── img/                   # Imágenes
├── dashboard/                 # Módulo Dashboard
│   └── pages/
├── locales/                   # Archivos de internacionalización
│   ├── en.json               # Idioma inglés
│   └── es.json               # Idioma español
├── public/                    # Componentes públicos/layout
│   ├── components/
│   │   ├── module-under-development.component.vue
│   │   ├── sidebar-safe-car.component.vue
│   │   └── toolbar-safe-car.component.vue
│   └── pages/
│       └── layout-safe-car.component.vue
├── router/                    # Configuración de rutas
├── security/                  # Módulo de autenticación
│   └── pages/
│       ├── sign-in.component.vue
│       └── sign-up.component.vue
├── service-history/           # Módulo historial de servicios
│   ├── components/
│   ├── models/
│   ├── pages/
│   └── services/
├── service-requests/          # Módulo solicitudes de servicio
│   ├── components/
│   ├── models/
│   ├── pages/
│   └── services/
├── shared/                    # Componentes compartidos
│   ├── components/
│   └── services/
├── vehicle-management/        # Módulo gestión de vehículos
│   ├── components/
│   ├── models/
│   ├── pages/
│   └── services/
├── App.vue                    # Componente raíz
├── i18n.js                    # Configuración i18n
├── main.js                    # Punto de entrada
└── styles.css                 # Estilos globales
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js**: 20.19.0+ o 22.12.0+
- **npm**: Incluido con Node.js
- **Git**: Para clonar el repositorio

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/MetaSoft-IOT/upc-pre-202520-1asi0572-3479-SafeCar-Frontend.git
cd upc-pre-202520-1asi0572-3479-SafeCar-Frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

4. **Acceder a la aplicación**
- Abrir navegador en: `http://localhost:5173`

### Scripts Disponibles

```bash
# Desarrollo con hot-reload
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 🔧 Configuración del Entorno

### Variables de Entorno
Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=SafeCar
VITE_APP_VERSION=1.0.0
```

### Configuración de Vite
El proyecto incluye configuración personalizada en `vite.config.js`:

- **Alias**: `@` apunta a `./src`
- **Plugin Vue**: Con devTools desactivado
- **Plugin Vue DevTools**: Para desarrollo

## 🎨 Configuración de UI

### Tema PrimeVue
- **Preset**: Aura (modo claro forzado)
- **Ripple Effect**: Activado
- **CSS Layer**: Desactivado

### Componentes Globales Registrados
Todos los componentes PrimeVue están registrados con prefijo `pv-`:
- `pv-button`, `pv-card`, `pv-data-table`, `pv-dialog`, etc.

## 🌐 Rutas Principales

### Autenticación
- `/sign-in` - Inicio de sesión
- `/sign-up` - Registro de talleres

### Dashboard Principal (`/safe-car`)
- `/safe-car/mechanic/dashboard` - Dashboard ejecutivo
- `/safe-car/mechanic/service-request` - Solicitudes de servicio
- `/safe-car/mechanic/appointment-request-details` - Detalles de citas
- `/safe-car/mechanic/service-history` - Historial de servicios
- `/safe-car/mechanic/vehicle-management` - Gestión de vehículos
- `/safe-car/mechanic/vehicle-details` - Detalles de vehículos

## 🌍 Internacionalización

El proyecto soporta múltiples idiomas usando Vue i18n:

- **Español (es)**: Idioma por defecto
- **Inglés (en)**: Idioma alternativo

Los archivos de traducción están en `src/locales/`:
- `es.json` - Traducciones en español
- `en.json` - Traducciones en inglés

## 📱 Características de UI/UX

### Diseño Responsivo
- **PrimeFlex**: Sistema de grid responsivo
- **Breakpoints**: Móvil, tablet, escritorio
- **Componentes adaptativos**: Tablas, formularios, navegación

### Componentes Principales
- **Sidebar**: Navegación lateral con menú colapsable
- **Toolbar**: Barra superior con cambio de idioma
- **DataTable**: Tablas con filtrado, paginación y exportación
- **Cards**: Información organizada en tarjetas
- **Forms**: Formularios con validación

## 🔐 Autenticación y Seguridad

### Flujo de Autenticación
1. **Login**: Autenticación por email/password
2. **Registro**: Registro de talleres con información completa
3. **Gestión de sesión**: Control de acceso por rutas

### Validaciones
- Campos requeridos
- Formato de email
- Confirmación de contraseña
- Términos y condiciones

## 📊 Módulos Funcionales

### 1. Dashboard Ejecutivo
- Métricas de rendimiento
- KPIs en tiempo real
- Gráficos y estadísticas

### 2. Gestión de Solicitudes
- Crear/editar citas
- Estados: Pendiente, Confirmado, En Progreso, Completado, Cancelado
- Filtros y búsquedas avanzadas

### 3. Historial de Servicios
- Registro completo de mantenimientos
- Tipos: Mantenimiento preventivo, reparaciones, cambio de aceite, etc.
- Costos y kilometraje

### 4. Gestión de Vehículos IoT
- **Telemetría en tiempo real**: RPM, velocidad, temperatura, etc.
- **Geolocalización**: GPS tracking
- **Diagnósticos**: Códigos OBD, alertas
- **Analytics**: Eficiencia de combustible, comportamiento de conducción
- **Mantenimiento predictivo**: Análisis de riesgo

## 🔄 Integración con APIs

### Configuración HTTP (Axios)
```javascript
// src/shared/services/http-common.js
import axios from 'axios';

const HTTP = axios.create({
  baseURL: 'https://api.safecar.com/',
  headers: {
    'Content-Type': 'application/json',
  }
});
```

### Servicios API
- `appointment-request-api.service.js` - Solicitudes
- `vehicle-api.service.js` - Vehículos

## 🎯 Próximas Características

- [ ] Notificaciones push en tiempo real
- [ ] Reportes avanzados y exportación
- [ ] Integración con sistemas de pago
- [ ] App móvil complementaria
- [ ] IA para análisis predictivo mejorado

## 🛠️ Entorno de Desarrollo

### IDE Recomendado
- **VS Code** + extensión **Vue (Official)**
- Desactivar extensión **Vetur** si está instalada

### Extensiones de Navegador
- **Chrome/Edge**: [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- **Firefox**: [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

### Configuración DevTools
- Activar **Custom Object Formatter** en Chrome DevTools
- Configurar formateadores personalizados en Firefox

## 📚 Recursos y Referencias

- [Documentación Vue.js 3](https://vuejs.org/)
- [Documentación Vite](https://vitejs.dev/)
- [Documentación PrimeVue](https://primevue.org/)
- [Documentación PrimeFlex](https://primeflex.org/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)

## 👥 Equipo de Desarrollo

**Universidad Peruana de Ciencias Aplicadas (UPC)**
- Curso: IoT Solutions and Applications
- Código: 1ASI0572
- Startup: MetaSoft
- Ciclo: 2025-20

## 📄 Licencia

Este proyecto es desarrollado con fines académicos para el curso de Aplicaciones y Soluciones IoT de la Universidad Peruana de Ciencias Aplicadas (UPC).

---

<div align="center">
  <strong>SafeCar Frontend - Tecnología IoT para la Industria Automotriz</strong>
</div>
