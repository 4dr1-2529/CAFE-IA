# Conclusiones — Planificador OWASP Top 10 — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 4 — Planificador OWASP  
**Fecha:** 24 de junio de 2026

---

## Importancia del marco OWASP

El **OWASP Top 10 (2021)** constituye el estándar de referencia internacional para clasificar y priorizar los riesgos de seguridad en aplicaciones web. Para CAFE-IA — sistema que gestiona datos de productores, lotes, trazabilidad cafetalera e interacción con un chatbot de asistencia — la adopción de este marco no es un ejercicio académico aislado, sino una necesidad alineada con la confidencialidad de información agrícola, la integridad de registros de calidad y la disponibilidad del servicio desplegado en Railway y Vercel.

La planificación realizada en este paso traduce ese marco genérico en un plan concreto, anclado en componentes verificados del repositorio `cafe-cursor/`: middleware JWT, RBAC admin/cliente, consultas MySQL, auditoría HTTP, pipeline CI con SonarCloud y las ocho vulnerabilidades documentadas por `npm audit`.

---

## Beneficios para el proyecto CAFE-IA

| Beneficio | Descripción |
|-----------|-------------|
| **Visibilidad de riesgos** | Las diez categorías A01–A10 cubren la superficie real del sistema: desde control de acceso en 13 grupos de API hasta integridad de dependencias npm. |
| **Trazabilidad ICACIT** | La matriz, checklist y cronograma permiten demostrar rigor metodológico en el informe de calidad de software. |
| **Continuidad con FURPS+** | Hallazgos previos (permisos sin enforcement, health con metadatos BD, CI permisivo) se mapean a categorías OWASP, evitando análisis duplicado. |
| **Preparación para remediación** | El Paso 06 podrá verificar implementación de controles con IDs OW-xxx trazables a evidencias concretas. |
| **Confianza del usuario** | Productores y administradores que confían credenciales y datos de cosecha requieren garantías documentadas de seguridad. |

---

## Riesgos que serán evaluados

La auditoría planificada aborda los siguientes vectores, con criticidad preliminar basada en el estado actual del código y evidencias existentes — **sin declarar vulnerabilidades confirmadas** en esta fase:

| Categoría | Foco principal en CAFE-IA | Criticidad planificada |
|-----------|---------------------------|------------------------|
| **A01** | RBAC, JWT, scope `user_id`, tablas permisos | Alta |
| **A02** | bcrypt, JWT_SECRET, HTTPS | Media |
| **A03** | SQL parametrizado, XSS, validadores | Alta |
| **A04** | Arquitectura hexagonal, flujo auth, diseño permisos | Media |
| **A05** | CORS, helmet, health, Railway/Vercel, env | Alta |
| **A06** | 8 CVE npm documentados | Media |
| **A07** | Login, expiración JWT, seed admin | Alta |
| **A08** | CI/CD, locks, integridad build | Media |
| **A09** | auditMiddleware, auditoria_logs | Media |
| **A10** | Requests externos (superficie mínima detectada) | Baja |

Los riesgos de mayor atención — **A01, A03, A05 y A07** — concentran la superficie de exposición de una API multi-módulo con autenticación JWT y despliegue cloud público.

---

## Cobertura de seguridad esperada

Al completar los Pasos 05 y 06, se espera alcanzar:

- **Cobertura funcional:** 100 % de los grupos de rutas `/api` evaluados contra al menos una categoría OWASP relevante.
- **Cobertura de evidencias:** ≥ 80 % de ítems del checklist con evidencia adjunta; faltantes documentados explícitamente.
- **Cobertura de herramientas:** SonarQube, npm audit, revisión manual, Cypress y Postman aplicados según matriz.
- **Dashboard final:** Transición de estado «Pendiente» a «Evaluado» con porcentaje de cumplimiento por categoría.

La cobertura no implica ausencia de hallazgos; implica que cada control planificado habrá sido verificado o justificado como no aplicable con evidencia.

---

## Aporte para la calidad del software

Integrar OWASP en el ciclo de evaluación de CAFE-IA complementa el análisis FURPS+ (donde Seguridad alcanzó ~78 % en el Paso 02) con un enfoque especializado en amenazas web. Este planificador:

1. Define **qué** se evaluará (componentes reales, no genéricos).
2. Establece **cómo** se evaluará (herramientas, fases, criterios).
3. Identifica **con qué** se respaldará (evidencias copiadas y pendientes).
4. Conecta **cuándo** se ejecutará (cronograma de 7 días hábiles).

El resultado es un paquete documental profesional — matriz Excel, checklist, plan de auditoría, resumen ejecutivo — listo para anexarse al informe final ICACIT y para iniciar inmediatamente el **Paso 05: Auditor OWASP**.

---

## Declaración de cierre del paso

El Paso 4 — Planificador OWASP ha concluido la fase de **planificación**. No se han modificado archivos del proyecto CAFE-IA. Toda la documentación se basa en información verificable del sistema. Los estados del dashboard permanecen en **Pendiente** hasta la ejecución formal de la auditoría en el paso siguiente.

---

*Documento de cierre — Planificador OWASP Top 10 (2021) — CAFE-IA.*
