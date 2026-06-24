# Conclusiones — Auditor de Implementación OWASP — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 6 — Auditor de Implementación OWASP  
**Fecha:** 24 de junio de 2026

---

## Nivel de implementación de las medidas de seguridad

La verificación de implementación OWASP ejecutada sobre el repositorio `cafe-cursor/` confirma que CAFE-IA **implementa en código un conjunto sólido de controles de seguridad web**, alcanzando un **76 % de cumplimiento** respecto al estándar OWASP Top 10 (2021). Este nivel es **idéntico** al obtenido en la auditoría del Paso 05, lo que evidencia que **no se ha producido ningún cambio en el código fuente** entre ambas fases de evaluación.

La **tasa de remediación** de los 15 hallazgos documentados (OW-001 a OW-015) es del **0 %**: ninguna de las mejoras recomendadas en el Paso 05 ha sido aplicada. La implementación actual refleja el estado auditado, no un estado mejorado post-remediación.

| Dimensión | Implementación verificada |
|-----------|---------------------------|
| Controles fundamentales (auth, RBAC, SQL, helmet) | **Implementados** — calidad buena |
| Mejoras post-auditoría (Paso 05) | **No implementadas** — 0/15 |
| Madurez de seguridad | **Nivel 3 — Definido** |
| Riesgo residual | **Medio-Alto** |

---

## Cumplimiento del estándar OWASP Top 10

El proyecto **cumple plenamente** tres categorías OWASP en su implementación actual: **A02** (Cryptographic Failures, 85 %), **A03** (Injection, 88 %) y **A10** (SSRF, 95 %). Estas áreas demuestran que las decisiones de diseño y las correcciones Sonar previas (especialmente en reportes SQL) están correctamente materializadas en el código.

**Cinco categorías cumplen parcialmente** (A01, A04, A05, A07, A08, A09) con porcentajes entre 62 % y 80 %, indicando controles presentes pero con brechas específicas verificables. La categoría **A06** (Vulnerable Components, 55 %) **no cumple** el umbral mínimo del 60 % debido a CVE HIGH abiertos documentados en `npm audit` sin remediación en `package-lock.json`.

| Categoría | % | Estado implementación |
|-----------|---|----------------------|
| A01 | 78 % | Cumple parcialmente |
| A02 | 85 % | Cumple |
| A03 | 88 % | Cumple |
| A04 | 80 % | Cumple parcialmente |
| A05 | 68 % | Cumple parcialmente |
| A06 | 55 % | No cumple |
| A07 | 72 % | Cumple parcialmente |
| A08 | 62 % | Cumple parcialmente |
| A09 | 75 % | Cumple parcialmente |
| A10 | 95 % | Cumple |

---

## Calidad de la implementación

La **calidad de los controles ya implementados** es evaluada como **buena**. El código demuestra prácticas profesionales: middleware de autenticación y autorización bien estructurado (`auth.js`, `rbac.js`), verificación explícita de propiedad de recursos en servicios de negocio (`LoteService.getById`), módulos de scope SQL con fragmentos fijos (`sqlScope.js`, `scopedQuery.js`), hash de refresh tokens en base de datos, y auditoría HTTP transversal (`auditMiddleware.js`). El frontend complementa con `AdminRoute` para rutas administrativas y validaciones de entrada.

La **calidad de la remediación post-auditoría** es **nula**: los cuatro hallazgos de severidad Alta (health con metadatos, CORS amplio, permisos sin enforcement, CVE form-data) permanecen exactamente como fueron identificados en el Paso 05, verificables línea por línea en `app.js`, `schema.sql` y `npm_audit_backend.txt`.

---

## Fortalezas de la implementación

1. **Autenticación y autorización:** JWT con secreto obligatorio ≥32 caracteres, bcrypt en contraseñas, `adminGuard` en rutas sensibles, respuesta 401/403 verificada en tests automatizados.

2. **Protección contra inyección:** Consultas SQL parametrizadas en repositorios; corrección Sonar en reportes implementada en `reportesSql.js` y `scopedQuery.js`.

3. **Configuración defensiva parcial:** Helmet, rate-limit (500 req/15 min), límite body JSON 2 MB, `CORS_ORIGINS` obligatorio en producción.

4. **Trazabilidad operativa:** `auditMiddleware` registra acciones en `auditoria_logs`; login auditado en `ActionLogService`.

5. **Cadena de suministro CI:** GitHub Actions con SHA pins en acciones de terceros.

6. **Superficie SSRF mínima:** Ausencia de `fetch`/`axios` salientes en `backend/src`.

7. **Separación frontend admin:** `AdminRoute.jsx` redirige no-admin al dashboard.

---

## Debilidades de la implementación

1. **Exposición informativa:** `/api/health` sigue devolviendo `dbHost`, `database` y `pid` (`app.js` L57-67).

2. **CORS permisivo:** Regex `*.vercel.app` autoriza cualquier preview (`app.js` L31-39).

3. **Modelo permisos incoherente:** Tablas `permisos`/`rol_permisos` en `schema.sql` sin código de enforcement.

4. **Dependencias vulnerables:** CVE HIGH `form-data` y 6 CVE frontend sin actualizar en locks.

5. **Ciclo de autenticación incompleto:** Refresh token generado pero sin endpoint; sin recuperación de contraseña; política mínima 6 caracteres.

6. **Almacenamiento tokens:** JWT en `localStorage` (`client.js`) — riesgo ante XSS.

7. **Integridad datos y CI:** `LoteService.create` sin transacción; `npm audit` CI con `continue-on-error`.

---

## Riesgos pendientes

Los **riesgos residuales** permanecen en nivel **Medio-Alto**, concentrados en:

- **Reconocimiento de infraestructura** (IMP-OW-001) — probabilidad alta en endpoint público.
- **Dependencias con CVE HIGH** (IMP-OW-004) — explotación dependiente del uso de `form-data`.
- **Escalación lógica de permisos** (IMP-OW-003) — si stakeholders asumen RBAC granular operativo.
- **Compromiso de sesión vía XSS** (IMP-OW-006) — probabilidad media, impacto alto.

Ninguno de estos riesgos ha sido mitigado en la implementación verificada.

---

## Recomendaciones para fortalecer la seguridad

1. **Ejecutar Sprint P1 inmediato:** IMP-OW-001 a IMP-OW-004 antes del Paso 07 (Auditoría Final Integral).

2. **Establecer gate de seguridad en CI:** Eliminar `continue-on-error` en npm audit (IMP-OW-009) como condición previa a merge en `main`.

3. **Completar ciclo de sesión:** Implementar `POST /auth/refresh` (IMP-OW-008) y evaluar migración a cookies httpOnly (IMP-OW-006).

4. **Resolver incoherencia de diseño:** Decidir entre implementar middleware de permisos o eliminar tablas huérfanas (IMP-OW-003).

5. **Re-auditar post-remediación:** Tras aplicar P1, re-ejecutar npm audit y capturar nuevo health response como evidencia.

---

## Estado general del proyecto

Desde el punto de vista de la **implementación de controles de seguridad**, CAFE-IA se encuentra en un estado de **madurez intermedia-alta en controles base** y **madurez baja en remediación continua**. El sistema es **operativo y desplegado** con controles que superan el umbral mínimo para una aplicación web académica/productiva, pero **no ha incorporado ninguna mejora** derivada de la auditoría OWASP formal.

Esta conclusión — junto con las matrices de implementación, comparativo plan vs código, checklist y 22 evidencias adjuntas — queda **lista para incorporarse al informe final ICACIT** y habilita el Paso 07 (Auditor Final Integral) con la recomendación explícita de priorizar la remediación P1 antes del cierre del ciclo de evaluación.

---

*Conclusión profesional — Auditor de Implementación OWASP Top 10 (2021) — CAFE-IA — Paso 6.*
