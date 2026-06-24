# Matriz de Hallazgos — Análisis de Logs CAFE-IA

**Fecha:** 2026-06-24  
**Analista:** IA (Ingeniería Inversa — Paso 1)  
**Versión sistema:** backend 2.0.0 · frontend 1.0.3

| ID | Componente | Hallazgo | Evidencia | Causa | Impacto | Recomendación | Prioridad |
|----|------------|----------|-----------|-------|---------|---------------|-----------|
| LOG-01 | Railway / Backend | SyntaxError `migrate.js:156` — crash loop en despliegue | Logs Railway históricos; `Unexpected identifier 'VALUES'` | SQL seeds concatenados en refactor SonarCloud | API caída, 0 % disponibilidad | Corregido en commit `2f7ac27`; monitorear deploy | **Crítico** *(resuelto)* |
| LOG-02 | Railway / npm | `npm warn config production Use --omit=dev instead` | Logs despliegue Railway | Flag npm legacy en build | Bajo — no bloquea | Usar `npm ci --omit=dev` en Railway | **Bajo** |
| LOG-03 | Backend / MySQL | `ADMIN_SEED_PASSWORD` no definido omite admin | `migrate.js:130` console.warn | Variable ausente en entorno | Sin usuario admin inicial en prod | Definir en Railway | **Alto** |
| LOG-04 | CI / GitHub Actions | `SKIP_INTEGRATION=1` omite tests integración | `.github/workflows/ci.yml` | Sin MySQL en runner CI | Regresiones API no detectadas en CI | MySQL service container en CI | **Medio** |
| LOG-05 | npm / Backend | `form-data` HIGH + `dompurify` moderate | `npm_audit_backend.txt` | Dependencias transitivas | Riesgo supply chain | `npm audit fix` | **Medio** |
| LOG-06 | npm / Frontend | 6 CVEs (esbuild, react-router, js-yaml, @babel/core) | `npm_audit_frontend.txt` | Versiones en lockfile | Dev server / open redirect | Actualizar dependencias | **Medio** |
| LOG-07 | Frontend / ESLint | 2 errores lint bloqueantes | `npm_lint_frontend.txt` | Config ESLint incompleta | Lint no usable | Corregir `.eslintrc` | **Medio** |
| LOG-08 | Frontend / ESLint | 187 warnings `no-unused-vars` | `npm_lint_frontend.txt` | JSX imports mal detectados | Ruido en análisis estático | `jsx-uses-vars` / react plugin | **Bajo** |
| LOG-09 | SonarCloud | Métricas live no en repositorio | `hallazgos_sonar.md` | Dashboard externo | Evidencia incompleta | Capturar Quality Gate | **Medio** |
| LOG-10 | SonarCloud | Sin reporte lcov cobertura | `07_Analisis_SonarQube.md` | Sin instrumentación tests | Cobertura 0 % en Sonar | Configurar `c8`/`nyc` | **Medio** |
| LOG-11 | Cypress / CI | E2E no ejecutado en pipeline | `ci.yml` sin job Cypress | Stack complejo (3 servicios) | Regresiones UI en push | Integrar Cypress en CI | **Alto** |
| LOG-12 | Cypress | Excepciones ignoradas (ResizeObserver, ChunkLoadError) | `testing/cypress/support/e2e.js` | Errores benignos HMR | Puede ocultar bugs | Documentar excepciones | **Bajo** |
| LOG-13 | JMeter / Rendimiento | P95 = 2614 ms (cerca límite 2 s) | `jmeter_resumen.json` | Cold start / latencia Railway | Picos bajo carga | Warm-up, escalar plan | **Medio** |
| LOG-14 | JMeter | Solo endpoint `/api/health` | `resultado_jmeter.csv` | Alcance prueba limitado | No representa APIs negocio | Ampliar escenarios autenticados | **Medio** |
| LOG-15 | CI / npm audit | `continue-on-error: true` en audit | `ci.yml` | Política permisiva | CVE high no bloquean merge | Fallar en audit-level=high | **Medio** |
| LOG-16 | API / Seguridad | Health expone `dbHost` interno Railway | `railway_health_response.json` | Diseño endpoint health | Info infra en respuesta pública | Reducir detalle público | **Bajo** |
| LOG-17 | Backend / MySQL | Seeds fallidos solo generan warning | `migrate.js` logSeedWarning | catch silencioso en INSERT | BD parcialmente sembrada | Fail-fast en seeds críticos | **Medio** |
| LOG-18 | Stack | Prisma no utilizado (solicitado en prompt) | Búsqueda repo: 0 refs | Stack usa mysql2 nativo | N/A — no es error | Documentar ORM real | **Informativo** |
| LOG-19 | Frontend / Build | Chunk Recharts 411 KB (gzip 110 KB) | `npm_build_frontend.txt` | Bundle charts pesado | Carga inicial lenta | Code-splitting adicional | **Bajo** |
| LOG-20 | Railway / API | Servicio operativo post-fix | `railway_health_response.json` HTTP 200 | migrate.js corregido | Positivo — prod OK | Monitorear 48 h | **Informativo** |
| LOG-21 | Backend / Tests | 18/18 tests OK localmente | `npm_test_backend.txt` | MySQL local + migrate OK | Confianza en regresión local | Mantener en pre-push | **Informativo** |
| LOG-22 | Cypress | 13/13 E2E OK (2026-05-28) | `cypress_last-run.json` | Stack local completo | Funcionalidad validada manual | Re-ejecutar y actualizar JSON | **Informativo** |
| LOG-23 | JWT / Auth | 401 sin token confirmado en tests | `npm_test_backend.txt` | RBAC middleware activo | Seguridad baseline OK | Mantener tests auth | **Informativo** |
| LOG-24 | Vercel | Frontend HTTP 200 | `vercel_status.json` | Deploy SPA OK | Acceso público OK | — | **Informativo** |
| LOG-25 | Variables entorno | JWT_SECRET obligatorio ≥32 chars | `backend_env.example.txt`, `env.js` | Validación en arranque | Previene deploy inseguro | Mantener validación | **Informativo** |
