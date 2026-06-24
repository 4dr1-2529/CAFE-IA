# Matriz OWASP Top 10 (2021) — CAFE-IA

**Proyecto:** CAFE-IA  
**Fecha:** 24 de junio de 2026  
**Versión:** 1.0 — Planificación

---

## Matriz principal

| ID | Categoría OWASP | Objetivo | Componentes involucrados | Evidencias necesarias | Herramientas | Riesgo esperado | Criticidad | Estado | Observación preliminar |
|----|-----------------|----------|--------------------------|----------------------|--------------|-----------------|------------|--------|------------------------|
| A01 | Broken Access Control | Verificar RBAC admin/cliente y scope user_id | `auth.js`, `rbac.js`, `RoleHelper`, rutas API, `scopedQuery` | Tests 401/403, Cypress, `schema.sql` | Manual, Cypress, node:test | Alto | Alta | Pendiente | Tablas `permisos`/`rol_permisos` sin enforcement en API |
| A02 | Cryptographic Failures | Validar bcrypt, JWT, HTTPS y gestión secretos | `AuthService`, `UsuarioService`, `env.js`, migrate | `backend_env.example`, `env.js`, health HTTPS | Manual, revisión env | Medio | Media | Pendiente | JWT_SECRET ≥32 chars; rotación no documentada |
| A03 | Injection | SQL parametrizado, XSS, validación entrada | Repositorios, validators, `ReporteService`, React | `CORRECCIONES_SONARQUBE.md`, npm_test, Sonar | SonarQube, manual, grep | Alto | Alta | Pendiente | Corrección SQL reportes Sonar; 6 CVE frontend incl. react-router |
| A04 | Insecure Design | Diseño auth, permisos, arquitectura segura | Hexagonal, flujo login, `ALLOW_PUBLIC_REGISTER` | `arquitectura-solucion-cafe-ia.mmd`, README | Revisión manual | Medio | Media | Pendiente | RBAC granular en BD no reflejado en API |
| A05 | Security Misconfiguration | CORS, helmet, rate-limit, health, env deploy | `app.js`, Railway, Vercel, `ci.yml` | `railway_health_response.json`, `vercel.json`, `ci.yml` | Manual, Postman headers | Alto | Alta | Pendiente | CORS `*.vercel.app`; health expone `dbHost` |
| A06 | Vulnerable Components | CVE npm, versiones dependencias | `package.json`, locks backend/frontend | `npm_audit_backend.txt`, `npm_audit_frontend.txt` | npm audit, SonarCloud | Medio | Media-Alta | Pendiente | 8 CVE documentados (2 BE + 6 FE); form-data HIGH |
| A07 | Identification and Authentication Failures | Login, JWT, refresh, expiración, roles | `/api/auth/*`, `AuthService`, seed | `npm_test_backend.txt`, Cypress | Cypress, Postman, manual | Alto | Alta | Pendiente | Sin recuperación contraseña; seed admin en migrate |
| A08 | Software and Data Integrity Failures | CI/CD, locks, integridad build y datos | `ci.yml`, package-lock, `LoteService` | `ci.yml`, locks, CORRECCIONES_SONAR | Revisión CI, manual | Medio | Media | Pendiente | `continue-on-error` en npm audit CI |
| A09 | Security Logging and Monitoring Failures | Auditoría HTTP, logs, eventos seguridad | `auditMiddleware`, `ActionLogService`, `/api/auditoria` | Código middleware, `schema.sql` | Manual, consulta BD | Medio | Media | Pendiente | Sin APM/SIEM centralizado |
| A10 | Server-Side Request Forgery | Requests salientes, APIs externas | Chatbot, reportes, predicciones | Grep backend (sin fetch/axios) | Revisión manual código | Bajo | Baja | Pendiente | Sin patrones SSRF evidentes en `backend/src` |

---

## Dashboard resumen

| Categoría OWASP | Estado | Riesgo |
|-----------------|--------|--------|
| A01 | Pendiente | Alto |
| A02 | Pendiente | Medio |
| A03 | Pendiente | Alto |
| A04 | Pendiente | Medio |
| A05 | Pendiente | Alto |
| A06 | Pendiente | Medio |
| A07 | Pendiente | Alto |
| A08 | Pendiente | Medio |
| A09 | Pendiente | Medio |
| A10 | Pendiente | Bajo |

---

## Matriz de controles por módulo

| Módulo API | A01 | A02 | A03 | A05 | A07 | A09 |
|------------|-----|-----|-----|-----|-----|-----|
| `/api/auth` | ● | ● | ○ | ○ | ● | ○ |
| `/api/usuarios` | ● | ● | ● | ○ | ● | ● |
| `/api/dashboard` | ● | ○ | ○ | ○ | ○ | ● |
| `/api/lotes` | ● | ○ | ● | ○ | ○ | ● |
| `/api/produccion` | ● | ○ | ● | ○ | ○ | ● |
| `/api/trazabilidad` | ● | ○ | ● | ○ | ○ | ● |
| `/api/reportes` | ● | ○ | ● | ○ | ○ | ● |
| `/api/chatbot` | ● | ○ | ● | ○ | ○ | ● |
| `/api/auditoria` | ● | ○ | ○ | ○ | ○ | ● |
| `/api/predicciones` | ● | ○ | ○ | ○ | ○ | ● |
| `/api/health` | ○ | ○ | ○ | ● | ○ | ○ |
| `/api/base-datos` | ● | ○ | ● | ● | ○ | ○ |

**Leyenda:** ● = control prioritario en módulo | ○ = secundario o N/A

---

## Trazabilidad FUR/IMP → OWASP

| ID previo | Descripción | OWASP |
|-----------|-------------|-------|
| FUR-001 / IMP-H001 | LoteService.create sin transacción SQL | A08 |
| IMP-H003 | npm audit CI continue-on-error | A05, A08 |
| IMP-H004 | Permisos BD sin enforcement | A01, A04 |
| IMP-H013 | Health expone dbHost | A05 |
| FUR-010 | CVE npm dependencias | A06 |
| Sonar SQL reportes | Inyección SQL corregida | A03 |

---

## Criterios de evaluación (Paso 05)

| Resultado | Definición |
|-----------|------------|
| **Conforme** | Control implementado y verificado con evidencia |
| **Parcial** | Control parcial o con excepciones documentadas |
| **No conforme** | Hallazgo OW-xxx con remediación requerida |
| **N/A** | No aplica al stack (ej. NoSQL, SSRF) |

---

*Versión Excel disponible en `Matriz_OWASP.xlsx`.*
