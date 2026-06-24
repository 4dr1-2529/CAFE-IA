# Plan de Evaluación ICACIT — CAFE-IA

**Versión:** 1.0  
**Fecha:** 24 de junio de 2026  
**Proyecto:** CAFE-IA (Café Sostenible AI)

---

## 1. Propósito

Establecer el plan formal de evaluación ICACIT del proyecto CAFE-IA, definiendo alcance, competencias, recursos, cronograma y criterios de aceptación para las ocho fases del módulo `03_ICACIT/`.

## 2. Alcance de evaluación

| Componente | Ubicación | Estado documentado |
|------------|-----------|-------------------|
| Frontend React 18 | `cafe-cursor/frontend/` | 15 páginas, 13/13 Cypress |
| Backend Express | `cafe-cursor/backend/` | Hexagonal, 18 tests |
| MySQL 8 | `backend/sql/schema.sql` | 39 tablas, 43 FK |
| Despliegue | Railway + Vercel | HTTP 200, health OK |
| CI/CD | `.github/workflows/ci.yml` | Tests, build, Sonar, audit |
| Documentación | `Plan-de-Pruebas/` | >600 archivos |

## 3. Competencias a evaluar

- **Transversales (4):** CT-01 a CT-04
- **Específicas (3):** CE-01 a CE-03

Detalle en `Competencias_ICACIT.md`.

## 4. Criterios de evaluación global

| Criterio | Umbral mínimo | Fuente base |
|----------|---------------|-------------|
| Calidad FURPS+ | ≥ 77 % (meta ≥ 85 %) | `01_FURPS_OWASP/08/` |
| Seguridad OWASP | ≥ 76 % (meta ≥ 85 %) | `01_FURPS_OWASP/08/` |
| Arquitectura | ≥ 88 % | FURPS + II |
| Cumplimiento ICACIT | ≥ 78 % (meta ≥ 85 %) | Consolidado |
| Trazabilidad | 100 % competencias mapeadas | Matriz trazabilidad |

## 5. Plan de revisión por área

| Área | Actividad | Herramienta | Evidencia esperada |
|------|-----------|-------------|-------------------|
| Código | Revisión estática | SonarCloud, lectura | Reporte Sonar |
| Funcional | Verificación módulos PMV | Cypress, docs | last-run.json |
| Seguridad | Controles OWASP | Auditoría FURPS/OWASP | Matriz A01–A10 |
| Rendimiento | Health check | JMeter | jmeter_resumen.json |
| Arquitectura | Hexagonal | II pasos 05–07 | Diagramas mermaid |
| DevOps | CI/CD, despliegue | ci.yml, Railway | health response |

## 6. Entregables por fase

| Fase | Entregables |
|------|-------------|
| 01 | Plan, competencias, cronograma, matrices |
| 02 | Registro ejecución |
| 03 | Inventario evidencias |
| 04 | Resultados por competencia |
| 05 | Indicadores y dashboard |
| 06 | Plan mejora continua |
| 07 | Auditoría final |
| 08 | Conclusión y autovaloración |

## 7. Aprobación

| Rol | Estado | Fecha |
|-----|--------|-------|
| Evaluador ICACIT | Planificado | 24/06/2026 |
| Arquitecto Software | Planificado | 24/06/2026 |
| Ingeniero QA | Planificado | 24/06/2026 |

---

*Plan de Evaluación ICACIT v1.0 — CAFE-IA.*
