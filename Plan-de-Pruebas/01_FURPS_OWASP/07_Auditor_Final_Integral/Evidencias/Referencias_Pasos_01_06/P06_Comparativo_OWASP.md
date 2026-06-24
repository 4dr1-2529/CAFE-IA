# Comparativo Plan vs Implementación OWASP — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Fases:** Paso 04 Planificador · Paso 05 Auditor · Paso 06 Implementación

---

## 1. OWASP Top 10 — Tres fases

| Cat. | Plan P04 (riesgo esperado) | Auditoría P05 (%) | Implementación P06 (%) | Estado impl. | Remediación |
|------|---------------------------|-------------------|------------------------|--------------|-------------|
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

**Conclusión:** La implementación verificada coincide con la auditoría; el plan identificó correctamente las áreas de riesgo Alto (A01, A05, A07).

---

## 2. Controles planificados vs implementados

| Control planificado (P04) | Implementado en código | Estado |
|---------------------------|------------------------|--------|
| JWT + middleware auth | `auth.js`, `rbac.js` | ✅ Cumple |
| RBAC admin/cliente | `adminGuard`, `RoleHelper` | ✅ Cumple |
| Scope user_id cliente | `LoteService`, `scopedQuery` | ✅ Cumple |
| Permisos granulares BD | Tablas sin enforcement | ❌ No cumple |
| bcrypt + JWT_SECRET | `AuthService`, `env.js` | ✅ Cumple |
| SQL parametrizado | Repositorios, `sqlScope` | ✅ Cumple |
| helmet + CORS + rate-limit | `app.js` | ◐ Parcial (CORS) |
| npm audit sin CVE HIGH | 2+6 CVE abiertos | ❌ No cumple |
| auditMiddleware | `auditMiddleware.js` | ✅ Cumple |
| Sin SSRF | grep backend | ✅ Cumple |

---

## 3. Mejoras Paso 05 vs código actual

| Hallazgo P05 | Recomendación | ¿Implementado? | Evidencia verificación |
|--------------|---------------|----------------|----------------------|
| OW-001 Health dbHost | Sanitizar health | **No** | `app.js` L64 sin cambio |
| OW-002 CORS vercel | Lista blanca | **No** | `app.js` L31-39 regex activa |
| OW-003 Permisos BD | Middleware o eliminar | **No** | grep permisos → 0 uso API |
| OW-004 form-data CVE | npm audit fix | **No** | `npm_audit_backend.txt` |
| OW-005 CVE frontend | Actualizar deps | **No** | `npm_audit_frontend.txt` |
| OW-006 localStorage | httpOnly cookies | **No** | `client.js` L25-33 |
| OW-007 rol register | Forzar cliente | **No** | `AuthService.js` L88 |
| OW-008 refresh endpoint | POST /auth/refresh | **No** | `auth.routes.js` |
| OW-009 CI audit | Quitar continue-on-error | **No** | `ci.yml` L68 |
| OW-010 pwd policy | Min 12 chars | **No** | `AuthService.js` L85 |
| OW-011 TX lotes | BEGIN/COMMIT | **No** | `LoteService.js` L108-122 |
| OW-012 recovery | forgot-password | **No** | Sin ruta |
| OW-013 SIEM | Alertas Railway | **No** | Sin integración |
| OW-014 seed pwd | Password fuerte | **No** | `backend_env.example.txt` |
| OW-015 CI integration | MySQL en CI | **No** | `SKIP_INTEGRATION=1` |

**Tasa remediación:** **0 %** (0/15)

---

## 4. Frontend — plan vs implementación

| Aspecto | Planificado | Implementado | Estado |
|---------|-------------|--------------|--------|
| Validaciones cliente | Sí | `validation.js` | Cumple |
| JWT almacenamiento | Seguro recomendado | localStorage | Parcial |
| Rutas admin protegidas | Sí | `AdminRoute.jsx` | Cumple |
| Errores API | Mensajes usuario | `ApiError` | Cumple |
| XSS | React escape | Sin dangerouslySetInnerHTML | Cumple |
| CVE react-router | Remediar | Sin actualizar | No cumple |

---

## 5. Backend — plan vs implementación

| Aspecto | Planificado | Implementado | Estado |
|---------|-------------|--------------|--------|
| Express + helmet | Sí | `app.js` | Cumple |
| adminGuard rutas sensibles | Sí | usuarios, auditoría | Cumple |
| Validators por agregado | Sí | `validators/` | Cumple |
| Refresh token ciclo completo | Sí | Parcial (sin endpoint) | Parcial |
| auditMiddleware | Sí | Implementado | Cumple |
| Health sin datos sensibles | Sí | Expone dbHost | No cumple |

---

## 6. Infraestructura — plan vs implementación

| Elemento | Plan | Implementación | Estado |
|----------|------|----------------|--------|
| Railway HTTPS | Sí | Health 200 verificado | Cumple |
| Vercel SPA | Sí | vercel_status.json | Cumple |
| CORS restringido prod | Sí | Regex amplia vercel | Parcial |
| Variables sensibles en env | Sí | `.env.example` | Cumple |
| npm audit bloqueante CI | Recomendado | continue-on-error | No cumple |

---

## 7. Síntesis

| Métrica | Valor |
|---------|-------|
| Controles base implementados | 13/16 (81 %) |
| Mejoras P05 implementadas | 0/15 (0 %) |
| Cumplimiento OWASP implementación | 76 % |
| Coherencia P05 ↔ P06 | 100 % (código sin cambios) |

El planificador (P04) anticipó correctamente los riesgos. La auditoría (P05) los cuantificó. La verificación de implementación (P06) confirma que **los controles existentes están en código** pero **las mejoras no fueron aplicadas**.

---

*Comparativo Plan vs Implementación — Paso 06.*
