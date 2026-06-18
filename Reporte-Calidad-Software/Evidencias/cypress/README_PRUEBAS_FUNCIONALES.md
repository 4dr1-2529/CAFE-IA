# Pruebas funcionales E2E — Actividad 4

Pruebas automatizadas con **Cypress 13** para **Café Sostenible AI** (React + Vite + Express + MySQL).

## Requisitos previos

1. **MySQL** activo (XAMPP) y base `cafe_sostenible`.
2. **Backend** (`http://localhost:3029`): `npm run backend`
3. **Frontend** (`http://localhost:5174`): `npm run frontend`
4. Seed multiusuario (cliente1):
   ```bash
   cd backend && npm run db:seed:multiusuario
   ```

## Variable `CYPRESS_BASE_URL`

| Entorno | URL |
|---------|-----|
| Curso (ejemplo) | `http://localhost:5173` |
| Este proyecto (Vite) | `http://localhost:5174` |

Los scripts npm ya definen `CYPRESS_BASE_URL=http://localhost:5174`.

```powershell
$env:CYPRESS_BASE_URL="http://localhost:5173"
npm run test:e2e
```

## Credenciales

| Rol | Email | Contraseña |
|-----|-------|------------|
| ADMIN | admin@cafeai.com | admin123 |
| CLIENTE | cliente1@cafeai.com | mbappe29 |

## Comandos principales

Desde `cafe-cursor`:

```bash
# Ejecutar las 11 pruebas (headless) + videos + screenshots + reporte JSON
npm run test:e2e

# Interfaz gráfica Cypress
npm run test:e2e:open

# Con salida detallada en consola
npm run test:e2e:report
```

Equivale a `cypress run --project testing` con configuración en `testing/cypress.config.js`.

## Qué valida cada prueba

| PF | Archivo | Validación funcional |
|----|---------|-------------------|
| 01 | PF-01-login-admin.cy.js | Login admin, dashboard global, badge ADMIN |
| 02 | PF-02-login-cliente.cy.js | Login cliente, dashboard personal, badge CLIENTE |
| 03 | PF-03-dashboard-admin.cy.js | KPIs admin y menú con módulos de sistema |
| 04 | PF-04-dashboard-cliente.cy.js | Dashboard cliente sin enlaces admin |
| 05 | PF-05-productores.cy.js | Alta de productor y aparición en lista |
| 06 | PF-06-registro-produccion.cy.js | Registro de lote con productor existente |
| 07 | PF-07-trazabilidad.cy.js | Lista de lotes y panel de detalle |
| 08 | PF-08-modulo-ia.cy.js | Carga del módulo IA y selector de lotes |
| 09 | PF-09-reportes.cy.js | Reportes personales y pestañas |
| 10 | PF-10-chatbot.cy.js | Envío de mensaje y respuesta del bot |
| 11 | PF-11-roles.cy.js | Permisos ADMIN vs CLIENTE y alcance reportes |

## Dónde se guardan las evidencias

| Tipo | Carpeta |
|------|---------|
| Videos (por spec) | `testing/cypress/videos/` |
| Copia archivada de videos | `testing/cypress/evidencias/videos/` |
| Screenshots (cada test + fallos) | `testing/cypress/screenshots/` |
| Reporte JSON última ejecución | `testing/cypress/evidencias/reports/last-run.json` |

### Importante sobre videos

Cypress **elimina por defecto** el video cuando un spec pasa al 100 %. La configuración en `cypress.config.js` **archiva una copia** en `videos/` y `evidencias/videos/` en el evento `after:spec`, para que siempre tengas 11 archivos `.mp4` tras una ejecución completa exitosa.

### Screenshots automáticos

- `screenshotOnRunFailure: true` → captura si un test falla.
- Hook `afterEach` en `support/e2e.js` → captura `OK-*` o `FAIL-*` por cada caso.
- Comando `cy.captureEvidence()` → captura final del flujo validado.

## Configuración (`testing/cypress.config.js`)

- `video: true`
- `screenshotOnRunFailure: true`
- `videosFolder`: `cypress/videos`
- `screenshotsFolder`: `cypress/screenshots`
- `specPattern`: `cypress/e2e/PF-*.cy.js` (11 archivos)
- `retries.runMode: 1` (reintento solo en CI/headless ante fallo transitorio)
- Timeouts ampliados para carga lazy y APIs

## Comandos custom (`support/commands.js`)

- `cy.login(email, password)` — login UI completo
- `cy.loginAsAdmin()` / `cy.loginAsCliente()` — sesión reutilizable
- `cy.logout()` — cierre de sesión
- `cy.navigateTo(label)` — menú lateral
- `cy.waitForApi('@alias')` — espera intercepts
- `cy.captureEvidence(nombre)` — screenshot de evidencia

## Estructura

```
testing/
├── cypress.config.js
└── cypress/
    ├── e2e/           PF-01 … PF-11
    ├── support/       commands.js, e2e.js
    ├── videos/
    ├── screenshots/
    ├── evidencias/
    │   ├── videos/
    │   └── reports/
    └── README_PRUEBAS_FUNCIONALES.md
```

## Solución de problemas

| Problema | Acción |
|----------|--------|
| `ECONNREFUSED` API | Iniciar backend y MySQL |
| Login cliente falla | `npm run db:seed:multiusuario` en backend |
| Solo 1 video generado | Ejecutar `npm run test:e2e` completo (no un solo spec aislado sin archivado) |
| Puerto distinto | Ajustar `CYPRESS_BASE_URL` |

## Notas

- No se modifica frontend ni backend.
- Los tests fallan solo ante errores funcionales reales (credenciales, permisos, formularios, APIs).
- Errores benignos (`ResizeObserver`, chunks HMR) se ignoran en `uncaught:exception`.
