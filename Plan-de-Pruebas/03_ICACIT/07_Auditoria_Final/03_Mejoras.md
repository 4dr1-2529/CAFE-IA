# Plan Maestro de Mejoras — Auditoría Final — CAFE-IA

**Actividad:** Paso 7 — Auditoría Final  
**Fecha:** 24 de junio de 2026  
**Origen único:** CON-001–CON-024 (FURPS/08); sin duplicación  
**Estado remediación global:** 0 %

---

| ID | Área | Problema | Prioridad | Impacto | Responsable | Tiempo estimado | Estado | Beneficio esperado |
|----|------|----------|-----------|---------|-------------|-----------------|--------|-------------------|
| CON-001 | Integridad / Backend | `LoteService.create` sin transacción SQL | **P1** | Crítico — integridad datos | Backend Dev | 2–3 días | Pendiente | Elimina riesgo crítico; R ≥ 85 % |
| CON-002 | Seguridad / A05 | Health expone `dbHost` y metadatos | **P1** | Alto — reconocimiento infra | Backend Dev | 0.5 día | Pendiente | Reduce exposición A05 |
| CON-003 | Seguridad / A05 | CORS `*.vercel.app` amplio | **P1** | Alto — cross-origin | DevOps | 0.5 día | Pendiente | Control CORS producción |
| CON-004 | Seguridad / A01 | Permisos BD sin enforcement | **P1** | Alto — RBAC incoherente | Backend Dev | 2 días | Pendiente | RBAC coherente |
| CON-005 | Seguridad / A06 | CVE HIGH form-data | **P1** | Alto — cadena suministro | Backend Dev | 0.5 día | Pendiente | 0 CVE HIGH backend |
| CON-006 | QA / DevOps | Cypress fuera de CI | **P1** | Alto — regresión UI | QA / DevOps | 1–2 días | Pendiente | E2E en cada merge |
| CON-007 | Ops / R | Backups MySQL no documentados | **P1** | Alto — continuidad | DevOps | 1 día | Pendiente | DR Railway documentado |
| CON-008 | Seguridad / A06 | CVE frontend (6) | **P2** | Medio — superficie SPA | Frontend Dev | 1 día | Pendiente | 0 CVE frontend |
| CON-009 | Seguridad / A02 | JWT en localStorage | **P2** | Medio — robo sesión XSS | Full-stack | 3–5 días | Pendiente | Mitigación A02 |
| CON-010 | Seguridad / A07 | Rol en registro público | **P2** | Medio — escalación | Backend Dev | 0.5 día | Pendiente | Solo rol cliente |
| CON-011 | Seguridad / A07 | Sin POST `/auth/refresh` | **P2** | Medio — ciclo sesión | Backend Dev | 2 días | Pendiente | Refresh operativo |
| CON-012 | DevOps / A08 | CI audit no bloqueante | **P2** | Medio — CVE en merge | DevOps | 0.5 día | Pendiente | Gate seguridad CI |
| CON-013 | Seguridad / A07 | Contraseña mín. 6 chars | **P2** | Medio — fuerza bruta | Backend Dev | 0.5 día | Pendiente | Política ≥ 12 chars |
| CON-014 | Performance | JMeter solo health | **P2** | Medio — sin baseline | QA | 2 días | Pendiente | Performance ≥ 75 % |
| CON-015 | Performance | Chunk Recharts 411 KB | **P3** | Medio — LCP | Frontend Dev | 1 día | Pendiente | Carga dashboard optimizada |
| CON-016 | Functionality | Lotes sin PUT/DELETE | **P3** | Medio — operativa | Backend Dev | 2 días | Pendiente | CRUD lotes completo |
| CON-017 | Functionality | ML desacoplado runtime | **P3** | Medio — expectativas IA | ML / Backend | 5+ días | Pendiente | Alcance IA documentado |
| CON-018 | Usability | Sin axe accesibilidad | **P3** | Medio — WCAG | QA / Frontend | 1 día | Pendiente | a11y verificable |
| CON-019 | Supportability | Sonar cobertura 0 % | **P3** | Medio — deuda invisible | QA | 2 días | Pendiente | Cobertura visible |
| CON-020 | DevOps / A08 | SKIP_INTEGRATION en CI | **P3** | Medio — tests omitidos | DevOps | 2 días | Pendiente | Integración ≥ 80 % |
| CON-021 | Seguridad / A07 | Sin recovery contraseña | **P4** | Bajo — auto-servicio | Full-stack | 3 días | Pendiente | Forgot-password |
| CON-022 | Seguridad / A09 | Sin APM/SIEM | **P4** | Bajo — detección | DevOps | 2 días | Pendiente | Alertas Railway |
| CON-023 | Functionality | Fincas sin API/UI | **P4** | Bajo — trazabilidad geo | Full-stack | 5 días | Pendiente | CRUD fincas |
| CON-024 | QA / Docs | Evidencias Cypress/Sonar viejas | **P4** | Bajo — sustentación | QA | 1 día | Pendiente | ICACIT actualizado |

---

## Metas post-remediación

| Métrica | Actual | Meta |
|---------|--------|------|
| Calidad FURPS+ | 77 % | ≥ 85 % |
| Seguridad OWASP | 76 % | ≥ 85 % |
| ICACIT global | 82 % | ≥ 85 % |
| Hallazgos Crítico/Alto | 7 | 0 |
| Remediación | 0 % | ≥ 90 % |

---

*Plan Maestro único — derivado de auditoría final — ICACIT Paso 7 — CAFE-IA.*
