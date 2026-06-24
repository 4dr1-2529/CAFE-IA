# 02 — Resultado IA: Análisis Técnico de Logs

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Fecha:** 2026-06-24  
**Rol:** Ingeniero Senior · Arquitecto · DevOps · Ingeniería Inversa · Auditor Técnico  
**Restricción:** Sin modificación del código fuente CAFE-IA

---

## 1. Alcance y metodología

Se analizaron registros de ejecución provenientes de:

- Ejecución local: `npm test`, `npm run build`, `npm audit`, `npm run lint`
- Producción: Railway (`/api/health`), Vercel (SPA)
- Evidencias archivadas: JMeter, Cypress, SonarCloud, métricas
- Documentación técnica: `Reporte-Calidad-Software/`
- Logs históricos: crash loop Railway por `migrate.js`

**Nota sobre Prisma:** El proyecto **no utiliza Prisma**. La persistencia es `mysql2` + SQL en `backend/sql/` y repositorios. No existen logs de Prisma.

---

## 2. Análisis por componente

### 2.1 Backend (Node.js 20+ / Express 4)

| Indicador | Resultado | Evidencia |
|-----------|-----------|-----------|
| Tests automatizados | **18/18 OK** | `Evidencias/npm_test_backend.txt` |
| Suites | health, integration, api.errors, validators, prediction, calidad | — |
| Arranque | `server.js` → `initDatabase()` → `migrate.js` | `backend/server.js` |
| Logs MySQL al iniciar | `MYSQLHOST=`, `MYSQLUSER=`, `MYSQLPORT=`, `MYSQLDATABASE=` | npm_test_backend.txt |
| Migración roles | `Migración: roles ADMIN/CLIENTE aplicada` | npm_test_backend.txt |
| Login integración | admin@cafeai.com OK | integration test suite |
| Auth sin token | POST /lotes → **401** | api.errors.test.js |

**Errores históricos (Railway):**

```
SyntaxError: Unexpected identifier 'VALUES'
file:///app/src/infrastructure/database/migrate.js:156
```

**Causa:** Múltiples `INSERT` SQL concatenados en un solo `.catch()` durante refactor SonarCloud.  
**Estado actual:** Corregido — tests y health Railway operativos.

**Advertencias runtime:**

```
[seed] ADMIN_SEED_PASSWORD no definido; se omite usuario admin inicial.
```

---

### 2.2 Frontend (React 18 / Vite 5 / Tailwind 3)

| Indicador | Resultado | Evidencia |
|-----------|-----------|-----------|
| Build producción | **OK** — 2238 módulos, 28.3 s | `npm_build_frontend.txt` |
| Bundle principal | vendor 164 KB, charts 411 KB gzip 110 KB | npm_build_frontend.txt |
| Lint ESLint | **FALLA** — 2 errores, 187 warnings | `npm_lint_frontend.txt` |
| Vercel producción | HTTP **200** | `vercel_status.json` |

**Errores ESLint críticos:**

1. `ErrorBoundary.jsx:47` — `'process' is not defined` (no-undef)
2. `AuditoriaPage.jsx:65` — regla `react-hooks/exhaustive-deps` no encontrada

---

### 2.3 Build

| Aspecto | Estado |
|---------|--------|
| `vite build` | Exit code 0 |
| Lazy loading páginas | Chunks separados por ruta |
| Fuentes Inter | Múltiples woff2 (peso elevado en assets) |
| Advertencia npm | Nueva versión npm 11.17.0 disponible |

---

### 2.4 Railway (API + despliegue)

| Aspecto | Estado |
|---------|--------|
| Health check | HTTP 200 |
| Revisión | `mysql-hexagonal-v2.6.1-usuarios-limit` |
| Puerto | 8080 |
| Base datos | `railway` |
| Host interno | `mysql.railway.internal` |
| Node (histórico) | v22.22.3 |

**Respuesta health (2026-06-24):**

```json
{
  "ok": true,
  "revision": "mysql-hexagonal-v2.6.1-usuarios-limit",
  "port": 8080,
  "database": "railway",
  "dbHost": "mysql.railway.internal",
  "railway": true
}
```

**Incidente histórico:** Crash loop por SyntaxError — **resuelto** post-commit `2f7ac27`.

**Advertencia npm en deploy:** `npm warn config production Use --omit=dev instead`

---

### 2.5 Vercel (Frontend SPA)

| Aspecto | Estado |
|---------|--------|
| URL | https://cafe-ia-inky.vercel.app |
| HTTP Status | 200 |
| API configurada | `VITE_API_URL` → Railway en `vercel.json` |

**Evidencia pendiente:** captura panel Vercel build log — ver `INDICE_EVIDENCIAS.md`.

---

### 2.6 MySQL

| Aspecto | Detalle |
|---------|---------|
| Motor | MySQL 8 |
| Cliente | mysql2 (pool) |
| Tablas | 39 (`schema.sql`) |
| Migración | Automática al arranque |
| Producción | Railway MySQL vinculado |
| Local tests | `cafe_sostenible` en 127.0.0.1:3306 |
| SSL Railway | Activado si `RAILWAY_ENVIRONMENT` |

**Problemas detectados:**

- Seeds con `.catch(logSeedWarning)` — fallos no detienen arranque (LOG-17)
- Sin logs slow-query en repositorio

---

### 2.7 npm (dependencias y auditoría)

**Backend** (`npm_audit_backend.txt`):

| Paquete | Severidad | CVE |
|---------|-----------|-----|
| form-data 4.0.0–4.0.5 | **High** | GHSA-hmw2-7cc7-3qxx |
| dompurify ≤3.4.10 | Moderate | GHSA-vxr8-fq34-vvx9, GHSA-cmwh-pvxp-8882 |

**Frontend** (`npm_audit_frontend.txt`):

| Paquete | Severidad | Nota |
|---------|-----------|------|
| esbuild ≤0.24.2 | Moderate | Dev server — GHSA-67mh-4wv8-2f99 |
| react-router 6.7.0–6.30.3 | Moderate | Open redirect — GHSA-2j2x-hqr9-3h42 |
| js-yaml ≤4.1.1 | Moderate | DoS merge keys |
| @babel/core ≤7.29.0 | Low | Arbitrary file read |

---

### 2.8 Cypress (E2E)

| Métrica | Valor |
|---------|-------|
| Framework | Cypress 13.17.0 |
| Última ejecución | 2026-05-28 |
| Tests | **13/13 OK (100 %)** |
| Duración | 348 678 ms (~5.8 min) |
| Base URL | http://localhost:5174 |

**Excepciones ignoradas en logs E2E** (`e2e.js`):

- ResizeObserver
- Loading chunk / ChunkLoadError
- hydrat*

**Gap:** Cypress **no ejecutado en CI** — riesgo de drift.

**Evidencia pendiente:** screenshots/videos — carpeta vacía en momento del análisis.

---

### 2.9 JMeter (carga)

| Métrica | Valor | Objetivo |
|---------|-------|----------|
| Total requests | 500 | — |
| Exitosos | 500 | — |
| Tasa error | **0 %** | 0 % |
| Tiempo promedio | 443 ms | < 2000 ms |
| P95 | **2614 ms** | < 2000 ms (marginal) |
| Máximo | 2699 ms | — |
| Concurrencia | 50 usuarios | — |
| Endpoint | Solo GET /api/health | — |

---

### 2.10 SonarQube / SonarCloud

| Aspecto | Estado |
|---------|--------|
| Proyecto | `4dr1-2529_CAFE-IA` |
| Fuentes | `frontend/src`, `backend/src` |
| CI job | `sonarcloud` tras backend + frontend |
| Correcciones documentadas | 16 en `CORRECCIONES_SONARQUBE.md` |
| Blocker histórico | migrate.js:156 — corregido |
| Métricas live | **No embebidas** en repo |
| Cobertura lcov | **No configurada** |

---

### 2.11 Variables de entorno

Referencia: `Evidencias/backend_env.example.txt`

| Variable | Obligatoria | Uso |
|----------|-------------|-----|
| MYSQLHOST | Sí | Host MySQL |
| MYSQLPORT | Sí | Puerto |
| MYSQLUSER | Sí | Usuario |
| MYSQLPASSWORD | Sí | Contraseña |
| MYSQLDATABASE | Sí | Base de datos |
| JWT_SECRET | Sí (≥32 chars) | Firma tokens |
| ADMIN_SEED_PASSWORD | Recomendada | Seed usuario admin |
| CORS_ORIGINS | Sí en prod | Orígenes permitidos |
| VITE_API_URL | Frontend | URL API Railway/local |
| PORT | Auto Railway | Puerto HTTP |

**Problemas:**

- Variables legacy `DB_HOST`/`DB_USER` mencionadas en mensajes error — deben eliminarse del panel Railway
- `ADMIN_SEED_PASSWORD` ausente genera warning y omite admin

---

### 2.12 API REST

| Endpoint verificado | Resultado |
|---------------------|-----------|
| GET /api/health | 200 OK (Railway + tests) |
| POST /api/auth/login | OK en integration test |
| GET /api/lotes + JWT | OK |
| POST /api/lotes sin token | 401 |
| POST /api/lotes inválido | 400 |
| GET /api/dashboard/metrics | OK (~1.6 s en test) |
| GET /api/ruta-inexistente | 404 |

---

### 2.13 JWT y autenticación

| Control | Evidencia |
|---------|-----------|
| JWT obligatorio en rutas protegidas | Test 401 sin token |
| Login admin funcional | integration.test.js |
| Refresh tokens | Tabla `sesiones` (documentado) |
| bcrypt passwords | AuthService |
| RBAC admin/cliente | readGuard, adminGuard |
| JWT_SECRET validación | env.js — mínimo 32 caracteres |

**Sin errores de autenticación** detectados en logs actuales.

---

### 2.14 Despliegue

```text
GitHub push → Railway (backend/) + Vercel (frontend/)
Railway: Node server.js → initDatabase → Express :8080
Vercel: vite build → dist/ → SPA rewrite
```

| Plataforma | Estado logs |
|------------|-------------|
| Railway API | Operativo (post-fix migrate.js) |
| Railway MySQL | Conectado (health confirma) |
| Vercel SPA | HTTP 200 |
| GitHub Actions CI | backend test + frontend build + Sonar + audit |

---

## 3. Matriz consolidada de hallazgos

Ver archivo completo: `Evidencias/Matriz_Hallazgos.md` (25 hallazgos LOG-01 a LOG-25).

### Resumen por prioridad

| Prioridad | Cantidad |
|-----------|----------|
| Crítico (resuelto) | 1 |
| Alto | 2 |
| Medio | 11 |
| Bajo | 5 |
| Informativo | 6 |

---

## 4. Clasificación de problemas detectados

### Errores

- SyntaxError migrate.js:156 (Railway) — **resuelto**
- ESLint 2 errores configuración frontend — **pendiente**

### Advertencias

- ADMIN_SEED_PASSWORD no definido
- npm warn production / omit=dev
- 187 ESLint warnings no-unused-vars
- npm notice nueva versión disponible

### Excepciones

- Cypress: ResizeObserver, ChunkLoadError ignoradas intencionalmente
- Railway histórico: SyntaxError en loop de reinicio

### Vulnerabilidades

- 8 CVEs npm audit (backend 2 + frontend 6)

### Configuración

- SKIP_INTEGRATION=1 en CI
- continue-on-error en npm audit CI
- Sin lcov SonarCloud

### Red / rendimiento

- JMeter P95 2614 ms marginal
- Dashboard metrics ~1.6 s en test integración

### Autenticación

- Sin fallos actuales; 401/400 validados en tests

---

## 5. Conclusión del análisis

CAFE-IA presenta logs de un sistema **funcional y desplegado**, con un incidente crítico de despliegue **ya mitigado**. Las brechas principales están en **automatización CI** (integración + Cypress), **vulnerabilidades npm** y **completitud de evidencias SonarCloud**.

Este documento, junto con `03_Mejoras.md`, `04_Conclusiones.md` y la carpeta `Evidencias/`, constituye la base para el Paso 2 (Dependencias) de la Ingeniería Inversa.

---

*Generado automáticamente — 2026-06-24. Sin modificación del código CAFE-IA.*
