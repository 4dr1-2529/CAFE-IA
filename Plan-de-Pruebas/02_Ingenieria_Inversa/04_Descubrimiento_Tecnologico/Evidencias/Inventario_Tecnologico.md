# Inventario Tecnológico — CAFE-IA

**Fecha:** 2026-06-24  
**Metodología:** Ingeniería inversa sobre `package.json`, lockfiles, código fuente y configuraciones de despliegue

---

## Frontend

| ID | Tecnología | Versión | Ubicación | Estado |
|----|------------|---------|-----------|--------|
| TEC-001 | React | 18.3.1 | `frontend/src/` | Implementado |
| TEC-002 | React DOM | 18.3.1 | `frontend/src/main.jsx` | Implementado |
| TEC-003 | Vite | 5.4.21 | `frontend/vite.config.js` | Implementado |
| TEC-004 | @vitejs/plugin-react | 4.7.0 | `frontend/vite.config.js` | Implementado |
| TEC-005 | Tailwind CSS | 3.4.19 | `frontend/tailwind.config.js` | Implementado |
| TEC-006 | PostCSS | 8.5.10 | `frontend/postcss.config.js` | Implementado |
| TEC-007 | Autoprefixer | 10.5.0 | PostCSS pipeline | Implementado |
| TEC-008 | React Router DOM | 6.30.3 | `frontend/src/routes/AppRoutes.jsx` | Implementado |
| TEC-009 | Recharts | 2.15.4 | `frontend/src/pages/dashboard/` | Implementado |
| TEC-010 | lucide-react | 0.294.0 | Componentes UI (iconos) | Implementado |
| TEC-011 | react-qr-code | 2.0.21 | `LoteQrPanel.jsx` | Implementado |
| TEC-012 | prop-types | 15.8.1 | Validación props | Implementado |
| TEC-013 | @fontsource/inter | 5.2.8 | Tipografía global | Implementado |
| TEC-014 | Fetch API nativo | ES2022+ | `services/api/client.js` | Implementado |
| TEC-015 | ToastContext | propio | `context/ToastContext.jsx` | Implementado |
| — | Axios | — | — | **No implementado** |
| — | SweetAlert2 | — | — | **No implementado** |
| — | React Icons | — | — | **No implementado** |

---

## Backend

| ID | Tecnología | Versión | Ubicación | Estado |
|----|------------|---------|-----------|--------|
| TEC-016 | Node.js | 20 (CI) | `backend/server.js` | Implementado |
| TEC-017 | Express | 4.22.2 | `backend/src/app.js` | Implementado |
| TEC-018 | jsonwebtoken | 9.0.3 | `AuthService`, `middleware/auth.js` | Implementado |
| TEC-019 | bcryptjs | 2.4.3 | `AuthService`, `UsuarioService` | Implementado |
| TEC-020 | mysql2 | 3.22.3 | `infrastructure/database/pool.js` | Implementado |
| TEC-021 | dotenv | 16.6.1 | `config/env.js` | Implementado |
| TEC-022 | cors | 2.8.6 | `app.js` | Implementado |
| TEC-023 | helmet | 7.2.0 | `app.js` | Implementado |
| TEC-024 | express-rate-limit | 7.5.1 | `app.js` (500 req/15 min) | Implementado |
| TEC-025 | exceljs | 4.4.0 | `ReportExportService` | Implementado |
| TEC-026 | pdfkit | 0.15.2 | `ReportExportService` | Implementado |
| — | multer | — | — | **No implementado** |
| — | node-cron | — | — | **No implementado** |

---

## Base de Datos

| ID | Tecnología | Versión | Ubicación | Estado |
|----|------------|---------|-----------|--------|
| TEC-030 | MySQL | 8.x (Railway) | Producción Railway | Implementado |
| TEC-031 | schema.sql | 39 tablas | `backend/sql/schema.sql` | Implementado |
| TEC-032 | seeds.sql | — | `backend/sql/seeds.sql` | Implementado |
| TEC-033 | migrate.js | — | `infrastructure/database/migrate.js` | Implementado |
| TEC-034 | Pool conexiones | min 2 / max 10 | `pool.js`, `.env.example` | Implementado |
| TEC-035 | FK + índices | InnoDB utf8mb4 | schema.sql | Implementado |
| TEC-036 | Soft delete | `deleted_at` | Múltiples tablas | Implementado |

---

## Infraestructura

| ID | Tecnología | Versión | Ubicación | Estado |
|----|------------|---------|-----------|--------|
| TEC-037 | Railway | SaaS | API + MySQL prod | Implementado (activo) |
| TEC-038 | Vercel | SaaS | `frontend/vercel.json` | Implementado (activo) |
| TEC-039 | GitHub | Repositorio | `4dr1-2529/CAFE-IA` | Implementado |
| TEC-040 | render.yaml | Blueprint | Raíz repo | Referencia (no activo principal) |
| — | Dockerfile | — | — | **No implementado** |

---

## DevOps

| ID | Tecnología | Versión | Ubicación | Estado |
|----|------------|---------|-----------|--------|
| TEC-041 | GitHub Actions | ci.yml | `.github/workflows/ci.yml` | Implementado |
| TEC-042 | cross-env | 7.0.3 | Scripts `test:e2e` monorepo | Implementado |
| TEC-043 | @mermaid-js/mermaid-cli | 11.4.0 | Scripts `db:docs:png` | Implementado (dev) |
| TEC-044 | npm workspaces scripts | 2.0.0 | `package.json` raíz | Implementado |

---

## Calidad

| ID | Tecnología | Versión | Ubicación | Estado |
|----|------------|---------|-----------|--------|
| TEC-045 | Cypress | 13.17.0 | `testing/cypress/` | Implementado |
| TEC-046 | node:test | nativo Node 20 | `backend/tests/` | Implementado |
| TEC-047 | supertest | 6.3.4 | Tests integración | Implementado (dev) |
| TEC-048 | Apache JMeter | scripts | `testing/metricas/jmeter/` | Implementado |
| TEC-049 | SonarCloud | SaaS | `sonar-project.properties` + CI | Implementado |
| TEC-050 | ESLint | 8.57.1 | `frontend/` lint | Implementado |

---

## Machine Learning

| ID | Tecnología | Versión | Ubicación | Estado |
|----|------------|---------|-----------|--------|
| TEC-051 | PredictionEngine.js | v2.0-heuristic | `backend/src/domain/PredictionEngine.js` | **Producción** |
| TEC-052 | Python + scikit-learn | ≥1.3.0 | `ml/train_model.py` | Académico (offline) |
| TEC-053 | pandas | ≥2.0.0 | `ml/train_model.py` | Académico (offline) |
| TEC-054 | joblib | ≥1.5.3 | Persistencia modelo `.joblib` | Académico (offline) |

---

## Seguridad

| ID | Tecnología | Versión | Ubicación | Estado |
|----|------------|---------|-----------|--------|
| TEC-055 | JWT (access + refresh) | 9.0.3 | Auth + tabla `sesiones` | Implementado |
| TEC-056 | bcryptjs | 2.4.3 | Hash passwords | Implementado |
| TEC-057 | helmet | 7.2.0 | Headers seguridad HTTP | Implementado |
| TEC-058 | cors | 2.8.6 | Orígenes Vercel + localhost | Implementado |
| TEC-059 | express-rate-limit | 7.5.1 | Anti-abuso API | Implementado |
| TEC-060 | RBAC middleware | propio | `rbac.js`, `RoleHelper.js` | Implementado |
| TEC-061 | auditMiddleware | propio | Log acciones críticas | Implementado |

---

## Totales

| Categoría | Implementadas | No implementadas / Referencia |
|-----------|---------------|-------------------------------|
| Frontend | 15 | 3 no implementadas |
| Backend | 11 | 2 no implementadas |
| Base de Datos | 7 | — |
| Infraestructura | 3 activas + 1 ref | 1 no (Docker) |
| DevOps | 4 | — |
| Calidad | 6 | — |
| Machine Learning | 1 prod + 3 académico | — |
| Seguridad | 7 | — |
| **Total ítems inventariados** | **54** | **6 ausentes + 3 sustitutos documentados** |

---

*Ver `Matriz_Tecnologias.md` para riesgos y recomendaciones por tecnología.*
