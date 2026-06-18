# 06 — Evaluación OWASP Top 10

Análisis basado en `backend/src/app.js`, middleware de seguridad, `AuthService.js`, `env.js`, validadores y `docs/sonarqube/CORRECCIONES_SONARQUBE.md`. Matriz: [Matrices/Matriz_OWASP.xlsx](Matrices/Matriz_OWASP.xlsx).

---

## 1. A03:2021 — Injection (SQL Injection)

| Campo | Valor |
|-------|-------|
| **Estado** | Mitigado |
| **Evidencia** | Consultas con placeholders `?` en repositories; `reportesSql.js` estático; `scopedQuery.js`; `sqlScope.js` whitelist; `mysql.escapeId` en migrate |
| **Riesgo** | Bajo (post-corrección Sonar en ReportesRepository) |
| **Impacto** | Crítico si explotado — acceso/modificación BD |
| **Recomendación** | Mantener prohibición de SQL dinámico con input usuario; revisar `BaseDatosController` acceso tablas |

---

## 2. A03:2021 — Cross-Site Scripting (XSS)

| Campo | Valor |
|-------|-------|
| **Estado** | Mitigado parcial |
| **Evidencia** | React escapa JSX por defecto; API responde JSON; Helmet headers |
| **Riesgo** | Medio en export PDF si datos no sanitizados |
| **Impacto** | Robo sesión / ejecución script en cliente |
| **Recomendación** | Auditar contenido insertado en PDFKit; CSP estricta vía Helmet |

---

## 3. A01:2021 — Broken Access Control

| Campo | Valor |
|-------|-------|
| **Estado** | Mitigado parcial |
| **Evidencia** | `readGuard`, `writeGuard`, `adminGuard`; `scopedQuery` filtra por `user_id` cliente; `AdminRoute` frontend |
| **Riesgo** | Medio — auth opcional en dev (`devOrAuth`, `REQUIRE_AUTH=false`) |
| **Impacto** | Acceso a datos de otros productores |
| **Recomendación** | Forzar auth en staging; tests RBAC ampliados (PF-11 cubre parcialmente) |

---

## 4. A07:2021 — Identification and Authentication Failures

| Campo | Valor |
|-------|-------|
| **Estado** | Mitigado |
| **Evidencia** | JWT HS256, `JWT_SECRET` min 32 chars; bcrypt cost 10; refresh hash SHA-256 en `sesiones`; logout revoca token |
| **Riesgo** | Bajo-Medio |
| **Impacto** | Suplantación de identidad |
| **Recomendación** | Política contraseñas más estricta en producción; rotación JWT_SECRET documentada |

---

## 5. A05:2021 — Security Misconfiguration

| Campo | Valor |
|-------|-------|
| **Estado** | Mitigado parcial |
| **Evidencia** | Helmet; CORS whitelist + Vercel pattern; `CORS_ORIGINS` obligatorio en prod; rate limit |
| **Riesgo** | Medio |
| **Impacto** | Exposición API, CSRF-like desde orígenes no autorizados |
| **Recomendación** | Revisar `MYSQL_SSL_REJECT_UNAUTHORIZED` en Railway; deshabilitar registro público (ya hecho) |

---

## 6. CSRF

| Campo | Valor |
|-------|-------|
| **Estado** | No aplicable (API stateless) |
| **Evidencia** | Autenticación Bearer header, no cookies de sesión para API |
| **Riesgo** | Bajo |
| **Impacto** | Limitado en arquitectura SPA+JWT |
| **Recomendación** | Si se migran tokens a cookies, implementar SameSite + CSRF token |

---

## 7. JWT — Configuración y almacenamiento

| Campo | Valor |
|-------|-------|
| **Estado** | Mitigado |
| **Evidencia** | `env.js`: secreto obligatorio; expiración 8h; frontend almacena token (AuthContext/localStorage — verificar implementación client) |
| **Riesgo** | Medio si XSS compromete localStorage |
| **Impacto** | Robo de sesión |
| **Recomendación** | Evaluar httpOnly cookies para refresh token |

---

## 8. Variables de entorno

| Campo | Valor |
|-------|-------|
| **Estado** | Mitigado |
| **Evidencia** | `.env.example` sin secretos reales; `vite.config.js` solo `VITE_*`; corrección Sonar leakage |
| **Riesgo** | Bajo post-corrección |
| **Impacto** | Exposición credenciales MySQL/JWT |
| **Recomendación** | Verificar que `.env` esté en `.gitignore` (confirmado en repo) |

---

## 9. CORS

| Campo | Valor |
|-------|-------|
| **Estado** | Controlado |
| **Evidencia** | `app.js`: Set de orígenes + regex `*.vercel.app` + LAN dev |
| **Riesgo** | Medio si regex demasiado permisiva |
| **Impacto** | Lectura API desde sitio malicioso con credenciales usuario |
| **Recomendación** | Restringir previews Vercel a proyecto específico si es posible |

---

## 10. A02:2021 — Cryptographic Failures / Exposición de datos

| Campo | Valor |
|-------|-------|
| **Estado** | Mitigado |
| **Evidencia** | Passwords bcrypt; refresh hashed; mensajes login genéricos "Credenciales inválidas" |
| **Riesgo** | Bajo |
| **Impacto** | Filtración PII |
| **Recomendación** | No loguear bodies con contraseñas en producción |

---

## 11. A06:2021 — Vulnerable and Outdated Components

| Campo | Valor |
|-------|-------|
| **Estado** | Mitigado parcial |
| **Evidencia** | CI `npm audit --audit-level=high`; overrides `uuid@^11.1.1`, `tmp@^0.2.6`; `joblib>=1.5.3` |
| **Riesgo** | Medio — audit con `continue-on-error: true` |
| **Impacto** | Explotación CVE en dependencias |
| **Recomendación** | Fallar CI en vulnerabilidades high/critical |

---

## 12. A09:2021 — Security Logging and Monitoring Failures

| Campo | Valor |
|-------|-------|
| **Estado** | Implementado |
| **Evidencia** | `ActionLogService`, `auditMiddleware`, tabla `auditoria_logs`, login/logout audit |
| **Riesgo** | Bajo-Medio |
| **Impacto** | Falta trazabilidad incidentes |
| **Recomendación** | Integrar con monitor externo (Railway logs, Sentry) — no presente en repo |

---

## Resumen OWASP

| Categoría | Estado global | Prioridad |
|-----------|---------------|-----------|
| Injection | Mitigado | — |
| XSS | Parcial | Media |
| Access Control | Parcial | Alta |
| Auth | Mitigado | — |
| Misconfiguration | Parcial | Media |
| Dependencias | Parcial | Media |
| Logging | Implementado | Baja |

**Correcciones Sonar documentadas:** 16 hallazgos con estado "Corregido" en `docs/sonarqube/CORRECCIONES_SONARQUBE.md` (SQL injection reportes, JWT hardcode, vite env leakage, supply chain CI, etc.).
