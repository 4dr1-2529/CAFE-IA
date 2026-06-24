# Plan Consolidado de Mejoras — Conclusión General — CAFE-IA

**Actividad:** Paso 8 — Conclusión General  
**Fecha:** 24 de junio de 2026  
**Origen:** Pasos 02, 03, 05, 06 y 07 (FUR, IMP-H, OW, CON)  
**Estado remediación:** 0 %

---

| ID | Área | Problema | Riesgo | Prioridad | Solución propuesta | Beneficio esperado |
|----|------|----------|--------|-----------|-------------------|-------------------|
| CON-001 | FUR / R / A08 | `LoteService.create` sin transacción SQL | Crítico | **P1** | BEGIN/COMMIT/ROLLBACK multi-tabla | Integridad datos lotes |
| CON-002 | Seguridad / A05 | Health expone `dbHost` y metadatos | Alto | **P1** | Sanitizar `/api/health` | Reduce reconocimiento infra |
| CON-003 | Seguridad / A05 | CORS `*.vercel.app` amplio | Alto | **P1** | Lista blanca `CORS_ORIGINS` | Control cross-origin |
| CON-004 | Seguridad / A01 | Permisos BD sin enforcement | Alto | **P1** | Middleware o eliminar tablas | RBAC coherente |
| CON-005 | Seguridad / A06 | CVE HIGH form-data | Alto | **P1** | `npm audit fix` backend | Elimina CVE documentado |
| CON-006 | QA / DevOps | Cypress fuera de CI | Alto | **P1** | Job E2E GitHub Actions | Regresiones UI en merge |
| CON-007 | Ops / R | Backups MySQL no documentados | Alto | **P1** | Política backup Railway | Continuidad negocio |
| CON-008 | Seguridad / A06 | CVE frontend (6) | Medio | **P2** | Actualizar react-router, deps | Superficie SPA reducida |
| CON-009 | Seguridad / A02 | JWT en localStorage | Medio | **P2** | Cookies httpOnly | Mitiga robo sesión XSS |
| CON-010 | Seguridad / A07 | Rol en registro público | Medio | **P2** | Forzar rol `cliente` | Previene escalación |
| CON-011 | Seguridad / A07 | Sin POST /auth/refresh | Medio | **P2** | Endpoint refresh + revocación | Ciclo sesión completo |
| CON-012 | DevOps / A08 | CI audit no bloqueante | Medio | **P2** | Quitar `continue-on-error` | Gate CVE en pipeline |
| CON-013 | Seguridad / A07 | Contraseña mín. 6 chars | Medio | **P2** | Política ≥12 + complejidad | Autenticación robusta |
| CON-014 | Performance | JMeter solo health | Medio | **P2** | Escenarios API con JWT | Baseline rendimiento real |
| CON-015 | Performance | Chunk Recharts 411 KB | Medio | **P3** | Lazy load charts | Mejor LCP dashboard |
| CON-016 | Functionality | Lotes sin PUT/DELETE | Medio | **P3** | Soft-delete | Corrección operativa |
| CON-017 | Functionality | ML desacoplado de runtime | Medio | **P3** | Integrar o documentar IA | Expectativas alineadas |
| CON-018 | Usability | Sin axe accesibilidad | Bajo | **P3** | axe-core en CI | WCAG verificable |
| CON-019 | Supportability | Cobertura Sonar 0 % | Medio | **P3** | c8 + lcov SonarCloud | Deuda tests visible |
| CON-020 | DevOps / A08 | SKIP_INTEGRATION en CI | Medio | **P3** | MySQL service en CI | Tests integración auth |
| CON-021 | Seguridad / A07 | Sin recovery contraseña | Bajo | **P4** | Flujo forgot-password | Auto-servicio usuarios |
| CON-022 | Seguridad / A09 | Sin APM/SIEM | Bajo | **P4** | Alertas Railway | Detección incidentes |
| CON-023 | Functionality | Fincas sin API/UI | Bajo | **P4** | CRUD fincas | Trazabilidad geográfica |
| CON-024 | QA | Evidencias Cypress/Sonar viejas | Bajo | **P4** | Re-ejecutar y exportar | ICACIT actualizado |

---

## Objetivos tras remediación

| Métrica | Actual | Meta |
|---------|--------|------|
| Calidad general | 77 % | ≥ 85 % |
| Seguridad OWASP | 76 % | ≥ 85 % |
| Hallazgos Crítico/Alto | 7 | 0 |
| Cumplimiento ICACIT | 78 % | ≥ 85 % |

---

*Plan único de cierre — derivado de evaluación Pasos 01–07.*
