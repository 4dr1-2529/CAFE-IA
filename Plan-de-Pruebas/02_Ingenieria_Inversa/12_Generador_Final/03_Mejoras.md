# Plan Consolidado de Mejoras — Ingeniería Inversa CAFE-IA

**Fecha:** 24 de junio de 2026  
**Origen:** Consolidación Pasos 01–11 (matriz HAL-001–048, Paso 11)  
**Orden:** Crítica → Alta → Media → Baja

---

## Prioridad Crítica

| ID | Área | Problema | Prioridad | Riesgo | Impacto | Acción recomendada | Responsable | Estado |
|----|------|----------|-----------|--------|---------|-------------------|-------------|--------|
| HAL-003 | Base de Datos | `LoteService.create` sin transacción SQL (lote+trazabilidad+inventario) | Crítica | Crítico | Inconsistencia BD en fallo parcial | Implementar BEGIN/COMMIT MySQL en creación de lote | Backend Dev | Pendiente |

---

## Prioridad Alta

| ID | Área | Problema | Prioridad | Riesgo | Impacto | Acción recomendada | Responsable | Estado |
|----|------|----------|-----------|--------|---------|-------------------|-------------|--------|
| HAL-002 | Configuración | `ADMIN_SEED_PASSWORD` ausente omite admin en prod | Alta | Alto | Sin acceso admin inicial | Configurar variable segura en Railway | DevOps | Pendiente |
| HAL-004 | Arquitectura | SQL inline en `PredictionService` (bypass repository) | Alta | Medio | Violación hexagonal | Completar PrediccionRepository | Backend Dev | Pendiente |
| HAL-005 | Dominio | Tabla `fincas` sin API ni UI | Alta | Medio | Trazabilidad geográfica incompleta | CRUD fincas + `finca_id` en lotes | Full Stack | Pendiente |
| HAL-006 | Dominio / BD | 39 tablas vs ~14 entidades operativas | Alta | Alto | Deuda modelo | Implementar o deprecar tablas huérfanas | Arquitecto | Pendiente |
| HAL-008 | Backend | Lotes sin PUT/DELETE en API | Alta | Medio | Errores irreversibles | Edición/soft-delete con auditoría | Backend Dev | Pendiente |
| HAL-010 | DevOps | Cypress E2E no ejecutado en GitHub Actions | Alta | Alto | Regresiones UI en merge | Job CI con stack dockerizado | DevOps + QA | Pendiente |
| HAL-013 | Seguridad | CVE `react-router-dom` open redirect | Alta | Medio | Phishing vía redirect | Actualizar a ≥6.30.4 | Frontend Dev | Pendiente |
| HAL-028 | Seguridad | `JWT_SECRET` sin rotación documentada | Alta | Alto | Compromiso tokens prolongado | Secret manager + política rotación | Seguridad | Pendiente |
| HAL-035 | Infraestructura | Backups MySQL Railway no documentados | Alta | Alto | Pérdida de datos | Configurar y documentar backups | DevOps | Pendiente |
| HAL-037 | Calidad | E2E no cubre calidad, usuarios, auditoría | Alta | Medio | Brechas regresión admin | Specs Cypress PF-12 a PF-15 | QA | Pendiente |
| HAL-048 | Configuración | Riesgo commit accidental `.env` | Alta | Alto | Exposición secretos | Verificar .gitignore; pre-commit hook | Seguridad | Pendiente |

---

## Prioridad Media

| ID | Área | Problema | Prioridad | Riesgo | Impacto | Acción recomendada | Responsable | Estado |
|----|------|----------|-----------|--------|---------|-------------------|-------------|--------|
| HAL-007 | Seguridad | Tablas permisos sin enforcement | Media | Medio | RBAC granular ficticio | Activar RBAC o eliminar tablas | Arquitecto | Pendiente |
| HAL-009 | Machine Learning | `ml/train_model.py` no integrado en runtime | Media | Medio | Expectativa IA vs heurística | Integrar ML o renombrar módulo | Product Owner | Pendiente |
| HAL-011 | DevOps | `SKIP_INTEGRATION=1` en CI | Media | Medio | Regresiones API no detectadas | MySQL service container en workflow | DevOps | Pendiente |
| HAL-012 | Dependencias | CVE HIGH `form-data` transitiva | Media | Medio | Supply chain | `npm audit fix` backend | Backend Dev | Pendiente |
| HAL-014 | Dependencias | CVE `esbuild`/`vite` dev server | Media | Medio | Solo entorno dev | Upgrade Vite planificado | Frontend Dev | Pendiente |
| HAL-015 | Dependencias | CVE frontend (js-yaml, @babel/core) | Media | Bajo-Medio | DoS dev/build | `npm audit fix` frontend | Frontend Dev | Pendiente |
| HAL-016 | DevOps | `continue-on-error` en npm audit CI | Media | Medio | CVE high en merge | Fallar CI en audit-level=high | DevOps | Pendiente |
| HAL-017 | Frontend | ESLint: 2 errores bloquean lint | Media | Bajo | Calidad estática bloqueada | Corregir config ErrorBoundary/react-hooks | Frontend Dev | Pendiente |
| HAL-018 | Calidad | SonarCloud Quality Gate sin captura | Media | Bajo | Informe ICACIT incompleto | Exportar dashboard post-CI | QA | Pendiente |
| HAL-019 | Calidad | Cobertura SonarCloud 0 % | Media | Medio | Deuda testing invisible | Instrumentar c8 + lcov Sonar | Backend Dev | Pendiente |
| HAL-020 | Rendimiento | JMeter solo prueba health | Media | Medio | Falsa confianza rendimiento | Escenarios login+lotes+dashboard JWT | QA | Pendiente |
| HAL-021 | Rendimiento | JMeter P95 ≈ 2614 ms | Media | Medio | Picos latencia bajo carga | Warm-up; revisar plan Railway | DevOps | Pendiente |
| HAL-023 | Backend | Seeds fallidos solo warning | Media | Medio | BD parcialmente sembrada | Fail-fast en seeds críticos | Backend Dev | Pendiente |
| HAL-025 | Infraestructura | Sin Docker/docker-compose | Media | Medio | Entornos no reproducibles | docker-compose dev API+MySQL+FE | DevOps | Pendiente |
| HAL-026 | Infraestructura | Sin IaC Railway | Media | Medio | Config manual | Documentar panel o railway.toml | DevOps | Pendiente |
| HAL-027 | DevOps | Sin CD automático | Media | Medio | Despliegues manuales | Workflow deploy en merge main | DevOps | Pendiente |
| HAL-029 | Seguridad | CORS regex amplia `*.vercel.app` | Media | Medio | Preview no autorizado | Lista explícita de orígenes | Backend Dev | Pendiente |
| HAL-030 | Frontend | `RAILWAY_API_URL` hardcoded en api.js | Media | Medio | Cambio URL requiere código | Solo `VITE_API_URL`; fallar build sin env | Frontend Dev | Pendiente |
| HAL-031 | Dominio | Inventario sin módulo gestión | Media | Medio | Stock no visible | Vista inventario con scope rol | Full Stack | Pendiente |
| HAL-033 | Arquitectura | Sin contrato OpenAPI/Swagger | Media | Medio | Integración externa difícil | Generar swagger desde routes | Backend Dev | Pendiente |
| HAL-034 | Infraestructura | Sin APM/logs estructurados | Media | Medio | MTTR elevado | Logs JSON + Railway metrics | Backend Dev | Pendiente |
| HAL-036 | Calidad | `cypress_last-run.json` desactualizado | Media | Bajo | Evidencia obsoleta | Re-ejecutar `npm run test:e2e` | QA | Pendiente |
| HAL-038 | Calidad | Capturas Railway/Sonar/Vercel pendientes | Media | Bajo | Informe visual incompleto | Completar según INDICE evidencias | QA | Pendiente |
| HAL-039 | Dominio | Ambigüedad Productor vs rol legacy | Media | Medio | Errores interpretación | Glosario y normalización documentada | Analista | Pendiente |
| HAL-045 | Dependencias | Dependabot no evidenciado | Media | Medio | CVE tardías | Habilitar Dependabot alerts | DevOps | Pendiente |

---

## Prioridad Baja

| ID | Área | Problema | Prioridad | Riesgo | Impacto | Acción recomendada | Responsable | Estado |
|----|------|----------|-----------|--------|---------|-------------------|-------------|--------|
| HAL-022 | Seguridad | `/api/health` expone `dbHost` | Baja | Bajo | Reconocimiento infra | Reducir campos respuesta pública | Backend Dev | Pendiente |
| HAL-024 | Frontend | Chunk Recharts ~411 KB | Baja | Bajo | LCP dashboard lento | Dynamic import en DashboardPage | Frontend Dev | Pendiente |
| HAL-032 | Dominio | Tablas notificaciones sin servicio | Baja | Bajo | UX limitada | Servicio notificaciones; log exports | Full Stack | Pendiente |
| HAL-040 | Dominio | Terminología calidad HU vs código | Baja | Bajo | Inconsistencia documental | Unificar terminología | Analista | Pendiente |
| HAL-041 | Configuración | Sin `engines` Node ni `.nvmrc` | Baja | Bajo | Drift versión dev/CI | Fijar Node 20 en package.json | DevOps | Pendiente |
| HAL-042 | Configuración | Vars scripts no en `.env.example` | Baja | Bajo | Uso incorrecto scripts | `.env.scripts.example` o README | DevOps | Pendiente |
| HAL-043 | Arquitectura | Rutas `/api/base-datos` duplicadas | Baja | Bajo | Confusión mantenimiento | Centralizar en routes/index | Backend Dev | Pendiente |
| HAL-044 | Arquitectura | Auth sin AuthController | Baja | Bajo | Patrón heterogéneo | Extraer AuthController | Backend Dev | Pendiente |
| HAL-046 | Calidad | ESLint 187 warnings no-unused-vars | Baja | Bajo | Ruido análisis estático | `react/jsx-uses-vars` | Frontend Dev | Pendiente |
| HAL-047 | Infraestructura | `render.yaml` sin uso claro | Baja | Bajo | Confusión despliegue | Deprecar o documentar backup | Arquitecto | Pendiente |

---

## Mejoras ya aplicadas / verificadas

| ID | Área | Problema | Estado |
|----|------|----------|--------|
| HAL-001 | Infraestructura | Crash Railway migrate.js | **Corregido** |
| HAL-P06 | Seguridad | Leakage env Vite | **Corregido** |
| HAL-P01–P05, P07 | Varios | Prod OK, tests OK, JWT validado | **Verificado** |

---

## Resumen cuantitativo

| Prioridad | Cantidad pendiente |
|-----------|-------------------|
| Crítica | 1 |
| Alta | 11 |
| Media | 22 |
| Baja | 12 |
| Corregido/verificado | 9 |
| **Total hallazgos** | **55** |

---

*Consolidado desde `11_Hallazgos/Evidencias/Matriz_Hallazgos_Consolidada.md`. Sin duplicación de IDs equivalentes.*
