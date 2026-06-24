# Matriz de Atributos de Calidad — CAFE-IA

**Fecha:** 2026-06-24  
**Escala:** Excelente · Buena · Aceptable · Deficiente

| ID | Atributo | Valoración | Justificación (evidencia) |
|----|----------|------------|---------------------------|
| ATTR-01 | **Mantenibilidad** | **Buena** | Estructura hexagonal clara (93 BE + 60 FE); naming consistente; validators y shared utils. Penalización: pages grandes, nombres PredictionService/PrediccionService mixtos, doc embebida desactualizada. |
| ATTR-02 | **Escalabilidad** | **Aceptable** | API stateless en Railway permite réplicas horizontales. Limitación: MySQL único sin sharding/cache; sin cola de mensajes. Evidencia: despliegue PaaS sin orquestación K8s. |
| ATTR-03 | **Disponibilidad** | **Buena** | JMeter: 100 % éxito en 500 req `/api/health`; Railway prod operativo (Paso 1). Limitación: prueba solo health, no flujos críticos. |
| ATTR-04 | **Rendimiento** | **Aceptable** | JMeter P95 2614 ms (cerca límite 2 s); promedio 443 ms. Frontend: bundle Recharts ~411 KB. Sin CDN para API; pool MySQL max 10. |
| ATTR-05 | **Seguridad** | **Buena** | helmet + cors + express-rate-limit + JWT + bcrypt + RBAC scope user_id + auditMiddleware. CVE pendientes npm; health expone dbHost. |
| ATTR-06 | **Usabilidad** | **Buena** | 15 vistas operativas; design system ui/; tema claro/oscuro; ToastContext; lazy routes; Cypress 13/13 UX flows. Sin manual usuario formal. |
| ATTR-07 | **Reutilización** | **Buena** | 12 componentes ui reutilizables; RoleHelper, AppError, asyncHandler transversales; CatalogRepository compartido. |
| ATTR-08 | **Robustez** | **Buena** | AppError con códigos HTTP; migrate.js fail-fast arranque; ErrorBoundary React; validadores DTO. Gap: sin transacciones explícitas multi-insert lote. |
| ATTR-09 | **Testabilidad** | **Aceptable** | 18 tests backend node:test; 11 specs Cypress documentados; SonarCloud en CI. Gap: SKIP_INTEGRATION CI; Cypress fuera CI; sin DI/mocks formales. |
| ATTR-10 | **Modularidad** | **Buena** | 13 módulos API independientes; separación FE por pages/; monorepo npm. Tablas BD sin módulo (fincas) reduce modularidad datos. |

---

## Distribución de valoraciones

| Valoración | Cantidad | % |
|------------|----------|---|
| Excelente | 0 | 0 % |
| **Buena** | **6** | 60 % |
| **Aceptable** | **4** | 40 % |
| Deficiente | 0 | 0 % |

## Distribución de valoraciones

| Valoración | Cantidad | % |
|------------|----------|---|
| Excelente | 0 | 0 % |
| **Buena** | 7 | 70 % |
| **Aceptable** | 3 | 30 % |
| Deficiente | 0 | 0 % |

*(Buena: Mantenibilidad, Disponibilidad, Seguridad, Usabilidad, Reutilización, Robustez, Modularidad — Aceptable: Escalabilidad, Rendimiento, Testabilidad)*

**Calidad arquitectónica global: Buena (7.8 / 10)**

Ningún atributo en nivel Deficiente.

---

*Evidencias: Pasos 1–5 Ingeniería Inversa, jmeter_resumen.json, cypress_last-run.json, hallazgos_sonar.md, código fuente.*
