# Plan de Acción Consolidado — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Origen:** Hallazgos HAL-001 a HAL-048

---

## Fase 1 — Crítica y Alta (0–4 semanas)

| ID | Hallazgo | Acción correctiva | Prioridad | Impacto esperado | Responsable | Tiempo | Estado |
|----|----------|-------------------|-----------|------------------|-------------|--------|--------|
| PA-01 | HAL-003 | Implementar transacción SQL en `LoteService.create` | Crítica | Integridad datos garantizada | Backend Dev | 4 h | Pendiente |
| PA-02 | HAL-002 | Configurar `ADMIN_SEED_PASSWORD` seguro en Railway | Alta | Admin inicial en prod | DevOps | 30 min | Pendiente |
| PA-03 | HAL-013 | Actualizar `react-router-dom` ≥6.30.4 | Alta | CVE cerrado | Frontend Dev | 2 h | Pendiente |
| PA-04 | HAL-028 | Documentar rotación `JWT_SECRET`; evaluar secret manager | Alta | Reducir riesgo compromiso tokens | Seguridad | 2 días | Pendiente |
| PA-05 | HAL-035 | Configurar y documentar backups MySQL Railway | Alta | Recuperación ante desastre | DevOps | 2 días | Pendiente |
| PA-06 | HAL-010 | Integrar Cypress en GitHub Actions | Alta | Detección regresiones UI en PR | DevOps + QA | 1 sprint | Pendiente |
| PA-07 | HAL-048 | Verificar `.gitignore`; hook pre-commit anti `.env` | Alta | Prevenir filtración secretos | Seguridad | 2 h | Pendiente |
| PA-08 | HAL-004 | Mover SQL de PredictionService a repository | Alta | Pureza arquitectónica hexagonal | Backend Dev | 8 h | Pendiente |
| PA-09 | HAL-037 | Crear specs Cypress PF-12 a PF-15 | Alta | Cobertura módulos admin | QA | 12 h | Pendiente |
| PA-10 | HAL-008 | Endpoints edición/soft-delete lotes | Alta | Corrección errores operativos | Backend Dev | 12 h | Pendiente |

---

## Fase 2 — Media (1–2 meses)

| ID | Hallazgo | Acción correctiva | Prioridad | Impacto esperado | Responsable | Tiempo | Estado |
|----|----------|-------------------|-----------|------------------|-------------|--------|--------|
| PA-11 | HAL-005 | Módulo CRUD fincas + selector en lotes | Media | Trazabilidad geográfica | Full Stack | 24 h | Pendiente |
| PA-12 | HAL-006 | Plan consolidación tablas huérfanas (implementar/deprecar) | Media | Reducir deuda modelo | Arquitecto | 2 sprints | Pendiente |
| PA-13 | HAL-011 | MySQL service container en CI | Media | Tests integración en pipeline | DevOps | 8 h | Pendiente |
| PA-14 | HAL-012, HAL-015 | `npm audit fix` backend y frontend | Media | Reducir CVE | Backend + Frontend | 4 h | Pendiente |
| PA-016 | HAL-016 | Quitar `continue-on-error` en audit CI | Media | Bloquear merge con CVE high | DevOps | 30 min | Pendiente |
| PA-17 | HAL-017 | Corregir ESLint bloqueante | Media | Lint usable en CI | Frontend Dev | 2 h | Pendiente |
| PA-18 | HAL-019 | Instrumentar cobertura c8 + Sonar lcov | Media | Visibilidad deuda tests | Backend Dev | 4 h | Pendiente |
| PA-20 | HAL-020, HAL-021 | Ampliar JMeter + optimizar latencia | Media | Baseline rendimiento real | QA | 8 h | Pendiente |
| PA-21 | HAL-025 | docker-compose desarrollo | Media | Onboarding reproducible | DevOps | 8 h | Pendiente |
| PA-22 | HAL-027 | Workflow CD Railway/Vercel | Media | Despliegues automatizados | DevOps | 3 días | Pendiente |
| PA-23 | HAL-029, HAL-030 | Endurecer CORS; eliminar fallback API hardcoded | Media | Seguridad y portabilidad | Backend + Frontend | 1 día | Pendiente |
| PA-24 | HAL-033 | Generar OpenAPI desde routes | Media | Contrato API documentado | Backend Dev | 8 h | Pendiente |
| PA-25 | HAL-034 | Logs JSON estructurados + request-id | Media | Diagnóstico incidentes | Backend Dev | 8 h | Pendiente |
| PA-26 | HAL-036, HAL-038 | Actualizar evidencias Cypress y capturas ICACIT | Media | Informe completo | QA | 4 h | Pendiente |
| PA-27 | HAL-045 | Habilitar Dependabot | Media | Alertas CVE tempranas | DevOps | 1 h | Pendiente |
| PA-28 | HAL-007 | Decisión RBAC granular: implementar o retirar tablas | Media | Coherencia seguridad | Arquitecto | 1 sprint | Pendiente |
| PA-29 | HAL-009 | Documentar motor heurístico o plan integración ML | Media | Alineación expectativas PMV2 | Product Owner | 2 días | Pendiente |

---

## Fase 3 — Baja (backlog)

| ID | Hallazgo | Acción correctiva | Prioridad | Tiempo | Estado |
|----|----------|-------------------|-----------|--------|--------|
| PA-30 | HAL-022 | Reducir campos `/api/health` | Baja | 1 h | Pendiente |
| PA-31 | HAL-024 | Lazy load Recharts | Baja | 4 h | Pendiente |
| PA-32 | HAL-040 | Unificar terminología calidad | Baja | 2 h | Pendiente |
| PA-33 | HAL-041 | engines + .nvmrc Node 20 | Baja | 1 h | Pendiente |
| PA-34 | HAL-042 | Documentar env scripts | Baja | 2 h | Pendiente |
| PA-35 | HAL-043, HAL-044 | AuthController; unificar rutas base-datos | Baja | 3 h | Pendiente |
| PA-36 | HAL-046 | Reducir warnings ESLint JSX | Baja | 2 h | Pendiente |
| PA-37 | HAL-047 | Clarificar render.yaml vs Railway | Baja | 1 h | Pendiente |
| PA-38 | HAL-032 | Servicios notificaciones/historial reportes | Baja | 1 sprint | Pendiente |

---

## Acciones completadas (referencia)

| Hallazgo | Acción | Evidencia |
|----------|--------|-----------|
| HAL-001 | Corrección SyntaxError migrate.js | commit `2f7ac27`; health 200 |
| HAL-P06 | Corrección leakage VITE en vite.config | CORRECCIONES_SONARQUBE.md |
| — | Unificación variables MYSQL* | database.js; Paso 09 |
| — | Validación JWT_SECRET ≥32 | env.js; Paso 10 |

---

**Total acciones planificadas:** 38 | **Completadas:** 4 | **Pendientes:** 34
