# Conclusiones — Auditoría FURPS+ CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 02 — Auditor FURPS+  
**Fecha:** 24 de junio de 2026

---

## Síntesis de la auditoría

Se ejecutó la auditoría FURPS+ sobre CAFE-IA conforme al plan del Paso 01, evaluando **48 criterios** y **15 módulos funcionales** con evidencias reales del repositorio, logs de prueba, métricas JMeter, resultados Cypress y verificación de producción en Railway y Vercel. El análisis se realizó sin modificar el código fuente.

---

## Calidad funcional

La dimensión **Functionality** alcanza **84 % (Bueno)**. El producto cumple el PMV con doce historias de usuario implementadas, trece grupos de API REST operativos y flujos verificados mediante Cypress (trece pruebas aprobadas en la última ejecución documentada). Los módulos de login, productores, trazabilidad, calidad, reportes, chatbot y auditoría presentan cumplimiento alto.

La brecha más significativa es el módulo de **lotes**: operativo para alta y consulta, pero sin transacción SQL en la creación compuesta (hallazgo crítico FUR-001) y sin operaciones de edición o baja vía API. La entidad **fincas** permanece modelada en base de datos sin exposición en aplicación.

---

## Calidad arquitectónica

La arquitectura hexagonal documentada en ingeniería inversa obtiene **88 % (Bueno)** en supportability arquitectónica. Trece módulos API con separación interfaces → application → domain → infrastructure facilitan mantenimiento y extensión. Se detecta desviación puntual (SQL en `PredictionService`) y deuda de modelo (treinta y nueve tablas frente a catorce entidades operativas).

---

## Calidad técnica

| Dimensión FURPS+ | Resultado |
|------------------|-----------|
| Reliability | 83 % — Bueno |
| Performance | 72 % — Regular |
| Supportability | 76 % — Bueno |
| Seguridad (+) | 78 % — Bueno |

La **disponibilidad en producción** es excelente (cien por ciento en prueba JMeter de health, HTTP 200 en Railway y Vercel). El **rendimiento** queda en rango regular: percentil 95 marginal en health, ausencia de pruebas de carga en escenarios de negocio y chunk de gráficos de cuatrocientos once kilobytes. La **supportability** se ve limitada por cobertura Sonar en cero por ciento, Cypress fuera de CI y omisión de tests de integración en pipeline.

La seguridad baseline (JWT, bcrypt, Helmet, rate-limit) es sólida; persisten CVE en dependencias npm y exposición de metadatos en endpoint de salud.

---

## Calidad documental

El proyecto cuenta con README extenso, documentación de historias de usuario en la aplicación, dieciséis correcciones Sonar documentadas y corpus de ingeniería inversa (Pasos 01–13). Para ICACIT faltan capturas visuales de SonarCloud Quality Gate y paneles cloud. La evidencia Cypress data de mayo de 2026.

**Calidad documental para auditoría FURPS+:** Buena (aprox. 85 %).

---

## Nivel de madurez del software

| Indicador | Valor |
|-----------|-------|
| Calidad global FURPS+ | **79 % — Bueno** |
| Madurez funcional | Alta (PMV cumplido) |
| Madurez operativa | Media-Alta (prod activa) |
| Madurez calidad automatizada | Media (CI parcial) |
| Madurez seguridad dependencias | Media (CVE pendientes) |

---

## Fortalezas principales

1. Producción verificada Railway + Vercel con disponibilidad del cien por ciento en health.
2. Cobertura funcional PMV con Cypress y tests backend (18/18) satisfactorios.
3. Arquitectura hexagonal reconocible con modularidad del 88 %.
4. Seguridad de autenticación JWT validada en pruebas.
5. Correcciones SonarCloud documentadas (inyección SQL, leakage env, JWT).
6. Reportes exportables PDF/Excel operativos.

---

## Debilidades encontradas

1. **Crítica:** integridad transaccional en creación de lote (FUR-001).
2. Pruebas E2E y de integración excluidas del pipeline CI.
3. Rendimiento evaluado solo en endpoint de salud.
4. Cobertura de código no instrumentada (0 % Sonar).
5. Vulnerabilidades npm sin remediación completa.
6. Accesibilidad y evidencias visuales ICACIT incompletas.

---

## Recomendaciones para la siguiente fase

1. **Paso 03 — Auditor de Implementación FURPS:** verificar estado de FUR-001 a FUR-018 tras eventuales correcciones; no asumir implementación sin evidencia en código.
2. Priorizar remediación de FUR-001, FUR-003, FUR-004 y FUR-006 antes del bloque OWASP.
3. Incorporar evidencias pendientes (Sonar captura, JMeter negocio, Cypress actualizado).
4. Proceder al **Planificador OWASP (Paso 04)** con trazabilidad cruzada FURPS seguridad (X-01) y hallazgos FUR-004/FUR-005.

---

## Veredicto

La auditoría FURPS+ califica a CAFE-IA con **79 % de cumplimiento global (Bueno)**, **apto para informe académico e ICACIT con observaciones**. El sistema es evaluable, operativo y evolutivamente viable; las mejoras identificadas son acotadas y priorizadas para la fase de implementación y auditoría OWASP subsiguiente.

---

*Conclusión Paso 02 — Auditor FURPS+. Redactada para incorporación directa al informe académico.*
