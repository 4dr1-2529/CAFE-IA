# Matriz de Hallazgos Final — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Total:** 24 hallazgos · 0 resueltos · 0 % remediación

---

| ID | Problema | Área | Severidad | Prioridad | Estado | Acción correctiva |
|----|----------|------|-----------|-----------|--------|-------------------|
| CON-001 | Sin TX SQL en LoteService.create | Integridad | Crítico | P1 | Pendiente | BEGIN/COMMIT/ROLLBACK |
| CON-002 | Health expone dbHost | Seguridad/A05 | Alto | P1 | Pendiente | Sanitizar health |
| CON-003 | CORS *.vercel.app amplio | Seguridad/A05 | Alto | P1 | Pendiente | CORS whitelist |
| CON-004 | Permisos BD sin enforcement | Seguridad/A01 | Alto | P1 | Pendiente | Middleware RBAC |
| CON-005 | CVE form-data HIGH | Seguridad/A06 | Alto | P1 | Pendiente | npm audit fix |
| CON-006 | Cypress fuera CI | QA/DevOps | Alto | P1 | Pendiente | Job Cypress CI |
| CON-007 | Backups no documentados | Ops/R | Alto | P1 | Pendiente | Política Railway |
| CON-008 | CVE frontend (6) | Seguridad/A06 | Medio | P2 | Pendiente | Actualizar deps |
| CON-009 | JWT localStorage | Seguridad/A02 | Medio | P2 | Pendiente | Cookies httpOnly |
| CON-010 | Rol en registro | Seguridad/A07 | Medio | P2 | Pendiente | Forzar rol cliente |
| CON-011 | Sin /auth/refresh | Seguridad/A07 | Medio | P2 | Pendiente | Endpoint refresh |
| CON-012 | CI audit no bloqueante | DevOps/A08 | Medio | P2 | Pendiente | Gate audit |
| CON-013 | Contraseña min 6 | Seguridad/A07 | Medio | P2 | Pendiente | Política ≥12 |
| CON-014 | JMeter solo health | Performance | Medio | P2 | Pendiente | APIs JWT |
| CON-015 | Chunk Recharts 411KB | Performance | Medio | P3 | Pendiente | Lazy load |
| CON-016 | Lotes sin PUT/DELETE | Funcionalidad | Medio | P3 | Pendiente | Soft-delete |
| CON-017 | ML desacoplado | Funcionalidad | Medio | P3 | Pendiente | Integrar/documentar |
| CON-018 | Sin axe a11y | Usabilidad | Medio | P3 | Pendiente | axe-core |
| CON-019 | Sonar 0% cov | Supportability | Medio | P3 | Pendiente | c8+lcov |
| CON-020 | SKIP_INTEGRATION CI | DevOps/A08 | Medio | P3 | Pendiente | MySQL CI |
| CON-021 | Sin recovery pwd | Seguridad/A07 | Bajo | P4 | Pendiente | forgot-password |
| CON-022 | Sin APM/SIEM | Seguridad/A09 | Bajo | P4 | Pendiente | Alertas |
| CON-023 | Fincas sin API/UI | Funcionalidad | Bajo | P4 | Pendiente | CRUD fincas |
| CON-024 | Evidencias CY/SQ viejas | QA/Docs | Bajo | P4 | Pendiente | Re-ejecutar |

---

## Resumen por severidad

| Severidad | Total | Resueltos | Pendientes |
|-----------|-------|-----------|------------|
| Crítico | 1 | 0 | 1 |
| Alto | 6 | 0 | 6 |
| Medio | 14 | 0 | 14 |
| Bajo | 3 | 0 | 3 |

---

*Matriz Hallazgos Final — ICACIT Paso 7 — ver `Matriz_Hallazgos_Final.xlsx`.*
