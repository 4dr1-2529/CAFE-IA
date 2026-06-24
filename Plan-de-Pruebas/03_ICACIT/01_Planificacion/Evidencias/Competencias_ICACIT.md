# Competencias ICACIT — CAFE-IA

**Marco:** ICACIT 2025  
**Proyecto:** CAFE-IA  
**Fecha:** 24 de junio de 2026

---

## Competencias Transversales

### CT-01 — Conocimientos de Ingeniería

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Demostrar aplicación de fundamentos de ingeniería de software en el diseño, implementación y evaluación de CAFE-IA |
| **Descripción** | Verificar dominio de patrones arquitectónicos, modelado de datos, APIs REST, autenticación y pruebas sobre stack Node.js/React/MySQL |
| **Artefactos** | `backend/src/`, `frontend/src/`, `sql/schema.sql`, `docs/DOCUMENTACION_TECNICA.md` |
| **Evidencias** | `README.md`, `02_Ingenieria_Inversa/04`, `Reporte-Calidad-Software/03-04`, tests backend |
| **Criterios** | Arquitectura documentada, código organizado, BD normalizada (39 tablas, 43 FK) |
| **Indicadores** | Arquitectura 88 %, calidad técnica 75 % |
| **Nivel esperado** | Alto (≥ 80 %) |

### CT-02 — Medio Ambiente y Sostenibilidad

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Evidenciar contribución del sistema a la trazabilidad y producción de café sostenible |
| **Descripción** | El PMV gestiona productores, lotes, trazabilidad por etapas y control de calidad en cadena cafetalera |
| **Artefactos** | Módulos `/trazabilidad`, `/productores`, `/calidad`, `/registro` |
| **Evidencias** | Cypress PF-04/05, `02_Ingenieria_Inversa/08`, README «café sostenible» |
| **Criterios** | Trazabilidad operativa, registro de etapas, QR por lote |
| **Indicadores** | Functionality 83 %, módulos PMV completos |
| **Nivel esperado** | Alto (≥ 75 %) |

### CT-03 — Ingeniería y Sociedad

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Evaluar impacto del sistema en usuarios (administradores y clientes/productores) |
| **Descripción** | RBAC con roles diferenciados, chatbot de asistencia, reportes exportables, dashboard KPIs |
| **Artefactos** | `auth.js`, `rbac.js`, `chatbot`, `reportes`, `MATRIZ_PRUEBAS_HU.md` |
| **Evidencias** | Cypress PF-11 (RBAC), `03_Descubrimiento_Funcional/`, informe HU |
| **Criterios** | Acceso diferenciado, flujos UI verificados, historias de usuario trazadas |
| **Indicadores** | Usability 78 %, RBAC 3 niveles |
| **Nivel esperado** | Medio-Alto (≥ 75 %) |

### CT-04 — Gestión de Proyectos

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Documentar planificación, cronograma, entregables y trazabilidad del ciclo ICACIT |
| **Descripción** | Gestión de 8 fases ICACIT integrando 13 fases II + 8 fases FURPS/OWASP + Reporte Calidad |
| **Artefactos** | `03_ICACIT/`, `CHECKLIST_GLOBAL.md`, `CRONOGRAMA.md`, matrices Excel |
| **Evidencias** | Plan evaluación, trazabilidad, cronograma 8 semanas |
| **Criterios** | Plan completo, riesgos identificados, responsables definidos |
| **Indicadores** | Cobertura documental 88 %, 8 fases planificadas |
| **Nivel esperado** | Alto (≥ 85 %) |

---

## Competencias Específicas

### CE-01 — Diseño de Soluciones

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Validar diseño de solución: arquitectura hexagonal, API REST y modelo relacional |
| **Descripción** | Separación domain/application/infrastructure/interfaces; 13 grupos API; MySQL con integridad referencial |
| **Artefactos** | `backend/src/`, diagramas mermaid, `schema.sql` |
| **Evidencias** | `02_Ingenieria_Inversa/05-07/`, FURPS arquitectura 88 % |
| **Criterios** | Modularidad, separación capas, APIs coherentes con UI |
| **Indicadores** | Arquitectura 88 %, 13 APIs REST |
| **Nivel esperado** | Alto (≥ 85 %) |

### CE-02 — Análisis de Problemas

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Consolidar identificación y análisis de hallazgos, riesgos y deuda técnica |
| **Descripción** | 24 hallazgos únicos CON-001–024 (1C·6A·14M·3B), 0 % remediación, riesgo Medio-Alto |
| **Artefactos** | Matrices FURPS/OWASP, `11_Hallazgos/`, `07_Auditor_Final_Integral/` |
| **Evidencias** | `03_Mejoras.md` FURPS, `Matriz_Riesgos.md`, informe auditoría |
| **Criterios** | Hallazgos trazados, priorizados, con mitigación propuesta |
| **Indicadores** | 24 hallazgos documentados, plan CON P1–P4 |
| **Nivel esperado** | Alto (≥ 80 %) |

### CE-03 — Uso de Herramientas Modernas

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Evidenciar uso de herramientas modernas de desarrollo, prueba, análisis y despliegue |
| **Descripción** | SonarCloud, Cypress, JMeter, GitHub Actions, Railway, Vercel, npm audit |
| **Artefactos** | `testing/`, `.github/workflows/ci.yml`, `sonar-project.properties` |
| **Evidencias** | `Reporte-Calidad-Software/07-10`, last-run.json, jmeter_resumen.json |
| **Criterios** | Herramientas configuradas, resultados documentados, CI operativo |
| **Indicadores** | DevOps 72 %, QA 75 %, 13/13 Cypress, 500/500 JMeter |
| **Nivel esperado** | Medio-Alto (≥ 75 %) |

---

*Competencias ICACIT — 7 competencias — CAFE-IA.*
