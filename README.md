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
| Routing | **React Router 6** | SPA, lazy loading |
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

**Variable de entorno:**

```env
VITE_API_URL=https://cafe-sostenible-api-production-03ad.up.railway.app
```

Ya configurada en `frontend/vercel.json` para builds automáticos.

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
