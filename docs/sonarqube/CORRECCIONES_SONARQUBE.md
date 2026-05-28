# Correcciones SonarQube / SonarCloud

**Proyecto:** `4dr1-2529_CAFE-IA`  
**Última actualización:** 2026-05-28

## Tabla de hallazgos

| Hallazgo | Severidad | Archivo | Corrección aplicada | Estado |
|----------|-----------|---------|---------------------|--------|
| Potential SQL injection via string-based query | Crítica | `ReportesRepository.js` | Consultas 100 % estáticas en `reportesSql.js` + `trazabilidadSql.js`; ejecución con `scopedQuery.js` y placeholders `?` | Corregido |
| Potential leakage of sensitive environment variables | Crítica | `vite.config.js` | `loadEnv(..., 'VITE_')` únicamente; sin `define` de `process.env`; frontend usa `import.meta.env.VITE_API_URL` | Corregido |
| uuid vulnerable (GHSA-w5hq-g745-h8pq) | Media | `package.json` / lockfiles | `overrides`: `uuid@^11.1.1` | Corregido |
| joblib vulnerable | Baja | `ml/requirements.txt` | `joblib>=1.5.0` | Corregido |
| tmp path traversal (transitiva exceljs) | Alta | `backend/package.json` | `overrides`: `tmp@^0.2.6` | Corregido |

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

`ml/requirements.txt`: `joblib>=1.5.0` (usado por scikit-learn en entrenamiento ML).

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
