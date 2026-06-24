# Plan de Auditoría OWASP Top 10 (2021) — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 4 — Planificador OWASP  
**Fecha:** 24 de junio de 2026  
**Metodología:** OWASP Top 10 (2021) + DevSecOps + trazabilidad ICACIT

---

## 1. Objetivo

Planificar la auditoría de seguridad integral del sistema CAFE-IA contra el **OWASP Top 10 (2021)**, definiendo alcance técnico, componentes a evaluar, evidencias requeridas, herramientas, criterios de aceptación y cronograma. Este paso **no ejecuta** la auditoría ni declara vulnerabilidades confirmadas; establece la base documental para los Pasos 05 (Auditor OWASP) y 06 (Auditor de Implementación OWASP).

| # | Objetivo específico | Descripción |
|---|---------------------|-------------|
| O1 | Cobertura A01–A10 | Mapear las diez categorías OWASP a componentes reales del repositorio `cafe-cursor/` |
| O2 | Evidencias trazables | Inventariar artefactos existentes (npm audit, Sonar, CI, health, tests) y marcar faltantes |
| O3 | Riesgo esperado | Clasificar criticidad preliminar según hallazgos FUR/IMP y revisión de código (sin inventar CVE) |
| O4 | Preparar ejecución | Entregar checklist, matriz, cronograma y Excel para auditoría formal |

---

## 2. Alcance

### 2.1 Incluido

| Capa | Elementos verificados en CAFE-IA |
|------|----------------------------------|
| **Frontend** | React 18 + Vite, 15 páginas, `AppRoutes.jsx`, `AuthContext`, Cypress E2E |
| **Backend** | Express hexagonal, 13 grupos de rutas `/api`, middleware `auth.js`, `rbac.js`, `auditMiddleware.js` |
| **API REST** | Auth, usuarios, productores, producción, lotes, calidad, evaluaciones, trazabilidad, reportes, chatbot, predicciones, auditoría, dashboard |
| **Base de datos** | MySQL, `schema.sql` (39 tablas), consultas parametrizadas en repositorios |
| **Autenticación** | JWT Bearer, bcrypt (cost 10), roles `admin` / `cliente`, refresh token |
| **Despliegue** | Railway (API + MySQL), Vercel (SPA), HTTPS en producción |
| **CI/CD** | GitHub Actions `ci.yml`, SonarCloud, npm audit |
| **Módulos de negocio** | Login, dashboard, reportes, chatbot IA, auditoría, trazabilidad |

### 2.2 Excluido de esta fase

- Ejecución de pruebas de penetración activas.
- Declaración de vulnerabilidades confirmadas (corresponde al Paso 05).
- Verificación de remediación (Paso 06).
- Modificación del código fuente.

### 2.3 Límites conocidos del sistema (base para planificación)

| Hallazgo documentado | Fuente | Categoría OWASP relacionada |
|----------------------|--------|----------------------------|
| Tablas `permisos` / `rol_permisos` sin enforcement en API | `schema.sql`, IMP-H004 | A01, A04 |
| `/api/health` expone `dbHost` y metadatos BD | `app.js`, `railway_health_response.json` | A05 |
| CORS permite `*.vercel.app` en producción | `app.js` L31–39 | A05 |
| 2 CVE backend (form-data HIGH, dompurify MOD) | `npm_audit_backend.txt` | A06 |
| 6 CVE frontend (react-router, esbuild, etc.) | `npm_audit_frontend.txt` | A06 |
| `npm audit` en CI con `continue-on-error: true` | `ci.yml` | A05, A08 |
| Sin `fetch`/`axios` salientes en `backend/src` | Revisión grep | A10 (riesgo bajo esperado) |
| 16 correcciones Sonar documentadas (SQL injection reportes, VITE_*, SHA Actions) | `CORRECCIONES_SONARQUBE.md` | A03, A08 |

---

## 3. Metodología

```text
Paso 04 (este documento)  → Planificación OWASP: matriz, checklist, cronograma
Paso 05 (Auditor OWASP)   → Evaluación A01–A10 con evidencias y hallazgos OW-xxx
Paso 06 (Implementación)  → Verificación de controles y remediaciones
Paso 07–08                → Auditoría integral y conclusión general
```

### 3.1 Enfoque por categoría

Para cada categoría A01–A10 se define: objetivo de control, componentes involucrados, evidencias necesarias, herramientas de validación, riesgo esperado y nivel de criticidad. La evaluación combina:

1. **Revisión estática** — código fuente, configuración, variables de entorno de ejemplo.
2. **Análisis de dependencias** — `npm audit` backend y frontend.
3. **Análisis SAST** — SonarCloud / `CORRECCIONES_SONARQUBE.md`.
4. **Pruebas automatizadas** — `npm test` (401/403), Cypress (login, rutas protegidas).
5. **Pruebas de API** — Postman / colección existente.
6. **Revisión de despliegue** — Railway health, Vercel status, headers HTTP.
7. **Carga y disponibilidad** — JMeter (complementario, no foco OWASP).

### 3.2 Criterios de aceptación globales

| Criterio | Umbral planificado |
|----------|-------------------|
| A01 | 100 % rutas sensibles con `authenticate` + `authorize` o `readGuard`; cliente solo accede a datos propios (`user_id`) |
| A02 | Contraseñas con bcrypt; JWT_SECRET ≥ 32 chars; HTTPS en prod |
| A03 | Consultas SQL parametrizadas; validadores en entrada; sin XSS reflejado en respuestas API |
| A05 | CORS restringido; helmet activo; rate-limit; health sin datos sensibles |
| A06 | 0 CVE HIGH sin plan de remediación documentado |
| A07 | Login con bloqueo de credenciales inválidas; tokens con expiración |
| A09 | Acciones críticas registradas en `auditoria_logs` |

---

## 4. Componentes del sistema

### 4.1 Arquitectura

```text
[Vercel SPA React] ──HTTPS──► [Railway Express API] ──► [MySQL Railway]
        │                              │
        └── JWT en localStorage        └── helmet, CORS, rate-limit, auditMiddleware
```

### 4.2 Inventario técnico

| Componente | Ubicación / evidencia |
|------------|----------------------|
| Frontend package | `cafe-cursor/frontend/package.json` |
| Backend package | `cafe-cursor/backend/package.json` |
| Middleware auth | `backend/src/interfaces/http/middleware/auth.js` |
| RBAC | `backend/src/interfaces/http/middleware/rbac.js` |
| Config env | `backend/src/config/env.js` |
| App Express | `backend/src/app.js` |
| Auth service | `backend/src/application/services/AuthService.js` |
| Auditoría HTTP | `backend/src/interfaces/http/middleware/auditMiddleware.js` |
| Esquema BD | `database/schema.sql` |
| CI | `.github/workflows/ci.yml` |
| Sonar | `sonar-project.properties` |
| Vercel | `frontend/vercel.json` |

### 4.3 Módulos funcionales y superficie de ataque

| Módulo | Rutas API | Controles planificados |
|--------|-----------|------------------------|
| Login / Auth | `/api/auth/*` | A07, A02 |
| Usuarios | `/api/usuarios/*` | A01, A07 |
| Dashboard | `/api/dashboard` | A01 |
| Lotes / Producción | `/api/lotes`, `/api/produccion` | A01, A03 |
| Trazabilidad | `/api/trazabilidad` | A01, A09 |
| Reportes | `/api/reportes` | A01, A03 (SQL corregido Sonar) |
| Chatbot IA | `/api/chatbot` | A01, A03, A10 |
| Auditoría | `/api/auditoria` | A01, A09 |
| Predicciones | `/api/predicciones` | A01 |
| Health | `/api/health` | A05 |

---

## 5. Riesgos OWASP Top 10 — Planificación detallada

### Dashboard resumen

| Categoría OWASP | Estado | Riesgo esperado |
|-----------------|--------|-----------------|
| A01 — Broken Access Control | Pendiente | Alto |
| A02 — Cryptographic Failures | Pendiente | Medio |
| A03 — Injection | Pendiente | Alto |
| A04 — Insecure Design | Pendiente | Medio |
| A05 — Security Misconfiguration | Pendiente | Alto |
| A06 — Vulnerable Components | Pendiente | Medio |
| A07 — Identification and Authentication Failures | Pendiente | Alto |
| A08 — Software and Data Integrity Failures | Pendiente | Medio |
| A09 — Security Logging and Monitoring Failures | Pendiente | Medio |
| A10 — Server-Side Request Forgery | Pendiente | Bajo |

---

### A01 — Broken Access Control

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Verificar que usuarios solo accedan a recursos autorizados según rol y `user_id` |
| **Componentes** | `auth.js`, `rbac.js`, `readGuard`, `scopedQuery`, rutas por módulo, tablas `roles`/`permisos` |
| **Evidencias** | Tests `npm_test_backend.txt` (401/403), Cypress login, revisión rutas, `schema.sql` |
| **Herramientas** | Revisión manual, Cypress, Postman, `node:test` |
| **Riesgo esperado** | Alto — RBAC binario admin/cliente operativo; permisos granulares en BD sin uso |
| **Criticidad** | Alta |

**Controles planificados:** verificar `authorize('admin')` en rutas administrativas; validar filtro `user_id` en endpoints cliente; probar escalación horizontal (IDOR).

---

### A02 — Cryptographic Failures

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Validar protección de datos sensibles en tránsito y reposo |
| **Componentes** | `AuthService.js`, `UsuarioService.js`, `env.js` (JWT_SECRET ≥32), bcrypt cost 10, HTTPS Railway/Vercel |
| **Evidencias** | `backend_env.example.txt`, `env.js`, migración `migrate.js`, health HTTPS |
| **Herramientas** | Revisión manual, inspección headers TLS |
| **Riesgo esperado** | Medio — bcrypt y JWT implementados; rotación de secretos no documentada |
| **Criticidad** | Media |

---

### A03 — Injection

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Detectar SQLi, XSS, command injection y validar sanitización |
| **Componentes** | Repositorios MySQL, `validators/`, `ReporteService`, frontend React (escape por defecto) |
| **Evidencias** | `CORRECCIONES_SONARQUBE.md` (SQL reportes), `npm_test_backend.txt`, Sonar |
| **Herramientas** | SonarQube, revisión manual, grep patrones SQL dinámico |
| **Riesgo esperado** | Alto — superficie SQL amplia; correcciones Sonar aplicadas en reportes |
| **Criticidad** | Alta |

**Nota:** NoSQL no aplica (MySQL únicamente). Command injection: evaluar `child_process` / `exec` (no detectado en rutas API).

---

### A04 — Insecure Design

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Evaluar decisiones de diseño de seguridad en arquitectura y flujos |
| **Componentes** | Arquitectura hexagonal, flujo login→JWT→RBAC, registro público (`ALLOW_PUBLIC_REGISTER`) |
| **Evidencias** | `arquitectura-solucion-cafe-ia.mmd`, `README_proyecto.md`, `devOrAuth` en `auth.js` |
| **Herramientas** | Revisión manual, threat modeling ligero |
| **Riesgo esperado** | Medio — diseño sólido con brecha permisos granulares no implementados |
| **Criticidad** | Media |

---

### A05 — Security Misconfiguration

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Revisar configuración segura en runtime, despliegue y CI |
| **Componentes** | `app.js` (helmet, CORS, rate-limit 500/15min), Railway, Vercel, `ci.yml`, `.env.example` |
| **Evidencias** | `railway_health_response.json`, `vercel.json`, `vercel_status.json`, `ci.yml` |
| **Herramientas** | Revisión manual, health endpoint, Postman headers |
| **Riesgo esperado** | Alto — health expone `dbHost`; CORS amplio `*.vercel.app` |
| **Criticidad** | Alta |

---

### A06 — Vulnerable Components

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Identificar dependencias con CVE conocidos y versiones obsoletas |
| **Componentes** | `package.json`, `package-lock.json` backend y frontend |
| **Evidencias** | `npm_audit_backend.txt` (2 CVE), `npm_audit_frontend.txt` (6 CVE) |
| **Herramientas** | npm audit, SonarCloud dependency check |
| **Riesgo esperado** | Medio — 8 CVE documentados; form-data HIGH en backend |
| **Criticidad** | Media-Alta |

---

### A07 — Identification and Authentication Failures

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Validar robustez del ciclo de vida de autenticación |
| **Componentes** | `/api/auth/login`, refresh, `AuthService`, JWT expiración 8h/7d refresh, seed admin |
| **Evidencias** | `npm_test_backend.txt`, Cypress PF-01/02, `backend_env.example.txt` |
| **Herramientas** | Cypress, Postman, revisión manual |
| **Riesgo esperado** | Alto — credenciales seed en migración; sin recuperación de contraseña |
| **Criticidad** | Alta |

---

### A08 — Software and Data Integrity Failures

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Verificar integridad de build, CI/CD y cadena de suministro |
| **Componentes** | `ci.yml` (SHA pins Actions), `package-lock.json`, `LoteService.create` (sin TX — integridad datos) |
| **Evidencias** | `ci.yml`, `CORRECCIONES_SONARQUBE.md`, locks npm |
| **Herramientas** | Revisión CI, npm audit |
| **Riesgo esperado** | Medio — CI con audit no bloqueante; locks presentes |
| **Criticidad** | Media |

---

### A09 — Security Logging and Monitoring Failures

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Evaluar registro de eventos de seguridad y capacidad de auditoría |
| **Componentes** | `auditMiddleware.js`, `ActionLogService`, tabla `auditoria_logs`, módulo `/api/auditoria` |
| **Evidencias** | Código middleware, tests, logs CI |
| **Herramientas** | Revisión manual, consulta BD auditoría |
| **Riesgo esperado** | Medio — auditoría HTTP implementada; sin SIEM/APM centralizado |
| **Criticidad** | Media |

---

### A10 — Server-Side Request Forgery (SSRF)

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Identificar endpoints que realicen requests a URLs controladas por el usuario |
| **Componentes** | Chatbot, reportes, servicios de predicción (heurístico local) |
| **Evidencias** | Grep `backend/src` sin `fetch`/`axios` salientes |
| **Herramientas** | Revisión manual código |
| **Riesgo esperado** | Bajo — sin patrones SSRF evidentes en backend |
| **Criticidad** | Baja |

---

## 6. Herramientas de validación

| Herramienta | Uso en auditoría OWASP | Categorías |
|-------------|------------------------|------------|
| **SonarQube / SonarCloud** | SAST, SQL injection, secretos | A03, A06, A08 |
| **npm audit** | CVE dependencias | A06 |
| **OWASP Top 10 (2021)** | Marco de referencia | A01–A10 |
| **Revisión manual código** | Auth, RBAC, validators, config | Todas |
| **Cypress** | E2E login, rutas protegidas | A01, A07 |
| **Postman** | API auth, headers, CORS | A01, A05, A07 |
| **JMeter** | Carga health (complementario) | A05 |
| **Logs / CI** | Evidencia ejecución y fallos | A08, A09 |
| **Railway / Vercel** | Config despliegue, HTTPS | A05 |

---

## 7. Evidencias

### 7.1 Evidencias incorporadas en `Evidencias/`

| Archivo | Origen | Uso OWASP |
|---------|--------|-----------|
| `package_backend.json` | `cafe-cursor/backend/package.json` | A06 |
| `package_frontend.json` | `cafe-cursor/frontend/package.json` | A06 |
| `package-lock_backend.json` | `cafe-cursor/backend/package-lock.json` | A06, A08 |
| `package-lock_frontend.json` | `cafe-cursor/frontend/package-lock.json` | A06, A08 |
| `npm_audit_backend.txt` | Ejecución npm audit | A06 |
| `npm_audit_frontend.txt` | Ejecución npm audit | A06 |
| `CORRECCIONES_SONARQUBE.md` | Documentación Sonar | A03, A08 |
| `sonar-project.properties` | Config SonarCloud | A03, A06 |
| `README_proyecto.md` | README raíz | A04 |
| `backend_env.example.txt` | `.env.example` | A02, A05, A07 |
| `ci.yml` | GitHub Actions | A05, A08 |
| `vercel.json` | Frontend deploy | A05 |
| `vercel_status.json` | Estado Vercel | A05 |
| `railway_health_response.json` | Health Railway | A05 |
| `arquitectura-solucion-cafe-ia.mmd` | Diagrama | A04 |
| `schema.sql` | Esquema BD | A01, A03 |
| `npm_test_backend.txt` | Tests auth | A01, A07 |
| `cypress_last-run.json` | E2E | A01, A07 |
| `jmeter_resumen.json` | Carga | A05 (complementario) |

### 7.2 Evidencias pendientes

| Evidencia | Estado |
|-----------|--------|
| Informe SonarCloud exportado (PDF/HTML) | Evidencia pendiente de incorporar. |
| Escaneo DAST (OWASP ZAP) | Evidencia pendiente de incorporar. |
| Colección Postman exportada | Evidencia pendiente de incorporar. |
| Logs de producción Railway | Evidencia pendiente de incorporar. |
| Reporte `npm audit` post-remediación | Evidencia pendiente de incorporar. |

---

## 8. Plan de auditoría

### 8.1 Fases

| Fase | Duración estimada | Actividades | Entregable |
|------|-------------------|-------------|------------|
| **F1 — Preparación** | 1 día | Inventario evidencias, checklist, acceso entornos | Checklist completo |
| **F2 — Análisis estático** | 2 días | Sonar, npm audit, revisión auth/RBAC/SQL | Matriz preliminar |
| **F3 — Pruebas dinámicas** | 2 días | Cypress, Postman, pruebas IDOR/CORS | Registro pruebas |
| **F4 — Config y despliegue** | 1 día | Health, headers, env, Railway/Vercel | Evidencia A05 |
| **F5 — Consolidación** | 1 día | Hallazgos OW-xxx, dashboard, informe Paso 05 | `02_Resultado_IA` Paso 05 |

**Duración total estimada:** 7 días hábiles.

### 8.2 Trazabilidad con auditorías previas

| Referencia FUR/IMP | Categoría OWASP |
|--------------------|-----------------|
| FUR-001 / IMP-H001 — LoteService sin transacción | A08 (integridad datos) |
| IMP-H003 — npm audit CI no bloqueante | A05, A08 |
| IMP-H004 — permisos BD sin enforcement | A01, A04 |
| IMP-H013 — health expone dbHost | A05 |
| CVE form-data, react-router | A06, A03 (redirect) |

### 8.3 Roles en la auditoría

| Rol | Responsabilidad |
|-----|-----------------|
| Arquitecto de Software | Alcance, A04, arquitectura |
| Especialista Ciberseguridad | A01–A03, A07, threat model |
| DevSecOps | A05, A06, A08, CI/CD |
| QA / ICACIT | Evidencias, trazabilidad, checklist |

---

## 9. Referencias

- OWASP Top 10 2021: https://owasp.org/Top10/
- Proyecto: `cafe-cursor/` (CAFE-IA)
- Pasos previos: `01_Planificador_FURPS/`, `02_Auditor_FURPS/`, `03_Auditor_Implementacion_FURPS/`
- Documentos generados: `Evidencias/Plan_Auditoria_OWASP.md`, `Checklist_OWASP.md`, `Matriz_OWASP.md`, `Cronograma_Auditoria.md`

---

*Documento generado en fase de planificación. Los estados «Pendiente» del dashboard serán actualizados en el Paso 05 — Auditor OWASP.*
