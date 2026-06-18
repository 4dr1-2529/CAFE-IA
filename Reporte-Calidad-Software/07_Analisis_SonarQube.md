# 07 — Análisis SonarQube / SonarCloud

## 7.1 Configuración del proyecto

| Parámetro | Valor |
|-----------|-------|
| Plataforma | [SonarCloud](https://sonarcloud.io) |
| Organización | `4dr1-2529` |
| Project Key | `4dr1-2529_CAFE-IA` |
| Archivo config | `cafe-cursor/sonar-project.properties` |
| CI Job | `.github/workflows/ci.yml` → job `sonarcloud` |
| Quality Gate wait | `sonar.qualitygate.wait=true` |

### Fuentes analizadas

```properties
sonar.sources=frontend/src,backend/src
sonar.tests=backend/tests,testing/cypress/e2e
sonar.test.inclusions=**/*.test.js,**/*.cy.js
```

### Exclusiones

- `node_modules`, `dist`, `coverage`
- Videos/screenshots Cypress
- `ml/**`, `*.sql`, `backend/scripts/**`

## 7.2 Integración CI/CD

Pipeline en cada push/PR a `main`, `master`, `develop`:

1. **backend** — `npm test` (con `SKIP_INTEGRATION=1`)
2. **frontend** — `npm run build`
3. **sonarcloud** — análisis tras tests (requiere `SONAR_TOKEN`)
4. **dependency-audit** — `npm audit --audit-level=high`

Acciones GitHub fijadas por SHA completo (supply chain hardening).

## 7.3 Métricas SonarCloud — Estado de la información

> **Información no disponible en el repositorio:** Los valores numéricos actuales (Bugs, Vulnerabilities, Code Smells, Coverage %, Duplication %, Debt, Ratings A–E) deben obtenerse del dashboard SonarCloud tras el último análisis CI.

| Indicador | Valor en repo | Cómo obtenerlo |
|-----------|---------------|----------------|
| Quality Gate | Pendiente captura | https://sonarcloud.io/project/overview?id=4dr1-2529_CAFE-IA |
| Bugs | No embebido | Issues → Bugs |
| Vulnerabilidades | Referencia histórica: 2 crít, 1 alta, 1 media, 1 baja | Issues → Vulnerabilities |
| Code Smells | No embebido | Issues → Code Smells |
| Security Hotspots | No embebido | Security tab |
| Cobertura | No configurada (sin lcov report) | Measures → Coverage |
| Duplicación | No embebido | Measures → Duplicated Lines |
| Complejidad ciclomática | Objetivo documentado | Measures → Complexity |
| Maintainability Rating | No embebido | Overview |
| Reliability Rating | No embebido | Overview |
| Security Rating | No embebido | Overview |
| Technical Debt | No embebido | Measures → Debt |

## 7.4 Hallazgos conocidos y correcciones aplicadas

Según `docs/sonarqube/CORRECCIONES_SONARQUBE.md` (actualizado 2026-06-03):

| # | Hallazgo | Severidad | Archivo | Estado |
|---|----------|-----------|---------|--------|
| 1 | SQL injection potencial | Crítica | ReportesRepository.js | **Corregido** — reportesSql.js estático |
| 2 | Leakage variables env | Crítica | vite.config.js | **Corregido** — solo VITE_* |
| 3 | uuid vulnerable | Media | package.json | **Corregido** — override ^11.1.1 |
| 4 | joblib DoS | Baja | ml/requirements.txt | **Corregido** — >=1.5.3 |
| 5 | GitHub Actions sin SHA | Alta | ci.yml | **Corregido** |
| 6 | tmp path traversal | Alta | backend/package.json | **Corregido** — override tmp |
| 7 | JWT secret hardcodeado | Alta | env.js | **Corregido** |
| 8 | Password admin en migrate | Alta | migrate.js | **Corregido** — ADMIN_SEED_PASSWORD |
| 9 | SSL rejectUnauthorized | Media | database.js, pool.js | **Corregido** — env control |
| 10 | ReDoS regex email | Media | validators | **Corregido** — inputValidation.js |
| 11 | Claves duplicadas reportes | Bug | reportesResponse.js | **Corregido** |
| 12 | Lógica redundante export | Bug | ReportesService.js | **Corregido** |
| 13 | Aserción tautológica test | Bug | prediction.test.js | **Corregido** |
| 14 | JWT dev / execSync shell | Alta | env.js, dbDocGenerator | **Corregido** |
| 15 | SQL DDL migrate | Alta | migrate.js | **Corregido** (parcial — ver error sintaxis actual) |
| 16 | auditDesc sin uso | Bug | ReportesService.js | **Corregido** |

## 7.5 Code Smells y complejidad (análisis cualitativo del código)

Basado en revisión estática y `AUDITORIA_TECNICA.md`:

| Área | Observación | Severidad estimada |
|------|-------------|-------------------|
| Hexagonal incompleta | Reportes/Producción fuera de patrón repository | Major |
| Duplicidad rutas | `/api/evaluaciones` = `/api/control-calidad` | Minor |
| Archivos no usados | `frontend/src/domain/entities.js`, `Card.jsx` | Minor |
| Chatbot handlers | Múltiples archivos scoring/handlers — complejidad moderada | Info |
| migrate.js | Error sintaxis línea 156 — **bloqueante tests** | Blocker |

## 7.6 Cobertura de pruebas (Sonar perspective)

| Tipo | Archivos test | Incluido en sonar.tests |
|------|---------------|-------------------------|
| Node unit/integration | 6 × `.test.js` | Sí |
| Cypress E2E | 11 × `.cy.js` | Sí (como tests) |
| Reporte lcov | **No existe** | No |

**Deuda:** SonarCloud no recibe reporte de cobertura de líneas (`sonar.javascript.lcov.reportPaths` no configurado). La estrategia real del proyecto prioriza E2E Cypress + tests unitarios de dominio.

## 7.7 Duplicación

No hay métrica exportada. Duplicación conocida:

- Rutas calidad duplicadas (`evaluaciones` / `control-calidad`)
- Conceptos duplicados en schema (`control_calidad` / `evaluaciones_calidad`)

## 7.8 Recomendaciones SonarQube

1. **Capturar dashboard** post-push a main con `SONAR_TOKEN` activo — adjuntar en `Evidencias/`.
2. **Configurar lcov** opcional: `c8` o `nyc` en backend tests para medir cobertura.
3. **Corregir migrate.js:156** y re-ejecutar análisis — error actual impide tests que cargan app.
4. **Re-escaneo** tras corrección para confirmar Quality Gate OK.
5. Documentar en informe que **cobertura E2E no sustituye** cobertura de líneas para Sonar.

## 7.9 Enlaces

- Overview: https://sonarcloud.io/project/overview?id=4dr1-2529_CAFE-IA
- Issues: https://sonarcloud.io/project/issues?id=4dr1-2529_CAFE-IA
- Documentación proyecto: `cafe-cursor/docs/SONARCLOUD.md`
- **Artefactos copiados en reporte:** `Reportes/sonarqube_correcciones.md`, `Reportes/sonarqube_reporte.md`, `Evidencias/sonarqube/`
