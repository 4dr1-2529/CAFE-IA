# Checklist de Implementación OWASP — CAFE-IA

**Actividad:** Paso 6 — Auditor de Implementación OWASP  
**Fecha:** 24 de junio de 2026

**Leyenda:** ☑ Implementado | ◐ Parcial | ✗ No implementado | — N/A

---

## Frontend

| # | Control | Estado | Evidencia |
|---|---------|--------|-----------|
| F-01 | Validaciones formulario cliente | ☑ | validation.js |
| F-02 | Token JWT gestionado | ◐ | localStorage (IMP-OW-006) |
| F-03 | Rutas admin con AdminRoute | ☑ | AdminRoute.jsx L15-17 |
| F-04 | Errores API sin stack trace | ☑ | ApiError, unwrapApiPayload |
| F-05 | Sin dangerouslySetInnerHTML | ☑ | grep frontend |
| F-06 | CVE react-router remediado | ✗ | npm_audit_frontend |
| F-07 | Build producción exitoso | ☑ | npm_build_frontend.txt |
| F-08 | Cypress login E2E | ☑ | cypress_last-run.json |

---

## Backend

| # | Control | Estado | Evidencia |
|---|---------|--------|-----------|
| B-01 | helmet activo | ☑ | app.js L15 |
| B-02 | rate-limit activo | ☑ | app.js L18-25 |
| B-03 | JWT authenticate middleware | ☑ | auth.js |
| B-04 | adminGuard usuarios/auditoría | ☑ | *.routes.js |
| B-05 | IDOR protection servicios | ☑ | LoteService.getById |
| B-06 | Validators entrada HTTP | ☑ | validators/ |
| B-07 | auditMiddleware /api | ☑ | auditMiddleware.js |
| B-08 | Health sin metadatos sensibles | ✗ | IMP-OW-001 |
| B-09 | CORS restringido prod | ◐ | IMP-OW-002 |
| B-10 | POST /auth/refresh | ✗ | IMP-OW-008 |
| B-11 | Recuperación contraseña | ✗ | IMP-OW-012 |
| B-12 | Política pwd ≥12 chars | ✗ | IMP-OW-010 |
| B-13 | Registro fuerza rol cliente | ✗ | IMP-OW-007 |
| B-14 | LoteService transacción SQL | ✗ | IMP-OW-011 |

---

## Base de datos

| # | Control | Estado | Evidencia |
|---|---------|--------|-----------|
| D-01 | Consultas parametrizadas | ☑ | Repositorios |
| D-02 | sqlScope fragmentos fijos | ☑ | sqlScope.js |
| D-03 | FK y restricciones | ☑ | schema.sql |
| D-04 | Permisos granulares enforced | ✗ | IMP-OW-003 |
| D-05 | auditoria_logs operativa | ☑ | schema.sql, middleware |

---

## Infraestructura

| # | Control | Estado | Evidencia |
|---|---------|--------|-----------|
| I-01 | Railway desplegado | ☑ | railway_health_response.json |
| I-02 | Vercel desplegado | ☑ | vercel_status.json |
| I-03 | JWT_SECRET en env | ☑ | env.js, backend_env.example |
| I-04 | CORS_ORIGINS prod obligatorio | ☑ | env.js L24-26 |
| I-05 | HTTPS producción | ☑ | Despliegue documentado |

---

## Dependencias y CI

| # | Control | Estado | Evidencia |
|---|---------|--------|-----------|
| C-01 | package-lock versionado | ☑ | package-lock_*.json |
| C-02 | Backend sin CVE HIGH | ✗ | IMP-OW-004 |
| C-03 | Frontend sin CVE críticos | ◐ | IMP-OW-005 |
| C-04 | CI SHA pins Actions | ☑ | ci.yml |
| C-05 | npm audit bloqueante CI | ✗ | IMP-OW-009 |
| C-06 | Tests integración CI | ✗ | IMP-OW-015 |
| C-07 | Sonar correcciones SQL | ☑ | CORRECCIONES_SONARQUBE |

---

## SSRF

| # | Control | Estado | Evidencia |
|---|---------|--------|-----------|
| S-01 | Sin fetch saliente backend | ☑ | grep backend/src |
| S-02 | Chatbot procesamiento local | ☑ | ChatbotService.js |

---

## Resumen implementación

| Área | Implementados | Parciales | No impl. | % área |
|------|---------------|-----------|----------|--------|
| Frontend | 6 | 1 | 1 | 75 % |
| Backend | 7 | 1 | 6 | 57 % |
| Base datos | 4 | 0 | 1 | 80 % |
| Infraestructura | 5 | 0 | 0 | 100 % |
| Deps / CI | 3 | 1 | 3 | 43 % |
| SSRF | 2 | 0 | 0 | 100 % |

**Remediación hallazgos P05:** 0/15 (0 %)

---

*Checklist implementación — Paso 06.*
