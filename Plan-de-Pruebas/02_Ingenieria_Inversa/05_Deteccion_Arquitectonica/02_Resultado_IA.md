# 02 — Resultado IA: Detección Arquitectónica

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Fecha:** 2026-06-24  
**Metodología:** Ingeniería inversa sobre estructura de carpetas, imports ES modules, rutas API, routing SPA y schema MySQL

---

## 1. Arquitectura general

### 1.1 Tipo de arquitectura implementada

CAFE-IA implementa una **arquitectura hexagonal (ports & adapters)** en el backend, con frontend **SPA React** desacoplado, comunicación **REST JSON** y persistencia **MySQL relacional**. El despliegue sigue modelo **Cliente-Servidor distribuido**: cliente en Vercel, servidor en Railway.

| Estilo | Estado | Evidencia |
|--------|--------|-----------|
| Hexagonal | **Implementado** | `domain/`, `application/`, `infrastructure/`, `interfaces/` |
| Por capas | **Implementado** | Controller → Service → Repository → SQL |
| Cliente-Servidor | **Implementado** | Vercel ↔ Railway HTTPS |
| Modular | **Implementado** | 13 módulos API independientes |
| REST | **Implementado** | `/api/{recurso}` verbos HTTP estándar |

### 1.2 Arquitectura Hexagonal

| Puerto / Adaptador | Implementación | Cohesión | Acoplamiento |
|--------------------|----------------|----------|--------------|
| **Entrada HTTP** | Controllers + Routes | Alta | Bajo hacia services |
| **Casos de uso** | Services (`application/`) | Alta | Medio hacia repos |
| **Dominio** | `PredictionEngine.js` | Alta | Bajo (sin I/O) |
| **Salida BD** | Repositories + pool | Alta | Medio hacia mysql2 |
| **Salida reportes** | ReportExportService (pdfkit, exceljs) | Alta | Medio |

**Estado:** Implementado con calidad **7.5/10**. Excepción: `PredictionService` accede a `pool` directamente.

### 1.3 Arquitectura por capas

```
┌─────────────────────────────────────────┐
│  INTERFACES (HTTP)                       │
│  Routes → Middleware → Controllers       │
├─────────────────────────────────────────┤
│  APPLICATION                             │
│  Services · Validators · ActionLog       │
├─────────────────────────────────────────┤
│  DOMAIN                                  │
│  PredictionEngine.js                     │
├─────────────────────────────────────────┤
│  INFRASTRUCTURE                          │
│  Repositories · pool · migrate           │
├─────────────────────────────────────────┤
│  SHARED / CONFIG                         │
│  RoleHelper · AppError · env.js          │
└─────────────────────────────────────────┘
```

### 1.4 Arquitectura Cliente-Servidor

| Cliente | Servidor | Contrato |
|---------|----------|----------|
| React SPA (Vercel) | Express API (Railway) | OpenAPI informal — JSON + JWT |
| `client.js` fetch | 13 routers `/api` | Content-Type application/json |
| localStorage token | `auth.js` middleware | Bearer Authorization |

### 1.5 Arquitectura Modular y REST

Cada módulo de negocio agrupa route file + controller + service + repository. Ejemplo **Lotes:**

`lotes.routes.js` → `LoteController` → `LoteService` → `LoteRepository` → tabla `lotes`

**REST:** GET list/detail, POST create; PUT/DELETE lotes **no implementados** (brecha arquitectónica menor).

---

## 2. Componentes Backend

### 2.1 Controllers (13) — **Implementado**

| Función | Responsabilidad | Dependencias | Acoplamiento | Cohesión |
|---------|-----------------|--------------|--------------|----------|
| Adaptar HTTP ↔ aplicación | Parsear req, invocar service, responder JSON | Service estático correspondiente | **Bajo** | **Alta** |

Patrón: clases con métodos `static async`. Sin lógica de negocio en controller.

**AuthController:** **No existe** — `auth.routes.js` invoca `AuthService` directamente.

### 2.2 Services (17) — **Implementado**

| Función | Responsabilidad | Dependencias | Acoplamiento | Cohesión |
|---------|-----------------|--------------|--------------|----------|
| Casos de uso / orquestación | Reglas negocio, RBAC, validación | Repositories, validators, RoleHelper | **Medio** | **Alta** |

Servicios clave: `LoteService` (orquesta 5 repos al crear lote), `PrediccionService` (fachada sobre `PredictionService`), `AuthService` (JWT + bcrypt).

### 2.3 Repositories (11) — **Implementado**

| Función | Responsabilidad | Dependencias | Acoplamiento | Cohesión |
|---------|-----------------|--------------|--------------|----------|
| Persistencia SQL | CRUD por agregado, scope user_id | pool.js, sqlScope | **Medio** | **Alta** |

### 2.4 Routes (14) — **Implementado**

Montaje central en `routes/index.js`. Alias: `/control-calidad` y `/evaluaciones` → mismo router calidad.

### 2.5 Middleware (4) — **Implementado**

| Middleware | Función | Acoplamiento |
|------------|---------|--------------|
| auth.js | JWT | Bajo |
| rbac.js | Roles admin/cliente | Bajo |
| auditMiddleware.js | Trazabilidad acciones | Medio |
| validate.js | DTO entrada | Bajo |

Pipeline global en `app.js`: helmet → rate-limit → cors → json.

### 2.6 Models — **No implementado**

No existe carpeta `models/` ni ORM (Prisma, Sequelize). Las entidades son **filas SQL** como objetos planos JavaScript.

### 2.7 SQL — **Implementado**

| Artefacto | Función |
|-----------|---------|
| `schema.sql` | 39 tablas, FK, índices |
| `seeds.sql` | Catálogos iniciales |
| `migrate.js` | Aplicación DDL al arranque |
| `views.sql` | Vistas analíticas |
| Repositories | Queries parametrizadas |

### 2.8 Configuración — **Implementado**

`env.js` — validación JWT_SECRET, MYSQL*, CORS. `database.js` — log Railway.

### 2.9 Utilidades (shared, 13) — **Implementado**

`AppError`, `asyncHandler`, `RoleHelper`, `CodeGenerator`, helpers SQL — cohesión alta, reutilización transversal.

---

## 3. Componentes Frontend

### 3.1 Pages (15) — **Implementado**

| Page | Función | Dependencias | Acoplamiento |
|------|---------|--------------|--------------|
| Vistas por módulo negocio | UI + llamadas API | client.js, components | Medio |

Lazy loading vía `React.lazy()` en `AppRoutes.jsx`.

### 3.2 Components (17) — **Implementado**

| Grupo | Cantidad | Responsabilidad |
|-------|----------|-----------------|
| ui/ | 12 | Design system (Button, Card, DataTable…) |
| features/ | 2 | TrazabilidadTimeline, LoteQrPanel |
| common/ | 2 | ErrorBoundary, PageLoader |
| auth/ | 1 | AdminRoute guard |

**Cohesión:** Alta en `ui/`; **acoplamiento:** bajo (presentacionales).

### 3.3 Layouts (1) — **Implementado**

`MainLayout.jsx` — navegación PMV1/PMV2/Sistema, logout, tema.

### 3.4 Hooks (2) — **Implementado**

`useAuth`, `useToast` — encapsulan context.

### 3.5 Context (3) — **Implementado**

AuthContext (sesión), ThemeContext (dark mode), ToastContext (notificaciones).

### 3.6 Services (3) — **Implementado**

`client.js` (fetch HTTP), `auth.service.js`, `ml.service.js`.

### 3.7 Assets — **Implementado**

`index.css` (Tailwind), `@fontsource/inter`. Sin carpeta `assets/` de imágenes estáticas significativa.

### 3.8 Routing — **Implementado**

`AppRoutes.jsx` — rutas protegidas, AdminRoute, fallback `*`.

---

## 4. Base de Datos

### 4.1 Modelo relacional — **Implementado**

MySQL InnoDB utf8mb4, **39 tablas** en módulos: geografía, seguridad, productores, fincas, lotes, trazabilidad, calidad, IA, inventario, auditoría, configuración.

### 4.2 Relaciones — **Implementado**

Jerarquía geográfica (regiones→provincias→distritos), usuarios→roles, lotes→productores, trazabilidad→lotes, evaluaciones→lotes, predicciones→lotes.

### 4.3 Integridad referencial — **Implementado**

FK con `ON DELETE CASCADE` en pivotes (`rol_permisos`, `sesiones`). UNIQUE en emails y códigos. Soft delete `deleted_at`.

---

## 5. Integraciones

### 5.1 Frontend ↔ Backend

| Aspecto | Implementación | Estado |
|---------|----------------|--------|
| Protocolo | HTTPS REST JSON | Implementado |
| Auth | JWT Bearer en fetch | Implementado |
| CORS | Vercel origins + `*.vercel.app` | Implementado |
| Error handling | ApiError + toast | Implementado |

### 5.2 Backend ↔ MySQL

Pool mysql2, SSL Railway, migrate al arranque. **Acoplamiento:** medio (correcto para hexagonal).

### 5.3 Backend ↔ IA

`PrediccionService` → `PredictionService` → `PredictionEngine` → persistencia `predicciones_ia`. ML Python **no integrado**.

### 5.4 Backend ↔ Railway

`server.js` escucha `0.0.0.0`, variables MYSQL*, logs `[Railway]`.

### 5.5 Frontend ↔ Vercel

Build Vite → `dist/`, SPA rewrites, `VITE_API_URL` en build env.

---

## 6. Arquitectura reconstruida

### 6.1 Arquitectura lógica

```
Usuario → Pages → Services(fetch) → API REST → Services → Repositories → MySQL
                                      ↓
                              PredictionEngine (dominio)
```

### 6.2 Arquitectura física

| Nodo | Tecnología | Ubicación |
|------|------------|-----------|
| Cliente web | Navegador | Global |
| CDN/Hosting FE | Vercel | Cloud |
| API Server | Node.js Express | Railway |
| BD | MySQL 8 | Railway managed |

### 6.3 Arquitectura de despliegue

```
GitHub → CI (test+build+sonar) → Vercel (auto deploy FE)
                               → Railway (API + MySQL)
```

### 6.4 Flujo entre capas (ejemplo crear lote)

1. `RegistroProduccionPage` POST body
2. `client.js` → `/api/lotes` + JWT
3. `lotes.routes` → `writeGuard` → `LoteController.create`
4. `LoteService.create` → validators → repos (lote, trazabilidad×5, inventario)
5. `LoteRepository.insert` → MySQL
6. `ActionLogService` → auditoría
7. Response 201 JSON

### 6.5 Flujo de datos RBAC

`JWT.rol` + `JWT.sub` → `RoleHelper` → filtros SQL `user_id` en repositories (cliente) o sin filtro (admin).

---

## 7. Matriz resumen estados

| Componente solicitado | Estado |
|----------------------|--------|
| Hexagonal, Capas, Cliente-Servidor, Modular, REST | Implementado |
| Controllers, Services, Repositories, Routes, Middleware | Implementado |
| Models ORM | **No implementado** |
| SQL, Config, Utilidades | Implementado |
| Pages, Components, Layouts, Hooks, Context, Services, Routing | Implementado |
| Assets (imágenes) | Mínimo (CSS/fonts) |
| MySQL 39 tablas + FK | Implementado |
| Integraciones cloud | Implementado |

---

## 8. Conclusión del análisis arquitectónico

CAFE-IA presenta una **arquitectura hexagonal bien estructurada** para un PMV universitario/profesional, con separación clara de responsabilidades, modularización por dominio cafetalero y despliegue cloud verificable. Las principales desviaciones son la **ausencia de capa Model**, **SQL inline en PredictionService** y **módulos BD no expuestos** (fincas).

Detalle de mejoras en `03_Mejoras.md`. Inventario en `Evidencias/Inventario_Componentes.md`.

---

*Documento ICACIT — Ingeniería Inversa Paso 5. Basado exclusivamente en código y estructura del repositorio CAFE-IA.*
