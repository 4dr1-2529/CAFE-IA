# 03 — Plan de Mejoras Arquitectónicas

**Proyecto:** CAFE-IA  
**Fecha:** 2026-06-24  
**Origen:** Evaluación Arquitectónica — Paso 6 Ingeniería Inversa

---

## Plan de mejoras

| ID | Atributo | Hallazgo | Problema | Riesgo | Impacto | Prioridad | Recomendación | Responsable | Esfuerzo |
|----|----------|----------|----------|--------|---------|-----------|---------------|-------------|----------|
| **EVAL-01** | Robustez | Creación lote sin transacción SQL | Inconsistencia BD en fallo parcial | Alto | Integridad datos | **Crítica** | BEGIN/COMMIT en LoteService.create | Backend Dev | 4 h |
| **EVAL-02** | Testabilidad | Cypress fuera de CI | Regresiones UI en merge | Alto | Calidad release | **Alta** | Job CI con stack dockerizado | DevOps + QA | 8–16 h |
| **EVAL-03** | Acoplamiento | SQL inline PredictionService | Violación hexagonal | Medio | Mantenibilidad IA | **Alta** | Extraer PrediccionRepository | Backend Dev | 4–8 h |
| **EVAL-04** | Rendimiento | JMeter solo /api/health | Desconocimiento perf real | Medio | SLA negocio | **Alta** | Escenarios login+lotes+dashboard | QA | 4–8 h |
| **EVAL-05** | Seguridad | CVE react-router-dom | Open redirect | Medio | Phishing | **Alta** | npm audit fix frontend | Frontend Dev | 1–2 h |
| **EVAL-06** | Observabilidad | Solo console.log + auditoría | Diagnóstico lento incidentes | Medio | MTTR | **Media** | Logs JSON estructurados; request-id | Backend Dev | 8 h |
| **EVAL-07** | Testabilidad | SKIP_INTEGRATION en CI | Regresiones API | Medio | Calidad | **Media** | MySQL service container CI | DevOps | 4–8 h |
| **EVAL-08** | Rendimiento | Bundle Recharts 411 KB | LCP dashboard lento | Bajo | UX | **Media** | Dynamic import charts | Frontend Dev | 2–4 h |
| **EVAL-09** | Escalabilidad | MySQL único sin cache | Cuello botella lecturas | Medio | Escala | **Media** | Cache dashboard metrics (futuro) | Arquitecto | 16 h |
| **EVAL-10** | Mantenibilidad | Sin OpenAPI | Contrato API informal | Medio | Integración | **Media** | Generar swagger desde routes | Backend Dev | 8 h |
| **EVAL-11** | Modularidad | Tablas fincas sin módulo | Modelo ≠ implementación | Medio | Deuda | **Media** | Módulo fincas o retirar tabla | Full Stack | 16–24 h |
| **EVAL-12** | Observabilidad | Sin APM/tracing | Ceguera performance prod | Medio | Ops | **Baja** | Railway metrics + alertas | DevOps | 4 h |
| **EVAL-13** | Testabilidad | Cobertura Sonar 0 % | Deuda invisible | Medio | Calidad | **Media** | c8 + lcov en CI | Backend Dev | 4 h |
| **EVAL-14** | Disponibilidad | Health superficial | Falsos positivos uptime | Bajo | Monitoreo | **Baja** | Health con ping MySQL ligero | Backend Dev | 2 h |
| **EVAL-15** | Flexibilidad | Sin Docker | Entornos no reproducibles | Medio | Onboarding | **Baja** | docker-compose dev | DevOps | 8 h |

---

## Mejoras de diseño

| ID | Mejora | Beneficio |
|----|--------|-----------|
| EVAL-03 | Repository completo para predicciones | Pureza hexagonal |
| EVAL-10 | OpenAPI spec | Contrato vivo documentado |
| EVAL-11 | Alinear BD con módulos API | Coherencia modelo |
| — | AuthController dedicado | Consistencia capa interfaces |
| — | DTOs tipados (JSDoc/TS) | Mantenibilidad |

---

## Mejoras de rendimiento

| ID | Mejora | Beneficio |
|----|--------|-----------|
| EVAL-04 | JMeter flujos autenticados | Baseline real |
| EVAL-08 | Lazy load Recharts | Menor LCP |
| EVAL-09 | Cache métricas dashboard | Menor carga MySQL |
| — | Índices revisados en queries reportes | Queries más rápidas |

---

## Mejoras de seguridad

| ID | Mejora | Beneficio |
|----|--------|-----------|
| EVAL-05 | Parche react-router | CVE cerrado |
| — | Reducir campos /api/health público | Menor reconocimiento |
| — | Rotación JWT_SECRET policy | Tokens comprometidos limitados |
| — | npm audit sin continue-on-error | CVE no llegan a prod |

---

## Mejoras de mantenibilidad

| ID | Mejora | Beneficio |
|----|--------|-----------|
| EVAL-10 | OpenAPI | Documentación sincronizada |
| EVAL-13 | Cobertura Sonar | Visibilidad deuda |
| — | Hooks FE por módulo (useProductores) | Pages más legibles |
| — | Sincronizar projectStructure.js | Doc = código |

---

## Mejoras de escalabilidad

| ID | Mejora | Beneficio |
|----|--------|-----------|
| EVAL-09 | Cache / read replica | Mayor throughput lectura |
| — | Pool tuning según carga Railway | Conexiones optimizadas |
| EVAL-15 | Docker para dev parity | Escalar equipo sin fricción |

---

## Roadmap sugerido

| Fase | Mejoras | Plazo |
|------|---------|-------|
| **Inmediato** | EVAL-01, EVAL-05 | 1 semana |
| **Corto plazo** | EVAL-02, EVAL-03, EVAL-04, EVAL-07 | 2–3 semanas |
| **Medio plazo** | EVAL-06, EVAL-08, EVAL-10, EVAL-13 | 1 mes |
| **Backlog** | EVAL-09, EVAL-11, EVAL-12, EVAL-15 | Según prioridad |

---

*Documento para anexar al informe ICACIT. No implica modificación del código CAFE-IA en esta fase.*
