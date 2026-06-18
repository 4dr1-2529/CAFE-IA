# 03 — Alcance

## 3.1 Componentes incluidos

### Frontend (`cafe-cursor/frontend/`)

| Elemento | Archivos / rutas clave |
|----------|------------------------|
| SPA React 18 | `src/main.jsx`, `App.jsx` |
| Rutas | `src/routes/AppRoutes.jsx` — 15 vistas lazy-loaded |
| Autenticación UI | `pages/auth/LoginPage.jsx`, `context/AuthContext.jsx` |
| Layout | `layouts/MainLayout.jsx` — sidebar PMV1/PMV2/Sistema |
| Cliente API | `services/api/client.js` — JWT Bearer |
| Páginas funcionales | dashboard, productores, registro, trazabilidad, calidad, ia, chatbot, reportes, basedatos, usuarios, auditoria |
| Build / deploy | `vite.config.js`, `vercel.json`, `tailwind.config.js` |

### Backend (`cafe-cursor/backend/`)

| Elemento | Archivos / rutas clave |
|----------|------------------------|
| Entry point | `server.js` → `src/app.js` |
| 14 archivos de rutas | `src/interfaces/http/routes/*.routes.js` + `index.js` |
| 13 controllers | `src/interfaces/http/controllers/` |
| 17 services | `src/application/services/` |
| 11 repositories | `src/infrastructure/repositories/` |
| Middleware | `auth.js`, `rbac.js`, `validate.js`, `auditMiddleware.js` |
| Validators | `src/application/validators/` |
| Dominio IA | `src/domain/PredictionEngine.js` |
| Config | `src/config/env.js`, `database.js` |
| SQL | `sql/schema.sql`, `seeds.sql`, `views.sql`, `migrations/` |

### Base de datos

- Esquema completo: 39 tablas, 43 FK
- Documentación: `docs/ESQUEMA_RELACIONAL.md`, `docs/base-datos/`

### Pruebas y calidad

- Backend: `backend/tests/` — 6 archivos `.test.js`
- E2E: `testing/cypress/e2e/` — PF-01 a PF-11
- JMeter: `testing/metricas/jmeter/prueba_500_requests.jmx`
- SonarCloud: `sonar-project.properties`, `.github/workflows/ci.yml`
- ML evidencia: `ml/` (fuera del runtime de producción)

### Despliegue y configuración

- Railway (API + MySQL)
- Vercel (frontend)
- Variables: `backend/.env.example`
- CI: tests backend, build frontend, SonarCloud, npm audit

## 3.2 Componentes excluidos o limitados

| Elemento | Motivo |
|----------|--------|
| Colección Postman | No existe en el repositorio — se documenta inventario API derivado de rutas |
| Métricas SonarCloud live | Requieren login SonarCloud / secret `SONAR_TOKEN` |
| Integración ML Python en runtime | `ml/train_model.py` no invocado por Express |
| node_modules / dist | Artefactos generados — excluidos de análisis manual |
| Infraestructura Railway/Vercel interna | Solo configuración visible en repo (`vercel.json`, README) |

## 3.3 Módulos funcionales en alcance

### PMV1 — Operaciones core

| Módulo | Ruta UI | API principal |
|--------|---------|---------------|
| Login | `/login` | `POST /api/auth/login` |
| Dashboard | `/` | `GET /api/dashboard`, `/metrics` |
| Productores | `/productores` | CRUD `/api/productores` |
| Registro producción | `/registro` | `POST /api/lotes`, `/api/produccion` |
| Trazabilidad | `/trazabilidad` | `/api/trazabilidad` |
| Control calidad | `/calidad` | `/api/control-calidad` |
| Reportes | `/reportes` | `/api/reportes/*` |
| Base de datos | `/basedatos` | `/api/base-datos` |
| Usuarios (admin) | `/usuarios` | `/api/usuarios` |

### PMV2 — Mejoras inteligentes

| Módulo | Ruta UI | API principal |
|--------|---------|---------------|
| Módulo IA | `/ia` | `POST /api/predicciones/ejecutar` |
| Chatbot IA | `/chatbot-ia` | `POST /api/chatbot` |
| Auditoría (admin) | `/auditoria` | `/api/auditoria` |

### Sistema (solo admin)

Evidencias PMV, Arquitectura, Historias de Usuario — rutas `/evidencias`, `/arquitectura`, `/historias`.

## 3.4 Límites temporales

Análisis basado en el estado del repositorio al **18 de junio de 2026**, incluyendo evidencias Cypress del **28 de mayo de 2026** y CSV JMeter del **28 de mayo de 2026**.
