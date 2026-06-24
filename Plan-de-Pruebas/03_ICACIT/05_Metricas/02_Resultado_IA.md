# Informe de Métricas e Indicadores ICACIT — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 5 — Métricas e Indicadores  
**Fecha:** 24 de junio de 2026  
**Fuentes:** FURPS/08, II/13, Reporte Calidad, ICACIT Pasos 01–04

---

## 1. Objetivo

Calcular y analizar indicadores técnicos, funcionales, arquitectónicos, documentales, DevOps y QA del proyecto CAFE-IA, derivados exclusivamente de evaluaciones documentadas, para medir objetivamente el cumplimiento ICACIT.

---

## 2. Metodología

Consolidación de métricas desde: `01_FURPS_OWASP/08_Conclusion_General/` (FURPS 77 %, OWASP 76 %), `02_Ingenieria_Inversa/13/` (funcional 88 %, 48/59 capacidades), `Reporte-Calidad-Software/` (89.2 %), `03_ICACIT/04_Resultados/` (competencias 82 %). Escala semáforo: Verde ≥ 85 %, Amarillo 70–84 %, Rojo < 70 %.

---

## 3. Indicadores de calidad

| Indicador | Valor % | Fuente | Estado |
|-----------|---------|--------|--------|
| Cumplimiento FURPS+ | **77** | FURPS/08 | Bueno |
| Cumplimiento OWASP | **76** | FURPS/08 | Bueno |
| Calidad Arquitectónica | **88** | FURPS, II/06–07 | Bueno |
| Calidad del Código | **75** | Reporte/07; 18/18 tests; Sonar 0 % cov | Bueno |
| Calidad Funcional | **83** | FURPS Functionality | Bueno |
| Calidad Documental | **88** | ICACIT/03; 684 archivos | Bueno |
| Calidad de Pruebas | **75** | FURPS QA; Cypress 13/13 | Bueno |

---

## 4. Indicadores técnicos (cobertura)

| Indicador | Valor % | Evidencia |
|-----------|---------|-----------|
| Cobertura funcionalidades | **81** | 48/59 II; Functionality 83 % |
| Cobertura pruebas (QA) | **75** | QA FURPS; Sonar cobertura 0 % |
| Cobertura documental | **88** | Plan-de-Pruebas + Reporte |
| Cobertura arquitectónica | **88** | 24/40 criterios II cumplen pleno |
| Cobertura seguridad | **76** | Promedio OWASP A01–A10 |
| Cobertura despliegue | **90** | Railway + Vercel HTTP 200 |

---

## 5. Indicadores ICACIT por competencia

| ID | Competencia | % | Nivel | Documento |
|----|-------------|---|-------|-----------|
| CT-01 | Conocimientos de Ingeniería | 82 | Alto | 04_Resultados |
| CT-02 | Medio Ambiente y Sostenibilidad | 83 | Alto | 04_Resultados |
| CT-03 | Ingeniería y Sociedad | 78 | Medio-Alto | 04_Resultados |
| CT-04 | Gestión de Proyectos | 88 | Alto | 04_Resultados |
| CE-01 | Diseño de Soluciones | 88 | Alto | 04_Resultados |
| CE-02 | Análisis de Problemas | 82 | Alto | 04_Resultados |
| CE-03 | Uso de Herramientas Modernas | 74 | Medio-Alto | 04_Resultados |
| **Promedio** | — | **82** | Bueno | — |

---

## 6. Indicadores DevOps

| Indicador | % | Evidencia |
|-----------|---|-----------|
| Build | 80 | CI build frontend en `ci.yml` |
| Deploy | 90 | Railway API + Vercel SPA activos |
| Infraestructura | 75 | II/09; sin Docker/IaC Railway |
| Disponibilidad | 100 | JMeter 500/500; 0 % error |
| Integración | 65 | Sin MySQL ni Cypress en CI |
| Automatización | 72 | DevOps FURPS/08 |

---

## 7. Indicadores QA

| Indicador | Valor | Detalle |
|-----------|-------|---------|
| Hallazgos totales | 24 | 1C·6A·14M·3B (CON-001–024) |
| Riesgo global | Medio-Alto | FURPS/08 |
| Vulnerabilidades npm | 8+ | CVE documentados npm audit |
| Casos de prueba | 31 | 18 backend + 13 Cypress |
| Cobertura instrumentada | 0 % | SonarCloud sin lcov |
| Cobertura QA global | 75 % | FURPS QA |

---

## 8. Dashboard final (semáforo)

| Indicador | % | Estado | Semáforo |
|-----------|---|--------|----------|
| Calidad General | 77 | Bueno | 🟡 Amarillo |
| Calidad Arquitectónica | 88 | Bueno | 🟢 Verde |
| Calidad Funcional | 83 | Bueno | 🟡 Amarillo |
| Calidad Técnica | 82 | Bueno | 🟡 Amarillo |
| Seguridad | 76 | Bueno | 🟡 Amarillo |
| Documentación | 88 | Bueno | 🟢 Verde |
| Pruebas | 75 | Bueno | 🟡 Amarillo |
| DevOps | 72 | Regular-Bueno | 🟡 Amarillo |
| ICACIT | 82 | Bueno | 🟡 Amarillo |

*Umbral: Verde ≥ 85 % · Amarillo 70–84 % · Rojo < 70 %*

---

## 9. Interpretación de resultados

Las métricas confirman un perfil **asimétrico positivo**: arquitectura y documentación lideran (88 %), mientras DevOps (72 %), integración CI (65 %) y cobertura Sonar (0 %) arrastran el promedio. La calidad global FURPS (77 %) converge con ICACIT (82 %), indicando coherencia entre marcos. Performance (70 %) y OWASP A06 (55 %) son los indicadores FURPS/OWASP más bajos documentados.

---

## 10. Nivel alcanzado y estado general

| Concepto | Valor |
|----------|-------|
| Madurez software | Nivel 3 — Definido |
| Calidad global | 77 % (FURPS) / 82 % (ICACIT) |
| Preparación producción | 82 % |
| **Estado general métricas** | **Bueno — 2 Verde, 7 Amarillo, 0 Rojo** |

---

*Informe Métricas — Paso 05 ICACIT — CAFE-IA.*
