# Informe Técnico Consolidado — Ingeniería Inversa CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Repositorio analizado:** `cafe-cursor/`  
**Actividad:** Paso 12 — Generador Final  
**Fecha:** 24 de junio de 2026  
**Alcance:** Consolidación Pasos 01–11

---

## Resumen ejecutivo

Se ejecutó ingeniería inversa sobre CAFE-IA en **11 pasos analíticos**, generando **327 archivos** bajo `Plan-de-Pruebas/02_Ingenieria_Inversa/` sin modificar el código fuente. El sistema es un monorepo full-stack (Node.js/Express + React/Vite + MySQL) desplegado en **Railway** (API) y **Vercel** (SPA), con **12 historias de usuario** implementadas y **48 hallazgos** de mejora consolidados.

**Completitud documental global:** 96 % (falta `05_Trazabilidad.md` en Paso 01; 21 archivos Excel de matrices referenciados pero no generados en disco).

---

## Paso 1 — Análisis de Logs

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Analizar logs de build, tests, auditoría npm, lint, Cypress, JMeter y operación en producción para identificar estado operativo y hallazgos iniciales. |
| **Resultado obtenido** | Proyecto **operativo en producción** (Railway HTTP 200, Vercel HTTP 200). Tests backend **18/18 OK**. Build frontend exitoso. Cypress documentado **13/13 OK**. JMeter health **500/500** sin errores. **8 CVE npm** identificados. CI con `SKIP_INTEGRATION=1`. Incidente crítico `migrate.js` **corregido**. |
| **Documentos generados** | `01_Prompt.md`, `02_Resultado_IA.md`, `03_Mejoras.md`, `04_Conclusiones.md`; `Evidencias/` (Matriz_Hallazgos.md, INDICE, Resumen, logs). **Falta:** `05_Trazabilidad.md`. |
| **Evidencias recopiladas** | `npm_test_backend.txt`, `npm_audit_backend.txt`, `npm_audit_frontend.txt`, `npm_lint_frontend.txt`, `npm_build_frontend.txt`, `railway_health_response.json`, `vercel_status.json`, `cypress_last-run.json`, `jmeter_resumen.json`, `CORRECCIONES_SONARQUBE.md`, `backend_env.example.txt`. Capturas Railway/Vercel/Sonar: **pendientes**. |
| **Estado** | ⚠ **Parcial** |

---

## Paso 2 — Dependencias

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Inventariar y evaluar dependencias backend/frontend: versiones, CVE, uso real y riesgos de supply chain. |
| **Resultado obtenido** | **29 dependencias backend** y **~40 frontend** catalogadas. CVE HIGH en `form-data` (transitiva). CVE moderate en `react-router-dom` (<6.30.4). Overrides `tmp`/`uuid` aplicados. Cypress, mermaid-cli y recharts identificados. Dependabot no evidenciado. |
| **Documentos generados** | 5 documentos núcleo + `Evidencias/` (Inventario_Dependencias.md, Matriz_Dependencias.md, Dependencias_Backend/Frontend.md, `npm_list_*.json`, `package*.json`). |
| **Evidencias recopiladas** | `npm_list_backend.json`, `npm_list_frontend.json`, `backend_package.json`, `frontend_package.json`, locks, auditorías npm del Paso 01. `Matriz_Dependencias.xlsx`: **pendiente de incorporar**. |
| **Estado** | ✅ **Completo** (documentación); Excel matriz: ❌ pendiente |

---

## Paso 3 — Descubrimiento Funcional

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Reconstruir funcionalidad desde código, rutas, componentes y HUs: módulos, flujos y brechas. |
| **Resultado obtenido** | **59 features** en **8 módulos**. **12 HUs PMV** implementadas. Flujo lote → trazabilidad → calidad → predicción IA. Brechas: fincas sin CRUD, lotes inmutables, inventario sin UI, E2E incompleto en admin. |
| **Documentos generados** | 5 documentos núcleo + Inventario_Funcional, Matriz_Modulos, Casos_Uso, Flujos, README. |
| **Evidencias recopiladas** | Inventarios markdown, copias README, rutas documentadas. Excel: **pendiente**. |
| **Estado** | ✅ **Completo** |

---

## Paso 4 — Descubrimiento Tecnológico

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Documentar stack tecnológico completo: lenguajes, frameworks, herramientas CI/CD, testing y calidad. |
| **Resultado obtenido** | Backend: Node 20, Express 4.22, mysql2, JWT, bcrypt, helmet, pdfkit, exceljs. Frontend: React 18, Vite 5, React Router 6.30.3, Recharts, Tailwind. CI: GitHub Actions, SonarCloud, npm audit. ML: script Python no integrado en runtime. |
| **Documentos generados** | 5 documentos núcleo + Stack_Tecnologico, Inventario_Tecnologico, Matriz_Tecnologias, configs CI. |
| **Evidencias recopiladas** | `github_actions_ci.yml`, `sonar-project.properties`, package locks, build logs. |
| **Estado** | ✅ **Completo** |

---

## Paso 5 — Detección Arquitectónica

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Identificar patrones arquitectónicos, capas, componentes y anti-patrones desde estructura de código. |
| **Resultado obtenido** | Arquitectura **hexagonal** reconocible: interfaces (controllers) → application (services) → domain → infrastructure (repositories). **13 controllers**, **14+ services**. Anti-patrones: SQL en PredictionService, rutas duplicadas, permisos sin enforcement. |
| **Documentos generados** | 5 documentos núcleo + 7 diagramas Mermaid (.mmd/.md), Inventario_Componentes, Matriz_Componentes. |
| **Evidencias recopiladas** | Diagramas arquitectura, capas, módulos, dependencias, README. |
| **Estado** | ✅ **Completo** |

---

## Paso 6 — Evaluación Arquitectónica

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Evaluar atributos de calidad: mantenibilidad, seguridad, escalabilidad, testabilidad, desacoplamiento. |
| **Resultado obtenido** | Puntuación global **~8,0/10**. Fortalezas: separación capas, JWT, rate-limit. Debilidades: transacciones BD, cobertura 0 % Sonar, Cypress fuera CI, CVE pendientes. |
| **Documentos generados** | 5 documentos núcleo + Matriz_Atributos_Calidad, Matriz_Evaluacion_Arquitectonica, Resumen. |
| **Evidencias recopiladas** | Matrices evaluación, referencias a tests y auditorías. |
| **Estado** | ✅ **Completo** |

---

## Paso 7 — Reconstrucción Arquitectónica

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Reconstruir arquitectura lógica, física y de datos con inventario de **45 componentes**. |
| **Resultado obtenido** | Mapa completo controllers → services → repositories → MySQL. Flujos auth, lotes, calidad, reportes, IA heurística documentados. 7 diagramas (lógica, física, datos, secuencia, despliegue). |
| **Documentos generados** | 5 documentos núcleo + Inventario_Componentes (45), Matriz_Componentes, 7 diagramas Mermaid. |
| **Evidencias recopiladas** | Diagramas, flujos, inventario componentes. |
| **Estado** | ✅ **Completo** |

---

## Paso 8 — Reconstrucción del Dominio

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Modelar dominio de negocio: entidades, reglas, procesos y relaciones desde `schema.sql` y código. |
| **Resultado obtenido** | **39 tablas** MySQL; **~14 entidades operativas** en aplicación. **16 procesos** de negocio. **28+ reglas** documentadas. Brechas: fincas, permisos, notificaciones huérfanas. |
| **Documentos generados** | 5 documentos núcleo + Inventario_Entidades, Matriz_Procesos, Matriz_Reglas_Negocio, 5 diagramas dominio, `schema.sql`. |
| **Evidencias recopiladas** | `schema.sql`, diagramas ER/procesos, README. |
| **Estado** | ✅ **Completo** |

---

## Paso 9 — Reconstrucción del Entorno

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Documentar entornos desarrollo, CI, staging y producción; infraestructura y herramientas. |
| **Resultado obtenido** | Dev local (Node + MySQL). Prod: Railway API + MySQL, Vercel SPA. CI GitHub Actions sin CD automático. Sin Docker. `render.yaml` alternativo sin uso claro. Backups no documentados. |
| **Documentos generados** | 5 documentos núcleo + Inventario_Entorno, Matriz_Infraestructura, Matriz_Herramientas, 5 diagramas entorno, configs. |
| **Evidencias recopiladas** | `vercel.json`, `github_actions_ci.yml`, `render.yaml`, JSON health Railway/Vercel, CORRECCIONES_SONARQUBE. |
| **Estado** | ✅ **Completo** |

---

## Paso 10 — Variables de Entorno

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Inventariar y clasificar variables de entorno backend/frontend: obligatorias, opcionales, secretos, entornos. |
| **Resultado obtenido** | **38 variables** catalogadas. Paridad `MYSQL*` local/Railway. `JWT_SECRET` ≥32 chars validado. `ADMIN_SEED_PASSWORD` ausente en prod. Riesgo `.env` local. Scripts con vars no documentadas en `.env.example`. |
| **Documentos generados** | 5 documentos núcleo + Inventario_Variables, Matriz_Variables, Configuracion_Backend/Frontend. |
| **Evidencias recopiladas** | `.env.example`, `env.js`, `database.js`, configs Vercel/Railway. |
| **Estado** | ✅ **Completo** |

---

## Paso 11 — Hallazgos

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Consolidar hallazgos de pasos 1–10 en matriz única, plan de acción, riesgos y dashboard. |
| **Resultado obtenido** | **48 hallazgos** HAL-001–048 + **7 positivos** HAL-P01–P07. **46 pendientes**, **9 corregidos/verificados**. Madurez software **7,7/10**. 1 crítico pendiente (HAL-003 transacción lote). |
| **Documentos generados** | 5 documentos núcleo + Matriz_Hallazgos, Matriz_Riesgos, Plan_Accion, Dashboard, Resumen, INDICE. |
| **Evidencias recopiladas** | Matriz consolidada, riesgos, plan 38 acciones, copias evidencias Paso 01. |
| **Estado** | ✅ **Completo** |

---

## Síntesis de métricas globales

| Métrica | Valor |
|---------|-------|
| Archivos documentales (01–11) | 327 |
| Documentos núcleo | 54 / 55 |
| Matrices Markdown | 35+ |
| Diagramas Mermaid | 24 |
| Archivos Excel (pasos 01–11) | 0 en disco / 21 referenciados |
| Hallazgos mejora | 48 |
| Producción verificada | Railway + Vercel HTTP 200 |

---

## Veredicto consolidado

La Ingeniería Inversa CAFE-IA es **representativa, trazable y apta para anexo ICACIT**, con observaciones en: (1) trazabilidad Paso 01, (2) archivos Excel de matrices no materializados, (3) evidencias visuales cloud pendientes. Ver `Evidencias/AUDITORIA_FINAL.md` para veredicto formal.

---

*Documento generado en Paso 12 — Generador Final. Sin modificación del código fuente CAFE-IA.*
