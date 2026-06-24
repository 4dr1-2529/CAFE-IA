# Paso 11 — Consolidación de Hallazgos CAFE-IA

**Proyecto:** CAFE-IA (`cafe-cursor`)  
**Fecha:** 24 de junio de 2026  
**Metodología:** Consolidación sin duplicación de Pasos 1–10 Ingeniería Inversa  
**Códigos:** HAL-001 a HAL-048 (mejoras) · HAL-P01 a HAL-P07 (positivos verificados)

---

## 1. Resumen de consolidación

Se analizaron los documentos `03_Mejoras.md`, `04_Conclusiones.md`, matrices y evidencias de los **10 pasos previos**. Hallazgos equivalentes reportados en múltiples pasos se **fusionaron** en un único ID HAL para evitar duplicidad.

| Métrica | Valor |
|---------|-------|
| Hallazgos brutos estimados (pasos 1–10) | ~120 referencias |
| Hallazgos únicos consolidados | 48 |
| Hallazgos positivos verificados | 7 |
| Pendientes de acción | 46 |
| Corregidos / verificados | 9 |

---

## 2. Hallazgos por categoría

### 2.1 Arquitectura

| Código | Descripción | Evidencia | Causa | Impacto | Riesgo | Prioridad | Estado | Recomendación |
|--------|-------------|-----------|-------|---------|--------|-----------|--------|---------------|
| HAL-004 | SQL inline en PredictionService | P05 ARQ-01, P07 REF-02 | Atajo implementación IA | Violación hexagonal | Medio | Alta | Pendiente | PrediccionRepository completo |
| HAL-033 | Sin OpenAPI/Swagger | P05 ARQ-12, P06 EVAL-10 | No generado contrato | Integración difícil | Medio | Media | Pendiente | swagger desde routes |
| HAL-043 | Rutas base-datos duplicadas | P05 ARQ-08 | Registro en app.js y router | Confusión | Bajo | Baja | Pendiente | Unificar en router |
| HAL-044 | Auth sin AuthController | P05 ARQ-03 | Rutas invocan service directo | Inconsistencia capas | Bajo | Baja | Pendiente | Extraer AuthController |

### 2.2 Calidad

| Código | Descripción | Evidencia | Causa | Impacto | Riesgo | Prioridad | Estado | Recomendación |
|--------|-------------|-----------|-------|---------|--------|-----------|--------|---------------|
| HAL-017 | ESLint 2 errores bloqueantes | P01 LOG-07 | Config incompleta | Lint inutilizable | Bajo | Media | Pendiente | Corregir .eslintrc |
| HAL-018 | SonarCloud sin captura evidencia | P01 LOG-09 | Dashboard externo | Informe incompleto | Bajo | Media | Pendiente | Exportar Quality Gate |
| HAL-019 | Cobertura Sonar 0 % | P01 LOG-10 | Sin lcov | Deuda invisible | Medio | Media | Pendiente | c8 + sonar lcov |
| HAL-036 | Cypress last-run desactualizado | P01 LOG-22 | Última ejecución mayo 2026 | Evidencia obsoleta | Bajo | Media | Pendiente | Re-ejecutar E2E |
| HAL-037 | E2E no cubre módulos admin | P03 FUNC-08 | 11 specs parciales | Brechas regresión | Medio | Alta | Pendiente | PF-12 a PF-15 |
| HAL-038 | Capturas ICACIT pendientes | P01 M-19, P03 FUNC-09 | No en repo | Informe visual incompleto | Bajo | Media | Pendiente | Capturar vistas |
| HAL-046 | 187 warnings ESLint JSX | P01 LOG-08 | no-unused-vars | Ruido estático | Bajo | Baja | Pendiente | jsx-uses-vars |

### 2.3 Seguridad

| Código | Descripción | Evidencia | Causa | Impacto | Riesgo | Prioridad | Estado | Recomendación |
|--------|-------------|-----------|-------|---------|--------|-----------|--------|---------------|
| HAL-007 | permisos/rol_permisos sin uso | P03 FUNC-03, P08 DOM-M02 | Seeds sin middleware | RBAC ficticio | Medio | Media | Pendiente | Implementar o retirar |
| HAL-013 | CVE react-router open redirect | P02 M-DEP-02, audit frontend | Versión <6.30.4 | Phishing | Medio | Alta | Pendiente | Actualizar paquete |
| HAL-022 | Health expone dbHost | P01 LOG-16 | Diseño endpoint | Reconocimiento | Bajo | Baja | Pendiente | Reducir campos |
| HAL-028 | JWT_SECRET sin rotación formal | P09 ENT-M06, P10 ENV-M01 | Gestión manual Railway | Compromiso tokens | Alto | Alta | Pendiente | Secret manager |
| HAL-029 | CORS regex *.vercel.app amplio | P09 ENT-M07, app.js | Conveniencia previews | Origen no listado | Medio | Media | Pendiente | Lista explícita |
| HAL-048 | Riesgo commit .env | P10 ENV-M15 | Archivos locales existen | Filtración secretos | Alto | Alta | Pendiente | gitignore + hook |

### 2.4 Rendimiento

| Código | Descripción | Evidencia | Causa | Impacto | Riesgo | Prioridad | Estado | Recomendación |
|--------|-------------|-----------|-------|---------|--------|-----------|--------|---------------|
| HAL-020 | JMeter solo /api/health | P01 LOG-14 | Alcance limitado | Falsa confianza | Medio | Media | Pendiente | Escenarios JWT |
| HAL-021 | JMeter P95 ≈ 2614 ms | P01 LOG-13, jmeter_resumen | Cold start Railway | Picos latencia | Medio | Media | Pendiente | Warm-up, escalar |
| HAL-024 | Bundle Recharts 411 KB | P01 LOG-19, build frontend | Chunk charts | LCP lento | Bajo | Baja | Pendiente | Dynamic import |

### 2.5 Dependencias

| Código | Descripción | Evidencia | Causa | Impacto | Riesgo | Prioridad | Estado | Recomendación |
|--------|-------------|-----------|-------|---------|--------|-----------|--------|---------------|
| HAL-012 | CVE form-data HIGH backend | P01 LOG-05, npm_audit_backend | Transitiva supertest | Supply chain | Medio | Media | Pendiente | npm audit fix |
| HAL-014 | CVE esbuild/vite dev | P01 LOG-06 | Versión Vite | Dev server leak | Medio | Media | Pendiente | Upgrade Vite |
| HAL-015 | CVE js-yaml, @babel/core | npm_audit_frontend | Lockfile | DoS dev | Bajo | Media | Pendiente | audit fix |
| HAL-045 | Sin Dependabot | P02 M-DEP-15 | No configurado | CVE tardías | Medio | Media | Pendiente | Habilitar alerts |

### 2.6 Infraestructura

| Código | Descripción | Evidencia | Causa | Impacto | Riesgo | Prioridad | Estado | Recomendación |
|--------|-------------|-----------|-------|---------|--------|-----------|--------|---------------|
| HAL-001 | Crash migrate.js Railway | P01 LOG-01 | SQL seeds mal concatenados | API caída | Crítico | Crítica | **Corregido** | Monitorear |
| HAL-025 | Sin Docker/compose | P04 TEC-M11, P09 ENT-M03 | No implementado | Onboarding difícil | Medio | Media | Pendiente | docker-compose |
| HAL-026 | Sin railway.json IaC | P09 ENT-M02 | Config panel manual | No reproducible | Medio | Media | Pendiente | Documentar/IaC |
| HAL-027 | Sin CD automático | P09 ENT-M05 | Deploy manual | Retrasos release | Medio | Media | Pendiente | Workflow CD |
| HAL-034 | Sin APM/logs estructurados | P06 EVAL-06, P07 REF-11 | Solo console.log | MTTR alto | Medio | Media | Pendiente | JSON logs |
| HAL-035 | Backups MySQL no documentados | P09 ENT-M16 | Sin política repo | Pérdida datos | Alto | Alta | Pendiente | Backups Railway |
| HAL-047 | render.yaml ambiguo | P09 ENT-M14 | Alternativa sin uso | Confusión | Bajo | Baja | Pendiente | Deprecar/doc |

### 2.7 Configuración

| Código | Descripción | Evidencia | Causa | Impacto | Riesgo | Prioridad | Estado | Recomendación |
|--------|-------------|-----------|-------|---------|--------|-----------|--------|---------------|
| HAL-002 | ADMIN_SEED_PASSWORD ausente | P01 LOG-03, P10 ENV-M03 | Variable no en Railway | Sin admin prod | Alto | Alta | Pendiente | Definir en Railway |
| HAL-030 | VITE_API_URL fallback hardcoded | P09 ENT-M15, api.js | Fallback prod en código | Cambio URL difícil | Medio | Media | Pendiente | Solo env build |
| HAL-041 | Sin engines/.nvmrc | P09 ENT-M01 | No fijado en package | Drift Node | Bajo | Baja | Pendiente | Node 20 engines |
| HAL-042 | Env scripts no documentados | P10 ENV-M04–M07 | Fuera .env.example | Uso incorrecto | Bajo | Baja | Pendiente | .env.scripts.example |

### 2.8 Base de Datos / Dominio

| Código | Descripción | Evidencia | Causa | Impacto | Riesgo | Prioridad | Estado | Recomendación |
|--------|-------------|-----------|-------|---------|--------|-----------|--------|---------------|
| HAL-003 | LoteService sin transacción | P05 ARQ-13, P06 EVAL-01 | Multi-insert sin BEGIN/COMMIT | BD inconsistente | Crítico | Crítica | Pendiente | Transacción SQL |
| HAL-005 | Fincas sin módulo | P03 FUNC-01, P08 DOM-M01 | Tabla sin API/UI | Trazabilidad incompleta | Medio | Alta | Pendiente | CRUD fincas |
| HAL-006 | 39 tablas vs 14 operativas | P08 Inventario, DOM-M15 | Schema amplio | Deuda mantenimiento | Alto | Alta | Pendiente | Consolidar modelo |
| HAL-008 | Lotes sin PUT/DELETE | P03 FUNC-02, DOM-M04 | API solo POST/GET | Errores irreversibles | Medio | Alta | Pendiente | Edición controlada |
| HAL-023 | Seeds silenciosos migrate | P01 LOG-17 | catch warning | BD parcial | Medio | Media | Pendiente | Fail-fast |
| HAL-031 | Inventario sin módulo | P03 FUNC-04, DOM-M05 | Auto-insert solo | Stock invisible | Medio | Media | Pendiente | Vista inventario |
| HAL-039 | Productor vs rol confusión | P08 DOM-M03 | Legacy rol productor | Interpretación errónea | Medio | Media | Pendiente | Glosario |
| HAL-040 | Terminología calidad divergente | P08 reglas HU vs código | HU vs implementación | Doc inconsistente | Bajo | Baja | Pendiente | Unificar términos |

### 2.9 Machine Learning

| Código | Descripción | Evidencia | Causa | Impacto | Riesgo | Prioridad | Estado | Recomendación |
|--------|-------------|-----------|-------|---------|--------|-----------|--------|---------------|
| HAL-009 | ML Python no integrado en API | P03 FUNC-06, P08 DOM-M07 | train_model.py offline | Expectativa PMV2 | Medio | Media | Pendiente | Integrar o renombrar |

### 2.10 Frontend

| Código | Descripción | Evidencia | Causa | Impacto | Riesgo | Prioridad | Estado | Recomendación |
|--------|-------------|-----------|-------|---------|--------|-----------|--------|---------------|
| HAL-017 | ESLint bloqueante | P01 LOG-07 | Ver Calidad | — | — | Media | Pendiente | — |
| HAL-024 | Bundle Recharts | P01 LOG-19 | Ver Rendimiento | — | — | Baja | Pendiente | — |
| HAL-030 | Fallback API URL | P09 ENT-M15 | Ver Configuración | — | — | Media | Pendiente | — |

### 2.11 Backend

| Código | Descripción | Evidencia | Causa | Impacto | Riesgo | Prioridad | Estado | Recomendación |
|--------|-------------|-----------|-------|---------|--------|-----------|--------|---------------|
| HAL-003 | Sin transacción lote | Ver BD | — | — | Crítica | Pendiente | — |
| HAL-004 | SQL PredictionService | Ver Arquitectura | — | — | Alta | Pendiente | — |
| HAL-008 | Lotes inmutables | Ver BD | — | — | Alta | Pendiente | — |
| HAL-023 | Seeds silenciosos | Ver BD | — | — | Media | Pendiente | — |

### 2.12 DevOps

| Código | Descripción | Evidencia | Causa | Impacto | Riesgo | Prioridad | Estado | Recomendación |
|--------|-------------|-----------|-------|---------|--------|-----------|--------|---------------|
| HAL-010 | Cypress fuera CI | P01 LOG-11, P02 M-DEP-06 | Sin job E2E | Regresión UI | Alto | Alta | Pendiente | Job Actions |
| HAL-011 | SKIP_INTEGRATION CI | P01 LOG-04, P04 TEC-M04 | Sin MySQL runner | Regresión API | Medio | Media | Pendiente | Service container |
| HAL-016 | npm audit permisivo | P01 LOG-15, ci.yml | continue-on-error | CVE en merge | Medio | Media | Pendiente | Fallar en high |

---

## 3. Hallazgos positivos (fortalezas verificadas)

| Código | Categoría | Descripción | Evidencia | Estado |
|--------|-----------|-------------|-----------|--------|
| HAL-P01 | Infraestructura | API Railway HTTP 200 | railway_health_response.json | Verificado |
| HAL-P02 | Backend | 18/18 tests OK | npm_test_backend.txt | Verificado |
| HAL-P03 | Calidad | 13/13 Cypress OK local | cypress_last-run.json | Verificado |
| HAL-P04 | Infraestructura | Vercel HTTP 200 | vercel_status.json | Verificado |
| HAL-P05 | Seguridad | JWT_SECRET ≥32 validado | env.js Paso 10 | Verificado |
| HAL-P06 | Seguridad | Leakage VITE corregido | CORRECCIONES_SONARQUBE.md | Corregido |
| HAL-P07 | Seguridad | RBAC 401 sin token | npm_test_backend.txt | Verificado |

---

## 4. Trazabilidad por paso fuente

| Paso | Aportación principal a consolidación |
|------|----------------------------------------|
| 01 Logs | Base 25 hallazgos LOG; evidencias npm, JMeter, Cypress |
| 02 Dependencias | CVE npm; Dependabot; Cypress CI |
| 03 Funcional | Brechas fincas, lotes, E2E, inventario |
| 04 Tecnológico | Stack CI, JMeter, Vite CVE |
| 05 Detección arq. | Violaciones hexagonal, transacciones, duplicidad |
| 06 Evaluación arq. | Atributos calidad; observabilidad; cache |
| 07 Reconstrucción arq. | Refactor plan; Docker; OpenAPI |
| 08 Dominio | Schema vs app; ML; permisos; terminología |
| 09 Entorno | Railway/Vercel; CD; backups; Docker |
| 10 Variables | JWT; CORS; env scripts; .env riesgo |

---

## 5. Referencia completa

Matriz detallada: `Evidencias/Matriz_Hallazgos.md`  
Riesgos: `Evidencias/Matriz_Riesgos.md`  
Plan acción: `Evidencias/Plan_Accion.md`  
Dashboard: `Evidencias/Dashboard_Hallazgos.md`
