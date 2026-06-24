# Plan de Mejora — PDCA — ICACIT Paso 6 — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Hallazgos base:** CON-001–CON-024  
**Estado remediación:** 0 %

---

## Visión general

| Sprint | Prioridad | Hallazgos | Plazo | Meta |
|--------|-----------|-----------|-------|------|
| P1 | Crítico/Alto | CON-001–007 | 1–2 sem | 0 hallazgos C/A |
| P2 | Medio seguridad | CON-008–014 | 2–3 sem | OWASP ≥ 85 % |
| P3 | Deuda técnica | CON-015–020 | 3–4 sem | Sonar > 0 %; CI completo |
| P4 | Incremental | CON-021–024 | 4+ sem | ICACIT ≥ 85 % |

---

## Sprint P1 — Integridad y seguridad operativa

### Plan
- Priorizar CON-001 (crítico) y CON-002 a CON-007 (altos).
- Asignar: Backend Dev (001, 002, 004, 005), DevOps (003, 007), QA/DevOps (006).

### Do
| ID | Acción | Responsable | Tiempo |
|----|--------|-------------|--------|
| CON-001 | Transacción SQL multi-tabla | Backend | 2–3 días |
| CON-002 | Sanitizar health | Backend | 0.5 día |
| CON-003 | CORS whitelist | DevOps | 0.5 día |
| CON-004 | RBAC middleware | Backend | 2 días |
| CON-005 | npm audit fix | Backend | 0.5 día |
| CON-006 | Cypress en CI | QA/DevOps | 1–2 días |
| CON-007 | Política backup Railway | DevOps | 1 día |

### Check
- npm test 18/18 sin regresión.
- npm audit: 0 CVE HIGH backend.
- `/api/health` sin `dbHost`.
- Job Cypress en pipeline verde.

### Act
- Actualizar `ICACIT/05_Metricas`.
- Registrar evidencias en corpus EV.

---

## Sprint P2 — Seguridad profunda y rendimiento

### Plan
- CON-008 a CON-014; foco OWASP A02, A06, A07, A08.

### Do
- Actualizar deps frontend; cookies httpOnly; refresh token; gate audit; política contraseñas; JMeter JWT.

### Check
- OWASP re-evaluación ≥ 80 %.
- JMeter escenarios documentados.

### Act
- Meta OWASP ≥ 85 %.

---

## Sprint P3 — Calidad y automatización

### Plan
- CON-015 a CON-020; MM-04, MM-06, MM-08.

### Do
- Lazy load; soft-delete; documentar ML; axe-core; c8+lcov; MySQL CI.

### Check
- Sonar cobertura > 0 %.
- Integración CI sin SKIP.

### Act
- Performance ≥ 75 %; calidad código ≥ 80 %.

---

## Sprint P4 — Sustentación ICACIT

### Plan
- CON-021 a CON-024; MM-09.

### Do
- Recovery password; alertas; CRUD fincas; re-ejecutar CY/SQ.

### Check
- Evidencias actualizadas; capturas UI.

### Act
- ICACIT ≥ 85 %; madurez Nivel 4.

---

## Métricas objetivo

| Indicador | Actual | Meta |
|-----------|--------|------|
| Calidad FURPS+ | 77 % | ≥ 85 % |
| OWASP | 76 % | ≥ 85 % |
| ICACIT | 82 % | ≥ 85 % |
| Hallazgos C/A | 7 | 0 |
| Remediación | 0 % | ≥ 90 % |
| Madurez | Nivel 3 | Nivel 4 |

---

*Plan de Mejora PDCA — ICACIT Paso 6 — CAFE-IA.*
