# 03 — Plan de Refactorización Arquitectónica

**Proyecto:** CAFE-IA  
**Fecha:** 2026-06-24  
**Origen:** Reconstrucción Arquitectónica — Paso 7

---

## Plan de refactorización

| ID | Componente | Hallazgo | Riesgo | Impacto | Prioridad | Recomendación | Responsable | Esfuerzo |
|----|------------|----------|--------|---------|-----------|---------------|-------------|----------|
| **REF-01** | LoteService | Multi-insert sin transacción | Alto | Integridad BD | **Crítica** | BEGIN/COMMIT MySQL | Backend Dev | 4 h |
| **REF-02** | PredictionService | SQL en capa application | Medio | Hexagonal | **Alta** | PrediccionRepository completo | Backend Dev | 8 h |
| **REF-03** | auth.routes | Sin AuthController | Bajo | Consistencia | **Media** | Extraer AuthController | Backend Dev | 2 h |
| **REF-04** | Pages FE | Lógica API en vistas | Medio | Mantenibilidad | **Media** | Hooks useModulo* | Frontend Dev | 12 h |
| **REF-05** | app.js | Rutas base-datos duplicadas | Bajo | Confusión | **Baja** | Unificar en router | Backend Dev | 1 h |
| **REF-06** | Nomenclatura IA | Prediction vs Prediccion | Bajo | Legibilidad | **Baja** | Unificar español | Backend Dev | 2 h |
| **REF-07** | schema.sql | Tablas fincas sin módulo | Medio | Modelo≠código | **Media** | Módulo fincas o deprecar | Full Stack | 16 h |
| **REF-08** | CI pipeline | Cypress ausente | Alto | Regresión | **Alta** | Job E2E en Actions | DevOps | 8–16 h |
| **REF-09** | Despliegue | Sin Docker | Medio | Reproducibilidad | **Media** | docker-compose dev | DevOps | 8 h |
| **REF-10** | API | Sin OpenAPI | Medio | Contrato | **Media** | swagger.json | Backend Dev | 8 h |
| **REF-11** | Observabilidad | Logs no estructurados | Medio | MTTR | **Media** | JSON logs + request-id | Backend Dev | 8 h |
| **REF-12** | Dashboard FE | Recharts bundle pesado | Bajo | LCP | **Baja** | React.lazy charts | Frontend Dev | 2 h |

---

## Refactorización

- REF-02: Completar repository pattern en módulo IA.
- REF-03: Alinear capa interfaces con patrón controller universal.
- REF-07: Alinear esquema BD con módulos API.

## Simplificación

- REF-05: Eliminar duplicidad rutas `/api/base-datos`.
- REF-06: Unificar nombres servicios IA.
- REF-04: Extraer lógica de pages a hooks.

## Desacoplamiento

- REF-02: Eliminar dependencia PredictionService → pool directo.
- REF-04: Desacoplar pages de detalles HTTP (hooks + services).

## Modularización

- REF-07: Módulo Fincas (route + service + repo + page).
- REF-10: Contrato API versionado por módulo.

## Escalabilidad

- REF-09: Contenedores para escalar entornos dev/QA.
- REF-11: Telemetría para identificar cuellos de botella Railway.
- Cache dashboard (futuro) — ver Paso 6 EVAL-09.

---

## Roadmap

| Fase | Refactorizaciones | Plazo |
|------|-------------------|-------|
| Inmediato | REF-01, REF-02 | 1 semana |
| Corto plazo | REF-04, REF-07, REF-08 | 2–3 semanas |
| Medio plazo | REF-09, REF-10, REF-11 | 1 mes |

---

*Plan para anexo ICACIT. No implica modificación de código en esta fase.*
