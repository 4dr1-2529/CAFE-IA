# Pruebas funcionales PMV 1 y PMV 2 — Semana 10

**Proyecto:** CAFE-IA · Café Sostenible AI  
**Fuente:** specs Cypress en `testing/cypress/e2e/`, vistas en `frontend/src/pages/`, evidencias en `EvidenciasPMVPage.jsx` e `HistoriasUsuarioPage.jsx`  
**Última ejecución Cypress registrada:** `testing/cypress/evidencias/reports/last-run.json` — 2026-05-28, **13/13 tests passed**, 11 specs.

## Módulos del sistema (referencia)

| PMV | Módulos implementados (vista) |
|-----|-------------------------------|
| PMV1 | Login, Usuarios, Productores, Registro Producción, Trazabilidad, Control Calidad, Dashboard, Reportes, Base de Datos |
| PMV2 | Módulo IA, Chatbot IA, Auditoría / Historial |
| Sistema (admin) | Evidencias PMV, Arquitectura, Historias de Usuario |

## Tabla de pruebas funcionales

| ID | Funcionalidad | Tipo Prueba | Herramienta |
|---|---|---|---|
| PF-01 | Login administrador (`admin@cafeai.com`) | Funcional | Cypress |
| PF-02 | Login cliente (`cliente1@cafeai.com`) | Funcional | Cypress |
| PF-03 | Dashboard global ADMIN (KPIs y menú sistema) | Funcional | Cypress |
| PF-04 | Dashboard personal CLIENTE (sin enlaces admin) | Funcional | Cypress |
| PF-05 | Registro y listado de productores | Funcional | Cypress |
| PF-06 | Registro de producción / lote con productor | Funcional | Cypress |
| PF-07 | Consulta de trazabilidad (lista y detalle de lote) | Funcional | Cypress |
| PF-08 | Carga del módulo IA y selector de lotes | Funcional | Cypress |
| PF-09 | Reportes personales / pestañas de reportes | Funcional | Cypress |
| PF-10 | Chatbot IA — envío de mensaje y respuesta | Funcional | Cypress |
| PF-11a | Rol ADMIN — acceso a Usuarios y badge ADMIN | Funcional | Cypress |
| PF-11b | Rol CLIENTE — sin menú Usuarios y redirección | Funcional | Cypress |
| PF-11c | Reportes GLOBAL (admin) vs PERSONAL (cliente) | Funcional | Cypress |
| PF-12 | Control de calidad sensorial (`computeScores`) | Unitaria | Node test (`calidad.service.test.js`) |
| PF-13 | Motor predictivo IA heurístico v2 | Unitaria | Node test (`prediction.test.js`) |
| PF-14 | API integración PMV2 (login, lotes, dashboard) | Integración | Node test (`integration.test.js`) |
| PF-15 | Usuarios — CRUD admin (vista `/usuarios`) | Manual | Sin spec Cypress dedicado |
| PF-16 | Control calidad — registro en UI (`/calidad`) | Manual | Sin spec Cypress dedicado |
| PF-17 | Auditoría / historial (`/auditoria`, solo ADMIN) | Manual | Sin spec Cypress dedicado |
| PF-18 | Base de datos (`/basedatos`, alcance por rol) | Manual | Sin spec Cypress dedicado |
| PF-19 | Evidencias PMV (`/evidencias`, solo ADMIN) | Manual | Sin spec Cypress dedicado |
| PF-20 | Arquitectura del proyecto (`/arquitectura`) | Manual | Sin spec Cypress dedicado |
| PF-21 | Historias de usuario HU01–HU12 (`/historias`) | Manual | Sin spec Cypress dedicado |

## Archivos Cypress (PF-01 … PF-11)

| Archivo | HU relacionada (según `HistoriasUsuarioPage.jsx`) |
|---------|---------------------------------------------------|
| `PF-01-login-admin.cy.js` | HU01 |
| `PF-02-login-cliente.cy.js` | HU01 |
| `PF-03-dashboard-admin.cy.js` | HU07 |
| `PF-04-dashboard-cliente.cy.js` | HU07 |
| `PF-05-productores.cy.js` | HU03 |
| `PF-06-registro-produccion.cy.js` | HU04 |
| `PF-07-trazabilidad.cy.js` | HU05 |
| `PF-08-modulo-ia.cy.js` | HU10 |
| `PF-09-reportes.cy.js` | HU08 |
| `PF-10-chatbot.cy.js` | HU11 |
| `PF-11-roles.cy.js` | HU02, HU08, HU12 |

## Ejecución

```bash
# Desde la raíz del monorepo (requiere backend :3029, frontend :5174, MySQL)
npm run test:e2e
```

Configuración: `testing/cypress.config.js` · `specPattern`: `cypress/e2e/PF-*.cy.js`

Documentación detallada: [`../cypress/README_PRUEBAS_FUNCIONALES.md`](../cypress/README_PRUEBAS_FUNCIONALES.md)
