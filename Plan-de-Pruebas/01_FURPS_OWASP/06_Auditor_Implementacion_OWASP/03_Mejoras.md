# Plan de Mejoras — Implementación OWASP — CAFE-IA

**Actividad:** Paso 6 — Auditor de Implementación OWASP  
**Fecha:** 24 de junio de 2026  
**Estado remediación actual:** 0 % (0/15)  
**Orden:** Mayor a menor prioridad

---

| ID | Área | Vulnerabilidad | Prioridad | Impacto | Solución propuesta | Beneficio esperado | Responsable |
|----|------|----------------|-----------|---------|-------------------|-------------------|-------------|
| IMP-OW-001 | Infraestructura / A05 | Health expone `dbHost`, `database`, `pid` | **P1** | Reconocimiento infraestructura Railway | Reducir `/api/health` a `{ ok: true, revision }` | Elimina OW-001; +3 % A05 | DevSecOps + Backend |
| IMP-OW-002 | Infraestructura / A05 | CORS `*.vercel.app` | **P1** | Cross-origin desde previews | Eliminar regex; solo `CORS_ORIGINS` explícitos | Elimina OW-002; +4 % A05 | DevSecOps |
| IMP-OW-003 | Backend / A01 | Permisos BD sin enforcement | **P1** | RBAC granular ficticio | Middleware `checkPermiso()` o eliminar tablas | Elimina OW-003; +5 % A01/A04 | Arquitecto + Backend |
| IMP-OW-004 | Dependencias / A06 | CVE form-data HIGH | **P1** | CRLF injection multipart | `npm audit fix` backend; verificar lock | Elimina OW-004; +8 % A06 | DevSecOps |
| IMP-OW-005 | Dependencias / A06 | CVE frontend (6) | **P2** | Open redirect, esbuild dev | Actualizar react-router-dom, vite; audit fix | Elimina OW-005; +6 % A06 | Frontend |
| IMP-OW-006 | Frontend / A02 | JWT en localStorage | **P2** | Robo sesión XSS | Cookies httpOnly + Secure + SameSite | Mitiga OW-006; +5 % A02/A07 | Frontend + Backend |
| IMP-OW-007 | Backend / A07 | Rol en registro público | **P2** | Escalación admin | Ignorar `rol` en `AuthService.register` | Elimina OW-007 | Backend |
| IMP-OW-008 | Backend / A07 | Sin POST /auth/refresh | **P2** | Ciclo sesión incompleto | Endpoint refresh con hash en `sesiones` | Elimina OW-008; +6 % A07 | Backend |
| IMP-OW-009 | CI/CD / A08 | npm audit no bloqueante | **P2** | CVE en producción | Quitar `continue-on-error` en ci.yml | Elimina OW-009; +4 % A08 | DevSecOps |
| IMP-OW-010 | Backend / A07 | Contraseña mín. 6 chars | **P3** | Credenciales débiles | Validador ≥12 chars + complejidad | Elimina OW-010 | Backend + QA |
| IMP-OW-011 | Backend / A08 | LoteService sin transacción | **P3** | Integridad multi-tabla | `BEGIN`/`COMMIT` en create | Elimina OW-011; +5 % A08 | Backend |
| IMP-OW-012 | Backend / A07 | Sin recuperación contraseña | **P4** | Usuarios bloqueados | Flujo forgot-password + email | Elimina OW-012 | Backend + Frontend |
| IMP-OW-013 | Ops / A09 | Sin SIEM/APM | **P4** | Detección tardía | Alertas Railway + agregador logs | Elimina OW-013 | DevSecOps |
| IMP-OW-014 | Config / A07 | ADMIN_SEED_PASSWORD débil | **P4** | Credencial seed prod | Validar password fuerte en migrate | Elimina OW-014 | DevSecOps |
| IMP-OW-015 | CI / A08 | SKIP_INTEGRATION en CI | **P4** | Menor cobertura auth | Job MySQL + tests integración | Elimina OW-015 | QA |

---

## Objetivos post-implementación

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| Cumplimiento OWASP | 76 % | ≥ 88 % |
| Remediación hallazgos | 0 % | 100 % P1–P2 |
| Hallazgos Altos abiertos | 4 | 0 |
| A06 Vulnerable Components | 55 % | ≥ 85 % |

---

## Secuencia recomendada de implementación

```text
Sprint 1 (P1): IMP-OW-001 → IMP-OW-004 → IMP-OW-002 → IMP-OW-003
Sprint 2 (P2): IMP-OW-009 → IMP-OW-005 → IMP-OW-007 → IMP-OW-008 → IMP-OW-006
Sprint 3 (P3–P4): IMP-OW-010 → IMP-OW-011 → backlog IMP-OW-012–015
```

---

*Plan derivado de verificación de implementación — Paso 06.*
