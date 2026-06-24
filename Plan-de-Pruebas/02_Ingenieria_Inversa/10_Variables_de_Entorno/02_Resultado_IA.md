# Paso 10 — Análisis de Variables de Entorno CAFE-IA

**Proyecto:** CAFE-IA (`cafe-cursor`)  
**Fecha:** 24 de junio de 2026  
**Metodología:** Búsqueda estática `process.env` / `import.meta.env` + revisión `.env.example`, CI y despliegue  
**Seguridad:** Ningún valor sensible se documenta en este informe.

---

## 1. Resumen ejecutivo del análisis

Se identificaron **38 variables de entorno** utilizadas en código, configuración o CI. El backend centraliza la carga en `dotenv` con validación estricta de `MYSQL*` y `JWT_SECRET`. El frontend expone únicamente variables `VITE_*` al bundle. Producción opera con variables en **Railway** (backend), **Vercel** (`VITE_API_URL`) y secrets en **GitHub Actions** (`SONAR_TOKEN`).

---

## 2. Backend

### 2.1 dotenv y archivos de entorno

| Elemento | Detalle |
|----------|---------|
| `.env` | Archivo local en `backend/` — **existe pero no se documenta su contenido** |
| `.env.example` | Plantilla versionada con 17 variables documentadas |
| Carga | `dotenv.config({ path: backend/.env, override: false })` |
| Efecto `override: false` | Variables de Railway/CI tienen prioridad sobre archivo local |

### 2.2 Variables MySQL

| Variable | Descripción | Componente | Obligatoria | Ambiente | Estado | Riesgo | Impacto |
|----------|-------------|------------|-------------|----------|--------|--------|---------|
| MYSQLHOST | Host servidor BD | database.js, server.js | Sí | Dev/Prod | Configurada | Medio | Sin ella API no arranca |
| MYSQLPORT | Puerto BD | database.js | Sí | Dev/Prod | Configurada | Bajo | — |
| MYSQLUSER | Usuario BD | database.js | Sí | Dev/Prod | Configurada | Medio | — |
| MYSQLPASSWORD | Contraseña BD | database.js | Sí | Dev/Prod | Configurada | **Alto** | Acceso total BD |
| MYSQLDATABASE | Nombre BD | database.js, migrate.js | Sí | Dev/Prod | Configurada | Medio | — |
| MYSQL_SSL | TLS conexión | database.js | No | Prod | Configurada | Medio | Sin SSL riesgo tránsito |
| MYSQL_SSL_REJECT_UNAUTHORIZED | Valida cert SSL | database.js | No | Prod | Configurada | Medio | MITM teórico |
| DB_POOL_MIN | Pool mínimo | database.js | No | Todos | Configurada | Bajo | — |
| DB_POOL_MAX | Pool máximo | database.js | No | Todos | Configurada | Bajo | Saturación si bajo |

### 2.3 Variables JWT

| Variable | Descripción | Componente | Obligatoria | Ambiente | Estado | Riesgo | Impacto |
|----------|-------------|------------|-------------|----------|--------|--------|---------|
| JWT_SECRET | Secreto firma tokens | env.js | Sí | Todos | Configurada | **Alto** | Compromiso autenticación |
| JWT_EXPIRES_IN | Vida access token | env.js | No | Todos | Configurada | Bajo | Sesiones largas si alto |
| JWT_REFRESH_EXPIRES_IN | Vida refresh token | env.js | No | Todos | Configurada | Bajo | — |

### 2.4 Variables CORS y Express

| Variable | Descripción | Componente | Obligatoria | Ambiente | Estado | Riesgo | Impacto |
|----------|-------------|------------|-------------|----------|--------|--------|---------|
| CORS_ORIGINS | Orígenes CSV permitidos | env.js → app.js | Sí en prod | Dev/Prod | Configurada | Medio | Bloqueo SPA o CORS abierto |
| NODE_ENV | Modo ejecución | env.js, app.js, auth.js | No | Todos | Configurada | Bajo | Afecta rate-limit, CORS dev |
| PORT | Puerto HTTP | env.js, server.js | No | Todos | Configurada | Bajo | 3029 local; Railway auto |

**Express adicional:** `npm_lifecycle_event` detecta tests para desactivar rate-limit (variable interna npm, no configuración usuario).

### 2.5 Variables seguridad / features

| Variable | Descripción | Componente | Obligatoria | Ambiente | Estado | Riesgo | Impacto |
|----------|-------------|------------|-------------|----------|--------|--------|---------|
| REQUIRE_AUTH | Auth estricta rutas | env.js, auth.js | No | Todos | Configurada | Medio | Endpoints públicos si false |
| ALLOW_PUBLIC_REGISTER | Registro abierto | env.js | No | Todos | Configurada | Medio | Altas no controladas |
| ADMIN_SEED_PASSWORD | Pass admin en seeds | migrate.js | No | Dev | Configurada | **Alto** | Solo desarrollo |

### 2.6 Variables Railway

| Variable | Descripción | Componente | Obligatoria | Ambiente | Estado | Riesgo | Impacto |
|----------|-------------|------------|-------------|----------|--------|--------|---------|
| RAILWAY_ENVIRONMENT | Entorno Railway | database.js, server.js | No | Prod | Plataforma | Bajo | Activa SSL auto |
| RAILWAY_SERVICE_NAME | Servicio Railway | database.js | No | Prod | Plataforma | Bajo | Flag railway |
| RAILWAY_PROJECT_ID | Proyecto Railway | database.js | No | Prod | Plataforma | Bajo | Flag railway |

**Documentación Railway (README):** MYSQL*, JWT_SECRET, CORS_ORIGINS, PORT — configuradas en panel. **No existe `railway.json` en repo.**

### 2.7 Variables scripts (no runtime API)

| Variable | Componente | Ambiente | En .env.example |
|----------|------------|----------|-----------------|
| SEED_PMV2_FORCE | seed-pmv2.js | Dev | No |
| SEED_FINAL_FORCE | reset-and-seed-final.js | Dev | No |
| SEED_MULTIUSUARIO_FORCE | seedMultiusuarioPMV2.js | Dev | No |
| REDISTRIBUIR_TRAZA | redistribuirTrazabilidadPMV2.js | Dev | No |
| PUPPETEER_EXECUTABLE_PATH | exportDbDocPng.js | Dev | No |
| VERIFY_CLIENTE_EMAIL/PASS | verifyReportesScope.js | Dev | No |
| VERIFY_ADMIN_EMAIL/PASS | verifyReportesScope.js | Dev | No |

---

## 3. Frontend

### 3.1 Variables VITE_

| Variable | Descripción | Componente | Obligatoria | Ambiente | Estado | Riesgo | Impacto |
|----------|-------------|------------|-------------|----------|--------|--------|---------|
| VITE_API_URL | URL backend | api.js, client.js | Sí prod | Dev/Prod | Configurada | Medio | SPA sin API |
| VITE_API_BASE_URL | URL legacy | api.js | No | Dev | Legacy | Bajo | — |
| VITE_SHOW_DEMO_CREDENTIALS | Credenciales en login | LoginPage.jsx | No | Todos | Configurada | Medio | Filtración credenciales demo |

### 3.2 Vite built-in

| Variable | Uso | Ambiente |
|----------|-----|----------|
| import.meta.env.DEV | Proxy /api local | Desarrollo |
| import.meta.env.PROD | URL absoluta API | Producción |

### 3.3 Vercel

| Variable | Ubicación | Función |
|----------|-----------|---------|
| VITE_API_URL | vercel.json `env` y `build.env` | Inyección en build SPA |

### 3.4 Configuración API y build

- **Dev:** proxy Vite `/api` → puerto 3029; `VITE_API_URL` opcional
- **Prod:** `VITE_API_URL` en Vercel; fallback Railway en `api.js`
- **Build:** `envPrefix: ['VITE_']` — sin leakage MYSQL/JWT (corregido SonarCloud)

---

## 4. Producción

### 4.1 Railway (backend)

Variables documentadas en README (panel Railway):

| Variable | Función | Obligatoria prod |
|----------|---------|------------------|
| MYSQLHOST/PORT/USER/PASSWORD/DATABASE | Conexión BD | Sí |
| JWT_SECRET | Tokens | Sí |
| CORS_ORIGINS | Origen Vercel | Sí |
| NODE_ENV | production | Sí |
| PORT | Asignado plataforma | Auto |

Variables auto: `RAILWAY_*`

### 4.2 Vercel (frontend)

| Variable | Función |
|----------|---------|
| VITE_API_URL | URL API Railway en build |

### 4.3 GitHub Actions

| Variable | Job | Tipo |
|----------|-----|------|
| SKIP_INTEGRATION=1 | backend | Env inline |
| NODE_ENV=test | backend | Env inline |
| JWT_SECRET | backend | Env inline (test) |
| MYSQL* | backend | Env inline (dummy) |
| SONAR_TOKEN | sonarcloud | Secret |
| GITHUB_TOKEN | sonarcloud | Secret |

### 4.4 SonarCloud

| Variable | Función |
|----------|---------|
| SONAR_TOKEN | Autenticación análisis CI |

Propiedades proyecto en `sonar-project.properties` (no env): `sonar.organization`, `sonar.projectKey`.

---

## 5. Testing

| Variable | Descripción | Componente | Ambiente | Estado |
|----------|-------------|------------|----------|--------|
| CYPRESS_BASE_URL | URL app E2E | cypress.config.js, package.json | Pruebas | Configurada (scripts) |
| SKIP_INTEGRATION | Omite tests BD | integration.test.js, CI | Pruebas | Configurada |

---

## 6. Variables requeridas no implementadas / eliminadas

| Variable | Estado |
|----------|--------|
| DB_HOST, DB_USER, DB_PASSWORD, DB_NAME | **Eliminadas** — mensaje error indica usar MYSQL* |
| DATABASE_URL | **No existe** |
| railway.json | **No existe** — config manual panel |

---

## 7. Matriz de riesgos consolidada

| Nivel | Variables |
|-------|-----------|
| **Alto** | JWT_SECRET, MYSQLPASSWORD, ADMIN_SEED_PASSWORD |
| **Medio** | CORS_ORIGINS, MYSQL_SSL*, VITE_SHOW_DEMO_CREDENTIALS, VERIFY_* defaults |
| **Bajo** | Resto |

---

## 8. Referencias

- `Evidencias/Inventario_Variables.md` — inventario completo
- `Evidencias/Matriz_Variables.md` — matriz con recomendaciones
- `Evidencias/Configuracion_Backend.md`, `Configuracion_Frontend.md`
- Paso 09: Reconstrucción del Entorno
