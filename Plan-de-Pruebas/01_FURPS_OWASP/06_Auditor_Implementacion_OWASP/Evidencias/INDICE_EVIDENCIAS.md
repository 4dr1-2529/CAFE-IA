# Índice de Evidencias — Implementación OWASP — CAFE-IA

**Actividad:** Paso 6 — Auditor de Implementación OWASP  
**Fecha:** 24 de junio de 2026  
**Ubicación:** `Plan-de-Pruebas/01_FURPS_OWASP/06_Auditor_Implementacion_OWASP/Evidencias/`

---

## 1. Documentos generados (verificación implementación)

| # | Archivo | Descripción |
|---|---------|-------------|
| 1 | `Matriz_Implementacion_OWASP.md` / `.xlsx` | Cumplimiento A01–A10 en código |
| 2 | `Matriz_Vulnerabilidades.md` / `.xlsx` | IMP-OW-001 a IMP-OW-015 |
| 3 | `Comparativo_Plan_vs_Implementacion.md` | P04 vs P05 vs P06 |
| 4 | `Checklist_Implementacion.md` | Frontend, backend, BD, infra, CI |
| 5 | `Dashboard_Implementacion.md` | Indicadores globales |
| 6 | `Resumen_Ejecutivo.md` | Síntesis dirección |
| 7 | `INDICE_EVIDENCIAS.md` | Este documento |

---

## 2. Evidencias copiadas

### Autenticación y auditoría (A01, A07, A09)

| Archivo | Uso verificación |
|---------|------------------|
| `npm_test_backend.txt` | 401 sin token; login integración |
| `cypress_last-run.json` | E2E login frontend |
| `schema.sql` | auditoria_logs, permisos, sesiones |

### Configuración e infraestructura (A05)

| Archivo | Uso verificación |
|---------|------------------|
| `railway_health_response.json` | IMP-OW-001 dbHost expuesto |
| `vercel_status.json` | Despliegue SPA |
| `vercel.json` | Config Vercel |
| `ci.yml` | IMP-OW-009, IMP-OW-015 |
| `backend_env.example.txt` | IMP-OW-014, JWT config |

### Dependencias (A06, A08)

| Archivo | Uso |
|---------|-----|
| `package_backend.json` / `package_frontend.json` | Versiones |
| `package-lock_*.json` | Integridad locks |
| `npm_audit_backend.txt` | IMP-OW-004 |
| `npm_audit_frontend.txt` | IMP-OW-005 |

### Análisis estático (A03)

| Archivo | Uso |
|---------|-----|
| `CORRECCIONES_SONARQUBE.md` | SQL reportes implementado |
| `sonar-project.properties` | Config SonarCloud |
| `npm_lint_frontend.txt` | Calidad frontend |
| `npm_build_frontend.txt` | Build reproducible |

### Documentación y arquitectura (A04)

| Archivo | Uso |
|---------|-----|
| `README_proyecto.md` | Documentación |
| `README_raiz.md` | README raíz |
| `arquitectura-solucion-cafe-ia.mmd` | Diagrama |

### Carga complementaria

| Archivo | Uso |
|---------|-----|
| `jmeter_resumen.json` | Disponibilidad health |

---

## 3. Código revisado (referencia en repo, no copiado)

| Archivo `cafe-cursor/` | Hallazgo verificado |
|------------------------|---------------------|
| `backend/src/app.js` | IMP-OW-001, IMP-OW-002 |
| `backend/src/application/services/AuthService.js` | IMP-OW-007, IMP-OW-010 |
| `backend/src/interfaces/http/routes/auth.routes.js` | IMP-OW-008, IMP-OW-012 |
| `backend/src/application/services/LoteService.js` | IMP-OW-011 |
| `frontend/src/services/api/client.js` | IMP-OW-006 |
| `frontend/src/components/auth/AdminRoute.jsx` | A01 conforme |
| `backend/src/shared/scopedQuery.js` | A03 conforme |
| `backend/src/interfaces/http/middleware/auditMiddleware.js` | A09 conforme |

---

## 4. Evidencias pendientes

| Evidencia | Estado |
|-----------|--------|
| Informe SonarCloud exportado | **Evidencia pendiente de incorporar.** |
| Escaneo OWASP ZAP | **Evidencia pendiente de incorporar.** |
| Colección Postman auth exportada | **Evidencia pendiente de incorporar.** |
| Logs producción Railway | **Evidencia pendiente de incorporar.** |
| Configuración panel Railway | **Evidencia pendiente de incorporar.** |
| Reportes PDF/Excel runtime | **Evidencia pendiente de incorporar.** |
| npm audit post-remediación | **Evidencia pendiente de incorporar.** |

---

## 5. Trazabilidad entre pasos

| Paso | Documento | Relación |
|------|-----------|----------|
| 04 | Planificador OWASP | Plan y checklist base |
| 05 | Auditor OWASP | Hallazgos OW-001–015 |
| 06 | Implementación OWASP | Verificación 0 % remediación |
| 03 FURPS | Implementación FURPS | 0 % remediación coherente |

---

## 6. Resumen cuantitativo

| Métrica | Valor |
|---------|-------|
| Documentos generados | 7 + 2 Excel |
| Evidencias copiadas | 22 |
| Evidencias pendientes | 7 |
| Hallazgos implementación | 15 (0 remediados) |
| Cumplimiento OWASP | 76 % |

---

*Índice de evidencias — Paso 06 Auditor de Implementación OWASP — CAFE-IA.*
