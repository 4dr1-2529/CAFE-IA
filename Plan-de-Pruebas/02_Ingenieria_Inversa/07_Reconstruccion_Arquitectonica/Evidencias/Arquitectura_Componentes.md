# Arquitectura de Componentes — CAFE-IA

**Fecha:** 2026-06-24

---

## Backend — 93 archivos `src/`

### Controllers (13) — Adaptadores HTTP

| Componente | Responsabilidad | Comunica con |
|------------|-----------------|--------------|
| DashboardController | KPIs panel | DashboardService |
| ProductorController | CRUD productores | ProductorService |
| LoteController | Alta/consulta lotes | LoteService |
| UsuarioController | CRUD usuarios admin | UsuarioService |
| ProduccionController | Registro producción | ProduccionService |
| TrazabilidadController | Etapas lote | TrazabilidadService |
| CalidadController | Evaluaciones sensoriales | CalidadService |
| PrediccionController | Ejecutar predicción IA | PrediccionService |
| ReportesController | Informes + export | ReportesService |
| ChatbotController | Asistente conversacional | ChatbotService |
| AuditoriaController | Logs auditoría | AuditoriaService |
| BaseDatosController | Vista tablas BD | BaseDatosService |
| SystemController | Admin sistema | — |

**AuthController:** No implementado.

### Services (17) — Casos de uso

AuthService, UsuarioService, ProductorService, LoteService, ProduccionService, TrazabilidadService, CalidadService, PrediccionService, PredictionService, DashboardService, ReportesService, ReportExportService, BaseDatosService, AuditoriaService, ActionLogService, ChatbotService, ChatbotDataService (+ intent handlers).

### Repositories (11) — Persistencia SQL

Dashboard, Auditoria, Usuario, Reportes, Trazabilidad, Productor, Lote, Prediccion, Calidad, Produccion, Catalog.

### Routes (14) + Middleware (4)

Montaje en `routes/index.js`. Middleware: auth, rbac, audit, validate.

---

## Frontend — 60 archivos `src/`

| Tipo | Cantidad | Ejemplos |
|------|----------|----------|
| Pages | 15 | DashboardPage, ProductoresPage, ModuloIAPage… |
| Layouts | 1 | MainLayout |
| Components UI | 12 | Button, Card, DataTable, KpiCard… |
| Features | 2 | TrazabilidadTimeline, LoteQrPanel |
| Context | 3 | Auth, Theme, Toast |
| Hooks | 2 | useAuth, useToast |
| Services | 3 | client.js, auth.service, ml.service |
| Routing | 1 | AppRoutes.jsx |

---

## Dominio

| Componente | Responsabilidad |
|------------|-----------------|
| PredictionEngine.js | Heurística calidad/riesgo v2 — sin I/O |

---

## Base de datos

| Componente | Responsabilidad |
|------------|---------------|
| schema.sql | 39 tablas DDL |
| migrate.js | Aplicar schema + seeds al arranque |
| pool.js | Pool conexiones mysql2 |

---

## Diagrama

Ver `Diagrama_Componentes.md`, `Diagrama_Comunicacion_Modulos.md`.

---

*Inventario completo en `Inventario_Componentes.md`.*
