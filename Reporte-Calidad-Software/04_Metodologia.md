# 04 — Metodología

## 4.1 Enfoque general

Se aplicó un proceso de **auditoría de calidad basada en evidencia** combinando:

1. **Revisión estática de código** — frontend, backend, SQL, configuración
2. **Análisis documental** — README, DOCUMENTACION_TECNICA, AUDITORIA_TECNICA, PMV2, SONARCLOUD
3. **Ejecución de pruebas** — `npm test` backend (entorno local)
4. **Análisis de artefactos de prueba** — Cypress last-run.json, JMeter CSV, specs E2E
5. **Evaluación FURPS+** — criterios funcionales y no funcionales
6. **Evaluación OWASP Top 10** — controles de seguridad implementados
7. **Revisión SonarCloud** — configuración CI y registro de correcciones

## 4.2 Fuentes de evidencia

| Fuente | Ubicación | Uso |
|--------|-----------|-----|
| Código backend | `cafe-cursor/backend/src/` | Rutas, middleware, servicios, seguridad |
| Código frontend | `cafe-cursor/frontend/src/` | UX, rutas, auth client-side |
| Esquema BD | `backend/sql/schema.sql` | Conteo tablas/FK, integridad |
| Tests unitarios | `backend/tests/*.test.js` | Confiabilidad lógica de negocio |
| Tests E2E | `testing/cypress/e2e/PF-*.cy.js` | Flujos funcionales UI |
| Reporte Cypress | `testing/cypress/evidencias/reports/last-run.json` | Resultados última ejecución |
| JMeter | `testing/metricas/jmeter/` | Rendimiento API health |
| Sonar | `sonar-project.properties`, `docs/sonarqube/` | Calidad estática |
| CI | `.github/workflows/ci.yml` | Pipeline automatizado |

## 4.3 Herramientas

| Herramienta | Versión / config | Propósito |
|-------------|------------------|-----------|
| Node.js test runner | `node --test` | Tests backend |
| Cypress | 13.17.0 | E2E frontend |
| Apache JMeter | Plan 5.6+ (`prueba_500_requests.jmx`) | Carga 500 requests |
| SonarCloud | Proyecto `4dr1-2529_CAFE-IA` | Análisis estático CI |
| npm audit | CI workflow | Dependencias vulnerables |
| ESLint / Prettier | frontend devDeps | Estilo frontend (no ejecutado en este reporte) |

## 4.4 Criterios de evaluación FURPS+

Para cada criterio se documenta:

- **Descripción** — qué se evalúa
- **Estado actual** — implementación verificada
- **Evidencia** — archivos, endpoints, tests
- **Hallazgos** — gaps o deuda
- **Nivel de cumplimiento** — Alto / Medio / Bajo / Parcial
- **Recomendaciones** — acciones sin modificar el sistema

Escala de cumplimiento:

| Nivel | Definición |
|-------|------------|
| Alto (Cumple) | Implementado, probado o documentado con evidencia sólida |
| Medio (Parcial) | Implementado con gaps conocidos o cobertura incompleta |
| Bajo (No cumple) | Ausente o con fallos verificados |

## 4.5 Criterios OWASP

Evaluación alineada a OWASP Top 10 (2021) adaptada al stack Node/React:

- Inyección SQL, XSS, CSRF
- Autenticación y control de acceso rotos
- Configuración incorrecta de seguridad
- Componentes vulnerables
- Fallos de registro y monitoreo

Para cada ítem: Estado, Evidencia, Riesgo, Impacto, Recomendación.

## 4.6 Limitaciones metodológicas

1. **SonarCloud:** métricas numéricas (bugs, smells, coverage %) no están embebidas en el repo; deben obtenerse del dashboard post-CI.
2. **Postman:** no hay colección versionada; el inventario API se derivó de archivos `*.routes.js`.
3. **Tests backend HTTP:** 3 de 6 suites fallan localmente por `SyntaxError` en `migrate.js:156` — hallazgo registrado, no corregido (restricción de no modificar sistema).
4. **JMeter:** prueba limitada a `GET /api/health` sin autenticación; no representa carga de endpoints de negocio.
5. **Cypress en CI:** pipeline actual no ejecuta E2E; resultados basados en ejecución local documentada.

## 4.7 Roles del análisis

| Rol | Actividad |
|-----|-----------|
| Arquitecto de Software | Estructura hexagonal, modularidad, escalabilidad |
| QA Engineer | Matrices de prueba, Cypress, casos HU |
| Auditor de Calidad | FURPS+, trazabilidad requisitos-evidencia |
| Especialista OWASP | Seguridad JWT, CORS, validación, dependencias |
