# Estructura del proyecto — Café Sostenible AI v2.0 (PMV2)

## Árbol de carpetas

```text
cafe-cursor/
├── .github/workflows/
│   └── ci.yml                         # CI: npm test en backend
├── backend/
│   ├── sql/
│   │   ├── schema.sql                 # 39 tablas MySQL (utf8mb4)
│   │   ├── seeds.sql                  # Datos iniciales catálogos
│   │   └── views.sql                  # Vistas analíticas dashboard
│   ├── src/
│   │   ├── app.js                     # Express, helmet, rate-limit, CORS
│   │   ├── config/
│   │   │   └── env.js                 # Variables de entorno
│   │   ├── domain/
│   │   │   └── PredictionEngine.js    # Motor IA v2 (heurística)
│   │   ├── application/
│   │   │   ├── services/              # Casos de uso (10 servicios)
│   │   │   └── validators/            # DTO: productor, lote, calidad…
│   │   ├── infrastructure/
│   │   │   ├── database/
│   │   │   │   ├── pool.js
│   │   │   │   ├── migrate.js
│   │   │   │   └── seed-pmv2.js       # 5×5 = 25 lotes demo
│   │   │   └── repositories/          # 8 repositorios SQL
│   │   ├── interfaces/http/
│   │   │   ├── controllers/           # 7 adaptadores REST
│   │   │   ├── middleware/            # auth, rbac, validate
│   │   │   └── routes/                # /api/* por módulo
│   │   └── shared/                    # AppError, asyncHandler
│   └── tests/                         # Jest + Supertest (~18 casos)
├── frontend/
│   ├── vite.config.js · tailwind.config.js
│   └── src/
│       ├── pages/                     # auth, dashboard, productores, produccion,
│       │                              # trazabilidad, calidad, ia, reportes, sistema
│       ├── layouts/MainLayout.jsx
│       ├── routes/AppRoutes.jsx
│       ├── context/                   # Auth, Theme, Toast
│       ├── components/ui|common|features
│       ├── services/api/              # Cliente REST + JWT
│       ├── hooks/ · utils/ · constants/
│       └── index.css                  # Tema claro/oscuro
├── ml/                                # Python Scikit-learn (evolución)
│   ├── train_model.py
│   └── data/dataset_cafe.csv
├── docs/                              # Documentación académica y técnica
├── INICIAR.bat
└── README.md
```

> El árbol detallado con todos los archivos está en la app: **Arquitectura → Estructura de carpetas**, o en `frontend/src/constants/projectStructure.js`.

## Capas hexagonal (backend)

```text
HTTP Request
    → routes/*.routes.js
    → controllers/*Controller.js
    → application/services/*Service.js
    → domain/PredictionEngine.js (solo IA)
    → infrastructure/repositories/*Repository.js
    → MySQL (pool)
```

| Capa | Responsabilidad |
|------|-----------------|
| **interfaces/http** | Entrada REST, JWT, RBAC (`readGuard` / `writeGuard`) |
| **application** | Orquestación, validadores DTO, export PDF/Excel |
| **domain** | Reglas de negocio sin dependencias externas |
| **infrastructure** | Persistencia, migraciones, seed PMV2 |

## Módulos API ↔ capas

| Módulo | Controller | Service | Repository |
|--------|------------|---------|------------|
| Productores | ProductorController | ProductorService | ProductorRepository |
| Lotes | LoteController | LoteService | LoteRepository + CatalogRepository |
| Calidad | CalidadController | CalidadService | CalidadRepository |
| Trazabilidad | TrazabilidadController | TrazabilidadService | TrazabilidadRepository |
| Predicciones IA | PrediccionController | PrediccionService | PrediccionRepository |
| Dashboard | DashboardController | DashboardService | — (queries en service) |
| Reportes | ReportesController | ReportesService | ReportesRepository |
| Producción | ProduccionController | ProduccionService | ProduccionRepository |

## Frontend por carpetas

| Carpeta | Contenido |
|---------|-----------|
| `pages/auth` | Login JWT |
| `pages/dashboard` | KPIs y gráficos Recharts |
| `pages/productores` | HU01 — CRUD productores |
| `pages/produccion` | HU02 — registro lotes |
| `pages/trazabilidad` | HU03 — timeline + QR |
| `pages/calidad` | HU04 — evaluación sensorial |
| `pages/ia` | HU05 — predicción bajo demanda |
| `pages/reportes` | HU06 — reportes y export |
| `pages/sistema` | Evidencias PMV, arquitectura, HU, consulta BD |
| `components/ui` | PageHeader, KpiCard, FormField, Skeleton, EmptyState |
| `components/features` | TrazabilidadTimeline, LoteQrPanel |

## Tests (`backend/tests/`)

| Archivo | Alcance |
|---------|---------|
| `health.test.js` | Health check API |
| `integration.test.js` | Login JWT, productores, lotes, dashboard |
| `prediction.test.js` | Motor PredictionEngine |
| `validators.test.js` | DTOs entrada |
| `calidad.service.test.js` | Puntaje sensorial 0–100 |
| `api.errors.test.js` | 404 y validación |

Ejecutar: `cd backend && npm test`

## Scripts útiles

| Comando | Descripción |
|---------|-------------|
| `INICIAR.bat` | Backend :3029 + frontend :5174 |
| `npm run db:seed:pmv2` | Seed 25 lotes (con `SEED_PMV2_FORCE=1`) |
| `npm test` | Suite backend |
