# Matriz de Herramientas — CAFE-IA

**Fecha:** 24 de junio de 2026

---

## Desarrollo

| Herramienta | Versión | Ubicación / evidencia | Uso |
|-------------|---------|----------------------|-----|
| Node.js | 18+ (CI: 20) | `ci.yml`, README | Runtime |
| npm | 9+ | README | Dependencias |
| Git | — | README clone URL | Versionado |
| VS Code / Cursor | — | Entorno desarrollo | IDE |
| XAMPP | — | `.env.example` comentario | MySQL local Windows |
| cross-env | ^7.0.3 | `package.json` root | Scripts Cypress Windows |

## Despliegue

| Herramienta | Evidencia | Uso |
|-------------|-----------|-----|
| Railway | README, `server.js`, `database.js` | API + MySQL prod |
| Vercel | `vercel.json` | Frontend SPA |
| GitHub | `.github/workflows/ci.yml` | CI |
| Render | `render.yaml` | Alternativa documentada |

## Calidad

| Herramienta | Versión | Evidencia | Uso |
|-------------|---------|-----------|-----|
| SonarCloud | — | `sonar-project.properties` | Análisis estático |
| Cypress | ^13.17.0 | `testing/cypress.config.js` | E2E |
| JMeter | 5.6+ | `testing/metricas/jmeter/` | Carga |
| npm audit | — | `ci.yml` job audit | Dependencias |
| Node test | built-in | `backend/package.json` | Unit/integration |
| ESLint | ^8.57 | `frontend/package.json` | Lint frontend |
| Prettier | ^3.2.5 | `frontend/package.json` | Formato |

## Infraestructura de datos

| Herramienta | Versión | Uso |
|-------------|---------|-----|
| MySQL | 8+ | BD principal |
| mysql2 | ^3.9.2 | Driver Node.js |

## No encontradas en repositorio

| Herramienta solicitada | Estado |
|------------------------|--------|
| `railway.json` | No existe — configuración vía panel Railway |
| Docker / docker-compose | No implementado |
| Kubernetes | No implementado |
| PM2 | No implementado |
| Nginx (config propia) | No en repo (Vercel/Railway gestionan) |
