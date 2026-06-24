# Configuración Backend — Variables de Entorno

**Proyecto:** CAFE-IA | **Fecha:** 24 de junio de 2026

---

## 1. Carga de variables (dotenv)

| Aspecto | Detalle |
|---------|---------|
| Librería | `dotenv` ^16.4.5 |
| Archivo | `backend/.env` (local, no versionado) |
| Plantilla | `backend/.env.example` |
| Función | `loadEnv()` en `backend/src/config/database.js` |
| Comportamiento | `override: false` — **no sobrescribe** variables ya definidas (Railway, CI) |
| Ruta | `path.join(__dirname, '../../.env')` relativo a `src/config/` |

---

## 2. Validación al arranque

### MySQL (`assertMysqlEnv` en `database.js`)

Variables obligatorias verificadas antes de crear pool:

- `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD` (puede ser `undefined` check), `MYSQLDATABASE`

Error explícito si faltan, con mensaje orientado a Railway o copia de `.env.example`.

### JWT (`resolveJwtSecret` en `env.js`)

- `JWT_SECRET` obligatorio
- Longitud mínima: **32 caracteres**
- Falla al iniciar si ausente o corto

### CORS (`parseCorsOrigins` en `env.js`)

- En `NODE_ENV=production`: `CORS_ORIGINS` **obligatorio**
- En desarrollo: fallback `localhost:5174` y `127.0.0.1:5174`

---

## 3. Variables por categoría

### Base de datos

| Variable | Default si omitida | Uso |
|----------|-------------------|-----|
| MYSQLHOST | — | Host conexión |
| MYSQLPORT | — | Puerto numérico |
| MYSQLUSER | — | Usuario |
| MYSQLPASSWORD | — | Contraseña |
| MYSQLDATABASE | — | Nombre BD |
| MYSQL_SSL | false (salvo Railway) | TLS |
| MYSQL_SSL_REJECT_UNAUTHORIZED | true si SSL | Validación cert |
| DB_POOL_MIN | 2 | Pool mínimo |
| DB_POOL_MAX | 10 | Pool máximo |

**SSL automático:** si `RAILWAY_ENVIRONMENT` o `MYSQL_SSL=true`.

### JWT

| Variable | Default | Uso |
|----------|---------|-----|
| JWT_SECRET | — (obligatorio) | Firma HMAC tokens |
| JWT_EXPIRES_IN | `8h` | Access token |
| JWT_REFRESH_EXPIRES_IN | `7d` | Refresh token |

### Servidor

| Variable | Default | Uso |
|----------|---------|-----|
| NODE_ENV | `development` | Modo Express, rate-limit, CORS dev |
| PORT | `3029` | Puerto HTTP (`0.0.0.0`) |

### Seguridad / feature flags

| Variable | Default | Uso |
|----------|---------|-----|
| REQUIRE_AUTH | `false` | Middleware auth estricto |
| ALLOW_PUBLIC_REGISTER | `false` | Endpoint registro público |
| CORS_ORIGINS | dev localhost | Orígenes SPA permitidos |
| ADMIN_SEED_PASSWORD | — | Solo migración/seeds |

### Railway (plataforma)

Detectadas en `database.js` y `server.js`:

- `RAILWAY_ENVIRONMENT`, `RAILWAY_SERVICE_NAME`, `RAILWAY_PROJECT_ID`
- Activan flag `railway: true` y SSL en configuración MySQL

---

## 4. Express y middleware

Variables que afectan `app.js`:

| Variable | Efecto |
|----------|--------|
| `NODE_ENV=test` | Desactiva rate-limit |
| `npm_lifecycle_event=test` | Desactiva rate-limit |
| `env.corsOrigins` | Lista CORS + regex `*.vercel.app` en prod |
| `env.nodeEnv !== 'production'` | Orígenes dev adicionales y LAN |

---

## 5. Variables en CI (GitHub Actions)

Job `backend` define inline (sin archivo `.env`):

| Variable | Propósito |
|----------|-----------|
| SKIP_INTEGRATION | `1` — omite tests que requieren MySQL real |
| NODE_ENV | `test` |
| JWT_SECRET | Secreto dedicado CI (≥32 chars) |
| MYSQLHOST/PORT/USER/PASSWORD/DATABASE | Valores dummy para tests unitarios |

---

## 6. Variables de scripts (no API)

No cargadas en flujo normal del servidor; usadas en `backend/scripts/`:

| Variable | Script |
|----------|--------|
| SEED_PMV2_FORCE | seed PMV2 |
| SEED_FINAL_FORCE | reset-and-seed-final |
| SEED_MULTIUSUARIO_FORCE | seedMultiusuarioPMV2 |
| REDISTRIBUIR_TRAZA | redistribuirTrazabilidadPMV2 |
| PUPPETEER_EXECUTABLE_PATH | exportDbDocPng |
| VERIFY_CLIENTE_EMAIL/PASS | verifyReportesScope |
| VERIFY_ADMIN_EMAIL/PASS | verifyReportesScope |

**Nota:** `VERIFY_*` tiene defaults hardcoded en script — riesgo si se ejecuta en entorno compartido.

---

## 7. Logging y exposición

`logMysqlEnvForRailway()` imprime en consola:

- `MYSQLHOST`, `MYSQLUSER`, `MYSQLPORT`, `MYSQLDATABASE`
- **No imprime** `MYSQLPASSWORD` ni `JWT_SECRET`

`/api/health` expone: `dbHost`, `database` (nombre), `railway` boolean — sin credenciales.

---

## 8. Archivo `.env` real

Existe `backend/.env` en workspace de desarrollo — **no copiado a evidencias** por contener secretos potenciales.

Plantilla segura: `backend_env.example` en carpeta Evidencias.
