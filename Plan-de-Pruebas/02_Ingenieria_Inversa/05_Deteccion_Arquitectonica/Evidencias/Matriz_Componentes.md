# Matriz de Componentes — CAFE-IA

**Fecha:** 2026-06-24  
**Fuente:** `backend/src/`, `frontend/src/`, `schema.sql`

| ID | Componente | Tipo | Responsabilidad | Dependencias | Acoplamiento | Cohesión | Estado | Riesgo |
|----|------------|------|-----------------|--------------|--------------|----------|--------|--------|
| COM-001 | app.js | Backend/Config | Bootstrap Express, middleware global | env, routes, helmet, cors | Medio | Alta | Implementado | Bajo |
| COM-002 | server.js | Backend/Entry | Arranque HTTP, migrate, pool | app, migrate, pool | Bajo | Alta | Implementado | Medio |
| COM-003 | env.js | Backend/Config | Variables entorno validadas | dotenv | Bajo | Alta | Implementado | Medio |
| COM-004 | pool.js | Backend/SQL | Pool mysql2 | mysql2, env | Medio | Alta | Implementado | Medio |
| COM-005 | migrate.js | Backend/SQL | DDL + seeds al arranque | pool, schema.sql | Medio | Media | Implementado | Medio |
| COM-006 | routes/index.js | Backend/Routes | Montaje 13 routers /api | 14 route modules | Medio | Alta | Implementado | Bajo |
| COM-007 | auth.routes.js | Backend/Routes | Login, logout, register, /me | AuthService, auth middleware | Medio | Alta | Implementado | Medio |
| COM-008 | auth.js middleware | Backend/Middleware | Validar JWT Bearer | jsonwebtoken, env | Bajo | Alta | Implementado | Medio |
| COM-009 | rbac.js | Backend/Middleware | adminGuard, readGuard, writeGuard | RoleHelper | Bajo | Alta | Implementado | Bajo |
| COM-010 | auditMiddleware.js | Backend/Middleware | Log peticiones API | ActionLogService | Medio | Alta | Implementado | Bajo |
| COM-011 | validate.js | Backend/Middleware | Validación request body | validators | Bajo | Alta | Implementado | Bajo |
| COM-012 | LoteController | Backend/Controller | Adaptador REST lotes | LoteService | Bajo | Alta | Implementado | Bajo |
| COM-013 | ProductorController | Backend/Controller | Adaptador REST productores | ProductorService | Bajo | Alta | Implementado | Bajo |
| COM-014 | UsuarioController | Backend/Controller | Adaptador REST usuarios | UsuarioService | Bajo | Alta | Implementado | Bajo |
| COM-015 | DashboardController | Backend/Controller | KPIs dashboard | DashboardService | Bajo | Alta | Implementado | Bajo |
| COM-016 | CalidadController | Backend/Controller | Evaluaciones calidad | CalidadService | Bajo | Alta | Implementado | Bajo |
| COM-017 | TrazabilidadController | Backend/Controller | Etapas trazabilidad | TrazabilidadService | Bajo | Alta | Implementado | Bajo |
| COM-018 | PrediccionController | Backend/Controller | Predicción IA | PrediccionService | Bajo | Alta | Implementado | Bajo |
| COM-019 | ReportesController | Backend/Controller | Reportes y export | ReportesService | Medio | Alta | Implementado | Bajo |
| COM-020 | ChatbotController | Backend/Controller | Asistente chatbot | ChatbotService | Medio | Alta | Implementado | Bajo |
| COM-021 | AuditoriaController | Backend/Controller | Logs auditoría | AuditoriaService | Bajo | Alta | Implementado | Bajo |
| COM-022 | LoteService | Backend/Service | Caso de uso lotes | LoteRepository, validators | Medio | Alta | Implementado | Bajo |
| COM-023 | AuthService | Backend/Service | Login, JWT, sesiones | UsuarioRepository, bcrypt, jwt | Medio | Alta | Implementado | Medio |
| COM-024 | PrediccionService | Backend/Service | Orquestación predicción | PredictionService, PrediccionRepository | Medio | Alta | Implementado | Bajo |
| COM-025 | PredictionService | Backend/Service | Ejecución motor + SQL directo | PredictionEngine, pool | **Alto** | Media | Implementado | Medio |
| COM-026 | PredictionEngine.js | Backend/Domain | Lógica heurística IA v2 | — (puro dominio) | Bajo | Alta | Implementado | Bajo |
| COM-027 | LoteRepository | Backend/Repository | SQL lotes | pool, sqlScope | Medio | Alta | Implementado | Bajo |
| COM-028 | ProductorRepository | Backend/Repository | SQL productores | pool | Medio | Alta | Implementado | Bajo |
| COM-029 | UsuarioRepository | Backend/Repository | SQL usuarios | pool | Medio | Alta | Implementado | Bajo |
| COM-030 | RoleHelper | Backend/Shared | Scope RBAC user_id | — | Bajo | Alta | Implementado | Bajo |
| COM-031 | AppError | Backend/Shared | Errores de dominio HTTP | — | Bajo | Alta | Implementado | Bajo |
| COM-032 | *.validator.js (×7) | Backend/Validator | Validación DTO entrada | inputValidation | Bajo | Alta | Implementado | Bajo |
| COM-033 | Models (ORM) | Backend/Model | Entidades tipadas | — | — | — | **No implementado** | — |
| COM-034 | AppRoutes.jsx | Frontend/Routing | 15 rutas lazy + guards | React Router, AuthContext | Medio | Alta | Implementado | Bajo |
| COM-035 | MainLayout.jsx | Frontend/Layout | Shell navegación PMV1/2 | routes, lucide-react | Medio | Alta | Implementado | Bajo |
| COM-036 | AuthContext.jsx | Frontend/Context | Estado sesión JWT | auth.service, localStorage | Medio | Alta | Implementado | Medio |
| COM-037 | ToastContext.jsx | Frontend/Context | Notificaciones UI | — | Bajo | Alta | Implementado | Bajo |
| COM-038 | ThemeContext.jsx | Frontend/Context | Tema claro/oscuro | localStorage | Bajo | Alta | Implementado | Bajo |
| COM-039 | client.js | Frontend/Service | Cliente HTTP fetch | config/api.js | Medio | Alta | Implementado | Bajo |
| COM-040 | auth.service.js | Frontend/Service | Login/logout API | client.js | Bajo | Alta | Implementado | Bajo |
| COM-041 | DashboardPage.jsx | Frontend/Page | Vista KPIs | Recharts, api | Medio | Alta | Implementado | Bajo |
| COM-042 | ProductoresPage.jsx | Frontend/Page | CRUD productores | api client | Medio | Alta | Implementado | Bajo |
| COM-043 | RegistroProduccionPage.jsx | Frontend/Page | Alta lotes/producción | api client | Medio | Alta | Implementado | Bajo |
| COM-044 | TrazabilidadPage.jsx | Frontend/Page | Timeline + QR | TrazabilidadTimeline | Medio | Alta | Implementado | Bajo |
| COM-045 | ModuloIAPage.jsx | Frontend/Page | Ejecutar predicción | ml.service | Medio | Alta | Implementado | Bajo |
| COM-046 | components/ui/* (×12) | Frontend/UI | Design system reutilizable | Tailwind | Bajo | Alta | Implementado | Bajo |
| COM-047 | AdminRoute.jsx | Frontend/Guard | Rutas solo admin | AuthContext, role utils | Bajo | Alta | Implementado | Bajo |
| COM-048 | schema.sql | BD/DDL | 39 tablas relacional | MySQL InnoDB | — | Alta | Implementado | Bajo |
| COM-049 | MySQL (Railway) | BD/Runtime | Persistencia producción | mysql2 pool | Medio | Alta | Implementado | Medio |
| COM-050 | Vercel SPA | Infra/Deploy | Hosting frontend | vite build | Bajo | Alta | Implementado | Bajo |
| COM-051 | Railway API | Infra/Deploy | Hosting backend | Node.js | Medio | Alta | Implementado | Medio |

**Total componentes matriz:** 51 (50 implementados, 1 no implementado: Models ORM)
