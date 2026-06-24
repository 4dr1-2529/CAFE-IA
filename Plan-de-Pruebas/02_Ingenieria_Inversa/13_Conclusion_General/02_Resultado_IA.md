# Informe Ejecutivo Consolidado — Conclusión General CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 13 — Conclusión General de Ingeniería Inversa  
**Fecha:** 24 de junio de 2026  
**Alcance:** Síntesis integradora de Pasos 01–12

---

## 1. Estado general del proyecto

CAFE-IA constituye un sistema web full-stack orientado a la trazabilidad cafetalera, con capacidades de control de calidad, reportes exportables y estimación heurística de rendimiento. El análisis de doce fases de ingeniería inversa —apoyado en evidencias del repositorio, logs de ejecución y verificación de producción— permite afirmar que el producto se encuentra **operativo en entorno productivo**, con API desplegada en Railway y aplicación de usuario en Vercel, ambas respondiendo HTTP 200 al momento de la evaluación.

El monorepo integra backend Node.js/Express, frontend React/Vite y persistencia MySQL, con pipeline de integración continua en GitHub Actions. La reconstrucción documental abarcó **327 artefactos** en los pasos analíticos 01–11, más la consolidación del Paso 12 y el cierre del Paso 13, sin alteración del código fuente.

---

## 2. Calidad funcional

El descubrimiento funcional identificó **59 capacidades** agrupadas en ocho dominios, con **12 historias de usuario** del PMV en estado implementado. La cobertura funcional estimada alcanza el **88 %** respecto al modelo de datos y la documentación de arquitectura: los módulos de autenticación, usuarios, productores, producción, trazabilidad, calidad, dashboard, reportes, chatbot y administración presentan ciclo completo vista–API–persistencia.

Persisten brechas en entidades modeladas pero no expuestas (fincas, inventario con UI limitada), inmutabilidad de lotes en API y cobertura E2E incompleta en módulos administrativos avanzados. No obstante, el flujo nuclear lote → trazabilidad → calidad → predicción se encuentra funcional y verificado mediante pruebas locales.

| Indicador | Valor |
|-----------|-------|
| Funcionalidades completas | 48 / 59 |
| Funcionalidades parciales | 7 |
| No implementadas en aplicación | 4 |
| Cobertura funcional estimada | 88 % |
| Madurez funcional | **8,5 / 10** |

---

## 3. Calidad tecnológica

El stack tecnológico resulta coherente y actualizado en sus componentes principales: Node.js 20, Express 4.22, React 18, Vite 5, mysql2 y JWT. Las dependencias fueron inventariadas y auditadas, detectándose CVE de severidad alta y moderada —entre ellas `form-data` transitiva y `react-router-dom` en rango vulnerable— sin resolución completa al cierre del análisis.

La herramienta de aprendizaje automático (`ml/train_model.py`) permanece desacoplada del runtime productivo, que opera mediante motor heurístico (`PredictionEngine`). El pipeline CI ejecuta tests unitarios, build y análisis SonarCloud, pero omite integración con base de datos y pruebas Cypress.

| Indicador | Valor |
|-----------|-------|
| Dependencias catalogadas | ~69 (BE + FE) |
| CVE identificados | 8+ |
| Madurez tecnológica | **7,5 / 10** |

---

## 4. Calidad arquitectónica

La detección y evaluación arquitectónica reconocen un patrón **hexagonal** con separación interfaces → application → domain → infrastructure. Se documentaron **45 componentes**, **13 controladores** y **13 módulos API**. Los atributos de modularidad (88 %), cohesión (90 %) y mantenibilidad obtuvieron cumplimiento alto en la mayoría de dimensiones evaluadas.

Se identificaron desviaciones: SQL directo en `PredictionService`, ausencia de transacciones en creación de lotes, tablas de permisos sin enforcement y rutas duplicadas. La evaluación global arquitectónica se sitúa en **7,8 / 10**, con 24 de 40 criterios del checklist en cumplimiento pleno.

| Indicador | Valor |
|-----------|-------|
| Madurez arquitectónica | **8,0 / 10** |
| Patrón dominante | Hexagonal |
| Componentes documentados | 45 |

---

## 5. Calidad del código

Las pruebas backend reportan **18/18 casos exitosos** en ejecución local. Cypress documenta **13/13 especificaciones** aprobadas en la última corrida registrada (mayo 2026). SonarCloud integrado en CI presenta cobertura reportada en **0 %** por ausencia de instrumentación lcov; ESLint frontend registra **2 errores** de configuración y numerosos warnings.

Las correcciones documentadas en análisis estático (16 hallazgos Sonar mitigados, override de CVE transitiva `tmp`) evidencian actividad de mejora continua. La calidad del código se califica como **aceptable con deuda técnica medible**, priorizando transaccionalidad, cobertura y endurecimiento del pipeline.

| Indicador | Valor |
|-----------|-------|
| Tests backend | 18/18 OK |
| Cypress E2E (local) | 13/13 OK |
| Cobertura Sonar | 0 % |
| Madurez calidad código | **7,0 / 10** |

---

## 6. Estado de la infraestructura

La reconstrucción del entorno describe desarrollo local con Node y MySQL, producción en Railway (API + base de datos) y Vercel (SPA). No se evidencia dockerización, infraestructura como código para Railway ni política documentada de respaldos MySQL. El archivo `render.yaml` sugiere alternativa de despliegue sin uso productivo verificado.

La comunicación cliente-servidor opera mediante REST con CORS configurable; el health endpoint expone metadatos de infraestructura. La madurez de infraestructura se estima en **7,0 / 10**.

---

## 7. Estado del despliegue

El despliegue productivo se verificó mediante respuestas JSON de health: API Railway HTTP 200, frontend Vercel HTTP 200. Un incidente histórico crítico por error de sintaxis en `migrate.js` fue corregido y validado posteriormente. No existe evidencia de despliegue continuo automatizado desde GitHub hacia Railway o Vercel; las migraciones y seeds se ejecutan al arranque del servicio.

JMeter confirmó **500/500 peticiones exitosas** al endpoint de salud, con percentil 95 cercano a 2,6 s bajo la carga documentada.

| Indicador | Valor |
|-----------|-------|
| Producción API | Operativa |
| Producción frontend | Operativa |
| CD automatizado | No evidenciado |
| Madurez despliegue | **7,5 / 10** |

---

## 8. Calidad de la documentación de ingeniería inversa

El proceso generó documentación estructurada en doce pasos con patrón homogéneo (Prompt, Resultado, Mejoras, Conclusiones, Trazabilidad + Evidencias). Se produjeron **35+ matrices** en Markdown, **24 diagramas Mermaid**, **11 índices** de evidencias y **3 archivos Excel** en el generador final. La completitud del núcleo documental alcanza **54/55** documentos (falta trazabilidad del Paso 01); los 21 Excel de matrices de pasos 01–11 no están materializados en disco.

| Indicador | Valor |
|-----------|-------|
| Madurez documental | **8,2 / 10** |
| Cobertura ingeniería inversa | ~92 % |
| Evidencias operativas | ~85 % |
| Evidencias visuales | ~30 % |

---

## 9. Nivel de cumplimiento alcanzado

| Dimensión | Cumplimiento |
|-----------|--------------|
| Operación y logs | ~95 % |
| Dependencias | ~90 % |
| Funcionalidad | ~90 % |
| Tecnología | ~95 % |
| Arquitectura | ~90 % |
| Dominio | ~85 % |
| Entorno | ~85 % |
| Variables entorno | ~90 % |
| Hallazgos | ~95 % |
| **Global** | **~92 %** |

---

## 10. Hallazgos más relevantes

| ID | Hallazgo | Prioridad |
|----|----------|-----------|
| HAL-003 | Creación de lote sin transacción SQL | Crítica |
| HAL-002 | Admin seed ausente en producción | Alta |
| HAL-010 | Cypress fuera del pipeline CI | Alta |
| HAL-013 | CVE react-router-dom | Alta |
| HAL-028 | JWT sin política de rotación | Alta |
| HAL-035 | Backups MySQL no documentados | Alta |
| HAL-006 | Esquema BD con tablas huérfanas (39 vs ~14 operativas) | Alta |
| HAL-001 | Crash migrate.js (histórico) | Corregido |

En conjunto: **48 hallazgos de mejora**, **7 verificaciones positivas**, **46 acciones pendientes**.

---

## 11. Riesgos identificados

La matriz de riesgos consolida **17 entradas** (RSK-01 a RSK-17), distribuidas en 1 crítico, 6 altos, 8 medios y 2 bajos. Los de mayor exposición afectan integridad de datos, gestión de secretos, continuidad operativa y regresiones no detectadas en CI.

---

## 12. Fortalezas del proyecto

1. Producción activa y verificada en Railway y Vercel.
2. Cobertura funcional PMV con 12 historias de usuario implementadas.
3. Arquitectura hexagonal reconocible y documentada con 45 componentes.
4. Seguridad baseline: JWT, bcrypt, Helmet, rate-limit, RBAC admin/cliente.
5. Pruebas backend sólidas (18/18) y E2E Cypress completas en ejecución local.
6. Pipeline CI con tests, build, SonarCloud y auditoría npm.
7. Variables de entorno estandarizadas con validación de `JWT_SECRET`.
8. Corrección documentada de incidentes críticos previos en despliegue.

---

## 13. Debilidades encontradas

1. Integridad transaccional deficiente en operaciones compuestas de lote.
2. Brecha entre modelo de datos (39 tablas) y entidades operativas (~14).
3. Pruebas de integración y E2E excluidas del pipeline automatizado.
4. Vulnerabilidades npm sin remediación completa.
5. Cobertura de código y evidencias SonarCloud insuficientes para ICACIT visual.
6. ML no integrado pese a expectativa nominal de «IA».
7. Infraestructura sin Docker, IaC ni backups documentados.
8. Evidencias visuales de paneles cloud pendientes de incorporación.

---

## 14. Oportunidades de mejora

Las mejoras propuestas —**43 acciones planificadas** más 9 ya verificadas o corregidas— priorizan: (a) garantía de consistencia en persistencia, (b) endurecimiento de CI/CD y seguridad de dependencias, (c) alineación del modelo de dominio con la aplicación, (d) completitud de evidencias para evaluación académica y (e) maduración operativa (backups, secretos, APM).

La ejecución ordenada de estas acciones elevaría la madurez global del proyecto de **7,7/10** hacia un rango **8,5–9,0/10** en un horizonte de dos a tres iteraciones de desarrollo.

---

## Valoración ejecutiva

CAFE-IA es un sistema **funcional, desplegado y evolutivamente viable**, con base arquitectónica sólida y deuda técnica **identificada y priorizada**. La ingeniería inversa cumplió su objetivo de reconstruir el conocimiento del sistema sin acceso exclusivo a su equipo original. El veredicto integrador es **favorable para continuidad del proyecto y sustentación ICACIT**, condicionado a la atención del hallazgo crítico HAL-003 y al cierre de brechas en pipeline de calidad y evidencias visuales.

---

*Paso 13 — Conclusión General. Informe listo para anexo académico.*
