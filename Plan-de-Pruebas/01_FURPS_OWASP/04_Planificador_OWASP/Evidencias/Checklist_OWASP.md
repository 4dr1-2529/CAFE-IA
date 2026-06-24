# Checklist OWASP Top 10 (2021) — CAFE-IA

**Proyecto:** CAFE-IA  
**Fecha:** 24 de junio de 2026  
**Estado inicial:** Planificación (ítems sin marcar hasta Paso 05)

**Leyenda:** ☐ Pendiente | ☑ Evaluado conforme | ✗ Hallazgo | N/A No aplica

---

## A01 — Broken Access Control

| # | Control | Componente | Evidencia | Estado |
|---|---------|------------|-----------|--------|
| A01-01 | Rutas `/api` sensibles requieren JWT | `auth.js` | npm_test | ☐ |
| A01-02 | Rol `admin` requerido en rutas administrativas | `authorize('admin')` | Revisión rutas | ☐ |
| A01-03 | Rol `cliente` limitado a datos propios (`user_id`) | `scopedQuery`, repos | Revisión manual | ☐ |
| A01-04 | Respuesta 403 ante rol insuficiente | `rbac.js` | npm_test | ☐ |
| A01-05 | Sin escalación horizontal (IDOR) en lotes/reportes | API + Postman | Prueba dinámica | ☐ |
| A01-06 | Tabla `permisos` — verificar si aplica o es brecha diseño | `schema.sql` | schema.sql | ☐ |
| A01-07 | `/api/auditoria` solo admin | rutas auditoría | Revisión manual | ☐ |
| A01-08 | `/api/base-datos` protegido | `readGuard` | app.js | ☐ |
| A01-09 | Frontend oculta rutas por rol | `AppRoutes`, context | Cypress | ☐ |
| A01-10 | `devOrAuth` estricto en producción | `auth.js` L39–45 | env NODE_ENV | ☐ |

---

## A02 — Cryptographic Failures

| # | Control | Componente | Evidencia | Estado |
|---|---------|------------|-----------|--------|
| A02-01 | Contraseñas hasheadas con bcrypt (cost ≥10) | `AuthService`, `UsuarioService` | Código | ☐ |
| A02-02 | JWT_SECRET obligatorio ≥ 32 caracteres | `env.js` | backend_env.example | ☐ |
| A02-03 | HTTPS en producción Railway/Vercel | Despliegue | health, vercel | ☐ |
| A02-04 | Tokens no en logs | Revisión logs | CI logs | ☐ |
| A02-05 | JWT con expiración configurada | `env.js` jwt.expiresIn | env.js | ☐ |
| A02-06 | Sin secretos hardcodeados en código | grep secrets | Sonar | ☐ |
| A02-07 | Almacenamiento token frontend (localStorage) — riesgo XSS | AuthContext | Cypress | ☐ |

---

## A03 — Injection

| # | Control | Componente | Evidencia | Estado |
|---|---------|------------|-----------|--------|
| A03-01 | Consultas SQL parametrizadas | Repositorios | Revisión manual | ☐ |
| A03-02 | Reportes SQL — corrección Sonar verificada | `ReporteService` | CORRECCIONES_SONAR | ☐ |
| A03-03 | Validación entrada en controllers | validators | Código | ☐ |
| A03-04 | Sin concatenación SQL dinámica insegura | grep | Sonar | ☐ |
| A03-05 | XSS — React escape por defecto | Frontend | Revisión JSX | ☐ |
| A03-06 | Sin `eval`, `exec`, `child_process` en rutas | backend grep | Manual | ☐ |
| A03-07 | NoSQL — N/A (MySQL únicamente) | — | — | N/A |
| A03-08 | Límite body JSON 2mb | `app.js` | app.js | ☐ |

---

## A04 — Insecure Design

| # | Control | Componente | Evidencia | Estado |
|---|---------|------------|-----------|--------|
| A04-01 | Separación capas hexagonal | Estructura src | arquitectura.mmd | ☐ |
| A04-02 | Flujo login → JWT → RBAC documentado | Auth flow | README | ☐ |
| A04-03 | Registro público controlado por env | `ALLOW_PUBLIC_REGISTER` | env.example | ☐ |
| A04-04 | Diseño permisos granulares coherente con implementación | schema vs API | IMP-H004 ref | ☐ |
| A04-05 | Rate-limit en diseño anti-abuso | `app.js` | app.js | ☐ |
| A04-06 | Validación negocio en servicios, no solo HTTP | Services | Revisión manual | ☐ |

---

## A05 — Security Misconfiguration

| # | Control | Componente | Evidencia | Estado |
|---|---------|------------|-----------|--------|
| A05-01 | Helmet activo | `app.js` | app.js | ☐ |
| A05-02 | CORS restringido en producción | `app.js`, `env.js` | Revisión CORS | ☐ |
| A05-03 | CORS_ORIGINS obligatorio en prod | `env.js` | env.example | ☐ |
| A05-04 | Rate-limit 500 req / 15 min | `app.js` | app.js | ☐ |
| A05-05 | Health sin datos sensibles (dbHost) | `/api/health` | railway_health | ☐ |
| A05-06 | Variables sensibles solo en entorno | `.env.example` | backend_env | ☐ |
| A05-07 | Vercel SPA config segura | `vercel.json` | vercel.json | ☐ |
| A05-08 | Errores sin stack trace al cliente | `apiResponse` | Código | ☐ |
| A05-09 | `REQUIRE_AUTH` en prod | env | env.js | ☐ |
| A05-10 | Headers seguridad en respuesta API | Postman | Prueba dinámica | ☐ |

---

## A06 — Vulnerable Components

| # | Control | Componente | Evidencia | Estado |
|---|---------|------------|-----------|--------|
| A06-01 | npm audit backend sin HIGH abiertos | backend | npm_audit_backend | ☐ |
| A06-02 | npm audit frontend sin HIGH abiertos | frontend | npm_audit_frontend | ☐ |
| A06-03 | package-lock.json presente y versionado | locks | package-lock_* | ☐ |
| A06-04 | Dependencias con versiones fijadas | package.json | locks | ☐ |
| A06-05 | SonarCloud dependency analysis | sonar | sonar-project | ☐ |
| A06-06 | Plan remediación CVE documentado | — | Paso 05 | ☐ |

---

## A07 — Identification and Authentication Failures

| # | Control | Componente | Evidencia | Estado |
|---|---------|------------|-----------|--------|
| A07-01 | Login con credenciales inválidas → 401 | `/api/auth/login` | npm_test | ☐ |
| A07-02 | Token inválido → 401 | `authenticate` | npm_test | ☐ |
| A07-03 | Refresh token funcional | Auth routes | npm_test | ☐ |
| A07-04 | Expiración JWT (8h default) | env.js | env.js | ☐ |
| A07-05 | Usuario inactivo no autentica | AuthService | Tests | ☐ |
| A07-06 | Sin recuperación contraseña — documentar riesgo | — | Manual | ☐ |
| A07-07 | ADMIN_SEED_PASSWORD solo dev/migración | migrate.js | Revisión | ☐ |
| A07-08 | Cypress login E2E | PF-01/02 | cypress_last-run | ☐ |

---

## A08 — Software and Data Integrity Failures

| # | Control | Componente | Evidencia | Estado |
|---|---------|------------|-----------|--------|
| A08-01 | GitHub Actions con SHA pins | ci.yml | ci.yml | ☐ |
| A08-02 | npm audit en CI | ci.yml | ci.yml | ☐ |
| A08-03 | CI no ignora fallos críticos sin documentar | continue-on-error | ci.yml | ☐ |
| A08-04 | Integridad transaccional operaciones críticas | LoteService | IMP-H001 ref | ☐ |
| A08-05 | Build frontend reproducible | npm run build | npm_build | ☐ |
| A08-06 | Sin scripts postinstall sospechosos | package.json | locks | ☐ |

---

## A09 — Security Logging and Monitoring Failures

| # | Control | Componente | Evidencia | Estado |
|---|---------|------------|-----------|--------|
| A09-01 | auditMiddleware en rutas `/api` | auditMiddleware.js | Código | ☐ |
| A09-02 | Registro acciones en `auditoria_logs` | ActionLogService | schema.sql | ☐ |
| A09-03 | Módulo consulta auditoría (admin) | `/api/auditoria` | Rutas | ☐ |
| A09-04 | GET audit rules para consultas sensibles | auditMiddleware | Código | ☐ |
| A09-05 | Health excluido de auditoría ruidosa | SKIP_PATHS | Código | ☐ |
| A09-06 | Monitoreo centralizado (APM/SIEM) | — | — | ☐ |
| A09-07 | Logs CI disponibles | GitHub Actions | ci.yml | ☐ |

---

## A10 — Server-Side Request Forgery

| # | Control | Componente | Evidencia | Estado |
|---|---------|------------|-----------|--------|
| A10-01 | Sin fetch/axios a URLs usuario en backend | grep backend | Manual | ☐ |
| A10-02 | Chatbot no realiza requests externos | chatbot handlers | Código | ☐ |
| A10-03 | Reportes sin importación URL externa | ReporteService | Código | ☐ |
| A10-04 | Predicciones locales (heurístico) | PredictionEngine | Código | ☐ |

---

## Resumen de avance (planificación)

| Categoría | Ítems | Pendientes | N/A |
|-----------|-------|------------|-----|
| A01 | 10 | 10 | 0 |
| A02 | 7 | 7 | 0 |
| A03 | 8 | 7 | 1 |
| A04 | 6 | 6 | 0 |
| A05 | 10 | 10 | 0 |
| A06 | 6 | 6 | 0 |
| A07 | 8 | 8 | 0 |
| A08 | 6 | 6 | 0 |
| A09 | 7 | 7 | 0 |
| A10 | 4 | 4 | 0 |
| **Total** | **72** | **71** | **1** |

---

*Checklist para ejecución en Paso 05 — Auditor OWASP.*
