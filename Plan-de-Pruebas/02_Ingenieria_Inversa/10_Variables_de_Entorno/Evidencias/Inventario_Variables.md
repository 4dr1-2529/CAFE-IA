# Inventario de Variables de Entorno — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Fuente:** Análisis estático de `process.env`, `import.meta.env`, `.env.example`, CI y despliegue  
**Nota de seguridad:** Este documento **no contiene valores sensibles**.

---

## Resumen

| Categoría | Cantidad |
|-----------|----------|
| **Total variables identificadas** | 38 |
| Backend — runtime obligatorias | 8 |
| Backend — runtime opcionales | 11 |
| Backend — Railway (plataforma) | 3 |
| Backend — scripts/seeds | 7 |
| Frontend — VITE_* | 3 |
| Frontend — Vite built-in | 2 |
| Testing / CI | 4 |
| Infraestructura secrets | 2 |

---

## 1. Backend — Base de datos (MySQL)

| ID | Variable | Descripción | Componente | Obligatoria | Ambiente | Estado |
|----|----------|-------------|------------|-------------|----------|--------|
| VAR-01 | `MYSQLHOST` | Host del servidor MySQL | `database.js`, `server.js`, `migrate.js` | Sí | Dev / Prod | Configurada |
| VAR-02 | `MYSQLPORT` | Puerto MySQL | `database.js`, `server.js` | Sí | Dev / Prod | Configurada |
| VAR-03 | `MYSQLUSER` | Usuario MySQL | `database.js` | Sí | Dev / Prod | Configurada |
| VAR-04 | `MYSQLPASSWORD` | Contraseña MySQL | `database.js` | Sí* | Dev / Prod | Configurada |
| VAR-05 | `MYSQLDATABASE` | Nombre de la base de datos | `database.js`, `migrate.js` | Sí | Dev / Prod | Configurada |
| VAR-06 | `MYSQL_SSL` | Activa TLS en conexión MySQL | `database.js` | No | Prod Railway | Configurada |
| VAR-07 | `MYSQL_SSL_REJECT_UNAUTHORIZED` | Valida certificado SSL MySQL | `database.js` | No | Prod | Configurada |
| VAR-08 | `DB_POOL_MIN` | Conexiones mínimas del pool | `database.js` | No | Todos | Configurada |
| VAR-09 | `DB_POOL_MAX` | Conexiones máximas del pool | `database.js` | No | Todos | Configurada |

\* `MYSQLPASSWORD` puede ser cadena vacía en desarrollo local (XAMPP).

---

## 2. Backend — JWT y seguridad

| ID | Variable | Descripción | Componente | Obligatoria | Ambiente | Estado |
|----|----------|-------------|------------|-------------|----------|--------|
| VAR-10 | `JWT_SECRET` | Secreto firma tokens JWT (min. 32 chars) | `env.js`, `AuthService` | Sí | Todos | Configurada |
| VAR-11 | `JWT_EXPIRES_IN` | Expiración access token | `env.js` | No | Todos | Configurada |
| VAR-12 | `JWT_REFRESH_EXPIRES_IN` | Expiración refresh token | `env.js` | No | Todos | Configurada |
| VAR-13 | `REQUIRE_AUTH` | Exige auth en rutas públicas | `env.js`, `auth.js` | No | Dev/Prod | Configurada |
| VAR-14 | `ALLOW_PUBLIC_REGISTER` | Habilita registro público | `env.js` | No | Dev/Prod | Configurada |
| VAR-15 | `ADMIN_SEED_PASSWORD` | Contraseña admin en seeds | `migrate.js` | No | Dev/seeds | Configurada |

---

## 3. Backend — Servidor y CORS

| ID | Variable | Descripción | Componente | Obligatoria | Ambiente | Estado |
|----|----------|-------------|------------|-------------|----------|--------|
| VAR-16 | `NODE_ENV` | Entorno Node (`development`, `production`, `test`) | `env.js`, `app.js`, `auth.js` | No | Todos | Configurada |
| VAR-17 | `PORT` | Puerto HTTP del API | `env.js`, `server.js` | No | Todos | Configurada |
| VAR-18 | `CORS_ORIGINS` | Lista CSV de orígenes permitidos | `env.js` → `app.js` cors | Sí en prod | Dev/Prod | Configurada |

---

## 4. Backend — Railway (inyectadas por plataforma)

| ID | Variable | Descripción | Componente | Obligatoria | Ambiente | Estado |
|----|----------|-------------|------------|-------------|----------|--------|
| VAR-19 | `RAILWAY_ENVIRONMENT` | Identificador entorno Railway | `database.js`, `server.js` | No | Prod | Configurada (plataforma) |
| VAR-20 | `RAILWAY_SERVICE_NAME` | Nombre servicio Railway | `database.js` | No | Prod | Configurada (plataforma) |
| VAR-21 | `RAILWAY_PROJECT_ID` | ID proyecto Railway | `database.js` | No | Prod | Configurada (plataforma) |

---

## 5. Backend — Scripts y seeds (no runtime API)

| ID | Variable | Descripción | Componente | Obligatoria | Ambiente | Estado |
|----|----------|-------------|------------|-------------|----------|--------|
| VAR-22 | `SEED_PMV2_FORCE` | Fuerza re-seed PMV2 | `migrate.js`, `seed-pmv2.js` | No | Dev | Documentada en código |
| VAR-23 | `SEED_FINAL_FORCE` | Fuerza seed final | `seed-final.js`, `reset-and-seed-final.js` | No | Dev | Documentada en código |
| VAR-24 | `SEED_MULTIUSUARIO_FORCE` | Fuerza seed multiusuario | `seedMultiusuarioPMV2.js` | No | Dev | Documentada en código |
| VAR-25 | `REDISTRIBUIR_TRAZA` | Redistribuye trazabilidad PMV2 | `redistribuirTrazabilidadPMV2.js` | No | Dev | Documentada en código |
| VAR-26 | `PUPPETEER_EXECUTABLE_PATH` | Ruta Chrome para export PNG BD | `exportDbDocPng.js` | No | Dev | No en .env.example |
| VAR-27 | `SKIP_INTEGRATION` | Omite tests integración MySQL | `integration.test.js`, CI | No | Pruebas | Configurada en CI |
| VAR-28 | `VERIFY_*_EMAIL/PASS` | Credenciales script verificación | `verifyReportesScope.js` | No | Dev | No en .env.example |

---

## 6. Frontend — API y build (VITE_*)

| ID | Variable | Descripción | Componente | Obligatoria | Ambiente | Estado |
|----|----------|-------------|------------|-------------|----------|--------|
| VAR-29 | `VITE_API_URL` | URL base backend (sin `/api`) | `api.js`, `vercel.json`, `client.js` | Sí prod | Dev/Prod | Configurada |
| VAR-30 | `VITE_API_BASE_URL` | URL legacy alternativa | `api.js` | No | Dev | Documentada |
| VAR-31 | `VITE_SHOW_DEMO_CREDENTIALS` | Muestra credenciales demo en login | `LoginPage.jsx` | No | Dev/Demo | Configurada |
| VAR-32 | `import.meta.env.DEV` | Flag desarrollo Vite | `api.js` | — | Dev | Built-in |
| VAR-33 | `import.meta.env.PROD` | Flag producción Vite | `api.js` | — | Prod | Built-in |

---

## 7. Testing

| ID | Variable | Descripción | Componente | Obligatoria | Ambiente | Estado |
|----|----------|-------------|------------|-------------|----------|--------|
| VAR-34 | `CYPRESS_BASE_URL` | URL app para E2E | `cypress.config.js`, `package.json` | No | Pruebas | Configurada en scripts |

---

## 8. Infraestructura — CI/CD y secrets

| ID | Variable | Descripción | Componente | Obligatoria | Ambiente | Estado |
|----|----------|-------------|------------|-------------|----------|--------|
| VAR-35 | `SONAR_TOKEN` | Token análisis SonarCloud | `ci.yml` (secret) | Sí job Sonar | CI | Secret GitHub |
| VAR-36 | `GITHUB_TOKEN` | Token acciones GitHub | `ci.yml` (secret) | Sí job Sonar | CI | Secret GitHub |
| VAR-37 | `JWT_SECRET` (CI) | Secreto tests automatizados | `ci.yml` job backend | Sí | CI | Inline CI |
| VAR-38 | `MYSQL*` (CI) | Variables dummy test BD | `ci.yml` job backend | Sí | CI | Inline CI |

---

## Variables legacy NO implementadas

| Variable | Estado |
|----------|--------|
| `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | **Eliminadas** — código exige solo `MYSQL*` |
| `DATABASE_URL` | **No existe** en código |

---

## Clasificación por criticidad

| Crítica | Variables |
|---------|-----------|
| **Alta** | `JWT_SECRET`, `MYSQLPASSWORD`, `MYSQLHOST`, `MYSQLDATABASE`, `CORS_ORIGINS` (prod) |
| **Media** | `VITE_API_URL`, `MYSQL_SSL*`, `ADMIN_SEED_PASSWORD`, `SONAR_TOKEN` |
| **Baja** | Pool, expiración JWT, flags demo, seeds scripts |
