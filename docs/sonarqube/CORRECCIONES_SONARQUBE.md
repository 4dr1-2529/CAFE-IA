# Correcciones SonarQube / SonarCloud

Fecha: 2026-05-28  
Proyecto: `4dr1-2529_CAFE-IA`

## Resumen

| # | Vulnerabilidad | Severidad | Archivo | Estado |
|---|----------------|-----------|---------|--------|
| 1 | SQL injection (consulta por concatenación) | Crítica | `ReportesRepository.js` | Corregido |
| 2 | Fuga de variables de entorno sensibles | Crítica | `vite.config.js` | Corregido |
| 3 | Dependencia `tmp` (path traversal) | Alta | `backend/package.json` (transitiva exceljs) | Corregido |
| 4 | Dependencia `uuid` (buffer bounds) | Media | `backend/package.json` (transitiva exceljs) | Corregido |
| 5 | Dependencia `joblib` | Baja | `ml/requirements.txt` | Corregido |

---

## 1. SQL injection — ReportesRepository

**Detección:** Consultas armadas con template strings / fragmentos dinámicos (`${ls.clause}`, alias SQL, columnas JOIN variables).

**Acción correctiva:**

- Nuevo módulo `backend/src/shared/sqlScope.js` con fragmentos SQL **fijos** y parámetros `?`.
- Whitelist de tipos de reporte (`assertReportType`, `REPORT_TABLE_KEYS`).
- `trazabilidadSql.js`: expresiones SQL estáticas (alias `l` fijo); `sqlResumenEtapas` / `sqlKpisEtapasLotes` reciben solo `userId` numérico o `null`.
- `ReportesRepository.trazabilidad`: consultas global/personal separadas (sin `${clienteCols}` / `${joinCliente}`).
- `ReportExportService`: mismas reglas; trazabilidad con dos SQL estáticos.
- `DashboardRepository`: usa `sqlScope` compartido (sin alias dinámico).

**Evidencia:** Parámetros siempre en array `[userId]`; no hay nombres de tabla/columna desde `req.params` o body.

---

## 2. Fuga de variables — vite.config.js

**Detección:** `loadEnv(mode, process.cwd(), '')` cargaba **todas** las variables del `.env` (incl. `MYSQLPASSWORD`, `JWT_SECRET`, etc.).

**Acción correctiva:**

- `loadEnv(mode, process.cwd(), 'VITE_')` — solo prefijo público.
- `define` limitado a `import.meta.env.VITE_API_URL` con valor derivado únicamente de `VITE_*` o default Railway en producción.
- `envPrefix: ['VITE_']` mantenido.

**Evidencia:** El bundle de frontend no recibe secretos de servidor.

---

## 3–4. Dependencias npm (`tmp`, `uuid`)

**Acción correctiva:**

```json
"overrides": {
  "tmp": "^0.2.6",
  "uuid": "^11.1.1"
}
```

En `backend/package.json` y `package.json` (raíz, Cypress).

**Evidencia:** `npm audit` en backend tras `npm install` — ver salida de CI/local.

---

## 5. joblib (Python ML)

**Acción correctiva:** `ml/requirements.txt` → `joblib>=1.4.2`

**Evidencia:** Actualizar entorno ML con `pip install -r ml/requirements.txt --upgrade`

---

## Validación ejecutada

```bash
cd backend && npm install && npm audit && npm test
cd frontend && npm install && npm audit && npm run build
```

---

## Volver a analizar en SonarCloud

1. Configurar secret `SONAR_TOKEN` en GitHub (si no existe).
2. Push a `main` → workflow `sonarcloud` en Actions.
3. Revisar: https://sonarcloud.io/project/overview?id=4dr1-2529_CAFE-IA

Capturas sugeridas: Overview (Quality Gate), Issues (0 críticas en archivos corregidos).
