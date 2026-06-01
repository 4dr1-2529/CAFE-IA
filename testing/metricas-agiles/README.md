# Métricas ágiles — Semana 10

**Proyecto:** CAFE-IA · Café Sostenible AI  
**Fuentes:** `docs/EDT_SCRUM_GANTT.md`, `frontend/src/pages/sistema/HistoriasUsuarioPage.jsx`, `docs/MATRIZ_PRUEBAS_HU.md`

## Definición de métricas

| Métrica | Descripción |
|---|---|
| Velocity | Story Points completados |
| Lead Time | Tiempo entrega |
| Cycle Time | Tiempo desarrollo |
| Burndown | Avance sprint |
| Historias completadas | Cumplimiento sprint |

## Datos ágiles versionados en el repositorio

No hay tablero Trello, CSV de sprints ni Story Points numéricos versionados en el repositorio. **No se reportan valores inventados** de Velocity, Lead Time, Cycle Time ni Burndown.

### Resumen de sprints (según `docs/EDT_SCRUM_GANTT.md`)

| Sprint | Objetivo documentado | Historias / alcance |
|--------|---------------------|---------------------|
| PMV1 | CRUD + trazabilidad + calidad + IA básica | HU01–HU06 |
| PMV2 | MySQL + JWT + reportes PDF/Excel | Migración BD, auth multiusuario |
| PMV3 | IA avanzada + dashboard + QR + dark mode | Riesgo %, métricas, QR real |

### Avance EDT (plan vs real)

| WBS | Entregable | % Plan | % Real (doc) |
|-----|------------|--------|--------------|
| 1 | Análisis y diseño | 15% | 100% |
| 2 | Base de datos | 20% | 100% |
| 3 | Backend API + JWT + IA v2 | 25% | 100% |
| 4 | Frontend React | 25% | 95% |
| 5 | QA y documentación | 10% | 85% |
| 6 | Deploy | 5% | 70% |

**Avance global estimado en docs:** ~92%.

### Historias PMV1 completadas (estado `Implementado` en código)

| ID | Título | Módulo | Sprint (HU page) |
|----|--------|--------|------------------|
| HU01 | Iniciar sesión con JWT | Login | Sprint 1 — Auth |
| HU02 | Gestionar usuarios del sistema | Usuarios | Sprint 2 — Multiusuario |
| HU03 | Registrar y gestionar productores | Productores | Sprint 1 — CRUD core |
| HU04 | Registrar producción y lotes | Registro Producción | Sprint 2 — Lotes |
| HU05 | Consultar trazabilidad de lotes | Trazabilidad | Sprint 2 — Trazabilidad |
| HU06 | Evaluar calidad del café | Control Calidad | Sprint 3 — Calidad |
| HU07 | Dashboard analítico por rol | Dashboard | Sprint 3 — Dashboard |
| HU08 | Generar reportes y exportaciones | Reportes | Sprint 4 — Reportes |
| HU09 | Consultar base de datos del sistema | Base de Datos | Sprint 4 — Transparencia datos |

**Total PMV1 implementadas:** 9 historias.

### Historias PMV2 completadas (estado `Implementado` en código)

| ID | Título | Módulo | Sprint (HU page) |
|----|--------|--------|------------------|
| HU10 | Predecir calidad con IA bajo demanda | Módulo IA | Sprint 5 — IA predictiva |
| HU11 | Consultar asistente Chatbot IA | Chatbot IA | Sprint 5 — Chatbot |
| HU12 | Auditar acciones del sistema | Auditoría | Sprint 6 — Auditoría |

**Total PMV2 implementadas:** 3 historias.

### Historias completadas (métrica cualitativa)

| Indicador | Valor verificado |
|-----------|------------------|
| Total HU en `HistoriasUsuarioPage.jsx` | 12 |
| Estado `Implementado` | 12 / 12 |
| PMV1 | 9 |
| PMV2 | 3 |

### Burndown / Velocity / Lead Time / Cycle Time

Sin datos cuantitativos en el repositorio. Evidencia cualitativa: commits en GitHub y checklist en `docs/EDT_SCRUM_GANTT.md` (Daily/Review vía commits).
