# Métricas de calidad — Semana 10

**Proyecto:** CAFE-IA · Café Sostenible AI  
**Fuentes:** Cypress, Node test, SonarCloud CI, documentación en `docs/SONARCLOUD.md` y `docs/sonarqube/CORRECCIONES_SONARQUBE.md`

## Definición de métricas

| Métrica | Herramienta |
|---|---|
| Cobertura pruebas | Cypress |
| Vulnerabilidades | SonarQube Cloud |
| Bugs críticos | SonarQube Cloud |
| Maintainability Index | SonarQube Cloud |
| Duplicación código | SonarQube Cloud |

## Resultados reales versionados en el repositorio

### Cypress (E2E funcional)

| Indicador | Valor | Fuente |
|-----------|-------|--------|
| Specs ejecutados | 11 (`PF-01` … `PF-11`) | `testing/cypress/e2e/` |
| Tests totales | 13 | `testing/cypress/evidencias/reports/last-run.json` |
| Passed | 13 | Idem — 2026-05-28 |
| Failed | 0 | Idem |
| Base URL | `http://localhost:5174` | Idem |

### Backend (unitarias + integración)

| Indicador | Valor | Fuente |
|-----------|-------|--------|
| Archivos de test | 6 | `backend/tests/` |
| Tests Node (`npm test`) | 18 passed / 0 failed | Suite documentada en `README.md` y `EvidenciasPMVPage.jsx` |

### SonarQube Cloud

| Indicador | Valor | Notas |
|-----------|-------|-------|
| Proyecto | `4dr1-2529_CAFE-IA` | `sonar-project.properties` |
| Dashboard | https://sonarcloud.io/project/overview?id=4dr1-2529_CAFE-IA | Requiere `SONAR_TOKEN` en CI |
| Security / Reliability / Maintainability / Duplicación / Issues | **No versionados en el repo** | Consultar dashboard tras cada push a `main` |

> Los ratings (Security B, Reliability C, etc.) y el conteo de issues **no están exportados** en archivos del repositorio. Tras los commits de corrección SonarQube (`fix: sonarqube issues…`, refactors de complejidad), el conteo debe verificarse en SonarCloud.

Correcciones documentadas en repo: `docs/sonarqube/CORRECCIONES_SONARQUBE.md` (SQL estático, vite env, uuid, CI SHA pinning, etc.).

### JMeter / pruebas de carga

Fuente: `testing/metricas/resultados_resumen.json` y `testing/metricas/jmeter/resultado_jmeter.csv` — ejecución 2026-05-28 contra `GET /api/health` (Railway, 500 requests, 50 usuarios concurrentes).

| Indicador | Valor | Fuente |
|-----------|-------|--------|
| Tiempo promedio API | **443,05 ms** | `resultados_resumen.json` |
| Requests por minuto | **6 320 rpm** | Idem |
| Error | **0 %** (0 fallidos / 500) | Idem |
| Disponibilidad | **100 %** | `grafana/disponibilidad_resultado.json` |
| Tiempo mínimo | 182 ms | `resultados_resumen.json` |
| Tiempo máximo | 2 699 ms | Idem |
| P95 | 2 614 ms | Idem |

Script de regeneración: `npm run metricas` → `testing/metricas/scripts/generar_metricas.js`  
Reporte consolidado: [`../metricas/REPORTE_METRICAS_ARQUITECTURA_RENDIMIENTO.md`](../metricas/REPORTE_METRICAS_ARQUITECTURA_RENDIMIENTO.md)

## CI (`.github/workflows/ci.yml`)

1. Tests backend (`npm test`)
2. Build frontend (`npm run build`)
3. SonarCloud Analysis (con `SONAR_TOKEN`)

## Comandos de verificación local

```bash
# E2E
npm run test:e2e

# Backend
cd backend && npm test

# Build frontend
cd frontend && npm run build
```
