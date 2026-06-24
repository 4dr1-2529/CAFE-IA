/** Árbol de carpetas PMV2 — fuente única para UI y documentación */
export const PROJECT_STRUCTURE_TREE = `cafe-cursor/
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
│   │   │   │   ├── ProductorService.js
│   │   │   │   ├── LoteService.js
│   │   │   │   ├── CalidadService.js
│   │   │   │   ├── TrazabilidadService.js
│   │   │   │   ├── PrediccionService.js
│   │   │   │   ├── DashboardService.js
│   │   │   │   ├── ReportesService.js
│   │   │   │   ├── ProduccionService.js
│   │   │   │   └── ReportExportService.js
│   │   │   └── validators/          # DTO: productor, lote, calidad…
│   │   ├── infrastructure/
│   │   │   ├── database/
│   │   │   │   ├── pool.js            # Pool MySQL
│   │   │   │   ├── migrate.js         # Migración al arranque
│   │   │   │   └── seed-pmv2.js       # 5×5 = 25 lotes demo
│   │   │   └── repositories/          # Acceso SQL por agregado
│   │   │       ├── ProductorRepository.js
│   │   │       ├── LoteRepository.js
│   │   │       ├── CalidadRepository.js
│   │   │       ├── TrazabilidadRepository.js
│   │   │       ├── PrediccionRepository.js
│   │   │       ├── ReportesRepository.js
│   │   │       ├── ProduccionRepository.js
│   │   │       └── CatalogRepository.js
│   │   ├── interfaces/http/
│   │   │   ├── controllers/           # Adaptadores REST (7)
│   │   │   ├── middleware/
│   │   │   │   ├── auth.js            # JWT authenticate
│   │   │   │   ├── rbac.js            # readGuard / writeGuard
│   │   │   │   └── validate.js
│   │   │   └── routes/                # Montaje /api/*
│   │   │       ├── index.js
│   │   │       ├── auth.routes.js
│   │   │       ├── productores.routes.js
│   │   │       ├── lotes.routes.js
│   │   │       ├── calidad.routes.js
│   │   │       ├── trazabilidad.routes.js
│   │   │       ├── predicciones.routes.js
│   │   │       ├── dashboard.routes.js
│   │   │       ├── reportes.routes.js
│   │   │       └── produccion.routes.js
│   │   └── shared/
│   │       ├── AppError.js
│   │       └── asyncHandler.js
│   └── tests/                         # Jest + Supertest (~18 casos)
│       ├── health.test.js
│       ├── integration.test.js
│       ├── prediction.test.js
│       ├── validators.test.js
│       ├── calidad.service.test.js
│       └── api.errors.test.js
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js             # darkMode: 'class'
│   └── src/
│       ├── main.jsx · App.jsx
│       ├── index.css                  # Tema claro/oscuro global
│       ├── pages/                     # Vistas lazy-loaded
│       │   ├── auth/LoginPage.jsx
│       │   ├── dashboard/DashboardPage.jsx
│       │   ├── productores/ProductoresPage.jsx
│       │   ├── produccion/RegistroProduccionPage.jsx
│       │   ├── trazabilidad/TrazabilidadPage.jsx
│       │   ├── calidad/ControlCalidadPage.jsx
│       │   ├── ia/ModuloIAPage.jsx
│       │   ├── reportes/ReportesPage.jsx
│       │   └── sistema/
│       │       ├── EvidenciasPMVPage.jsx
│       │       ├── ArquitecturaPage.jsx
│       │       ├── HistoriasUsuarioPage.jsx
│       │       └── BaseDatosPage.jsx
│       ├── layouts/MainLayout.jsx
│       ├── routes/AppRoutes.jsx
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   ├── ThemeContext.jsx
│       │   └── ToastContext.jsx
│       ├── components/
│       │   ├── ui/                    # PageHeader, KpiCard, FormField…
│       │   ├── common/                # PageLoader, ErrorBoundary
│       │   └── features/              # LoteQrPanel, TrazabilidadTimeline
│       ├── services/
│       │   ├── api/                   # client.js + index.js (REST)
│       │   ├── auth.service.js
│       │   └── ml.service.js
│       ├── hooks/useAuth.js · useToast.js
│       ├── utils/validation.js
│       └── constants/
│           ├── storage.js
│           ├── routes.js
│           └── projectStructure.js    # Este árbol
├── ml/                                # Evolución Python / Scikit-learn
│   ├── train_model.py
│   ├── data/dataset_cafe.csv
│   ├── requirements.txt
│   └── README.md
├── docs/
│   ├── PMV2.md
│   ├── ESTRUCTURA_PROYECTO.md
│   ├── DOCUMENTACION_TECNICA.md
│   ├── MATRIZ_PRUEBAS_HU.md
│   ├── AUDITORIA_TECNICA.md
│   └── EDT_SCRUM_GANTT.md
├── INICIAR.bat                        # Arranque Windows (backend + frontend)
├── package.json                       # Scripts monorepo
└── README.md`

export const STRUCTURE_LEGEND = [
  { capa: 'domain/', rol: 'Lógica de negocio pura (IA, reglas)' },
  { capa: 'application/', rol: 'Casos de uso y validación de entrada' },
  { capa: 'infrastructure/', rol: 'MySQL, repositorios, seeds' },
  { capa: 'interfaces/http/', rol: 'API REST, JWT, RBAC' },
  { capa: 'frontend/pages/', rol: 'Módulos UI por dominio de negocio' },
]
