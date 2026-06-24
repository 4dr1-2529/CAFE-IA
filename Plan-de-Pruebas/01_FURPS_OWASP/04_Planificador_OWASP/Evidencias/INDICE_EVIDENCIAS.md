# Índice de Evidencias — Planificador OWASP — CAFE-IA

**Proyecto:** CAFE-IA  
**Actividad:** Paso 4 — Planificador OWASP  
**Fecha:** 24 de junio de 2026  
**Ubicación:** `Plan-de-Pruebas/01_FURPS_OWASP/04_Planificador_OWASP/Evidencias/`

---

## 1. Documentos generados (planificación)

| # | Archivo | Descripción | Categorías OWASP |
|---|---------|-------------|------------------|
| 1 | `Plan_Auditoria_OWASP.md` | Plan de ejecución por fases | A01–A10 |
| 2 | `Checklist_OWASP.md` | 72 controles verificables | A01–A10 |
| 3 | `Matriz_OWASP.md` | Matriz trazabilidad categorías | A01–A10 |
| 4 | `Matriz_OWASP.xlsx` | Matriz en formato Excel | A01–A10 |
| 5 | `Cronograma_Auditoria.md` | Calendario 7 días hábiles | — |
| 6 | `Resumen_Ejecutivo.md` | Síntesis para dirección | — |
| 7 | `INDICE_EVIDENCIAS.md` | Este documento | — |

---

## 2. Evidencias copiadas del proyecto CAFE-IA

### 2.1 Dependencias y paquetes (A06, A08)

| # | Archivo | Origen | Estado |
|---|---------|--------|--------|
| 8 | `package_backend.json` | `cafe-cursor/backend/package.json` | Incorporada |
| 9 | `package_frontend.json` | `cafe-cursor/frontend/package.json` | Incorporada |
| 10 | `package-lock_backend.json` | `cafe-cursor/backend/package-lock.json` | Incorporada |
| 11 | `package-lock_frontend.json` | `cafe-cursor/frontend/package-lock.json` | Incorporada |
| 12 | `npm_audit_backend.txt` | Ejecución npm audit backend | Incorporada |
| 13 | `npm_audit_frontend.txt` | Ejecución npm audit frontend | Incorporada |

### 2.2 Análisis estático y calidad (A03, A06, A08)

| # | Archivo | Origen | Estado |
|---|---------|--------|--------|
| 14 | `CORRECCIONES_SONARQUBE.md` | Documentación Sonar (16 correcciones) | Incorporada |
| 15 | `sonar-project.properties` | `cafe-cursor/sonar-project.properties` | Incorporada |
| 16 | `npm_lint_frontend.txt` | ESLint frontend | Incorporada |
| 17 | `npm_build_frontend.txt` | Build Vite producción | Incorporada |

### 2.3 Configuración y variables de entorno (A02, A05, A07)

| # | Archivo | Origen | Estado |
|---|---------|--------|--------|
| 18 | `backend_env.example.txt` | `cafe-cursor/backend/.env.example` | Incorporada |
| 19 | `ci.yml` | `cafe-cursor/.github/workflows/ci.yml` | Incorporada |
| 20 | `vercel.json` | `cafe-cursor/frontend/vercel.json` | Incorporada |

### 2.4 Despliegue Railway / Vercel (A05)

| # | Archivo | Origen | Estado |
|---|---------|--------|--------|
| 21 | `railway_health_response.json` | Respuesta GET `/api/health` Railway | Incorporada |
| 22 | `vercel_status.json` | Estado despliegue Vercel | Incorporada |

### 2.5 Arquitectura y documentación (A04)

| # | Archivo | Origen | Estado |
|---|---------|--------|--------|
| 23 | `README_proyecto.md` | README documentación proyecto | Incorporada |
| 24 | `README_raiz.md` | `cafe-cursor/README.md` | Incorporada |
| 25 | `arquitectura-solucion-cafe-ia.mmd` | Diagrama Mermaid arquitectura | Incorporada |

### 2.6 Base de datos (A01, A03, A09)

| # | Archivo | Origen | Estado |
|---|---------|--------|--------|
| 26 | `schema.sql` | Esquema MySQL 39 tablas | Incorporada |

### 2.7 Pruebas automatizadas (A01, A07)

| # | Archivo | Origen | Estado |
|---|---------|--------|--------|
| 27 | `npm_test_backend.txt` | Tests node:test (auth 401/403) | Incorporada |
| 28 | `cypress_last-run.json` | Resultado E2E Cypress | Incorporada |

### 2.8 Carga y rendimiento — complementario (A05)

| # | Archivo | Origen | Estado |
|---|---------|--------|--------|
| 29 | `jmeter_resumen.json` | Resumen prueba JMeter health | Incorporada |

---

## 3. Evidencias solicitadas no disponibles

| # | Evidencia solicitada | Estado | Nota |
|---|---------------------|--------|------|
| 30 | Informe SonarCloud exportado (PDF/HTML) | **Evidencia pendiente de incorporar.** | Usar `CORRECCIONES_SONARQUBE.md` como sustituto parcial |
| 31 | Escaneo DAST OWASP ZAP | **Evidencia pendiente de incorporar.** | Planificado Paso 05 |
| 32 | Colección Postman exportada | **Evidencia pendiente de incorporar.** | Pruebas manuales en auditoría |
| 33 | Logs producción Railway | **Evidencia pendiente de incorporar.** | Requiere acceso panel Railway |
| 34 | Reportes módulo `/api/reportes` (salida PDF/Excel) | **Evidencia pendiente de incorporar.** | Captura en Paso 05 |
| 35 | Configuración Railway (variables, networking) | **Evidencia pendiente de incorporar.** | Panel Railway no exportado |
| 36 | npm audit post-remediación CVE | **Evidencia pendiente de incorporar.** | Tras remediación Paso 06 |

---

## 4. Mapeo evidencia → categoría OWASP

| Categoría | Evidencias principales |
|-----------|------------------------|
| **A01** | npm_test_backend.txt, cypress_last-run.json, schema.sql |
| **A02** | backend_env.example.txt, package_backend.json |
| **A03** | CORRECCIONES_SONARQUBE.md, schema.sql, sonar-project.properties |
| **A04** | arquitectura-solucion-cafe-ia.mmd, README_proyecto.md |
| **A05** | ci.yml, vercel.json, railway_health_response.json, vercel_status.json |
| **A06** | npm_audit_*.txt, package*.json, package-lock_*.json |
| **A07** | npm_test_backend.txt, cypress_last-run.json, backend_env.example.txt |
| **A08** | ci.yml, package-lock_*.json, CORRECCIONES_SONARQUBE.md |
| **A09** | schema.sql (auditoria_logs), código auditMiddleware (revisión Paso 05) |
| **A10** | Revisión manual código (grep backend — sin fetch saliente) |

---

## 5. Resumen cuantitativo

| Métrica | Valor |
|---------|-------|
| Documentos planificación generados | 7 |
| Evidencias copiadas del proyecto | 22 |
| Evidencias pendientes | 7 |
| **Total ítems inventariados** | **36** |
| Cobertura evidencias disponibles | 75,0 % (27/36 con artefacto) |

---

## 6. Trazabilidad con pasos previos

| Fuente | Evidencias reutilizadas |
|--------|------------------------|
| `03_Auditor_Implementacion_FURPS/Evidencias/` | npm audit, tests, health, CI, Sonar, schema |
| `02_Ingenieria_Inversa/01_Analisis_de_Logs/Evidencias/` | Referencia cruzada logs (no duplicados) |
| `cafe-cursor/` (proyecto) | package.json, locks, README, .env.example, vercel.json, ci.yml |

---

## 7. Instrucciones para Paso 05

1. Actualizar este índice al incorporar evidencias pendientes.
2. Adjuntar capturas Postman/ZAP con nomenclatura `OWASP_A0X_*.png` o `.json`.
3. Marcar estado en checklist por cada evidencia utilizada.
4. Mantener copias inmutables; no modificar archivos en `cafe-cursor/`.

---

*Índice de evidencias — Planificador OWASP Paso 04 — CAFE-IA.*
