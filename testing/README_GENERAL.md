# Testing — CAFE-IA · Semana 10

Índice de entregables de pruebas y métricas del proyecto **Café Sostenible AI**.

## Cuadros Semana 10

| # | Cuadro | Documento |
|---|--------|-----------|
| 1 | Pruebas funcionales PMV 1 y PMV 2 | [pruebas-funcionales-pmv/README.md](./pruebas-funcionales-pmv/README.md) |
| 2 | Métricas de Machine Learning | [metricas-machine-learning/README.md](./metricas-machine-learning/README.md) |
| 3 | Métricas ágiles | [metricas-agiles/README.md](./metricas-agiles/README.md) |
| 4 | Métricas de calidad | [metricas-calidad/README.md](./metricas-calidad/README.md) |

## Pruebas automatizadas existentes

| Tipo | Ubicación | Comando |
|------|-----------|---------|
| E2E Cypress (11 specs) | `testing/cypress/e2e/PF-*.cy.js` | `npm run test:e2e` |
| Backend Node test (6 archivos) | `backend/tests/` | `cd backend && npm test` |
| SonarCloud | `sonar-project.properties` | CI GitHub Actions |
| ML evidencia Python | `ml/train_model.py` | `cd ml && python train_model.py` |

## Documentación relacionada

- [cypress/README_PRUEBAS_FUNCIONALES.md](./cypress/README_PRUEBAS_FUNCIONALES.md) — guía operativa Cypress
- [../docs/MATRIZ_PRUEBAS_HU.md](../docs/MATRIZ_PRUEBAS_HU.md) — matriz HU ↔ tests backend
- [../docs/SONARCLOUD.md](../docs/SONARCLOUD.md) — configuración SonarCloud
- [../docs/EDT_SCRUM_GANTT.md](../docs/EDT_SCRUM_GANTT.md) — sprints y EDT

## Producción

| Entorno | URL |
|---------|-----|
| Frontend (Vercel) | https://cafe-ia-inky.vercel.app |
| API (Railway) | https://cafe-sostenible-api-production-03ad.up.railway.app/api/health |
