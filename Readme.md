#  AdminBot: Gestión de Asistencia y Pagos con IA

AdminBot es una aplicación web integral diseñada para centros educativos. Permite el registro de asistencia y el control de pagos de estudiantes, automatizando la comunicación con los padres de familia mediante alertas de WhatsApp en tiempo real.

Este proyecto destaca por el uso estratégico de *Inteligencia Artificial* (ChatGPT, GitHub Copilot, Codeium) para optimizar el ciclo de desarrollo.

## 📋 Tabla de Contenidos

- [Características Principales](#características-principales)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Guía de Desarrollo](#guía-de-desarrollo)
- [Licencia](#licencia)

## ✨ Características Principales

- **Registro de Asistencia**: Control diario de ingresos y faltas con interfaz intuitiva
- **Gestión de Pagos**: Monitoreo de mensualidades y saldos pendientes
- **Alertas Automáticas**: Envío de mensajes vía WhatsApp ante inasistencias o deudas
- **Dashboard Interactivo**: Interfaz moderna con gráficos en tiempo real
- **Gestión de Estudiantes**: CRUD completo de datos estudiantiles
- **Gestión de Usuarios**: Autenticación y control de acceso
- **Gestión de Cursos**: Administración de cursos y materias
- **Arquitectura Robusta**: API REST propia conectada a base de datos SQL

## 🛠️ Stack Tecnológico

| Componente        | Tecnologías                                        |
| :---------------- | :--------------------------------------------------|
| **Frontend**      | HTML5, CSS3, JavaScript ES6 (Vite)                |
| **Backend**       | Node.js, Express.js                                |
| **Base de Datos** | MySQL (mysql2)                                     |
| **Integraciones** | API de WhatsApp                                    |
| **IA Tools**      | ChatGPT, GitHub Copilot, Codeium                   |
| **Librerías**     | Chart.js, Toastify                                 |

## 📁 Estructura del Proyecto

```
AdminBot/
├── Backend/
│   ├── app.js                 # Servidor Express principal
│   ├── package.json
│   ├── Config/
│   │   └── Db.js             # Configuración de base de datos
│   ├── Controllers/           # Lógica de negocio
│   │   ├── auth.controller.js
│   │   ├── UserController.js
│   │   ├── AcudientesController.js
│   │   ├── CursosController.js
│   │   ├── MateriasController.js
│   │   ├── MatriculasController.js
│   │   ├── NotasController.js
│   │   └── ProfesoresController.js
│   ├── Models/                # Modelos de datos
│   │   ├── auth.model.js
│   │   ├── UserModel.js
│   │   ├── AcudientesModel.js
│   │   ├── CursosModel.js
│   │   ├── MateriasModel.js
│   │   ├── MatriculasModel.js
│   │   ├── NotasModel.js
│   │   └── ProfesoresModel.js
│   ├── Routes/                # Rutas de API
│   │   ├── auth.routes.js
│   │   ├── UserRoutes.js
│   │   ├── AcudientesRoutes.js
│   │   ├── CursosRoutes.js
│   │   ├── MateriasRoutes.js
│   │   ├── MatriculasRoutes.js
│   │   ├── NotasRoutes.js
│   │   └── ProfesoresRoutes.js
│   ├── middleware/
│   │   └── auth.middleware.js # Middleware de autenticación
│   └── modules/
│       └── whatsApp/          # Integración WhatsApp
│
├── Frontend/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── assets/
│       │   ├── icons/
│       │   ├── images/
│       │   └── logos/
│       ├── pages/
│       │   ├── auth/          # Página de login
│       │   ├── dashboard/     # Dashboard principal
│       │   ├── students/      # Gestión de estudiantes
│       │   ├── attendance/    # Registro de asistencia
│       │   ├── payments/      # Control de pagos
│       │   ├── alerts/        # Historial de alertas
│       │   └── settings/      # Configuración de usuario
│       └── shared/
│           ├── components/
│           ├── css/
│           │   ├── global.css
│           │   ├── layout.css
│           │   ├── main.css
│           │   ├── reset.css
│           │   └── variables.css
│           └── js/
│               ├── api.js     # Cliente API centralizado
│               ├── storage.js # Gestión de localStorage
│               └── utils.js   # Funciones utilitarias
│
├── Entrega de archivos/
│   └── Tabla_AdminBot.sql    # Script de base de datos
└── Readme.md
```

## 🚀 Instalación

### Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- MySQL (v5.7 o superior)
- Git

### Pasos de Instalación

#### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd AdminBot
```

#### 2. Configurar Backend

```bash
cd Backend
npm install
```

Crear archivo `.env` en la carpeta Backend:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=adminbot
```

#### 3. Configurar Frontend

```bash
cd ../Frontend
npm install
```

#### 4. Crear Base de Datos

```bash
mysql -u root -p < ../Entrega\ de\ archivos/Tabla_AdminBot.sql
```

## ⚙️ Configuración

### Base de Datos

1. Abrir MySQL y crear base de datos
2. Ejecutar el script SQL proporcionado
3. Configurar credenciales en `Backend/Config/Db.js`

### Variables de Entorno

Backend requiere configuración en `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=contraseña
DB_NAME=adminbot
NODE_ENV=development
PORT=3000
```

### CORS

El backend está configurado para aceptar solicitudes desde:
- `http://localhost:5173` (Vite dev server)
- `http://127.0.0.1:5173`

## 💻 Uso

### Iniciar la Aplicación

**Terminal 1 - Backend:**

```bash
cd Backend
npm start
# O para desarrollo con auto-reload
npm run dev
```

El backend estará disponible en `http://localhost:3000`

**Terminal 2 - Frontend:**

```bash
cd Frontend
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### Acceso a la Aplicación

1. Abrir navegador en `http://localhost:5173`
2. Iniciar sesión con credenciales válidas
3. Explorar las diferentes secciones del dashboard

## 📡 API Endpoints

### Autenticación

- `POST /api/login` - Iniciar sesión
- `POST /api/logout` - Cerrar sesión

### Estudiantes

- `GET /api/students` - Obtener lista de estudiantes
- `POST /api/students` - Crear nuevo estudiante
- `PUT /api/students/:id` - Actualizar estudiante
- `DELETE /api/students/:id` - Eliminar estudiante

### Asistencia

- `GET /api/attendance` - Obtener registros de asistencia
- `POST /api/attendance` - Registrar asistencia
- `DELETE /api/attendance/:id` - Eliminar registro

### Pagos

- `GET /api/payments` - Obtener registros de pagos
- `POST /api/payments` - Registrar pago
- `PUT /api/payments/:id` - Actualizar pago
- `DELETE /api/payments/:id` - Eliminar pago

### Usuarios

- `GET /api/users` - Obtener usuarios
- `POST /api/users` - Crear usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario
- `PUT /api/users/profile` - Actualizar perfil
- `PUT /api/users/password` - Cambiar contraseña

### Cursos

- `GET /api/courses` - Obtener cursos
- `POST /api/courses` - Crear curso
- `PUT /api/courses/:id` - Actualizar curso
- `DELETE /api/courses/:id` - Eliminar curso

### Materias

- `GET /api/subjects` - Obtener materias
- `POST /api/subjects` - Crear materia
- `PUT /api/subjects/:id` - Actualizar materia
- `DELETE /api/subjects/:id` - Eliminar materia

### Notas

- `GET /api/grades` - Obtener notas
- `POST /api/grades` - Crear nota
- `PUT /api/grades/:id` - Actualizar nota
- `DELETE /api/grades/:id` - Eliminar nota

### WhatsApp

- `POST /api/whatsapp/send` - Enviar mensaje WhatsApp
- `GET /api/whatsapp/history` - Obtener historial de mensajes
- `DELETE /api/whatsapp/history/:id` - Eliminar mensaje del historial

### Dashboard

- `GET /api/dashBoard` - Obtener datos del dashboard

## 🔨 Guía de Desarrollo

### Estructura del Código

#### Frontend

**Módulos de Página** (`Frontend/src/pages/*/[page].js`):
- Cada página tiene su propio módulo JavaScript
- Patrón: `loadData()` → `renderUI()` → `attachEventListeners()`
- Gestión de estado con variables globales

**Cliente API** (`Frontend/src/shared/js/api.js`):
- Centraliza todas las llamadas al backend
- Maneja autenticación automáticamente
- Métodos CRUD para cada recurso
- Inyecta headers de autenticación

**Almacenamiento** (`Frontend/src/shared/js/storage.js`):
- `guardarUsuario()` - Guardar datos de usuario
- `obtenerUsuario()` - Obtener datos de usuario
- `cerrarUsuario()` - Limpiar sesión

#### Backend

**Estructura MVC**:
- **Models**: Consultas a base de datos
- **Controllers**: Lógica de negocio
- **Routes**: Definición de endpoints

**Autenticación**:
- Token en header `x-auth`
- Usuario serializado en localStorage

### Agregar Nuevas Funcionalidades

1. **Backend**:
   - Crear modelo en `Models/`
   - Crear controlador en `Controllers/`
   - Crear rutas en `Routes/`
   - Conectar en `app.js`

2. **Frontend**:
   - Agregar métodos en `api.js`
   - Crear página en `pages/[nueva-pagina]/`
   - Actualizar navegación

### Estándares de Código

- **JavaScript**: ES6 modules
- **Nomenclatura**: camelCase para funciones, PascalCase para clases
- **Comentarios**: Código limpio, mínimos comentarios
- **Formateo**: Consistent indentation (2 espacios)

## 📝 Licencia

Este proyecto está bajo licencia [MIT](LICENSE).

---

**Desarrollado con IA** 🤖✨

*Última actualización: Febrero 2026*
