# Café Sostenible AI · CAFE-IA

**Sistema de trazabilidad inteligente para café sostenible** — plataforma full-stack con arquitectura hexagonal, MySQL, JWT/RBAC, IA predictiva, chatbot, reportes exportables y despliegue en **Railway + Vercel**.

**Versión actual:** **PMV3 · Integrado** (consolida PMV1 + PMV2 con mejoras visuales en la web)

[![GitHub](https://img.shields.io/badge/GitHub-4dr1--2529%2FCAFE--IA-181717?logo=github)](https://github.com/4dr1-2529/CAFE-IA)
[![PMV3](https://img.shields.io/badge/PMV3-Integrado-amber)](PMV3_MEJORAS.md)
[![Node](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)]()
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)]()
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)]()
[![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)]()
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql)]()
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express)]()
[![Arquitectura](https://img.shields.io/badge/Arquitectura-Hexagonal-8B5CF6)]()
[![Live Demo](https://img.shields.io/badge/Demo-cafe--ia--inky.vercel.app-0070F3?logo=vercel)](https://cafe-ia-inky.vercel.app)

---

## Enlaces rápidos

| Recurso | URL |
|---------|-----|
| **Repositorio GitHub** | [github.com/4dr1-2529/CAFE-IA](https://github.com/4dr1-2529/CAFE-IA) |
| **Frontend (Vercel)** | [cafe-ia-inky.vercel.app](https://cafe-ia-inky.vercel.app) |
| **Resumen PMV3** | [cafe-ia-inky.vercel.app/resumen-pmv3](https://cafe-ia-inky.vercel.app/resumen-pmv3) |
| **API producción (Railway)** | [cafe-sostenible-api-production-03ad.up.railway.app/api/health](https://cafe-sostenible-api-production-03ad.up.railway.app/api/health) |
| **Documentación PMV3** | [PMV3_MEJORAS.md](PMV3_MEJORAS.md) |

### Credenciales demo (producción)

```text
Admin:   admin@cafeai.com  / admin123
Cliente: cliente1@cafeai.com / mbappe29
```

---

## ¿Qué hace este proyecto?

Plataforma web para gestionar la cadena del café desde el productor hasta la comercialización, con trazabilidad por etapas, control de calidad sensorial, predicción IA y reportes exportables.

| Capacidad | Descripción |
|-----------|-------------|
| **Productores y lotes** | Registro, códigos automáticos, geografía y datos de parcela |
| **Producción** | Cosecha, humedad, temperatura, tipo de secado, cantidad en kg |
| **Trazabilidad** | Línea de tiempo visual por lote con % de avance y etapas completadas |
| **Control de calidad** | Evaluación Q Grader con indicadores, recomendación y validaciones |
| **IA predictiva** | Motor heurístico v2 — calidad, probabilidad de riesgo, variables y recomendación |
| **Chatbot IA** | Asistente con intents sobre producción, lotes, calidad, reportes y auditoría |
| **Dashboard** | KPIs en tiempo real desde MySQL y gráficos Recharts |
| **Reportes** | Exportación PDF/Excel + **Resumen PMV3** consolidado |
| **Auditoría** | Historial de acciones con tabla detallada (solo admin) |
| **Multiusuario** | Roles `admin` (global) y `cliente` (filtrado por `user_id`) |

---

## Evolución PMV1 → PMV2 → PMV3

```text
PMV1 (Operaciones)          PMV2 (Inteligencia)           PMV3 (Integrado)
─────────────────────       ─────────────────────         ─────────────────────
Login · Dashboard           Chatbot IA                    PMV1 + PMV2 unificados
Productores · Lotes         Auditoría / Historial         KPIs visuales en dashboard
Producción · Trazabilidad   Módulo IA / ML                Timeline con % de avance
Control calidad             Reportes mejorados            Calidad con recomendaciones
Reportes · Base de datos    Multiusuario ADMIN/CLIENTE    Resumen PMV3 + tabla mejoras
                            Dataset demo ampliado         Navegación por grupos
                                                          Evidencias PMV1/2/3
```

| Versión | Alcance | Estado |
|---------|---------|--------|
| **PMV1** | Gestión base: login, dashboard, productores, lotes, producción, trazabilidad, calidad, reportes, BD | Completado |
| **PMV2** | IA, chatbot, auditoría, reportes exportables, roles ADMIN/CLIENTE | Completado |
| **PMV3** | Integración visual, KPIs, timeline, IA explicable, Resumen PMV3, UX unificada | Completado |

Detalle de mejoras PMV3: **[PMV3_MEJORAS.md](PMV3_MEJORAS.md)**

---

## Herramientas utilizadas por PMV

Resumen de tecnologías y herramientas empleadas en cada versión del producto. La evidencia detallada está en [Evidencias PMV](https://cafe-ia-inky.vercel.app/evidencias) (app), [testing/pruebas-funcionales-pmv/](testing/pruebas-funcionales-pmv/) y [Reporte-Calidad-Software/](Reporte-Calidad-Software/).

### PMV1 — Operaciones core

| Categoría | Herramientas | Uso en PMV1 |
|-----------|--------------|-------------|
| **IDE / desarrollo** | **Cursor**, **VS Code**, **Git**, **GitHub** | Edición del monorepo, control de versiones y colaboración |
| **Backend** | **Node.js 20**, **Express 4**, **mysql2** | API REST, pool MySQL, arquitectura inicial |
| **Frontend** | **React 18**, **Vite 5**, **Tailwind CSS 3**, **React Router 6** | SPA, rutas, estilos utility-first |
| **Base de datos** | **MySQL 8**, **XAMPP** (local), `schema.sql`, `seeds.sql`, `migrate.js` | 39 tablas, migración y datos demo |
| **Autenticación** | **jsonwebtoken**, **bcryptjs** | Login JWT, hash de contraseñas |
| **UI / gráficos** | **Lucide React**, **Recharts** | Iconografía y dashboard analítico |
| **Módulos** | Login, Usuarios, Productores, Producción, Trazabilidad, Calidad, Dashboard, Reportes, Base de datos | HU01–HU09 |
| **Pruebas funcionales** | **Cypress 13** — specs `PF-01` … `PF-09` | Login, dashboard, productores, producción, trazabilidad, reportes |
| **Pruebas backend** | **Node.js test runner**, **supertest** — `health.test.js`, `calidad.service.test.js`, `integration.test.js` | Health, puntaje calidad, integración API |
| **Documentación** | `README.md`, `docs/DOCUMENTACION_TECNICA.md`, `docs/ESQUEMA_RELACIONAL.md` | Arquitectura, API y modelo de datos |

### PMV2 — Inteligencia y multiusuario

| Categoría | Herramientas | Uso en PMV2 |
|-----------|--------------|-------------|
| **Arquitectura** | **Hexagonal** (domain → application → infrastructure → interfaces) | Refactor de rutas monolíticas a capas |
| **Seguridad** | **helmet**, **express-rate-limit**, **cors**, **RBAC** (`readGuard`, `writeGuard`, `adminGuard`) | Hardening HTTP y roles `admin` / `cliente` |
| **IA en producción** | **PredictionEngine.js** v2 (Node.js, heurística) | Predicción de calidad, riesgo %, alertas y recomendaciones |
| **ML (evidencia académica)** | **Python 3.10+**, **Scikit-learn** (`ml/train_model.py`, `RandomForestClassifier`) | Entrenamiento offline; la API usa el motor JS |
| **Chatbot** | **ChatbotService**, **chatbotIntentScoring.js**, **chatbotIntentHandlers.js** | Intents sobre datos MySQL y conocimiento del sistema |
| **Auditoría** | **ActionLogService**, **AuditoriaService**, tabla `auditoria_logs` | Historial de acciones (solo admin) |
| **Reportes exportables** | **pdfkit**, **exceljs** | Export PDF/Excel vía `/api/reportes/export` |
| **Validación** | `application/validators/`, `frontend/src/utils/validation.js` | DTOs backend y formularios frontend |
| **Datos demo** | Scripts `seed-pmv2.js`, `seedMultiusuarioPMV2.js`, `SEED_PMV2_FORCE` | 5 productores × 5 lotes = 25 lotes con trazabilidad y calidad |
| **Pruebas funcionales** | **Cypress** — `PF-08` (IA), `PF-10` (chatbot), `PF-11` (roles RBAC) | Módulo IA, chatbot y permisos admin/cliente |
| **Pruebas unitarias** | `prediction.test.js`, `validators.test.js`, `api.errors.test.js` | Motor IA, validadores y errores HTTP |
| **CI inicial** | **GitHub Actions** (`.github/workflows/ci.yml`) | Tests backend y build frontend |

### PMV3 — Integración visual y calidad

| Categoría | Herramientas | Uso en PMV3 |
|-----------|--------------|-------------|
| **Integración UI** | `pmv3Content.js`, `MainLayout.jsx`, `Pmv3IntegrationBanner`, `Pmv3ImprovementNotice`, `TrazabilidadTimeline` | Banner PMV3, KPIs, timeline con % avance, Resumen PMV3 |
| **Vistas PMV3** | `ResumenPMV3Page`, `DashboardPage`, `ControlCalidadPage`, `ModuloIAPage`, `AuditoriaPage`, `EvidenciasPMVPage` | Consolidación PMV1 + PMV2 en una UX unificada |
| **Conexión producción** | **Vercel** (proxy `/api` → Railway), **Railway** (API + MySQL), `warmBackend`, timeouts 30–45 s | Evita timeouts por cold start y CORS directo |
| **Despliegue** | **Vercel** (SPA), **Railway** (backend), `vercel.json`, `deployGuard.js` | Frontend `cafe-ia-inky.vercel.app` + API en Railway |
| **Calidad estática** | **SonarCloud**, `sonar-project.properties`, `.sonarignore` | Análisis de duplicación, bugs y smells en CI |
| **Pruebas E2E** | **Cypress 13** — 11 specs `PF-01` … `PF-11` | Flujos completos admin/cliente documentados en `last-run.json` |
| **Rendimiento** | **Apache JMeter** (`testing/metricas/jmeter/`) | Carga 500 requests a `/api/health` |
| **Evaluación académica** | **Plan-de-Pruebas/** (FURPS+, OWASP, ingeniería inversa, **ICACIT**), **Reporte-Calidad-Software/** | Auditorías y trazabilidad documental PMV1/2/3 |
| **Métricas ágiles** | `testing/metricas-agiles/`, `docs/EDT_SCRUM_GANTT.md` | HU01–HU12 completadas, avance WBS ~92 % |
| **Lint / estilo** | **ESLint**, **Prettier** | Calidad de código frontend en desarrollo y CI |
| **Auditoría dependencias** | **npm audit** (GitHub Actions) | Vulnerabilidades high en backend y frontend |

### Resumen comparativo

| Herramienta | PMV1 | PMV2 | PMV3 |
|-------------|:----:|:----:|:----:|
| React + Vite + Tailwind | ✅ | ✅ | ✅ |
| Node.js + Express + MySQL | ✅ | ✅ | ✅ |
| JWT + bcrypt | ✅ | ✅ | ✅ |
| Arquitectura hexagonal | — | ✅ | ✅ |
| PredictionEngine v2 | — | ✅ | ✅ |
| Chatbot + Auditoría | — | ✅ | ✅ |
| PDF/Excel (pdfkit, exceljs) | — | ✅ | ✅ |
| Cypress E2E | ✅ (PF-01–09) | ✅ (+ PF-08,10,11) | ✅ (11 specs) |
| Python / Scikit-learn (`ml/`) | — | ✅ | ✅ |
| SonarCloud + GitHub Actions | — | ✅ | ✅ |
| Railway + Vercel | — | parcial | ✅ |
| Proxy `/api` Vercel → Railway | — | — | ✅ |
| JMeter + Plan ICACIT | — | — | ✅ |
| Resumen PMV3 + KPIs integrados | — | — | ✅ |

---

## Módulos y rutas de la aplicación

### Navegación (sidebar PMV3)

| Grupo | Módulos |
|-------|---------|
| **Gestión** | Dashboard, Productores, Usuarios *(admin)* |
| **Operaciones** | Registro Producción, Trazabilidad, Control Calidad, Base de Datos *(admin)* |
| **Inteligencia** | Módulo IA, Chatbot IA, Reportes, **Resumen PMV3**, Auditoría *(admin)* |
| **Evidencias** *(admin)* | Evidencias PMV |
| **Sistema** *(admin)* | Arquitectura, Historias de Usuario |

### Rutas principales

| Ruta | Módulo | Versión |
|------|--------|---------|
| `/login` | Autenticación | PMV1 |
| `/` | Dashboard con KPIs PMV3 | PMV3 |
| `/productores` | Productores | PMV1 |
| `/registro` | Registro de producción / lotes | PMV1 |
| `/trazabilidad` | Trazabilidad + línea de tiempo | PMV3 |
| `/calidad` | Control de calidad | PMV3 |
| `/ia` | Módulo IA / Machine Learning | PMV2+PMV3 |
| `/chatbot-ia` | Chatbot IA | PMV2+PMV3 |
| `/reportes` | Reportes + pestaña Resumen PMV3 | PMV3 |
| `/resumen-pmv3` | Vista dedicada Resumen PMV3 | PMV3 |
| `/basedatos` | Base de datos *(admin)* | PMV1 |
| `/auditoria` | Auditoría / historial *(admin)* | PMV2+PMV3 |
| `/usuarios` | Gestión de usuarios *(admin)* | PMV1 |
| `/evidencias` | Evidencias PMV *(admin)* | PMV3 |
| `/arquitectura` | Arquitectura del sistema *(admin)* | — |
| `/historias` | Historias de usuario HU01–HU12 *(admin)* | — |

---

## Stack tecnológico

### Backend (`backend/`)

| Categoría | Tecnología | Uso |
|-----------|------------|-----|
| Runtime | **Node.js 20+** (ES Modules) | Servidor API |
| Framework | **Express 4** | Rutas REST, middleware |
| Base de datos | **MySQL 8** + **mysql2** | Pool, prepared statements |
| Autenticación | **jsonwebtoken** + **bcryptjs** | JWT, refresh en `sesiones` |
| Seguridad | **helmet**, **express-rate-limit**, **cors** | Hardening HTTP |
| Reportes | **pdfkit**, **exceljs** | Export PDF/Excel |
| Tests | **Node.js test runner** + **supertest** | 6 suites automatizadas |
| Arquitectura | **Hexagonal** | domain → application → infrastructure → interfaces |

### Frontend (`frontend/`)

| Categoría | Tecnología | Uso |
|-----------|------------|-----|
| UI | **React 18** | Componentes, hooks, Context API |
| Build | **Vite 5** | Dev server (puerto 5174), HMR |
| Estilos | **Tailwind CSS 3** | Utility-first, modo oscuro |
| Routing | **React Router 6** | SPA, imports estáticos (bundle único) |
| Gráficos | **Recharts** | Dashboard analítico |
| Iconos | **Lucide React** | UI consistente |
| QR | **react-qr-code** | Códigos QR por lote |
| HTTP | Cliente propio + JWT | Refresh automático |

### DevOps y calidad

| Herramienta | Uso |
|-------------|-----|
| **GitHub Actions** | CI: tests backend, build frontend, SonarCloud, npm audit |
| **SonarCloud** | Análisis estático de código |
| **Railway** | API backend + MySQL en producción |
| **Vercel** | Hosting SPA (`frontend/`) |
| **Cypress 13** | 11 pruebas E2E (`testing/`) |
| **JMeter** | Pruebas de carga (`testing/metricas/jmeter/`) |

### Machine Learning (`ml/` — evidencia académica)

| Tecnología | Uso |
|------------|-----|
| **Python 3.10+** | Scripts de entrenamiento |
| **Scikit-learn** | `RandomForestClassifier` |
| **Producción** | `PredictionEngine.js` (heurística v2 en Node.js) |

> El módulo Python es evidencia universitaria; la API en producción usa el motor JavaScript del dominio.

---

## Cómo funciona el sistema

### Vista general

```text
┌─────────────┐   /api (proxy Vercel)   ┌──────────────────┐     mysql2 pool     ┌─────────────┐
│   Vercel    │  ─────────────────────► │  Railway API     │  ─────────────────► │  Railway    │
│  React SPA  │  ◄─────────────────── │  Express :8080   │  ◄───────────────── │  MySQL 8    │
│  (frontend) │     JSON REST         │  (backend)       │     SQL / 39 tablas │             │
└─────────────┘                       └──────────────────┘                     └─────────────┘
```

### Flujo de una petición (ejemplo: listar lotes)

```text
1. Usuario abre /trazabilidad en el navegador
2. React Router carga TrazabilidadPage
3. La página llama a api.get('/lotes') vía services/api/client.js (mismo origen `/api` en producción)
4. El cliente añade header Authorization: Bearer <JWT>
5. Express recibe GET /api/lotes
6. Middleware auth.js valida el token
7. Middleware rbac.js (readGuard) verifica permisos del rol
8. LoteController → LoteService → LoteRepository
9. Repository ejecuta SQL con filtro por user_id si es cliente
10. Respuesta JSON { ok: true, data: [...] } → React renderiza la tabla
```

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
| `admin` | Todos los productores, lotes, usuarios, auditoría, evidencias |
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
│   ├── sql/                                # schema.sql (39 tablas), seeds, migrations
│   ├── scripts/                            # Seeds PMV2, docs BD, verificación
│   ├── tests/                              # 6 suites automatizadas
│   └── src/
│       ├── app.js                          # Express, Helmet, CORS, rate-limit
│       ├── domain/                         # PredictionEngine.js (IA heurística)
│       ├── application/services/           # 17+ servicios de casos de uso
│       ├── infrastructure/repositories/    # 11 repositorios MySQL
│       └── interfaces/http/                # controllers, middleware, routes
│
├── frontend/                               # SPA React · Vite · Tailwind
│   ├── vercel.json                         # Deploy Vercel + VITE_API_URL
│   └── src/
│       ├── pages/                          # 16+ vistas (lazy-loaded)
│       ├── layouts/MainLayout.jsx          # Sidebar PMV3 · Integrado
│       ├── components/common/              # Pmv3IntegrationBanner, Pmv3ImprovementNotice
│       ├── constants/pmv3Content.js        # Contenido PMV3 compartido
│       ├── routes/AppRoutes.jsx
│       ├── context/                        # Auth · Theme · Toast
│       └── services/api/                   # Cliente REST + JWT
│
├── ml/                                     # Evidencia ML (Python / Scikit-learn)
├── testing/                                # Cypress E2E + métricas JMeter
├── docs/                                   # Documentación técnica y académica
├── Plan-de-Pruebas/                        # FURPS+, OWASP, ingeniería inversa, ICACIT
├── Reporte-Calidad-Software/               # Reporte FURPS+, OWASP, SonarCloud
│
├── PMV3_MEJORAS.md                         # Documentación de mejoras PMV3
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
│  AuthService, LoteService, PrediccionService, Chatbot…  │
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

---

## Seed y datos de prueba

### Seed PMV2 (25 lotes demo)

```bash
cd backend
set SEED_PMV2_FORCE=1      # Windows
# export SEED_PMV2_FORCE=1 # Linux/Mac
npm run db:seed:pmv2
```

Genera 5 productores × 5 lotes con trazabilidad, calidad y predicciones. Ver [docs/PMV2.md](docs/PMV2.md).

### Scripts adicionales

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
| GET | `/api/dashboard` | KPIs dashboard (PMV3) |
| GET | `/api/dashboard/metrics` | Métricas adicionales |
| GET/POST | `/api/productores` | CRUD productores |
| GET/POST | `/api/lotes` | Lotes |
| GET/POST | `/api/produccion` | Producción |
| GET/POST | `/api/trazabilidad` | Trazabilidad |
| GET/POST | `/api/control-calidad` | Calidad sensorial |
| POST | `/api/predicciones/ejecutar` | Predicción IA |
| GET | `/api/reportes/export/:tipo/:formato` | PDF / Excel |
| POST | `/api/chatbot` | Chatbot IA (PMV3 intents) |
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

### Vercel — Frontend

| Configuración | Valor |
|---------------|-------|
| Root Directory | `frontend` |
| Framework | Vite |
| Build Command | `npm run build` |
| Output | `dist` |

**Variables de entorno:**

```env
VITE_API_URL=https://cafe-sostenible-api-production-03ad.up.railway.app
VITE_SHOW_DEMO_CREDENTIALS=true
```

El frontend usa primero el proxy `/api` del mismo origen (configurado en `vercel.json`); `VITE_API_URL` es fallback directo a Railway.

### URLs de producción

| Componente | URL |
|------------|-----|
| Frontend | https://cafe-ia-inky.vercel.app |
| Resumen PMV3 | https://cafe-ia-inky.vercel.app/resumen-pmv3 |
| API | https://cafe-sostenible-api-production-03ad.up.railway.app |
| Health | https://cafe-sostenible-api-production-03ad.up.railway.app/api/health |

### Verificar PMV3 en producción

1. Login en https://cafe-ia-inky.vercel.app
2. Sidebar: **PMV3 · Integrado** y grupos Gestión / Operaciones / Inteligencia
3. Dashboard: banner PMV3 + KPIs (productores, lotes trazables, evaluaciones, predicciones, auditoría)
4. Abrir `/resumen-pmv3` — tarjetas PMV1/PMV2/PMV3 + tabla de mejoras
5. Chatbot: *«¿Qué mejoras incluye el PMV3?»*

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

## Documentación del proyecto

### Aplicación y PMV3

| Documento | Contenido |
|-----------|-----------|
| [PMV3_MEJORAS.md](PMV3_MEJORAS.md) | Objetivo, mejoras, rutas, cómo probar, evidencias visuales |
| [docs/PMV2.md](docs/PMV2.md) | Evolución PMV1 → PMV2 |
| [testing/pruebas-funcionales-pmv/README.md](testing/pruebas-funcionales-pmv/README.md) | Pruebas PF-01…PF-21 y herramientas por caso |
| [testing/metricas-agiles/README.md](testing/metricas-agiles/README.md) | Métricas HU01–HU12 por PMV |
| [docs/DOCUMENTACION_TECNICA.md](docs/DOCUMENTACION_TECNICA.md) | Arquitectura, API, JWT |
| [docs/ESTRUCTURA_PROYECTO.md](docs/ESTRUCTURA_PROYECTO.md) | Árbol de carpetas detallado |
| [docs/MATRIZ_PRUEBAS_HU.md](docs/MATRIZ_PRUEBAS_HU.md) | Historias de usuario y pruebas |
| [docs/AUDITORIA_TECNICA.md](docs/AUDITORIA_TECNICA.md) | Auditoría técnica PMV |

### Calidad y evaluación

| Carpeta | Contenido |
|---------|-----------|
| [Reporte-Calidad-Software/](Reporte-Calidad-Software/) | FURPS+, OWASP, SonarCloud, Cypress, JMeter |
| [Plan-de-Pruebas/](Plan-de-Pruebas/) | Evaluación FURPS+, OWASP, ingeniería inversa, ICACIT |
| [Plan-de-Pruebas/01_FURPS_OWASP/](Plan-de-Pruebas/01_FURPS_OWASP/) | Auditorías FURPS+ y OWASP |
| [Plan-de-Pruebas/02_Ingenieria_Inversa/](Plan-de-Pruebas/02_Ingenieria_Inversa/) | Ingeniería inversa del sistema |
| [Plan-de-Pruebas/03_ICACIT/](Plan-de-Pruebas/03_ICACIT/) | Metodología ICACIT y auditoría final |

### Machine Learning

| Documento | Contenido |
|-----------|-----------|
| [ml/README.md](ml/README.md) | Entrenamiento Scikit-learn |
| [testing/README_GENERAL.md](testing/README_GENERAL.md) | Pruebas E2E y métricas |

---

## Scripts monorepo (raíz)

```bash
npm run install:all     # Instala backend + frontend
npm run backend         # Inicia API
npm run frontend        # Inicia Vite dev
npm run build           # Build producción frontend
npm run test            # Tests backend
npm run test:e2e        # Cypress E2E
npm run db:seed:pmv2    # Seed 25 lotes demo
npm run metricas        # Métricas de rendimiento
```

---

## ML (evidencia universitaria)

```bash
cd ml
pip install -r requirements.txt
python train_model.py
```

Entrena `RandomForestClassifier` (Scikit-learn) sobre `data/dataset_cafe.csv`.

---

## Contribuir

1. Fork del repositorio [4dr1-2529/CAFE-IA](https://github.com/4dr1-2529/CAFE-IA)
2. Crear rama: `git checkout -b feature/mi-mejora`
3. Commit: `git commit -m "feat: descripción de la mejora"`
4. Push: `git push origin feature/mi-mejora`
5. Abrir Pull Request hacia `main`

---

## Licencia

MIT — Proyecto académico **Café Sostenible AI** · repositorio [CAFE-IA](https://github.com/4dr1-2529/CAFE-IA).

---

**Café Sostenible AI** · PMV3 Integrado · Trazabilidad · Calidad · Inteligencia Artificial
