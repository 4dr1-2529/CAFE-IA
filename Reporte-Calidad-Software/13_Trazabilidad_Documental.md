# 13 — Trazabilidad Documental

Documento de trazabilidad **Requisito → Módulo → Código → Prueba → Matriz → Evidencia → Conclusión** para CAFE-IA (PMV1 + PMV2).

**Fuente:** código en `cafe-cursor/`, matrices en `Matrices/`, evidencias en `Evidencias/` y `Reportes/`.

---

## Leyenda

| Símbolo | Significado |
|---------|-------------|
| ✔ | Implementado y verificado |
| ⚠ | Parcial o con deuda documentada |
| ✗ | No implementado / pendiente manual |
| — | No aplica |

---

## PMV1 — Operaciones core

### TR-01 — Autenticación y sesión (Login)

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | HU01 — Login con JWT y roles admin/cliente |
| **Módulo** | Login `/login` |
| **Código** | `AuthService.js`, `auth.routes.js`, `LoginPage.jsx`, `AuthContext.jsx`, `client.js` |
| **Prueba** | PF-01, PF-02 Cypress; `integration.test.js` (bloqueado migrate.js) |
| **Matriz** | Matriz_FURPS F-01; Matriz_Casos_Prueba PF-01/PF-02; Matriz_OWASP A07 |
| **Evidencia** | `Reportes/cypress_last-run.json`; captura E-01–E-04 (pendiente PNG) |
| **Conclusión** | ✔ Autenticación operativa; JWT en localStorage (riesgo XSS documentado) |

---

### TR-02 — Gestión de usuarios (admin)

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | RBAC — solo admin gestiona usuarios |
| **Módulo** | Usuarios `/usuarios` |
| **Código** | `usuarios.routes.js`, `UsuarioController.js`, `UsuarioService.js`, `AdminRoute.jsx` |
| **Prueba** | PF-11 (menú admin); sin spec dedicado |
| **Matriz** | Matriz_FURPS F-02; Matriz_Riesgos Cypress gap usuarios |
| **Evidencia** | E-07, E-08 (pendiente); `adminGuard` en rbac.js |
| **Conclusión** | ✔ Backend protegido; ⚠ E2E usuarios incompleto |

---

### TR-03 — Productores CRUD

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | HU01 — CRUD productores con scope cliente |
| **Módulo** | Productores `/productores` |
| **Código** | `productores.routes.js`, `ProductorService.js`, `ProductorRepository.js`, `RoleHelper.assertProductorAccess` |
| **Prueba** | PF-05; `integration.test.js` listar (bloqueado) |
| **Matriz** | Matriz_FURPS F-03; Matriz_Casos_Prueba PF-05 |
| **Evidencia** | E-09, E-10; Cypress JSON 13/13 |
| **Conclusión** | ✔ CRUD funcional con validación `validateProductorBody` |

---

### TR-04 — Registro de lotes y producción

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | HU02 — Registro lote/producción |
| **Módulo** | Registro `/registro` |
| **Código** | `lotes.routes.js`, `produccion.routes.js`, `LoteService.js`, `ProduccionService.js` |
| **Prueba** | PF-06; HU02 lotes 401/400 (bloqueado migrate) |
| **Matriz** | Matriz_FURPS F-04/F-05; Matriz_Riesgos duplicidad lotes/produccion |
| **Evidencia** | E-11, E-12 |
| **Conclusión** | ✔ Operativo; ⚠ deuda conceptual lotes vs produccion (AUDITORIA_TECNICA) |

---

### TR-05 — Trazabilidad por etapas

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | HU03 — Trazabilidad + QR |
| **Módulo** | Trazabilidad `/trazabilidad` |
| **Código** | `trazabilidad.routes.js`, `TrazabilidadService.js`, `LoteQrPanel.jsx`, `react-qr-code` |
| **Prueba** | PF-07 |
| **Matriz** | Matriz_FURPS F-08 |
| **Evidencia** | E-13, E-14 |
| **Conclusión** | ✔ Timeline y QR implementados |

---

### TR-06 — Control de calidad sensorial

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | HU04 — Evaluación 1-10 y puntaje compuesto |
| **Módulo** | Calidad `/calidad` |
| **Código** | `calidad.routes.js`, `CalidadService.js`, alias `/api/evaluaciones` |
| **Prueba** | `calidad.service.test.js` 3/3; sin Cypress PF calidad |
| **Matriz** | Matriz_FURPS F-09; Matriz_Casos_Prueba BE-cal |
| **Evidencia** | E-15, E-16; `documentacion-proyecto/MATRIZ_PRUEBAS_HU.md` |
| **Conclusión** | ✔ Lógica calidad probada unitariamente; ⚠ sin E2E |

---

### TR-07 — Dashboard analítico

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | HU06 — KPIs dashboard |
| **Módulo** | Dashboard `/` |
| **Código** | `DashboardController.js`, `DashboardRepository.js`, `DashboardPage.jsx`, Recharts |
| **Prueba** | PF-03, PF-04; GET /dashboard/metrics (bloqueado) |
| **Matriz** | Matriz_FURPS F-06 |
| **Evidencia** | E-05, E-06 |
| **Conclusión** | ✔ KPIs por rol admin/cliente verificados E2E |

---

### TR-08 — Reportes y exportación

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | HU06 — Reportes PDF/Excel |
| **Módulo** | Reportes `/reportes` |
| **Código** | `reportes.routes.js`, `ReportesService.js`, `ReportExportService.js`, exceljs, pdfkit |
| **Prueba** | PF-09; export no probado E2E |
| **Matriz** | Matriz_FURPS F-07; Matriz_OWASP SQL mitigado reportesSql |
| **Evidencia** | E-17, E-18 |
| **Conclusión** | ✔ Consulta reportes E2E; ⚠ export PDF/Excel sin prueba automatizada |

---

### TR-09 — Consulta base de datos (UI)

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | Visualización esquema 39 tablas |
| **Módulo** | Base datos `/basedatos` |
| **Código** | `BaseDatosController.js`, `BaseDatosService.js`, `schema.sql` |
| **Prueba** | — |
| **Matriz** | Matriz_FURPS F-13 |
| **Evidencia** | E-25, E-26; `ESQUEMA_RELACIONAL.md` copiado |
| **Conclusión** | ✔ Resumen tablas vía API readGuard |

---

## PMV2 — Mejoras inteligentes

### TR-10 — Predicción IA bajo demanda

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | HU05 — Predicción por lote |
| **Módulo** | Módulo IA `/ia` |
| **Código** | `PrediccionController.js`, `PrediccionService.js` → `PredictionService.js` → `PredictionEngine.js` |
| **Prueba** | PF-08; `prediction.test.js` 2/2 |
| **Matriz** | Matriz_FURPS F-10; Matriz_Casos_Prueba BE-pred |
| **Evidencia** | E-23, E-24; `ml/metrics.json` (evidencia académica) |
| **Conclusión** | ✔ Motor heurístico v2; ⚠ ml/Python no integrado en runtime |

---

### TR-11 — Chatbot IA

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | PMV2 — Asistente consultas lenguaje natural |
| **Módulo** | Chatbot `/chatbot-ia` |
| **Código** | `ChatbotService.js`, `chatbotIntentHandlers.js`, `chatbotIntentScoring.js`, sessionStorage historial |
| **Prueba** | PF-10 |
| **Matriz** | Matriz_FURPS F-11 |
| **Evidencia** | E-19, E-20 |
| **Conclusión** | ✔ Rule-based (no LLM externo); documentado en código |

---

### TR-12 — Auditoría de acciones

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | PMV2 — Registro acciones admin |
| **Módulo** | Auditoría `/auditoria` |
| **Código** | `AuditoriaService.js`, `auditMiddleware.js`, `ActionLogService.js`, tabla `auditoria_logs` |
| **Prueba** | — (sin Cypress) |
| **Matriz** | Matriz_FURPS F-12; Matriz_OWASP A09 |
| **Evidencia** | E-21, E-22 |
| **Conclusión** | ✔ Logging LOGIN/CONSULTAR_*; ⚠ sin E2E auditoría |

---

## Transversales — Seguridad, infraestructura, calidad

### TR-13 — Seguridad JWT / RBAC / OWASP

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | Autenticación segura y control acceso |
| **Módulo** | Transversal API + frontend |
| **Código** | `rbac.js`, `auth.js`, `env.js`, `app.js` Helmet CORS rate-limit |
| **Prueba** | PF-11 RBAC; validators 5/5 |
| **Matriz** | Matriz_OWASP (14 filas); Matriz_Riesgos JWT localStorage |
| **Evidencia** | `sonarqube/CORRECCIONES_SONARQUBE.md` |
| **Conclusión** | ✔ Controles baseline; ⚠ JWT localStorage, auth opcional dev |

---

### TR-14 — Base de datos MySQL

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | Persistencia relacional trazabilidad |
| **Módulo** | Infraestructura |
| **Código** | `schema.sql` 39 tablas 43 FK, `pool.js`, `migrate.js` |
| **Prueba** | — |
| **Matriz** | Matriz_FURPS R-03; Matriz_Riesgos migrate.js |
| **Evidencia** | `diagramas-mermaid/der-*.mmd`; E-44–E-46 MySQL |
| **Conclusión** | ✔ Schema robusto; ⚠ migrate.js corrupto bloquea tests |

---

### TR-15 — Despliegue Railway + Vercel

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | Sistema accesible producción |
| **Módulo** | Infraestructura cloud |
| **Código** | `vercel.json`, README Railway URLs, health endpoint |
| **Prueba** | JMeter 500/500 health Railway |
| **Matriz** | Matriz_FURPS +-02; Matriz_Casos_Prueba JM-* |
| **Evidencia** | `jmeter_resumen.json`; E-38–E-43 |
| **Conclusión** | ✔ Deploy activo documentado |

---

### TR-16 — SonarCloud / calidad estática

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | Análisis calidad código CI |
| **Módulo** | DevOps |
| **Código** | `sonar-project.properties`, `ci.yml` job sonarcloud |
| **Prueba** | — |
| **Matriz** | Matriz_FURPS +-03; Matriz_Casos_Prueba SC-01 |
| **Evidencia** | `Reportes/sonarqube_correcciones.md`; E-27–E-29 pendiente |
| **Conclusión** | ✔ CI configurado; ✗ métricas live sin captura |

---

### TR-17 — Cypress E2E

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | Pruebas funcionales PMV |
| **Módulo** | QA |
| **Código** | `testing/cypress/e2e/PF-*.cy.js` (11 specs) |
| **Prueba** | 13/13 OK 2026-05-28 |
| **Matriz** | Matriz_Casos_Prueba PF-01–PF-11 |
| **Evidencia** | `cypress/last-run.json`, `README_PRUEBAS_FUNCIONALES.md` |
| **Conclusión** | ✔ Core PMV1/PMV2 E2E; ⚠ no en CI, sin calidad/auditoría |

---

### TR-18 — JMeter rendimiento

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | Carga API < 2s, > 300 rpm |
| **Módulo** | QA rendimiento |
| **Código** | `prueba_500_requests.jmx`, `generar_metricas.js` |
| **Prueba** | 500 GET /api/health |
| **Matriz** | Matriz_FURPS P-03; Matriz_Casos_Prueba JM-* |
| **Evidencia** | `jmeter/resultado_jmeter.csv`, `metricas/resultados_resumen.json` |
| **Conclusión** | ✔ Objetivos cumplidos health; ⚠ no endpoints negocio |

---

### TR-19 — Postman / API REST

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | Validación API documentada |
| **Módulo** | QA API |
| **Código** | 14 archivos `*.routes.js`, inventario doc 09 |
| **Prueba** | ✗ Sin colección Newman |
| **Matriz** | Matriz_Casos_Prueba PM-01 |
| **Evidencia** | `Reportes/GUIA_POSTMAN.md` |
| **Conclusión** | ✗ Colección pendiente; inventario completo en doc 09 |

---

### TR-20 — Sistema admin (evidencias, arquitectura, HU)

| Eslabón | Referencia |
|---------|------------|
| **Requisito** | Documentación académica integrada |
| **Módulo** | `/evidencias`, `/arquitectura`, `/historias` |
| **Código** | `EvidenciasPMVPage.jsx`, `ArquitecturaPage.jsx`, `HistoriasUsuarioPage.jsx` |
| **Prueba** | — |
| **Matriz** | Matriz_FURPS F-14, S-03 |
| **Evidencia** | `documentacion-proyecto/AUDITORIA_TECNICA.md` |
| **Conclusión** | ✔ Meta-documentación dentro de la app |

---

## Matriz de cobertura trazabilidad

| Área PMV | Ítems TR | Código ✔ | Prueba ✔ | Evidencia automática | Evidencia manual |
|----------|----------|----------|----------|----------------------|------------------|
| PMV1 core | TR-01–TR-09 | 9/9 | 7/9 | 6/9 | 9/9 pendiente PNG |
| PMV2 IA | TR-10–TR-12 | 3/3 | 2/3 | 2/3 | 3/3 pendiente PNG |
| Transversal | TR-13–TR-20 | 8/8 | 4/8 | 6/8 | 4/8 pendiente |

---

## Conclusión trazabilidad

La cadena **requisito → código → prueba** está **completa para PMV1 funcional core** (Cypress + unit tests). Gaps documentados y trazados:

1. `migrate.js` bloquea pruebas backend HTTP (TR-01, TR-04, TR-07).
2. Postman sin colección (TR-19).
3. SonarCloud sin export dashboard (TR-16).
4. Capturas PNG UI pendientes (todos TR con evidencia manual).

Ver [CHECKLIST_EVIDENCIAS.md](Evidencias/CHECKLIST_EVIDENCIAS.md) para avance porcentual.
