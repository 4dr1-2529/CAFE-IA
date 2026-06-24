# Conclusiones — Auditoría Final Integral — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 7 — Auditor Final Integral  
**Fecha:** 24 de junio de 2026  
**Marco evaluativo:** FURPS+ (Pasos 01–03) · OWASP Top 10 2021 (Pasos 04–06)

---

## Resultado global de FURPS+

La evaluación FURPS+ ejecutada en tres fases — planificación (48 criterios), auditoría (18 hallazgos) y verificación de implementación — establece que CAFE-IA materializa de forma satisfactoria el Producto Mínimo Viable documentado para la gestión de productores, lotes, trazabilidad, calidad, predicciones heurísticas, reportes y chatbot de asistencia.

El **cumplimiento FURPS+ consolidado es del 77 % (Bueno)**, con desglose en implementación verificada: Functionality 83 %, Usability 78 %, Reliability 78 %, Performance 70 % (Regular), Supportability 74 % y Seguridad extendida 76 %. La arquitectura alcanza 88 %, ubicándose como el atributo de mayor madurez.

El módulo de **lotes** concentra la brecha funcional más relevante: operaciones de alta y consulta operativas, pero sin transacción SQL en `LoteService.create` (hallazgo crítico CON-001, originado en FUR-001) y sin rutas PUT/DELETE. La verificación de implementación del Paso 03 confirmó **cero por ciento de remediación** sobre los 18 hallazgos FUR, coherente con la ausencia de cambios en el repositorio entre auditorías.

---

## Resultado global de OWASP

La evaluación de seguridad OWASP Top 10 (2021), completada en los Pasos 04 a 06, arroja un **cumplimiento del 76 % (Bueno)** con riesgo residual **Medio-Alto**. Tres categorías presentan riesgo Alto (A01 Access Control 78 %, A05 Misconfiguration 68 %, A07 Auth Failures 72 %); una categoría no cumple el umbral mínimo (A06 Vulnerable Components 55 %); tres categorías cumplen plenamente (A02, A03, A10).

Los **15 hallazgos OW-001 a OW-015** permanecen abiertos en código: health con metadatos de infraestructura, CORS amplio para previews Vercel, permisos granulares huérfanos en base de datos, CVE HIGH en `form-data`, y brechas en el ciclo de vida de autenticación (localStorage, refresh incompleto, política de contraseñas débil). La verificación del Paso 06 replicó exactamente los porcentajes del Paso 05, confirmando estabilidad del diagnóstico y ausencia de intervención correctiva.

---

## Calidad del software

Integrando ambos marcos, el **nivel general del proyecto es del 77 % (Bueno)**. CAFE-IA no alcanza la clasificación Excelente (≥90 %) debido a la concentración de deuda técnica en integridad de datos, configuración de seguridad, dependencias vulnerables y pipeline CI incompleto. Tampoco cae en Regular (<75 %) gracias a la solidez de su núcleo funcional, arquitectura y despliegue operativo.

La **calidad técnica** (75 %) refleja tests unitarios y E2E exitosos en entorno local, pero cobertura SonarCloud reportada en 0 %, ESLint con 189 problemas y ausencia de pruebas de integración en CI. La **calidad funcional** (83 %) evidencia que el PMV está implementado y verificado con Cypress en 13 escenarios.

---

## Calidad arquitectónica

La **arquitectura hexagonal** de cuatro capas (interfaces, application, domain, infrastructure) constituye la principal fortaleza estructural del proyecto, evaluada en 88 %. Los 13 grupos de rutas REST bajo `/api`, los repositorios MySQL con consultas parametrizadas, los validators por agregado y el middleware de auditoría HTTP demuestran separación de responsabilidades coherente con buenas prácticas de ingeniería de software.

La brecha arquitectónica más significativa es la **incoherencia entre el modelo de permisos en base de datos** (tablas `permisos`/`rol_permisos`) y el enforcement real en API (RBAC binario admin/cliente únicamente), documentada transversalmente en FURPS y OWASP.

---

## Calidad del código y documental

El **código backend** presenta patrones de seguridad maduros (JWT, bcrypt, sqlScope, adminGuard) con puntos débiles localizados en configuración (`app.js`) y completitud del flujo auth. El **frontend React** ofrece 15 páginas organizadas en PMV, design system de 14 componentes UI y protección de rutas administrativas, con deuda en almacenamiento de tokens y optimización de bundles.

La **calidad documental** alcanza 88 %: el ciclo `Plan-de-Pruebas/01_FURPS_OWASP/` generó más de 170 artefactos trazables (matrices, dashboards, Excel, evidencias npm/JMeter/Cypress/health), aptos para anexo ICACIT. Pendientes documentales: export SonarCloud, escaneo ZAP, política de backups.

---

## Nivel de seguridad y madurez

El **nivel de seguridad consolidado es 76 % (Bueno)**. Los controles implementados — helmet, rate-limit, auditoría, IDOR en servicios, corrección Sonar SQL — superan el umbral mínimo para una aplicación web académica. Los riesgos Altos abiertos (7 hallazgos consolidados CON-001 a CON-007) impiden clasificar la seguridad como Excelente.

La **madurez del software** se sitúa en el **Nivel 3 — Definido** (escala CMMI simplificada): procesos de evaluación documentados, controles establecidos, métricas calculadas, pero sin ciclo de mejora continua demostrado (0 % remediación). El **riesgo global** es **Medio-Alto**.

---

## Fortalezas principales

1. Sistema desplegado y disponible en Railway y Vercel con evidencia JMeter 500/500.
2. Arquitectura hexagonal madura y mantenible (88 %).
3. Autenticación JWT + bcrypt + RBAC operativo con tests 401 verificados.
4. Protección contra inyección SQL verificada (A03: 88 %).
5. Auditoría HTTP y módulo de historial para administradores.
6. Cobertura funcional PMV con Cypress 13/13 y 18 tests backend.
7. Documentación de evaluación ICACIT exhaustiva en seis pasos.
8. SSRF con superficie mínima (A10: 95 %).

---

## Debilidades y riesgos pendientes

| Debilidad | Riesgo |
|-----------|--------|
| Transacción lotes ausente (CON-001) | Pérdida integridad datos — **Crítico** |
| Health y CORS expuestos (CON-002, CON-003) | Reconocimiento y cross-origin — **Alto** |
| Permisos BD sin API (CON-004) | RBAC incoherente — **Alto** |
| CVE form-data HIGH (CON-005) | Supply chain — **Alto** |
| CI sin E2E ni audit bloqueante (CON-006, CON-012) | Regresiones — **Alto** |
| Backups no documentados (CON-007) | Continuidad — **Alto** |
| 0 % remediación global | Deuda técnica acumulada — **Transversal** |

---

## Recomendaciones para la evolución del sistema

1. **Ejecutar Sprint P1** (CON-001 a CON-007) como condición previa a cierre académico con nota de excelencia en seguridad.
2. **Establecer pipeline CI completo:** integración MySQL, Cypress, npm audit bloqueante, cobertura c8.
3. **Cerrar brecha A06:** remediar CVE npm y re-auditar con evidencia actualizada.
4. **Completar ciclo auth:** refresh endpoint, política contraseñas, evaluar cookies httpOnly.
5. **Mantener ciclo de evaluación:** re-auditoría FURPS+OWASP semestral con actualización de evidencias.

---

## Estado general del proyecto

CAFE-IA es un **proyecto de software de calidad Buena (77 %)**, con **arquitectura sólida**, **funcionalidad PMV completa** y **seguridad fundamental adecuada**, evaluado bajo metodología rigurosa FURPS+ y OWASP con trazabilidad ICACIT en seis pasos.

El veredicto integral es: **APTO PARA PRODUCCIÓN ACADÉMICA Y OPERATIVA CON DEUDA TÉCNICA DOCUMENTADA Y PLAN DE REMEDIACIÓN CONSOLIDADO**. El **nivel de preparación para producción** se estima en **82 %**, y el **cumplimiento ICACIT** en **78 %**, sujeto a incorporación de evidencias pendientes (Sonar export, ZAP, backups).

Esta conclusión integra los resultados de los Pasos 01 al 06 sin re-ejecución de auditorías, consolida 24 hallazgos únicos y está lista para incorporarse al **informe final académico** y al **Paso 08 — Conclusión General**.

---

*Conclusión profesional — Auditoría Final Integral — CAFE-IA — Paso 7.*
