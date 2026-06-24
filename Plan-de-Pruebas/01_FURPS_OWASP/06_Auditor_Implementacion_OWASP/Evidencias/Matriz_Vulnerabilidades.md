# Matriz de Vulnerabilidades — Implementación — CAFE-IA

**Actividad:** Paso 6 — Auditor de Implementación OWASP  
**Fecha:** 24 de junio de 2026  
**Estado:** Ningún hallazgo OW remedado en código (0/15)

---

| ID | Ref OW | Severidad | OWASP | Vulnerabilidad | Ubicación | Estado impl. | Impacto | Causa | Recomendación |
|----|--------|-----------|-------|----------------|-----------|--------------|---------|-------|---------------|
| IMP-OW-001 | OW-001 | Alto | A05 | Health expone dbHost | `app.js` L57-67 | **No implementado** | Reconocimiento infra | Sin cambio post P05 | Reducir payload health |
| IMP-OW-002 | OW-002 | Alto | A05 | CORS `*.vercel.app` | `app.js` L31-39 | **No implementado** | Cross-origin abuse | Regex mantenida | Lista blanca orígenes |
| IMP-OW-003 | OW-003 | Alto | A01/A04 | Permisos BD sin API | `schema.sql` L62-76 | **No implementado** | RBAC ficticio | Sin middleware | Implementar o eliminar |
| IMP-OW-004 | OW-004 | Alto | A06 | CVE form-data HIGH | `npm_audit_backend.txt` | **No implementado** | CRLF injection | audit fix no ejecutado | Actualizar dependencia |
| IMP-OW-005 | OW-005 | Medio | A06 | CVE frontend (6) | `npm_audit_frontend.txt` | **No implementado** | Open redirect | Versiones sin cambio | npm audit fix |
| IMP-OW-006 | OW-006 | Medio | A02/A07 | JWT localStorage | `client.js` L25-33 | **No implementado** | Robo sesión XSS | Patrón SPA | httpOnly cookies |
| IMP-OW-007 | OW-007 | Medio | A07 | Rol en register | `AuthService.js` L80-88 | **No implementado** | Escalación admin | Body acepta rol | Forzar cliente |
| IMP-OW-008 | OW-008 | Medio | A07 | Sin /auth/refresh | `auth.routes.js` | **No implementado** | Sesión incompleta | Endpoint ausente | POST /auth/refresh |
| IMP-OW-009 | OW-009 | Medio | A08 | CI audit permisivo | `ci.yml` L67-71 | **No implementado** | CVE en prod | continue-on-error | Eliminar flag |
| IMP-OW-010 | OW-010 | Medio | A07 | Pwd mín. 6 chars | `AuthService.js` L85-86 | **No implementado** | Credenciales débiles | Sin endurecer | Min 12 + complejidad |
| IMP-OW-011 | OW-011 | Medio | A08 | LoteService sin TX | `LoteService.js` L108-122 | **No implementado** | Datos inconsistentes | Sin BEGIN/COMMIT | Transacción SQL |
| IMP-OW-012 | OW-012 | Bajo | A07 | Sin recovery password | `auth.routes.js` | **No implementado** | Usuarios bloqueados | Feature ausente | Flujo reset |
| IMP-OW-013 | OW-013 | Bajo | A09 | Sin SIEM/APM | — | **No implementado** | Detección tardía | Sin ops | Alertas Railway |
| IMP-OW-014 | OW-014 | Bajo | A07 | Seed password débil | `backend_env.example.txt` L19 | **No implementado** | Credencial seed | admin123 ejemplo | Password fuerte |
| IMP-OW-015 | OW-015 | Bajo | A08 | SKIP_INTEGRATION CI | `ci.yml` L25 | **No implementado** | Cobertura auth | Tests off | Job MySQL CI |

---

## Resumen

| Severidad | Total | Implementados | Pendientes |
|-----------|-------|---------------|------------|
| Alto | 4 | 0 | 4 |
| Medio | 7 | 0 | 7 |
| Bajo | 4 | 0 | 4 |
| **Total** | **15** | **0** | **15** |

---

*Excel: `Matriz_Vulnerabilidades.xlsx`*
