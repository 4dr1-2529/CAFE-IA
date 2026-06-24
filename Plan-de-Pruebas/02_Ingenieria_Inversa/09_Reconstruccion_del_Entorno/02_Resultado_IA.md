# Paso 9 — Reconstrucción del Entorno CAFE-IA

**Proyecto:** CAFE-IA (`cafe-cursor`) — monorepo full-stack  
**Fecha:** 24 de junio de 2026  
**Metodología:** Ingeniería inversa sobre configuraciones, scripts y documentación del repositorio

---

## 1. Visión general del entorno

CAFE-IA opera en tres capas de entorno:

| Entorno | Descripción |
|---------|-------------|
| **Desarrollo local** | Node.js + Vite (5174) + Express (3029) + MySQL vía XAMPP |
| **Integración continua** | GitHub Actions (Ubuntu, Node 20) + SonarCloud |
| **Producción** | Railway (API + MySQL) + Vercel (SPA React) |

URLs producción verificadas en README y evidencias Paso 01:

- API: `https://cafe-sostenible-api-production-03ad.up.railway.app`
- Frontend: `https://cafe-ia-inky.vercel.app`
- Health: `GET /api/health`

---

## 2. Entorno de desarrollo

### 2.1 Sistema operativo

| Componente | Detalle | Estado |
|------------|---------|--------|
| SO soportado | Windows, Linux, macOS (README) | Documentado |
| SO evidencia workspace | Windows 10 (build 19045) | Evidencia sesión |
| XAMPP | Referenciado en `backend/.env.example` para MySQL local Windows | Documentado |

### 2.2 Node.js y npm

| Componente | Versión | Configuración | Dependencias | Estado | Riesgos |
|------------|---------|---------------|--------------|--------|---------|
| Node.js | 18+ doc; **20 en CI** | `ci.yml` node-version: '20' | Backend ESM, frontend Vite | Implementado | Sin `engines` fijado en package.json raíz |
| npm | 9+ | `npm run install:all` | 3 package.json (root, backend, frontend) | Implementado | Lockfiles no versionados en evidencias |

### 2.3 Git y IDE

| Componente | Función | Estado |
|------------|---------|--------|
| Git | Control versiones; repo `github.com/4dr1-2529/CAFE-IA` | Implementado |
| VS Code / Cursor | IDE de desarrollo | Documentado (sin `.vscode` obligatorio) |

### 2.4 MySQL y XAMPP

| Componente | Función | Configuración | Estado | Riesgos |
|------------|---------|---------------|--------|---------|
| MySQL 8 | BD relacional | `MYSQLHOST=127.0.0.1`, DB `cafe_sostenible` | Implementado | Versión XAMPP no fijada en repo |
| XAMPP | Stack MySQL local Windows | Comentario en `.env.example` | Documentado | Solo Windows |

### 2.5 Variables de entorno (desarrollo)

Ver `backend/.env.example` y `frontend/.env.example` (copiados en Evidencias). Variables críticas:

- Backend: `MYSQL*`, `JWT_SECRET` (min 32), `PORT=3029`, `CORS_ORIGINS`
- Frontend: `VITE_API_URL`, `VITE_SHOW_DEMO_CREDENTIALS`

---

## 3. Frontend

### 3.1 Stack

| Componente | Versión | Función | Configuración | Estado | Riesgos |
|------------|---------|---------|---------------|--------|---------|
| React | ^18.2.0 | UI SPA | `frontend/src/` | Implementado | — |
| Vite | ^5.0.8 | Dev server y build | `vite.config.js` puerto 5174 | Implementado | — |
| TailwindCSS | ^3.3.6 | Estilos utility-first | `tailwind.config.js` | Implementado | — |
| React Router | ^6.20.0 | Navegación | Rutas en `App.jsx` | Implementado | — |
| Recharts | ^2.10.3 | Gráficos dashboard | — | Implementado | Bundle size |
| lucide-react | ^0.294.0 | Iconos | — | Implementado | — |

### 3.2 Configuración Vite

- **Proxy dev:** `/api` → `http://127.0.0.1:3029`
- **envPrefix:** solo `VITE_*` (no expone secretos servidor)
- **Build:** code splitting vendor/charts/icons
- **Script:** `npm run dev` → puerto 5174

### 3.3 Comunicación API

`frontend/src/config/api.js`:

- Dev: proxy `/api`
- Prod: `VITE_API_URL` o fallback Railway hardcoded
- Descargas PDF/Excel: `getApiOrigin()` según entorno

### 3.4 Dependencias dev

ESLint 8, Prettier 3, PostCSS, Autoprefixer, `@vitejs/plugin-react`

---

## 4. Backend

### 4.1 Stack

| Componente | Versión | Función | Estado | Riesgos |
|------------|---------|---------|--------|---------|
| Express | ^4.18.2 | HTTP API REST | Implementado | — |
| jsonwebtoken | ^9.0.2 | JWT access + refresh | Implementado | Secreto en env |
| mysql2 | ^3.9.2 | Pool MySQL | Implementado | SSL Railway |
| bcryptjs | ^2.4.3 | Hash passwords | Implementado | — |
| dotenv | ^16.4.5 | Carga `.env` local | Implementado | override: false en prod |
| cors | ^2.8.5 | CORS dinámico | Implementado | Regex vercel.app amplia |
| helmet | ^7.2.0 | Security headers | Implementado | — |
| express-rate-limit | ^7.5.1 | 500/15min | Implementado | Deshabilitado en test |
| pdfkit / exceljs | Reportes export | Implementado | — |

### 4.2 Middleware (orden en `app.js`)

1. `helmet`
2. `rateLimit` (excepto test)
3. `cors` (orígenes + `*.vercel.app` + LAN dev)
4. `express.json` (2 MB)
5. Rutas health
6. `auditMiddleware` + `/api` router
7. 404 / error handler

### 4.3 Configuración y arranque

- **Entry:** `backend/server.js`
- **Puerto:** `PORT` env o 3029; Railway asigna automáticamente
- **Host:** `0.0.0.0`
- **Init BD:** `migrate.js` al start
- **JWT:** 8h access, 7d refresh; secreto min 32 chars

### 4.4 Variables backend

| Variable | Función | Obligatoria prod |
|----------|---------|------------------|
| MYSQLHOST/PORT/USER/PASSWORD/DATABASE | Conexión | Sí |
| JWT_SECRET | Firma tokens | Sí |
| CORS_ORIGINS | Orígenes SPA | Sí |
| NODE_ENV | Entorno | Sí |
| PORT | HTTP | Railway auto |
| MYSQL_SSL | TLS MySQL | Railway auto |
| DB_POOL_MIN/MAX | Pool | Opcional |

---

## 5. Base de datos

| Aspecto | Detalle | Estado |
|---------|---------|--------|
| Motor | MySQL 8+ | Implementado |
| Driver | mysql2 pool (2–10) | Implementado |
| Schema | `schema.sql` — 39 tablas | Implementado |
| Migraciones | `migrations/001`–`005` | Implementado |
| Seeds | `seeds.sql`, scripts npm `db:seed*` | Implementado |
| Inicialización | Automática en `server.js` → `initDatabase()` | Implementado |
| Conexión | Solo prefijo `MYSQL*` (sin `DB_HOST` legacy) | Implementado |
| SSL | Auto en Railway (`RAILWAY_ENVIRONMENT`) | Implementado |
| Relaciones | FK en schema; 39 tablas relacionadas | Documentado |

**Local:** XAMPP MySQL → `cafe_sostenible`  
**Producción:** Railway MySQL service vinculado por referencias `${{MySQL.*}}`

---

## 6. Infraestructura

### 6.1 Railway

| Aspecto | Detalle | Estado | Riesgos |
|---------|---------|--------|---------|
| Función | API Express + MySQL | Activo | Sin `railway.json` en repo |
| Configuración | Panel Railway + variables env | Implementado | Config manual |
| Detección | `RAILWAY_ENVIRONMENT` en código | Implementado | — |
| Puerto | `PORT` asignado por plataforma | Implementado | — |
| URL | `cafe-sostenible-api-production-03ad.up.railway.app` | Activo | — |

**Nota:** `railway.json` **no existe** en el repositorio.

### 6.2 Vercel

| Aspecto | Detalle | Estado |
|---------|---------|--------|
| Función | Hosting SPA Vite | Activo |
| Config | `frontend/vercel.json` | Implementado |
| Root | `frontend/` | Implementado |
| Env build | `VITE_API_URL` → Railway | Implementado |
| URL | `cafe-ia-inky.vercel.app` | Activo |
| SPA | Rewrites `/*` → index.html | Implementado |

### 6.3 GitHub

| Aspecto | Detalle | Estado |
|---------|---------|--------|
| Repositorio | `4dr1-2529/CAFE-IA` | Activo |
| CI | `.github/workflows/ci.yml` | Implementado |
| Jobs | backend, frontend, sonarcloud, dependency-audit | Activo |
| Node CI | 20 | Implementado |
| Triggers | push/PR main, master, develop | Implementado |

### 6.4 SonarCloud

| Aspecto | Detalle | Estado |
|---------|---------|--------|
| Org | `4dr1-2529` | Configurado |
| Project | `4dr1-2529_CAFE-IA` | Configurado |
| Fuentes | frontend/src, backend/src | Implementado |
| Quality gate | wait=true en CI | Implementado |
| Token | `SONAR_TOKEN` secret | Implementado |

### 6.5 Cypress

| Aspecto | Detalle | Estado | Riesgos |
|---------|---------|--------|---------|
| Versión | ^13.17.0 (root devDep) | Implementado | — |
| Config | `testing/cypress.config.js` | Implementado | — |
| Specs | 11 archivos PF-01 a PF-11 | Implementado | No en CI |
| baseUrl | localhost:5174 (scripts npm) | Implementado | Requiere stack local |
| Evidencias | `last-run.json` auto-generado | Implementado | — |

### 6.6 JMeter

| Aspecto | Detalle | Estado |
|---------|---------|--------|
| Versión | 5.6+ (README) | Documentado |
| Plan | `prueba_500_requests.jmx` | Implementado |
| Target | Railway `/api/health` | Implementado |
| Carga | 500 requests (50×10) | Documentado |
| Resultados | `resultado_jmeter.csv`, `jmeter_resumen.json` | Evidencia copiada |

### 6.7 Render (alternativa)

`render.yaml` define servicio web Node con variables MYSQL* — **alternativa documentada**, no producción principal según README.

---

## 7. Servicios externos

| Servicio | Función | Autenticación | Comunicación | Estado |
|----------|---------|---------------|--------------|--------|
| Railway API | Backend REST producción | JWT Bearer cliente | HTTPS JSON | Activo |
| SonarCloud | Análisis código | SONAR_TOKEN en CI | HTTPS API | Activo |

**No identificados:** OAuth externos, APIs de pago, servicios email/SMS, CDN propio.

### Flujo de comunicación producción

```text
Navegador → Vercel (HTTPS) → React SPA
SPA → Railway API (HTTPS + Authorization: Bearer JWT)
API → MySQL Railway (mysql2 pool, SSL)
```

---

## 8. Scripts monorepo (root `package.json`)

| Script | Función |
|--------|---------|
| `install:all` | Instala backend + frontend |
| `backend` / `dev` | Inicia API |
| `frontend` | Vite dev |
| `test` | Tests backend |
| `build` | Build frontend |
| `test:e2e` | Cypress run |
| `db:seed*` | Seeds MySQL |
| `metricas` | Generador métricas |

---

## 9. Diagramas

Ver `Evidencias/`:

- `Diagrama_Entorno` — desarrollo local
- `Diagrama_Infraestructura` — GitHub, Railway, Vercel, QA
- `Diagrama_Despliegue` — CI → producción
- `Diagrama_Cliente_Servidor` — secuencia JWT
- `Diagrama_Comunicacion` — capas red/servidor/datos

---

## 10. Configuraciones no encontradas

| Elemento | Estado |
|----------|--------|
| `railway.json` | No existe |
| `docker-compose.yml` | No existe |
| `.nvmrc` | No existe |
| `engines` en package.json | No definido |
| PM2 / Nginx config | No en repo |
| Capturas paneles Railway/Vercel | Evidencia pendiente de incorporar |

---

## 11. Referencias

- `README.md` — guía instalación y despliegue
- `backend/.env.example`, `frontend/.env.example`
- `frontend/vercel.json`, `render.yaml`
- `.github/workflows/ci.yml`, `sonar-project.properties`
- Paso 01: health Railway, Cypress, Sonar evidencias
