# Métricas ágiles — CAFE-IA

**Proyecto:** Café Sostenible AI · Semana 10  
**Última actualización:** 2026-05-31  
**Alcance:** PMV1 (HU01–HU09) · PMV2 (HU10–HU12)

---

## 1. Definición

| Métrica | Descripción |
|---|---|
| Velocity | Story Points completados por sprint |
| Lead Time | Tiempo desde que la historia entra al backlog hasta su entrega |
| Cycle Time | Tiempo activo de desarrollo de una historia |
| Burndown | Trabajo pendiente vs. tiempo dentro del sprint |
| Historias completadas | Historias de usuario entregadas respecto al plan del sprint |

---

## 2. Resultados reales

| Métrica | Resultado |
|---|---|
| Velocity | **No disponible** — no hay Story Points numéricos en el repositorio ni exportación de Trello |
| Lead Time | **No disponible** — no hay fechas de creación/cierre por HU en Product Backlog o Sprint Backlog versionados |
| Cycle Time | **No disponible** — no hay timestamps individuales por historia (solo estado `Implementado` en código) |
| Burndown | **Parcial (cualitativo)** — avance EDT documentado **~92 %** global; ver tabla de avance por WBS abajo |
| Historias completadas | **12 / 12 (100 %)** — PMV1: **9 / 9** · PMV2: **3 / 3** |

### Avance por WBS (proxy de burndown — `docs/EDT_SCRUM_GANTT.md`)

| WBS | Entregable | % Plan | % Real |
|-----|------------|--------|--------|
| 1 | Análisis y diseño | 15 % | 100 % |
| 2 | Base de datos | 20 % | 100 % |
| 3 | Backend API + JWT + IA v2 | 25 % | 100 % |
| 4 | Frontend React | 25 % | 95 % |
| 5 | QA y documentación | 10 % | 85 % |
| 6 | Deploy | 5 % | 70 % |

### Historias PMV1 completadas (`HistoriasUsuarioPage.jsx`)

| ID | Título | Sprint (código) | Estado |
|----|--------|-----------------|--------|
| HU01 | Iniciar sesión con JWT | Sprint 1 — Auth | Implementado |
| HU02 | Gestionar usuarios del sistema | Sprint 2 — Multiusuario | Implementado |
| HU03 | Registrar y gestionar productores | Sprint 1 — CRUD core | Implementado |
| HU04 | Registrar producción y lotes | Sprint 2 — Lotes | Implementado |
| HU05 | Consultar trazabilidad de lotes | Sprint 2 — Trazabilidad | Implementado |
| HU06 | Evaluar calidad del café | Sprint 3 — Calidad | Implementado |
| HU07 | Dashboard analítico por rol | Sprint 3 — Dashboard | Implementado |
| HU08 | Generar reportes y exportaciones | Sprint 4 — Reportes | Implementado |
| HU09 | Consultar base de datos del sistema | Sprint 4 — Transparencia datos | Implementado |

### Historias PMV2 completadas (`HistoriasUsuarioPage.jsx`)

| ID | Título | Sprint (código) | Estado |
|----|--------|-----------------|--------|
| HU10 | Predecir calidad con IA bajo demanda | Sprint 5 — IA predictiva | Implementado |
| HU11 | Consultar asistente Chatbot IA | Sprint 5 — Chatbot | Implementado |
| HU12 | Auditar acciones del sistema | Sprint 6 — Auditoría | Implementado |

### Contexto temporal del repositorio (git — no sustituye Lead/Cycle Time)

| Indicador | Valor | Fuente |
|-----------|-------|--------|
| Primer commit | 2026-04-29 | `git log --reverse` |
| Último commit | 2026-05-31 | `git log -1` |
| Total commits | 33 | Historial git |
| Commits con señal explícita HU11/HU12 | 2026-05-29 / 2026-05-31 | Mensajes chatbot, auditoría |

---

## 3. Interpretación

- **Historias completadas** es la única métrica ágil **100 % verificable** en el proyecto: las 12 HU definidas en `frontend/src/pages/sistema/HistoriasUsuarioPage.jsx` están en estado `Implementado`, con trazabilidad a endpoints, vistas y pruebas (Cypress PF-01…PF-11, `backend/tests/`).
- **Velocity, Lead Time y Cycle Time** no pueden calcularse sin Story Points ni fechas por historia. No se encontró exportación Trello, CSV de sprint ni Product Backlog con fechas en `docs/`, `testing/` ni raíz del repo.
- **Burndown** solo puede reportarse de forma **cualitativa** mediante el EDT (`docs/EDT_SCRUM_GANTT.md`): el trabajo planificado avanza ~92 %; los entregables de BD y backend están al 100 %; deploy al 70 %.
- Los sprints documentados (PMV1 → HU01–HU06, PMV2 → auth/MySQL/reportes, PMV3 → IA avanzada) describen **objetivos**, no burndown numérico por sprint.

---

## Archivos utilizados

| Archivo | Uso |
|---------|-----|
| `frontend/src/pages/sistema/HistoriasUsuarioPage.jsx` | Estados HU, PMV, sprints |
| `docs/EDT_SCRUM_GANTT.md` | EDT, objetivos PMV, avance WBS |
| `docs/MATRIZ_PRUEBAS_HU.md` | Matriz de pruebas por HU |
| Historial git (`33` commits, abr–may 2026) | Contexto temporal; sin SP |
| Búsqueda `trello` en repo | **Sin resultados** — no hay exportación Trello |

## Resumen

| Tipo | Detalle |
|------|---------|
| **Calculadas** | Historias completadas 12/12; avance EDT ~92 %; PMV1 9/9; PMV2 3/3 |
| **No disponibles** | Velocity, Lead Time, Cycle Time (falta backlog con SP y fechas) |
| **Parcial** | Burndown (solo % WBS documentado, no gráfica por sprint) |
