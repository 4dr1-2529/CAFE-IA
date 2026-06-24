# Conclusiones — Evaluación Integral FURPS+ y OWASP — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 8 — Conclusión General  
**Fecha:** 24 de junio de 2026

---

## Introducción

La evaluación del proyecto CAFE-IA respondió a la necesidad de certificar, con rigor metodológico y trazabilidad de evidencias, la calidad funcional y la seguridad de una plataforma web orientada a la gestión de productores cafetaleros, trazabilidad de lotes, control de calidad, predicciones heurísticas y generación de reportes. El proceso se estructuró en ocho fases documentales bajo los marcos FURPS+ y OWASP Top 10 (2021), abarcando planificación, auditoría, verificación de implementación, consolidación integral y la presente conclusión general. En ningún momento se modificó el código fuente del sistema; todas las apreciaciones se sustentan en artefactos generados entre junio de 2026 en el directorio `Plan-de-Pruebas/01_FURPS_OWASP/`.

El objetivo central de la evaluación fue determinar en qué medida el Producto Mínimo Viable desplegado en Railway y Vercel satisface los atributos de calidad de software exigidos en un contexto académico de nivel profesional, y en qué medida los controles de seguridad implementados mitigan los riesgos web más relevantes según OWASP. El alcance comprendió frontend React, backend Express con arquitectura hexagonal, API REST con autenticación JWT, base de datos MySQL y la infraestructura cloud asociada.

---

## Resultados obtenidos

En el plano de la calidad funcional, el cumplimiento FURPS+ consolidado alcanzó el **77 %**, clasificado como Bueno. La funcionalidad (83 %) evidencia que la gran mayoría de los módulos planificados —autenticación, usuarios, productores, producción, lotes, trazabilidad, calidad, dashboard, reportes, chatbot y auditoría— se encuentran operativos y verificados mediante pruebas automatizadas. La usabilidad (78 %) refleja una interfaz organizada en tres secciones de menú con design system coherente, aunque sin verificación automatizada de accesibilidad. La confiabilidad (78 %) se ve limitada por la ausencia de transacciones SQL en operaciones críticas de lotes. El rendimiento (70 %), único atributo en rango Regular, se explica por la ausencia de pruebas de carga sobre APIs de negocio y por bundles frontend de gran tamaño en componentes de gráficos. La soporteabilidad (74 %) se beneficia de la documentación extensa y de la estructura modular, pero enfrenta deuda en cobertura de pruebas instrumentada y pipeline de integración continua incompleto.

La calidad arquitectónica, evaluada en **88 %**, constituye el resultado más favorable del análisis. La adopción de arquitectura hexagonal con separación clara entre interfaces HTTP, servicios de aplicación, dominio e infraestructura de persistencia facilita la comprensión, el mantenimiento y la extensión del sistema. Los trece grupos de rutas bajo `/api`, los repositorios con consultas parametrizadas y los validadores por agregado demuestran madurez de diseño.

La calidad técnica global se sitúa en **75 %**. Los tests unitarios del backend (18/18) y las pruebas end-to-end con Cypress (13/13) confirman comportamiento funcional en entorno controlado. Sin embargo, la cobertura reportada por SonarCloud permanece en cero porcentaje, el análisis estático del frontend registra ciento ochenta y nueve incidencias de linting, y el pipeline de GitHub Actions omite pruebas de integración con base de datos, auditoría bloqueante de dependencias y ejecución de Cypress.

La calidad documental alcanza **88 %**. El ciclo de evaluación produjo más de doscientos archivos entre informes, matrices, dashboards, hojas de cálculo y evidencias operativas (auditorías npm, JMeter, health de Railway, configuración de CI). Esta documentación satisface en gran medida los requisitos de trazabilidad ICACIT, con pendientes puntuales: exportación de SonarCloud, escaneo DAST y política de respaldos.

En cuanto al despliegue, la plataforma se encuentra activa en producción con disponibilidad del cien por ciento documentada en pruebas de health (quinientas peticiones consecutivas exitosas). Railway hospeda la API y MySQL; Vercel sirve la aplicación de página única. El despliegue manual, sin pipeline de entrega continua automatizado, y la ausencia de documentación de respaldos constituyen las principales reservas.

La calidad de seguridad, medida con OWASP Top 10, alcanzó **76 %** con riesgo residual Medio-Alto. Tres categorías cumplen plenamente (criptografía, inyección y SSRF); una no alcanza el umbral mínimo (componentes vulnerables, 55 %, por CVE npm sin remediar); el resto presenta cumplimiento parcial. Los controles de autenticación JWT, hash bcrypt, middleware de autorización, protección contra inyección SQL y auditoría HTTP están materializados en código. Persisten brechas en configuración del endpoint health, política CORS amplia, permisos granulares no enforced y ciclo de autenticación incompleto.

---

## Fortalezas identificadas

El sistema CAFE-IA demuestra madurez en su núcleo arquitectónico y funcional. La plataforma materializa un PMV completo para la gestión cafetalera con roles diferenciados (administrador y cliente), trazabilidad por etapas, generación de códigos QR, módulo de predicción heurística y chatbot de asistencia contextual. La arquitectura hexagonal proporciona separación de responsabilidades verificable en el repositorio, con modularidad del ochenta y ocho por ciento según la evaluación FURPS+.

En seguridad, el proyecto implementa prácticas fundamentales: secreto JWT obligatorio de al menos treinta y dos caracteres, contraseñas hasheadas con bcrypt, protección de rutas administrativas mediante `adminGuard`, verificación de propiedad de recursos en servicios de negocio para prevenir acceso horizontal no autorizado, fragmentos SQL de scope fijos sin interpolación de entrada de usuario, y correcciones documentadas de inyección SQL en el módulo de reportes tras análisis SonarQube. El middleware de auditoría registra acciones relevantes en la tabla `auditoria_logs`.

La infraestructura desplegada confirma viabilidad operativa: HTTPS en Railway y Vercel, variables de entorno documentadas en archivos de ejemplo, y health check operativo. Las evidencias generadas a lo largo de siete pasos constituyen un corpus documental trazable que vincula cada hallazgo con artefactos verificables, cumpliendo el estándar de evidencia requerido en evaluaciones de calidad de software de nivel profesional.

---

## Debilidades encontradas

El hallazgo de mayor severidad, clasificado como Crítico (CON-001), consiste en la ausencia de transacción SQL en `LoteService.create`, operación que inserta registros en múltiples tablas (lote, trazabilidad, inventario). Un fallo parcial podría dejar datos inconsistentes en la base de datos, afectando directamente la confiabilidad y la integridad exigidas en contextos de trazabilidad alimentaria.

Entre los hallazgos Altos, destacan la exposición de metadatos de infraestructura en el endpoint `/api/health` (incluyendo host interno de MySQL en Railway), la política CORS que autoriza cualquier subdominio `*.vercel.app`, las tablas de permisos granulares en base de datos sin correspondiente enforcement en la API, la vulnerabilidad CVE HIGH en la dependencia `form-data` del backend, la ausencia de Cypress en el pipeline de integración continua, y la falta de documentación de política de respaldos de MySQL.

La deuda técnica se manifiesta de forma transversal: **cero por ciento de remediación** sobre los treinta y tres hallazgos originales consolidados en veinticuatro identificadores únicos. Ninguna de las mejoras propuestas en las auditorías de los pasos dos, cinco y siete fue aplicada al código analizado. Esta circunstancia no invalida la calidad del producto en su estado actual, pero delimita el margen entre un sistema apto para demostración académica y uno preparado para operación productiva de alta exigencia.

---

## Valoración global

El proyecto CAFE-IA se ubica en el **Nivel 3 de madurez — Definido** en una escala simplificada de cinco niveles: los procesos de evaluación están documentados, los controles de seguridad y calidad están establecidos, y las métricas son medibles, pero el ciclo de mejora continua no se ha ejecutado. El **nivel de calidad alcanzado es del 77 % (Bueno)**. El **nivel de seguridad es del 76 % (Bueno)**, con riesgo global **Medio-Alto** impulsado por siete hallazgos Críticos o Altos abiertos.

La **mantenibilidad** se valora favorablemente (88 %) gracias a la arquitectura y convenciones de código consistentes. La **preparación para producción** se estima en **82 %**: el sistema es operativo y desplegado, pero requiere cerrar brechas de integridad de datos, configuración de seguridad y cadena de suministro de dependencias antes de un entorno productivo exigente.

El **cumplimiento ICACIT** se estima en **78 %**, sustentado en la existencia de metodología documentada, matrices de evaluación, hallazgos trazables y evidencias operativas, con espacio de mejora en evidencias complementarias (Sonar export, ZAP, backups).

---

## Conclusión final

La evaluación integral del proyecto CAFE-IA mediante los marcos FURPS+ y OWASP Top 10 permite afirmar que se trata de un sistema de software de **calidad Buena**, con **arquitectura sólida**, **funcionalidad PMV completa** y **controles de seguridad fundamentales adecuados** para un proyecto académico de nivel profesional desplegado en infraestructura cloud.

El sistema cumple el propósito de gestionar información de producción cafetalera con autenticación, roles, trazabilidad y reportes, respaldado por evidencias de prueba y documentación extensa. Las reservas identificadas —integridad transaccional, configuración de seguridad en runtime, dependencias vulnerables y pipeline de calidad incompleto— son conocidas, documentadas y priorizadas en un plan de mejoras consolidado de veinticuatro ítems.

Se recomienda considerar el proyecto **apto para su presentación y operación en el marco académico**, con la salvedad explícita de que la ejecución del Sprint de prioridad uno (hallazgos CON-001 a CON-007) elevaría la calidad y seguridad por encima del ochenta y cinco por ciento y reduciría el riesgo global a nivel Medio. La presente conclusión cierra el ciclo de evaluación FURPS+ y OWASP iniciado en el Paso 01 y consolidado en el Paso 07, quedando lista para su incorporación al informe final del proyecto CAFE-IA ante ICACIT.

---

*Conclusión académica — Paso 08 — Conclusión General — CAFE-IA.*
