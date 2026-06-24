# Dependencias Backend — CAFE-IA

**Fuente:** `cafe-cursor/backend/package.json` · `npm_list_backend.json`  
**Fecha:** 2026-06-24

---

## Resumen

| Categoría | Cantidad |
|-----------|----------|
| Dependencias de producción | 10 |
| Dependencias de desarrollo | 2 |
| Overrides npm | 2 (`tmp`, `uuid`) |

---

## Dependencias de producción

### express — 4.22.2 (declarada ^4.18.2)

| Atributo | Detalle |
|----------|---------|
| **Función** | Framework HTTP REST; enrutamiento y middleware |
| **Módulos** | `src/app.js`, `src/interfaces/http/routes/*.js` (13 archivos de rutas) |
| **Relacionadas** | cors, helmet, express-rate-limit, body-parser (transitiva) |
| **Riesgos** | Superficie de ataque HTTP; mitigado con helmet y rate-limit |
| **Compatibilidad** | Node 18–22; ESM (`"type": "module"`) |
| **Estado** | **Actualizada** (lock resuelve 4.22.2 > 4.18.2) |
| **Criticidad** | **Crítica** |

### mysql2 — 3.22.3 (declarada ^3.9.2)

| Atributo | Detalle |
|----------|---------|
| **Función** | Cliente MySQL; pool de conexiones y prepared statements |
| **Módulos** | `infrastructure/database/pool.js`, `migrate.js`, `database.js` |
| **Relacionadas** | MySQL 8 (Railway / local) |
| **Riesgos** | SQL injection si no se usan placeholders — proyecto usa prepared statements |
| **Compatibilidad** | MySQL 8, SSL Railway |
| **Estado** | **Actualizada** |
| **Criticidad** | **Crítica** |

### jsonwebtoken — 9.0.3 (declarada ^9.0.2)

| Atributo | Detalle |
|----------|---------|
| **Función** | Emisión y verificación JWT (access/refresh) |
| **Módulos** | `application/services/AuthService.js` |
| **Relacionadas** | bcryptjs, tabla `sesiones` |
| **Riesgos** | Secreto débil — mitigado: `JWT_SECRET` ≥32 chars obligatorio |
| **Compatibilidad** | Node crypto |
| **Estado** | **Actualizada** |
| **Criticidad** | **Crítica** |

### bcryptjs — 2.4.3

| Atributo | Detalle |
|----------|---------|
| **Función** | Hash de contraseñas |
| **Módulos** | `AuthService.js`, `UsuarioService.js`, `migrate.js`, `seed-final.js` |
| **Relacionadas** | jsonwebtoken |
| **Riesgos** | Factor de costo 10 — adecuado para entorno académico |
| **Estado** | **Actualizada** (versión estable) |
| **Criticidad** | **Alta** |

### cors — 2.8.6 (declarada ^2.8.5)

| Atributo | Detalle |
|----------|---------|
| **Función** | Control CORS; orígenes Vercel y localhost |
| **Módulos** | `src/app.js` |
| **Relacionadas** | `CORS_ORIGINS` env, patrón `*.vercel.app` |
| **Riesgos** | Origen no autorizado — configuración estricta en producción |
| **Estado** | **Actualizada** |
| **Criticidad** | **Alta** |

### helmet — 7.2.0

| Atributo | Detalle |
|----------|---------|
| **Función** | Headers de seguridad HTTP |
| **Módulos** | `src/app.js` |
| **Relacionadas** | express |
| **Riesgos** | Bajo si se mantiene actualizado |
| **Estado** | **Actualizada** |
| **Criticidad** | **Alta** |

### express-rate-limit — 7.5.1

| Atributo | Detalle |
|----------|---------|
| **Función** | Limitación 500 req / 15 min |
| **Módulos** | `src/app.js` |
| **Relacionadas** | express |
| **Riesgos** | DoS parcialmente mitigado |
| **Estado** | **Actualizada** |
| **Criticidad** | **Media** |

### dotenv — 16.6.1 (declarada ^16.4.5)

| Atributo | Detalle |
|----------|---------|
| **Función** | Carga `.env` local sin sobrescribir Railway |
| **Módulos** | `config/database.js` |
| **Relacionadas** | MYSQL*, JWT_SECRET |
| **Riesgos** | Leak de `.env` — `.env` no debe commitearse |
| **Estado** | **Actualizada** |
| **Criticidad** | **Alta** |

### exceljs — 4.4.0

| Atributo | Detalle |
|----------|---------|
| **Función** | Exportación reportes Excel |
| **Módulos** | `application/services/ReportExportService.js` |
| **Relacionadas** | pdfkit |
| **Riesgos** | Bajo en runtime API |
| **Estado** | **Actualizada** |
| **Criticidad** | **Media** |

### pdfkit — 0.15.2 (declarada ^0.15.0)

| Atributo | Detalle |
|----------|---------|
| **Función** | Generación PDF reportes |
| **Módulos** | `ReportExportService.js` |
| **Relacionadas** | exceljs |
| **Riesgos** | Bajo |
| **Estado** | **Actualizada** |
| **Criticidad** | **Media** |

---

## Dependencias de desarrollo

### supertest — 6.3.4

| Atributo | Detalle |
|----------|---------|
| **Función** | Tests HTTP (import disponible; tests usan `fetch` nativo) |
| **Módulos** | `backend/tests/` |
| **Riesgos** | **form-data** HIGH transitiva (npm audit) |
| **Estado** | **Actualizada** |
| **Criticidad** | **Baja** (solo dev/test) |

### @mermaid-js/mermaid-cli — 11.4.0

| Atributo | Detalle |
|----------|---------|
| **Función** | Export PNG diagramas BD (`db:docs:png`) |
| **Módulos** | `backend/scripts/exportDbDocPng.js` |
| **Riesgos** | **dompurify** moderate transitiva |
| **Estado** | **Actualizada** |
| **Criticidad** | **Baja** (solo scripts) |

---

## Overrides npm

| Paquete | Versión forzada | Motivo documentado |
|---------|-----------------|-------------------|
| `tmp` | ^0.2.6 | Mitigación path traversal (SonarCloud) |
| `uuid` | ^11.1.1 | Mitigación CVE uuid vulnerable |

---

## Dependencias solicitadas en alcance pero NO instaladas

| Paquete | Estado en CAFE-IA |
|---------|-------------------|
| **multer** | No declarada en `package.json` — sin uploads multipart |
| **node-cron** | No declarada — sin tareas programadas en backend |

---

## Vulnerabilidades npm audit (transitivas)

| Paquete | Severidad | Origen probable |
|---------|-----------|-----------------|
| form-data 4.0.0–4.0.5 | **High** | Cadena supertest / HTTP client |
| dompurify ≤3.4.10 | Moderate | Cadena mermaid-cli |

Ver `Evidencias/npm_audit_backend.json`.
