# Café Sostenible AI · CAFE-IA

**Sistema de trazabilidad inteligente para café sostenible** — monorepo full-stack con arquitectura hexagonal, MySQL, JWT/RBAC, IA predictiva, reportes exportables y despliegue en **Railway + Vercel**.

[![GitHub](https://img.shields.io/badge/GitHub-4dr1--2529%2FCAFE--IA-181717?logo=github)](https://github.com/4dr1-2529/CAFE-IA)
[![Node](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)]()
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)]()
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql)]()
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express)]()
[![Arquitectura](https://img.shields.io/badge/Arquitectura-Hexagonal-8B5CF6)]()

---

## Enlaces

| Recurso | URL |
|---------|-----|
| **Repositorio GitHub** | [github.com/4dr1-2529/CAFE-IA](https://github.com/4dr1-2529/CAFE-IA) |
| **API producción (Railway)** | [cafe-sostenible-api-production-03ad.up.railway.app](https://cafe-sostenible-api-production-03ad.up.railway.app/api/health) |
| **Frontend (Vercel)** | Deploy SPA — `*.vercel.app` vía `frontend/vercel.json` |

---

## Descripción

Plataforma web para gestionar la cadena del café: productores, lotes, producción, trazabilidad por etapas, control de calidad sensorial, predicción IA, dashboard analítico, reportes PDF/Excel, chatbot y auditoría.

**Roles:** `admin` (alcance global) y `cliente` (datos propios filtrados por `user_id`).

---

## Estructura del repositorio (GitHub)

El proyecto está organizado como **monorepo** en la raíz del repositorio `CAFE-IA`:

```text
CAFE-IA/                              ← Raíz del repositorio GitHub
│
├── .github/
│   └── workflows/
│       └── ci.yml                    # CI: tests backend, build frontend, SonarCloud
│
├── backend/                          # API REST · Node.js · Express · MySQL
│   ├── server.js                     # Punto de entrada
│   ├── sql/
│   │   ├── schema.sql                # 39 tablas MySQL (utf8mb4)
│   │   ├── seeds.sql                 # Catálogos iniciales
│   │   ├── views.sql                 # Vistas analíticas
│   │   └── migrations/               # Migraciones incrementales
│   ├── scripts/                      # Seeds PMV2, verificación, utilidades
│   ├── tests/                        # 6 suites Node test + Supertest
│   └── src/
│       ├── app.js                    # Express, Helmet, rate-limit, CORS
│       ├── config/                   # env.js · database.js
│       ├── domain/                   # PredictionEngine.js (IA heurística v2)
│       ├── application/
│       │   ├── services/             # 17 servicios de casos de uso
│       │   └── validators/           # DTOs por entidad
│       ├── infrastructure/
│       │   ├── database/             # pool, migrate, seeds, schemaHelpers
│       │   └── repositories/         # 11 repositorios MySQL
│       ├── interfaces/http/
│       │   ├── controllers/          # 12 controllers REST
│       │   ├── middleware/           # auth.js · rbac.js · validate.js
│       │   └── routes/               # 13 módulos + index.js
│       └── shared/                   # AppError, RoleHelper, asyncHandler…
│
├── frontend/                         # SPA React · Vite · Tailwind
│   ├── vercel.json                   # Deploy Vercel + VITE_API_URL
│   ├── vite.config.js
│   ├── tailwind.config.js            # darkMode: 'class'
│   └── src/
│       ├── pages/                    # 15 vistas lazy-loaded
│       │   ├── auth/                 # Login
│       │   ├── dashboard/            # KPIs y gráficos
│       │   ├── productores/
│       │   ├── produccion/
│       │   ├── trazabilidad/
│       │   ├── calidad/
│       │   ├── ia/                   # Módulo IA + Chatbot
│       │   ├── reportes/
│       │   └── sistema/              # Usuarios, BD, Auditoría, Evidencias, Arquitectura, HU
│       ├── layouts/MainLayout.jsx    # Sidebar PMV1 / PMV2 / Sistema
│       ├── routes/AppRoutes.jsx
│       ├── context/                  # AuthContext · ThemeContext · ToastContext
│       ├── components/ui/            # PageHeader, KpiCard, FormField, Skeleton…
│       ├── services/api/             # Cliente REST + JWT
│       └── constants/                # routes.js · projectStructure.js
│
├── ml/                               # Evidencia ML universitaria (Python)
│   ├── train_model.py                # RandomForest · Scikit-learn
│   ├── data/dataset_cafe.csv
│   └── requirements.txt
│
├── testing/                          # Pruebas E2E Cypress
│   ├── cypress/e2e/                  # PF-01 … PF-11 (11 specs)
│   └── metricas/                     # Scripts Prometheus/Grafana/JMeter
│
├── docs/                             # Documentación académica y técnica
│   ├── ESTRUCTURA_PROYECTO.md
│   ├── DOCUMENTACION_TECNICA.md
│   ├── PMV2.md
│   ├── MATRIZ_PRUEBAS_HU.md
│   ├── DATOS_PRUEBA_PMV2.md
│   ├── ESQUEMA_RELACIONAL.md
│   ├── AUDITORIA_TECNICA.md
│   ├── EDT_SCRUM_GANTT.md
│   └── SONARCLOUD.md
│
├── INICIAR.bat                       # Arranque rápido Windows
├── SUBIR_GITHUB.bat
├── package.json                      # Scripts monorepo (install:all, test, build…)
├── render.yaml                       # Config alternativa Render
├── sonar-project.properties
└── README.md                         # Este archivo
```

> Árbol interactivo en la app: menú **Sistema → Arquitectura** (`/arquitectura`).

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

## Arquitectura hexagonal (backend)

```text
┌─────────────────────────────────────────────────────────┐
│  INTERFACES (HTTP)                                      │
│  12 Controllers · 13 Routes · JWT · RBAC · Helmet       │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│  APPLICATION — 17 Services · Validators                 │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│  DOMAIN — PredictionEngine · RoleHelper · CodeGenerator │
└───────────────────────────▲─────────────────────────────┘
                            │
┌───────────────────────────┴─────────────────────────────┐
│  INFRASTRUCTURE — 11 Repositories · pool.js · migrate   │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
                    MySQL Railway (39 tablas)
```

**Frontend:** React 18 → React Router → Context API → `services/api/client.js` → API REST

---

## Requisitos

| Herramienta | Versión |
|-------------|---------|
| Node.js | 18+ (CI usa 20) |
| MySQL | 8+ (XAMPP local o Railway) |
| npm | 9+ |
| Python *(opcional, ml/)* | 3.10+ |

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
CORS_ORIGINS=http://localhost:5174
```

### 3. Iniciar

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
npm run db:seed:pendientes     # Lotes pendientes de IA/calidad
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

Documentación completa: [docs/DOCUMENTACION_TECNICA.md](docs/DOCUMENTACION_TECNICA.md)

---

## Seguridad

| Mecanismo | Implementación |
|-----------|----------------|
| Autenticación | JWT (`AuthService` · `jsonwebtoken`) |
| Autorización | RBAC — `readGuard` · `writeGuard` · `adminGuard` |
| Roles | `admin` · `cliente` (legacy: supervisor/productor → cliente) |
| HTTP hardening | Helmet · rate-limit 500 req/15 min |
| CORS | Orígenes configurables + `*.vercel.app` |
| Contraseñas | bcrypt · refresh tokens en tabla `sesiones` |

---

## Base de datos

| Propiedad | Valor |
|-----------|-------|
| Motor | MySQL 8 |
| Tablas | **39** (`backend/sql/schema.sql`) |
| Charset | utf8mb4_unicode_ci |
| Migración | Automática al iniciar (`migrate.js`) |
| Producción | Railway MySQL (`mysql.railway.internal`) |

Módulos: geografía, seguridad, productores, lotes, producción, trazabilidad, calidad, IA, reportes, inventario, auditoría.

Esquema relacional: [docs/ESQUEMA_RELACIONAL.md](docs/ESQUEMA_RELACIONAL.md)

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

## ML (evidencia universitaria)

```bash
cd ml
pip install -r requirements.txt
python train_model.py
```

Entrena `RandomForestClassifier` (Scikit-learn) sobre `data/dataset_cafe.csv`. El motor en producción usa `PredictionEngine.js` (heurística v2); el módulo Python es evidencia académica complementaria.

---

## Despliegue

```text
GitHub (push main)
       │
       ├──────────────────┬──────────────────┐
       ▼                  ▼                  ▼
   Railway            Railway            Vercel
   Backend API        MySQL              Frontend SPA
   Express :8080      39 tablas          React build
```

| Componente | Plataforma | Configuración |
|------------|------------|---------------|
| Backend API | **Railway** | Auto-deploy desde GitHub · variables `MYSQL*` |
| MySQL | **Railway** | Servicio vinculado al backend |
| Frontend | **Vercel** | Root: `frontend/` · [vercel.json](frontend/vercel.json) |
| CI/CD | **GitHub Actions** | [.github/workflows/ci.yml](.github/workflows/ci.yml) |

**API producción:** `https://cafe-sostenible-api-production-03ad.up.railway.app`

---

## CI / Calidad

En cada push o PR a `main` / `develop`:

- Tests backend (`npm test`)
- Build frontend (`npm run build`)
- Análisis SonarCloud
- `npm audit`

Configuración: [docs/SONARCLOUD.md](docs/SONARCLOUD.md)

---

## Documentación

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

## Licencia

MIT — Proyecto académico **Café Sostenible AI** · repositorio [CAFE-IA](https://github.com/4dr1-2529/CAFE-IA).
