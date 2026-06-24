# Conclusiones — Resultados de la Evaluación ICACIT — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 4 — Resultados de la Evaluación  
**Fecha:** 24 de junio de 2026

---

## Introducción

La presente conclusión sintetiza los resultados de la evaluación integral del proyecto CAFE-IA bajo el marco ICACIT 2025, integrando los hallazgos de Ingeniería Inversa (trece fases), FURPS+ y OWASP Top 10 (ocho fases), el Reporte de Calidad de Software (89.2 % de cumplimiento documental) y las fases de planificación, ejecución y consolidación de evidencias del módulo `03_ICACIT/`. El análisis se realizó sin modificación del código fuente, apoyándose exclusivamente en artefactos verificables del repositorio `4dr1-2529/CAFE-IA`.

---

## Resultados obtenidos

El nivel de cumplimiento ICACIT global alcanza el **82 %**, clasificado como **Bueno**. El promedio de las siete competencias evaluadas se distribuye en **83 %** para competencias transversales y **81 %** para competencias específicas. Seis de las siete competencias superan los umbrales planificados en el Paso 01; únicamente CE-03 (Uso de Herramientas Modernas) registra **74 %**, ligeramente por debajo de la meta del 75 %, clasificándose como cumplimiento parcial.

En el plano técnico, los resultados por área confirman coherencia entre fuentes: arquitectura al **88 %**, calidad FURPS+ al **77 %**, seguridad OWASP al **76 %**, funcionalidad al **83 %**, documentación al **88 %**, pruebas al **75 %**, DevOps al **72 %** y preparación para producción al **82 %**. El Reporte de Calidad asigna un nivel global de **7.5 sobre 10**, convergente con la evaluación ICACIT.

---

## Competencias alcanzadas

**CT-01 Conocimientos de Ingeniería (82 %):** El stack Node.js 20, Express 4, React 18, Vite 5 y MySQL 8 demuestra aplicación de fundamentos de ingeniería de software. Las evidencias incluyen dieciocho tests backend exitosos, esquema relacional de treinta y nueve tablas con cuarenta y tres claves foráneas y documentación técnica extensa.

**CT-02 Medio Ambiente y Sostenibilidad (83 %):** El PMV de trazabilidad cafetalera —productores, lotes, etapas, control de calidad y códigos QR— materializa el propósito de café sostenible. Cuarenta y ocho de cincuenta y nueve capacidades funcionales se encuentran implementadas según Ingeniería Inversa.

**CT-03 Ingeniería y Sociedad (78 %):** El sistema atiende roles diferenciados (administrador y cliente), doce historias de usuario implementadas y flujos verificados por Cypress, incluido el escenario PF-11 de control de acceso basado en roles.

**CT-04 Gestión de Proyectos (88 %):** Constituye la competencia de mayor resultado, sustentada en un corpus documental de más de seiscientos ochenta y cuatro archivos, cronograma de ocho fases ICACIT, cuarenta y seis matrices Excel y trazabilidad multi-módulo.

**CE-01 Diseño de Soluciones (88 %):** La arquitectura hexagonal con cuarenta y cinco componentes, trece APIs REST y treinta y cinco diagramas Mermaid valida el diseño de solución como fortaleza principal del proyecto.

**CE-02 Análisis de Problemas (82 %):** Veinticuatro hallazgos únicos consolidados (CON-001 a CON-024), matrices de riesgo, dieciséis correcciones SonarQube documentadas y plan de mejoras priorizado demuestran capacidad analítica exhaustiva, aunque con cero por ciento de remediación aplicada.

**CE-03 Uso de Herramientas Modernas (74 %):** Cypress (13/13), JMeter (500/500), SonarCloud configurado, GitHub Actions y despliegue Railway/Vercel evidencian adopción de herramientas modernas, limitada por ausencia de Cypress en CI, cobertura Sonar en cero por ciento y cinco evidencias pendientes de incorporar.

---

## Fortalezas y debilidades

Las fortalezas se concentran en la **arquitectura** (88 %), la **documentación** (88 %), la **funcionalidad PMV** (83 %) y la **gestión de proyectos** (88 %). El despliegue activo en Railway y Vercel con respuesta HTTP 200, las pruebas automatizadas exitosas y el análisis de seguridad con controles JWT/bcrypt/Helmet complementan un perfil sólido para evaluación académica.

Las debilidades incluyen el **hallazgo crítico CON-001** (ausencia de transacción SQL en creación de lotes), la categoría **OWASP A06 al 55 %** (componentes vulnerables), el **rendimiento al 70 %**, la **ausencia total de capturas UI**, el **cero por ciento de remediación** y la **incompletitud del pipeline CI** (Cypress y tests de integración con base de datos omitidos).

---

## Estado por dimensión

**Calidad del proyecto:** El sistema alcanza **77 % en FURPS+** y **7.5/10 en el Reporte de Calidad**, calificación **Buena** con deuda técnica documentada. **Estado de la arquitectura:** Hexagonal madura al 88 %, con desviaciones puntuales en módulos de reportes y producción. **Estado de la documentación:** Excepcional para contexto académico (88 %), con reservas en capturas visuales y export SonarCloud. **Estado de las pruebas:** Funcionalmente sólidas (13/13 Cypress, 18/18 backend) pero con cobertura instrumentada en cero por ciento y CI incompleto (75 %).

---

## Nivel de cumplimiento ICACIT

El proyecto CAFE-IA alcanza un **nivel de cumplimiento ICACIT del 82 %**, con **seis competencias en cumplimiento pleno** y **una en cumplimiento parcial** (CE-03). El sistema es **apto para sustentación académica y operación controlada**, condicionado a la incorporación de evidencias pendientes (capturas UI, export SonarCloud) y la ejecución documentada del plan de remediación P1 (hallazgos CON-001 a CON-007). La meta de **85 %** planificada para cierre ICACIT es alcanzable mediante las mejoras MR-01 a MR-10 definidas en el presente paso y su ejecución en las fases de Métricas y Mejora Continua.

La presente conclusión queda lista para incorporarse directamente al informe final del proyecto CAFE-IA ante ICACIT.

---

*Conclusiones — Paso 04 Resultados ICACIT — CAFE-IA.*
