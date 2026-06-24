# 02 — Resultado IA: Descubrimiento Funcional

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Fecha:** 2026-06-24  
**Metodología:** Ingeniería inversa sobre código fuente, rutas API, vistas React, pruebas Cypress y documentación del repositorio

---

## 1. Panorama del sistema

CAFE-IA es una plataforma web de trazabilidad del café con **15 vistas operativas** (+ login), **13 grupos de rutas API** bajo `/api`, roles **admin** (alcance global) y **cliente** (filtro `user_id`), organizada en menú **PMV1 Operaciones**, **PMV2 Mejoras** y **Sistema** (solo admin).

**Fuentes verificadas:** `AppRoutes.jsx`, `routes/index.js`, `MainLayout.jsx`, `HistoriasUsuarioPage.jsx`, 11 specs Cypress.

---

## 2. Autenticación

### 2.1 Login — **Completo**

| Atributo | Detalle |
|----------|---------|
| **Objetivo** | Identificar usuario y emitir JWT |
| **Descripción** | Formulario email/contraseña; validación bcrypt; respuesta con token y datos usuario |
| **Entradas** | `email`, `password` (POST `/api/auth/login`) |
| **Salidas** | `{ ok, token, refreshToken, user }` |
| **Usuarios** | admin, cliente |
| **Reglas** | Credenciales obligatorias; usuario activo en BD |
| **Dependencias** | AuthService, bcryptjs, jsonwebtoken, tabla `usuarios` |
| **Evidencia** | LoginPage.jsx, PF-01, PF-02, integration.test |

### 2.2 Logout — **Completo**

| Atributo | Detalle |
|----------|---------|
| **Objetivo** | Invalidar sesión |
| **Entradas** | refreshToken (POST `/api/auth/logout` con JWT) |
| **Salidas** | `{ ok, message }` |
| **Dependencias** | AuthService.logout, tabla `sesiones` |
| **Evidencia** | MainLayout onLogout, auth.routes.js |

### 2.3 JWT — **Completo**

| Atributo | Detalle |
|----------|---------|
| **Objetivo** | Autenticar peticiones stateless |
| **Entradas** | Header `Authorization: Bearer <token>` |
| **Salidas** | `req.user` con sub, rol, email |
| **Reglas** | JWT_SECRET ≥32 caracteres; expiración configurable (`JWT_EXPIRES_IN`) |
| **Dependencias** | middleware `auth.js`, env.js |
| **Evidencia** | POST /lotes sin token → 401 |

### 2.4 Roles — **Completo**

| Rol | Alcance | Middleware |
|-----|---------|------------|
| `admin` | Global — todos los productores/lotes/usuarios | `adminGuard` |
| `cliente` | Personal — `user_id` del token | `readGuard`, `writeGuard`, `RoleHelper.scopeUserId` |

**Reglas:** Legacy supervisor/productor normalizados a cliente (`RoleHelper.js`).

### 2.5 Permisos — **No implementado** (API)

| Atributo | Detalle |
|----------|---------|
| **Estado** | Tablas `permisos`, `rol_permisos` existen en `seeds.sql` |
| **Hallazgo** | RBAC usa solo dos roles; no hay middleware por permiso granular |
| **Impacto** | Modelo de datos más rico que la implementación actual |

### 2.6 Registro público — **Parcial**

POST `/api/auth/register` implementado; en producción retorna **403** si `ALLOW_PUBLIC_REGISTER` no es `true`.

---

## 3. Gestión

### 3.1 Usuarios — **Completo** (solo admin)

| Atributo | Detalle |
|----------|---------|
| **Objetivo** | Administrar cuentas del sistema |
| **Vista** | `/usuarios` (AdminRoute) |
| **API** | GET/POST/PUT `/api/usuarios`, PATCH estado/rol, POST reset-password |
| **Entradas** | DTO usuario (email, nombres, rol_id, password) |
| **Salidas** | Lista usuarios, confirmaciones |
| **Reglas** | No desactivar último admin; adminGuard en todas las rutas |
| **Dependencias** | UsuarioService, UsuarioRepository, bcryptjs |
| **Evidencia** | HU02, PF-11 |

### 3.2 Productores — **Completo**

| Atributo | Detalle |
|----------|---------|
| **Objetivo** | Registrar productores cafetaleros |
| **Vista** | `/productores` |
| **API** | GET/POST/PUT/DELETE `/api/productores` |
| **Entradas** | nombres, apellidos, dni, correo, parcela, ubicación, altitud… |
| **Salidas** | Productor con `codigo_productor` P001… |
| **Usuarios** | admin (todos), cliente (propios) |
| **Reglas** | Código auto por usuario; soft delete `deleted_at` |
| **Evidencia** | HU03, PF-05 |

### 3.3 Fincas — **Parcial / No implementado** (módulo)

| Atributo | Detalle |
|----------|---------|
| **Objetivo esperado** | Gestionar fincas por productor |
| **Estado** | Tabla `fincas` en `schema.sql`; seeds en `seeds.sql` y scripts PMV2 |
| **Hallazgo** | **Sin rutas API** `fincas.routes.js`; **sin vista** dedicada |
| **Alternativa** | Campo `parcela` en entidad productor |
| **FK** | `lotes.finca_id` nullable — no usado desde UI |

### 3.4 Lotes — **Parcial**

| Atributo | Detalle |
|----------|---------|
| **Objetivo** | Registrar lotes de café |
| **Vista** | `/registro` |
| **API** | GET `/api/lotes`, GET `/:id`, GET `/next-code`, POST `/` |
| **Entradas** | productor_id, variedad, fecha_cosecha, cantidad_kg, catálogos… |
| **Salidas** | Lote + 5 etapas trazabilidad + fila inventario |
| **Reglas** | Scope por rol; validación `lote.validator.js` |
| **Limitación** | **Sin PUT/DELETE** de lotes |
| **Evidencia** | HU04, PF-06 |

### 3.5 Producción — **Completo**

| Atributo | Detalle |
|----------|---------|
| **Objetivo** | Registrar eventos de producción |
| **API** | GET/POST `/api/produccion` |
| **Entradas** | DTO producción (`produccion.validator.js`) |
| **Dependencias** | ProduccionRepository |
| **Evidencia** | RegistroProduccionPage.jsx |

---

## 4. Procesos

### 4.1 Trazabilidad — **Completo**

| Atributo | Detalle |
|----------|---------|
| **Objetivo** | Línea de tiempo por etapas del lote |
| **Vista** | `/trazabilidad` |
| **API** | GET/POST `/api/trazabilidad` |
| **Entradas** | lote_id, etapa, descripción, fecha, ubicación, estado, orden |
| **Salidas** | Lista etapas ordenadas; QR `CAFE-{id}` |
| **Reglas** | Etapas: Producción → Secado → Calidad → Almacén → Comercialización |
| **Componentes** | TrazabilidadTimeline, LoteQrPanel |
| **Evidencia** | HU05, PF-07 |

### 4.2 Control de Calidad — **Completo**

| Atributo | Detalle |
|----------|---------|
| **Objetivo** | Evaluación sensorial y puntaje |
| **Vista** | `/calidad` |
| **API** | GET/POST `/api/control-calidad` (alias `/evaluaciones`) |
| **Entradas** | lote_id, notas aroma/sabor/cuerpo/acidez/dulzor (1–10) |
| **Salidas** | Puntaje 0–100; clasificación Alta/Media/Baja |
| **Reglas** | `CalidadService.computeScores` ponderado |
| **Evidencia** | HU06, calidad.service.test.js |

### 4.3 Reportes — **Completo**

| Atributo | Detalle |
|----------|---------|
| **Objetivo** | Informes analíticos y exportación |
| **Vista** | `/reportes` |
| **API** | GET `/api/reportes/{produccion,calidad,predicciones,trazabilidad}` |
| **Export** | GET `/api/reportes/export/:tipo/:formato` (pdf, excel) |
| **Salidas** | JSON agregado; archivos PDF (pdfkit), Excel (exceljs) |
| **Reglas** | Scope por rol en ReportesService |
| **Evidencia** | HU08, PF-09 |

### 4.4 Dashboard — **Completo**

| Atributo | Detalle |
|----------|---------|
| **Objetivo** | Panel KPIs y gráficos |
| **Vista** | `/` (index) |
| **API** | GET `/api/dashboard`, `/api/dashboard/metrics` |
| **Salidas** | KPIs: lotes, productores, evaluaciones, predicciones, trazabilidad activa |
| **Dependencias** | DashboardService, Recharts, chartTheme.js |
| **Evidencia** | HU07, PF-03, PF-04 |

---

## 5. Inteligencia Artificial

### 5.1 Predicción — **Completo** (producción)

| Atributo | Detalle |
|----------|---------|
| **Objetivo** | Predecir calidad del lote bajo demanda |
| **Vista** | `/ia` |
| **API** | POST `/api/predicciones/ejecutar`, GET `/api/predicciones` |
| **Entradas** | lote_id |
| **Salidas** | calidad estimada, confianza %, riesgo %, factores, alertas, recomendaciones |
| **Motor** | `PredictionEngine.js` v2.0-heuristic (dominio Node.js) |
| **Reglas** | Una predicción por lote; solo lotes pendientes en selector |
| **Evidencia** | HU10, PF-08, prediction.test.js |

### 5.2 Recomendaciones — **Completo**

Incluidas en salida de `PrediccionService` tras ejecutar motor v2 (alertas y texto recomendación).

### 5.3 Chatbot IA — **Completo**

| Atributo | Detalle |
|----------|---------|
| **Objetivo** | Asistente conversacional sobre datos del sistema |
| **Vista** | `/chatbot-ia` |
| **API** | POST `/api/chatbot` |
| **Entradas** | mensaje usuario |
| **Salidas** | respuesta según intent (PMV, arquitectura, conteos, trazabilidad) |
| **Dependencias** | ChatbotService, ChatbotDataService, chatbotIntentHandlers |
| **Evidencia** | HU11, PF-10 |

### 5.4 Modelo ML Python — **No implementado** en producción

| Atributo | Detalle |
|----------|---------|
| **Ubicación** | `ml/train_model.py`, `requirements.txt` |
| **Función** | Evidencia académica RandomForest scikit-learn |
| **Hallazgo** | API producción **no invoca** modelo Python; usa PredictionEngine.js |

---

## 6. Administración

### 6.1 Auditoría / Historial — **Completo**

| Atributo | Detalle |
|----------|---------|
| **Objetivo** | Registrar y consultar acciones críticas |
| **Vista** | `/auditoria` (admin) — menú "Auditoría / Historial" |
| **API** | GET/POST `/api/auditoria`, GET `/resumen` |
| **Dependencias** | AuditoriaRepository, ActionLogService, auditMiddleware |
| **Evidencia** | HU12, PF-11 |

### 6.2 Configuración — **Parcial**

| Atributo | Detalle |
|----------|---------|
| **Estado** | Tabla `configuraciones`; seed en migrate.js (`app.nombre`, `ia.modelo_version`) |
| **Hallazgo** | Sin API CRUD ni pantalla de administración de parámetros |
| **Consulta** | Posible visualización indirecta vía `/basedatos` si tabla expuesta |

### 6.3 Base de datos (transparencia) — **Completo**

Vista `/basedatos` — GET `/api/base-datos` y `/:tabla`. Admin: 7 tablas; cliente: 6 tablas operativas.

### 6.4 Módulos sistema (admin) — **Completo**

| Vista | Función |
|-------|---------|
| `/evidencias` | Checklist evidencias PMV |
| `/arquitectura` | Árbol interactivo del proyecto |
| `/historias` | HU01–HU12 con trazabilidad vista↔API |

---

## 7. Matriz resumen de estados

| Módulo | Estado |
|--------|--------|
| Login, Logout, JWT, Roles | Completo |
| Permisos granulares | No implementado |
| Usuarios | Completo |
| Productores | Completo |
| Fincas (módulo) | No implementado |
| Lotes | Parcial |
| Producción | Completo |
| Trazabilidad | Completo |
| Calidad | Completo |
| Dashboard | Completo |
| Reportes | Completo |
| Predicción IA | Completo |
| Chatbot | Completo |
| ML Python API | No implementado |
| Auditoría | Completo |
| Configuración UI | Parcial |
| Inventario UI | Parcial |

---

## 8. Cobertura de pruebas funcionales

| Tipo | Cobertura |
|------|-----------|
| Cypress E2E | 11 specs, 13 tests — login, dashboard, productores, registro, trazabilidad, IA, reportes, chatbot, RBAC |
| Backend integration | Login, lotes 401/400, dashboard metrics |
| Unitarios dominio | Calidad computeScores, PredictionEngine |

**Gap Cypress:** calidad, base datos, usuarios, auditoría sin spec dedicado.

---

## 9. Conclusión del análisis funcional

CAFE-IA implementa un **dominio funcional completo para PMV1 y PMV2** según las 12 historias de usuario embebidas en la aplicación. Las brechas principales son entidades de BD **no expuestas** (fincas, permisos granulares, configuración editable) y **operaciones CRUD incompletas en lotes**.

Detalle de mejoras en `03_Mejoras.md`. Inventario completo en `Evidencias/Inventario_Funcional.md`.

---

*Documento ICACIT — Ingeniería Inversa Paso 3. Basado exclusivamente en código y evidencias del repositorio CAFE-IA.*
