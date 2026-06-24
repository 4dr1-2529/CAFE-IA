# Índice de Evidencias — Paso 2 Dependencias

**Fecha:** 2026-06-24

---

## Evidencias incorporadas (archivos reales)

| Archivo | Origen | Descripción |
|---------|--------|-------------|
| `backend_package.json` | `cafe-cursor/backend/package.json` | Manifiesto dependencias API |
| `backend_package-lock.json` | `cafe-cursor/backend/package-lock.json` | Lockfile backend |
| `frontend_package.json` | `cafe-cursor/frontend/package.json` | Manifiesto dependencias SPA |
| `frontend_package-lock.json` | `cafe-cursor/frontend/package-lock.json` | Lockfile frontend |
| `monorepo_package.json` | `cafe-cursor/package.json` | Cypress, cross-env |
| `monorepo_package-lock.json` | `cafe-cursor/package-lock.json` | Lockfile raíz |
| `npm_list_backend.json` | `npm list --depth=0` backend | Versiones resueltas |
| `npm_list_frontend.json` | `npm list --depth=0` frontend | Versiones resueltas |
| `npm_list_monorepo.json` | `npm list --depth=0` raíz | Versiones resueltas |
| `npm_audit_backend.json` | `npm audit --json` backend | CVE backend |
| `npm_audit_frontend.json` | `npm audit --json` frontend | CVE frontend |
| `npm_audit_backend.txt` | Paso 1 / re-copia | Audit legible backend |
| `npm_audit_frontend.txt` | Paso 1 / re-copia | Audit legible frontend |
| `sonar-project.properties` | `cafe-cursor/sonar-project.properties` | Config SonarCloud |
| `ml_requirements.txt` | `cafe-cursor/ml/requirements.txt` | Deps Python ML |
| `hallazgos_sonar.md` | Reporte-Calidad-Software | Hallazgos Sonar |
| `cypress_last-run.json` | Reporte-Calidad-Software | E2E 13/13 |
| `jmeter_resumen.json` | Reporte-Calidad-Software | Carga health |

## Documentos generados en este paso

| Archivo | Descripción |
|---------|-------------|
| `Matriz_Dependencias.md` | Matriz 42 entradas DEP-001–042 |
| `Matriz_Dependencias.xlsx` | Misma matriz Excel |
| `Inventario_Dependencias.md` | Listado completo directas |
| `Dependencias_Backend.md` | Ficha técnica backend |
| `Dependencias_Frontend.md` | Ficha técnica frontend |
| `Dependencias_Herramientas.md` | Cypress, JMeter, Sonar, PaaS |
| `Resumen_Ejecutivo.md` | Síntesis ICACIT |

---

## Evidencias pendientes de incorporar

| ID | Descripción |
|----|-------------|
| E-DEP-SONAR-01 | Captura PNG dashboard SonarCloud — Quality Gate y métricas live |
| E-DEP-SBOM-01 | Export SBOM formal (CycloneDX) — no generado en repositorio |
| E-DEP-DEPENDABOT-01 | Reporte Dependabot/GitHub — no verificado en repo |
| E-DEP-RAILWAY-01 | Captura panel Railway — versiones Node runtime desplegado |
| E-DEP-VERCEL-01 | Log build Vercel con versiones Node/npm usadas en deploy |
| E-DEP-NPM-OUTDATED-01 | Salida `npm outdated` — no archivada en repositorio |

> No se inventaron capturas ni reportes inexistentes.
