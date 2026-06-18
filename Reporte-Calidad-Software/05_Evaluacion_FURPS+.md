# 05 — Evaluación FURPS+

Evaluación basada en código en `cafe-cursor/`. Matriz detallada: [Matrices/Matriz_FURPS.xlsx](Matrices/Matriz_FURPS.xlsx).

---

## F — Functionality (Funcionalidad)

### F.1 Login

| Campo | Detalle |
|-------|---------|
| **Descripción** | Autenticación por email/contraseña con emisión JWT |
| **Estado actual** | Implementado — `POST /api/auth/login`, refresh token en tabla `sesiones` |
| **Evidencia** | `AuthService.js`, `auth.routes.js`, `LoginPage.jsx`, PF-01/PF-02 Cypress |
| **Hallazgos** | Registro público deshabilitado en producción (`ALLOW_PUBLIC_REGISTER=false`) |
| **Cumplimiento** | **Alto** |
| **Recomendaciones** | Mantener `REQUIRE_AUTH=true` en entornos compartidos |

### F.2 Usuarios

| Campo | Detalle |
|-------|---------|
| **Descripción** | CRUD usuarios, cambio rol, reset password — solo admin |
| **Estado actual** | Implementado — `usuarios.routes.js` con `adminGuard` |
| **Evidencia** | `UsuarioController.js`, `UsuarioService.js`, `UsuariosPage.jsx`, `AdminRoute` |
| **Hallazgos** | Sin spec Cypress dedicado a usuarios |
| **Cumplimiento** | **Alto** |
| **Recomendaciones** | Añadir PF-12 usuarios en Cypress |

### F.3 Productores

| Campo | Detalle |
|-------|---------|
| **Descripción** | Listar, crear, editar, eliminar productores |
| **Estado actual** | CRUD completo con validación `validateProductorBody` |
| **Evidencia** | `productores.routes.js`, PF-05 Cypress |
| **Hallazgos** | Scope cliente filtra por `user_id` vía repositorios |
| **Cumplimiento** | **Alto** |
| **Recomendaciones** | — |

### F.4 Producción

| Campo | Detalle |
|-------|---------|
| **Descripción** | Registro de lotes y producción |
| **Estado actual** | `POST /api/lotes`, `POST /api/produccion` operativos |
| **Evidencia** | `lotes.routes.js`, `produccion.routes.js`, PF-06 |
| **Hallazgos** | Deuda: dos fuentes de verdad `lotes` vs `produccion` (AUDITORIA_TECNICA §3) |
| **Cumplimiento** | **Medio** |
| **Recomendaciones** | Unificar modelo de dominio lotes/producción |

### F.5 Dashboard

| Campo | Detalle |
|-------|---------|
| **Descripción** | KPIs y métricas por rol admin/cliente |
| **Estado actual** | `GET /api/dashboard`, `GET /api/dashboard/metrics` |
| **Evidencia** | `DashboardController.js`, `DashboardRepository.js`, PF-03/PF-04 |
| **Hallazgos** | Gráficos Recharts en frontend; agregaciones SQL en repositorio |
| **Cumplimiento** | **Alto** |
| **Recomendaciones** | Prueba de carga sobre `/dashboard/metrics` |

### F.6 Reportes

| Campo | Detalle |
|-------|---------|
| **Descripción** | Consulta y export PDF/Excel por tipo |
| **Estado actual** | `GET /api/reportes/{produccion,calidad,predicciones,trazabilidad}`, export |
| **Evidencia** | `ReportesService.js`, `ReportExportService.js`, PF-09 |
| **Hallazgos** | SQL refactorizado a `reportesSql.js` tras hallazgo Sonar |
| **Cumplimiento** | **Alto** |
| **Recomendaciones** | Completar capa repository hexagonal |

### F.7 Trazabilidad

| Campo | Detalle |
|-------|---------|
| **Descripción** | Etapas por lote, QR, timeline |
| **Estado actual** | GET/POST `/api/trazabilidad` |
| **Evidencia** | `TrazabilidadService.js`, `react-qr-code`, PF-07 |
| **Hallazgos** | Trazabilidad auto al crear lote |
| **Cumplimiento** | **Alto** |
| **Recomendaciones** | — |

### F.8 Control de calidad

| Campo | Detalle |
|-------|---------|
| **Descripción** | Evaluación sensorial escala 1-10, puntaje compuesto |
| **Estado actual** | `POST /api/control-calidad`, alias `/api/evaluaciones` |
| **Evidencia** | `CalidadService.js`, `calidad.service.test.js` |
| **Hallazgos** | Tabla duplicada `evaluaciones_calidad` en schema sin uso app |
| **Cumplimiento** | **Alto** (funcional) / **Medio** (modelo) |
| **Recomendaciones** | Spec Cypress calidad; alinear schema |

### F.9 Chatbot IA

| Campo | Detalle |
|-------|---------|
| **Descripción** | Respuestas por intenciones (handlers + scoring) |
| **Estado actual** | `POST /api/chatbot` con `readGuard` |
| **Evidencia** | `ChatbotService.js`, `chatbotIntentHandlers.js`, PF-10 |
| **Hallazgos** | No es LLM externo; motor rule-based del proyecto |
| **Cumplimiento** | **Alto** |
| **Recomendaciones** | Documentar limitaciones del chatbot en UI |

### F.10 Auditoría

| Campo | Detalle |
|-------|---------|
| **Descripción** | Registro y consulta logs — admin |
| **Estado actual** | `GET/POST /api/auditoria`, `auditMiddleware` global |
| **Evidencia** | `AuditoriaRepository.js`, `ActionLogService.js`, `AuditoriaPage.jsx` |
| **Hallazgos** | Sin spec Cypress; GET dashboard no auditado (by design) |
| **Cumplimiento** | **Medio-Alto** |
| **Recomendaciones** | PF-13 auditoría E2E |

### F.11 Predicción IA

| Campo | Detalle |
|-------|---------|
| **Descripción** | Ejecución bajo demanda por lote |
| **Estado actual** | `POST /api/predicciones/ejecutar`, motor `PredictionEngine v2` |
| **Evidencia** | `PrediccionService.js`, `prediction.test.js`, PF-08 |
| **Hallazgos** | Heurístico, no modelo ML en runtime; carpeta `ml/` separada |
| **Cumplimiento** | **Medio** |
| **Recomendaciones** | Integrar o documentar explícitamente separación ML académico |

---

## U — Usability (Usabilidad)

### U.1 Navegación

| Campo | Detalle |
|-------|---------|
| **Descripción** | Sidebar con secciones PMV1, PMV2, Sistema |
| **Estado actual** | `MainLayout.jsx`, rutas protegidas, `AdminRoute` |
| **Evidencia** | PF-03, PF-04, PF-11 (menú admin vs cliente) |
| **Cumplimiento** | **Alto** |

### U.2 Diseño

| Campo | Detalle |
|-------|---------|
| **Descripción** | Tailwind, tema café, dark mode `class` |
| **Evidencia** | `tailwind.config.js`, `ThemeContext.jsx`, componentes `ui/` |
| **Cumplimiento** | **Alto** |

### U.3 Responsive

| Campo | Detalle |
|-------|---------|
| **Descripción** | Adaptación a distintos viewports |
| **Evidencia** | Clases Tailwind responsive en páginas |
| **Hallazgos** | Sin tests viewport en Cypress |
| **Cumplimiento** | **Medio** |
| **Recomendaciones** | Pruebas manuales o Cypress viewport matrix |

### U.4 UX / Formularios

| Campo | Detalle |
|-------|---------|
| **Descripción** | Formularios con feedback, toasts, skeletons |
| **Evidencia** | `FormField.jsx`, `ToastContext.jsx`, `Skeleton.jsx` |
| **Hallazgos** | AUDITORIA_TECNICA: toasts no usados en todos los formularios |
| **Cumplimiento** | **Medio** |

---

## R — Reliability (Confiabilidad)

### R.1 Manejo de errores

| Campo | Detalle |
|-------|---------|
| **Evidencia** | `AppError`, middleware global en `app.js`, `sendError`, `userFacingMessage` |
| **Hallazgos** | Errores 500 logueados en consola; mensaje sanitizado al cliente |
| **Cumplimiento** | **Alto** |

### R.2 Disponibilidad

| Campo | Detalle |
|-------|---------|
| **Evidencia** | `/api/health`, deploy Railway, JMeter 500/500 OK |
| **Cumplimiento** | **Alto** (health); endpoints negocio no probados bajo carga |

### R.3 Integridad / Consistencia

| Campo | Detalle |
|-------|---------|
| **Evidencia** | 43 FK en schema; transacciones en servicios críticos |
| **Hallazgos** | Inconsistencia conceptual lotes/produccion |
| **Cumplimiento** | **Medio-Alto** |

---

## P — Performance (Rendimiento)

### P.1 APIs

| Campo | Detalle |
|-------|---------|
| **Evidencia** | Rate limit 500/15min; pool MySQL max 10 |
| **Hallazgos** | JMeter: avg ~442 ms en health (incluye cold start ~2.6 s primer batch) |
| **Cumplimiento** | **Medio** |

### P.2 Consultas SQL

| Campo | Detalle |
|-------|---------|
| **Evidencia** | Repositorios parametrizados; vistas analíticas `views.sql` |
| **Cumplimiento** | **Medio-Alto** |

### P.3 Dashboard / Carga

| Campo | Detalle |
|-------|---------|
| **Evidencia** | Lazy loading rutas frontend; manualChunks en Vite |
| **Cumplimiento** | **Medio** |

---

## S — Supportability (Mantenibilidad)

### S.1 Organización

| Campo | Detalle |
|-------|---------|
| **Evidencia** | Monorepo documentado en README, `docs/ESTRUCTURA_PROYECTO.md` |
| **Cumplimiento** | **Alto** |

### S.2 Modularidad / Escalabilidad

| Campo | Detalle |
|-------|---------|
| **Evidencia** | Capas hexagonal en núcleo; 17 services, 11 repositories |
| **Hallazgos** | Hexagonal parcial |
| **Cumplimiento** | **Medio** |

### S.3 Mantenibilidad

| Campo | Detalle |
|-------|---------|
| **Evidencia** | Validators, shared helpers, CI automatizado |
| **Hallazgos** | Error migrate.js bloquea tests integración |
| **Cumplimiento** | **Medio** |

---

## PLUS (+)

### + Seguridad

| Campo | Detalle |
|-------|---------|
| **Evidencia** | JWT, RBAC, Helmet, CORS, bcrypt, audit logs |
| **Cumplimiento** | **Medio-Alto** — ver [06_Evaluacion_OWASP.md](06_Evaluacion_OWASP.md) |

### + Compatibilidad

| Campo | Detalle |
|-------|---------|
| **Evidencia** | Node 20 CI, MySQL 8, browsers modernos (Vite/React 18) |
| **Cumplimiento** | **Alto** |

### + Instalación / Configuración

| Campo | Detalle |
|-------|---------|
| **Evidencia** | `INICIAR.bat`, `npm run install:all`, `.env.example` |
| **Cumplimiento** | **Alto** |

### + Escalabilidad

| Campo | Detalle |
|-------|---------|
| **Evidencia** | Stateless API, pool BD, deploy cloud Railway/Vercel |
| **Hallazgos** | Sin cache, colas ni réplicas documentadas |
| **Cumplimiento** | **Medio** |

---

## Resumen FURPS+

| Dimensión | Nivel global |
|-----------|--------------|
| Functionality | Alto |
| Usability | Medio-Alto |
| Reliability | Medio-Alto |
| Performance | Medio |
| Supportability | Medio |
| PLUS (Seguridad, etc.) | Medio-Alto |
