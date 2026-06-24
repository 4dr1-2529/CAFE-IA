# Inventario de Componentes — CAFE-IA

**Fecha:** 2026-06-24

---

## Backend — Interfaces HTTP

| Componente | Cantidad | Ubicación |
|------------|----------|-----------|
| Controllers | **13** | `interfaces/http/controllers/` |
| Routes | **14** | `interfaces/http/routes/` |
| Middleware | **4** | `interfaces/http/middleware/` |

**Controllers:** Dashboard, Chatbot, Productor, Lote, Usuario, BaseDatos, Reportes, Prediccion, Calidad, Trazabilidad, Produccion, Auditoria, System.

**Routes:** auth, usuarios, dashboard, productores, lotes, produccion, trazabilidad, calidad, predicciones, reportes, chatbot, auditoria, base-datos, system.

**Middleware:** auth.js, rbac.js, auditMiddleware.js, validate.js.

**AuthController:** **No existe** — lógica en `auth.routes.js` + `AuthService`.

---

## Backend — Application

| Componente | Cantidad | Ubicación |
|------------|----------|-----------|
| Services | **17** | `application/services/` |
| Validators | **7** | `application/validators/` |

**Services principales:** Auth, Usuario, Productor, Lote, Produccion, Trazabilidad, Calidad, Prediccion, Prediction, Dashboard, Reportes, ReportExport, BaseDatos, Auditoria, ActionLog, Chatbot, ChatbotData (+ chatbotIntentHandlers, chatbotIntentScoring).

---

## Backend — Infrastructure

| Componente | Cantidad | Ubicación |
|------------|----------|-----------|
| Repositories | **11** | `infrastructure/repositories/` |
| Database scripts | **6+** | `infrastructure/database/`, `backend/sql/` |

**Repositories:** Dashboard, Auditoria, Usuario, Reportes, Trazabilidad, Productor, Lote, Prediccion, Calidad, Produccion, Catalog.

---

## Backend — Domain

| Componente | Cantidad | Ubicación |
|------------|----------|-----------|
| Domain logic | **1** | `domain/PredictionEngine.js` |

**Models (capa dominio):** **No implementado** — sin entidades ORM; datos como objetos planos desde SQL.

---

## Backend — Shared / Config

| Componente | Cantidad | Ubicación |
|------------|----------|-----------|
| Utilidades shared | **13** | `shared/` |
| Config | **2** | `config/env.js`, `config/database.js` |

**Shared:** AppError, asyncHandler, RoleHelper, apiResponse, CodeGenerator, sqlScope, scopedQuery, inputValidation, jsonSafe, reportesSql, trazabilidadSql, reportesResponse, sqlIdentifier.

---

## Frontend

| Componente | Cantidad | Ubicación |
|------------|----------|-----------|
| Pages | **15** | `pages/` |
| Layouts | **1** | `layouts/MainLayout.jsx` |
| Components UI | **12** | `components/ui/` |
| Components features | **2** | `components/features/` |
| Components common | **2** | `components/common/` |
| Components auth | **1** | `components/auth/AdminRoute.jsx` |
| Hooks | **2** | `hooks/useAuth.js`, `useToast.js` |
| Context | **3** | Auth, Theme, Toast |
| Services | **3** | `services/api/client.js`, auth.service.js, ml.service.js |
| Utils | **6** | `utils/` |
| Constants | **4** | `constants/` |
| Config | **1** | `config/api.js` |
| Routing | **1** | `routes/AppRoutes.jsx` |
| Assets CSS | **1** | `index.css` (+ @fontsource en npm) |

**Pages:** Login, Dashboard, Productores, RegistroProduccion, Trazabilidad, ControlCalidad, ModuloIA, ChatbotIA, Reportes, BaseDatos, Usuarios, Auditoria, EvidenciasPMV, Arquitectura, HistoriasUsuario.

---

## Base de Datos

| Componente | Detalle |
|------------|---------|
| Motor | MySQL 8 InnoDB |
| Tablas | **39** (`schema.sql`) |
| Vistas | `views.sql` (analíticas dashboard) |
| Seeds | `seeds.sql`, scripts PMV2 |
| FK | regiones→provincias→distritos, usuarios→roles, lotes→productores, etc. |
| Soft delete | `deleted_at` en entidades operativas |

---

## Infraestructura / Despliegue

| Componente | Estado |
|------------|--------|
| Railway (API + MySQL) | Implementado |
| Vercel (SPA) | Implementado |
| GitHub Actions CI | Implementado |
| render.yaml | Referencia alternativa |
| Docker | **No implementado** |

---

## Totales

| Área | Componentes inventariados |
|------|---------------------------|
| Backend (archivos src) | **93** archivos .js |
| Frontend (archivos src) | **60** archivos .jsx/.js/.css |
| Base de datos | **39** tablas + scripts |
| Infraestructura | **3** activos + 1 ref |
| **Total matriz arquitectónica** | **51** componentes clave (COM-001–COM-051) |

---

*Detalle de acoplamiento y riesgo en `Matriz_Componentes.md`.*
