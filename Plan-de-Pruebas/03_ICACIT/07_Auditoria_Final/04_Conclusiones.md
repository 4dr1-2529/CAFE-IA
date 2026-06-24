# Conclusiones — Auditoría Final Integral — ICACIT Paso 7 — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 7 — Auditoría Final y Conclusión General  
**Fecha:** 24 de junio de 2026  
**Repositorio evaluado:** `4dr1-2529/CAFE-IA`

---

## 1. Objetivo de toda la evaluación

La evaluación integral del proyecto CAFE-IA tuvo como propósito determinar, con base en evidencias verificables y sin alteración del código fuente, el grado de cumplimiento de los estándares de calidad de software (FURPS+, ISO/IEC 25010), seguridad (OWASP Top 10 API 2021), competencias de acreditación ICACIT 2025 y los requisitos documentales de un sistema de trazabilidad cafetalera orientado a la producción sostenible. El ciclo abarcó treinta y cuatro fases documentales distribuidas en cuatro módulos —Ingeniería Inversa (trece pasos), FURPS+ y OWASP (ocho pasos), Reporte de Calidad de Software (trece capítulos) y evaluación ICACIT (siete pasos completados al momento del cierre)—, produciendo un corpus de aproximadamente ochocientos ochenta y cuatro archivos de evidencia.

---

## 2. Resultado de Ingeniería Inversa

El análisis de ingeniería inversa reconstruyó la arquitectura, el dominio funcional, el entorno de ejecución y la calidad tecnológica del monorepo `cafe-cursor/`. Se identificaron cincuenta y nueve capacidades funcionales agrupadas en ocho dominios, con cuarenta y ocho implementadas de forma completa, siete parciales y cuatro no expuestas en la aplicación. La cobertura funcional estimada alcanza el ochenta y ocho por ciento. El patrón arquitectónico dominante es hexagonal, con cuarenta y cinco componentes documentados, trece controladores y trece módulos API REST. La madurez arquitectónica se calificó en ocho de diez; la madurez funcional en ocho coma cinco de diez; la madurez tecnológica en siete coma cinco de diez. El sistema se verificó operativo en producción: API en Railway y aplicación de usuario en Vercel, ambas con respuesta HTTP 200. Se documentaron brechas en entidades no expuestas (fincas), inmutabilidad de lotes en API, desacople del módulo de aprendizaje automático y ausencia de política de respaldos MySQL.

---

## 3. Resultado de FURPS+

La evaluación FURPS+ sobre cuarenta y ocho criterios arrojó un cumplimiento global del setenta y siete por ciento, clasificado como Bueno. Los atributos Functionality (ochenta y tres por ciento), Usability (setenta y ocho por ciento), Reliability (setenta y ocho por ciento) y Supportability (setenta y cuatro por ciento) se sitúan en rango Bueno. Performance obtuvo setenta por ciento —único atributo en rango Regular—, atribuible al bundle frontend de Recharts (cuatrocientos once kilobytes), a la ausencia de pruebas de carga sobre APIs autenticadas y a la limitación de JMeter al endpoint health. La seguridad extendida alcanzó setenta y seis por ciento. La remediación de hallazgos FUR permanece en cero por ciento al cierre de la auditoría.

---

## 4. Resultado de OWASP

La auditoría OWASP Top 10 API evaluó diez categorías de seguridad con un cumplimiento global del setenta y seis por ciento y riesgo residual Medio-Alto. Tres categorías cumplen plenamente (criptografía A02 en aspectos de JWT/bcrypt, inyección A03 y SSRF A10). La categoría A06 —Componentes Vulnerables— no alcanza el umbral mínimo con cincuenta y cinco por ciento, debido a CVE documentados en dependencias npm (`form-data` HIGH en backend; seis CVE en frontend incluyendo `react-router-dom`). Las categorías A01 (setenta y ocho por ciento), A05 (configuración: health, CORS), A07 (setenta y dos por ciento: contraseñas débiles, refresh ausente) y A08 (integridad CI) presentan cumplimiento parcial. Los controles de autenticación JWT, hash bcrypt, middleware de autorización, protección contra inyección SQL y cabeceras Helmet están materializados en código.

---

## 5. Resultado de ICACIT

La evaluación ICACIT sobre siete competencias (cuatro transversales CT-01 a CT-04 y tres específicas CE-01 a CE-03) obtuvo un promedio del ochenta y dos por ciento. Seis competencias superan la meta planificada: CT-01 Conocimientos de Ingeniería (ochenta y dos por ciento), CT-02 Medio Ambiente (ochenta y tres por ciento), CT-03 Ingeniería y Sociedad (setenta y ocho por ciento), CT-04 Gestión de Proyectos (ochenta y ocho por ciento), CE-01 Diseño de Soluciones (ochenta y ocho por ciento) y CE-02 Análisis de Problemas (ochenta y dos por ciento). CE-03 Uso de Herramientas Modernas alcanzó setenta y cuatro por ciento, ligeramente por debajo del umbral del setenta y cinco por ciento, debido a Cypress fuera del pipeline CI, cobertura SonarCloud en cero por ciento y automatización DevOps al setenta y dos por ciento. La consolidación de evidencias (Paso 03) reportó ochenta y tres por ciento de cobertura sobre cuarenta y cuatro evidencias clave catalogadas.

---

## 6. Resultado de Arquitectura

La arquitectura hexagonal del proyecto obtiene el mejor indicador técnico de toda la evaluación: ochenta y ocho por ciento. La separación en capas interfaces → application → domain → infrastructure se verificó en cuarenta y cinco componentes. Veinticuatro de cuarenta criterios del checklist arquitectónico cumplen plenamente. Las desviaciones documentadas incluyen SQL directo en `PredictionService`, ausencia de transacciones en creación de lotes (CON-001), tablas de permisos sin enforcement (CON-004) y rutas duplicadas. La modularidad (ochenta y ocho por ciento) y la cohesión (noventa por ciento) evidencian un diseño maduro con deuda puntual en integridad transaccional y autorización granular.

---

## 7. Resultado de Calidad

La calidad del código se califica como aceptable con deuda técnica medible. Las pruebas backend reportan dieciocho de dieciocho casos exitosos. Cypress documenta trece de trece especificaciones aprobadas en la última corrida registrada (mayo 2026). SonarCloud integrado en CI presenta cobertura en cero por ciento por ausencia de instrumentación lcov. Dieciséis correcciones Sonar fueron documentadas. El Reporte de Calidad de Software registra ochenta y nueve coma dos por ciento de cumplimiento documental y nivel global de siete coma cinco sobre diez. La calidad general FURPS (setenta y siete por ciento) converge con el promedio ICACIT (ochenta y dos por ciento), indicando coherencia entre marcos evaluativos.

---

## 8. Resultado de Seguridad

La postura de seguridad global es Buena con reservas. OWASP al setenta y seis por ciento y A06 al cincuenta y cinco por ciento constituyen el principal vector de riesgo. Siete hallazgos de prioridad P1 concentran debilidades operativas: exposición de infraestructura en health (CON-002), CORS amplio (CON-003), RBAC incoherente (CON-004), CVE npm (CON-005), ausencia de Cypress en CI (CON-006) y backups no documentados (CON-007). El almacenamiento de JWT en localStorage (CON-009) y la política de contraseñas de seis caracteres (CON-013) representan riesgos medios documentados. No se evidencian secretos hardcodeados ni inyección SQL explotable en el análisis documentado.

---

## 9. Resultado de DevOps

La madurez DevOps se sitúa en setenta y dos por ciento (Regular-Bueno). El despliegue alcanza noventa por ciento con Railway (API + MySQL) y Vercel (SPA) operativos. La disponibilidad verificada por JMeter es del cien por ciento (quinientas de quinientas peticiones health sin error). La integración CI alcanza sesenta y cinco por ciento: el pipeline ejecuta build y tests unitarios pero omite MySQL (`SKIP_INTEGRATION`), Cypress y bloqueo por CVE (`continue-on-error` en audit). No se evidencia dockerización ni infraestructura como código para Railway.

---

## 10. Resultado de QA

La calidad de pruebas alcanza setenta y cinco por ciento. Treinta y un casos documentados (dieciocho backend + trece Cypress). JMeter validó quinientas peticiones al endpoint health. La cobertura instrumentada en SonarCloud es cero por ciento. Cypress no forma parte del pipeline de integración continua. No se documentan pruebas de accesibilidad (axe-core) ni colección Postman formal. El riesgo de regresión UI en merge permanece abierto (CON-006).

---

## 11. Fortalezas

El proyecto presenta fortalezas significativas en arquitectura hexagonal (ochenta y ocho por ciento), gestión documental (ochenta y ocho por ciento, corpus superior a ochocientos archivos), funcionalidad del PMV de trazabilidad (ochenta y tres por ciento), despliegue productivo verificado (noventa por ciento) y análisis exhaustivo de veinticuatro hallazgos con plan maestro de mejoras PDCA. Seis de siete competencias ICACIT cumplen meta. El propósito de café sostenible queda evidenciado en módulos de trazabilidad, calidad y registro de productores.

---

## 12. Debilidades

Las debilidades principales son: hallazgo crítico de integridad transaccional (CON-001); categoría OWASP A06 no conforme; cero por ciento de remediación aplicada; competencia CE-03 bajo umbral; Performance FURPS en rango Regular; ausencia total de capturas UI para sustentación; cobertura SonarCloud nula; y pipeline CI incompleto. Catorce hallazgos medios y tres bajos permanecen pendientes.

---

## 13. Riesgos

El riesgo global se clasifica como Medio-Alto. Los riesgos prioritarios son: pérdida de integridad de datos en operaciones multi-tabla de lotes (probabilidad media, impacto crítico); explotación de CVE npm documentados (probabilidad media, impacto alto); regresión UI no detectada en merge (probabilidad alta dado Cypress fuera de CI, impacto medio); y pérdida de datos por ausencia de política de respaldos documentada (probabilidad baja, impacto alto).

---

## 14. Oportunidades de mejora

El Plan Maestro de Mejoras (veinticuatro acciones CON-001–CON-024) prioriza un Sprint P1 de uno a dos semanas para eliminar hallazgos críticos y altos. La meta documentada eleva calidad FURPS, OWASP e ICACIT por encima del ochenta y cinco por ciento, reduce hallazgos Crítico/Alto a cero y avanza la madurez de Nivel 3 (Definido) a Nivel 4 (Gestionado). La incorporación de capturas UI (E-01–E-24) y la re-ejecución de Cypress y Sonar cerrarían brechas de sustentación académica.

---

## 15. Madurez del proyecto

El proyecto se clasifica en **Nivel 3 — Definido** según el modelo de madurez documentado en FURPS/08 e ICACIT/05. Los procesos de evaluación, documentación y planificación de mejoras están definidos y repetibles. La instrumentación de calidad (CI completo, cobertura, monitoreo) no acompaña aún la solidez arquitectónica, impidiendo el ascenso a Nivel 4 — Gestionado hasta completar el plan PDCA del Paso 06.

---

## 16. Viabilidad de mantenimiento

La viabilidad de mantenimiento se califica como **Alta con reservas**. La arquitectura hexagonal, la separación de capas, la documentación extensa (>884 archivos) y la organización del código en módulos por dominio facilitan la evolución del sistema. Las reservas corresponden a deuda en transaccionalidad, RBAC granular, cobertura de pruebas no instrumentada y dependencias con CVE sin remediar.

---

## 17. Viabilidad de escalabilidad

La viabilidad de escalabilidad se califica como **Media-Alta**. El despliegue en servicios cloud gestionados (Railway, Vercel) permite escalamiento horizontal del frontend y vertical del backend. La ausencia de dockerización, caché distribuida, balanceo documentado y pruebas de carga sobre APIs de negocio limitan la validación de escalamiento bajo carga real. El bundle frontend de Recharts (411 KB) puede afectar la experiencia en conexiones lentas.

---

## 18. Preparación para producción

La preparación para producción se documenta en **ochenta y dos por ciento — Apta con deuda técnica**. El sistema responde en entorno productivo, procesa flujos nucleares de trazabilidad y cuenta con autenticación, autorización básica y protecciones HTTP. Las reservas para producción sin supervisión incluyen: CON-001 (integridad), CON-005/008 (CVE), CON-007 (DR), CON-006 (regresión) y CON-002/003 (configuración). La ejecución del Sprint P1 elevaría la preparación estimada por encima del ochenta y cinco por ciento.

---

## 19. Conclusión académica

En síntesis, la auditoría final integral del proyecto CAFE-IA confirma que el sistema cumple los objetivos académicos y operativos de un producto mínimo viable de trazabilidad cafetalera, con un nivel general de **ochenta y dos por ciento** bajo el marco ICACIT y **setenta y siete por ciento** bajo FURPS+. La arquitectura, la documentación y la funcionalidad del PMV constituyen los pilares más sólidos de la evaluación. La seguridad, la instrumentación de calidad y la integridad transaccional concentran la deuda técnica priorizada.

El veredicto de la auditoría es **APTO CON RESERVAS** para presentación ante el comité de acreditación ICACIT y para operación en contexto académico controlado. Las reservas son explícitas, documentadas y trazables a veinticuatro hallazgos con acciones correctivas asignadas. La remediación del Sprint P1 (CON-001 a CON-007) constituye la condición recomendada para una nueva auditoría sin reservas mayores y para alcanzar la meta del ochenta y cinco por ciento en indicadores globales.

Esta conclusión cierra el ciclo de auditoría final del módulo `03_ICACIT/07_Auditoria_Final/` y queda lista para incorporarse directamente al informe final del proyecto CAFE-IA.

---

*Conclusiones — Auditoría Final Integral — ICACIT Paso 7 — CAFE-IA — 24 de junio de 2026.*
