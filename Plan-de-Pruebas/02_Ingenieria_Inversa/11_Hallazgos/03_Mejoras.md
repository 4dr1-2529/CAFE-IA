# Plan de Mejora Consolidado — Hallazgos CAFE-IA

**Fecha:** 24 de junio de 2026  
**Origen:** Consolidación HAL-001 a HAL-048

---

## Prioridad Crítica

| ID | Hallazgo | Acción correctiva | Impacto esperado | Responsable | Tiempo | Estado |
|----|----------|-------------------|------------------|-------------|--------|--------|
| PM-C01 | HAL-003 LoteService sin transacción | BEGIN/COMMIT MySQL en creación lote | Integridad datos en fallos parciales | Backend Dev | 4 h | Pendiente |

---

## Prioridad Alta

| ID | Hallazgo | Acción correctiva | Impacto esperado | Responsable | Tiempo | Estado |
|----|----------|-------------------|------------------|-------------|--------|--------|
| PM-A01 | HAL-002 ADMIN_SEED_PASSWORD | Configurar variable segura Railway | Admin operativo en prod | DevOps | 30 min | Pendiente |
| PM-A02 | HAL-004 SQL PredictionService | Completar PrediccionRepository | Arquitectura hexagonal | Backend Dev | 8 h | Pendiente |
| PM-A03 | HAL-005 Fincas sin módulo | CRUD fincas + finca_id en lotes | Trazabilidad geográfica | Full Stack | 24 h | Pendiente |
| PM-A04 | HAL-006 Schema hinchado | Plan implementar/deprecar 16+ tablas | Reducir deuda modelo | Arquitecto | 2 sprints | Pendiente |
| PM-A05 | HAL-008 Lotes inmutables | PUT/soft-delete con auditoría | Corrección errores operativos | Backend Dev | 12 h | Pendiente |
| PM-A06 | HAL-010 Cypress fuera CI | Job E2E en GitHub Actions | Regresiones UI detectadas en PR | DevOps + QA | 1 sprint | Pendiente |
| PM-A07 | HAL-013 CVE react-router | Actualizar ≥6.30.4 | CVE cerrado | Frontend Dev | 2 h | Pendiente |
| PM-A08 | HAL-028 JWT_SECRET | Secret manager + rotación | Menor riesgo compromiso | Seguridad | 2 días | Pendiente |
| PM-A09 | HAL-035 Backups MySQL | Política backup Railway documentada | Recuperación ante desastre | DevOps | 2 días | Pendiente |
| PM-A10 | HAL-037 E2E incompleto | Specs PF-12 a PF-15 | Cobertura admin | QA | 12 h | Pendiente |
| PM-A11 | HAL-048 Riesgo .env | gitignore + pre-commit hook | Prevenir filtración secretos | Seguridad | 2 h | Pendiente |

---

## Prioridad Media

| ID | Hallazgo | Acción correctiva | Impacto esperado | Responsable | Tiempo | Estado |
|----|----------|-------------------|------------------|-------------|--------|--------|
| PM-M01 | HAL-007 permisos sin uso | Implementar RBAC o retirar tablas | Coherencia seguridad | Arquitecto | 1 sprint | Pendiente |
| PM-M02 | HAL-009 ML no integrado | Documentar heurística o integrar ML | Alineación PMV2 | Product Owner | 2 días | Pendiente |
| PM-M03 | HAL-011 SKIP_INTEGRATION | MySQL en CI | Tests integración en pipeline | DevOps | 8 h | Pendiente |
| PM-M04 | HAL-012, HAL-015 CVE npm | npm audit fix | Menos vulnerabilidades | Dev Team | 4 h | Pendiente |
| PM-M05 | HAL-014 CVE vite/esbuild | Upgrade Vite planificado | Seguridad dev | Frontend Dev | 8 h | Pendiente |
| PM-M06 | HAL-016 audit permisivo | Quitar continue-on-error | CVE bloquean merge | DevOps | 30 min | Pendiente |
| PM-M07 | HAL-017 ESLint errores | Corregir config | Lint en CI | Frontend Dev | 2 h | Pendiente |
| PM-M08 | HAL-018 Sonar captura | Exportar Quality Gate | Evidencia ICACIT | QA | 1 h | Pendiente |
| PM-M09 | HAL-019 cobertura 0 % | c8 + lcov Sonar | Visibilidad deuda tests | Backend Dev | 4 h | Pendiente |
| PM-M10 | HAL-020, HAL-021 JMeter | Escenarios negocio + optimización | Baseline rendimiento | QA | 8 h | Pendiente |
| PM-M11 | HAL-023 seeds silenciosos | Fail-fast migrate | BD consistente | Backend Dev | 4 h | Pendiente |
| PM-M12 | HAL-025 Sin Docker | docker-compose dev | Onboarding | DevOps | 8 h | Pendiente |
| PM-M13 | HAL-026 Sin IaC Railway | Documentar/exportar config | Reproducibilidad | DevOps | 1 día | Pendiente |
| PM-M14 | HAL-027 Sin CD | Workflow deploy | Releases automatizados | DevOps | 3 días | Pendiente |
| PM-M15 | HAL-029 CORS amplio | Lista orígenes explícita | Menor superficie | Backend Dev | 1 día | Pendiente |
| PM-M16 | HAL-030 fallback API | Eliminar hardcode api.js | Portabilidad URL | Frontend Dev | 2 h | Pendiente |
| PM-M17 | HAL-031 Inventario | Módulo gestión stock | Visibilidad operativa | Full Stack | 16 h | Pendiente |
| PM-M18 | HAL-033 Sin OpenAPI | swagger.json | Contrato API | Backend Dev | 8 h | Pendiente |
| PM-M19 | HAL-034 Sin APM | Logs JSON + metrics | MTTR reducido | Backend Dev | 8 h | Pendiente |
| PM-M20 | HAL-036, HAL-038 Evidencias | Actualizar Cypress + capturas | Informe completo | QA | 4 h | Pendiente |
| PM-M21 | HAL-039 Productor/Cliente | Glosario dominio | Claridad auditoría | Analista | 1 día | Pendiente |
| PM-M22 | HAL-045 Dependabot | Habilitar alerts | CVE tempranas | DevOps | 1 h | Pendiente |

---

## Prioridad Baja

| ID | Hallazgo | Acción correctiva | Impacto esperado | Responsable | Tiempo | Estado |
|----|----------|-------------------|------------------|-------------|--------|--------|
| PM-B01 | HAL-022 health dbHost | Reducir campos públicos | Menor reconocimiento | Backend Dev | 1 h | Pendiente |
| PM-B02 | HAL-024 Recharts bundle | Lazy load charts | Mejor LCP | Frontend Dev | 4 h | Pendiente |
| PM-B03 | HAL-032 notificaciones | Servicio notificaciones | UX alertas | Full Stack | 1 sprint | Pendiente |
| PM-B04 | HAL-040 terminología calidad | Unificar HU y código | Doc coherente | Analista | 2 h | Pendiente |
| PM-B05 | HAL-041 engines Node | .nvmrc + engines | Paridad dev/CI | DevOps | 1 h | Pendiente |
| PM-B06 | HAL-042 env scripts | .env.scripts.example | Scripts documentados | DevOps | 2 h | Pendiente |
| PM-B07 | HAL-043, HAL-044 rutas/auth | Unificar rutas; AuthController | Código más limpio | Backend Dev | 3 h | Pendiente |
| PM-B08 | HAL-046 ESLint warnings | jsx-uses-vars | Menos ruido lint | Frontend Dev | 2 h | Pendiente |
| PM-B09 | HAL-047 render.yaml | Deprecar o documentar | Claridad infra | Arquitecto | 1 h | Pendiente |

---

## Mejoras ya aplicadas

| Hallazgo | Acción | Estado |
|----------|--------|--------|
| HAL-001 Crash migrate.js | Corrección SQL seeds | **Corregido** |
| HAL-P06 Leakage VITE | loadEnv solo VITE_* | **Corregido** |
| — Variables MYSQL* unificadas | database.js | **Verificado** |
| — JWT ≥32 chars | env.js | **Verificado** |

---

**Total mejoras planificadas:** 43 | **Crítica:** 1 | **Alta:** 11 | **Media:** 22 | **Baja:** 9
