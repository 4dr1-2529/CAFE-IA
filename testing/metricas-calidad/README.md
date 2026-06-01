# Métricas de calidad — CAFE-IA

**Proyecto:** Café Sostenible AI · Semana 10  
**Última actualización:** 2026-05-31

---

## 1. Definición

| Métrica | Herramienta |
|---|---|
| Cobertura pruebas | Cypress |
| Vulnerabilidades | SonarQube Cloud |
| Bugs críticos | SonarQube Cloud |
| Maintainability Index | SonarQube Cloud |
| Duplicación código | SonarQube Cloud |

---

## 2. Resultados reales

### SonarQube Cloud

**Proyecto:** `4dr1-2529_CAFE-IA` · **Consulta API:** 2026-05-31  
**Dashboard:** https://sonarcloud.io/project/overview?id=4dr1-2529_CAFE-IA

| Métrica | Resultado |
|---|---|
| Quality Gate | **OK** |
| Security | **A** (rating 1.0) |
| Reliability | **C** (rating 3.0) |
| Maintainability | **A** (sqale_rating 1.0) |
| Duplications | **2,6 %** |
| Bugs | **6** |
| Vulnerabilities | **0** |
| Code Smells | **271** |
| Issues (bugs + smells + vulns) | **277** |
| Líneas de código (ncloc) | **16 969** |

### JMeter / carga API

**Fuente:** `testing/metricas/resultados_resumen.json` · **Fecha:** 2026-05-28  
**Endpoint:** `GET /api/health` (Railway producción) · **500 requests**, 50 usuarios concurrentes

| Métrica | Resultado |
|---|---|
| Tiempo promedio API | **443,05 ms** |
| Requests por minuto | **6 320 rpm** |
| Disponibilidad | **100 %** (500/500 exitosos) |
| Error Rate | **0 %** (0 fallidos) |
| Tiempo mínimo | 182 ms |
| Tiempo máximo | 2 699 ms |
| P95 | 2 614 ms |

### Cypress (pruebas funcionales E2E)

**Fuente:** `testing/cypress/evidencias/reports/last-run.json` · **Fecha:** 2026-05-28

| Métrica | Resultado |
|---|---|
| Specs ejecutados | 11 (PF-01 … PF-11) |
| Tests totales | 13 |
| Passed | **13** |
| Failed | **0** |
| Tasa éxito | **100 %** |

### Backend (unitarias + integración)

**Fuente:** `backend/tests/` (6 archivos) · documentado en `HistoriasUsuarioPage.jsx`

| Métrica | Resultado |
|---|---|
| Tests Node (`npm test`) | **18 passed / 0 failed** |

---

## 3. Interpretación

- **SonarQube Cloud:** El Quality Gate está en **OK**. Security y Maintainability en **A** indican buena postura de seguridad (0 vulnerabilidades abiertas) y deuda técnica controlada. **Reliability C** refleja **6 bugs** abiertos detectados por análisis estático; conviene priorizar su corrección. **Duplicación 2,6 %** está en rango aceptable. Los refactors documentados en `docs/sonarqube/CORRECCIONES_SONARQUBE.md` (SQL estático, SHA pinning CI, overrides npm) contribuyen a la mejora respecto a análisis anteriores.
- **JMeter:** La API en Railway cumple objetivos del proyecto: tiempo medio **< 2 s**, **> 300 rpm** y **disponibilidad ≥ 99 %**. Evidencia CSV: `testing/metricas/jmeter/resultado_jmeter.csv`.
- **Cypress + backend:** **31 pruebas automatizadas** verificadas (13 E2E + 18 Node) sin fallos en la última ejecución registrada. No hay reporte de cobertura de líneas (Istanbul) versionado; la métrica de cobertura operativa es **tasa de éxito de suites** documentadas.

---

## Archivos utilizados

| Archivo | Uso |
|---------|-----|
| API SonarCloud `measures/component` | Ratings Security, Reliability, Maintainability, duplicación, bugs |
| `sonar-project.properties` | Configuración del proyecto |
| `testing/metricas/resultados_resumen.json` | JMeter / script `generar_metricas.js` |
| `testing/metricas/jmeter/resultado_jmeter.csv` | Detalle por request |
| `testing/cypress/evidencias/reports/last-run.json` | Resultados Cypress |
| `backend/tests/*.test.js` | Suite unitaria e integración |
| `docs/sonarqube/CORRECCIONES_SONARQUBE.md` | Contexto de correcciones |

## Resumen

| Tipo | Detalle |
|------|---------|
| **Obtenidas de SonarCloud (API)** | Security A, Reliability C, Maintainability A, Duplications 2,6 %, 277 issues, QG OK |
| **Obtenidas de JMeter** | 443 ms, 6 320 rpm, 100 % disponibilidad, 0 % error |
| **Obtenidas de Cypress/backend** | 13/13 E2E, 18/18 Node tests |
| **No versionadas en repo** | Cobertura de líneas (% LOC); export JSON Sonar en CI |
