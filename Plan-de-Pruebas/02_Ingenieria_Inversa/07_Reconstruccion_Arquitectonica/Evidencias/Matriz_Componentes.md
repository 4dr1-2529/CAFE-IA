# Matriz de Componentes — Reconstrucción Arquitectónica

**Fecha:** 2026-06-24

| ID | Componente | Tipo | Responsabilidad | Dependencias | Comunicación | Estado | Riesgo |
|----|------------|------|-----------------|--------------|--------------|--------|--------|
| REC-001 | React SPA | Frontend | UI trazabilidad café | client.js, Context | HTTPS → API | Implementado | Bajo |
| REC-002 | client.js | Frontend/Service | Cliente HTTP fetch + JWT | config/api.js | REST JSON | Implementado | Bajo |
| REC-003 | AppRoutes.jsx | Frontend/Routing | 15 rutas lazy | React Router | Navegación interna | Implementado | Bajo |
| REC-004 | AuthContext | Frontend/Context | Sesión usuario | auth.service | localStorage ↔ API | Implementado | Medio |
| REC-005 | MainLayout | Frontend/Layout | Navegación PMV | routes constants | Props + children | Implementado | Bajo |
| REC-006 | Pages (×15) | Frontend | Vistas módulo | client.js, components | REST /api/* | Implementado | Bajo |
| REC-007 | components/ui | Frontend/UI | Design system | Tailwind | Props | Implementado | Bajo |
| REC-008 | Express app.js | Backend | Pipeline HTTP | helmet,cors,routes | HTTP in/out | Implementado | Bajo |
| REC-009 | server.js | Backend/Entry | Bootstrap + migrate | app, pool | TCP :PORT | Implementado | Medio |
| REC-010 | routes/index.js | Backend/API | Router /api | 14 sub-routers | HTTP routing | Implementado | Bajo |
| REC-011 | auth.routes | Backend/API | Login/logout/me | AuthService | POST/GET JSON | Implementado | Medio |
| REC-012 | Controllers (×13) | Backend | Adaptador HTTP | Services | req/res JSON | Implementado | Bajo |
| REC-013 | Services (×17) | Backend | Casos de uso | Repos, validators | Llamadas sync | Implementado | Bajo |
| REC-014 | Repositories (×11) | Backend | SQL encapsulado | pool.js | SQL parametrizado | Implementado | Bajo |
| REC-015 | PredictionEngine | Backend/Dominio | Heurística IA | — | Invocación sync | Implementado | Bajo |
| REC-016 | PredictionService | Backend/Service | Ejecutar IA + SQL | pool, Engine | SQL + dominio | Implementado | Medio |
| REC-017 | Middleware stack | Backend/Seguridad | auth rbac audit | jwt, RoleHelper | HTTP headers | Implementado | Medio |
| REC-018 | pool.js | Backend/Infra | Conexiones MySQL | mysql2 | TCP SSL MySQL | Implementado | Medio |
| REC-019 | migrate.js | Backend/Infra | DDL + seeds | schema.sql | SQL batch | Implementado | Medio |
| REC-020 | schema.sql | BD | 39 tablas DDL | MySQL | DDL | Implementado | Bajo |
| REC-021 | MySQL Railway | BD/Runtime | Persistencia | — | TCP 3306 | Implementado | Medio |
| REC-022 | Vercel CDN | Infra | Host SPA | git deploy | HTTPS estático | Implementado | Bajo |
| REC-023 | Railway API | Infra | Host Node API | git deploy | HTTPS REST | Implementado | Medio |
| REC-024 | GitHub Actions | DevOps/CI | test build sonar | repo | webhook push | Implementado | Bajo |
| REC-025 | SonarCloud | Calidad | Análisis estático | CI | API SaaS | Implementado | Bajo |
| REC-026 | Cypress E2E | Calidad | Pruebas UI | SPA local | HTTP browser | Implementado | Medio |
| REC-027 | JMeter | Calidad | Carga health | Railway API | HTTP load | Implementado | Medio |
| REC-028 | AuthController | Backend | — | — | — | **No implementado** | — |
| REC-029 | Models ORM | Backend | — | — | — | **No implementado** | — |
| REC-030 | ML Python API | IA/Externo | — | — | — | **No implementado** | — |

**Total filas matriz:** 30 componentes clave (27 implementados, 3 no implementados)
