# Inventario Funcional — CAFE-IA

**Fecha:** 2026-06-24  
**Fuente:** Código fuente, rutas API, vistas React, Cypress E2E, `HistoriasUsuarioPage.jsx`

---

## Autenticación

| ID | Funcionalidad | Vista / API | Estado | Evidencia |
|----|---------------|-------------|--------|-----------|
| F-AUTH-01 | Login con email y contraseña | `/login` · POST `/api/auth/login` | Completo | PF-01, PF-02, integration.test |
| F-AUTH-02 | Restaurar sesión al recargar | AuthContext · GET `/api/auth/me` | Completo | AuthContext.jsx |
| F-AUTH-03 | Logout | MainLayout · POST `/api/auth/logout` | Completo | auth.routes.js |
| F-AUTH-04 | JWT access token | AuthService | Completo | auth.js middleware |
| F-AUTH-05 | Refresh token (tabla sesiones) | AuthService.login/logout | Completo | schema.sql sesiones |
| F-AUTH-06 | Roles admin y cliente | RoleHelper, rbac.js | Completo | PF-11 roles |
| F-AUTH-07 | Registro público usuarios | POST `/api/auth/register` | Parcial | Deshabilitado prod (`ALLOW_PUBLIC_REGISTER`) |
| F-AUTH-08 | Permisos granulares RBAC | Tablas permisos/rol_permisos | No implementado | Solo seeds.sql |

---

## Administración

| ID | Funcionalidad | Vista / API | Estado |
|----|---------------|-------------|--------|
| F-ADM-01 | Listar usuarios | `/usuarios` · GET `/api/usuarios` | Completo |
| F-ADM-02 | Crear usuario | POST `/api/usuarios` | Completo |
| F-ADM-03 | Editar usuario | PUT `/api/usuarios/:id` | Completo |
| F-ADM-04 | Activar/desactivar usuario | PATCH `/api/usuarios/:id/estado` | Completo |
| F-ADM-05 | Cambiar rol usuario | PATCH `/api/usuarios/:id/rol` | Completo |
| F-ADM-06 | Reset contraseña | POST `/api/usuarios/:id/reset-password` | Completo |
| F-ADM-07 | Auditoría acciones | `/auditoria` · GET/POST `/api/auditoria` | Completo |
| F-ADM-08 | Resumen auditoría | GET `/api/auditoria/resumen` | Completo |

---

## Producción

| ID | Funcionalidad | Vista / API | Estado |
|----|---------------|-------------|--------|
| F-PROD-01 | Listar productores | `/productores` · GET `/api/productores` | Completo |
| F-PROD-02 | Crear productor | POST `/api/productores` | Completo |
| F-PROD-03 | Editar productor | PUT `/api/productores/:id` | Completo |
| F-PROD-04 | Eliminar productor (soft) | DELETE `/api/productores/:id` | Completo |
| F-PROD-05 | Código automático productor | ProductorRepository.nextCodigoForUser | Completo |
| F-PROD-06 | Registrar lote | `/registro` · POST `/api/lotes` | Completo |
| F-PROD-07 | Listar/consultar lotes | GET `/api/lotes`, `/api/lotes/:id` | Completo |
| F-PROD-08 | Siguiente código lote | GET `/api/lotes/next-code` | Completo |
| F-PROD-09 | Editar/eliminar lote | — | **No implementado** |
| F-PROD-10 | Gestión fincas CRUD | Tabla `fincas` en BD | **No implementado** (UI/API) |
| F-PROD-11 | Registrar producción | POST `/api/produccion` | Completo |
| F-PROD-12 | Listar producción | GET `/api/produccion` | Completo |
| F-PROD-13 | Campo parcela en productor | parcela/ubicacion en DTO | Completo |

---

## Trazabilidad

| ID | Funcionalidad | Vista / API | Estado |
|----|---------------|-------------|--------|
| F-TRAZ-01 | Listar trazabilidad | `/trazabilidad` · GET `/api/trazabilidad` | Completo |
| F-TRAZ-02 | Agregar etapa | POST `/api/trazabilidad` | Completo |
| F-TRAZ-03 | Timeline visual | TrazabilidadTimeline.jsx | Completo |
| F-TRAZ-04 | QR por lote | LoteQrPanel · qr_codigo CAFE-{id} | Completo |
| F-TRAZ-05 | 5 etapas auto al crear lote | LoteService / seed | Completo |

---

## Calidad

| ID | Funcionalidad | Vista / API | Estado |
|----|---------------|-------------|--------|
| F-CAL-01 | Listar evaluaciones | `/calidad` · GET `/api/control-calidad` | Completo |
| F-CAL-02 | Registrar evaluación sensorial | POST `/api/control-calidad` | Completo |
| F-CAL-03 | Puntaje 0–100 y clasificación | CalidadService.computeScores | Completo |
| F-CAL-04 | Criterios ponderados (aroma, sabor…) | catálogo criterios_calidad | Completo |

---

## Inteligencia Artificial

| ID | Funcionalidad | Vista / API | Estado |
|----|---------------|-------------|--------|
| F-IA-01 | Ejecutar predicción IA | `/ia` · POST `/api/predicciones/ejecutar` | Completo |
| F-IA-02 | Listar predicciones | GET `/api/predicciones` | Completo |
| F-IA-03 | Motor heurístico v2 | PredictionEngine.js | Completo (prod) |
| F-IA-04 | Factores, alertas, recomendaciones | PrediccionService salida | Completo |
| F-IA-05 | Chatbot intents | `/chatbot-ia` · POST `/api/chatbot` | Completo |
| F-IA-06 | Modelo ML Python entrenado | `ml/train_model.py` | No producción |

---

## Reportes

| ID | Funcionalidad | Vista / API | Estado |
|----|---------------|-------------|--------|
| F-REP-01 | Reporte producción | GET `/api/reportes/produccion` | Completo |
| F-REP-02 | Reporte calidad | GET `/api/reportes/calidad` | Completo |
| F-REP-03 | Reporte predicciones | GET `/api/reportes/predicciones` | Completo |
| F-REP-04 | Reporte trazabilidad | GET `/api/reportes/trazabilidad` | Completo |
| F-REP-05 | Export PDF | GET `/api/reportes/export/:tipo/pdf` | Completo |
| F-REP-06 | Export Excel | GET `/api/reportes/export/:tipo/excel` | Completo |

---

## Dashboard

| ID | Funcionalidad | Vista / API | Estado |
|----|---------------|-------------|--------|
| F-DASH-01 | Panel principal KPIs | `/` · GET `/api/dashboard` | Completo |
| F-DASH-02 | Métricas detalladas | GET `/api/dashboard/metrics` | Completo |
| F-DASH-03 | Scope admin vs cliente | DashboardService | Completo |
| F-DASH-04 | Gráficos Recharts | DashboardPage.jsx | Completo |

---

## Configuración y sistema

| ID | Funcionalidad | Vista / API | Estado |
|----|---------------|-------------|--------|
| F-CONF-01 | Parámetros configuraciones | Tabla `configuraciones` seed | Parcial |
| F-CONF-02 | UI edición configuración | — | No implementado |
| F-SYS-01 | Vista base de datos | `/basedatos` | Completo |
| F-SYS-02 | Evidencias PMV | `/evidencias` | Completo |
| F-SYS-03 | Arquitectura proyecto | `/arquitectura` | Completo |
| F-SYS-04 | Historias de usuario | `/historias` | Completo |
| F-SYS-05 | Tema claro/oscuro | ThemeContext | Completo |
| F-SYS-06 | Inventario automático por lote | LoteRepository insert | Parcial (sin UI) |

---

## Totales inventario

| Estado | Cantidad |
|--------|----------|
| Completo | 48 |
| Parcial | 7 |
| No implementado | 4 |
| **Total funcionalidades inventariadas** | **59** |
