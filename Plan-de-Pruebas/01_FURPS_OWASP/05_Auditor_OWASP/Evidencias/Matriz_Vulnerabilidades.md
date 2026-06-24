# Matriz de Vulnerabilidades — CAFE-IA

**Actividad:** Paso 5 — Auditor OWASP  
**Fecha:** 24 de junio de 2026  
**Total hallazgos:** 15 (OW-001 a OW-015)

---

| ID | Severidad | OWASP | Vulnerabilidad | Descripción | Evidencia | Riesgo | Impacto | Recomendación |
|----|-----------|-------|----------------|-------------|-----------|--------|---------|---------------|
| OW-001 | **Alto** | A05 | Health expone metadatos BD | `/api/health` devuelve `dbHost`, `database`, `pid` en producción Railway | `app.js` L57-67; `railway_health_response.json` | Reconocimiento infraestructura | Facilita ataques dirigidos a MySQL interno | Reducir payload health a campos no sensibles |
| OW-002 | **Alto** | A05 | CORS amplio `*.vercel.app` | Regex autoriza cualquier preview Vercel | `app.js` L31-39 | Cross-origin abuse | Sesiones expuestas desde origen no confiable | Lista blanca explícita en `CORS_ORIGINS` |
| OW-003 | **Alto** | A01/A04 | Permisos BD sin enforcement | Tablas `permisos`/`rol_permisos` sin uso en API | `schema.sql` L62-76; grep backend | Escalación lógica | RBAC documentado no coincide con runtime | Implementar middleware permisos o eliminar tablas |
| OW-004 | **Alto** | A06 | CVE form-data HIGH | CRLF injection en multipart 4.0.0–4.0.5 | `npm_audit_backend.txt` | Explotación dependencia | Compromiso integridad requests | `npm audit fix`; actualizar lockfile |
| OW-005 | Medio | A06/A03 | CVE frontend múltiples | react-router open redirect; esbuild dev; js-yaml DoS | `npm_audit_frontend.txt` | Phishing redirect; dev exposure | Usuarios redirigidos; dev server en LAN | Actualizar dependencias |
| OW-006 | Medio | A02/A07 | JWT en localStorage | accessToken y refreshToken persistidos en browser | `client.js` L25-33 | Robo sesión XSS | Suplantación de identidad | Cookies httpOnly + Secure |
| OW-007 | Medio | A01/A07 | Rol en registro público | `AuthService.register` acepta campo `rol` del body | `AuthService.js` L80-88 | Escalación privilegios | Auto-registro como admin si env habilitado | Forzar rol `cliente` siempre |
| OW-008 | Medio | A07 | Sin endpoint refresh | Refresh generado en login; sin `POST /auth/refresh` | `AuthService.js`; `auth.routes.js` | Gestión sesión incompleta | Tokens largos sin rotación | Implementar refresh con revocación |
| OW-009 | Medio | A08 | CI audit no bloqueante | `continue-on-error: true` en dependency-audit | `ci.yml` L67-71 | CVE en producción | Despliegue vulnerable conocido | Fallar pipeline en HIGH |
| OW-010 | Medio | A07 | Contraseña mínima 6 chars | Validación débil en registro | `AuthService.js` L85-86 | Fuerza bruta | Cuentas comprometidas | Política ≥12 + complejidad |
| OW-011 | Medio | A08 | LoteService sin transacción | create multi-tabla sin BEGIN/COMMIT | `LoteService.js`; IMP-H001 | Integridad datos | Registros huérfanos | Transacción SQL |
| OW-012 | Bajo | A07 | Sin recuperación contraseña | No existe flujo forgot-password | `auth.routes.js` | Bloqueo usuarios | Soporte manual requerido | Reset con token email |
| OW-013 | Bajo | A09 | Sin APM/SIEM | No monitoreo centralizado | Revisión arquitectura | Detección tardía | Incidentes no alertados | Railway logs + alertas |
| OW-014 | Bajo | A07 | Seed password en ejemplo | `ADMIN_SEED_PASSWORD=admin123` | `backend_env.example.txt` | Credencial débil prod | Compromiso admin seed | Password fuerte obligatorio |
| OW-015 | Bajo | A08 | SKIP_INTEGRATION en CI | Tests integración omitidos | `ci.yml` L25 | Regresiones auth | Fallos no detectados en CI | MySQL service en CI |

---

## Resumen por severidad

| Severidad | Cantidad |
|-----------|----------|
| Crítico | 0 |
| Alto | 4 |
| Medio | 7 |
| Bajo | 4 |

---

*Versión Excel: `Matriz_Vulnerabilidades.xlsx`*
