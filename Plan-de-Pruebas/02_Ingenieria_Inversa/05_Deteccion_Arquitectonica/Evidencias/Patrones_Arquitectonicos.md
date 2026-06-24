# Patrones Arquitectónicos Detectados — CAFE-IA

**Fecha:** 2026-06-24

---

## 1. Arquitectura Hexagonal (Ports & Adapters)

| Atributo | Detalle |
|----------|---------|
| **Evidencia** | Carpetas `domain/`, `application/`, `infrastructure/`, `interfaces/http/` en `backend/src/` |
| **Estado** | **Implementado** |
| **Calidad** | **Buena (7.5/10)** — separación clara; excepción SQL en PredictionService |

**Adaptadores entrada:** Controllers + Routes (HTTP)  
**Casos de uso:** Services en `application/services/`  
**Adaptadores salida:** Repositories → mysql2  
**Dominio:** `PredictionEngine.js`

---

## 2. Arquitectura por Capas

| Capa | Componentes | Estado |
|------|-------------|--------|
| Presentación | Controllers, Routes | Implementado |
| Aplicación | Services, Validators | Implementado |
| Dominio | PredictionEngine | Parcial (1 módulo) |
| Infraestructura | Repositories, pool, migrate | Implementado |
| **Calidad** | **Buena** — flujo unidireccional predominante |

---

## 3. Arquitectura Cliente-Servidor

| Atributo | Detalle |
|----------|---------|
| **Evidencia** | SPA React (Vercel) ↔ REST API (Railway) |
| **Estado** | **Implementado** |
| **Calidad** | **Alta** — separación física y lógica clara |

---

## 4. Arquitectura Modular

| Módulo API | Controller | Service | Repository |
|------------|------------|---------|------------|
| Auth | — (routes) | AuthService | UsuarioRepository |
| Usuarios | UsuarioController | UsuarioService | UsuarioRepository |
| Productores | ProductorController | ProductorService | ProductorRepository |
| Lotes | LoteController | LoteService | LoteRepository |
| Producción | ProduccionController | ProduccionService | ProduccionRepository |
| Trazabilidad | TrazabilidadController | TrazabilidadService | TrazabilidadRepository |
| Calidad | CalidadController | CalidadService | CalidadRepository |
| IA | PrediccionController | PrediccionService | PrediccionRepository |
| Dashboard | DashboardController | DashboardService | DashboardRepository |
| Reportes | ReportesController | ReportesService | ReportesRepository |
| Chatbot | ChatbotController | ChatbotService | múltiples |
| Auditoría | AuditoriaController | AuditoriaService | AuditoriaRepository |
| Sistema | SystemController | BaseDatosService | pool |

**Estado:** Implementado — **13 módulos funcionales**  
**Calidad:** Alta cohesión por módulo de negocio

---

## 5. REST API

| Atributo | Detalle |
|----------|---------|
| **Evidencia** | 13 grupos rutas, verbos GET/POST/PUT/PATCH/DELETE, JSON |
| **Estado** | **Implementado** |
| **Calidad** | Buena — recursos nombrados, códigos HTTP, `{ ok, message }` |

---

## 6. Repository Pattern

| Atributo | Detalle |
|----------|---------|
| **Evidencia** | 11 clases `*Repository.js` en `infrastructure/repositories/` |
| **Estado** | **Implementado** |
| **Calidad** | Buena — SQL encapsulado; excepción PredictionService con SQL inline |

---

## 7. MVC (variante)

| Rol | Implementación backend | Implementación frontend |
|-----|------------------------|-------------------------|
| Model | Repositories + filas SQL (**no ORM**) | Estado en Context + API data |
| View | JSON responses | Pages + Components JSX |
| Controller | `*Controller.js` static methods | AppRoutes + Pages handlers |

**Estado:** Implementado como **MVC adaptado** sin capa Model explícita  
**Calidad:** Aceptable para proyecto mediano

---

## 8. Middleware Pattern

| Middleware | Función | Orden en pipeline |
|------------|---------|------------------|
| helmet | Seguridad headers | 1 |
| express-rate-limit | Rate limiting | 2 |
| cors | CORS | 3 |
| express.json | Body parser | 4 |
| auditMiddleware | Auditoría | Pre-router /api |
| auth.js | JWT | Por ruta |
| rbac.js | Roles | Por ruta |
| validate.js | DTO validation | Por ruta |

**Estado:** Implementado  
**Calidad:** Alta

---

## 9. Dependency Injection

| Atributo | Detalle |
|----------|---------|
| **Evidencia** | Imports estáticos ES modules; métodos `static` en clases |
| **Estado** | **No implementado** (sin contenedor IoC) |
| **Calidad** | N/A — acoplamiento compile-time aceptable para escala actual |

---

## 10. Otros patrones detectados

| Patrón | Evidencia | Calidad |
|--------|-----------|---------|
| **DTO / Validator** | `application/validators/*.validator.js` | Alta |
| **Guard (RBAC)** | `readGuard`, `writeGuard`, `adminGuard`, `AdminRoute` | Alta |
| **Error Handler centralizado** | `AppError` + middleware error en app.js | Alta |
| **Async Handler** | `asyncHandler.js` wrap controllers | Alta |
| **Lazy Loading** | `React.lazy()` en AppRoutes.jsx | Alta |
| **Context Provider** | AuthContext, ThemeContext, ToastContext | Alta |
| **Action Log / Audit** | ActionLogService + auditMiddleware | Alta |
| **Soft Delete** | `deleted_at` en SQL repositories | Media |
| **Scope Query** | `sqlScope.js`, `RoleHelper.scopeUserId` | Alta |
| **Factory (códigos)** | `CodeGenerator.js` — P001, LOT-xxx | Media |

---

## Resumen patrones

| Patrón | Estado | Calidad |
|--------|--------|---------|
| Hexagonal | Implementado | 7.5/10 |
| Capas | Implementado | 8/10 |
| Cliente-Servidor | Implementado | 9/10 |
| Modular | Implementado | 8.5/10 |
| REST | Implementado | 8/10 |
| Repository | Implementado | 7.5/10 |
| MVC adaptado | Implementado | 7/10 |
| Middleware | Implementado | 8.5/10 |
| Dependency Injection | No implementado | — |
| DTO/Validator | Implementado | 8/10 |

---

*Patrones identificados exclusivamente por estructura de carpetas e imports verificados.*
