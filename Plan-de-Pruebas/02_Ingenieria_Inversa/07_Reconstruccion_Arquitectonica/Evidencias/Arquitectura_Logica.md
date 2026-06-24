# Arquitectura Lógica — CAFE-IA

**Fecha:** 2026-06-24  
**Tipo:** Arquitectura hexagonal + cliente-servidor + REST

---

## 1. Identificación

| Atributo | Valor |
|----------|-------|
| Patrón principal | **Arquitectura Hexagonal (Ports & Adapters)** |
| Patrón secundario | Capas, MVC adaptado (FE), Repository, REST |
| Estilo comunicación | Síncrono request/response HTTPS JSON |
| Estado | Implementado y desplegado |

---

## 2. Vista lógica por capas

```
┌─────────────────────────────────────────────────────────┐
│  PRESENTACIÓN (Adaptador entrada — HTTP)                 │
│  Routes → Middleware → Controllers (13)                  │
├─────────────────────────────────────────────────────────┤
│  APLICACIÓN (Casos de uso)                               │
│  Services (17) · Validators (7) · ActionLogService       │
├─────────────────────────────────────────────────────────┤
│  DOMINIO                                                 │
│  PredictionEngine.js (heurística IA v2)                  │
├─────────────────────────────────────────────────────────┤
│  INFRAESTRUCTURA (Adaptadores salida)                    │
│  Repositories (11) → pool.js → MySQL                     │
│  ReportExportService → pdfkit / exceljs                  │
├─────────────────────────────────────────────────────────┤
│  TRANSVERSAL                                             │
│  RoleHelper · AppError · env.js · auditMiddleware        │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Vista lógica frontend

```
App.jsx
 └── AppRoutes.jsx (lazy routes)
      ├── LoginPage
      ├── ProtectedShell → MainLayout
      │    ├── Pages (15 módulos negocio)
      │    └── AdminRoute (usuarios, auditoría, sistema)
      └── Context: Auth · Theme · Toast
           └── Services: client.js (fetch) → API Railway
```

---

## 4. Módulos lógicos de negocio (13)

Auth, Usuarios, Dashboard, Productores, Lotes, Producción, Trazabilidad, Calidad, Predicciones IA, Reportes, Chatbot, Auditoría, Base de datos/Admin.

---

## 5. Diagrama lógico general

Ver `Diagrama_General.md` / `Diagrama_Capas.md`.

---

## 6. Componentes no implementados (lógica)

| Componente | Estado |
|------------|--------|
| AuthController | No existe — auth en routes |
| Models / ORM | No existe |
| ML Python en runtime API | No integrado |
| Message queue / event bus | No existe |

---

*Reconstrucción basada en `backend/src/` y `frontend/src/` — Paso 7 ICACIT.*
