# 03 — Plan de Mejoras Arquitectónicas

**Proyecto:** CAFE-IA  
**Fecha:** 2026-06-24  
**Origen:** Detección Arquitectónica — Paso 5 Ingeniería Inversa

---

## Mejoras identificadas

| ID | Componente | Problema arquitectónico | Riesgo | Impacto | Prioridad | Recomendación | Responsable | Esfuerzo |
|----|------------|-------------------------|--------|---------|-----------|---------------|-------------|----------|
| **ARQ-01** | PredictionService | SQL inline en service; bypass repository | Medio | Violación hexagonal | **Alta** | Mover queries a PrediccionRepository | Backend Dev | 4–8 h |
| **ARQ-02** | Models | Sin capa Model/entidades tipadas | Bajo | Mantenibilidad tipos | **Media** | DTOs TypeScript o JSDoc typedefs | Arquitecto | 16–24 h |
| **ARQ-03** | Auth | Sin AuthController; routes invocan service | Bajo | Inconsistencia capa interfaces | **Baja** | Extraer AuthController | Backend Dev | 2 h |
| **ARQ-04** | LoteService | Orquesta 5 repos en create (alta coordinación) | Medio | Complejidad transaccional | **Media** | Unit of Work o transacción SQL explícita | Backend Dev | 8 h |
| **ARQ-05** | Fincas (BD) | Tabla en schema sin módulo arquitectónico | Medio | Modelo ≠ implementación | **Alta** | Agregar FincaRepository + routes + page | Full Stack | 16–24 h |
| **ARQ-06** | DI | Sin inyección dependencias; static everywhere | Bajo | Testabilidad limitada | **Baja** | Factory o contenedor ligero para tests | Arquitecto | 16 h |
| **ARQ-07** | PredictionService / PrediccionService | Nombres similares (ES/EN) | Bajo | Confusión mantenimiento | **Baja** | Unificar nomenclatura español | Backend Dev | 2 h |
| **ARQ-08** | BaseDatosController | Expuesto en app.js y routes (duplicidad rutas) | Bajo | Rutas duplicadas `/api/base-datos` | **Baja** | Centralizar solo en routes/index | Backend Dev | 1 h |
| **ARQ-09** | Frontend Pages | Lógica API mezclada en páginas grandes | Medio | Mantenibilidad UI | **Media** | Custom hooks por módulo (useProductores) | Frontend Dev | 12 h |
| **ARQ-10** | ml.service.js | Capa service FE con lógica mínima | Bajo | Capa innecesaria si solo wrap fetch | **Baja** | Consolidar en api client o mantener | Frontend Dev | 1 h |
| **ARQ-11** | Docker | Sin contenedorización | Medio | Reproducibilidad entornos | **Media** | docker-compose dev (API+MySQL+FE) | DevOps | 8–16 h |
| **ARQ-12** | OpenAPI | Sin contrato API formal | Medio | Integración externa | **Media** | Generar swagger desde routes | Backend Dev | 8 h |
| **ARQ-13** | Transacciones | Operaciones multi-tabla sin BEGIN/COMMIT explícito | Alto | Inconsistencia BD en fallo | **Alta** | Transacción en LoteService.create | Backend Dev | 4 h |
| **ARQ-14** | permisos (BD) | Tablas seeds sin capa aplicación | Bajo | Modelo RBAC incompleto | **Baja** | Implementar o eliminar tablas huérfanas | Arquitecto | 24+ h |
| **ARQ-15** | projectStructure.js | Documentación embebida desactualizada (7 controllers) | Bajo | Doc ≠ código (13 controllers) | **Baja** | Sincronizar árbol con código real | Documentación | 1 h |

---

## Componentes duplicados

| Componente | Hallazgo | Recomendación |
|------------|----------|---------------|
| Rutas `/api/base-datos` | Definidas en `app.js` y `base-datos.routes.js` | Unificar en router |
| Alias calidad | `/control-calidad` y `/evaluaciones` | Aceptable (compatibilidad) |
| PredictionService + PrediccionService | Capas distintas pero nombres confusos | Renombrar/documentar |

---

## Componentes innecesarios

| Componente | Evaluación |
|------------|------------|
| `render.yaml` | Referencia alternativa — no activo; mantener como doc o eliminar en futuro |
| Tablas `permisos`/`rol_permisos` sin uso API | Candidatas a eliminación o implementación |
| `ml.service.js` (FE) | Wrapper delgado — opcional |

---

## Componentes acoplados

| Componente | Acoplamiento | Detalle |
|------------|--------------|---------|
| PredictionService → pool | **Alto** | SQL directo |
| LoteService → 5 repositories | **Medio-alto** | Orquestación creación lote |
| Pages → client.js + lógica estado | **Medio** | Sin hooks de dominio |
| auditMiddleware → ActionLogService | **Medio** | Aceptable cross-cutting |

---

## Violaciones arquitectónicas

1. **SQL en capa application** (`PredictionService`) — debe estar en repository.
2. **Sin transacciones** en operaciones multi-insert (lote + trazabilidad + inventario).
3. **Entidades BD sin adaptador** (fincas, permisos granulares).
4. **Auth sin controller** — inconsistencia en capa interfaces.

---

## Oportunidades de refactorización

| Oportunidad | Beneficio | Esfuerzo |
|-------------|-----------|----------|
| Extraer hooks FE por módulo | Mantenibilidad, tests | Medio |
| Transacciones MySQL en services críticos | Integridad datos | Bajo |
| PrediccionRepository completo | Pureza hexagonal | Bajo |
| TypeScript gradual en backend | Tipado contratos | Alto |
| OpenAPI spec | Documentación viva | Medio |

---

## Roadmap sugerido

| Fase | Mejoras | Plazo |
|------|---------|-------|
| **Inmediato** | ARQ-01, ARQ-13, ARQ-15 | 1 semana |
| **Corto plazo** | ARQ-05, ARQ-09, ARQ-12 | 2–3 semanas |
| **Medio plazo** | ARQ-04, ARQ-11 | 1 mes |
| **Backlog** | ARQ-02, ARQ-06, ARQ-14 | Según prioridad |

---

*Documento para anexar al informe ICACIT. No implica modificación del código CAFE-IA en esta fase.*
