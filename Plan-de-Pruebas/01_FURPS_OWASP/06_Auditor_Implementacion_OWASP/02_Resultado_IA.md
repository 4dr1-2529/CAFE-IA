# Informe de Verificación de Implementación OWASP — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 6 — Auditor de Implementación OWASP  
**Fecha:** 24 de junio de 2026  
**Referencias:** Paso 04 Planificador · Paso 05 Auditor OWASP

---

## 1. Objetivo

Verificar en el **código fuente, configuración, infraestructura y evidencias de prueba** si la implementación real de CAFE-IA cumple con los controles de seguridad definidos por **OWASP Top 10 (2021)**, y si las **15 mejoras** identificadas en el Paso 05 (hallazgos OW-001 a OW-015) fueron aplicadas en el repositorio `cafe-cursor/`.

---

## 2. Metodología

| Fase | Actividad |
|------|-----------|
| 1 | Revisión estática de `cafe-cursor/` (frontend, backend, sql, CI) sin modificar archivos |
| 2 | Cruce plan OWASP (Paso 04) vs controles implementados en código |
| 3 | Verificación hallazgos OW-001–OW-015 del Paso 05 en código actual |
| 4 | Validación con evidencias copiadas (npm audit, tests, health Railway, Sonar) |
| 5 | Clasificación **Cumple / Cumple parcialmente / No cumple** por categoría A01–A10 |

**Criterio de remediación:** Un hallazgo OW-xxx se considera **implementado** solo si el código o configuración en `cafe-cursor/` refleja el cambio recomendado en el Paso 05.

---

## 3. Componentes revisados

### 3.1 Frontend

| Elemento | Archivo | Verificación |
|----------|---------|--------------|
| Validaciones cliente | `frontend/src/utils/validation.js`, validators | Implementado |
| Manejo sesiones | `client.js`, `AuthContext.jsx` | JWT en localStorage (OW-006) |
| Protección rutas | `AppRoutes.jsx`, `AdminRoute.jsx` | AdminRoute L15-17 verificado |
| Manejo errores | `ApiError`, `unwrapApiPayload` | Implementado |
| Sanitización | React escape por defecto | Sin `dangerouslySetInnerHTML` |
| Navegación segura | `react-router-dom` | CVE abierto (OW-005) |

### 3.2 Backend

| Elemento | Archivo | Verificación |
|----------|---------|--------------|
| Express + middleware | `app.js` | helmet, CORS, rate-limit |
| JWT | `auth.js`, `AuthService.js` | Implementado |
| Roles / autorización | `rbac.js`, `RoleHelper.js` | adminGuard, readGuard, writeGuard |
| Validaciones | `application/validators/` | Por agregado |
| APIs REST | 13 routers `routes/` | Protegidas con guards |
| Logging | `auditMiddleware.js` | Implementado |

### 3.3 Base de datos

| Elemento | Evidencia | Verificación |
|----------|-----------|--------------|
| Consultas parametrizadas | Repositorios, `?` placeholders | Cumple |
| Integridad transaccional | `LoteService.create` L108-122 | **Sin TX** (IMP-OW-011) |
| Restricciones FK | `schema.sql` | Cumple |
| Permisos granulares | `permisos`, `rol_permisos` | **Sin enforcement** (IMP-OW-003) |

### 3.4 Infraestructura

| Elemento | Evidencia | Verificación |
|----------|-----------|--------------|
| Railway | `railway_health_response.json` | Health expone dbHost (IMP-OW-001) |
| Vercel | `vercel.json`, `vercel_status.json` | SPA desplegada |
| Variables entorno | `backend_env.example.txt`, `env.js` | JWT_SECRET obligatorio |
| CORS / Helmet / Rate limit | `app.js` | Parcial — CORS amplio (IMP-OW-002) |

### 3.5 Dependencias

| Elemento | Evidencia | Verificación |
|----------|-----------|--------------|
| package-lock | locks backend/frontend | Versionado |
| npm audit backend | 2 CVE (1 HIGH) | **Sin remediar** (IMP-OW-004) |
| npm audit frontend | 6 CVE | **Sin remediar** (IMP-OW-005) |

---

## 4. Evidencias utilizadas

| Evidencia | Uso verificación |
|-----------|------------------|
| `app.js` | IMP-OW-001, IMP-OW-002 |
| `AuthService.js` | IMP-OW-007, IMP-OW-010 |
| `auth.routes.js` | IMP-OW-008, IMP-OW-012 |
| `LoteService.js` | IMP-OW-011 |
| `client.js` | IMP-OW-006 |
| `ci.yml` | IMP-OW-009, IMP-OW-015 |
| `schema.sql` | IMP-OW-003 |
| `npm_audit_*.txt` | IMP-OW-004, IMP-OW-005 |
| `railway_health_response.json` | IMP-OW-001 |
| `CORRECCIONES_SONARQUBE.md` | A03 controles preexistentes |
| `npm_test_backend.txt` | A01, A07 auth |
| `cypress_last-run.json` | A07 E2E |

---

## 5. Comparación: planificado vs auditado vs implementado

| Categoría | Plan P04 (riesgo esperado) | Auditoría P05 (%) | Implementación P06 (%) | Estado impl. | Δ Remediación |
|-----------|---------------------------|-------------------|------------------------|--------------|---------------|
| A01 | Alto | 78 % | **78 %** | Cumple parcialmente | 0 % |
| A02 | Medio | 85 % | **85 %** | Cumple | 0 % |
| A03 | Alto | 88 % | **88 %** | Cumple | 0 % |
| A04 | Medio | 80 % | **80 %** | Cumple parcialmente | 0 % |
| A05 | Alto | 68 % | **68 %** | Cumple parcialmente | 0 % |
| A06 | Medio | 55 % | **55 %** | No cumple | 0 % |
| A07 | Alto | 72 % | **72 %** | Cumple parcialmente | 0 % |
| A08 | Medio | 62 % | **62 %** | Cumple parcialmente | 0 % |
| A09 | Medio | 75 % | **75 %** | Cumple parcialmente | 0 % |
| A10 | Bajo | 95 % | **95 %** | Cumple | 0 % |

**Tasa de remediación post-auditoría OWASP:** **0 %** (0/15 hallazgos OW-001 a OW-015 implementados en código).

Los porcentajes P05 y P06 son **idénticos** porque el código fuente no presenta cambios respecto a la fecha de auditoría del Paso 05.

---

## 6. Dashboard de implementación

| Categoría | Cumplimiento | Estado |
|-----------|--------------|--------|
| A01 | **78 %** | Cumple parcialmente |
| A02 | **85 %** | Cumple |
| A03 | **88 %** | Cumple |
| A04 | **80 %** | Cumple parcialmente |
| A05 | **68 %** | Cumple parcialmente |
| A06 | **55 %** | No cumple |
| A07 | **72 %** | Cumple parcialmente |
| A08 | **62 %** | Cumple parcialmente |
| A09 | **75 %** | Cumple parcialmente |
| A10 | **95 %** | Cumple |

| Indicador global | Valor |
|------------------|-------|
| Implementación seguridad general | **76 %** |
| Madurez de seguridad | **Nivel 3 — Definido** |
| Riesgo residual | **Medio-Alto** |
| Cumplimiento OWASP | **76 %** |
| Remediación post-Paso 05 | **0 %** |

---

## 7. Controles implementados (fortalezas verificadas)

| # | Control | Ubicación | Estado |
|---|---------|-----------|--------|
| 1 | JWT Bearer + `authenticate` middleware | `auth.js` | ✅ Implementado |
| 2 | bcrypt cost 10 | `AuthService.js` L21, L95 | ✅ Implementado |
| 3 | JWT_SECRET ≥ 32 chars obligatorio | `env.js` L6-16 | ✅ Implementado |
| 4 | `adminGuard` usuarios/auditoría/system | `*.routes.js` | ✅ Implementado |
| 5 | IDOR protection lotes | `LoteService.getById` L38-39 | ✅ Implementado |
| 6 | SQL scope fijo sin input usuario | `sqlScope.js`, `scopedQuery.js` | ✅ Implementado |
| 7 | Sonar SQL reportes corregido | `reportesSql.js` (pre-P05) | ✅ Implementado |
| 8 | Helmet + rate-limit 500/15min | `app.js` | ✅ Implementado |
| 9 | `auditMiddleware` + `auditoria_logs` | `auditMiddleware.js` | ✅ Implementado |
| 10 | CI Actions SHA pins | `ci.yml` | ✅ Implementado |
| 11 | `AdminRoute` frontend | `AdminRoute.jsx` L15-17 | ✅ Implementado |
| 12 | Sin SSRF backend | grep `fetch|axios` → 0 | ✅ Implementado |
| 13 | Registro público deshabilitado default | `ALLOW_PUBLIC_REGISTER=false` | ✅ Implementado |

---

## 8. Hallazgos de implementación (IMP-OW-001 a IMP-OW-015)

Verificación directa en código: **ningún hallazgo OW del Paso 05 fue remediado**.

| ID | Ref | Severidad | Vulnerabilidad | Ubicación | Estado impl. | Causa |
|----|-----|-----------|----------------|-----------|--------------|-------|
| IMP-OW-001 | OW-001 | Alto | Health expone dbHost | `app.js` L64 | No implementado | Sin cambio en respuesta health |
| IMP-OW-002 | OW-002 | Alto | CORS `*.vercel.app` | `app.js` L31-39 | No implementado | Regex mantenida |
| IMP-OW-003 | OW-003 | Alto | Permisos BD sin API | `schema.sql`; grep backend | No implementado | Sin middleware permisos |
| IMP-OW-004 | OW-004 | Alto | CVE form-data HIGH | `npm_audit_backend.txt` | No implementado | audit fix no aplicado |
| IMP-OW-005 | OW-005 | Medio | CVE frontend | `npm_audit_frontend.txt` | No implementado | Versiones sin actualizar |
| IMP-OW-006 | OW-006 | Medio | JWT localStorage | `client.js` L25-33 | No implementado | Patrón SPA mantenido |
| IMP-OW-007 | OW-007 | Medio | Rol en register | `AuthService.js` L80-88 | No implementado | `rol` del body aceptado |
| IMP-OW-008 | OW-008 | Medio | Sin /auth/refresh | `auth.routes.js` | No implementado | Endpoint no creado |
| IMP-OW-009 | OW-009 | Medio | CI audit permisivo | `ci.yml` L67-71 | No implementado | `continue-on-error: true` |
| IMP-OW-010 | OW-010 | Medio | Pwd mín. 6 chars | `AuthService.js` L85-86 | No implementado | Validación sin cambio |
| IMP-OW-011 | OW-011 | Medio | LoteService sin TX | `LoteService.js` L108-122 | No implementado | Sin BEGIN/COMMIT |
| IMP-OW-012 | OW-012 | Bajo | Sin recovery password | `auth.routes.js` | No implementado | Ruta ausente |
| IMP-OW-013 | OW-013 | Bajo | Sin SIEM/APM | — | No implementado | Sin integración ops |
| IMP-OW-014 | OW-014 | Bajo | Seed password débil | `backend_env.example.txt` L19 | No implementado | `admin123` en ejemplo |
| IMP-OW-015 | OW-015 | Bajo | SKIP_INTEGRATION CI | `ci.yml` L25 | No implementado | Variable activa |

---

## 9. Evaluación por categoría OWASP (implementación)

### A01 — 78 % — Cumple parcialmente

**Implementado:** `adminGuard`, `readGuard`, IDOR en servicios, tests 401.  
**No implementado:** middleware `permisos`/`rol_permisos` (IMP-OW-003).

### A02 — 85 % — Cumple

**Implementado:** bcrypt, JWT_SECRET, refresh hash SHA-256 en BD.  
**Pendiente:** migración tokens a httpOnly (IMP-OW-006).

### A03 — 88 % — Cumple

**Implementado:** SQL parametrizado, `sqlScope`, corrección Sonar reportes.  
**Pendiente:** CVE react-router transitivo (IMP-OW-005).

### A04 — 80 % — Cumple parcialmente

**Implementado:** arquitectura hexagonal, flujo auth documentado.  
**Pendiente:** coherencia permisos (IMP-OW-003), rol en register (IMP-OW-007).

### A05 — 68 % — Cumple parcialmente

**Implementado:** helmet, rate-limit, `CORS_ORIGINS` prod.  
**No implementado:** sanitizar health (IMP-OW-001), restringir CORS (IMP-OW-002).

### A06 — 55 % — No cumple

**Implementado:** locks, overrides uuid/tmp.  
**No implementado:** remediación CVE (IMP-OW-004, IMP-OW-005).

### A07 — 72 % — Cumple parcialmente

**Implementado:** login 401, expiración JWT, logout con refresh revoke.  
**No implementado:** refresh endpoint, recovery, política pwd (IMP-OW-008, 010, 012).

### A08 — 62 % — Cumple parcialmente

**Implementado:** SHA pins CI, package-lock.  
**No implementado:** CI bloqueante audit, TX lotes (IMP-OW-009, 011).

### A09 — 75 % — Cumple parcialmente

**Implementado:** auditMiddleware, módulo auditoría admin.  
**No implementado:** SIEM/APM (IMP-OW-013).

### A10 — 95 % — Cumple

**Implementado:** sin requests HTTP salientes en backend.

---

## 10. Estado actual del proyecto

CAFE-IA **implementa correctamente los controles de seguridad fundamentales** (autenticación, autorización binaria, consultas SQL seguras, headers de protección, auditoría HTTP). Sin embargo, **ninguna de las 15 mejoras** recomendadas en el Paso 05 fue aplicada al código fuente verificado.

El proyecto mantiene un **76 % de cumplimiento OWASP** en implementación, con **riesgo residual Medio-Alto** concentrado en configuración (A05), dependencias (A06) y autenticación incompleta (A07). La calidad de implementación de controles **existentes** es buena; la brecha principal es la **ausencia de remediación** post-auditoría.

**Coherencia con FURPS+ Paso 03:** La tasa de remediación 0 % OWASP coincide con la tasa 0 % FURPS (0/18), confirmando que el código no ha sido modificado entre auditorías.

---

*Informe de verificación de implementación OWASP — listo para Paso 07 y anexo ICACIT.*
