# Plan General de Evaluación ICACIT — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 1 — Planificación ICACIT  
**Fecha:** 24 de junio de 2026  
**Marco:** ICACIT 2025 · FURPS+ · OWASP Top 10 · Ingeniería Inversa

---

## 1. Objetivo

Definir el Plan General de Evaluación ICACIT del proyecto CAFE-IA, integrando los resultados documentados en Ingeniería Inversa (`02_Ingenieria_Inversa/`), FURPS+ y OWASP (`01_FURPS_OWASP/`), el Reporte de Calidad de Software (`Reporte-Calidad-Software/`) y el código fuente del monorepo `cafe-cursor/`, con el fin de dejar completamente planificada la evaluación de acreditación antes de iniciar la fase de ejecución (`02_Ejecucion/`).

---

## 2. Alcance

### 2.1 Componentes incluidos

| Área | Elementos documentados en CAFE-IA |
|------|-----------------------------------|
| **Frontend** | React 18 + Vite 5, 15 páginas lazy-loaded, Tailwind, Recharts, JWT en localStorage |
| **Backend** | Express 4, arquitectura hexagonal, 13 grupos API REST, JWT/bcrypt, Helmet, rate limiting |
| **Base de datos** | MySQL 8, 39 tablas, 43 FK, `schema.sql`, migraciones |
| **Arquitectura** | Hexagonal (domain → application → infrastructure → interfaces), 88 % evaluación FURPS+ |
| **Despliegue** | Railway (API + MySQL), Vercel (SPA), health HTTP 200 |
| **Calidad** | SonarCloud (`4dr1-2529_CAFE-IA`), GitHub Actions CI |
| **Pruebas** | 18 tests backend, 13/13 Cypress E2E, JMeter 500/500 health |
| **Documentación** | `Plan-de-Pruebas/` (>600 archivos), `Reporte-Calidad-Software/` (47 archivos), `docs/` |

### 2.2 Evaluaciones previas incorporadas

| Módulo | Fases | Resultado documentado |
|--------|-------|----------------------|
| Ingeniería Inversa | 13 pasos | Arquitectura, dominio, entorno, hallazgos reconstruidos |
| FURPS+ | Pasos 01–03 | Calidad 77 %, 18 hallazgos FUR |
| OWASP Top 10 | Pasos 04–08 | Seguridad 76 %, 24 hallazgos CON consolidados |
| Reporte Calidad | 13 capítulos | Cumplimiento 89.2 %, nivel global 7.5/10 |

### 2.3 Excluido de esta fase

- Ejecución de pruebas o auditorías (fases 02–07 ICACIT).
- Modificación del código fuente.
- Generación de nuevos hallazgos técnicos.

---

## 3. Metodología

La evaluación ICACIT seguirá un modelo **basado en evidencias** en ocho fases documentales:

| Fase ICACIT | Actividad | Base metodológica |
|-------------|-----------|-------------------|
| 01 Planificación | Definir competencias, cronograma, trazabilidad | Presente documento |
| 02 Ejecución | Registrar actividades y revisiones | Plan de revisión |
| 03 Evidencias | Consolidar artefactos | Inventarios II y FURPS |
| 04 Resultados | Documentar resultados por competencia | Métricas FURPS/OWASP |
| 05 Métricas | Calcular indicadores ICACIT | Dashboard Paso 07 FURPS |
| 06 Mejora Continua | Plan documental de mejoras | CON-001 a CON-024 |
| 07 Auditoría Final | Verificación integral | Consolidación cruzada |
| 08 Conclusión General | Autovaloración y cierre | Informe final |

**Fuentes de evidencia:** código en `cafe-cursor/`, documentación en `Plan-de-Pruebas/`, `Reporte-Calidad-Software/`, resultados Cypress (`last-run.json`), JMeter (`jmeter_resumen.json`), npm audit, SonarQube (`CORRECCIONES_SONARQUBE.md`), CI (`.github/workflows/ci.yml`).

---

## 4. Competencias ICACIT

### 4.1 Competencias Transversales

| ID | Competencia | Objetivo | Nivel esperado |
|----|-------------|----------|----------------|
| CT-01 | Conocimientos de Ingeniería | Verificar aplicación de fundamentos de ingeniería de software en diseño, implementación y evaluación del sistema | Alto (≥ 80 %) |
| CT-02 | Medio Ambiente y Sostenibilidad | Demostrar contribución del sistema a trazabilidad y café sostenible | Alto (≥ 75 %) |
| CT-03 | Ingeniería y Sociedad | Evaluar impacto en usuarios (productores, administradores) y cadena productiva | Medio-Alto (≥ 75 %) |
| CT-04 | Gestión de Proyectos | Documentar planificación, cronograma, entregables y trazabilidad ICACIT | Alto (≥ 85 %) |

### 4.2 Competencias Específicas

| ID | Competencia | Objetivo | Nivel esperado |
|----|-------------|----------|----------------|
| CE-01 | Diseño de Soluciones | Validar arquitectura hexagonal, API REST y modelo relacional | Alto (≥ 85 %) |
| CE-02 | Análisis de Problemas | Consolidar hallazgos, riesgos y deuda técnica documentada | Alto (≥ 80 %) |
| CE-03 | Uso de Herramientas Modernas | Evidenciar SonarQube, Cypress, JMeter, CI/CD, Railway, Vercel | Medio-Alto (≥ 75 %) |

Detalle completo en `Evidencias/Competencias_ICACIT.md` y `Evidencias/Matriz_Competencias.xlsx`.

---

## 5. Plan General

### 5.1 Plan de revisión

| # | Área | Documento base | Fase ICACIT |
|---|------|----------------|-------------|
| 1 | Código fuente | `cafe-cursor/backend/`, `frontend/` | 02 Ejecución |
| 2 | Arquitectura | `02_Ingenieria_Inversa/05-07/` | 03 Evidencias |
| 3 | FURPS+ | `01_FURPS_OWASP/02-03/` | 04 Resultados |
| 4 | OWASP | `01_FURPS_OWASP/05-07/` | 04 Resultados |
| 5 | Pruebas | `Reporte-Calidad-Software/08-10/` | 03 Evidencias |
| 6 | Informe Final | `Reporte-Calidad-Software/12-13/` | 07 Auditoría Final |

### 5.2 Recursos

| Recurso | Descripción |
|---------|-------------|
| Repositorio | `github.com/4dr1-2529/CAFE-IA` |
| Documentación | `Plan-de-Pruebas/`, `Reporte-Calidad-Software/` |
| Entorno producción | Railway API, Vercel frontend |
| Herramientas QA | Cypress 13.17, JMeter 5.6+, Node test runner |
| Análisis estático | SonarCloud, npm audit, ESLint |

### 5.3 Responsables

| Rol | Responsabilidad |
|-----|-----------------|
| Arquitecto de Software | Validación arquitectónica y trazabilidad |
| Ingeniero QA | Pruebas, evidencias y matrices |
| Evaluador ICACIT | Competencias, criterios y autovaloración |
| Auditor de Calidad | FURPS+, OWASP, informe final |

### 5.4 Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Evidencias SonarCloud no exportadas | Medio | Captura dashboard post-CI; `CORRECCIONES_SONARQUBE.md` |
| Cypress fuera de CI | Alto | Documentar `last-run.json`; plan integración en Mejora Continua |
| Colección Postman ausente | Medio | Inventario API derivado de rutas (`09_Pruebas_Postman.md`) |
| Duplicidad documental | Bajo | Índice maestro `INDICE_EVIDENCIAS.md` por fase |
| 0 % remediación hallazgos | Medio | Plan CON-001–024 en fase Mejora Continua |

---

## 6. Cronograma

| Semana | Fase ICACIT | Entregable principal |
|--------|-------------|---------------------|
| S1 | 01 Planificación | Plan evaluación, competencias, cronograma |
| S2 | 02 Ejecución | Registro actividades y revisiones |
| S3 | 03 Evidencias | Inventario consolidado |
| S4 | 04 Resultados | Resultados por competencia |
| S5 | 05 Métricas | Indicadores ICACIT calculados |
| S6 | 06 Mejora Continua | Plan mejoras documentales |
| S7 | 07 Auditoría Final | Auditoría integral |
| S8 | 08 Conclusión General | Autovaloración y cierre |

Detalle en `Evidencias/Cronograma.md`.

---

## 7. Herramientas

| Herramienta | Versión / Config | Uso en evaluación ICACIT |
|-------------|------------------|--------------------------|
| SonarCloud | `4dr1-2529_CAFE-IA` | Análisis estático, quality gate |
| Cypress | 13.17.0 | E2E — 11 specs, 13/13 OK |
| JMeter | `prueba_500_requests.jmx` | Carga health — 500/500 |
| Postman | Inventario derivado | API REST — sin colección en repo |
| GitHub Actions | `ci.yml` | CI: tests, build, Sonar, audit |
| Railway | API + MySQL | Despliegue producción |
| Vercel | SPA React | Frontend producción |
| Node test + supertest | Node 20+ | 18 tests backend |

---

## 8. Entradas

| Entrada | Ubicación |
|---------|-----------|
| Código fuente CAFE-IA | `cafe-cursor/` |
| Ingeniería Inversa (13 fases) | `Plan-de-Pruebas/02_Ingenieria_Inversa/` |
| FURPS+ y OWASP (8 fases) | `Plan-de-Pruebas/01_FURPS_OWASP/` |
| Reporte de Calidad | `Reporte-Calidad-Software/` |
| README y docs técnicos | `README.md`, `docs/` |
| Evidencias operativas | Cypress, JMeter, npm audit, health Railway |

---

## 9. Salidas

| Salida | Fase | Destino |
|--------|------|---------|
| Plan de evaluación ICACIT | 01 | `Evidencias/Plan_Evaluacion.md` |
| Matriz competencias | 01 | `Evidencias/Matriz_Competencias.xlsx` |
| Matriz trazabilidad | 01–07 | `Evidencias/Matriz_Trazabilidad.xlsx` |
| Resultados por competencia | 04 | `04_Resultados/` |
| Indicadores ICACIT | 05 | `05_Metricas/` |
| Autovaloración | 08 | `08_Conclusion_General/AUTOEVALUACION.md` |
| Informe final anexo | 08 | Incorporación académica |

---

## 10. Artefactos

| Artefacto | Tipo | Relación ICACIT |
|-----------|------|-----------------|
| `schema.sql` | BD | CE-01 Diseño |
| Diagramas mermaid | Arquitectura | CE-01, CT-01 |
| `last-run.json` (Cypress) | Prueba | CE-03, CT-03 |
| `jmeter_resumen.json` | Rendimiento | CE-03 |
| `CORRECCIONES_SONARQUBE.md` | Calidad | CE-02, CE-03 |
| Matrices FURPS/OWASP Excel | Evaluación | CE-02, CT-04 |
| 24 hallazgos CON-* | Auditoría | CE-02 |

---

## 11. Resultados esperados

| Indicador | Valor base documentado | Meta ICACIT |
|-----------|------------------------|-------------|
| Calidad general (FURPS+) | 77 % | ≥ 85 % post-mejora |
| Seguridad (OWASP) | 76 % | ≥ 85 % |
| Arquitectura | 88 % | Mantener ≥ 85 % |
| Cumplimiento ICACIT | 78 % | ≥ 85 % |
| Cobertura documental | 88 % | ≥ 90 % |
| Preparación producción | 82 % | ≥ 85 % |
| Hallazgos Crítico/Alto | 7 abiertos | 0 en cierre |
| Madurez | Nivel 3 — Definido | Nivel 4 — Gestionado |

---

*Plan General de Evaluación ICACIT — Paso 01 — CAFE-IA.*
