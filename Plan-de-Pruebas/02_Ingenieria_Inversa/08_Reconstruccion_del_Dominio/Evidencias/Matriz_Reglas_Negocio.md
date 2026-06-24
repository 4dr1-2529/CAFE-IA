# Matriz de Reglas de Negocio — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Fuente:** Validadores, servicios de aplicación, `RoleHelper.js`, `schema.sql`

---

| ID | Entidad | Regla | Tipo | Implementación | Estado |
|----|---------|-------|------|----------------|--------|
| RN-01 | Usuario | Solo usuarios autenticados acceden a endpoints protegidos | Autorización | `authMiddleware`, `RoleHelper.requireAuth` | Implementada |
| RN-02 | Rol | Roles válidos en runtime: `admin`, `cliente` | Restricción | `RoleHelper.js` | Implementada |
| RN-03 | Rol | Rol legacy `productor`/`supervisor` se mapea a `cliente` | Normalización | `RoleHelper.normalizeRole` | Implementada |
| RN-04 | Usuario | Admin ve datos globales; cliente solo registros con su `user_id` | Alcance | `RoleHelper.scopeUserId` | Implementada |
| RN-05 | Usuario | No se puede desactivar al último administrador activo | Validación | `UsuarioService` | Implementada |
| RN-06 | Usuario | Email único en registro/actualización | Restricción | `schema.sql`, repositorio | Implementada |
| RN-07 | Sesión | Login genera JWT; refresh token en tabla `sesiones` | Proceso | `AuthService` | Implementada |
| RN-08 | Productor | Cliente solo accede a productores de su `user_id` | Alcance | `assertProductorAccess` | Implementada |
| RN-09 | Productor | Código de productor autogenerado por usuario | Proceso | `ProductorService` | Implementada |
| RN-10 | Lote | Campos obligatorios: productor, variedad, fecha cosecha, secado, estado, cantidad, humedad, temperatura, altitud | Validación | `lote.validator.js` | Implementada |
| RN-11 | Lote | `cantidad_kg` debe ser número estrictamente positivo | Validación | `lote.validator.js` | Implementada |
| RN-12 | Lote | `estado` debe pertenecer al catálogo `estados_lote` | Restricción | `LoteService.ESTADOS_VALIDOS` | Implementada |
| RN-13 | Lote | Admin debe asignar `responsable_user_id` al crear lote | Validación | `LoteService.resolveOwnerUserId` | Implementada |
| RN-14 | Lote | El productor debe pertenecer al cliente responsable seleccionado | Relación | `assertProductorAccess` + owner | Implementada |
| RN-15 | Lote | Código de lote autogenerado (`nextCodeForUser`) | Proceso | `LoteRepository` | Implementada |
| RN-16 | Lote | Al crear lote se generan 5 etapas de trazabilidad por defecto | Proceso | `TrazabilidadRepository.seedDefaultEtapas` | Implementada |
| RN-17 | Lote | Al crear lote se crea fila en `inventario` y QR único | Proceso | `LoteService.create` | Implementada |
| RN-18 | Lote | No existe PUT/DELETE de lotes en API expuesta | Restricción | Rutas `lotes.routes.js` | Implementada |
| RN-19 | Trazabilidad | Acceso al lote validado antes de operar trazabilidad | Autorización | `assertLoteAccess` | Implementada |
| RN-20 | Calidad | Seis atributos sensoriales (1–10) → `puntaje_taza` 0–100 | Cálculo | `CalidadService.computeScores` | Implementada |
| RN-21 | Calidad | Clasificación: Excelente ≥85, Buena ≥75, Aceptable ≥65, Regular resto | Cálculo | `CalidadService.computeScores` | Implementada |
| RN-22 | Calidad | Un lote solo puede tener una evaluación de calidad | Restricción | `existsForLote`, HTTP 409 | Implementada |
| RN-23 | Calidad | Al registrar calidad se actualiza estado del lote | Proceso | `markLoteCalidad` | Implementada |
| RN-24 | Predicción IA | Una predicción por lote (lotes pendientes en selector) | Restricción | `PrediccionService` | Implementada |
| RN-25 | Predicción IA | Motor heurístico considera humedad, temperatura, altitud, variedad, secado, calidad previa | Cálculo | `PredictionEngine.js` | Implementada |
| RN-26 | Predicción IA | Niveles de riesgo: bajo &lt;30%, medio &lt;50%, alto ≥50% | Cálculo | `riskLevel()` | Implementada |
| RN-27 | Reporte | Datos agregados filtrados por rol del solicitante | Alcance | `ReportesService` | Implementada |
| RN-28 | Reporte | Exportación en formatos PDF y Excel | Proceso | `pdfkit`, `exceljs` | Implementada |
| RN-29 | Auditoría | Acciones críticas registran entrada en `auditoria_logs` | Trazabilidad | `ActionLogService` | Implementada |
| RN-30 | Auditoría | Módulo de auditoría visible solo para administrador | Autorización | Rutas y menú frontend | Implementada |
| RN-31 | Chatbot | Respuestas basadas en intents y consultas MySQL con scope de rol | Proceso | `ChatbotService` | Implementada |
| RN-32 | Base datos | Admin: 7 tablas; Cliente: 6 tablas operativas | Alcance | `BaseDatosService` | Implementada |
| RN-33 | Dashboard | KPIs calculados desde agregaciones MySQL por rol | Proceso | `DashboardService` | Implementada |
| RN-34 | Finca | Tabla existe pero **sin reglas de negocio en aplicación** | — | No implementado | Pendiente |
| RN-35 | Permiso | Tabla `permisos`/`rol_permisos` sin enforcement en API | — | Solo seeds | No operativo |

---

**Total reglas documentadas:** 35 (32 implementadas, 2 no operativas, 1 pendiente)
