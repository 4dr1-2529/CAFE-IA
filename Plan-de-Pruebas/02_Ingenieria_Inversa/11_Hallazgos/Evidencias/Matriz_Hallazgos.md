# Matriz de Hallazgos Consolidados — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Origen:** Consolidación Pasos 1–10 Ingeniería Inversa  
**Sin duplicación:** hallazgos equivalentes fusionados en un único ID

---

| ID | Categoría | Hallazgo | Evidencia | Riesgo | Impacto | Prioridad | Estado | Recomendación |
|----|-----------|----------|-----------|--------|---------|-----------|--------|---------------|
| HAL-001 | Infraestructura | Crash Railway por SyntaxError en `migrate.js` (seeds SQL) | Paso 01 LOG-01; commit `2f7ac27`; health 200 actual | Crítico | API caída 0 % uptime | Crítica | **Corregido** | Monitorear deploys; tests migrate en CI |
| HAL-002 | Configuración | `ADMIN_SEED_PASSWORD` ausente omite usuario admin en prod | Paso 01 LOG-03; `migrate.js`; Paso 10 ENV-M03 | Alto | Sin acceso admin inicial | Alta | Pendiente | Definir variable segura en Railway |
| HAL-003 | Base de Datos | `LoteService.create` sin transacción SQL (lote+trazabilidad+inventario) | Pasos 5 ARQ-13, 6 EVAL-01, 7 REF-01 | Crítico | Inconsistencia BD en fallo parcial | Crítica | Pendiente | BEGIN/COMMIT MySQL |
| HAL-004 | Arquitectura | SQL inline en `PredictionService` (bypass repository) | Pasos 5 ARQ-01, 6 EVAL-03, 7 REF-02 | Medio | Violación hexagonal | Alta | Pendiente | Completar PrediccionRepository |
| HAL-005 | Dominio / BD | Tabla `fincas` sin API ni UI; ubicación en `productores.parcela` | Pasos 3 FUNC-01, 5 ARQ-05, 8 DOM-M01 | Medio | Trazabilidad geográfica incompleta | Alta | Pendiente | CRUD fincas + `finca_id` en lotes |
| HAL-006 | Dominio / BD | 39 tablas en schema vs ~14 entidades operativas en app | Paso 8 Inventario; DOM-M15 | Alto | Deuda modelo, mantenibilidad | Alta | Pendiente | Implementar o deprecar tablas huérfanas |
| HAL-007 | Seguridad | Tablas `permisos`/`rol_permisos` en seeds sin enforcement | Pasos 3 FUNC-03, 5 ARQ-14, 8 DOM-M02 | Medio | RBAC granular ficticio | Media | Pendiente | Activar RBAC o eliminar tablas |
| HAL-008 | Backend | Lotes sin PUT/DELETE en API | Pasos 3 FUNC-02, 8 DOM-M04 | Medio | Errores irreversibles sin SQL manual | Alta | Pendiente | Edición/soft-delete con auditoría |
| HAL-009 | Machine Learning | `ml/train_model.py` no integrado; runtime usa `PredictionEngine` heurístico | Pasos 3 FUNC-06, 4 TEC-M12, 8 DOM-M07 | Medio | Expectativa IA vs realidad | Media | Pendiente | Integrar ML o renombrar «estimación heurística» |
| HAL-010 | DevOps | Cypress E2E (11 specs) no ejecutado en GitHub Actions | Pasos 1 LOG-11, 2 M-DEP-06, 9 ENT-M04 | Alto | Regresiones UI en merge | Alta | Pendiente | Job CI con stack dockerizado |
| HAL-011 | DevOps | `SKIP_INTEGRATION=1` omite tests integración en CI | Pasos 1 LOG-04, 4 TEC-M04, 6 EVAL-07 | Medio | Regresiones API no detectadas | Media | Pendiente | MySQL service container en workflow |
| HAL-012 | Dependencias | CVE HIGH `form-data` (transitiva backend) | Pasos 1 LOG-05, 2 M-DEP-01; `npm_audit_backend.txt` | Medio | Supply chain | Media | Pendiente | `npm audit fix` backend |
| HAL-013 | Seguridad / Dependencias | CVE `react-router-dom` open redirect moderate | Pasos 2 M-DEP-02, 4 TEC-M01, 6 EVAL-05 | Medio | Phishing vía redirect | Alta | Pendiente | Actualizar a ≥6.30.4 |
| HAL-014 | Dependencias | CVE `esbuild`/`vite` dev server leak | Pasos 1 LOG-06, 2 M-DEP-04 | Medio | Solo entorno dev | Media | Pendiente | Upgrade Vite; no exponer dev público |
| HAL-015 | Dependencias | CVE frontend adicionales (js-yaml, @babel/core) | Paso 1 LOG-06; `npm_audit_frontend.txt` | Bajo-Medio | DoS dev / build | Media | Pendiente | `npm audit fix` frontend |
| HAL-016 | DevOps | `continue-on-error: true` en job npm audit CI | Pasos 1 LOG-15, 4 TEC-M05, 9 ENT-M18 | Medio | CVE high en merge | Media | Pendiente | Fallar CI en audit-level=high |
| HAL-017 | Frontend / Calidad | ESLint: 2 errores bloquean lint | Paso 1 LOG-07; `npm_lint_frontend.txt` | Bajo | Calidad estática bloqueada | Media | Pendiente | Corregir config ErrorBoundary/react-hooks |
| HAL-018 | Calidad | SonarCloud Quality Gate sin captura en evidencias repo | Pasos 1 LOG-09, 4 TEC-M07 | Bajo | Informe ICACIT incompleto | Media | Pendiente | Exportar dashboard post-CI |
| HAL-019 | Calidad | Cobertura SonarCloud 0 % (sin lcov) | Pasos 1 LOG-10, 4 TEC-M08, 6 EVAL-13 | Medio | Deuda testing invisible | Media | Pendiente | Instrumentar c8 + `lcov.reportPaths` |
| HAL-020 | Rendimiento | JMeter solo prueba `GET /api/health` | Pasos 1 LOG-14, 4 TEC-M06, 9 ENT-M12 | Medio | Falsa confianza rendimiento | Media | Pendiente | Escenarios login+lotes+dashboard JWT |
| HAL-021 | Rendimiento | JMeter P95 ≈ 2614 ms (cerca límite 2 s) | Paso 1 LOG-13; `jmeter_resumen.json` | Medio | Picos latencia bajo carga | Media | Pendiente | Warm-up; revisar plan Railway |
| HAL-022 | Seguridad | `/api/health` expone `dbHost` interno | Pasos 1 LOG-16, 4 TEC-M14; `railway_health_response.json` | Bajo | Reconocimiento infra | Baja | Pendiente | Reducir campos respuesta pública |
| HAL-023 | Backend | Seeds fallidos solo generan warning (`logSeedWarning`) | Paso 1 LOG-17 | Medio | BD parcialmente sembrada | Media | Pendiente | Fail-fast en seeds críticos |
| HAL-024 | Frontend / Rendimiento | Chunk Recharts ~411 KB (gzip 110 KB) | Pasos 1 LOG-19, 4 TEC-M09; `npm_build_frontend.txt` | Bajo | LCP dashboard lento | Baja | Pendiente | Dynamic import en DashboardPage |
| HAL-025 | Infraestructura | Sin Docker/docker-compose en repositorio | Pasos 4 TEC-M11, 5 ARQ-11, 9 ENT-M03 | Medio | Entornos no reproducibles | Media | Pendiente | docker-compose dev API+MySQL+FE |
| HAL-026 | Infraestructura | Sin `railway.json` / IaC Railway | Pasos 9 ENT-M02, 10 ENV-M12 | Medio | Config manual no reproducible | Media | Pendiente | Documentar panel o railway.toml |
| HAL-027 | DevOps | Sin CD automático GitHub → Railway/Vercel | Paso 9 ENT-M05 | Medio | Despliegues manuales | Media | Pendiente | Workflow deploy en merge main |
| HAL-028 | Configuración / Seguridad | Gestión manual `JWT_SECRET` sin rotación documentada | Pasos 9 ENT-M06, 10 ENV-M01 | Alto | Compromiso tokens prolongado | Alta | Pendiente | Secret manager + política rotación |
| HAL-029 | Seguridad | CORS acepta regex amplia `*.vercel.app` | Pasos 9 ENT-M07, 10 ENV-M10; `app.js` | Medio | Preview no autorizado | Media | Pendiente | Lista explícita de orígenes |
| HAL-030 | Frontend / Configuración | `RAILWAY_API_URL` hardcoded como fallback en `api.js` | Pasos 9 ENT-M15, 10 ENV-M08 | Medio | Cambio URL requiere código | Media | Pendiente | Solo `VITE_API_URL`; fallar build sin env |
| HAL-031 | Dominio | Inventario auto-creado sin módulo gestión | Pasos 3 FUNC-04, 8 DOM-M05 | Medio | Stock no visible usuario | Media | Pendiente | Vista inventario con scope rol |
| HAL-032 | Dominio | Tablas `notificaciones`, `historial_reportes` sin servicio | Paso 8 DOM-M09, DOM-M10 | Bajo | UX y trazabilidad limitadas | Baja | Pendiente | Servicio notificaciones; log exports |
| HAL-033 | Arquitectura | Sin contrato OpenAPI/Swagger | Pasos 5 ARQ-12, 6 EVAL-10, 7 REF-10 | Medio | Integración externa difícil | Media | Pendiente | Generar swagger desde routes |
| HAL-034 | Infraestructura | Sin APM/logs estructurados/request-id | Pasos 6 EVAL-06, 7 REF-11, 9 ENT-M17 | Medio | MTTR elevado en incidentes | Media | Pendiente | Logs JSON + Railway metrics |
| HAL-035 | Infraestructura | Política backups MySQL Railway no documentada | Paso 9 ENT-M16 | Alto | Pérdida datos | Alta | Pendiente | Configurar y documentar backups |
| HAL-036 | Calidad | `cypress_last-run.json` desactualizado (mayo 2026) | Pasos 1 LOG-22, 4 TEC-M15 | Bajo | Evidencia obsoleta | Media | Pendiente | Re-ejecutar `npm run test:e2e` |
| HAL-037 | Calidad | E2E no cubre calidad, usuarios, auditoría, base datos | Paso 3 FUNC-08 | Medio | Brechas regresión admin | Alta | Pendiente | Specs PF-12 a PF-15 |
| HAL-038 | Calidad | Capturas Railway/Sonar/Vercel pendientes en repo | Pasos 1 M-19, 3 FUNC-09 | Bajo | Informe ICACIT visual incompleto | Media | Pendiente | Completar según INDICE evidencias |
| HAL-039 | Dominio | Ambigüedad entidad Productor vs rol legacy `productor` | Paso 8 DOM-M03 | Medio | Errores interpretación auditoría | Media | Pendiente | Glosario y normalización documentada |
| HAL-040 | Dominio | Terminología calidad HU (Alta/Media/Baja) vs código (Excelente/Buena…) | Paso 8 reglas negocio | Bajo | Inconsistencia documental | Baja | Pendiente | Unificar terminología HU y código |
| HAL-041 | Configuración | Sin `engines` Node ni `.nvmrc` | Paso 9 ENT-M01 | Bajo | Drift versión dev/CI | Baja | Pendiente | Fijar Node 20 en package.json |
| HAL-042 | Configuración | Variables scripts (`SEED_*`, `VERIFY_*`, `PUPPETEER_*`) no en `.env.example` | Paso 10 ENV-M04–M07 | Bajo | Uso incorrecto scripts dev | Baja | Pendiente | `.env.scripts.example` o README |
| HAL-043 | Arquitectura | Rutas `/api/base-datos` duplicadas en `app.js` y router | Paso 5 ARQ-08, 7 REF-05 | Bajo | Confusión mantenimiento | Baja | Pendiente | Centralizar en routes/index |
| HAL-044 | Arquitectura | Auth sin `AuthController` (inconsistencia capa interfaces) | Pasos 5 ARQ-03, 7 REF-03 | Bajo | Patrón heterogéneo | Baja | Pendiente | Extraer AuthController |
| HAL-045 | Dependencias | Dependabot no evidenciado en repositorio | Paso 2 M-DEP-15 | Medio | CVE detectadas tardíamente | Media | Pendiente | Habilitar Dependabot alerts |
| HAL-046 | Calidad | ESLint 187 warnings `no-unused-vars` en JSX | Paso 1 LOG-08 | Bajo | Ruido análisis estático | Baja | Pendiente | `react/jsx-uses-vars` |
| HAL-047 | Infraestructura | `render.yaml` alternativo sin uso claro vs Railway prod | Paso 9 ENT-M14 | Bajo | Confusión despliegue | Baja | Pendiente | Deprecar o documentar como backup |
| HAL-048 | Configuración | Riesgo commit accidental `.env` (archivos locales existen) | Paso 10 ENV-M15 | Alto | Exposición secretos | Alta | Pendiente | Verificar .gitignore; pre-commit hook |

---

## Hallazgos positivos verificados (no pendientes)

| ID | Categoría | Hallazgo | Evidencia | Estado |
|----|-----------|----------|-----------|--------|
| HAL-P01 | Infraestructura | API Railway operativa HTTP 200 post-corrección | `railway_health_response.json` | Verificado |
| HAL-P02 | Backend | 18/18 tests unitarios/integración OK local | `npm_test_backend.txt` | Verificado |
| HAL-P03 | Calidad | 13/13 specs Cypress OK (ejecución local) | `cypress_last-run.json` | Verificado |
| HAL-P04 | Infraestructura | Frontend Vercel HTTP 200 | `vercel_status.json` | Verificado |
| HAL-P05 | Seguridad | Validación `JWT_SECRET` ≥32 chars al arranque | `env.js`; Paso 10 | Verificado |
| HAL-P06 | Seguridad | Corrección leakage env en Vite (solo VITE_*) | `CORRECCIONES_SONARQUBE.md` | Corregido |
| HAL-P07 | Seguridad | RBAC: 401 sin token confirmado en tests | `npm_test_backend.txt` | Verificado |

---

**Resumen:** 48 hallazgos de mejora (HAL-001–048) + 7 positivos (HAL-P01–P07)  
**Pendientes:** 46 | **Corregidos/verificados:** 9 (HAL-001 + HAL-P01–P07)
