# Matriz FURPS+ — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Total criterios:** 48  
**Estado:** Planificado (auditoría Paso 02 pendiente)

---

## F — Functionality

| ID | Atributo | Componente | Criterio | Evidencia | Prioridad | Estado |
|----|----------|------------|----------|-----------|-----------|--------|
| F-01 | Funciones implementadas | General | 59 features, 12 HU | Inventario IR | Alta | Planificado |
| F-02 | Casos de uso | Flujos PMV | Cypress PF-01–11 | cypress_last-run.json | Alta | Planificado |
| F-03 | Seguridad auth | JWT | 401 sin token | npm_test_backend.txt | Alta | Planificado |
| F-04 | Roles | RBAC | admin / cliente scope | PF-11, rbac.js | Alta | Planificado |
| F-05 | Integridad | Lotes | Transacción SQL | HAL-003 | Crítica | Planificado |
| F-06 | APIs REST | 13 routers | Contratos HTTP | routes/*.js | Alta | Planificado |
| F-07 | Validación | Validators | Body validado | integration.test | Media | Planificado |
| F-08 | Reportes | Export | PDF/Excel | PF-09 | Media | Planificado |
| F-09 | Chatbot | IA | POST /api/chatbot | PF-10 | Media | Planificado |
| F-10 | Auditoría | Sistema | Solo admin | auditoria.routes | Media | Planificado |

---

## U — Usability

| ID | Atributo | Componente | Criterio | Evidencia | Prioridad | Estado |
|----|----------|------------|----------|-----------|-----------|--------|
| U-01 | Facilidad de uso | UI | Formularios claros | Cypress | Media | Planificado |
| U-02 | Interfaz coherente | Design system | components/ui | Código FE | Media | Planificado |
| U-03 | Navegación | Layout | PMV1/PMV2/Sistema | AppRoutes | Alta | Planificado |
| U-04 | Accesibilidad | UI | Labels, contraste | axe pendiente | Baja | Planificado |
| U-05 | Responsive | Tailwind | Breakpoints | Páginas FE | Media | Planificado |
| U-06 | UX por rol | Dashboard | Admin vs cliente | PF-03, PF-04 | Alta | Planificado |
| U-07 | Mensajes error | API/FE | apiResponse | Tests | Baja | Planificado |

---

## R — Reliability

| ID | Atributo | Componente | Criterio | Evidencia | Prioridad | Estado |
|----|----------|------------|----------|-----------|-----------|--------|
| R-01 | Disponibilidad | Producción | HTTP 200 Railway/Vercel | health JSON, JMeter | Alta | Planificado |
| R-02 | Recuperación | Deploy | migrate.js | HAL-001 | Media | Planificado |
| R-03 | Robustez API | Express | 404, handlers | npm_test_backend | Alta | Planificado |
| R-04 | Tolerancia errores | Validators | Mensajes usuario | integration.test | Media | Planificado |
| R-05 | Consistencia datos | MySQL | Transacciones/seeds | HAL-003, HAL-023 | Alta | Planificado |
| R-06 | Pool conexiones | database.js | DB_POOL_* | env.example | Media | Planificado |
| R-07 | Sesiones | Auth | refresh/logout | auth.routes | Media | Planificado |

---

## P — Performance

| ID | Atributo | Componente | Criterio | Evidencia | Prioridad | Estado |
|----|----------|------------|----------|-----------|-----------|--------|
| P-01 | Tiempo respuesta | API health | P95 ≈ 2614 ms | jmeter_resumen.json | Alta | Planificado |
| P-02 | Throughput | JMeter | RPM 6320 | jmeter_resumen.json | Media | Planificado |
| P-03 | Build frontend | Vite | Chunks y tiempo | npm_build_frontend.txt | Media | Planificado |
| P-04 | Bundle Recharts | Dashboard | ~411 KB | build log | Baja | Planificado |
| P-05 | Consultas SQL | Repositories | Eficiencia | Código | Media | Planificado |
| P-06 | Rate limiting | app.js | 500/15min | app.js | Media | Planificado |
| P-07 | JMeter negocio | — | Login, lotes JWT | Pendiente | Alta | Planificado |

---

## S — Supportability

| ID | Atributo | Componente | Criterio | Evidencia | Prioridad | Estado |
|----|----------|------------|----------|-----------|-----------|--------|
| S-01 | Mantenibilidad | Hexagonal | Evaluación 7,8/10 | IR Paso 06 | Alta | Planificado |
| S-02 | Modularidad | API | 13 módulos, 88 % | IR Paso 05 | Alta | Planificado |
| S-03 | Escalabilidad | Railway | Pool, plan | IR Paso 09 | Media | Planificado |
| S-04 | Documentación | README | HU en app | README.md | Alta | Planificado |
| S-05 | Pruebas | Tests | 18 BE + 11 Cypress | logs | Alta | Planificado |
| S-06 | CI | GitHub Actions | Pipeline | ci.yml | Alta | Planificado |
| S-07 | Análisis estático | Sonar/ESLint | Quality gate | CORRECCIONES_SONAR | Alta | Planificado |
| S-08 | Cobertura | Sonar | lcov | Pendiente (0 %) | Alta | Planificado |

---

## + — Extendidos

| ID | Atributo | Componente | Criterio | Evidencia | Prioridad | Estado |
|----|----------|------------|----------|-----------|-----------|--------|
| X-01 | Seguridad | JWT/helmet/CORS | Baseline | app.js, env.js | Alta | Planificado |
| X-02 | Portabilidad | Node 20 ESM | package.json | package.json | Media | Planificado |
| X-03 | Compatibilidad | React 18 | Navegador | Cypress | Media | Planificado |
| X-04 | Configuración | 38 variables | env.example | backend_env.example | Alta | Planificado |
| X-05 | Instalación | npm scripts | README | README | Media | Planificado |
| X-06 | Despliegue | Railway/Vercel | HTTP 200 | health JSON | Alta | Planificado |
| X-07 | Monitoreo | Health | Sin APM formal | health JSON | Media | Planificado |

---

## Resumen por categoría

| Categoría | Criterios |
|-----------|-----------|
| F | 10 |
| U | 7 |
| R | 7 |
| P | 7 |
| S | 8 |
| + | 9 |
| **Total** | **48** |

---

*Versión Excel: `Matriz_FURPS.xlsx`*
