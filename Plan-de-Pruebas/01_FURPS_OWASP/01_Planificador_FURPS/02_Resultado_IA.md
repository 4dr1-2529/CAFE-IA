# Plan de Evaluación FURPS+ — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 1 — Planificador FURPS  
**Fecha:** 24 de junio de 2026  
**Modelo:** FURPS+ (Functionality, Usability, Reliability, Performance, Supportability + atributos extendidos)

---

## 1. Objetivos

| # | Objetivo | Descripción |
|---|----------|-------------|
| O1 | Planificar auditoría FURPS+ | Definir atributos, criterios y evidencias para evaluar calidad integral de CAFE-IA |
| O2 | Mapear componentes reales | Vincular cada atributo FURPS+ con módulos verificados en código y despliegue |
| O3 | Establecer trazabilidad ICACIT | Preparar matriz, checklist y cronograma aptos para informe académico |
| O4 | Basar evaluación en hechos | Utilizar únicamente funcionalidades, tecnologías y evidencias existentes |
| O5 | Habilitar fases posteriores | Servir de entrada al Auditor FURPS (Paso 02) y Auditor de Implementación (Paso 03) |

---

## 2. Alcance

### 2.1 Incluido

| Área | Elementos verificados en CAFE-IA |
|------|----------------------------------|
| **Frontend** | 15 páginas React (`frontend/src/pages/`), rutas `AppRoutes.jsx`, Tailwind, Recharts |
| **Backend** | API REST Express hexagonal, 13 grupos de rutas bajo `/api` |
| **Base de datos** | MySQL, `schema.sql`, 39 tablas, migración `migrate.js` |
| **Autenticación** | JWT, bcrypt, roles admin/cliente, middleware `auth.js`, `rbac.js` |
| **Módulos negocio** | Lotes, producción, trazabilidad, calidad, predicciones, dashboard, reportes, chatbot, auditoría |
| **Despliegue** | Railway (API + MySQL), Vercel (SPA) |
| **CI/CD** | GitHub Actions (`ci.yml`), SonarCloud |
| **Pruebas** | 18 tests backend, 11 specs Cypress, JMeter health |

### 2.2 Excluido de esta fase

- Ejecución de la auditoría (corresponde al Paso 02).
- Verificación de implementación de mejoras (Paso 03).
- Evaluación OWASP Top 10 (bloque `04_Planificador_OWASP` en adelante).
- Modificación del código fuente.

### 2.3 Límites del sistema analizado

- Motor IA en producción: heurístico (`PredictionEngine`), no `ml/train_model.py`.
- Permisos granulares: tablas en BD sin enforcement en API.
- Fincas: entidad en esquema sin CRUD expuesto.

---

## 3. Metodología

```text
Fase 1 (este paso)     → Planificación: matriz, checklist, cronograma
Fase 2 (Auditor)       → Evaluación por atributo FURPS+ con evidencias
Fase 3 (Implementación)→ Verificación de mejoras aplicadas
Fase 4+                → OWASP, auditoría integral, conclusión
```

### 3.1 Fuentes de información

| Fuente | Uso |
|--------|-----|
| Código `cafe-cursor/` | Rutas, servicios, middleware, páginas |
| `Plan-de-Pruebas/02_Ingenieria_Inversa/` | Hallazgos HAL, arquitectura, dominio, entorno |
| Logs y métricas | npm test, audit, build, JMeter, Cypress |
| Producción | `railway_health_response.json`, `vercel_status.json` |
| Configuración | `.env.example`, `vercel.json`, `ci.yml`, `sonar-project.properties` |

### 3.2 Escala de evaluación planificada (Paso 02)

| Nivel | Significado |
|-------|-------------|
| Cumple | Atributo satisfecho con evidencia verificable |
| Parcial | Implementado con brechas documentadas |
| No cumple | Ausente o insuficiente |
| N/A | No aplica al alcance PMV |

---

## 4. Criterios de evaluación por categoría FURPS+

### F — Functionality

| ID | Criterio | Componente CAFE-IA | Evidencia planificada |
|----|----------|-------------------|----------------------|
| F-01 | Funciones implementadas vs inventario | 59 features, 12 HU | Inventario funcional IR Paso 03 |
| F-02 | Casos de uso operativos | Login, lotes, trazabilidad, calidad, IA, reportes | Cypress PF-01 a PF-11 |
| F-03 | Seguridad funcional (auth) | JWT, 401/403 | `npm_test_backend.txt` |
| F-04 | Roles admin/cliente | RBAC, scope `user_id` | PF-11, middleware rbac |
| F-05 | Integridad transaccional | LoteService.create | Código + HAL-003 |
| F-06 | Contratos API REST | 13 routers | Rutas en `interfaces/http/routes/` |
| F-07 | Validación de entrada | validators por módulo | Tests integración |
| F-08 | Exportación reportes | PDF/Excel | PF-09, ReportesController |
| F-09 | Chatbot intents | POST `/api/chatbot` | PF-10 |
| F-10 | Auditoría de acciones | módulo admin | AuditoriaPage, rutas auditoría |

### U — Usability

| ID | Criterio | Componente | Evidencia planificada |
|----|----------|------------|----------------------|
| U-01 | Facilidad de uso | Formularios, tablas, feedback | Cypress + revisión UI |
| U-02 | Interfaz coherente | Design system `components/ui/` | Código frontend |
| U-03 | Navegación | MainLayout, menú PMV1/PMV2/Sistema | AppRoutes.jsx |
| U-04 | Accesibilidad | Labels, contraste, teclado | Revisión manual + lint |
| U-05 | Diseño responsive | Tailwind breakpoints | Vistas principales |
| U-06 | UX por rol | Dashboard admin vs cliente | PF-03, PF-04 |
| U-07 | Mensajes de error | apiResponse, toasts | Tests E2E |

### R — Reliability

| ID | Criterio | Componente | Evidencia planificada |
|----|----------|------------|----------------------|
| R-01 | Disponibilidad producción | Railway, Vercel | health JSON, JMeter 100 % |
| R-02 | Recuperación ante fallos | migrate.js, seeds | Historial HAL-001 |
| R-03 | Robustez API | asyncHandler, error middleware | Tests 404, 401 |
| R-04 | Tolerancia a errores | Validators, mensajes usuario | integration.test |
| R-05 | Consistencia datos | Transacciones, seeds | HAL-003, HAL-023 |
| R-06 | Pool MySQL | database.js, DB_POOL_* | Config env |
| R-07 | Sesiones refresh | AuthService, tabla sesiones | auth.routes.js |

### P — Performance

| ID | Criterio | Componente | Evidencia planificada |
|----|----------|------------|----------------------|
| P-01 | Tiempo respuesta API health | JMeter 500 req | `jmeter_resumen.json` (P95 ≈ 2614 ms) |
| P-02 | Throughput | RPM documentado | JMeter: 6320 req/min |
| P-03 | Build frontend | Vite bundle | `npm_build_frontend.txt` |
| P-04 | Chunk Recharts | Dashboard | Build log (~411 KB) |
| P-05 | Consultas SQL | Repositories | Revisión código Paso 02 |
| P-06 | Rate limiting | express-rate-limit 500/15min | app.js |
| P-07 | Escenarios negocio JMeter | — | **Pendiente** (solo health hoy) |

### S — Supportability

| ID | Criterio | Componente | Evidencia planificada |
|----|----------|------------|----------------------|
| S-01 | Mantenibilidad | Arquitectura hexagonal | IR Pasos 05–07 |
| S-02 | Modularidad | 13 módulos API | Evaluación 88 % modularidad |
| S-03 | Escalabilidad | Railway, pool BD | Config + límites plan |
| S-04 | Documentación | README, páginas sistema | README.md, HistoriasUsuarioPage |
| S-05 | Facilidad de pruebas | node:test, Cypress | 18/18 BE, 13/13 Cypress |
| S-06 | CI automatizado | GitHub Actions | ci.yml |
| S-07 | Análisis estático | SonarCloud, ESLint | Sonar properties, lint log |
| S-08 | Cobertura código | Sonar 0 % | **Pendiente** instrumentar lcov |

### + — Atributos extendidos

| ID | Criterio | Componente | Evidencia planificada |
|----|----------|------------|----------------------|
| X-01 | Seguridad (JWT, helmet, CORS) | app.js, env.js | Tests + config |
| X-02 | Portabilidad | Node 20, ES modules | package.json |
| X-03 | Compatibilidad navegadores | React 18, Vite | Build + Cypress |
| X-04 | Configuración | 38 variables env | Paso 10 IR |
| X-05 | Instalación | README scripts npm | README.md |
| X-06 | Despliegue | Railway + Vercel | health JSON, vercel.json |
| X-07 | Monitoreo | /api/health, auditoría | health response; APM **pendiente** |

---

## 5. Componentes que serán evaluados

| # | Componente | Ruta / referencia | Atributos FURPS+ principales |
|---|------------|-------------------|------------------------------|
| 1 | API Auth | `auth.routes.js`, AuthService | F, R, X |
| 2 | API Lotes | `lotes.routes.js`, LoteService | F, R, P |
| 3 | API Productores | `productores.routes.js` | F, U |
| 4 | API Producción | `produccion.routes.js` | F, R |
| 5 | API Trazabilidad | `trazabilidad.routes.js` | F, U |
| 6 | API Calidad | `calidad.routes.js`, CalidadService | F, F-10 calidad |
| 7 | API Predicciones | `predicciones.routes.js`, PredictionEngine | F, P |
| 8 | API Dashboard | `dashboard.routes.js`, Recharts FE | F, P, U |
| 9 | API Reportes | `reportes.routes.js`, pdfkit/exceljs | F, P |
| 10 | API Chatbot | `chatbot.routes.js` | F, U |
| 11 | API Auditoría | `auditoria.routes.js` | F, X-07 |
| 12 | API Usuarios | `usuarios.routes.js` | F, X-01 |
| 13 | API Base datos | `base-datos.routes.js` | F, X-01 (admin) |
| 14 | Frontend páginas | 15 pages + Login | U, F |
| 15 | MySQL | schema.sql, repositories | F, R, P |
| 16 | Railway API | Producción | R, P, X-06 |
| 17 | Vercel SPA | vercel.json | U, X-06 |
| 18 | CI/CD | `.github/workflows/ci.yml` | S, X |
| 19 | Seguridad transversal | helmet, rate-limit, CORS, JWT | X-01, F-03 |

---

## 6. Riesgos de la evaluación

| ID | Riesgo | Probabilidad | Impacto | Mitigación |
|----|--------|--------------|---------|------------|
| RE-01 | Evaluar funcionalidades no implementadas | Media | Alto | Cruzar con inventario IR Paso 03 |
| RE-02 | Evidencias Cypress desactualizadas | Media | Medio | Re-ejecutar antes de auditoría |
| RE-03 | JMeter solo health — falsa confianza P | Alta | Medio | Planificar escenarios negocio en Paso 02 |
| RE-04 | SonarCloud sin captura en repo | Media | Medio | Exportar dashboard post-CI |
| RE-05 | Acceso limitado a paneles Railway/Vercel | Baja | Medio | Usar health JSON + documentación IR |
| RE-06 | Confundir ML script con runtime heurístico | Media | Alto | Documentar alcance IA en matriz |
| RE-07 | Excel/matrices sin materializar | Baja | Bajo | Generar Matriz_FURPS en este paso |

---

## 7. Evidencias requeridas

### 7.1 Disponibles (copiadas en `Evidencias/`)

| Evidencia | Uso FURPS+ |
|-----------|------------|
| `README_proyecto.md` | S, X-05, alcance funcional |
| `npm_test_backend.txt` | F-03, R-03, S-05 |
| `npm_audit_*.txt` | X-01 supply chain |
| `npm_build_frontend.txt` | P-03, P-04 |
| `npm_lint_frontend.txt` | S-07, U |
| `railway_health_response.json` | R-01, X-06 |
| `vercel_status.json` | R-01, X-06 |
| `cypress_last-run.json` | F-02, U, S-05 |
| `jmeter_resumen.json` | P-01, P-02, R-01 |
| `CORRECCIONES_SONARQUBE.md` | S-07 |
| `backend_env.example.txt` | X-04 |
| `ci.yml` | S-06 |
| `vercel.json` | X-06 |
| `sonar-project.properties` | S-07 |

### 7.2 Pendientes de incorporar

| Evidencia | Atributos afectados |
|-----------|---------------------|
| Capturas SonarCloud Quality Gate | S-07, S-08 |
| Capturas paneles Railway/Vercel | X-06, X-07 |
| Videos Cypress | U, F-02 |
| JMeter escenarios negocio (login, lotes) | P-07 |
| Cobertura lcov / c8 | S-08 |
| Prueba de accesibilidad automatizada (axe) | U-04 |

*Evidencia pendiente de incorporar.*

---

## 8. Herramientas que se utilizarán

| Herramienta | Atributos | Fase |
|-------------|-----------|------|
| **Revisión código estática** | F, S, X | Auditor (02) |
| **node:test** (backend) | F, R, S | Auditor (02) |
| **Cypress** (11 specs) | F, U | Auditor (02) |
| **npm audit** | X-01 | Auditor (02) |
| **ESLint** | S-07, U | Auditor (02) |
| **SonarCloud** | S-07, S-08 | Auditor (02) |
| **Apache JMeter** | P, R | Auditor (02) — ampliar escenarios |
| **Matriz FURPS** (este paso) | Todos | Planificación + Auditor |
| **Documentación IR** (Pasos 01–13) | Todos | Contexto y trazabilidad |
| **curl / health checks** | R-01, X-06 | Auditor (02) |

---

## 9. Entregables del planificador

| Entregable | Ubicación |
|------------|-----------|
| Plan de evaluación | `Evidencias/Plan_Evaluacion.md` |
| Checklist FURPS | `Evidencias/Checklist_FURPS.md` |
| Cronograma | `Evidencias/Cronograma_Evaluacion.md` |
| Matriz FURPS | `Evidencias/Matriz_FURPS.md` + `.xlsx` |
| Resumen ejecutivo | `Evidencias/Resumen_Ejecutivo.md` |
| Índice evidencias | `Evidencias/INDICE_EVIDENCIAS.md` |

---

## 10. Resumen cuantitativo del plan

| Métrica | Valor |
|---------|-------|
| Criterios FURPS+ planificados | 48 |
| Componentes a evaluar | 19 |
| Módulos API | 13 |
| Páginas frontend | 15 |
| Specs Cypress | 11 |
| Riesgos de evaluación | 7 |
| Evidencias copiadas | 14+ |
| Evidencias pendientes | 6 tipos |

---

*Plan listo para ejecución en Paso 02 — Auditor FURPS+.*
