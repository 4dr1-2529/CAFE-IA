# Correcciones SonarQube / SonarCloud

**Proyecto:** `4dr1-2529_CAFE-IA`  
**Última actualización:** 2026-06-03

## Tabla de hallazgos

| Hallazgo | Severidad | Archivo | Corrección aplicada | Estado |
|----------|-----------|---------|---------------------|--------|
| Potential SQL injection via string-based query | Crítica | `ReportesRepository.js` | Consultas 100 % estáticas en `reportesSql.js` + `trazabilidadSql.js`; ejecución con `scopedQuery.js` y placeholders `?` | Corregido |
| Potential leakage of sensitive environment variables | Crítica | `vite.config.js` | `loadEnv(..., 'VITE_')` únicamente; sin `define` de `process.env`; frontend usa `import.meta.env.VITE_API_URL` | Corregido |
| uuid vulnerable (GHSA-w5hq-g745-h8pq) | Media | `package.json` / lockfiles | `overrides`: `uuid@^11.1.1` | Corregido |
| joblib vulnerable (AIKIDO-2025-10962 DoS) | Baja | `ml/requirements.txt` | `joblib>=1.5.3` | Corregido |
| GitHub Actions sin SHA fijo | Alta | `.github/workflows/ci.yml` | Pin por commit SHA (`checkout`, `setup-node`, `sonarcloud`) | Corregido |
| tmp path traversal (transitiva exceljs) | Alta | `backend/package.json` | `overrides`: `tmp@^0.2.6` | Corregido |
| JWT secret hardcodeado en producción | Alta | `backend/src/config/env.js` | `JWT_SECRET` obligatorio en producción; fallback solo en desarrollo con advertencia | Corregido |
| Contraseña admin hardcodeada en migrate | Alta | `backend/src/infrastructure/database/migrate.js` | Seed admin vía `ADMIN_SEED_PASSWORD`; sin literal en código | Corregido |
| SSL `rejectUnauthorized: false` fijo | Media | `database.js`, `pool.js`, `migrate.js` | Control por `MYSQL_SSL_REJECT_UNAUTHORIZED` (default seguro) | Corregido |
| Regex email ReDoS en validadores | Media | `validators/*.js`, `frontend/src/utils/validation.js` | `inputValidation.js` con validación acotada sin regex compleja | Corregido |
| Claves duplicadas en objeto reportes | Bug | `backend/src/shared/reportesResponse.js` | Metadatos aplicados una sola vez tras spread de `data` | Corregido |
| Lógica redundante export reportes | Bug | `ReportesService.js` | `normalizeExportTipo` simplificado | Corregido |
| Aserción tautológica en test | Bug | `backend/tests/prediction.test.js` | `Array.isArray(r.alertas)` en lugar de `length >= 0` | Corregido |
| JWT dev hardcodeado / execSync shell | Alta | `env.js`, `dbDocGenerator.js` | Secreto efímero con `crypto`; `execFileSync` sin shell | Corregido |
| SQL DDL / multipleStatements en migrate | Alta | `migrate.js` | `mysql.escapeId`, statements uno a uno, seed con logs | Corregido |
| Variable auditDesc sin uso / formato inválido | Bug | `ReportesService.js` | `normalizeExportFormato` + auditoría con `auditDesc` | Corregido |

---

## 1. SQL injection — ReportesRepository

**Problema:** Sonar detectaba interpolación `${ls.clause}` y fragmentos dinámicos en SQL.

**Solución:**

- `backend/src/shared/reportesSql.js` — pares `*_GLOBAL` / `*_SCOPED` sin entrada de usuario en el texto SQL.
- `backend/src/shared/scopedQuery.js` — `queryScoped(userId, sqlGlobal, sqlScoped)` elige consulta según scope validado.
- `backend/src/shared/sqlScope.js` — whitelist `REPORT_TABLE_KEYS` y `assertReportType()`.
- `ReportesRepository.js` — sin template strings en SQL; solo llama a helpers y constantes.
- `ReportExportService.js` — misma estrategia.

---

## 2. Variables sensibles — vite.config.js

**Problema:** `loadEnv(mode, process.cwd(), '')` exponía todas las variables del `.env`.

**Solución:**

```js
loadEnv(mode, process.cwd(), 'VITE_')
envPrefix: ['VITE_']
```

- Eliminado `define` de `import.meta.env.VITE_API_URL` con valores derivados de env completo.
- Producción: `VITE_API_URL` en `frontend/vercel.json` y fallback en `frontend/src/config/api.js`.

---

## 3. uuid

```json
"overrides": { "uuid": "^11.1.1" }
```

En `backend/package.json` y `package.json` (raíz).

---

## 4. joblib

`ml/requirements.txt`: `joblib>=1.5.3` (parche DoS AIKIDO-2025-10962; usado por scikit-learn).

## 5. GitHub Actions (Aikido — supply chain)

`.github/workflows/ci.yml`: acciones de terceros fijadas por SHA completo:

| Acción | SHA | Versión ref. |
|--------|-----|--------------|
| `actions/checkout` | `11bd71901bbe5b1630ceea73d27597364c9af683` | v4.2.2 |
| `actions/setup-node` | `39370e3970a6d050c480ffad4ff0ed4d3fdee5af` | v4.1.0 |
| `SonarSource/sonarcloud-github-action` | `e44258b109568baa0df60ed515909fc6c72cba92` | v2.3.0 |

---

## Validación

```bash
cd backend && npm install && npm audit && npm test
cd ../frontend && npm install && npm run build && npm audit
```

---

## Re-escaneo SonarCloud

1. Secret `SONAR_TOKEN` en GitHub Actions.
2. Push a `main` → job **SonarCloud Analysis**.
3. Dashboard: https://sonarcloud.io/project/overview?id=4dr1-2529_CAFE-IA
