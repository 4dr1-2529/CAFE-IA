# Configuración del Entorno — CAFE-IA

**Fecha:** 24 de junio de 2026

---

## 1. Arquitectura de entornos

| Entorno | Frontend | Backend | Base de datos | Propósito |
|---------|----------|---------|---------------|-----------|
| **Desarrollo local** | Vite `:5174` | Express `:3029` | MySQL XAMPP `cafe_sostenible` | Desarrollo |
| **CI (GitHub Actions)** | `npm run build` | `npm test` (SKIP_INTEGRATION) | Variables dummy test | Validación |
| **Producción** | Vercel SPA | Railway API | Railway MySQL | Operación |

---

## 2. Configuración backend

### Arranque (`server.js`)

1. Carga `env` desde `backend/src/config/env.js`
2. Log variables MySQL (Railway)
3. `initDatabase()` — aplica `schema.sql` + migraciones
4. Listen `0.0.0.0:PORT` (default 3029)

### Variables obligatorias

```env
MYSQLHOST=127.0.0.1
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=
MYSQLDATABASE=cafe_sostenible
JWT_SECRET=<minimo_32_caracteres>
```

En producción adicionalmente: `CORS_ORIGINS`, SSL MySQL automático si `RAILWAY_ENVIRONMENT`.

### Detección Railway (`database.js`)

- `RAILWAY_ENVIRONMENT`, `RAILWAY_SERVICE_NAME`, `RAILWAY_PROJECT_ID`
- SSL activado si Railway o `MYSQL_SSL=true`
- **Sin fallback** a `DB_HOST`/`localhost` legacy

### Seguridad HTTP (`app.js`)

| Middleware | Configuración |
|------------|---------------|
| helmet | crossOriginResourcePolicy cross-origin |
| rateLimit | 500 req / 15 min (deshabilitado en test) |
| cors | `CORS_ORIGINS` + dev localhost + regex `*.vercel.app` |
| express.json | límite 2 MB |

---

## 3. Configuración frontend

### Vite (`vite.config.js`)

| Parámetro | Valor |
|-----------|-------|
| Puerto dev | 5174 |
| Host | `true` (LAN) |
| Proxy | `/api` → `http://127.0.0.1:3029` |
| envPrefix | `VITE_` |
| Chunks | vendor, charts, icons |

### API client (`frontend/src/config/api.js`)

- Dev: proxy `/api` o `localhost:3029`
- Prod: `VITE_API_URL` o fallback `RAILWAY_API_URL` hardcoded
- URL Vercel: `cafe-ia-inky.vercel.app`

### Vercel (`vercel.json`)

| Campo | Valor |
|-------|-------|
| framework | vite |
| outputDirectory | dist |
| rewrites | SPA fallback `/*` → index.html |
| VITE_API_URL | Railway API (env + build.env) |

---

## 4. Base de datos

### Scripts SQL

| Archivo | Función |
|---------|---------|
| `schema.sql` | DDL 39 tablas |
| `seeds.sql` | Datos iniciales |
| `views.sql` | Vistas |
| `migrations/001–005` | Evolución multiusuario, roles |

### Inicialización

`migrate.js` ejecuta al start:

- Crea BD si no existe (local)
- En Railway: conecta directo a BD existente
- Aplica schema y migraciones pendientes

### Pool (`pool.js` vía config)

- Min: `DB_POOL_MIN` (default 2)
- Max: `DB_POOL_MAX` (default 10)
- Prepared statements en repositorios

---

## 5. CI/CD (GitHub Actions)

**Archivo:** `.github/workflows/ci.yml`

| Job | Trigger | Acciones |
|-----|---------|----------|
| backend | push/PR main,master,develop | Node 20, npm test |
| frontend | idem | Node 20, npm run build |
| sonarcloud | needs backend+frontend | SonarCloud scan |
| dependency-audit | paralelo | npm audit high |

**Secrets:** `SONAR_TOKEN`, `GITHUB_TOKEN`

---

## 6. SonarCloud

**Archivo:** `sonar-project.properties`

- Organization: `4dr1-2529`
- ProjectKey: `4dr1-2529_CAFE-IA`
- Sources: `frontend/src`, `backend/src`
- Tests: `backend/tests`, `testing/cypress/e2e`
- Quality gate wait: true

---

## 7. Cypress E2E

**Archivo:** `testing/cypress.config.js`

| Parámetro | Valor |
|-----------|-------|
| baseUrl | `CYPRESS_BASE_URL` o localhost:5173 (default script: 5174) |
| specs | `PF-*.cy.js` (11 archivos) |
| timeout | 15–60 s según tipo |
| evidencias | `cypress/evidencias/reports/last-run.json` |

**Scripts root:**

```bash
npm run test:e2e          # cypress run, baseUrl 5174
npm run test:e2e:open       # UI mode
```

---

## 8. JMeter

**Plan:** `testing/metricas/jmeter/prueba_500_requests.jmx`

| Parámetro | Valor |
|-----------|-------|
| Target | `cafe-sostenible-api-production-03ad.up.railway.app` |
| Endpoint | `GET /api/health` |
| Carga | 50 hilos × 10 loops = 500 requests |

---

## 9. Producción Railway

**Documentado en README** (sin `railway.json`):

| Variable | Descripción |
|----------|-------------|
| PORT | Asignado por Railway |
| MYSQL* | Referencias servicio MySQL |
| JWT_SECRET | Secreto producción |
| CORS_ORIGINS | URL Vercel frontend |
| NODE_ENV | production |

**Health check:** `GET /api/health` retorna `ok`, `dbHost`, `railway: true/false`

---

## 10. Producción Vercel

- Root directory: `frontend/`
- Build: `npm run build`
- Env: `VITE_API_URL` → Railway API
- Dominio: `cafe-ia-inky.vercel.app`

---

## 11. Configuraciones no encontradas

| Archivo / elemento | Estado |
|--------------------|--------|
| `railway.json` | No existe |
| `docker-compose.yml` | No existe |
| `.nvmrc` | No existe |
| `engines` en package.json raíz | No definido |
| Evidencias panel Railway (capturas) | Evidencia pendiente de incorporar |
| Evidencias panel Vercel (capturas) | Evidencia pendiente de incorporar |
