# Guía detallada de capturas — CAFE-IA

Documento operativo para completar evidencias visuales del Reporte de Calidad.  
**Stack real:** React 18 + Vite (no Angular). **Credenciales demo:** `admin@cafeai.com` / `admin123` | `cliente1@cafeai.com` / `mbappe29`.

---

## Preparación del entorno local

```bash
cd cafe-cursor
npm run install:all
# Terminal 1: npm run backend   → http://localhost:3029
# Terminal 2: npm run frontend  → http://localhost:5174
# Seed cliente: cd backend && npm run db:seed:multiusuario
```

**Producción (alternativa):** https://cafe-ia-inky.vercel.app + API Railway.

Guardar cada captura en la subcarpeta indicada bajo `Evidencias/` con nomenclatura `{num}_{nombre}.png`.

---

## 1. Login

| ID | Pantalla | URL | Rol | Qué debe verse | Para qué sirve | Uso en reporte |
|----|----------|-----|-----|----------------|----------------|----------------|
| E-01 | Formulario login | `/login` | — | Logo CAFE-IA, campos email/contraseña, botón ingresar | Evidencia UI autenticación | 05 FURPS F-01, 08 Cypress |
| E-02 | Error credenciales | `/login` | — | Mensaje error tras email/contraseña inválidos | Validación UX login | 06 OWASP A07 |
| E-03 | Login exitoso admin | `/` tras login | admin | Redirección dashboard, badge ADMIN en header | Sesión admin operativa | PF-01, doc 08 |
| E-04 | Login exitoso cliente | `/` tras login | cliente1 | Badge CLIENTE, KPIs personales | Scope RBAC cliente | PF-02, PF-11 |

---

## 2. Dashboard

| ID | Pantalla | URL | Rol | Qué debe verse | Para qué sirve | Uso en reporte |
|----|----------|-----|-----|----------------|----------------|----------------|
| E-05 | Dashboard admin | `/` | admin | KpiCard métricas globales, gráficos Recharts, sidebar completo | KPIs agregados sistema | PF-03, GET /api/dashboard/metrics |
| E-06 | Dashboard cliente | `/` | cliente1 | KPIs filtrados user_id, sin menú Sistema admin | Aislamiento datos cliente | PF-04, RoleHelper.scopeUserId |

---

## 3. Usuarios (solo admin)

| ID | Pantalla | URL | Rol | Qué debe verse | Para qué sirve | Uso en reporte |
|----|----------|-----|-----|----------------|----------------|----------------|
| E-07 | Listado usuarios | `/usuarios` | admin | Tabla usuarios, roles, estado activo | Gestión RBAC | usuarios.routes.js adminGuard |
| E-08 | Formulario alta | `/usuarios` modal/form | admin | Campos nombres, email, rol | CRUD usuarios | F-02, gap Cypress |

---

## 4. Productores

| ID | Pantalla | URL | Rol | Qué debe verse | Para qué sirve | Uso en reporte |
|----|----------|-----|-----|----------------|----------------|----------------|
| E-09 | Listado productores | `/productores` | admin | Tabla productores registrados | CRUD productores | PF-05 |
| E-10 | Alta productor | `/productores` | admin | Formulario completado + nuevo registro en lista | Creación exitosa | integration.test HU01 |

---

## 5. Producción / Registro lote

| ID | Pantalla | URL | Rol | Qué debe verse | Para qué sirve | Uso en reporte |
|----|----------|-----|-----|----------------|----------------|----------------|
| E-11 | Registro lote | `/registro` | admin/cliente | Selector productor, campos lote, botón guardar | POST /api/lotes | PF-06 |
| E-12 | Confirmación lote | `/registro` o listado | — | Código lote generado (next-code) | Trazabilidad origen | LoteService |

---

## 6. Trazabilidad

| ID | Pantalla | URL | Rol | Qué debe verse | Para qué sirve | Uso en reporte |
|----|----------|-----|-----|----------------|----------------|----------------|
| E-13 | Lista lotes | `/trazabilidad` | autenticado | Listado lotes con etapas | Consulta trazabilidad | PF-07 |
| E-14 | Detalle + QR | `/trazabilidad` panel | autenticado | Timeline etapas, código QR lote | Trazabilidad + react-qr-code | HU03 |

---

## 7. Control de calidad

| ID | Pantalla | URL | Rol | Qué debe verse | Para qué sirve | Uso en reporte |
|----|----------|-----|-----|----------------|----------------|----------------|
| E-15 | Formulario calidad | `/calidad` | autenticado | Escalas 1-10 aroma/sabor/cuerpo/etc. | POST /api/control-calidad | calidad.service.test.js |
| E-16 | Resultado puntaje | `/calidad` | autenticado | Puntaje compuesto y categoría (Excelente/Buena/...) | CalidadService.computeScores | F-09 |

---

## 8. Reportes

| ID | Pantalla | URL | Rol | Qué debe verse | Para qué sirve | Uso en reporte |
|----|----------|-----|-----|----------------|----------------|----------------|
| E-17 | Pestañas reportes | `/reportes` | autenticado | Tabs producción/calidad/predicciones/trazabilidad | GET /api/reportes/* | PF-09 |
| E-18 | Export PDF/Excel | `/reportes` | autenticado | Diálogo descarga o archivo generado | ReportExportService | F-07, gap E2E |

---

## 9. Chatbot IA

| ID | Pantalla | URL | Rol | Qué debe verse | Para qué sirve | Uso en reporte |
|----|----------|-----|-----|----------------|----------------|----------------|
| E-19 | Interfaz chat | `/chatbot-ia` | autenticado | Input mensaje, historial sessionStorage | POST /api/chatbot | PF-10 |
| E-20 | Respuesta bot | `/chatbot-ia` | autenticado | Respuesta intención (ej. consulta lotes) | ChatbotService handlers | F-11 |

---

## 10. Auditoría (admin)

| ID | Pantalla | URL | Rol | Qué debe verse | Para qué sirve | Uso en reporte |
|----|----------|-----|-----|----------------|----------------|----------------|
| E-21 | Logs auditoría | `/auditoria` | admin | Tabla acciones LOGIN, CONSULTAR_*, timestamps | GET /api/auditoria | auditMiddleware |
| E-22 | Resumen auditoría | `/auditoria` | admin | KPIs resumen GET /api/auditoria/resumen | ActionLogService | F-12 |

---

## 11. Módulo IA

| ID | Pantalla | URL | Rol | Qué debe verse | Para qué sirve | Uso en reporte |
|----|----------|-----|-----|----------------|----------------|----------------|
| E-23 | Selector lotes IA | `/ia` | autenticado | Dropdown lotes pendientes predicción | POST /api/predicciones/ejecutar | PF-08 |
| E-24 | Resultado predicción | `/ia` | autenticado | Riesgo, alertas, factores PredictionEngine v2 | Domain IA | prediction.test.js |

---

## 12. Base de datos (UI)

| ID | Pantalla | URL | Rol | Qué debe verse | Para qué sirve | Uso en reporte |
|----|----------|-----|-----|----------------|----------------|----------------|
| E-25 | Resumen BD | `/basedatos` | autenticado | Listado 39 tablas, conteos | GET /api/base-datos | schema.sql |
| E-26 | Detalle tabla | `/basedatos` | autenticado | Filas muestra tabla seleccionada | GET /api/base-datos/:tabla | F-13 |

---

## 13. SonarCloud

| ID | Pantalla | Dónde | Qué debe verse | Para qué sirve | Uso en reporte |
|----|----------|-------|----------------|----------------|----------------|
| E-27 | Overview | https://sonarcloud.io/project/overview?id=4dr1-2529_CAFE-IA | Quality Gate, Ratings A-E, Measures | Calidad estática CI | doc 07 |
| E-28 | Vulnerabilities | SonarCloud Issues filter | Lista issues abiertos/cerrados | OWASP | doc 06 |
| E-29 | Complexity | SonarCloud Measures | Complejidad ciclomática | Mantenibilidad | Matriz FURPS S-* |

**Artefactos ya copiados (texto):** `Evidencias/sonarqube/CORRECCIONES_SONARQUBE.md`

---

## 14. Cypress

| ID | Pantalla | Cómo obtener | Qué debe verse | Uso en reporte |
|----|----------|--------------|----------------|----------------|
| E-30 | Test Runner | `npm run test:e2e:open` | 11 specs verdes | doc 08 |
| E-31 | Consola headless | `npm run test:e2e` | 13 passing | Reportes/cypress_last-run.json |
| E-32 | Screenshots | Tras test:e2e en `testing/cypress/screenshots/` | OK-PF-* por spec | Matriz casos |

**Artefacto copiado:** `Evidencias/cypress/last-run.json` (13/13 OK)

---

## 15. Postman

| ID | Acción | Qué capturar | Uso |
|----|--------|--------------|-----|
| E-33 | Crear colección | POST login → guardar token → GET /api/productores | doc 09 |
| E-34 | Tests Postman | Tests tab con asserts status 200/401 | Matriz casos PM-NA |

**Estado:** No existe colección en repo — captura manual obligatoria.

---

## 16. JMeter

| ID | Pantalla | Cómo | Qué debe verse | Uso |
|----|----------|------|----------------|-----|
| E-35 | Test Plan | Abrir `prueba_500_requests.jmx` | Thread Group 50×10, GET health | doc 10 |
| E-36 | Summary Report | Tras ejecutar | Average, Throughput, Error 0% | jmeter_resumen.json |
| E-37 | Results Tree | Sample 200 | JSON ok:true health | Evidencias/jmeter/ |

**Artefactos copiados:** `Evidencias/jmeter/resultado_jmeter.csv`, `prueba_500_requests.jmx`  
**Métricas:** promedio 443.05 ms, 500/500 OK, p95 2614 ms (cold start)

---

## 17. Railway

| ID | Pantalla | URL | Qué debe verse | Uso |
|----|----------|-----|----------------|-----|
| E-38 | Servicio API | Railway dashboard proyecto | Deploy activo, variables MYSQL* | 01 Intro deploy |
| E-39 | MySQL Railway | Railway plugin MySQL | Servicio vinculado, conexión interna | BD producción |
| E-40 | Logs API | Railway logs | Request logs sin errores críticos | R-02 disponibilidad |

---

## 18. Vercel

| ID | Pantalla | URL | Qué debe verse | Uso |
|----|----------|-----|----------------|-----|
| E-41 | Deploy frontend | vercel.com dashboard | Root `frontend/`, build OK | README deploy |
| E-42 | VITE_API_URL | Vercel env vars | URL API Railway configurada | vite.config.js |
| E-43 | Sitio live | https://cafe-ia-inky.vercel.app | SPA cargando, login funcional | E2E producción |

---

## 19. MySQL

| ID | Herramienta | Qué capturar | Uso |
|----|-------------|--------------|-----|
| E-44 | phpMyAdmin/XAMPP o Railway | 39 tablas en `cafe_sostenible` | schema.sql |
| E-45 | Consulta FK | INFORMATION_SCHEMA referential_constraints count 43 | 01 Intro BD |
| E-46 | Datos seed | Tabla productores/lotes con registros PMV2 | PMV2.md |

---

## 20. GitHub Actions / CI

| ID | Pantalla | Qué debe verse | Uso |
|----|----------|----------------|-----|
| E-47 | Workflow run | Jobs backend, frontend, sonarcloud, dependency-audit | ci.yml |
| E-48 | Backend test log | npm test output (nota: puede fallar migrate local) | 08 backend |

---

## Resumen de evidencias automáticas vs manuales

| Tipo | Cantidad | Estado |
|------|----------|--------|
| Artefactos texto/JSON/CSV copiados | 10 archivos | ✔ En `Evidencias/` y `Reportes/` |
| Diagramas Mermaid (.mmd) | 3 archivos | ✔ `Evidencias/diagramas-mermaid/` |
| Imágenes PNG en repo | **0** | ✗ Generar con `npm run db:docs:png` o capturas UI |
| Capturas UI pendientes | 48 (E-01 a E-48) | Manual — seguir tabla arriba |
