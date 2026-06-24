# Matriz de Dependencias entre Componentes — CAFE-IA

**Fecha:** 2026-06-24

---

## Flujo principal (capas hexagonal)

```
[Frontend Page] → [client.js fetch] → [Route] → [Middleware] → [Controller] → [Service] → [Repository] → [MySQL pool]
                                                      ↓
                                              [Domain: PredictionEngine]
```

**Regla de dependencia verificada:** Las capas internas no importan interfaces HTTP. Los controllers importan services; services importan repositories y domain; repositories importan pool.

**Excepción detectada:** `PredictionService` importa `pool.js` directamente (SQL en service) — violación parcial del repository pattern.

---

## Dependencias Frontend → Backend

| Origen | Destino | Protocolo | Dependencia |
|--------|---------|-----------|-------------|
| Pages (×15) | client.js | import | Acoplamiento medio |
| client.js | Railway API `/api/*` | HTTPS JSON + JWT | Acoplamiento bajo |
| AuthContext | auth.service.js | import | Acoplamiento bajo |
| auth.service.js | POST /api/auth/login | REST | Acoplamiento bajo |
| ml.service.js | POST /api/predicciones/ejecutar | REST | Acoplamiento bajo |
| AppRoutes | AuthContext, AdminRoute | React context | Acoplamiento medio |
| MainLayout | constants/routes.js | import | Acoplamiento bajo |

---

## Dependencias Backend internas

| Componente | Depende de | Tipo |
|------------|------------|------|
| Controllers (×13) | Services correspondientes | Unidireccional |
| Services (×17) | Repositories, validators, RoleHelper | Unidireccional |
| LoteService | 5 repositories + ActionLogService | Medio acoplamiento |
| PrediccionService | PredictionService + PrediccionRepository | Orquestación |
| PredictionService | PredictionEngine + **pool directo** | Acoplamiento alto |
| Repositories (×11) | pool.js, sqlScope | Unidireccional |
| auth.routes | AuthService (sin controller) | Variante |
| auditMiddleware | ActionLogService → AuditoriaRepository | Cadena |
| rbac.js | RoleHelper | Bajo |

---

## Dependencias Backend → MySQL

| Componente | Dependencia |
|------------|-------------|
| pool.js | mysql2, env (MYSQL*) |
| migrate.js | schema.sql, seeds |
| Repositories | Queries parametrizadas vía pool |
| PredictionService | Queries inline (excepción) |
| BaseDatosService | Introspección tablas |

---

## Dependencias Backend → IA

| Componente | Dependencia |
|------------|-------------|
| PrediccionController | PrediccionService |
| PrediccionService | PredictionService |
| PredictionService | PredictionEngine.js (domain) |
| PredictionEngine | Sin dependencias externas (puro JS) |
| ChatbotService | ChatbotDataService → repositories |
| ML Python | **Sin dependencia** — no integrado en API |

---

## Dependencias Infraestructura

| Componente | Dependencia |
|------------|-------------|
| server.js | migrate.js → schema en Railway MySQL |
| Vercel build | VITE_API_URL → Railway endpoint |
| vercel.json | Rewrites SPA → index.html |
| CI backend | Tests sin MySQL real (SKIP_INTEGRATION) |

---

## Grafo módulos API (routes/index.js)

```
/api
├── /auth          → auth.routes
├── /usuarios      → usuarios.routes
├── /dashboard     → dashboard.routes + DashboardController
├── /productores   → productores.routes
├── /lotes         → lotes.routes
├── /produccion    → produccion.routes
├── /trazabilidad  → trazabilidad.routes
├── /control-calidad, /evaluaciones → calidad.routes
├── /predicciones  → predicciones.routes
├── /reportes      → reportes.routes
├── /chatbot       → chatbot.routes
├── /auditoria     → auditoria.routes
├── /base-datos    → base-datos.routes
└── /admin         → system.routes
```

---

## Componentes sin dependientes (hojas)

- PredictionEngine.js (invocado solo por PredictionService)
- AppError, CodeGenerator
- components/ui/* (presentacionales)

---

## Ciclos de dependencia detectados

**Ningún ciclo circular** entre capas principales verificado.

**Acoplamiento cruzado menor:** ReportesService ↔ ReportExportService ↔ ReportesRepository (cohesión funcional aceptable).

---

*Matriz derivada de imports estáticos ES modules en `backend/src/` y `frontend/src/`.*
