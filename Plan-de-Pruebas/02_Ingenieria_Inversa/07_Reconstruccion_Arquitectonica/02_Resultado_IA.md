# 02 — Resultado IA: Reconstrucción Arquitectónica

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Fecha:** 2026-06-24  
**Metodología:** Ingeniería inversa — Pasos 1–6 + análisis código, configs y diagramas Mermaid reconstruidos

---

## 1. Arquitectura general reconstruida

### 1.1 Arquitectura identificada

| Dimensión | Descripción |
|-----------|-------------|
| **Lógica** | Hexagonal (ports & adapters) con 5 capas |
| **Física** | Cliente navegador + Vercel CDN + Railway compute + Railway MySQL |
| **Despliegue** | CI GitHub → deploy automático Vercel/Railway |
| **Comunicación** | REST HTTPS JSON stateless + JWT |

### 1.2 Patrón arquitectónico

**Principal:** Arquitectura Hexagonal  
**Secundarios:** Capas, Cliente-Servidor, REST, Repository, Middleware

### 1.3 Diagramas reconstruidos

Ver `Evidencias/Diagrama_*.md` y `.mmd` (7 diagramas).

---

## 2. Backend — reconstrucción

### 2.1 Controllers (13) — Implementado

| Responsabilidad | Comunicación | Dependencias | Estado |
|-----------------|--------------|--------------|--------|
| Adaptar HTTP a casos de uso | req/res JSON | Service estático | Implementado |

Lista: Dashboard, Productor, Lote, Usuario, Produccion, Trazabilidad, Calidad, Prediccion, Reportes, Chatbot, Auditoria, BaseDatos, System.

**AuthController:** No implementado.

### 2.2 Routes (14) — Implementado

Montaje `routes/index.js` → `/api/*`. Flujo: Route → Middleware → Controller.

### 2.3 Services (17) — Implementado

Reglas de negocio, RBAC, orquestación. Comunicación síncrona con repositories.

### 2.4 Middleware (4) — Implementado

auth (JWT), rbac (guards), auditMiddleware, validate. Pipeline global: helmet → rate-limit → cors → json.

### 2.5 Repositories (11) — Implementado

SQL parametrizado vía pool.js. Scope `user_id` para rol cliente.

### 2.6 Config — Implementado

`env.js`, `database.js` — variables MYSQL*, JWT, CORS.

### 2.7 Utilidades (shared, 13) — Implementado

AppError, asyncHandler, RoleHelper, CodeGenerator, sqlScope, etc.

### 2.8 Seguridad — Implementado

JWT + refresh en sesiones, bcrypt, helmet, cors, rate-limit, RBAC, auditoría.

### 2.9 API REST — Implementado

13 módulos, verbos GET/POST/PUT/PATCH/DELETE, respuestas `{ ok, ... }`.

---

## 3. Frontend — reconstrucción

### 3.1 Pages (15) — Implementado

Comunicación: `client.js` fetch → `/api`. Estado local + Context.

### 3.2 Components (17) — Implementado

ui/ (12), features/ (2), common/ (2), auth/AdminRoute (1).

### 3.3 Layouts (1) — Implementado

MainLayout — navegación PMV1/PMV2/Sistema.

### 3.4 Context (3) — Implementado

AuthContext, ThemeContext, ToastContext.

### 3.5 Hooks (2) — Implementado

useAuth, useToast.

### 3.6 Services (3) — Implementado

client.js, auth.service.js, ml.service.js.

### 3.7 Routing — Implementado

AppRoutes.jsx — lazy loading, ProtectedShell, AdminRoute.

### 3.8 Assets — Implementado

index.css (Tailwind), @fontsource/inter. Sin carpeta assets/ de imágenes significativa.

---

## 4. Base de datos — reconstrucción

### 4.1 Modelo relacional — Implementado

MySQL InnoDB utf8mb4, 39 tablas en módulos: geografía, seguridad, productores, lotes, trazabilidad, calidad, IA, inventario, auditoría.

### 4.2 Relaciones — Implementado

FK: usuarios→roles, lotes→productores, trazabilidad→lotes, evaluaciones→lotes, predicciones→lotes.

### 4.3 Integridad — Implementado

UNIQUE, índices, ON DELETE CASCADE en pivotes, soft delete `deleted_at`.

### 4.4 Flujo persistencia — Implementado

```
Service → Repository → pool.execute/query → MySQL
Arranque: migrate.js → schema.sql + seeds
```

---

## 5. Integraciones reconstruidas

### 5.1 React → Express

| Atributo | Detalle |
|----------|---------|
| Protocolo | HTTPS REST JSON |
| Auth | Bearer JWT en header |
| Cliente | fetch nativo `client.js` |
| CORS | Vercel origins permitidos |
| Estado | **Implementado** |

### 5.2 Express → MySQL

| Atributo | Detalle |
|----------|---------|
| Driver | mysql2/promise pool |
| SSL | MYSQL_SSL en Railway |
| Estado | **Implementado** |

### 5.3 Backend → IA

| Atributo | Detalle |
|----------|---------|
| Motor prod | PredictionEngine.js (in-process) |
| API | POST /api/predicciones/ejecutar |
| ML Python | **No integrado** en API |
| Estado | **Implementado** (heurístico) |

### 5.4 Backend → Railway

server.js, variables MYSQL*, migrate al arranque, health 200.

### 5.5 Frontend → Vercel

vercel.json, build Vite → dist/, VITE_API_URL.

---

## 6. Flujo de información (síntesis)

```
Usuario → Browser → Vercel SPA → fetch+JWT → Railway Express
    → Middleware → Controller → Service → Repository → MySQL
    → JSON Response → React state → UI
```

Dominio IA: Service → PredictionEngine (sin I/O) → resultado → persistencia.

---

## 7. Matriz estado implementación

| Área | Implementado | No implementado |
|------|--------------|-----------------|
| Backend capas | 13 controllers, 17 services, 11 repos | AuthController, Models |
| Frontend | 15 pages, routing, context | — |
| BD | 39 tablas, migrate | — |
| IA | PredictionEngine, Chatbot | ML Python API |
| Infra | Vercel, Railway, CI | Docker |

---

## 8. Conclusión reconstrucción

La arquitectura reconstruida **coincide con la implementación real** verificada en código fuente, configuraciones de despliegue y pruebas de calidad. Documentación detallada en `Evidencias/`. Mejoras en `03_Mejoras.md`.

---

*Documento ICACIT — Paso 7. Representación fiel del sistema CAFE-IA.*
