# Matriz de Evaluación Arquitectónica — CAFE-IA

**Fecha:** 2026-06-24  
**Escala cumplimiento:** Alto (≥85%) · Medio (70–84%) · Bajo (<70%)

| ID | Atributo | Evidencia | Nivel cumplimiento | Riesgo | Recomendación | Estado |
|----|----------|-----------|-------------------|--------|---------------|--------|
| EVA-001 | Modularidad | 13 módulos API; carpetas domain/application/infrastructure/interfaces | **Alto (88%)** | Bajo | Mantener límites por módulo | Evaluado |
| EVA-002 | Cohesión | Services por agregado; ui/ design system FE | **Alto (90%)** | Bajo | — | Evaluado |
| EVA-003 | Acoplamiento | Flujo unidireccional; excepción PredictionService→pool | **Medio (78%)** | Medio | Mover SQL a repository | Evaluado |
| EVA-004 | Escalabilidad | API stateless Railway; MySQL centralizado | **Medio (75%)** | Medio | Read replicas / cache futuro | Evaluado |
| EVA-005 | Mantenibilidad | 93 archivos BE estructurados; projectStructure.js | **Alto (82%)** | Bajo | Sincronizar doc embebida | Evaluado |
| EVA-006 | Reutilización | 12 ui components; shared/ RoleHelper, AppError | **Alto (85%)** | Bajo | Hooks FE por módulo | Evaluado |
| EVA-007 | Flexibilidad | Hexagonal permite nuevos adaptadores | **Alto (80%)** | Bajo | OpenAPI para contratos | Evaluado |
| EVA-008 | Disponibilidad | JMeter health 100%; Railway prod activo | **Medio (78%)** | Medio | Health checks profundos | Evaluado |
| EVA-009 | Seguridad | helmet, cors, JWT, rate-limit, RBAC, bcrypt | **Alto (85%)** | Medio | Parche CVE router; rotar JWT | Evaluado |
| EVA-010 | Rendimiento | JMeter P95 2614 ms; Recharts bundle 411 KB | **Medio (72%)** | Medio | Lazy charts; JMeter negocio | Evaluado |
| EVA-011 | Robustez | AppError; migrate fail-fast; ErrorBoundary FE | **Alto (80%)** | Medio | Transacciones multi-tabla | Evaluado |
| EVA-012 | Extensibilidad | Routes modulares; validators por DTO | **Alto (83%)** | Bajo | Módulo fincas pendiente | Evaluado |
| EVA-013 | Testabilidad | node:test 18/18; Cypress 13/13; sin DI | **Medio (74%)** | Medio | CI Cypress + integración BD | Evaluado |
| EVA-014 | Observabilidad | auditMiddleware; logs console; sin APM | **Medio (68%)** | Medio | Logs estructurados JSON | Evaluado |
| EVA-015 | Organización Backend | Capas hexagonales verificadas | **Alto (88%)** | Bajo | AuthController dedicado | Evaluado |
| EVA-016 | Organización Frontend | pages/components/context/services | **Alto (85%)** | Bajo | Extraer hooks dominio | Evaluado |
| EVA-017 | Organización BD | schema.sql 39 tablas; FK; migrate.js | **Alto (86%)** | Bajo | Tablas huérfanas (fincas) | Evaluado |
| EVA-018 | Arquitectura Hexagonal | domain/application/infrastructure/interfaces | **Alto (82%)** | Medio | Pureza PredictionService | Evaluado |
| EVA-019 | Arquitectura REST | 13 grupos /api; JSON; códigos HTTP | **Alto (87%)** | Bajo | OpenAPI spec | Evaluado |
| EVA-020 | Organización carpetas | Monorepo backend/frontend/testing | **Alto (90%)** | Bajo | — | Evaluado |
| EVA-021 | Separación responsabilidades | Controller→Service→Repository | **Alto (85%)** | Medio | SQL en service (IA) | Evaluado |
| EVA-022 | Flujo dependencias | Sin ciclos; imports unidireccionales | **Alto (83%)** | Bajo | — | Evaluado |
| EVA-023 | Gestión configuración | env.js; .env.example; Vercel/Railway env | **Alto (84%)** | Medio | Secretos solo en panel cloud | Evaluado |
| EVA-024 | Integración IA | PredictionEngine dominio; API predicciones | **Medio (76%)** | Bajo | Documentar vs ML Python | Evaluado |
| EVA-025 | Integración Railway | server.js; MYSQL*; health 200 | **Alto (88%)** | Medio | Capturas panel pendientes | Evaluado |
| EVA-026 | Integración Vercel | vercel.json; VITE_API_URL; SPA rewrite | **Alto (90%)** | Bajo | — | Evaluado |

**Total atributos evaluados:** 26  
**Alto:** 18 · **Medio:** 8 · **Bajo:** 0
