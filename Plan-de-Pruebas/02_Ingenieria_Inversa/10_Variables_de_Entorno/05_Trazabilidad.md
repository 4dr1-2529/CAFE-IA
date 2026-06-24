# Trazabilidad — Paso 10: Variables de Entorno

**Fecha de ejecución:** 24 de junio de 2026  
**Proyecto analizado:** CAFE-IA (`cafe-cursor/`)  
**Restricción aplicada:** Sin modificación del código; sin exposición de valores sensibles

---

## Objetivo

Inventariar y analizar **todas las variables de entorno realmente implementadas** en CAFE-IA (backend, frontend, CI, despliegue), documentando función, obligatoriedad, ambiente, riesgo e impacto **sin mostrar valores sensibles**.

---

## Archivos revisados

### Backend
- `backend/.env.example` (plantilla)
- `backend/src/config/env.js`
- `backend/src/config/database.js`
- `backend/server.js`
- `backend/src/app.js`
- `backend/src/interfaces/http/middleware/auth.js`
- `backend/src/infrastructure/database/migrate.js`
- `backend/scripts/*.js` (seeds, verify, export)
- `backend/tests/integration.test.js`

### Frontend
- `frontend/.env.example`
- `frontend/vite.config.js`
- `frontend/vercel.json`
- `frontend/src/config/api.js`
- `frontend/src/pages/auth/LoginPage.jsx`
- `frontend/src/services/api/client.js`

### Infraestructura
- `.github/workflows/ci.yml`
- `sonar-project.properties`
- `render.yaml`
- `package.json` (root — CYPRESS_BASE_URL)
- `testing/cypress.config.js`
- `README.md`, `docs/SONARCLOUD.md`

**No revisado contenido:** `backend/.env`, `frontend/.env` (archivos con secretos potenciales).

---

## Variables identificadas

**Total: 38**

| Grupo | Cantidad |
|-------|----------|
| Backend runtime | 18 |
| Backend Railway (plataforma) | 3 |
| Backend scripts | 7 |
| Frontend VITE_* | 3 |
| Vite built-in | 2 |
| Testing | 1 |
| CI / secrets | 4 |

Detalle: `Evidencias/Inventario_Variables.md`

---

## Configuraciones inspeccionadas

| Configuración | Hallazgo |
|---------------|----------|
| dotenv backend | `override: false` |
| Validación JWT | Min 32 caracteres |
| Validación MySQL | 5 claves MYSQL* obligatorias |
| CORS prod | CORS_ORIGINS obligatorio |
| Vite envPrefix | Solo VITE_* |
| Vercel build | VITE_API_URL inyectada |
| CI backend | SKIP_INTEGRATION + JWT + MYSQL dummy |
| SonarCloud | SONAR_TOKEN secret |

---

## Evidencias utilizadas

### Copiadas
`backend_env.example`, `frontend_env.example`, `vercel.json`, `github_actions_ci.yml`, `sonar-project.properties`, `SONARCLOUD.md`, `render.yaml`, `README_variables_entorno.md`

### No copiadas (seguridad)
`backend/.env`, `frontend/.env`

### Pendientes
Capturas panel Railway/Vercel — *Evidencia pendiente de incorporar.*

---

## Documentos generados

### Raíz
`01_Prompt.md`, `02_Resultado_IA.md`, `03_Mejoras.md`, `04_Conclusiones.md`, `05_Trazabilidad.md`

### Evidencias
`Inventario_Variables.md/.xlsx`, `Matriz_Variables.md/.xlsx`, `Configuracion_Backend.md`, `Configuracion_Frontend.md`, `Resumen_Ejecutivo.md`, `INDICE_EVIDENCIAS.md`

---

## Fecha

**24 de junio de 2026**

---

*Paso 10 completado. Documentación lista para anexo ICACIT.*
