# Conclusiones — Auditoría OWASP Top 10 — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 5 — Auditor OWASP  
**Fecha:** 24 de junio de 2026  
**Audiencia:** Informe final ICACIT / evaluación de calidad de software

---

## Nivel de seguridad alcanzado

La auditoría OWASP Top 10 (2021) ejecutada sobre el proyecto CAFE-IA arroja un **nivel general de seguridad del 76 %**, clasificado como **Bueno** en la escala de madurez adoptada (90–100 % Excelente; 75–89 % Bueno; 60–74 % Regular; <60 % Deficiente). Este resultado es coherente con la evaluación FURPS+ del Paso 02, donde el atributo Seguridad alcanzó 78 %.

La **madurez de seguridad** se sitúa en el **Nivel 3 — Definido**: el sistema cuenta con controles documentados e implementados (JWT, bcrypt, helmet, rate-limit, auditoría HTTP, consultas SQL parametrizadas, CI con SonarCloud), pero aún presenta brechas en dependencias vulnerables, configuración de despliegue y completitud del ciclo de vida de autenticación. El **riesgo global residual** se clasifica como **Medio-Alto**, impulsado por tres categorías OWASP con riesgo Alto: A01 (Broken Access Control), A05 (Security Misconfiguration) y A07 (Identification and Authentication Failures).

---

## Fortalezas del proyecto

CAFE-IA demuestra decisiones de seguridad sólidas en su núcleo técnico. El backend Express, organizado en arquitectura hexagonal, implementa autenticación JWT con secreto obligatorio de al menos 32 caracteres, hash de contraseñas con bcrypt (factor de costo 10) y middleware de autorización que distingue roles administrador y cliente. Las rutas críticas de gestión de usuarios, auditoría y administración del sistema están protegidas con `adminGuard`, y los servicios de negocio — particularmente `LoteService` — verifican explícitamente la propiedad de recursos para prevenir acceso horizontal no autorizado (IDOR).

En el plano de inyección, el proyecto aplica consultas parametrizadas con placeholders y utiliza módulos `scopedQuery.js` y `sqlScope.js` que evitan la concatenación de entrada de usuario en SQL dinámico. Las correcciones documentadas en SonarQube para el módulo de reportes confirman una respuesta proactiva ante hallazgos SAST previos. El pipeline CI/CD incorpora acciones de GitHub fijadas por SHA completo, reduciendo el riesgo de cadena de suministro, y el sistema de auditoría HTTP (`auditMiddleware`) registra acciones relevantes en la tabla `auditoria_logs`, incluyendo eventos de login.

En el frontend, React 18 con Vite aplica escape por defecto contra XSS, y las rutas administrativas están protegidas con el componente `AdminRoute`. Respecto a SSRF (A10), la auditoría no detectó patrones de requests HTTP salientes en el código backend, alcanzando un 95 % de cumplimiento en esta categoría.

---

## Vulnerabilidades detectadas

Se documentaron **15 hallazgos verificables** (OW-001 a OW-015), distribuidos en: **0 Críticos**, **4 Altos**, **7 Medios** y **4 Bajos**. Ningún hallazgo fue inferido sin evidencia en código o artefactos adjuntos.

Los hallazgos de mayor severidad son:

1. **OW-001 — Exposición de metadatos en `/api/health`:** La respuesta en Railway incluye `dbHost` (`mysql.railway.internal`), nombre de base de datos y PID del proceso, facilitando reconocimiento de infraestructura.

2. **OW-002 — Política CORS amplia:** La expresión regular que autoriza cualquier subdominio `*.vercel.app` amplía la superficie de ataque cross-origin más allá del dominio de producción conocido.

3. **OW-003 — Permisos granulares huérfanos:** Las tablas `permisos` y `rol_permisos` existen en el esquema MySQL pero no tienen enforcement en la capa API, generando incoherencia entre diseño documentado y control efectivo.

4. **OW-004 — CVE HIGH en `form-data`:** El informe `npm audit` del backend documenta vulnerabilidad de severidad alta (CRLF injection en multipart) sin remediación aplicada al momento de la auditoría.

Entre los hallazgos medios destacan el almacenamiento de tokens JWT en `localStorage` (vulnerable ante XSS), la ausencia de endpoint de refresh token pese a su generación en login, la política de contraseñas con mínimo de solo 6 caracteres, la posibilidad de especificar rol en el registro público, y la ejecución de `npm audit` en CI sin bloquear el pipeline ante CVE HIGH.

---

## Riesgos principales

| Riesgo | Categoría | Probabilidad × Impacto |
|--------|-----------|------------------------|
| Exfiltración de metadatos de infraestructura vía health público | A05 | Alta × Medio |
| Escalación de privilegios por incoherencia permisos BD/API | A01/A04 | Media × Alto |
| Explotación de CVE HIGH en dependencia backend | A06 | Media × Alto |
| Compromiso de sesión vía XSS + localStorage | A02/A07 | Baja-Media × Alto |
| Despliegue con vulnerabilidades conocidas (CI permisivo) | A08 | Media × Medio |

El vector de inyección SQL en rutas de producción se considera **mitigado** tras las correcciones Sonar verificadas. El riesgo SSRF es **bajo** dado el procesamiento local del chatbot y predicciones IA.

---

## Nivel de cumplimiento OWASP por categoría

| Categoría | Cumplimiento | Resultado |
|-----------|--------------|-----------|
| A01 Broken Access Control | 78 % | Cumple parcialmente |
| A02 Cryptographic Failures | 85 % | Cumple |
| A03 Injection | 88 % | Cumple |
| A04 Insecure Design | 80 % | Cumple parcialmente |
| A05 Security Misconfiguration | 68 % | Cumple parcialmente |
| A06 Vulnerable Components | 55 % | No cumple |
| A07 Auth Failures | 72 % | Cumple parcialmente |
| A08 Data Integrity Failures | 62 % | Cumple parcialmente |
| A09 Logging Failures | 75 % | Cumple parcialmente |
| A10 SSRF | 95 % | Cumple |

**Promedio ponderado:** 76 %. Tres categorías alcanzan cumplimiento pleno (A02, A03, A10); una categoría no alcanza el umbral mínimo del 60 % en sentido estricto de remediación (A06, por CVE abiertos).

---

## Recomendaciones para fortalecer la seguridad

1. **Prioridad inmediata (P1):** Sanitizar endpoint health, restringir CORS, remediar CVE `form-data` y resolver la brecha de permisos granulares (implementar o eliminar tablas).

2. **Corto plazo (P2):** Endurecer pipeline CI eliminando `continue-on-error` en npm audit; implementar endpoint refresh; forzar rol `cliente` en registro público; planificar migración de tokens a cookies httpOnly.

3. **Medio plazo (P3):** Política de contraseñas robusta; transacciones SQL en operaciones multi-tabla (`LoteService.create`).

4. **Continuidad:** Incorporar escaneo DAST (OWASP ZAP) y export SonarCloud como evidencias del Paso 06; establecer re-auditoría semestral.

---

## Estado general del software desde ciberseguridad

CAFE-IA es un sistema **operativo y desplegado en producción** (Railway + Vercel) con controles de seguridad **fundamentalmente adecuados** para una aplicación web de gestión cafetalera con roles diferenciados. No se identificaron vulnerabilidades críticas de explotación inmediata en la capa de inyección SQL ni SSRF. Sin embargo, la combinación de **exposición informativa en health**, **dependencias con CVE HIGH** y **brechas en el ciclo de autenticación** impide clasificar el sistema como «seguro por diseño» en sentido estricto.

El software se encuentra en condiciones de **continuar su ciclo de evaluación ICACIT** hacia el Paso 06 (Auditor de Implementación OWASP), donde deberá verificarse la remediación de los hallazgos OW-001 a OW-004 como condición mínima para elevar el cumplimiento global por encima del 85 %.

La presente conclusión, junto con las matrices, checklist y evidencias adjuntas en `05_Auditor_OWASP/Evidencias/`, está lista para incorporarse directamente al informe final de calidad de software.

---

*Conclusión profesional — Auditoría OWASP Top 10 (2021) — CAFE-IA — Paso 5.*
