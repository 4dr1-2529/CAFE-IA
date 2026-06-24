# 02 — Resultado IA: Evaluación Arquitectónica

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Fecha:** 2026-06-24  
**Metodología:** Evaluación basada en Pasos 1–5 de Ingeniería Inversa, código fuente, pruebas JMeter/Cypress/Sonar y despliegue Railway/Vercel

---

## 1. Resumen de evaluación

| Dimensión | Resultado |
|-----------|-----------|
| Atributos arquitectónicos evaluados | 26 |
| Nivel cumplimiento Alto | 18 (69 %) |
| Nivel cumplimiento Medio | 8 (31 %) |
| Calidad global | **Buena — 7.8 / 10** |
| Checklist 40 criterios | 24 Cumple · 8 Parcial · 8 No cumple |

---

## 2. Calidad arquitectónica — atributos

### 2.1 Modularidad

| Campo | Detalle |
|-------|---------|
| **Descripción** | Grado en que el sistema se divide en módulos independientes con responsabilidades acotadas |
| **Evidencia** | 13 módulos API (auth, usuarios, productores, lotes, producción, trazabilidad, calidad, predicciones, dashboard, reportes, chatbot, auditoría, sistema); carpetas hexagonales BE; pages FE por dominio |
| **Cumplimiento** | **Alto (88 %)** |
| **Riesgos** | Tablas BD (fincas, permisos) sin módulo aplicación |
| **Impacto** | Bajo en operación actual |
| **Observaciones** | Modularidad funcional sólida para PMV1/PMV2 |

### 2.2 Cohesión

| Campo | Detalle |
|-------|---------|
| **Descripción** | Grado en que elementos de un módulo pertenecen funcionalmente juntos |
| **Evidencia** | LoteService + LoteRepository + LoteController; design system `components/ui/`; validators por agregado |
| **Cumplimiento** | **Alto (90 %)** |
| **Riesgos** | LoteService orquesta 5 repos (cohesión de proceso, no de entidad) |
| **Impacto** | Bajo |
| **Observaciones** | Cohesión alta por módulo de negocio |

### 2.3 Acoplamiento

| Campo | Detalle |
|-------|---------|
| **Descripción** | Grado de interdependencia entre módulos |
| **Evidencia** | Imports unidireccionales capas hexagonal; excepción `PredictionService` → `pool.js` directo |
| **Cumplimiento** | **Medio (78 %)** |
| **Riesgos** | SQL en capa application; pages FE acopladas a client.js |
| **Impacto** | Medio en mantenimiento IA |
| **Observaciones** | Sin ciclos de dependencia detectados |

### 2.4 Escalabilidad

| Campo | Detalle |
|-------|---------|
| **Descripción** | Capacidad de crecer en carga y volumen sin rediseño |
| **Evidencia** | API stateless Express en Railway; rate-limit; pool MySQL max 10 |
| **Cumplimiento** | **Medio (75 %)** |
| **Riesgos** | MySQL único; sin cache Redis; sin colas |
| **Impacto** | Medio en picos de concurrencia |
| **Observaciones** | Escalado horizontal API viable; BD es cuello de botella potencial |

### 2.5 Mantenibilidad

| Campo | Detalle |
|-------|---------|
| **Descripción** | Facilidad de comprender, modificar y corregir el sistema |
| **Evidencia** | 93 archivos BE estructurados; naming consistente; SonarCloud CI; README y docs |
| **Cumplimiento** | **Alto (82 %)** |
| **Riesgos** | projectStructure.js desactualizado; pages FE extensas |
| **Impacto** | Bajo |
| **Observaciones** | Mantenibilidad buena para equipo pequeño |

### 2.6 Reutilización

| Campo | Detalle |
|-------|---------|
| **Descripción** | Uso de componentes en múltiples contextos |
| **Evidencia** | 12 ui components; RoleHelper, AppError, asyncHandler; CatalogRepository |
| **Cumplimiento** | **Alto (85 %)** |
| **Riesgos** | Lógica duplicada en pages vs hooks ausentes |
| **Impacto** | Bajo |
| **Observaciones** | Design system FE bien reutilizado |

### 2.7 Flexibilidad

| Campo | Detalle |
|-------|---------|
| **Descripción** | Facilidad para adaptar el sistema a nuevos requisitos |
| **Evidencia** | Hexagonal permite nuevos adaptadores; routes modulares; validators extensibles |
| **Cumplimiento** | **Alto (80 %)** |
| **Riesgos** | Sin contrato OpenAPI formal |
| **Impacto** | Bajo |
| **Observaciones** | Añadir módulo = route + controller + service + repo (patrón claro) |

### 2.8 Disponibilidad

| Campo | Detalle |
|-------|---------|
| **Descripción** | Tiempo que el sistema permanece operativo |
| **Evidencia** | JMeter 500 req health: 100 % éxito; Railway prod HTTP 200 (Paso 1) |
| **Cumplimiento** | **Medio (78 %)** |
| **Riesgos** | Sin HA multi-región; migrate.js falla detiene arranque |
| **Impacto** | Medio |
| **Observaciones** | Disponibilidad verificada en endpoint health, no en flujos negocio |

### 2.9 Seguridad

| Campo | Detalle |
|-------|---------|
| **Descripción** | Protección contra amenazas y acceso no autorizado |
| **Evidencia** | helmet, cors, rate-limit, JWT, bcrypt, RBAC, auditMiddleware, CORS Vercel |
| **Cumplimiento** | **Alto (85 %)** |
| **Riesgos** | CVE react-router; health expone dbHost; permisos granulares ausentes |
| **Impacto** | Medio |
| **Observaciones** | Postura de seguridad sólida para PMV |

### 2.10 Rendimiento

| Campo | Detalle |
|-------|---------|
| **Descripción** | Tiempo de respuesta y throughput bajo carga |
| **Evidencia** | JMeter: avg 443 ms, P95 2614 ms, 6320 RPM health; Recharts bundle 411 KB |
| **Cumplimiento** | **Medio (72 %)** |
| **Riesgos** | P95 cerca límite 2 s; sin pruebas endpoints autenticados |
| **Impacto** | Medio en UX dashboard |
| **Observaciones** | Rendimiento aceptable; margen de mejora en FE y escenarios reales |

### 2.11 Robustez

| Campo | Detalle |
|-------|---------|
| **Descripción** | Capacidad de manejar errores y condiciones adversas |
| **Evidencia** | AppError; migrate fail-fast; ErrorBoundary; validadores; express error handler |
| **Cumplimiento** | **Alto (80 %)** |
| **Riesgos** | Creación lote multi-tabla sin transacción |
| **Impacto** | Alto en integridad si fallo parcial |
| **Observaciones** | Manejo de errores HTTP bien implementado |

### 2.12 Extensibilidad

| Campo | Detalle |
|-------|---------|
| **Descripción** | Facilidad para añadir funcionalidad sin modificar núcleo |
| **Evidencia** | Montaje routers en index.js; alias calidad; chatbot intents modulares |
| **Cumplimiento** | **Alto (83 %)** |
| **Riesgos** | — |
| **Impacto** | Bajo |
| **Observaciones** | PMV2 añadió IA/chatbot/auditoría sin reescritura |

### 2.13 Testabilidad

| Campo | Detalle |
|-------|---------|
| **Descripción** | Facilidad para probar componentes de forma aislada |
| **Evidencia** | node:test 18/18; Cypress 13/13; supertest; sin DI |
| **Cumplimiento** | **Medio (74 %)** |
| **Riesgos** | SKIP_INTEGRATION CI; Cypress manual; static deps |
| **Impacto** | Medio en regresiones |
| **Observaciones** | Tests existen pero pipeline incompleto |

### 2.14 Observabilidad

| Campo | Detalle |
|-------|---------|
| **Descripción** | Capacidad de inspeccionar comportamiento en runtime |
| **Evidencia** | auditMiddleware; console.log Railway; tabla auditoria_logs; sin APM/tracing |
| **Cumplimiento** | **Medio (68 %)** |
| **Riesgos** | Diagnóstico producción limitado |
| **Impacto** | Medio en incidentes |
| **Observaciones** | Auditoría funcional; falta telemetría moderna |

---

## 3. Evaluación organizacional

### 3.1 Organización Backend — **Alto (88 %)**

Capas hexagonales verificadas: `interfaces/http`, `application`, `domain`, `infrastructure`, `shared`, `config`. 13 controllers, 17 services, 11 repositories. **Observación:** Auth sin controller dedicado.

### 3.2 Organización Frontend — **Alto (85 %)**

Estructura `pages/`, `components/ui|features|common|auth`, `context/`, `services/`, `routes/`. Lazy loading. **Observación:** lógica API en pages; hooks de dominio ausentes.

### 3.3 Organización Base de Datos — **Alto (86 %)**

39 tablas, FK, índices, seeds, migrate, views analíticas. **Observación:** desalineación fincas/permisos.

### 3.4 Arquitectura Hexagonal — **Alto (82 %)**

Separación ports/adapters implementada. Dominio IA aislado. **Excepción:** SQL en PredictionService.

### 3.5 Arquitectura REST — **Alto (87 %)**

Recursos JSON, verbos HTTP, códigos status, prefijo `/api`. Alias `/evaluaciones` → calidad.

### 3.6 Organización carpetas — **Alto (90 %)**

Monorepo `backend/`, `frontend/`, `testing/`, `docs/`, `ml/`.

### 3.7 Separación responsabilidades — **Alto (85 %)**

Controller sin lógica negocio; validators separados; middleware transversal. Excepciones documentadas.

### 3.8 Flujo dependencias — **Alto (83 %)**

Unidireccional hacia infraestructura. Sin ciclos. RoleHelper transversal aceptable.

### 3.9 Gestión configuración — **Alto (84 %)**

`env.js` centralizado; `.env.example`; Vercel build env; Railway panel. JWT_SECRET validado ≥32 chars.

### 3.10 Integración IA — **Medio (76 %)**

`PredictionEngine` en dominio; API `/predicciones/ejecutar`; ML Python **no integrado**.

### 3.11 Integración Railway — **Alto (88 %)**

`server.js` 0.0.0.0; MYSQL*; migrate arranque; health operativo.

### 3.12 Integración Vercel — **Alto (90 %)**

`vercel.json`; `VITE_API_URL`; SPA rewrites; cache control index.

---

## 4. Matriz de atributos de calidad (resumen)

| Atributo | Valoración |
|----------|------------|
| Mantenibilidad | Buena |
| Escalabilidad | Aceptable |
| Disponibilidad | Buena |
| Rendimiento | Aceptable |
| Seguridad | Buena |
| Usabilidad | Buena |
| Reutilización | Buena |
| Robustez | Buena |
| Testabilidad | Aceptable |
| Modularidad | Buena |

---

## 5. Conclusión de evaluación

La arquitectura de CAFE-IA **cumple en nivel Alto o Bueno** la mayoría de atributos evaluados, sin ningún atributo **Deficiente**. Las áreas de mejora se concentran en **observabilidad, testabilidad en CI, rendimiento bajo escenarios reales y pureza hexagonal en el módulo IA**.

Plan de acción en `03_Mejoras.md`. Matrices completas en `Evidencias/`.

---

*Documento ICACIT — Ingeniería Inversa Paso 6. Evaluación basada en arquitectura real implementada.*
