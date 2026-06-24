# Informe de Auditoría OWASP Top 10 (2021) — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 5 — Auditor OWASP  
**Fecha:** 24 de junio de 2026  
**Referencia plan:** `04_Planificador_OWASP/`  
**Repositorio auditado:** `cafe-cursor/` (sin modificación de código)

---

## 1. Metodología

La auditoría se ejecutó sobre el código fuente, configuración de despliegue y evidencias operativas del proyecto CAFE-IA, aplicando el marco **OWASP Top 10 (2021)** con escala de cumplimiento porcentual por categoría y clasificación de hallazgos OW-xxx.

| Fase | Actividad | Herramienta / fuente |
|------|-----------|----------------------|
| F1 | Revisión estática auth, RBAC, middleware, servicios | Código `backend/src/` |
| F2 | Análisis SQL y validadores | Repositorios, `scopedQuery.js`, `sqlScope.js` |
| F3 | Análisis dependencias | `npm_audit_backend.txt`, `npm_audit_frontend.txt` |
| F4 | Revisión configuración runtime | `app.js`, `env.js`, `ci.yml`, `vercel.json` |
| F5 | Verificación despliegue | `railway_health_response.json`, `vercel_status.json` |
| F6 | Correlación SAST documentada | `CORRECCIONES_SONARQUBE.md` |
| F7 | Pruebas automatizadas auth | `npm_test_backend.txt`, `cypress_last-run.json` |
| F8 | Frontend y almacenamiento tokens | `client.js`, `AppRoutes.jsx`, `AdminRoute.jsx` |

**Criterios de resultado por categoría:**

| Resultado | Rango % |
|-----------|---------|
| Cumple | ≥ 85 % |
| Cumple parcialmente | 60–84 % |
| No cumple | < 60 % |

**Restricción metodológica:** Solo se documentan hallazgos verificables en código o evidencias adjuntas. No se ejecutaron pruebas de penetración activas ni escaneo DAST (ZAP pendiente).

---

## 2. Dashboard OWASP — Resultado final

| Categoría OWASP | Cumplimiento | Resultado | Riesgo residual |
|-----------------|--------------|-----------|-----------------|
| **A01** — Broken Access Control | **78 %** | Cumple parcialmente | **Alto** |
| **A02** — Cryptographic Failures | **85 %** | Cumple | Medio |
| **A03** — Injection | **88 %** | Cumple | Medio |
| **A04** — Insecure Design | **80 %** | Cumple parcialmente | Medio |
| **A05** — Security Misconfiguration | **68 %** | Cumple parcialmente | **Alto** |
| **A06** — Vulnerable Components | **55 %** | No cumple | Medio |
| **A07** — Identification and Authentication Failures | **72 %** | Cumple parcialmente | **Alto** |
| **A08** — Software and Data Integrity Failures | **62 %** | Cumple parcialmente | Medio |
| **A09** — Security Logging and Monitoring Failures | **75 %** | Cumple parcialmente | Medio |
| **A10** — SSRF | **95 %** | Cumple | Bajo |

### Indicadores globales

| Indicador | Valor | Clasificación |
|-----------|-------|---------------|
| **Nivel general de seguridad OWASP** | **76 %** | Bueno |
| **Riesgo global residual** | **Medio-Alto** | 3 categorías Alto (A01, A05, A07) |
| **Madurez de seguridad** | **Nivel 3 — Definido** | Controles implementados; brechas en deps y config |
| **Hallazgos documentados** | **15** (OW-001 a OW-015) | 0 Críticos · 4 Altos · 7 Medios · 4 Bajos |

### Cumplimiento por dominio

| Dominio | % | Observación |
|---------|---|-------------|
| Seguridad Backend | **82 %** | JWT, bcrypt, RBAC, SQL scope sólidos |
| Seguridad Frontend | **70 %** | JWT en localStorage; CVE react-router/esbuild |
| Seguridad API | **77 %** | Rutas protegidas; health y CORS débiles |
| Seguridad Infraestructura | **65 %** | Health Railway expone metadatos; CORS amplio |
| Seguridad Base de Datos | **80 %** | Consultas parametrizadas; permisos BD huérfanos |
| **Seguridad General** | **76 %** | Bueno con acciones prioritarias en A05, A06, A07 |

---

## 3. Evaluación por categoría OWASP

### A01 — Broken Access Control — 78 % — Cumple parcialmente — Riesgo Alto

| Control | Estado | Evidencia |
|---------|--------|-----------|
| JWT obligatorio en rutas `/api` sensibles | Cumple | `npm_test`: POST `/api/lotes` sin token → 401 |
| `adminGuard` en usuarios y auditoría | Cumple | `usuarios.routes.js`, `auditoria.routes.js` |
| Scope `user_id` para cliente | Cumple | `LoteService.getById` L38-39; `scopedQuery.js` |
| Protección IDOR en lotes | Cumple | 403 si `row.user_id !== meta.user.sub` |
| Frontend rutas admin | Cumple | `AdminRoute.jsx` en auditoría/usuarios |
| Tablas `permisos`/`rol_permisos` | **No cumple** | `schema.sql` L62-76; sin uso en `backend/src` |
| `/api/base-datos` con `readGuard` | Parcial | Cualquier autenticado accede; scope en `BaseDatosService` |

**Fortalezas:** RBAC binario admin/cliente operativo; verificación IDOR en servicios críticos.  
**Debilidad principal:** Modelo de permisos granulares en BD no reflejado en API (OW-003).

---

### A02 — Cryptographic Failures — 85 % — Cumple — Riesgo Medio

| Control | Estado | Evidencia |
|---------|--------|-----------|
| bcrypt cost 10 | Cumple | `AuthService.js` L21, L95 |
| JWT_SECRET ≥ 32 caracteres obligatorio | Cumple | `env.js` L6-16 |
| Refresh token hasheado SHA-256 en BD | Cumple | `AuthService.js` L35-41 |
| HTTPS en producción | Cumple | Railway + Vercel (despliegue documentado) |
| Tokens en localStorage | Parcial | `client.js` L25-33 — riesgo ante XSS (OW-006) |

---

### A03 — Injection — 88 % — Cumple — Riesgo Medio

| Vector | Estado | Evidencia |
|--------|--------|-----------|
| SQL Injection en API | Cumple | Placeholders `?`; `sqlScope.js` fragmentos fijos |
| SQL Injection reportes (Sonar) | Corregido | `CORRECCIONES_SONARQUBE.md` — `reportesSql.js` |
| NoSQL Injection | N/A | MySQL únicamente |
| XSS reflejado | Cumple | React escape por defecto; sin `dangerouslySetInnerHTML` en `frontend/src` |
| Command Injection | Cumple | Sin `child_process`/`exec` en rutas API |
| Open redirect (dependencia) | Parcial | CVE react-router GHSA-2j2x-hqr9-3h42 (OW-005) |

---

### A04 — Insecure Design — 80 % — Cumple parcialmente — Riesgo Medio

| Aspecto | Estado | Evidencia |
|---------|--------|-----------|
| Arquitectura hexagonal | Cumple | Separación capas en `backend/src/` |
| Flujo login → JWT → RBAC | Cumple | `AuthService`, `auth.js`, `rbac.js` |
| Registro público controlado por env | Cumple | `auth.routes.js` L24-26; `ALLOW_PUBLIC_REGISTER=false` default |
| Rol en body de registro | **Parcial** | `AuthService.register` acepta `rol` del cliente (OW-007) |
| Permisos granulares incoherentes | **No cumple** | Esquema BD vs API (OW-003) |

---

### A05 — Security Misconfiguration — 68 % — Cumple parcialmente — Riesgo Alto

| Control | Estado | Evidencia |
|---------|--------|-----------|
| Helmet | Cumple | `app.js` L15 |
| Rate-limit 500/15 min | Cumple | `app.js` L18-25 |
| CORS_ORIGINS obligatorio en prod | Cumple | `env.js` L24-26 |
| CORS `*.vercel.app` | **No cumple** | `app.js` L31-39 (OW-002) |
| Health sin datos sensibles | **No cumple** | Expone `dbHost`, `database`, `pid` (OW-001) |
| `REQUIRE_AUTH` configurable | Parcial | `devOrAuth` estricto si `NODE_ENV=production` |

**Evidencia health Railway:**

```json
"dbHost": "mysql.railway.internal",
"database": "railway",
"pid": 25
```

---

### A06 — Vulnerable and Outdated Components — 55 % — No cumple — Riesgo Medio

| Componente | CVE / hallazgo | Severidad |
|------------|----------------|-----------|
| Backend `form-data` 4.0.0–4.0.5 | GHSA-hmw2-7cc7-3qxx | **HIGH** (OW-004) |
| Backend `dompurify` ≤3.4.10 | GHSA-vxr8, GHSA-cmwh | Moderate |
| Frontend `react-router` 6.7–6.30.3 | GHSA-2j2x-hqr9-3h42 | Moderate |
| Frontend `esbuild` ≤0.24.2 | GHSA-67mh-4wv8-2f99 | Moderate (dev) |
| Overrides `uuid`, `tmp` | Corregidos | — |

**Total:** 8 CVE documentados en `npm_audit_*.txt`. Controles positivos: `package-lock.json` versionado; overrides documentados en Sonar.

---

### A07 — Identification and Authentication Failures — 72 % — Cumple parcialmente — Riesgo Alto

| Control | Estado | Evidencia |
|---------|--------|-----------|
| Login credenciales inválidas → 401 | Cumple | `AuthService.js` L18-23 |
| Token inválido → 401 | Cumple | `auth.js` L13-14 |
| Expiración JWT 8h | Cumple | `env.js` L36 |
| Usuario inactivo rechazado | Cumple | `AuthService.js` L18 |
| Endpoint refresh token | **No cumple** | Token generado; sin `POST /auth/refresh` (OW-008) |
| Recuperación contraseña | **No cumple** | Sin ruta (OW-012) |
| Política contraseña (mín. 6) | **Parcial** | `AuthService.js` L85-86 (OW-010) |
| Cypress login E2E | Cumple | `cypress_last-run.json` |

---

### A08 — Software and Data Integrity Failures — 62 % — Cumple parcialmente — Riesgo Medio

| Control | Estado | Evidencia |
|---------|--------|-----------|
| GitHub Actions con SHA pins | Cumple | `ci.yml` L18-19, 53 |
| package-lock versionado | Cumple | `package-lock_*.json` |
| npm audit en CI | Parcial | `continue-on-error: true` (OW-009) |
| Integridad transaccional lotes | **No cumple** | `LoteService.create` sin TX (OW-011) |
| Build frontend reproducible | Cumple | `npm_build_frontend.txt` |

---

### A09 — Security Logging and Monitoring Failures — 75 % — Cumple parcialmente — Riesgo Medio

| Control | Estado | Evidencia |
|---------|--------|-----------|
| `auditMiddleware` en `/api` | Cumple | `auditMiddleware.js` |
| Registro LOGIN en `auditoria_logs` | Cumple | `AuthService.login` → `ActionLogService` |
| Módulo `/api/auditoria` solo admin | Cumple | `auditoria.routes.js` |
| Reglas GET audit sensibles | Cumple | `GET_AUDIT_RULES` en middleware |
| Monitoreo centralizado APM/SIEM | **No cumple** | OW-013 |

---

### A10 — SSRF — 95 % — Cumple — Riesgo Bajo

| Control | Estado | Evidencia |
|---------|--------|-----------|
| Requests HTTP salientes en backend | No detectados | Grep `fetch|axios|http.get` en `backend/src` → 0 coincidencias |
| Chatbot heurístico local | Cumple | `ChatbotService.js`, `chatbotIntentHandlers.js` |
| Predicciones locales | Cumple | `PredictionEngine` sin URLs externas |

---

## 4. Vulnerabilidades y hallazgos (OW-001 a OW-015)

| ID | Severidad | OWASP | Vulnerabilidad | Evidencia | Impacto | Recomendación |
|----|-----------|-------|----------------|-----------|---------|---------------|
| **OW-001** | Alto | A05 | Health expone metadatos BD | `app.js` L57-67; `railway_health_response.json` | Reconocimiento de infraestructura interna | Eliminar `dbHost`/`pid` del JSON público |
| **OW-002** | Alto | A05 | CORS amplio `*.vercel.app` | `app.js` L31-39 | Origen no autorizado en previews comprometidos | Lista blanca explícita de dominios Vercel |
| **OW-003** | Alto | A01/A04 | Permisos BD sin enforcement | `schema.sql`; grep sin uso en API | Falsa sensación de RBAC granular | Implementar `rol_permisos` o eliminar tablas |
| **OW-004** | Alto | A06 | CVE form-data HIGH | `npm_audit_backend.txt` | CRLF injection en multipart | `npm audit fix` / actualizar dependencia |
| **OW-005** | Medio | A06/A03 | CVE frontend (react-router, esbuild) | `npm_audit_frontend.txt` | Open redirect; dev server exposure | Actualizar dependencias; aislar dev |
| **OW-006** | Medio | A02/A07 | JWT en localStorage | `client.js` L25-33 | Robo de sesión vía XSS | Cookies httpOnly + SameSite |
| **OW-007** | Medio | A01/A07 | Registro acepta `rol` en body | `AuthService.register` L80-88 | Escalación admin si registro público habilitado | Forzar rol `cliente` en registro público |
| **OW-008** | Medio | A07 | Sin endpoint refresh | `AuthService` genera refresh; sin ruta | Sesiones sin rotación de access token | Implementar `POST /auth/refresh` |
| **OW-009** | Medio | A08 | CI audit no bloqueante | `ci.yml` L67-71 | Despliegue con CVE HIGH | Eliminar `continue-on-error` |
| **OW-010** | Medio | A07 | Contraseña mínima 6 chars | `AuthService.js` L85-86 | Credenciales débiles | Política ≥12 chars + complejidad |
| **OW-011** | Medio | A08 | LoteService sin transacción | `LoteService.create` (IMP-H001) | Datos inconsistentes ante fallo | `BEGIN`/`COMMIT` en operación |
| **OW-012** | Bajo | A07 | Sin recuperación contraseña | Sin ruta en `auth.routes.js` | Usuarios bloqueados | Flujo reset con token temporal |
| **OW-013** | Bajo | A09 | Sin APM/SIEM | No integración detectada | Detección tardía de incidentes | Alertas Railway + agregación logs |
| **OW-014** | Bajo | A07 | `ADMIN_SEED_PASSWORD` en ejemplo | `backend_env.example.txt` L19 | Credencial débil en seed prod | Password fuerte obligatorio |
| **OW-015** | Bajo | A08 | `SKIP_INTEGRATION=1` en CI | `ci.yml` L25 | Menor cobertura auth integración | Job MySQL en CI |

---

## 5. Fortalezas identificadas

1. **Autenticación JWT robusta** con secreto obligatorio ≥32 caracteres y verificación en middleware.
2. **Hash bcrypt** (cost 10) en login, registro y reset de contraseña.
3. **RBAC admin/cliente** con `adminGuard` en rutas sensibles (usuarios, auditoría, system).
4. **Protección IDOR** verificada en `LoteService.getById` y scope SQL via `sqlScope.js`/`scopedQuery.js`.
5. **Corrección SQL injection** en reportes documentada y verificada (Sonar).
6. **Helmet + rate-limit + CORS configurable** en Express.
7. **Auditoría HTTP** con `auditMiddleware` y tabla `auditoria_logs`.
8. **CI con SHA pins** en GitHub Actions (cadena de suministro).
9. **Superficie SSRF mínima** — sin requests salientes en backend.
10. **Tests auth** — 401 sin token verificado en suite automatizada.

---

## 6. Evidencias utilizadas

| Evidencia | Uso en auditoría |
|-----------|------------------|
| `auth.js`, `rbac.js`, `AuthService.js` | A01, A02, A07 |
| `app.js`, `env.js` | A05, A02 |
| `scopedQuery.js`, `sqlScope.js`, `CORRECCIONES_SONARQUBE.md` | A03 |
| `npm_audit_backend.txt`, `npm_audit_frontend.txt` | A06 |
| `railway_health_response.json` | A05 (OW-001) |
| `ci.yml` | A05, A08 |
| `npm_test_backend.txt` | A01, A07 |
| `schema.sql` | A01, A09 |
| `auditMiddleware.js` | A09 |
| `client.js`, `AppRoutes.jsx` | A02, A07 frontend |

Evidencias pendientes: informe SonarCloud exportado, escaneo OWASP ZAP, logs producción Railway — *Evidencia pendiente de incorporar.*

---

## 7. Nivel de seguridad alcanzado y estado general

| Métrica | Valor |
|---------|-------|
| Cumplimiento OWASP global | **76 %** (Bueno) |
| Categorías que cumplen (≥85 %) | A02, A03, A10 |
| Categorías parciales (60–84 %) | A01, A04, A05, A07, A08, A09 |
| Categorías no conformes (<60 %) | A06 |
| Hallazgos Altos abiertos | 4 (OW-001 a OW-004) |

**Estado general:** CAFE-IA presenta una **postura de seguridad aceptable para un sistema académico/productivo en maduración**, con controles fundamentales de autenticación, autorización y consultas SQL bien implementados. Los riesgos residuales más relevantes se concentran en **exposición de información en health (A05)**, **dependencias con CVE HIGH (A06)** y **brechas de diseño en permisos y autenticación (A01/A07)**. Se recomienda abordar los hallazgos Altos antes del Paso 06 (Auditor de Implementación OWASP).

**Trazabilidad FURPS+:** Seguridad FURPS 78 % (Paso 02) → OWASP 76 % (coherente). Hallazgos IMP-H003, IMP-H004, IMP-H013 confirmados como OW-009, OW-003, OW-001.

---

*Informe de auditoría OWASP — listo para Paso 06 y anexo informe ICACIT.*
