# Inventario del Entorno — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Fuente:** `cafe-cursor/` (monorepo)

---

## Resumen por categoría

| Categoría | Cantidad |
|-----------|----------|
| Herramientas de desarrollo | 8 |
| Herramientas de despliegue | 4 |
| Herramientas de calidad | 5 |
| Infraestructura cloud | 3 |
| Servicios externos | 2 |
| Variables de entorno (backend) | 15 |
| Variables de entorno (frontend) | 3 |
| Bases de datos | 1 motor (2 instancias) |

---

## 1. Herramientas de desarrollo

| ID | Herramienta | Versión / detalle | Función | Estado |
|----|-------------|-------------------|---------|--------|
| DEV-01 | Sistema operativo | Windows 10 (evidencia workspace); README multi-OS | Plataforma de desarrollo | Documentado |
| DEV-02 | Node.js | 18+ doc; **20 en CI** (`.github/workflows/ci.yml`) | Runtime backend y build frontend | Implementado |
| DEV-03 | npm | 9+ (README) | Gestión dependencias monorepo | Implementado |
| DEV-04 | Git | — | Control de versiones; repo `4dr1-2529/CAFE-IA` | Implementado |
| DEV-05 | VS Code / Cursor | — | IDE (no config `.vscode` obligatoria en repo) | Uso documentado |
| DEV-06 | MySQL | 8+ | BD relacional | Implementado |
| DEV-07 | XAMPP | Referenciado en `.env.example` | MySQL local en Windows | Documentado |
| DEV-08 | Python | 3.10+ opcional (`ml/`) | Scripts ML offline | Opcional |

---

## 2. Frontend

| ID | Componente | Versión | Configuración | Estado |
|----|------------|---------|---------------|--------|
| FE-01 | React | ^18.2.0 | `frontend/package.json` | Implementado |
| FE-02 | Vite | ^5.0.8 | `vite.config.js` puerto 5174, proxy `/api` → 3029 | Implementado |
| FE-03 | TailwindCSS | ^3.3.6 | `tailwind.config.js`, `postcss.config.js` | Implementado |
| FE-04 | React Router | ^6.20.0 | SPA routing | Implementado |
| FE-05 | Recharts | ^2.10.3 | Gráficos dashboard | Implementado |
| FE-06 | ESLint + Prettier | ^8.57 / ^3.2 | `npm run lint`, `format` | Implementado |
| FE-07 | lucide-react | ^0.294.0 | Iconografía | Implementado |

---

## 3. Backend

| ID | Componente | Versión | Configuración | Estado |
|----|------------|---------|---------------|--------|
| BE-01 | Express | ^4.18.2 | `server.js`, `src/app.js` | Implementado |
| BE-02 | jsonwebtoken | ^9.0.2 | JWT 8h + refresh 7d | Implementado |
| BE-03 | mysql2 | ^3.9.2 | Pool min 2 max 10, SSL en Railway | Implementado |
| BE-04 | bcryptjs | ^2.4.3 | Hash contraseñas | Implementado |
| BE-05 | helmet | ^7.2.0 | Headers seguridad | Implementado |
| BE-06 | express-rate-limit | ^7.5.1 | 500 req/15 min | Implementado |
| BE-07 | cors | ^2.8.5 | Orígenes + `*.vercel.app` | Implementado |
| BE-08 | dotenv | ^16.4.5 | `backend/.env` sin override Railway | Implementado |
| BE-09 | pdfkit / exceljs | ^0.15 / ^4.4 | Export reportes | Implementado |

### Middleware identificado

`helmet` → `rateLimit` → `cors` → `express.json` → `auditMiddleware` → rutas `/api` → `authMiddleware` / `rbac` por ruta.

---

## 4. Base de datos

| ID | Elemento | Detalle | Estado |
|----|----------|---------|--------|
| DB-01 | Motor | MySQL 8 | Implementado |
| DB-02 | Local | `127.0.0.1:3306` / `cafe_sostenible` (XAMPP) | Documentado |
| DB-03 | Producción | Railway MySQL (`railway` DB típica) | Implementado |
| DB-04 | Schema | `backend/sql/schema.sql` (39 tablas) | Implementado |
| DB-05 | Migraciones | `backend/sql/migrations/001–005` | Implementado |
| DB-06 | Seeds | `seeds.sql`, scripts `db:seed*` | Implementado |
| DB-07 | Inicialización | `migrate.js` al arranque `server.js` | Implementado |
| DB-08 | Conexión | Solo variables `MYSQL*` (`database.js`) | Implementado |

---

## 5. Infraestructura y despliegue

| ID | Plataforma | Función | Configuración | Estado |
|----|------------|---------|---------------|--------|
| INF-01 | **Railway** | API backend + MySQL producción | Variables panel; `RAILWAY_ENVIRONMENT` detectado en código | Implementado |
| INF-02 | **Vercel** | Hosting SPA | `frontend/vercel.json`, root `frontend/` | Implementado |
| INF-03 | **GitHub** | Repositorio + CI | `.github/workflows/ci.yml` | Implementado |
| INF-04 | **SonarCloud** | Análisis estático | `sonar-project.properties`, org `4dr1-2529` | Implementado |
| INF-05 | **Render.com** | Alternativa despliegue | `render.yaml` (no es producción activa documentada) | Alternativa |
| INF-06 | **railway.json** | — | **No existe en repositorio** | No implementado |

### URLs producción (README)

| Servicio | URL |
|----------|-----|
| API Railway | `https://cafe-sostenible-api-production-03ad.up.railway.app` |
| Frontend Vercel | `https://cafe-ia-inky.vercel.app` |
| Health | `/api/health` |

---

## 6. Herramientas de calidad y pruebas

| ID | Herramienta | Detalle | Estado |
|----|-------------|---------|--------|
| QA-01 | Cypress | 13.17.0; 11 specs `PF-01`–`PF-11` | Implementado |
| QA-02 | JMeter | 5.6+; `prueba_500_requests.jmx` → `/api/health` | Implementado |
| QA-03 | SonarCloud | Quality gate en CI | Implementado |
| QA-04 | npm audit | Job CI `dependency-audit` | Implementado |
| QA-05 | Node test runner | `backend/tests/**/*.test.js` | Implementado |
| QA-06 | supertest | ^6.3.4 integración API | Implementado |

---

## 7. Variables de entorno

### Backend (`backend/.env.example`)

| Variable | Función | Obligatoria |
|----------|---------|-------------|
| `NODE_ENV` | Entorno | Sí |
| `PORT` | Puerto HTTP (3029 local; Railway asigna) | Sí |
| `MYSQLHOST` | Host MySQL | Sí |
| `MYSQLPORT` | Puerto MySQL | Sí |
| `MYSQLUSER` | Usuario MySQL | Sí |
| `MYSQLPASSWORD` | Contraseña MySQL | Sí |
| `MYSQLDATABASE` | Nombre BD | Sí |
| `MYSQL_SSL` | SSL conexión | Prod Railway |
| `MYSQL_SSL_REJECT_UNAUTHORIZED` | Validación cert | Prod |
| `DB_POOL_MIN` / `DB_POOL_MAX` | Pool mysql2 | Opcional |
| `JWT_SECRET` | Firma JWT (min 32 chars) | Sí |
| `JWT_EXPIRES_IN` | Expiración access | Opcional |
| `JWT_REFRESH_EXPIRES_IN` | Expiración refresh | Opcional |
| `CORS_ORIGINS` | Orígenes permitidos | Sí en prod |
| `ADMIN_SEED_PASSWORD` | Seed admin | Dev/seeds |
| `REQUIRE_AUTH` | Flag auth global | Opcional |
| `ALLOW_PUBLIC_REGISTER` | Registro público | Opcional |

### Frontend (`frontend/.env.example`)

| Variable | Función |
|----------|---------|
| `VITE_API_URL` | URL backend Railway/local |
| `VITE_API_BASE_URL` | Legacy opcional |
| `VITE_SHOW_DEMO_CREDENTIALS` | Mostrar credenciales demo |

---

## 8. Servicios externos

| ID | Servicio | Comunicación | Autenticación |
|----|----------|--------------|---------------|
| EXT-01 | Railway API | HTTPS REST JSON | JWT cliente → API |
| EXT-02 | SonarCloud API | CI GitHub Action | `SONAR_TOKEN` secret |

**No identificados:** APIs de terceros de pago, OAuth externo, servicios de email/SMS.

---

## 9. Archivos de configuración clave

| Archivo | Rol |
|---------|-----|
| `package.json` (root) | Scripts monorepo, Cypress |
| `backend/package.json` | Dependencias API |
| `frontend/package.json` | Dependencias SPA |
| `backend/.env.example` | Plantilla entorno backend |
| `frontend/.env.example` | Plantilla entorno frontend |
| `frontend/vercel.json` | Deploy Vercel + `VITE_API_URL` |
| `render.yaml` | Blueprint Render alternativo |
| `sonar-project.properties` | SonarCloud |
| `.github/workflows/ci.yml` | Pipeline CI |
| `vite.config.js` | Dev server + proxy |
| `testing/cypress.config.js` | E2E baseUrl 5174 |
