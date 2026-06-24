# Matriz OWASP — Resultado Auditoría — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Estado:** Auditoría ejecutada (Paso 05)

---

## Matriz principal A01–A10

| ID | Categoría | Objetivo | Componentes | Evidencias | Herramientas | Cumplimiento | Resultado | Riesgo | Hallazgos |
|----|-----------|----------|-------------|------------|--------------|--------------|-----------|--------|-----------|
| A01 | Broken Access Control | RBAC y scope user_id | auth.js, rbac.js, LoteService, schema | npm_test, schema.sql | Manual, tests | **78 %** | Parcial | Alto | OW-003, OW-007 |
| A02 | Cryptographic Failures | bcrypt, JWT, HTTPS | AuthService, env.js, client.js | backend_env, client.js | Manual | **85 %** | Cumple | Medio | OW-006 |
| A03 | Injection | SQL, XSS, command | scopedQuery, sqlScope, React | CORRECCIONES_SONAR | Sonar, grep | **88 %** | Cumple | Medio | OW-005 |
| A04 | Insecure Design | Arquitectura, auth flow | Hexagonal, register | arquitectura.mmd | Manual | **80 %** | Parcial | Medio | OW-003, OW-007 |
| A05 | Security Misconfiguration | helmet, CORS, health | app.js, Railway, Vercel | railway_health, ci.yml | Manual, health | **68 %** | Parcial | Alto | OW-001, OW-002 |
| A06 | Vulnerable Components | CVE npm | package.json, locks | npm_audit_* | npm audit | **55 %** | No cumple | Medio | OW-004, OW-005 |
| A07 | Auth Failures | Login, JWT, roles | auth.routes, AuthService | npm_test, Cypress | Tests, manual | **72 %** | Parcial | Alto | OW-006–008, OW-010, OW-012 |
| A08 | Data Integrity | CI, locks, TX | ci.yml, LoteService | ci.yml, IMP-H001 | Manual CI | **62 %** | Parcial | Medio | OW-009, OW-011, OW-015 |
| A09 | Logging & Monitoring | Auditoría HTTP | auditMiddleware, BD | schema.sql | Manual | **75 %** | Parcial | Medio | OW-013 |
| A10 | SSRF | Requests salientes | chatbot, reportes | grep backend | Manual | **95 %** | Cumple | Bajo | — |

---

## Promedio global: 76 %

---

*Versión Excel: `Matriz_OWASP.xlsx`*
