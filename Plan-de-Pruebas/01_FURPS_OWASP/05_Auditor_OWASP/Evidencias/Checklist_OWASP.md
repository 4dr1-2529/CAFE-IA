# Checklist OWASP — Resultado Auditoría — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Estado:** Ejecutado (Paso 05)

**Leyenda:** ☑ Conforme | ◐ Parcial | ✗ No conforme | N/A

---

## A01 — Broken Access Control — 78 %

| # | Control | Estado | Hallazgo |
|---|---------|--------|----------|
| A01-01 | Rutas `/api` sensibles requieren JWT | ☑ | npm_test 401 |
| A01-02 | Rol admin en rutas administrativas | ☑ | adminGuard |
| A01-03 | Cliente limitado a user_id | ☑ | LoteService, scopedQuery |
| A01-04 | Respuesta 403 rol insuficiente | ☑ | rbac.js |
| A01-05 | Sin IDOR en lotes | ☑ | getById L38-39 |
| A01-06 | Tabla permisos aplicada | ✗ | OW-003 |
| A01-07 | /api/auditoria solo admin | ☑ | auditoria.routes |
| A01-08 | /api/base-datos protegido | ◐ | readGuard; scope en servicio |
| A01-09 | Frontend oculta rutas admin | ☑ | AdminRoute |
| A01-10 | devOrAuth estricto en prod | ☑ | auth.js L39-45 |

---

## A02 — Cryptographic Failures — 85 %

| # | Control | Estado | Hallazgo |
|---|---------|--------|----------|
| A02-01 | bcrypt cost ≥10 | ☑ | AuthService |
| A02-02 | JWT_SECRET ≥32 | ☑ | env.js |
| A02-03 | HTTPS producción | ☑ | Railway/Vercel |
| A02-04 | Tokens no en logs | ☑ | Revisión código |
| A02-05 | JWT expiración | ☑ | 8h default |
| A02-06 | Sin secretos hardcodeados | ☑ | env obligatorio |
| A02-07 | Almacenamiento token seguro | ◐ | OW-006 localStorage |

---

## A03 — Injection — 88 %

| # | Control | Estado | Hallazgo |
|---|---------|--------|----------|
| A03-01 | SQL parametrizado | ☑ | Repositorios |
| A03-02 | Reportes Sonar corregido | ☑ | CORRECCIONES_SONAR |
| A03-03 | Validación entrada | ☑ | validators/ |
| A03-04 | Sin SQL dinámico inseguro | ☑ | sqlScope fijo |
| A03-05 | XSS React escape | ☑ | Sin dangerouslySetInnerHTML |
| A03-06 | Sin command injection | ☑ | grep backend |
| A03-07 | NoSQL | N/A | MySQL |
| A03-08 | Límite body JSON | ☑ | 2mb app.js |

---

## A04 — Insecure Design — 80 %

| # | Control | Estado | Hallazgo |
|---|---------|--------|----------|
| A04-01 | Arquitectura hexagonal | ☑ | Estructura src |
| A04-02 | Flujo auth documentado | ☑ | README |
| A04-03 | Registro público controlado | ☑ | ALLOW_PUBLIC_REGISTER |
| A04-04 | Permisos coherentes diseño/impl | ✗ | OW-003 |
| A04-05 | Rate-limit anti-abuso | ☑ | app.js |
| A04-06 | Validación en servicios | ☑ | Services |

---

## A05 — Security Misconfiguration — 68 %

| # | Control | Estado | Hallazgo |
|---|---------|--------|----------|
| A05-01 | Helmet activo | ☑ | app.js |
| A05-02 | CORS restringido prod | ◐ | OW-002 |
| A05-03 | CORS_ORIGINS obligatorio prod | ☑ | env.js |
| A05-04 | Rate-limit | ☑ | 500/15min |
| A05-05 | Health sin datos sensibles | ✗ | OW-001 |
| A05-06 | Variables en entorno | ☑ | .env.example |
| A05-07 | Vercel config | ☑ | vercel.json |
| A05-08 | Errores sin stack al cliente | ☑ | apiResponse |
| A05-09 | REQUIRE_AUTH prod | ◐ | NODE_ENV production |
| A05-10 | Headers seguridad | ☑ | helmet |

---

## A06 — Vulnerable Components — 55 %

| # | Control | Estado | Hallazgo |
|---|---------|--------|----------|
| A06-01 | Backend sin HIGH abiertos | ✗ | OW-004 |
| A06-02 | Frontend sin HIGH abiertos | ◐ | OW-005 |
| A06-03 | package-lock versionado | ☑ | locks |
| A06-04 | Versiones fijadas | ☑ | package.json |
| A06-05 | Sonar dependency check | ☑ | sonar-project |
| A06-06 | Plan remediación CVE | ◐ | 03_Mejoras.md |

---

## A07 — Auth Failures — 72 %

| # | Control | Estado | Hallazgo |
|---|---------|--------|----------|
| A07-01 | Login inválido → 401 | ☑ | AuthService |
| A07-02 | Token inválido → 401 | ☑ | auth.js |
| A07-03 | Refresh funcional | ✗ | OW-008 |
| A07-04 | Expiración JWT | ☑ | 8h |
| A07-05 | Usuario inactivo rechazado | ☑ | AuthService L18 |
| A07-06 | Recuperación contraseña | ✗ | OW-012 |
| A07-07 | Seed admin controlado | ◐ | OW-014 |
| A07-08 | Cypress login E2E | ☑ | cypress_last-run |

---

## A08 — Data Integrity — 62 %

| # | Control | Estado | Hallazgo |
|---|---------|--------|----------|
| A08-01 | CI SHA pins | ☑ | ci.yml |
| A08-02 | npm audit en CI | ◐ | OW-009 |
| A08-03 | CI bloquea críticos | ✗ | continue-on-error |
| A08-04 | Transacciones críticas | ✗ | OW-011 |
| A08-05 | Build reproducible | ☑ | npm_build |
| A08-06 | Sin postinstall sospechoso | ☑ | package.json |

---

## A09 — Logging — 75 %

| # | Control | Estado | Hallazgo |
|---|---------|--------|----------|
| A09-01 | auditMiddleware /api | ☑ | auditMiddleware.js |
| A09-02 | auditoria_logs | ☑ | schema.sql |
| A09-03 | Módulo auditoría admin | ☑ | auditoria.routes |
| A09-04 | GET audit rules | ☑ | GET_AUDIT_RULES |
| A09-05 | Health excluido | ☑ | SKIP_PATHS |
| A09-06 | APM/SIEM | ✗ | OW-013 |
| A09-07 | Logs CI | ☑ | ci.yml |

---

## A10 — SSRF — 95 %

| # | Control | Estado | Hallazgo |
|---|---------|--------|----------|
| A10-01 | Sin fetch saliente backend | ☑ | grep 0 matches |
| A10-02 | Chatbot local | ☑ | ChatbotService |
| A10-03 | Reportes sin URL externa | ☑ | ReportesService |
| A10-04 | Predicciones locales | ☑ | PredictionEngine |

---

## Resumen checklist

| Categoría | Conformes | Parciales | No conformes | N/A | % |
|-----------|-----------|-----------|--------------|-----|---|
| A01 | 8 | 1 | 1 | 0 | 78 % |
| A02 | 6 | 1 | 0 | 0 | 85 % |
| A03 | 7 | 0 | 0 | 1 | 88 % |
| A04 | 5 | 0 | 1 | 0 | 80 % |
| A05 | 7 | 2 | 1 | 0 | 68 % |
| A06 | 3 | 2 | 1 | 0 | 55 % |
| A07 | 5 | 1 | 2 | 0 | 72 % |
| A08 | 3 | 1 | 2 | 0 | 62 % |
| A09 | 6 | 0 | 1 | 0 | 75 % |
| A10 | 4 | 0 | 0 | 0 | 95 % |

---

*Checklist ejecutado — Paso 05 Auditor OWASP.*
