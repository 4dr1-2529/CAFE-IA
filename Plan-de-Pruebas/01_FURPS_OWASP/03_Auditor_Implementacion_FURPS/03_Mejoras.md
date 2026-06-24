# Plan de Mejora — Verificación Implementación FURPS+

**Fecha:** 24 de junio de 2026  
**Origen:** Hallazgos IMP-H001 a IMP-H017 (código no corregido post Paso 02)

---

## Crítica

| ID | Área | Problema | Prioridad | Impacto | Solución | Beneficio | Responsable |
|----|------|----------|-----------|---------|----------|-----------|-------------|
| IMP-H001 | F/R | `LoteService.create` sin transacción MySQL | Crítica | Alto — BD inconsistente | `pool.getConnection()` + BEGIN/COMMIT/ROLLBACK | Integridad atómica lote+trazabilidad+inventario | Backend Dev |

---

## Alta

| ID | Área | Problema | Prioridad | Impacto | Solución | Beneficio | Responsable |
|----|------|----------|-----------|---------|----------|-----------|-------------|
| IMP-H002 | S | Cypress ausente en `ci.yml` | Alta | Regresiones UI en merge | Job `testing/cypress` en Actions | E2E automatizado en PR | DevOps + QA |
| IMP-H003 | X | `react-router-dom` ^6.20.0 en rango CVE | Alta | Open redirect | Actualizar a ≥6.30.4 + lockfile | CVE cerrado en prod | Frontend Dev |
| IMP-H004 | X | CVE HIGH `form-data` backend | Alta | Supply chain | `npm audit fix` backend | Menor riesgo dependencias | Backend Dev |
| IMP-H005 | S | Sin instrumentación lcov/c8 | Alta | Cobertura 0 % Sonar | Configurar c8 en `npm test` + Sonar | Métrica S-08 real | Backend Dev |
| IMP-H006 | X | Backups MySQL sin documentar | Alta | Pérdida datos | Política backup Railway en README ops | Continuidad negocio | DevOps |

---

## Media

| ID | Área | Problema | Prioridad | Impacto | Solución | Beneficio | Responsable |
|----|------|----------|-----------|---------|----------|-----------|-------------|
| IMP-H007 | S | `SKIP_INTEGRATION=1` | Media | API sin test integración CI | MySQL service en workflow | Regresiones detectadas | DevOps |
| IMP-H008 | P | Recharts 411 KB sin lazy load | Media | LCP dashboard | `React.lazy` en DashboardPage | Mejor P-04 | Frontend Dev |
| IMP-H009 | F | Lotes solo GET/POST | Media | Sin corrección operativa | PUT/PATCH/DELETE con auditoría | Flexibilidad lotes | Backend Dev |
| IMP-H010 | F | ML no en runtime | Media | Expectativa IA | Integrar modelo o renombrar UI | Alineación producto | Product Owner |
| IMP-H011 | U | Sin axe accesibilidad | Media | WCAG no verificado | axe en Login/Dashboard | U-04 medible | Frontend Dev |
| IMP-H012 | S | ESLint 2 errores | Media | Lint no ejecutable limpio | Fix ErrorBoundary + react-hooks plugin | S-07 operativo | Frontend Dev |
| IMP-H013 | X | Health expone `dbHost` | Media | Reconocimiento infra | Omitir campos internos en prod | Menor exposición | Backend Dev |
| IMP-H014 | F | `fincas` sin API | Media | Trazabilidad geo incompleta | CRUD fincas + `finca_id` | Coherencia dominio | Full Stack |
| IMP-H015 | P | JMeter solo health | Media | Rendimiento no representativo | Plan JMeter JWT negocio | Baseline P real | QA |

---

## Baja

| ID | Área | Problema | Prioridad | Impacto | Solución | Beneficio | Responsable |
|----|------|----------|-----------|---------|----------|-----------|-------------|
| IMP-H016 | U | Cypress mayo 2026 | Baja | Evidencia obsoleta | Re-ejecutar y archivar JSON | ICACIT vigente | QA |
| IMP-H017 | S | Sin captura Sonar Gate | Baja | Informe visual incompleto | Export post-CI | Evidencia S-07 | QA |

---

## Resumen

| Prioridad | Hallazgos | Implementados en código |
|-----------|-----------|-------------------------|
| Crítica | 1 | 0 |
| Alta | 5 | 0 |
| Media | 9 | 0 |
| Baja | 2 | 0 |
| **Total pendiente** | **17** | **0 correcciones post-Paso 02** |

**Nota:** Correcciones Sonar históricas (IMP-P01–P05) permanecen implementadas; no forman parte de este plan pendiente.

---

*Ordenado por prioridad. Paso 04 OWASP puede ejecutarse en paralelo con remediación IMP-H001.*
