# Resumen Ejecutivo — Reconstrucción del Entorno CAFE-IA

**Fecha:** 24 de junio de 2026

---

## Estado general del entorno

CAFE-IA opera en un **entorno híbrido** bien documentado: desarrollo local con **Node.js + Vite + Express + MySQL (XAMPP)**, integración continua en **GitHub Actions** con **SonarCloud**, y producción en **Railway (API + MySQL) + Vercel (SPA)**.

El entorno está **operativo y desplegado** con URLs públicas verificables. La configuración se centraliza en archivos `.env.example`, `vercel.json`, `sonar-project.properties` y `ci.yml`.

---

## Indicadores

| Indicador | Valor |
|-----------|-------|
| Herramientas de desarrollo identificadas | 8 |
| Componentes frontend | 7 |
| Componentes backend | 9 |
| Middleware seguridad | 4 |
| Variables entorno backend | 17 |
| Variables entorno frontend | 3 |
| Plataformas despliegue activas | 2 (Railway + Vercel) |
| Herramientas calidad | 5 |
| Specs Cypress E2E | 11 |
| Jobs GitHub Actions | 4 |

---

## Herramientas utilizadas

**Runtime:** Node.js 20 (CI), npm 9+  
**Frontend:** React 18, Vite 5, TailwindCSS 3, Recharts  
**Backend:** Express 4, JWT, mysql2, helmet, cors, rate-limit  
**BD:** MySQL 8 (local XAMPP / Railway)  
**CI/CD:** GitHub Actions  
**Calidad:** SonarCloud, Cypress 13, JMeter 5.6+, npm audit  
**IDE:** VS Code / Cursor (documentado)

---

## Infraestructura encontrada

| Capa | Plataforma | Estado |
|------|------------|--------|
| API | Railway | Activo |
| BD | Railway MySQL 8 | Activo |
| SPA | Vercel | Activo |
| CI | GitHub Actions | Activo |
| Análisis código | SonarCloud | Activo |
| Alternativa | Render (`render.yaml`) | Documentada, no prod principal |

---

## Servicios externos

- **Railway API** — backend REST HTTPS
- **SonarCloud** — análisis vía CI (token)

No se identificaron APIs de terceros adicionales (pagos, OAuth externo, etc.).

---

## Bases de datos

- **Local:** `cafe_sostenible` en `127.0.0.1:3306`
- **Producción:** MySQL Railway vinculado por variables `MYSQL*`
- **Schema:** 39 tablas, migraciones 001–005, seeds

---

## Plataformas de despliegue

| Entorno | Frontend | Backend |
|---------|----------|---------|
| Local | localhost:5174 | localhost:3029 |
| Producción | cafe-ia-inky.vercel.app | cafe-sostenible-api-production-03ad.up.railway.app |

---

## Calidad del entorno

| Dimensión | Valoración |
|-----------|------------|
| Documentación README | Alta |
| Paridad local/prod (MYSQL*) | Alta |
| Seguridad base (JWT, helmet, CORS) | Media-alta |
| Automatización despliegue | Media (CI sin CD automático) |
| Contenedorización | No implementada |
| **Madurez global** | **7,0 / 10** |

---

## Conclusión

El entorno de CAFE-IA es **reconstruible, coherente y apto para evaluación ICACIT**, con evidencia en código, configuración y reportes de calidad. La principal brecha es la ausencia de `railway.json`/Docker y la dependencia de configuración manual en paneles cloud.
