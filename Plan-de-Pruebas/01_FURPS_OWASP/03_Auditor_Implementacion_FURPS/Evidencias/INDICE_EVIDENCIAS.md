# Índice de Evidencias — Implementación FURPS+ (Paso 03)

**Fecha:** 24 de junio de 2026

---

## Documentos generados

| Archivo | Descripción |
|---------|-------------|
| `01_Prompt.md` | Especificación Paso 03 |
| `02_Resultado_IA.md` | Informe verificación implementación |
| `03_Mejoras.md` | Plan IMP-H001 a IMP-H017 |
| `04_Conclusiones.md` | Conclusión académica |
| `Evidencias/Matriz_Implementacion_FURPS.md` / `.xlsx` | 30 ítems verificados |
| `Evidencias/Matriz_Hallazgos.md` / `.xlsx` | 17 hallazgos |
| `Evidencias/Checklist_Implementacion.md` | Checklist código |
| `Evidencias/Dashboard_Implementacion.md` | Dashboard áreas |
| `Evidencias/Comparativo_Diseno_vs_Implementacion.md` | Diseño vs código |
| `Evidencias/Resumen_Ejecutivo.md` | Resumen |
| `Evidencias/INDICE_EVIDENCIAS.md` | Este índice |

---

## Evidencias copiadas

| Archivo | Origen | Uso verificación |
|---------|--------|------------------|
| `README_proyecto.md` | cafe-cursor/README | Alcance |
| `schema.sql` | backend/sql | BD FK, fincas |
| `npm_test_backend.txt` | IR Paso 01 | IMP-Q01 |
| `npm_audit_*.txt` | IR Paso 01 | IMP-X01/X02 |
| `npm_lint_frontend.txt` | IR Paso 01 | IMP-F05 |
| `npm_build_frontend.txt` | IR Paso 01 | IMP-F07 |
| `railway_health_response.json` | IR Paso 01 | IMP-INF01, IMP-X04 |
| `vercel_status.json` | IR Paso 01 | IMP-INF02 |
| `cypress_last-run.json` | IR Paso 01 | IMP-Q02 |
| `jmeter_resumen.json` | IR Paso 01 | IMP-Q05 |
| `CORRECCIONES_SONARQUBE.md` | IR Paso 01 | IMP-Q03 |
| `backend_env.example.txt` | IR Paso 01 | Config |
| `ci.yml` | cafe-cursor | IMP-INF03/04, IMP-H002 |
| `vercel.json` | frontend | Despliegue |
| `sonar-project.properties` | cafe-cursor | Calidad |
| `arquitectura-solucion-cafe-ia.mmd` | IR Paso 05 | Arquitectura |

---

## Verificación código (referencia, no copiado)

| Archivo | Hallazgo |
|---------|----------|
| `LoteService.js` L97-122 | IMP-H001 sin TX |
| `lotes.routes.js` | IMP-H009 sin PUT/DELETE |
| `frontend/package.json` | IMP-H003 react-router |
| `vite.config.js` | IMP-P02 implementado |
| `env.js` | IMP-P01 implementado |

---

## Pendientes

| Evidencia | Estado |
|-----------|--------|
| Captura Sonar Quality Gate | Evidencia pendiente de incorporar |
| Capturas Railway/Vercel UI | Evidencia pendiente de incorporar |
| Videos Cypress | Evidencia pendiente de incorporar |
| JMeter escenarios negocio | Evidencia pendiente de incorporar |
| Métricas CPU/memoria Railway | Evidencia pendiente de incorporar |

---

## Referencias

- Paso 01: `01_Planificador_FURPS/`
- Paso 02: `02_Auditor_FURPS/`

---

## Veredicto

**77 % — Cumple parcialmente — 0 % remediación post-Paso 02**

---

*Índice Paso 03 — ICACIT.*
