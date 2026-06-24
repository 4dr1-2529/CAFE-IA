# Índice de Evidencias — Auditor OWASP — CAFE-IA

**Actividad:** Paso 5 — Auditor OWASP  
**Fecha:** 24 de junio de 2026  
**Ubicación:** `Plan-de-Pruebas/01_FURPS_OWASP/05_Auditor_OWASP/Evidencias/`

---

## 1. Documentos generados (auditoría)

| # | Archivo | Descripción |
|---|---------|-------------|
| 1 | `Matriz_OWASP.md` / `.xlsx` | Resultado A01–A10 con cumplimiento % |
| 2 | `Matriz_Vulnerabilidades.md` / `.xlsx` | 15 hallazgos OW-001 a OW-015 |
| 3 | `Checklist_OWASP.md` | 72 controles evaluados |
| 4 | `Dashboard_Seguridad.md` | Indicadores globales y prioridades |
| 5 | `Resumen_Ejecutivo.md` | Síntesis para dirección |
| 6 | `INDICE_EVIDENCIAS.md` | Este documento |

---

## 2. Evidencias copiadas del proyecto

### Dependencias (A06, A08)

| Archivo | Origen | Estado |
|---------|--------|--------|
| `package_backend.json` | `cafe-cursor/backend/package.json` | Incorporada |
| `package_frontend.json` | `cafe-cursor/frontend/package.json` | Incorporada |
| `package-lock_backend.json` | backend lockfile | Incorporada |
| `package-lock_frontend.json` | frontend lockfile | Incorporada |
| `npm_audit_backend.txt` | npm audit backend | Incorporada |
| `npm_audit_frontend.txt` | npm audit frontend | Incorporada |

### Análisis estático (A03, A06)

| Archivo | Estado |
|---------|--------|
| `CORRECCIONES_SONARQUBE.md` | Incorporada |
| `sonar-project.properties` | Incorporada |
| `npm_lint_frontend.txt` | Incorporada |
| `npm_build_frontend.txt` | Incorporada |

### Configuración (A02, A05, A07)

| Archivo | Estado |
|---------|--------|
| `backend_env.example.txt` | Incorporada |
| `ci.yml` | Incorporada |
| `vercel.json` | Incorporada |

### Despliegue Railway / Vercel (A05)

| Archivo | Estado |
|---------|--------|
| `railway_health_response.json` | Incorporada — OW-001 |
| `vercel_status.json` | Incorporada |

### Arquitectura y BD (A01, A04, A09)

| Archivo | Estado |
|---------|--------|
| `README_proyecto.md` | Incorporada |
| `README_raiz.md` | Incorporada |
| `arquitectura-solucion-cafe-ia.mmd` | Incorporada |
| `schema.sql` | Incorporada — OW-003 |

### Pruebas (A01, A07)

| Archivo | Estado |
|---------|--------|
| `npm_test_backend.txt` | Incorporada |
| `cypress_last-run.json` | Incorporada |

### Carga complementaria (A05)

| Archivo | Estado |
|---------|--------|
| `jmeter_resumen.json` | Incorporada |

---

## 3. Evidencias de código revisado (referencia, no copiadas)

| Archivo en `cafe-cursor/` | Hallazgos |
|---------------------------|-----------|
| `backend/src/app.js` | OW-001, OW-002 |
| `backend/src/interfaces/http/middleware/auth.js` | A01, A07 |
| `backend/src/interfaces/http/middleware/rbac.js` | A01 |
| `backend/src/application/services/AuthService.js` | OW-007, OW-008, OW-010 |
| `backend/src/shared/scopedQuery.js`, `sqlScope.js` | A03 conforme |
| `frontend/src/services/api/client.js` | OW-006 |
| `frontend/src/routes/AppRoutes.jsx` | A01 frontend |

---

## 4. Evidencias pendientes

| Evidencia | Estado |
|-----------|--------|
| Informe SonarCloud exportado (PDF/HTML) | **Evidencia pendiente de incorporar.** |
| Escaneo DAST OWASP ZAP | **Evidencia pendiente de incorporar.** |
| Colección Postman exportada | **Evidencia pendiente de incorporar.** |
| Logs producción Railway | **Evidencia pendiente de incorporar.** |
| Configuración panel Railway (variables) | **Evidencia pendiente de incorporar.** |
| Reportes PDF/Excel generados en runtime | **Evidencia pendiente de incorporar.** |
| npm audit post-remediación | **Evidencia pendiente de incorporar.** |

---

## 5. Mapeo evidencia → hallazgo

| Hallazgo | Evidencia principal |
|----------|---------------------|
| OW-001 | railway_health_response.json, app.js |
| OW-002 | app.js, ci.yml |
| OW-003 | schema.sql |
| OW-004 | npm_audit_backend.txt |
| OW-005 | npm_audit_frontend.txt |
| OW-006 | client.js (referencia código) |
| OW-009 | ci.yml L67-71 |
| OW-011 | LoteService.js (referencia IMP-H001) |

---

## 6. Resumen cuantitativo

| Métrica | Valor |
|---------|-------|
| Documentos auditoría | 6 + 2 Excel |
| Evidencias copiadas | 22 |
| Evidencias pendientes | 7 |
| Hallazgos documentados | 15 |

---

*Índice de evidencias — Paso 05 Auditor OWASP — CAFE-IA.*
