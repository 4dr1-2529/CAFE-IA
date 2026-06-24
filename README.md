# Café Sostenible AI · CAFE-IA

**Sistema de trazabilidad inteligente para café sostenible** — monorepo full-stack con arquitectura hexagonal, MySQL, JWT/RBAC, IA predictiva, reportes exportables y despliegue en **Railway + Vercel**.

[![GitHub](https://img.shields.io/badge/GitHub-4dr1--2529%2FCAFE--IA-181717?logo=github)](https://github.com/4dr1-2529/CAFE-IA)
[![Node](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)]()
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)]()
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)]()
[![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)]()
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql)]()
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express)]()
[![Arquitectura](https://img.shields.io/badge/Arquitectura-Hexagonal-8B5CF6)]()
[![Live Demo](https://img.shields.io/badge/Demo-cafe--ia--inky.vercel.app-0070F3?logo=vercel)](https://cafe-ia-inky.vercel.app)

---

## Enlaces

| Recurso | URL |
|---------|-----|
| **Repositorio GitHub** | [github.com/4dr1-2529/CAFE-IA](https://github.com/4dr1-2529/CAFE-IA) |
| **API producción (Railway)** | [cafe-sostenible-api-production-03ad.up.railway.app/api/health](https://cafe-sostenible-api-production-03ad.up.railway.app/api/health) |
| **Frontend (Vercel)** | [cafe-ia-inky.vercel.app](https://cafe-ia-inky.vercel.app) |

---

## ¿Qué hace este proyecto?

Plataforma web para gestionar la cadena del café desde el productor hasta la comercialización:

- **Productores y fincas** — registro, geografía (región/provincia/distrito), datos de parcela.
- **Lotes y producción** — cosecha, humedad, temperatura, tipo de secado, códigos QR.
- **Trazabilidad** — línea de tiempo por etapas (producción → secado → calidad → almacén → venta).
- **Control de calidad** — evaluación sensorial con criterios ponderados (aroma, sabor, cuerpo…).
- **IA predictiva** — motor heurístico v2 que estima puntaje y clasificación del lote.
- **Chatbot** — asistente con intents sobre lotes, productores y métricas del sistema.
- **Dashboard** — KPIs y gráficos con Recharts.
- **Reportes** — exportación PDF y Excel.
- **Auditoría** — registro de acciones (solo admin).
- **Multiusuario** — roles `admin` (alcance global) y `cliente` (datos filtrados por `user_id`).

---

## Stack tecnológico

### Backend (`backend/`)

| Categoría | Tecnología | Uso |
|-----------|------------|-----|
| Runtime | **Node.js 20+** (ES Modules) | Servidor API |
| Framework | **Express 4** | Rutas REST, middleware |
| Base de datos | **MySQL 8** + **mysql2** | Pool de conexiones, prepared statements |
| Autenticación | **jsonwebtoken** + **bcryptjs** | JWT, refresh en tabla `sesiones` |
| Seguridad | **helmet**, **express-rate-limit**, **cors** | Hardening HTTP, 500 req/15 min |
| Reportes | **pdfkit**, **exceljs** | Export PDF/Excel |
| Config | **dotenv** | Variables de entorno |
| Tests | **Node.js test runner** + **supertest** | 6 suites automatizadas |
| Arquitectura | **Hexagonal** (ports & adapters) | domain → application → infrastructure → interfaces |

### Frontend (`frontend/`)

| Categoría | Tecnología | Uso |
|-----------|------------|-----|
| UI | **React 18** | Componentes, hooks, Context API |
| Build | **Vite 5** | Dev server (puerto 5174), HMR, build producción |
| Estilos | **Tailwind CSS 3** | Utility-first, `darkMode: 'class'` |
| Routing | **React Router 6** | SPA, lazy loading de páginas |
| Gráficos | **Recharts** | Dashboard analítico |
| Iconos | **Lucide React** | UI consistente |
| QR | **react-qr-code** | Códigos QR por lote |
| HTTP | `fetch` + cliente propio | JWT en `localStorage`, refresh automático |
| Calidad | **ESLint** + **Prettier** | Lint y formato |

### DevOps y calidad

| Herramienta | Uso |
|-------------|-----|
| **GitHub Actions** | CI: tests backend, build frontend, SonarCloud, npm audit |
| **SonarCloud** | Análisis estático de código |
| **Railway** | API backend + MySQL en producción |
| **Vercel** | Hosting SPA (root: `frontend/`) |
| **Cypress 13** | 11 pruebas E2E funcionales (`testing/`) |
| **JMeter** | Pruebas de carga (`testing/metricas/jmeter/`) |

### Machine Learning (`ml/` — evidencia académica)

| Tecnología | Uso |
|------------|-----|
| **Python 3.10+** | Scripts de entrenamiento |
| **Scikit-learn** | `RandomForestClassifier` sobre dataset de café |
| **Producción** | `PredictionEngine.js` (heurística v2 en Node.js) |

> El módulo Python es evidencia universitaria; la API en producción usa el motor JavaScript del dominio.

---

## Cómo funciona el sistema

### Vista general

```text
┌─────────────┐     HTTPS + JWT      ┌──────────────────┐     mysql2 pool     ┌─────────────┐
│   Vercel    │  ──────────────────► │  Railway API     │  ─────────────────► │  Railway    │
│  React SPA  │  ◄────────────────── │  Express :8080   │  ◄───────────────── │  MySQL 8    │
│  (frontend) │     JSON REST        │  (backend)       │     SQL / 39 tablas │             │
└─────────────┘                      └──────────────────┘                     └─────────────┘
```

### Flujo de una petición (ejemplo: listar lotes)

```text
1. Usuario abre /trazabilidad en el navegador
2. React Router carga TrazabilidadPage (lazy)
3. La página llama a api.get('/lotes') vía services/api/client.js
4. El cliente añade header Authorization: Bearer <JWT>
5. Express recibe GET /api/lotes
6. Middleware auth.js valida el token
7. Middleware rbac.js (readGuard) verifica permisos del rol
8. LoteController → LoteService → LoteRepository
9. Repository ejecuta SQL con filtro por user_id si es cliente
10. Respuesta JSON { ok: true, data: [...] } → React renderiza la tabla
```

### Arranque del backend (`server.js`)

Al iniciar, el backend:

1. Lee variables `MYSQL*` y `JWT_SECRET` desde el entorno.
2. Ejecuta `initDatabase()` en `migrate.js`:
   - Aplica `schema.sql` si hay menos de 5 tablas.
   - Corre migraciones incrementales (`apply-migrations.js`).
   - Siembra catálogos (variedades, procesos, estados, criterios).
   - Crea usuario admin si `ADMIN_SEED_PASSWORD` está definido.
   - Opcionalmente carga datos demo PMV2.
3. Levanta Express en `0.0.0.0:PORT` (3029 local, 8080 en Railway).

### Autenticación

```text
Login → POST /api/auth/login (email + password)
      → AuthService verifica bcrypt
      → Emite access JWT + refresh token (tabla sesiones)
      → Frontend guarda token en localStorage
Peticiones → Header Authorization: Bearer <token>
401        → Cliente intenta refresh; si falla → logout y /login
```

| Rol | Alcance |
|-----|---------|
| `admin` | Todos los productores, lotes, usuarios, auditoría |
| `cliente` | Solo registros con su `user_id` |

---

## Estructura del repositorio

```text
CAFE-IA/                                    ← Raíz GitHub
│
├── .github/workflows/ci.yml                # CI: backend, frontend, SonarCloud, audit
│
├── backend/                                # API REST · Node.js · Express · MySQL
│   ├── server.js                           # Entrada: init DB + listen HTTP
│   ├── sql/
│   │   ├── schema.sql                      # 39 tablas (utf8mb4)
│   │   ├── seeds.sql                       # Catálogos de referencia
│   │   ├── views.sql                       # Vistas analíticas
│   │   └── migrations/                     # Migraciones SQL incrementales
│   ├── scripts/                            # Seeds PMV2, docs BD, verificación
│   ├── tests/                              # 6 suites (health, integration, IA…)
│   └── src/
│       ├── app.js                          # Express, Helmet, CORS, rate-limit
│       ├── config/                         # env.js · database.js
│       ├── domain/                         # PredictionEngine.js (IA heurística)
│       ├── application/
│       │   ├── services/                   # 17 servicios de casos de uso
│       │   └── validators/                 # DTOs por entidad
│       ├── infrastructure/
│       │   ├── database/                   # pool, migrate, seeds
│       │   └── repositories/               # 11 repositorios MySQL
│       ├── interfaces/http/
│       │   ├── controllers/                # 12 controllers REST
│       │   ├── middleware/                 # auth · rbac · validate · audit
│       │   └── routes/                     # 13 módulos de rutas
│       └── shared/                         # AppError, RoleHelper, asyncHandler…
│
├── frontend/                               # SPA React · Vite · Tailwind
│   ├── vercel.json                         # Deploy Vercel + VITE_API_URL
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── pages/                          # 15 vistas (lazy-loaded)
│       │   ├── auth/                       # Login
│       │   ├── dashboard/                  # KPIs y gráficos
│       │   ├── productores/ · produccion/ · trazabilidad/ · calidad/
│       │   ├── ia/                         # Módulo IA + Chatbot
│       │   ├── reportes/
│       │   └── sistema/                    # Usuarios, BD, Auditoría, HU…
│       ├── layouts/MainLayout.jsx          # Sidebar PMV1 / PMV2 / Sistema
│       ├── routes/AppRoutes.jsx
│       ├── context/                        # Auth · Theme · Toast
│       ├── components/ui/                  # Button, Card, DataTable, KpiCard…
│       ├── services/api/                   # Cliente REST + JWT
│       └── constants/                      # routes.js · projectStructure.js
│
├── ml/                                     # Evidencia ML (Python / Scikit-learn)
├── testing/                                # Cypress E2E + métricas JMeter/Prometheus
├── docs/                                   # Documentación técnica y académica
├── Reporte-Calidad-Software/               # Reporte FURPS+, OWASP, SonarCloud, evidencias
│
├── INICIAR.bat                             # Arranque rápido Windows
├── package.json                            # Scripts monorepo
├── sonar-project.properties
└── README.md                               # Este archivo
```

> Árbol interactivo en la app: menú **Sistema → Arquitectura** (`/arquitectura`).

---

## Arquitectura hexagonal (backend)

```text
┌─────────────────────────────────────────────────────────┐
│  INTERFACES (HTTP)                                      │
│  Controllers · Routes · JWT · RBAC · Helmet · audit     │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│  APPLICATION — Services · Validators                    │
│  AuthService, LoteService, PrediccionService, …         │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│  DOMAIN — lógica de negocio pura                        │
│  PredictionEngine · RoleHelper · CodeGenerator          │
└───────────────────────────▲─────────────────────────────┘
                            │
┌───────────────────────────┴─────────────────────────────┐
│  INFRASTRUCTURE — Repositories · pool.js · migrate.js   │
└───────────────────────────┬─────────────────────────────┘
                            ▼
                    MySQL (39 tablas)
```

**Capas y responsabilidades:**

| Capa | Carpeta | Responsabilidad |
|------|---------|-----------------|
| Interfaces | `interfaces/http/` | HTTP, controllers, middleware, rutas |
| Application | `application/services/` | Orquestar casos de uso, validar DTOs |
| Domain | `domain/` | Reglas de negocio sin dependencias externas |
| Infrastructure | `infrastructure/` | MySQL, migraciones, seeds |
| Shared | `shared/` | Utilidades transversales |

---

## Arquitectura frontend

```text
main.jsx
  └── App.jsx
        ├── AuthContext      → sesión, login/logout, rol
        ├── ThemeContext     → modo claro/oscuro (Tailwind class)
        ├── ToastContext     → notificaciones
        └── AppRoutes.jsx
              ├── LoginPage
              └── MainLayout (sidebar + outlet)
                    └── pages/* (lazy import con React.lazy)
                          └── services/api/client.js → Railway API
```

| Patrón | Implementación |
|--------|----------------|
| Estado global | React Context (auth, tema, toasts) |
| Rutas protegidas | `ProtectedShell` + `AdminRoute` |
| API | Cliente centralizado con JWT, timeout 8s, unwrap `{ ok, data }` |
| UI | Componentes reutilizables en `components/ui/` |
| Tema | Tailwind + `chartTheme.js` para Recharts |

---

## Módulos funcionales

### PMV1 — Operaciones core

| Módulo | Vista | API principal |
|--------|-------|---------------|
| Login | `/login` | `POST /api/auth/login` |
| Dashboard | `/` | `GET /api/dashboard` · `/metrics` |
| Productores | `/productores` | `GET/POST/PUT/DELETE /api/productores` |
| Registro producción | `/registro` | `POST /api/lotes` · `/api/produccion` |
| Trazabilidad | `/trazabilidad` | `GET/POST /api/trazabilidad` |
| Control calidad | `/calidad` | `GET/POST /api/control-calidad` |
| Reportes | `/reportes` | `GET /api/reportes/*` · export PDF/Excel |
| Base de datos | `/basedatos` | `GET /api/base-datos` |
| Usuarios *(admin)* | `/usuarios` | `GET/POST/PUT /api/usuarios` |

### PMV2 — Mejoras inteligentes

| Módulo | Vista | API principal |
|--------|-------|---------------|
| Módulo IA | `/ia` | `POST /api/predicciones/ejecutar` |
| Chatbot IA | `/chatbot-ia` | `POST /api/chatbot` |
| Auditoría *(admin)* | `/auditoria` | `GET/POST /api/auditoria` |

### Sistema *(solo admin)*

Evidencias PMV · Arquitectura · Historias de Usuario

---

## Requisitos

| Herramienta | Versión |
|-------------|---------|
| Node.js | 18+ (CI y producción usan 20) |
| MySQL | 8+ (XAMPP local o Railway) |
| npm | 9+ |
| Python *(opcional, `ml/`)* | 3.10+ |

---

## Instalación local

### 1. Clonar desde GitHub

```bash
git clone https://github.com/4dr1-2529/CAFE-IA.git
cd CAFE-IA
npm run install:all
```

### 2. Configurar MySQL (backend)

```bash
cd backend
copy .env.example .env    # Windows
# cp .env.example .env    # Linux/Mac
```

Variables obligatorias (mismos nombres que Railway):

```env
MYSQLHOST=127.0.0.1
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=
MYSQLDATABASE=cafe_sostenible
JWT_SECRET=tu_secreto_minimo_32_caracteres
ADMIN_SEED_PASSWORD=admin123
CORS_ORIGINS=http://localhost:5174
```

### 3. Configurar frontend (opcional en local)

```bash
cd frontend
copy .env.example .env
# VITE_API_URL=http://localhost:3029
```

### 4. Iniciar

**Windows:** doble clic en `INICIAR.bat`

**Manual:**

```bash
# Terminal 1 — Backend (puerto 3029)
cd backend && npm start

# Terminal 2 — Frontend (puerto 5174)
cd frontend && npm run dev
```

| Servicio | URL local |
|----------|-----------|
| Frontend | http://localhost:5174 |
| Backend API | http://localhost:3029/api |
| Health check | http://localhost:3029/api/health |

### Credenciales demo

```text
Admin:   admin@cafeai.com  / admin123
Cliente: cliente1@cafeai.com / mbappe29
```

> El admin solo se crea al arrancar si `ADMIN_SEED_PASSWORD` está definido en el `.env` del backend.

---

## Seed PMV2 (25 lotes demo)

```bash
cd backend
set SEED_PMV2_FORCE=1      # Windows
# export SEED_PMV2_FORCE=1 # Linux/Mac
npm run db:seed:pmv2
```

Genera 5 productores × 5 lotes con trazabilidad, calidad y predicciones. Ver [docs/PMV2.md](docs/PMV2.md).

Scripts adicionales:

```bash
npm run db:seed:multiusuario   # Dataset multiusuario PMV2
npm run db:seed:pendientes       # Lotes pendientes de IA/calidad
npm run db:docs                  # Generar documentación de BD
npm run seed:final               # Reset + seed completo
```

---

## API REST (resumen)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login JWT |
| GET | `/api/auth/me` | Sesión actual |
| GET | `/api/dashboard/metrics` | KPIs dashboard |
| GET/POST | `/api/productores` | CRUD productores |
| GET/POST | `/api/lotes` | Lotes |
| GET/POST | `/api/produccion` | Producción |
| GET/POST | `/api/trazabilidad` | Trazabilidad |
| GET/POST | `/api/control-calidad` | Calidad sensorial |
| POST | `/api/predicciones/ejecutar` | Predicción IA |
| GET | `/api/reportes/export/:tipo/:formato` | PDF / Excel |
| POST | `/api/chatbot` | Chatbot IA |
| GET/POST | `/api/auditoria` | Auditoría (admin) |
| GET | `/api/base-datos/:tabla` | Consulta tablas |
| GET | `/api/health` | Estado del servicio |

Documentación completa: [docs/DOCUMENTACION_TECNICA.md](docs/DOCUMENTACION_TECNICA.md)

---

## Seguridad

| Mecanismo | Implementación |
|-----------|----------------|
| Autenticación | JWT (`AuthService` · `jsonwebtoken`) |
| Autorización | RBAC — `readGuard` · `writeGuard` · `adminGuard` |
| Roles | `admin` · `cliente` |
| HTTP hardening | Helmet · rate-limit 500 req/15 min |
| CORS | Orígenes en `CORS_ORIGINS` + `*.vercel.app` automático |
| Contraseñas | bcrypt · refresh tokens en tabla `sesiones` |
| SQL | Prepared statements · `assertValidDbName` · `mysql.escapeId` |

---

## Base de datos

| Propiedad | Valor |
|-----------|-------|
| Motor | MySQL 8 |
| Tablas | **39** (`backend/sql/schema.sql`) |
| Charset | utf8mb4_unicode_ci |
| Migración | Automática al iniciar (`migrate.js`) |
| Producción | Railway MySQL |

Módulos: geografía, seguridad, productores, lotes, producción, trazabilidad, calidad, IA, reportes, inventario, auditoría.

Esquema relacional: [docs/ESQUEMA_RELACIONAL.md](docs/ESQUEMA_RELACIONAL.md) · [docs/base-datos/](docs/base-datos/)

---

## Tests

### Backend (Node test)

```bash
cd backend
npm test
```

| Archivo | Cobertura |
|---------|-----------|
| `health.test.js` | `/api/health` |
| `integration.test.js` | Login, lotes, dashboard |
| `prediction.test.js` | PredictionEngine v2 |
| `calidad.service.test.js` | Puntaje sensorial |
| `validators.test.js` | DTOs |
| `api.errors.test.js` | Errores HTTP |

### E2E Cypress (11 specs)

```bash
npm run test:e2e          # Headless
npm run test:e2e:open     # Interactivo
```

Specs en `testing/cypress/e2e/`: PF-01 (login admin) … PF-11 (roles RBAC).

Matriz HU: [docs/MATRIZ_PRUEBAS_HU.md](docs/MATRIZ_PRUEBAS_HU.md)

---

## Despliegue en producción

```text
git push main (GitHub)
       │
       ├────────────────────┬────────────────────┐
       ▼                    ▼                    ▼
   Railway              Railway               Vercel
   Backend API          MySQL                 Frontend SPA
   Root: backend/       Servicio vinculado    Root: frontend/
   PORT automático      Variables MYSQL*      VITE_API_URL
```

### Railway — Backend API

| Configuración | Valor |
|---------------|-------|
| Root Directory | `backend` |
| Start Command | `npm start` (→ `node server.js`) |
| Puerto | Railway asigna `PORT` automáticamente |

**Variables obligatorias en Railway:**

```env
MYSQLHOST=<referencia al servicio MySQL>
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=<generado por Railway>
MYSQLDATABASE=railway
JWT_SECRET=<mínimo 32 caracteres>
ADMIN_SEED_PASSWORD=admin123
CORS_ORIGINS=https://cafe-ia-inky.vercel.app
```

> Usar solo variables `MYSQL*`. No definir `DB_HOST`, `DB_USER` u otras variantes legacy.

### Railway — MySQL

Crear servicio MySQL en el mismo proyecto y vincular las variables al backend con referencias `${{MySQL.MYSQLHOST}}`, etc.

### Vercel — Frontend

| Configuración | Valor |
|---------------|-------|
| Root Directory | `frontend` |
| Framework | Vite |
| Build Command | `npm run build` |
| Output | `dist` |

**Variable de entorno:**

```env
VITE_API_URL=https://cafe-sostenible-api-production-03ad.up.railway.app
```

Ya configurada en `frontend/vercel.json` para builds automáticos.

### URLs de producción

| Componente | URL |
|------------|-----|
| API | https://cafe-sostenible-api-production-03ad.up.railway.app |
| Frontend | https://cafe-ia-inky.vercel.app |
| Health | https://cafe-sostenible-api-production-03ad.up.railway.app/api/health |

---

## CI / Calidad

En cada push o PR a `main` / `develop`:

| Job | Qué hace |
|-----|----------|
| `backend` | `npm test` (Node 20, `SKIP_INTEGRATION=1`) |
| `frontend` | `npm run build` |
| `sonarcloud` | Análisis estático SonarCloud |
| `dependency-audit` | `npm audit --audit-level=high` |

Configuración: [.github/workflows/ci.yml](.github/workflows/ci.yml) · [docs/SONARCLOUD.md](docs/SONARCLOUD.md)

---

## Reporte de calidad de software

Carpeta [Reporte-Calidad-Software/](Reporte-Calidad-Software/) con análisis FURPS+, OWASP Top 10, SonarCloud, Cypress, JMeter y plan de mejoras.

| Documento | Contenido |
|-----------|-----------|
| [README](Reporte-Calidad-Software/README.md) | Índice del reporte |
| `05_Evaluacion_FURPS+.md` | Funcionalidad, usabilidad, rendimiento… |
| `06_Evaluacion_OWASP.md` | Seguridad web |
| `07_Analisis_SonarQube.md` | Calidad de código |
| `11_Plan_Mejoras.md` | Acciones correctivas |

---

## Documentación adicional

| Documento | Contenido |
|-----------|-----------|
| [ESTRUCTURA_PROYECTO.md](docs/ESTRUCTURA_PROYECTO.md) | Árbol de carpetas detallado |
| [DOCUMENTACION_TECNICA.md](docs/DOCUMENTACION_TECNICA.md) | Arquitectura, API, JWT |
| [PMV2.md](docs/PMV2.md) | Evolución PMV1 → PMV2 |
| [MATRIZ_PRUEBAS_HU.md](docs/MATRIZ_PRUEBAS_HU.md) | Historias de usuario y pruebas |
| [DATOS_PRUEBA_PMV2.md](docs/DATOS_PRUEBA_PMV2.md) | Dataset multiusuario |
| [EDT_SCRUM_GANTT.md](docs/EDT_SCRUM_GANTT.md) | Planificación Scrum |
| [AUDITORIA_TECNICA.md](docs/AUDITORIA_TECNICA.md) | Auditoría técnica PMV |

---

## Scripts monorepo (raíz)

```bash
npm run install:all     # Instala backend + frontend
npm run backend         # Inicia API
npm run frontend        # Inicia Vite dev
npm run build           # Build producción frontend
npm run test            # Tests backend
npm run test:e2e        # Cypress E2E
npm run db:seed:pmv2    # Seed 25 lotes
npm run metricas        # Métricas de rendimiento
```

---

## ML (evidencia universitaria)

```bash
cd ml
pip install -r requirements.txt
python train_model.py
```

Entrena `RandomForestClassifier` (Scikit-learn) sobre `data/dataset_cafe.csv`. Ver [ml/README.md](ml/README.md).

---

## Licencia

MIT — Proyecto académico **Café Sostenible AI** · repositorio [CAFE-IA](https://github.com/4dr1-2529/CAFE-IA).
