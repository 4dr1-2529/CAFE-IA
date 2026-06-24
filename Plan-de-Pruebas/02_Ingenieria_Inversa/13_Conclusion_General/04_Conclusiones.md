# Conclusión General — Ingeniería Inversa del Proyecto CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Conclusión General — Paso 13  
**Fecha:** 24 de junio de 2026  
**Evaluación:** Informe académico e ICACIT

---

## 1. Propósito y alcance de la ingeniería inversa

La presente conclusión sintetiza el proceso de ingeniería inversa ejecutado sobre CAFE-IA, plataforma web orientada a la trazabilidad del café de especialidad y a la estimación de calidad mediante técnicas de análisis automatizado. El objetivo del proceso fue reconstruir, a partir del código fuente, la documentación disponible, los registros de ejecución y la verificación del entorno productivo, el conocimiento integral del sistema: su arquitectura, dominio de negocio, dependencias tecnológicas, configuración de entorno y estado operativo, sin intervención sobre el artefacto de software analizado.

El trabajo se estructuró en doce fases secuenciales —desde el análisis de logs hasta la consolidación documental— y culmina en esta conclusión general. La metodología empleada se alinea con prácticas de auditoría técnica y evaluación de evidencias propias de procesos de acreditación en ingeniería de software, priorizando la trazabilidad entre hallazgo, evidencia y recomendación.

---

## 2. Síntesis del análisis realizado

### 2.1 Arquitectura y dominio

El examen del repositorio permitió identificar una arquitectura de estilo hexagonal, con separación explícita entre capas de interfaces, aplicación, dominio e infraestructura. Se documentaron cuarenta y cinco componentes y trece módulos de API que cubren autenticación, gestión de usuarios y productores, lotes, producción, trazabilidad, calidad, predicciones, dashboard, reportes, chatbot, auditoría y administración del sistema. La evaluación arquitectónica arrojó un cumplimiento alto en modularidad y cohesión, con desviaciones puntuales: consultas SQL directas en el servicio de predicción, ausencia de transacciones en la creación compuesta de lotes y tablas de permisos definidas en base de datos sin aplicación en tiempo de ejecución.

La reconstrucción del dominio reveló un esquema relacional de treinta y nueve tablas y dieciséis procesos de negocio documentados, de los cuales aproximadamente catorce entidades se encuentran plenamente operativas en la aplicación. Esta disparidad entre modelo de datos y funcionalidad expuesta constituye una de las principales fuentes de deuda técnica identificada, particularmente en entidades como fincas, inventario con interfaz limitada y módulos de notificaciones.

### 2.2 Funcionalidad y tecnología

El descubrimiento funcional inventarió cincuenta y nueve capacidades distribuidas en ocho categorías, con doce historias de usuario del producto mínimo viable en estado implementado. La cobertura funcional estimada alcanza el ochenta y ocho por ciento, respaldada por quince vistas de interfaz, trece grupos de rutas REST y pruebas automatizadas locales —dieciocho casos backend y trece especificaciones Cypress— que confirman la operatividad del flujo nuclear de trazabilidad cafetalera.

En el plano tecnológico, el sistema emplea un stack contemporáneo y coherente: Node.js 20, Express, React 18, Vite, MySQL y JSON Web Tokens. El inventario de dependencias detectó vulnerabilidades de severidad alta y moderada sin remediación integral, así como la desconexión entre el script de entrenamiento en Python y el motor heurístico que opera en producción, aspecto relevante para la correcta interpretación de las capacidades de «inteligencia artificial» del producto.

### 2.3 Entorno, configuración y despliegue

La reconstrucción del entorno describe un esquema de despliegue híbrido: desarrollo local con Node y MySQL, producción de API y base de datos en Railway, y aplicación de usuario en Vercel. La verificación de producción confirmó disponibilidad mediante respuestas HTTP 200 en ambos extremos. Se documentaron treinta y ocho variables de entorno, con validación de longitud mínima para el secreto JWT y estandarización del prefijo `MYSQL*` en entornos locales y cloud.

No obstante, el análisis evidenció ausencia de contenedorización, infraestructura como código para Railway, despliegue continuo automatizado y política documentada de respaldos de base de datos. Un incidente histórico de caída de API por error de sintaxis en el módulo de migración fue corregido y verificado, lo que demuestra capacidad de respuesta del equipo ante fallos críticos, aunque subraya la necesidad de pruebas de migración en el pipeline de integración.

---

## 3. Evaluación del estado actual

El estado general del proyecto se califica como **operativo y evolutivamente viable**, con una madurez de software estimada en **7,7 sobre 10** y una cobertura de ingeniería inversa del **noventa y dos por ciento**. El producto cumple su propósito funcional en producción y presenta una base arquitectónica que facilita el mantenimiento y la extensión incremental. Simultáneamente, persisten brechas en garantías de integridad transaccional, automatización de pruebas en integración continua, gestión de secretos y alineación entre modelo de datos y capa de aplicación.

La calidad del código se sitúa en un rango aceptable: las pruebas unitarias e integración locales son satisfactorias, pero la cobertura reportada por SonarCloud permanece en cero porcent por falta de instrumentación, y el análisis estático del frontend presenta errores de configuración que impiden un lint limpio. El pipeline de CI ejecuta build y análisis de seguridad, aunque con tolerancia a fallos en auditoría npm y exclusión deliberada de pruebas de integración y end-to-end.

---

## 4. Fortalezas identificadas

Entre las fortalezas más significativas del proyecto destacan: (i) la operatividad verificada en entornos de producción cloud; (ii) la implementación completa de las historias de usuario del PMV, que cubren el ciclo de trazabilidad desde el registro de lote hasta la generación de reportes y estimaciones de calidad; (iii) la adopción reconocible de arquitectura hexagonal con documentación de cuarenta y cinco componentes; (iv) mecanismos de seguridad baseline —autenticación JWT, cifrado de contraseñas, Helmet, limitación de tasa y control de acceso por roles—; (v) existencia de pipeline de integración continua con análisis estático SonarCloud; y (vi) la corrección documentada de incidentes críticos previos, lo que evidencia madurez operativa en gestión de despliegues.

---

## 5. Debilidades y riesgos principales

Las debilidades más relevantes incluyen la ausencia de transacciones SQL en operaciones compuestas de creación de lote —clasificada como hallazgo crítico HAL-003—, la brecha entre el esquema de base de datos y las entidades efectivamente gestionadas por la aplicación, la exclusión de Cypress y pruebas de integración del pipeline automatizado, vulnerabilidades npm pendientes —particularmente en react-router-dom— y la insuficiencia de evidencias visuales para la evaluación académica.

La matriz de riesgos consolidada registra diecisiete entradas, de las cuales una se clasifica como crítica, seis como altas y ocho como medias. Los riesgos de mayor impacto afectan la integridad de datos, la exposición de credenciales, la continuidad operativa ante ausencia de respaldos documentados y la propagación de regresiones no detectadas en integración continua.

---

## 6. Madurez del software y calidad documental

| Dimensión | Nivel (0–10) |
|-----------|--------------|
| Madurez arquitectónica | 8,0 |
| Madurez tecnológica | 7,5 |
| Calidad funcional | 8,5 |
| Calidad del software (global) | 7,7 |
| Madurez documental (ingeniería inversa) | 8,2 |
| **Nivel general del proyecto** | **7,8** |

La documentación generada durante el proceso de ingeniería inversa alcanza un nivel de madurez alto: trescientos veintisiete artefactos en los pasos analíticos, treinta y cinco matrices en Markdown, veinticuatro diagramas Mermaid, once índices de evidencias y consolidación formal en el generador final. La completitud del núcleo documental es del noventa y seis por ciento —cincuenta y cuatro de cincuenta y cinco documentos estándar—, con pendientes en trazabilidad del primer paso, archivos Excel de matrices no materializados y capturas de paneles cloud. Las evidencias operativas —logs, JSON de health, resultados de pruebas— alcanzan aproximadamente el ochenta y cinco por ciento de completitud; las evidencias visuales, el treinta por ciento.

---

## 7. Aporte del proceso de ingeniería inversa

El proceso de ingeniería inversa ha permitido reconstruir el conocimiento del sistema CAFE-IA de manera sistemática y verificable, transformando un monorepo en producción en un corpus documental trazable apto para evaluación académica y auditoría ICACIT. Mediante la correlación entre código, esquema de base de datos, configuración de despliegue y registros de ejecución, se logró una comprensión integrada que no depende exclusivamente de la memoria del equipo de desarrollo.

El valor metodológico del ejercicio reside en la identificación cuantificada de cuarenta y ocho hallazgos de mejora y diecisiete riesgos, priorizados y vinculados a evidencias concretas. Esta base constituye un insumo objetivo para la planificación de evolución del producto, la gestión de deuda técnica y la toma de decisiones informadas sobre inversiones en calidad, seguridad e infraestructura.

---

## 8. Importancia de las mejoras propuestas

Las cuarenta y tres acciones de mejora planificadas —más nueve verificaciones o correcciones ya aplicadas— no constituyen un catálogo abstracto, sino un plan de acción derivado directamente del análisis. La priorización coloca en primer término la garantía de integridad transaccional, seguida del endurecimiento del pipeline de calidad, la remediación de vulnerabilidades, la documentación de continuidad operativa y la alineación del modelo de dominio con la aplicación.

La implementación ordenada de estas mejoras elevaría la madurez global del proyecto hacia un rango de 8,5 a 9,0 en un horizonte de dos a tres iteraciones de desarrollo, reduciendo la exposición a riesgos críticos y altos y fortaleciendo la confianza en la evolución sostenida del sistema.

---

## 9. Valoración final sobre viabilidad de evolución y mantenimiento

En síntesis, CAFE-IA presenta condiciones favorables para su evolución y mantenimiento a mediano plazo. La arquitectura hexagonal, la cobertura funcional del PMV, la operatividad en producción y la existencia de pruebas automatizadas locales constituyen cimientos sólidos. Las debilidades identificadas son, en su mayoría, abordables mediante intervenciones acotadas y priorizadas, sin requerir reingeniería integral del producto.

La ingeniería inversa cumplió su objetivo: proporcionar una representación fiel, crítica y documentada del sistema tal como se encuentra implementado y desplegado. El veredicto integrador es **favorable** para la continuidad del proyecto, su incorporación al informe académico y su sustentación ante evaluadores ICACIT, **condicionado** a la atención del hallazgo crítico de integridad transaccional, al fortalecimiento del pipeline de calidad y al cierre de las evidencias documentales pendientes.

El proyecto CAFE-IA no solo es comprensible y auditable tras este proceso; resulta, además, **técnicamente viable** para evolucionar hacia un producto de mayor madurez operativa, siempre que las mejoras propuestas se integren en la planificación ordinaria de desarrollo y operaciones.

---

*Documento de cierre académico — Paso 13 Conclusión General.*  
*Redactado en tercera persona. Listo para incorporación al informe final.*
