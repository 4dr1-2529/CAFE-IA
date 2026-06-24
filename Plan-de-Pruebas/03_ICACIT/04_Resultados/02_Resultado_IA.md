# Informe de Resultados ICACIT — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 4 — Resultados de la Evaluación  
**Fecha:** 24 de junio de 2026  
**Fuentes:** II, FURPS+, OWASP, Reporte Calidad, ICACIT Pasos 01–03

---

## 1. Objetivo

Analizar e interpretar los resultados consolidados de la evaluación del proyecto CAFE-IA y determinar el nivel de cumplimiento de las siete competencias ICACIT, con base exclusiva en evidencias documentadas.

---

## 2. Metodología

Integración de resultados de cinco fuentes: Ingeniería Inversa (13 fases), FURPS+/OWASP (8 fases), Reporte de Calidad (89.2 %), ejecución ICACIT Paso 02 (82 %) y consolidación de evidencias Paso 03 (83 %). Sin re-ejecución de pruebas ni análisis de código en tiempo real.

---

## 3. Resultados generales

| Indicador | Valor | Clasificación |
|-----------|-------|---------------|
| **Nivel general ICACIT** | **82 %** | Bueno |
| Calidad software (FURPS+) | 77 % | Bueno |
| Seguridad (OWASP) | 76 % | Bueno |
| Cumplimiento Reporte Calidad | 89.2 % | Bueno |
| Preparación producción | 82 % | Apta con deuda |
| Madurez software | Nivel 3 — Definido | Intermedio |
| Hallazgos abiertos | 24 (1C·6A·14M·3B) | Medio-Alto |
| Remediación | 0 % | Pendiente |

---

## 4. Resultados por área técnica

| Área | Resultado | Fuente | Interpretación |
|------|-----------|--------|----------------|
| Arquitectura | **88 %** | FURPS, II/06–07 | Hexagonal madura; 45 componentes |
| Backend | **82 %** | npm test 18/18 | Express hexagonal operativo |
| Frontend | **78 %** | FURPS Usability | 15 páginas React; Tailwind |
| Base de datos | **80 %** | schema.sql | 39 tablas, 43 FK |
| Seguridad | **76 %** | OWASP A01–A10 | A06 no cumple (55 %) |
| Calidad | **77 %** | FURPS global | Bueno; Performance 70 % |
| Despliegue | **90 %** | Railway + Vercel | HTTP 200 verificado |
| Pruebas | **75 %** | Cypress, JMeter | 13/13; 500/500; CI parcial |
| Documentación | **88 %** | Plan-de-Pruebas | >684 archivos |
| Machine Learning | **70 %** | ml/ offline | Heurístico en producción |

---

## 5. Resultados por competencia ICACIT

### CT-01 — Conocimientos de Ingeniería — 82 % (Alto)

| Campo | Detalle |
|-------|---------|
| Objetivo | Fundamentos de ingeniería de software aplicados |
| Resultado | 82 % (meta ≥ 80 %) |
| Evidencias | README, schema.sql, II/04, npm_test 18/18 |
| Observaciones | Stack Node/React/MySQL coherente; calidad técnica 75 % |
| Conclusión | **Cumple** — dominio técnico documentado |

### CT-02 — Medio Ambiente y Sostenibilidad — 83 % (Alto)

| Campo | Detalle |
|-------|---------|
| Objetivo | Trazabilidad y café sostenible |
| Resultado | 83 % (meta ≥ 75 %) |
| Evidencias | Functionality 83 %, Cypress PF-04/05, 48/59 funcionalidades II |
| Observaciones | PMV trazabilidad operativo |
| Conclusión | **Cumple** — propósito ambiental evidenciado |

### CT-03 — Ingeniería y Sociedad — 78 % (Medio-Alto)

| Campo | Detalle |
|-------|---------|
| Objetivo | Impacto en usuarios y cadena productiva |
| Resultado | 78 % (meta ≥ 75 %) |
| Evidencias | RBAC, Cypress PF-11, 12 HU, Usability 78 % |
| Observaciones | 0 capturas UI para sustentación |
| Conclusión | **Cumple** — roles y flujos verificados |

### CT-04 — Gestión de Proyectos — 88 % (Alto)

| Campo | Detalle |
|-------|---------|
| Objetivo | Gestión documental del ciclo evaluación |
| Resultado | 88 % (meta ≥ 85 %) |
| Evidencias | >684 archivos, cronograma 8 fases, matrices Excel |
| Observaciones | Mayor resultado entre competencias |
| Conclusión | **Cumple** — gestión documental sólida |

### CE-01 — Diseño de Soluciones — 88 % (Alto)

| Campo | Detalle |
|-------|---------|
| Objetivo | Arquitectura hexagonal y diseño |
| Resultado | 88 % (meta ≥ 85 %) |
| Evidencias | 35 diagramas, 13 APIs, 43 FK |
| Observaciones | Deuda en reportes/producción |
| Conclusión | **Cumple** — diseño validado |

### CE-02 — Análisis de Problemas — 82 % (Alto)

| Campo | Detalle |
|-------|---------|
| Objetivo | Hallazgos y análisis de riesgos |
| Resultado | 82 % (meta ≥ 80 %) |
| Evidencias | 24 CON-*, Matriz_Riesgos, 16 correcciones Sonar |
| Observaciones | 0 % remediación aplicada |
| Conclusión | **Cumple** — análisis exhaustivo documentado |

### CE-03 — Uso de Herramientas Modernas — 74 % (Medio-Alto)

| Campo | Detalle |
|-------|---------|
| Objetivo | Herramientas QA, DevOps, análisis |
| Resultado | 74 % (meta ≥ 75 %) |
| Evidencias | Cypress 13/13, JMeter 500/500, ci.yml, Sonar config |
| Observaciones | DevOps 72 %; Cypress fuera CI; Sonar 0 % cov |
| Conclusión | **Parcial** — ligeramente bajo umbral planificado |

---

## 6. Fortalezas

1. Arquitectura hexagonal al 88 % — mejor indicador técnico.
2. Gestión documental al 88 % — corpus >684 archivos.
3. PMV funcional completo — Functionality 83 %, 13 APIs REST.
4. Seis de siete competencias superan meta planificada.
5. Pruebas E2E y unitarias documentadas exitosas.
6. Despliegue productivo Railway + Vercel verificado.
7. Análisis de 24 hallazgos con trazabilidad completa.

---

## 7. Debilidades

1. CE-03 al 74 % — única competencia bajo meta (75 %).
2. OWASP A06 al 55 % — componentes vulnerables.
3. 0 % remediación sobre hallazgos consolidados.
4. Performance al 70 % — único atributo FURPS Regular.
5. 0 capturas UI; 5 evidencias pendientes.
6. CON-001 Crítico — transacción SQL lotes.

---

## 8. Hallazgos relevantes

| Prioridad | Hallazgo | Impacto |
|-----------|----------|---------|
| P1 | CON-001 Sin TX SQL lotes | Integridad datos |
| P1 | CON-002/003 Health y CORS | Seguridad config |
| P1 | CON-005 CVE form-data HIGH | Cadena suministro |
| P2 | SonarCloud 0 % cobertura | Visibilidad deuda |
| P2 | Cypress fuera CI | Regresión UI |

---

## 9. Cumplimiento

| Marco | Resultado | Estado |
|-------|-----------|--------|
| Competencias ICACIT (7) | 6 Cumple / 1 Parcial | 86 % competencias plenas |
| Promedio competencias | 82 % | Bueno |
| FURPS+ | 77 % | Bueno |
| OWASP | 76 % | Bueno |
| ICACIT estimado (Paso 02) | 78 % → **82 %** | Mejora documental |

---

## 10. Interpretación técnica

El proyecto CAFE-IA demuestra **madurez definida (Nivel 3)** con fortalezas en arquitectura, documentación y funcionalidad PMV. La evaluación confirma un sistema **apto para contexto académico y operación controlada**, con deuda técnica conocida y priorizada. El gap principal entre diseño (88 %) y herramientas (74 %) indica que la instrumentación de calidad (CI completo, cobertura, DAST) no acompaña la solidez arquitectónica. La interpretación consolidada sitúa al proyecto en **82 % de cumplimiento ICACIT global**, clasificación **Buena**, con camino claro hacia ≥ 85 % mediante remediación P1 y cierre de evidencias pendientes.

---

*Informe de Resultados — Paso 04 ICACIT — CAFE-IA.*
