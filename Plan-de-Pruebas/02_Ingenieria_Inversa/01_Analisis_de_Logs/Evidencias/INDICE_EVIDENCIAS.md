# Índice de evidencias — Análisis de Logs

**Fecha de recopilación:** 2026-06-24  
**Proyecto:** CAFE-IA (Café Sostenible AI)

---

## Evidencias incorporadas (archivos reales)

| Archivo | Origen | Descripción |
|---------|--------|-------------|
| `npm_test_backend.txt` | Ejecución local `npm test` | Log completo tests backend (18/18 OK) |
| `npm_build_frontend.txt` | Ejecución local `npm run build` | Log build Vite producción |
| `npm_audit_backend.txt` | `npm audit` backend | Vulnerabilidades dependencias API |
| `npm_audit_frontend.txt` | `npm audit` frontend | Vulnerabilidades dependencias SPA |
| `npm_lint_frontend.txt` | `npm run lint` frontend | Errores y warnings ESLint |
| `railway_health_response.json` | GET producción Railway | Respuesta `/api/health` en vivo |
| `vercel_status.json` | GET producción Vercel | Estado HTTP frontend |
| `jmeter_resumen.json` | `Reporte-Calidad-Software/Reportes/` | Resumen prueba de carga |
| `resultado_jmeter.csv` | `Reporte-Calidad-Software/Evidencias/jmeter/` | Detalle 500 requests JMeter |
| `cypress_last-run.json` | `Reporte-Calidad-Software/Evidencias/cypress/` | Resultado E2E 13/13 OK |
| `hallazgos_sonar.md` | `Reporte-Calidad-Software/Evidencias/sonarqube/` | Hallazgos SonarCloud documentados |
| `CORRECCIONES_SONARQUBE.md` | `Reporte-Calidad-Software/Evidencias/sonarqube/` | Correcciones aplicadas |
| `disponibilidad_resultado.json` | `Reporte-Calidad-Software/Evidencias/metricas/` | Métricas disponibilidad |
| `backend_env.example.txt` | `cafe-cursor/backend/.env.example` | Variables de entorno referencia |
| `Matriz_Hallazgos.md` | Generado en este análisis | Matriz de hallazgos |
| `Matriz_Hallazgos.xlsx` | Generado en este análisis | Matriz exportable Excel |
| `Resumen_Ejecutivo.md` | Generado en este análisis | Síntesis para docente |

---

## Evidencias pendientes de incorporar

| ID | Tipo | Descripción |
|----|------|-------------|
| E-LOG-RAILWAY-01 | PNG / LOG | Captura panel Railway — logs crash loop `migrate.js:156` (histórico pre-fix) |
| E-LOG-RAILWAY-02 | PNG | Dashboard Railway — deploy exitoso post-commit `2f7ac27` |
| E-LOG-SONAR-01 | PNG | Quality Gate SonarCloud dashboard live |
| E-LOG-SONAR-02 | PNG | Issues SonarCloud (Bugs, Vulnerabilities, Code Smells) |
| E-LOG-CYPRESS-01 | PNG / MP4 | Screenshots/videos última ejecución Cypress (`testing/cypress/screenshots/`) |
| E-LOG-VERCEL-01 | PNG | Panel Vercel — build log último deploy |
| E-LOG-MYSQL-01 | LOG | Logs MySQL Railway (query slow log / connection errors) |
| E-LOG-PRISMA-01 | — | **No aplica** — el proyecto no utiliza Prisma |

> No se inventaron capturas. Los archivos listados arriba deben obtenerse manualmente del panel Railway, Vercel, SonarCloud o ejecutando Cypress localmente.
