# Índice de Evidencias — Auditoría Final Integral — CAFE-IA

**Actividad:** Paso 7 — Auditor Final Integral  
**Fecha:** 24 de junio de 2026  
**Ubicación:** `Plan-de-Pruebas/01_FURPS_OWASP/07_Auditor_Final_Integral/Evidencias/`

---

## 1. Documentos generados (Paso 07)

| # | Archivo | Descripción |
|---|---------|-------------|
| 1 | `Dashboard_Final.md` / `.xlsx` | Indicadores consolidados FURPS+OWASP+Global |
| 2 | `Matriz_Consolidada_Hallazgos.md` / `.xlsx` | 24 hallazgos únicos CON-001–024 |
| 3 | `Checklist_Final.md` / `.xlsx` | Verificación integral FURPS+OWASP+Global |
| 4 | `Resumen_Ejecutivo.md` | Síntesis para dirección |
| 5 | `Resumen_General.md` | Trayectoria ciclo evaluación P01–P07 |
| 6 | `INDICE_EVIDENCIAS.md` | Este documento |

---

## 2. Referencias copiadas — `Referencias_Pasos_01_06/`

| Archivo | Paso origen |
|---------|-------------|
| `P01_Matriz_FURPS.md` | 01 Planificador FURPS |
| `P02_Matriz_FURPS_Auditoria.md` | 02 Auditor FURPS |
| `P02_Matriz_Hallazgos_FUR.md` | 02 Auditor FURPS (FUR-001–018) |
| `P02_Dashboard_FURPS.md` | 02 Auditor FURPS |
| `P03_Matriz_Impl_FURPS.md` | 03 Impl. FURPS |
| `P03_Matriz_Hallazgos_IMP.md` | 03 Impl. FURPS (IMP-H001–017) |
| `P04_Matriz_OWASP_Plan.md` | 04 Planificador OWASP |
| `P05_Matriz_OWASP_Auditoria.md` | 05 Auditor OWASP |
| `P05_Matriz_Vuln_OWASP.md` | 05 Auditor OWASP (OW-001–015) |
| `P05_Dashboard_Seguridad.md` | 05 Auditor OWASP |
| `P06_Matriz_Impl_OWASP.md` | 06 Impl. OWASP |
| `P06_Comparativo_OWASP.md` | 06 Impl. OWASP |
| `Matriz_FURPS.xlsx` | Excel paso 02/03 |
| `Matriz_Hallazgos.xlsx` | Excel hallazgos FUR/IMP |
| `Matriz_OWASP.xlsx` | Excel OWASP |
| `Matriz_Vulnerabilidades.xlsx` | Excel vulnerabilidades OW |
| `Matriz_Implementacion_FURPS.xlsx` | Excel impl. FURPS |

---

## 3. Evidencias operativas (raíz Evidencias/)

| Archivo | Uso consolidado |
|---------|-----------------|
| `npm_audit_backend.txt` | CON-005 CVE form-data |
| `npm_audit_frontend.txt` | CON-008 CVE frontend |
| `npm_test_backend.txt` | Auth 401, tests 18/18 |
| `railway_health_response.json` | CON-002 health dbHost |
| `cypress_last-run.json` | E2E 13/13 |
| `jmeter_resumen.json` | CON-014 performance |
| `CORRECCIONES_SONARQUBE.md` | 16 correcciones SAST |
| `ci.yml` | CON-006, CON-012, CON-020 |

---

## 4. Trazabilidad por paso

| Paso | Carpeta | Resultado clave | Incorporado en P07 |
|------|---------|-----------------|-------------------|
| 01 | `01_Planificador_FURPS/` | 48 criterios FURPS+ | Matriz plan |
| 02 | `02_Auditor_FURPS/` | 79 % · 18 FUR | Dashboard FURPS |
| 03 | `03_Auditor_Implementacion_FURPS/` | 77 % · 0 % rem. | Impl. FURPS |
| 04 | `04_Planificador_OWASP/` | Plan A01–A10 | Matriz plan OWASP |
| 05 | `05_Auditor_OWASP/` | 76 % · 15 OW | Dashboard seguridad |
| 06 | `06_Auditor_Implementacion_OWASP/` | 76 % · 0 % rem. | Comparativo OWASP |
| **07** | **`07_Auditor_Final_Integral/`** | **77 % · 24 CON** | **Este paso** |

---

## 5. Evidencias pendientes

| Evidencia | Estado |
|-----------|--------|
| Informe SonarCloud exportado (PDF/HTML) | **Evidencia pendiente de incorporar.** |
| Escaneo DAST OWASP ZAP | **Evidencia pendiente de incorporar.** |
| Política backups MySQL Railway | **Evidencia pendiente de incorporar.** |
| Reporte lcov/cobertura c8 | **Evidencia pendiente de incorporar.** |
| Logs producción Railway | **Evidencia pendiente de incorporar.** |
| Colección Postman exportada | **Evidencia pendiente de incorporar.** |

---

## 6. Resumen cuantitativo

| Métrica | Valor |
|---------|-------|
| Documentos Paso 07 | 6 + 3 Excel |
| Referencias Pasos 01–06 | 17 archivos |
| Evidencias operativas | 8 |
| Hallazgos consolidados únicos | 24 |
| Cumplimiento integral | 77 % |
| Cumplimiento ICACIT | 78 % |

---

*Índice de evidencias — Auditoría Final Integral — Paso 07 — CAFE-IA.*
