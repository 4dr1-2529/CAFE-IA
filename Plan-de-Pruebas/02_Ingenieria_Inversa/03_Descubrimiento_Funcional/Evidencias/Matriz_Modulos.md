# Matriz de Módulos — CAFE-IA

**Fecha:** 2026-06-24

| ID | Módulo | Descripción | Usuario | Entradas | Salidas | Estado | Prioridad |
|----|--------|-------------|---------|----------|---------|--------|-----------|
| MOD-01 | Login | Autenticación email/contraseña | admin, cliente | email, password | JWT, datos usuario | Completo | Alta |
| MOD-02 | Logout | Cierre de sesión | admin, cliente | refreshToken | confirmación | Completo | Alta |
| MOD-03 | JWT / Sesión | Token access + refresh, /auth/me | admin, cliente | Bearer token | usuario autenticado | Completo | Alta |
| MOD-04 | Roles RBAC | admin (global) vs cliente (scope user_id) | sistema | rol en JWT | filtros SQL por user_id | Completo | Alta |
| MOD-05 | Permisos granulares | Tabla permisos en BD seeds | — | — | — | **No implementado** en API | Media |
| MOD-06 | Usuarios | CRUD, estado, rol, reset password | admin | datos usuario | lista usuarios | Completo | Alta |
| MOD-07 | Productores | CRUD productores | admin, cliente | DTO productor | lista, códigos P00x | Completo | Alta |
| MOD-08 | Fincas | Entidad fincas en MySQL | — | — | — | **Parcial** (solo BD/seeds) | Media |
| MOD-09 | Lotes | Alta y consulta de lotes | admin, cliente | DTO lote, catálogos | lote + trazabilidad inicial | **Parcial** (sin PUT/DELETE) | Alta |
| MOD-10 | Producción | Registro producción asociada | admin, cliente | DTO producción | registro producción | Completo | Alta |
| MOD-11 | Trazabilidad | Timeline etapas por lote | admin, cliente | lote_id, etapa | lista etapas, QR | Completo | Alta |
| MOD-12 | Control calidad | Evaluación sensorial | admin, cliente | notas 1–10 | puntaje 0–100, clasificación | Completo | Alta |
| MOD-13 | Dashboard | KPIs y gráficos Recharts | admin, cliente | JWT | métricas por rol | Completo | Alta |
| MOD-14 | Reportes | Producción, calidad, IA, trazabilidad | admin, cliente | filtros rol | tablas + PDF/Excel | Completo | Alta |
| MOD-15 | Módulo IA | Predicción bajo demanda | admin, cliente | lote_id | calidad, riesgo, alertas | Completo | Alta |
| MOD-16 | Chatbot IA | Asistente con intents | admin, cliente | mensaje | respuesta contextual | Completo | Media |
| MOD-17 | Modelo ML Python | RandomForest scikit-learn | académico | dataset CSV | metrics.json | **No producción** | Baja |
| MOD-18 | Auditoría | Log acciones críticas | admin | filtros | auditoria_logs | Completo | Media |
| MOD-19 | Base de datos | Vista tablas MySQL | admin, cliente | nombre tabla | filas scope rol | Completo | Media |
| MOD-20 | Configuración | Parámetros clave-valor | — | — | — | **Parcial** (solo seed) | Baja |
| MOD-21 | Inventario | Stock por lote | — | auto al crear lote | fila inventario | **Parcial** (sin módulo UI) | Baja |
| MOD-22 | Evidencias PMV | Página documentación evidencias | admin | — | checklist PMV | Completo | Baja |
| MOD-23 | Arquitectura | Vista árbol proyecto | admin | — | diagrama interactivo | Completo | Baja |
| MOD-24 | Historias usuario | HU01–HU12 documentadas | admin | — | matriz HU | Completo | Baja |
| MOD-25 | Registro público | POST /auth/register | — | body usuario | 403 en prod default | **Parcial** | Baja |
