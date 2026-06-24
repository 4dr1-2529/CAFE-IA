# Trazabilidad — Paso 9: Reconstrucción del Entorno

**Fecha de ejecución:** 24 de junio de 2026  
**Proyecto analizado:** CAFE-IA (`cafe-cursor/`)  
**Restricción aplicada:** Sin modificación del código fuente del proyecto

---

## Objetivo

Reconstruir mediante ingeniería inversa el **entorno de desarrollo, pruebas y producción** de CAFE-IA: herramientas, configuraciones, infraestructura cloud, variables de entorno y servicios externos, generando documentación apta para el informe ICACIT.

---

## Configuraciones revisadas

| Configuración | Archivo | Hallazgo principal |
|---------------|---------|-------------------|
| Entorno backend | `backend/.env.example` | MYSQL*, JWT, CORS, PORT 3029 |
| Entorno frontend | `frontend/.env.example` | VITE_API_URL, demo credentials |
| Deploy Vercel | `frontend/vercel.json` | Vite SPA + VITE_API_URL Railway |
| Deploy alternativo | `render.yaml` | Blueprint Render Node |
| CI/CD | `.github/workflows/ci.yml` | 4 jobs, Node 20 |
| SonarCloud | `sonar-project.properties` | org 4dr1-2529 |
| Vite dev | `frontend/vite.config.js` | Puerto 5174, proxy /api |
| Cypress | `testing/cypress.config.js` | 11 specs PF-* |
| JMeter | `testing/metricas/jmeter/*.jmx` | 500 req health |
| BD | `backend/sql/schema.sql` + migrations | 39 tablas |
| API client | `frontend/src/config/api.js` | Railway URL prod |
| Env loader | `backend/src/config/env.js`, `database.js` | MYSQL* only, Railway SSL |

---

## Archivos analizados

### Raíz monorepo
`package.json`, `package-lock.json`, `README.md`, `render.yaml`, `sonar-project.properties`

### Backend
`server.js`, `package.json`, `.env.example`, `src/app.js`, `src/config/env.js`, `src/config/database.js`, `src/infrastructure/database/migrate.js`, `src/infrastructure/database/pool.js`

### Frontend
`package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `vercel.json`, `src/config/api.js`

### Testing e infra
`.github/workflows/ci.yml`, `testing/cypress.config.js`, `testing/cypress/e2e/PF-*.cy.js` (11), `testing/metricas/jmeter/`

### Documentación previa
`Plan-de-Pruebas/02_Ingenieria_Inversa/01_Analisis_de_Logs/Evidencias/`  
`cafe-cursor/Reporte-Calidad-Software/` (referencia)

---

## Herramientas utilizadas para la reconstrucción

| Herramienta | Uso en este paso |
|-------------|------------------|
| Exploración repositorio | Lectura configuraciones |
| grep / glob | Búsqueda referencias infra |
| ExcelJS | Generación matrices .xlsx |
| Mermaid | Diagramas entorno |

---

## Infraestructura identificada

| Plataforma | Rol | Estado |
|------------|-----|--------|
| Railway | API + MySQL producción | Activo |
| Vercel | Frontend SPA | Activo |
| GitHub | Repo + Actions CI | Activo |
| SonarCloud | Análisis estático | Activo |
| XAMPP | MySQL local (doc) | Documentado |
| Render | Alternativa (`render.yaml`) | Documentado |

**No encontrado:** `railway.json`, Docker, Kubernetes

---

## Evidencias utilizadas

### Copiadas a `Evidencias/`
`backend_env.example`, `frontend_env.example`, `package_*.json`, `vercel.json`, `render.yaml`, `sonar-project.properties`, `github_actions_ci.yml`, `schema.sql`, `README_proyecto.md`, `prueba_500_requests.jmx`, `resultado_jmeter.csv`, `railway_health_response.json`, `vercel_status.json`, `cypress_last-run.json`, `jmeter_resumen.json`, `hallazgos_sonar.md`, `CORRECCIONES_SONARQUBE.md`

### Pendientes
`railway.json`, `package-lock.json` (copia), capturas Railway/Vercel, videos Cypress — *Evidencia pendiente de incorporar.*

---

## Documentos generados

### Raíz paso 09
`01_Prompt.md`, `02_Resultado_IA.md`, `03_Mejoras.md`, `04_Conclusiones.md`, `05_Trazabilidad.md`

### Evidencias
`Inventario_Entorno.md/.xlsx`, `Matriz_Infraestructura.md/.xlsx`, `Matriz_Herramientas.md`, `Configuracion_Entorno.md`, `Resumen_Ejecutivo.md`, `INDICE_EVIDENCIAS.md`, 5 diagramas `.md`/`.mmd`

---

## Fecha

**24 de junio de 2026**

---

*Paso 9 completado. Documentación lista para anexar al informe ICACIT.*
