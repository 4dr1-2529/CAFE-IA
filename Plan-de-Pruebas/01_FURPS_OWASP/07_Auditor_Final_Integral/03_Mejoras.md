# Plan Consolidado de Mejoras — CAFE-IA

**Actividad:** Paso 7 — Auditor Final Integral  
**Fecha:** 24 de junio de 2026  
**Origen:** Consolidación FUR-001–018, IMP-H001–017, OW-001–015 (deduplicados)  
**Estado actual remediación:** 0 %

---

| ID | Área | Problema | Prioridad | Riesgo | Solución | Beneficio | Responsable |
|----|------|----------|-----------|--------|----------|-----------|-------------|
| **CON-001** | FUR / R / A08 | `LoteService.create` sin transacción SQL | **P1** | Crítico | BEGIN/COMMIT/ROLLBACK en operación multi-tabla | Integridad datos lotes/trazabilidad/inventario | Backend |
| **CON-002** | Seguridad / A05 | Health expone `dbHost`, `database`, `pid` | **P1** | Alto | Reducir payload `/api/health` | Menor reconocimiento infraestructura | DevSecOps |
| **CON-003** | Seguridad / A05 | CORS permite `*.vercel.app` | **P1** | Alto | Lista blanca explícita en `CORS_ORIGINS` | Control orígenes cross-origin | DevSecOps |
| **CON-004** | Seguridad / A01 | Tablas `permisos` sin enforcement | **P1** | Alto | Middleware permisos o eliminar tablas | Coherencia RBAC diseño/código | Arquitecto + Backend |
| **CON-005** | Seguridad / A06 | CVE HIGH `form-data` backend | **P1** | Alto | `npm audit fix`; verificar lockfile | Elimina CVE documentado | DevSecOps |
| **CON-006** | QA / DevOps | Cypress no en CI | **P1** | Alto | Job GitHub Actions E2E | Regresiones UI detectadas en merge | QA + DevOps |
| **CON-007** | Ops / R | Backups MySQL no documentados | **P1** | Alto | Política backup Railway documentada | Continuidad negocio | DevOps |
| **CON-008** | Seguridad / A06 | CVE frontend (react-router, esbuild) | **P2** | Medio | Actualizar dependencias; audit fix | Reduce superficie SPA | Frontend |
| **CON-009** | Seguridad / A02 | JWT en localStorage | **P2** | Medio | Cookies httpOnly + Secure + SameSite | Mitiga robo sesión XSS | Frontend + Backend |
| **CON-010** | Seguridad / A07 | Registro acepta `rol` en body | **P2** | Medio | Forzar rol `cliente` en register | Previene escalación privilegios | Backend |
| **CON-011** | Seguridad / A07 | Sin endpoint refresh token | **P2** | Medio | `POST /auth/refresh` con revocación | Ciclo sesión completo | Backend |
| **CON-012** | DevOps / A08 | CI audit `continue-on-error` | **P2** | Medio | Fallar pipeline en CVE HIGH | Gate seguridad cadena suministro | DevSecOps |
| **CON-013** | Seguridad / A07 | Contraseña mínima 6 chars | **P2** | Medio | Política ≥12 + complejidad | Fortalece autenticación | Backend + QA |
| **CON-014** | Performance | JMeter solo health | **P2** | Medio | Escenarios login, lotes, dashboard JWT | Baseline rendimiento real | QA |
| **CON-015** | Performance | Chunk Recharts 411 KB | **P3** | Medio | Lazy load componentes charts | Mejor LCP dashboard | Frontend |
| **CON-016** | Functionality | Lotes sin PUT/DELETE | **P3** | Medio | Soft-delete y actualización | Corrección errores operativos | Backend |
| **CON-017** | Functionality | ML desacoplado | **P3** | Medio | Integrar `ml/` o renombrar módulo IA | Alineación expectativas | Arquitecto |
| **CON-018** | Usability | Sin axe accesibilidad | **P3** | Bajo | Integrar axe-core en CI | WCAG verificable | Frontend + QA |
| **CON-019** | Supportability | Cobertura Sonar 0 % | **P3** | Medio | c8 + upload lcov SonarCloud | Visibilidad deuda tests | QA + DevOps |
| **CON-020** | DevOps / A08 | SKIP_INTEGRATION en CI | **P3** | Medio | MySQL service container en CI | Tests integración auth | DevOps |
| **CON-021** | Seguridad / A07 | Sin recovery contraseña | **P4** | Bajo | Flujo forgot-password | Auto-servicio usuarios | Backend |
| **CON-022** | Seguridad / A09 | Sin APM/SIEM | **P4** | Bajo | Alertas Railway + agregador logs | Detección incidentes | DevOps |
| **CON-023** | Functionality | Fincas sin API/UI | **P4** | Bajo | CRUD fincas | Trazabilidad geográfica | Backend + Frontend |
| **CON-024** | QA | Evidencias Cypress/Sonar obsoletas | **P4** | Bajo | Re-ejecutar y exportar | ICACIT evidencia actual | QA |

---

## Objetivos post-implementación

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| Calidad general | 77 % | ≥ 85 % |
| Seguridad OWASP | 76 % | ≥ 85 % |
| Remediación consolidada | 0 % | ≥ 80 % P1–P2 |
| Hallazgos Crítico/Alto abiertos | 7 | 0 |
| Cumplimiento ICACIT | 78 % | ≥ 85 % |

---

## Roadmap sugerido

| Sprint | IDs | Duración |
|--------|-----|----------|
| Sprint 1 — Seguridad crítica | CON-001 a CON-005 | 2 semanas |
| Sprint 2 — CI/CD y QA | CON-006, CON-007, CON-012, CON-020 | 2 semanas |
| Sprint 3 — Auth y deps | CON-008 a CON-013 | 3 semanas |
| Sprint 4 — Performance y funcional | CON-014 a CON-017 | 4 semanas |
| Backlog | CON-018 a CON-024 | Continuo |

---

*Plan único consolidado — Paso 07 — listo para ejecución y Paso 08.*
