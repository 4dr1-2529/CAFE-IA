# Matriz de Mejora — ICACIT Paso 6 — CAFE-IA

**Fecha:** 24 de junio de 2026

---

## Distribución por severidad

| Severidad | Cantidad | IDs | % del total |
|-----------|----------|-----|-------------|
| Crítico | 1 | CON-001 | 4.2 % |
| Alto | 6 | CON-002–CON-007 | 25.0 % |
| Medio | 14 | CON-008–CON-021 | 58.3 % |
| Bajo | 3 | CON-022–CON-024 | 12.5 % |
| **Total** | **24** | — | **100 %** |

---

## Matriz completa

| ID | Problema | Área | Severidad | Prioridad | Acción | Responsable | Tiempo | Estado |
|----|----------|------|-----------|-----------|--------|-------------|--------|--------|
| CON-001 | Sin transacción SQL lotes | Integridad/Backend | Crítico | P1 | BEGIN/COMMIT/ROLLBACK | Backend | 2–3 d | Pendiente |
| CON-002 | Health expone dbHost | Seguridad/A05 | Alto | P1 | Sanitizar health | Backend | 0.5 d | Pendiente |
| CON-003 | CORS *.vercel.app | Seguridad/A05 | Alto | P1 | CORS_ORIGINS whitelist | DevOps | 0.5 d | Pendiente |
| CON-004 | Permisos BD sin enforcement | Seguridad/A01 | Alto | P1 | Middleware RBAC | Backend | 2 d | Pendiente |
| CON-005 | CVE form-data HIGH | Seguridad/A06 | Alto | P1 | npm audit fix | Backend | 0.5 d | Pendiente |
| CON-006 | Cypress fuera CI | QA/DevOps | Alto | P1 | Job Cypress Actions | QA/DevOps | 1–2 d | Pendiente |
| CON-007 | Backups no documentados | Ops/R | Alto | P1 | Política backup Railway | DevOps | 1 d | Pendiente |
| CON-008 | CVE frontend (6) | Seguridad/A06 | Medio | P2 | Actualizar deps | Frontend | 1 d | Pendiente |
| CON-009 | JWT localStorage | Seguridad/A02 | Medio | P2 | Cookies httpOnly | Full-stack | 3–5 d | Pendiente |
| CON-010 | Rol en registro | Seguridad/A07 | Medio | P2 | Forzar rol cliente | Backend | 0.5 d | Pendiente |
| CON-011 | Sin /auth/refresh | Seguridad/A07 | Medio | P2 | Endpoint refresh | Backend | 2 d | Pendiente |
| CON-012 | CI audit no bloqueante | DevOps/A08 | Medio | P2 | Gate npm audit | DevOps | 0.5 d | Pendiente |
| CON-013 | Contraseña min 6 | Seguridad/A07 | Medio | P2 | Política ≥12 chars | Backend | 0.5 d | Pendiente |
| CON-014 | JMeter solo health | Performance | Medio | P2 | Escenarios API JWT | QA | 2 d | Pendiente |
| CON-015 | Chunk Recharts 411KB | Performance | Medio | P3 | Lazy load charts | Frontend | 1 d | Pendiente |
| CON-016 | Lotes sin PUT/DELETE | Funcionalidad | Medio | P3 | Soft-delete | Backend | 2 d | Pendiente |
| CON-017 | ML desacoplado | Funcionalidad | Medio | P3 | Integrar/documentar | ML/Backend | 5+ d | Pendiente |
| CON-018 | Sin axe a11y | Usabilidad | Medio | P3 | axe-core CI | QA/Frontend | 1 d | Pendiente |
| CON-019 | Sonar cobertura 0% | Supportability | Medio | P3 | c8 + lcov | QA | 2 d | Pendiente |
| CON-020 | SKIP_INTEGRATION CI | DevOps/A08 | Medio | P3 | MySQL service CI | DevOps | 2 d | Pendiente |
| CON-021 | Sin recovery password | Seguridad/A07 | Bajo | P4 | forgot-password | Full-stack | 3 d | Pendiente |
| CON-022 | Sin APM/SIEM | Seguridad/A09 | Bajo | P4 | Alertas Railway | DevOps | 2 d | Pendiente |
| CON-023 | Fincas sin API/UI | Funcionalidad | Bajo | P4 | CRUD fincas | Full-stack | 5 d | Pendiente |
| CON-024 | Evidencias CY/SQ viejas | QA/Docs | Bajo | P4 | Re-ejecutar/exportar | QA | 1 d | Pendiente |

---

## Matriz por categoría

| Categoría | Crítico | Alto | Medio | Bajo | Total |
|-----------|---------|------|-------|------|-------|
| Seguridad | 0 | 4 | 7 | 2 | 13 |
| DevOps/CI | 0 | 1 | 2 | 1 | 4 |
| Funcionalidad | 0 | 0 | 2 | 1 | 3 |
| Integridad | 1 | 0 | 0 | 0 | 1 |
| Performance | 0 | 0 | 2 | 0 | 2 |
| QA/Docs | 0 | 1 | 1 | 1 | 3 |

---

*Matriz de Mejora — ICACIT Paso 6 — CAFE-IA.*
