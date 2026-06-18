# 08 — Pruebas Cypress (E2E)

## 8.1 Estado general

| Parámetro | Valor |
|-----------|-------|
| Framework | Cypress **13.17.0** |
| Config | `cafe-cursor/testing/cypress.config.js` |
| Specs | **11** archivos (`PF-01` … `PF-11`) |
| Tests totales | **13** (PF-11 contiene 3 casos) |
| Última ejecución documentada | **2026-05-28** — **13/13 OK (100 %)** |
| Evidencia JSON | `testing/cypress/evidencias/reports/last-run.json` |
| Duración total | ~348 s (~5.8 min) |
| Base URL | `http://localhost:5174` |

## 8.2 Requisitos de ejecución

1. MySQL activo con base `cafe_sostenible`
2. Backend: `npm run backend` (puerto 3029)
3. Frontend: `npm run frontend` (puerto 5174)
4. Seed multiusuario: `cd backend && npm run db:seed:multiusuario`

### Comandos

```bash
# Desde cafe-cursor/
npm run test:e2e          # Headless + videos + screenshots
npm run test:e2e:open     # UI interactiva
npm run test:e2e:report   # Salida spec detallada
```

## 8.3 Inventario de pruebas

| ID | Archivo | Validación | Tests | Resultado |
|----|---------|------------|-------|-----------|
| PF-01 | PF-01-login-admin.cy.js | Login admin, dashboard global, badge ADMIN | 1 | OK |
| PF-02 | PF-02-login-cliente.cy.js | Login cliente, dashboard personal, badge CLIENTE | 1 | OK |
| PF-03 | PF-03-dashboard-admin.cy.js | KPIs admin, menú sistema | 1 | OK |
| PF-04 | PF-04-dashboard-cliente.cy.js | Dashboard cliente sin enlaces admin | 1 | OK |
| PF-05 | PF-05-productores.cy.js | Alta productor en listado | 1 | OK |
| PF-06 | PF-06-registro-produccion.cy.js | Registro lote con productor | 1 | OK |
| PF-07 | PF-07-trazabilidad.cy.js | Lista lotes y panel detalle | 1 | OK |
| PF-08 | PF-08-modulo-ia.cy.js | Módulo IA y selector lotes | 1 | OK |
| PF-09 | PF-09-reportes.cy.js | Reportes personales y pestañas | 1 | OK |
| PF-10 | PF-10-chatbot.cy.js | Mensaje y respuesta bot | 1 | OK |
| PF-11 | PF-11-roles.cy.js | Permisos ADMIN vs CLIENTE, alcance reportes | 3 | OK |

## 8.4 Comandos custom

Definidos en `testing/cypress/support/commands.js`:

| Comando | Función |
|---------|---------|
| `cy.login(email, password)` | Login UI completo |
| `cy.loginAsAdmin()` | Sesión admin |
| `cy.loginAsCliente()` | Sesión cliente1 |
| `cy.logout()` | Cierre sesión |
| `cy.navigateTo(label)` | Navegación sidebar |
| `cy.waitForApi('@alias')` | Espera intercepts |
| `cy.captureEvidence(nombre)` | Screenshot evidencia |

## 8.5 Evidencias generadas

| Tipo | Ubicación |
|------|-----------|
| Videos | `testing/cypress/videos/`, copia en `evidencias/videos/` |
| Screenshots | `testing/cypress/screenshots/` (OK-* / FAIL-* por test) |
| Reporte JSON | `testing/cypress/evidencias/reports/last-run.json` |

Configuración archiva videos aunque spec pase al 100 % (`after:spec` en cypress.config.js).

## 8.6 Cobertura funcional vs módulos

| Módulo | Cubierto Cypress | Gap |
|--------|------------------|-----|
| Login | Sí | — |
| Dashboard | Sí | — |
| Productores | Sí | DELETE no probado |
| Producción/Lotes | Sí | — |
| Trazabilidad | Sí | POST etapa no probado explícitamente |
| Calidad | **No** | Sin PF dedicado |
| IA | Sí (carga) | Ejecutar predicción completa limitado |
| Chatbot | Sí | — |
| Reportes | Sí | Export PDF/Excel no probado |
| Usuarios | **No** | Solo admin route en PF-11 |
| Auditoría | **No** | — |
| Base de datos | **No** | — |

## 8.7 Casos recomendados (no implementados)

| ID propuesto | Módulo | Escenario |
|--------------|--------|-----------|
| PF-12 | Calidad | Registrar evaluación sensorial y ver puntaje |
| PF-13 | Auditoría | Admin consulta logs tras acción |
| PF-14 | Usuarios | Admin crea usuario cliente |
| PF-15 | Reportes | Export Excel/PDF y verificar descarga |
| PF-16 | Base datos | Admin consulta resumen tablas |

## 8.8 Integración CI

El workflow `.github/workflows/ci.yml` **no ejecuta Cypress**. Recomendación: job E2E con MySQL service container.

## 8.9 Evidencias en el reporte

| Artefacto | Ubicación |
|-----------|-----------|
| JSON última ejecución | `Reportes/cypress_last-run.json`, `Evidencias/cypress/last-run.json` |
| Videos / screenshots | **No presentes en repo** — generar con `npm run test:e2e` |

## 8.10 Conclusión Cypress

Las pruebas E2E existentes demuestran **funcionalidad core PMV1/PMV2 operativa** con 100 % éxito en la última corrida documentada. Cobertura incompleta en calidad, auditoría, usuarios y export reportes.
