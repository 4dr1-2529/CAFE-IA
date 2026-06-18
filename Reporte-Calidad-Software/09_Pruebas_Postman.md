# 09 — Pruebas Postman / Inventario API REST

## 9.1 Estado de colección Postman

**No existe colección Postman** (`.json`, `.postman_collection`) en el repositorio CAFE-IA.

Este documento constituye el **inventario API derivado del código** en `backend/src/interfaces/http/routes/` para equivalencia Postman/Newman.

### Cómo generar colección Postman

1. Importar OpenAPI si se genera desde rutas, o
2. Crear colección manual con base URL:
   - Local: `http://localhost:3029`
   - Producción: `https://cafe-sostenible-api-production-03ad.up.railway.app`
3. Variable `{{token}}` — obtener de `POST /api/auth/login` → `accessToken`
4. Header global: `Authorization: Bearer {{token}}`

---

## 9.2 Autenticación

| Método | Endpoint | Auth | Body | Respuesta OK | Errores |
|--------|----------|------|------|--------------|---------|
| POST | `/api/auth/login` | No | `{ email, password }` | 200 `{ ok, user, accessToken, refreshToken }` | 400 campos vacíos, 401 credenciales |
| POST | `/api/auth/register` | No | `{ email, password, nombres, apellidos, rol? }` | 201 | 403 prod sin ALLOW_PUBLIC_REGISTER, 409 email existe |
| POST | `/api/auth/logout` | Bearer | `{ refreshToken? }` | 200 | 401 sin token |
| GET | `/api/auth/me` | Bearer | — | 200 `{ ok, data: { user } }` | 401 |

**Credenciales demo:** admin@cafeai.com / admin123 | cliente1@cafeai.com / mbappe29

---

## 9.3 Health y sistema

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/` | No | Status backend |
| GET | `/api/health` | No | Health check JSON |
| POST | `/api/admin/seed-final` | Admin | Seed final dataset |

---

## 9.4 Usuarios (adminGuard)

| Método | Endpoint | Validación | Errores |
|--------|----------|------------|---------|
| GET | `/api/usuarios` | — | 401, 403 |
| GET | `/api/usuarios/activos` | — | 401, 403 |
| GET | `/api/auth/usuarios` | — | 401, 403 |
| GET | `/api/usuarios/:id` | — | 404 |
| POST | `/api/usuarios` | validateCreateUsuario | 400 |
| PUT | `/api/usuarios/:id` | validateUpdateUsuario | 400, 404 |
| PATCH | `/api/usuarios/:id/estado` | validatePatchEstado | 400 |
| PATCH | `/api/usuarios/:id/rol` | validatePatchRol | 400 |
| POST | `/api/usuarios/:id/reset-password` | validateResetPassword | 400 |

---

## 9.5 Dashboard (readGuard)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/dashboard` | Dashboard agregado |
| GET | `/api/dashboard/metrics` | KPIs métricas |

Errores: **401** sin JWT.

---

## 9.6 Productores (readGuard / writeGuard)

| Método | Endpoint | Guard | Validación |
|--------|----------|-------|------------|
| GET | `/api/productores` | read | — |
| POST | `/api/productores` | write | validateProductorBody |
| PUT | `/api/productores/:id` | write | validateProductorBody |
| DELETE | `/api/productores/:id` | write | — |

Errores: **401**, **403**, **400** validación, **404** no encontrado.

---

## 9.7 Lotes (readGuard / loteWriteGuard)

| Método | Endpoint | Validación |
|--------|----------|------------|
| GET | `/api/lotes` | — |
| GET | `/api/lotes/next-code` | — |
| GET | `/api/lotes/:id` | — |
| POST | `/api/lotes` | validateCreateLote |

---

## 9.8 Producción (readGuard / writeGuard)

| Método | Endpoint | Validación |
|--------|----------|------------|
| GET | `/api/produccion` | — |
| POST | `/api/produccion` | validateCreateProduccion |

---

## 9.9 Trazabilidad

| Método | Endpoint | Validación |
|--------|----------|------------|
| GET | `/api/trazabilidad` | — |
| POST | `/api/trazabilidad` | validateCreateTrazabilidad |

---

## 9.10 Control de calidad

| Método | Endpoint | Notas |
|--------|----------|-------|
| GET | `/api/control-calidad` | Alias: `/api/evaluaciones` |
| POST | `/api/control-calidad` | validateCreateCalidad |

---

## 9.11 Predicciones IA

| Método | Endpoint | Validación |
|--------|----------|------------|
| GET | `/api/predicciones` | — |
| POST | `/api/predicciones/ejecutar` | validateExecutePrediccion |

---

## 9.12 Reportes (readGuard en router)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/reportes/produccion` | Datos reporte producción |
| GET | `/api/reportes/calidad` | Datos reporte calidad |
| GET | `/api/reportes/predicciones` | Datos predicciones |
| GET | `/api/reportes/trazabilidad` | Datos trazabilidad |
| GET | `/api/reportes/export/:tipo/:formato` | Export PDF o Excel |

`:tipo` — produccion | calidad | predicciones | trazabilidad  
`:formato` — pdf | excel

---

## 9.13 Chatbot

| Método | Endpoint | Body |
|--------|----------|------|
| POST | `/api/chatbot` | `{ mensaje, contexto? }` |

Auth: readGuard (cualquier usuario autenticado).

---

## 9.14 Auditoría (adminGuard)

| Método | Endpoint |
|--------|----------|
| GET | `/api/auditoria/resumen` |
| GET | `/api/auditoria` |
| POST | `/api/auditoria` |

---

## 9.15 Base de datos (readGuard)

| Método | Endpoint |
|--------|----------|
| GET | `/api/base-datos` |
| GET | `/api/base-datos/:tabla` |

---

## 9.16 Códigos HTTP estándar del proyecto

| Código | Uso |
|--------|-----|
| 200 | OK JSON `{ ok: true, ... }` |
| 201 | Creación (register, create) |
| 400 | Validación (`AppError`, validateBody) |
| 401 | Sin token / token inválido |
| 403 | Rol insuficiente / registro deshabilitado |
| 404 | Ruta o entidad no encontrada |
| 409 | Conflicto (email duplicado) |
| 500 | Error servidor (mensaje sanitizado) |

Formato error: `{ ok: false, message: "..." }`

---

## 9.17 Colección Postman sugerida (estructura)

```text
CAFE-IA API
├── Auth
│   ├── Login Admin
│   ├── Login Cliente
│   ├── Me
│   └── Logout
├── PMV1
│   ├── Productores CRUD
│   ├── Lotes
│   ├── Producción
│   ├── Trazabilidad
│   ├── Calidad
│   ├── Dashboard
│   └── Reportes
├── PMV2
│   ├── Predicciones
│   ├── Chatbot
│   └── Auditoría
└── Sistema
    ├── Usuarios
    ├── Base datos
    └── Health
```

**Acción recomendada:** Exportar colección a `testing/postman/CAFE-IA.postman_collection.json` y environment con variables `baseUrl`, `token`.

---

## 9.18 Tests automatizables (Newman)

Casos mínimos alineados a `docs/MATRIZ_PRUEBAS_HU.md`:

1. Login admin → 200 + token
2. GET productores con token → 200 array
3. POST lote sin token → 401
4. POST lote body vacío → 400
5. GET dashboard/metrics → 200 kpis

Equivalente parcial ya en `backend/tests/integration.test.js` (actualmente bloqueado por migrate.js).
