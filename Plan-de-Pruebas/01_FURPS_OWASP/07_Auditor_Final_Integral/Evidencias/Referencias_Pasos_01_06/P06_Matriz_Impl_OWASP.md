# Matriz de Implementación OWASP — CAFE-IA

**Actividad:** Paso 6 — Auditor de Implementación OWASP  
**Fecha:** 24 de junio de 2026  
**Remediación post-Paso 05:** 0 %

---

| ID | Categoría | Cumplimiento | Estado | Implementado en código | Pendiente | Evidencia | Remediación P05 |
|----|-----------|--------------|--------|------------------------|-----------|-----------|-----------------|
| A01 | Broken Access Control | **78 %** | Cumple parcialmente | adminGuard, IDOR LoteService, scopedQuery | Permisos BD sin middleware | auth.js, LoteService.js, schema.sql | OW-003 no aplicada |
| A02 | Cryptographic Failures | **85 %** | Cumple | bcrypt, JWT_SECRET≥32, refresh SHA-256 | Tokens en localStorage | AuthService.js, env.js, client.js | OW-006 pendiente |
| A03 | Injection | **88 %** | Cumple | SQL parametrizado, sqlScope, Sonar reportes | CVE react-router transitivo | scopedQuery, CORRECCIONES_SONAR | OW-005 pendiente |
| A04 | Insecure Design | **80 %** | Cumple parcialmente | Hexagonal, auth flow | Permisos incoherentes, rol register | arquitectura.mmd, AuthService.register | OW-003, OW-007 |
| A05 | Security Misconfiguration | **68 %** | Cumple parcialmente | helmet, rate-limit, CORS_ORIGINS prod | health dbHost, CORS vercel regex | app.js, railway_health | OW-001, OW-002 |
| A06 | Vulnerable Components | **55 %** | No cumple | locks, overrides uuid/tmp | CVE form-data HIGH, 6 CVE FE | npm_audit_* | OW-004, OW-005 |
| A07 | Auth Failures | **72 %** | Cumple parcialmente | login 401, expiración, logout revoke | sin refresh, recovery, pwd min 6 | auth.routes, AuthService | OW-007, 008, 010, 012 |
| A08 | Software Integrity | **62 %** | Cumple parcialmente | CI SHA pins, package-lock | audit no bloqueante, sin TX lotes | ci.yml, LoteService.js | OW-009, OW-011 |
| A09 | Logging & Monitoring | **75 %** | Cumple parcialmente | auditMiddleware, auditoria_logs | Sin SIEM/APM | auditMiddleware.js | OW-013 |
| A10 | SSRF | **95 %** | Cumple | Sin fetch saliente backend | — | grep backend/src | — |

**Promedio implementación:** 76 %

---

*Excel: `Matriz_Implementacion_OWASP.xlsx`*
