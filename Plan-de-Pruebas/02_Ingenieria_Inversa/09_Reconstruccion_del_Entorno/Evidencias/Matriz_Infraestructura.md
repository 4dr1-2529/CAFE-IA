# Matriz de Infraestructura — CAFE-IA

**Fecha:** 24 de junio de 2026

---

| ID | Componente | Tipo | Función | Estado | Riesgo | Recomendación |
|----|------------|------|---------|--------|--------|---------------|
| INF-01 | Node.js 20 | Runtime | Ejecutar API y build frontend | Activo (CI/prod) | Bajo | Fijar `engines` en package.json |
| INF-02 | Express 4 | Framework HTTP | API REST hexagonal | Activo | Medio | Mantener rate limit y helmet |
| INF-03 | MySQL 8 local | Base de datos | Desarrollo XAMPP | Documentado | Medio | Documentar versión exacta XAMPP |
| INF-04 | MySQL 8 Railway | Base de datos | Persistencia producción | Activo | Medio | Backups automáticos Railway |
| INF-05 | mysql2 pool | Conexión | Pool 2–10 conexiones | Activo | Bajo | Monitorear conexiones en carga |
| INF-06 | Railway Web Service | Hosting API | Backend producción :PORT | Activo | Medio | Health check `/api/health` |
| INF-07 | Vercel | Hosting SPA | Frontend estático Vite | Activo | Bajo | Cache headers en vercel.json |
| INF-08 | GitHub Actions | CI/CD | Test, build, Sonar, audit | Activo | Bajo | Añadir deploy automatizado |
| INF-09 | SonarCloud | Calidad código | Análisis estático | Activo | Bajo | Mantener quality gate |
| INF-10 | Cypress 13 | E2E | 11 pruebas funcionales | Activo | Medio | Integrar E2E en CI |
| INF-11 | JMeter 5.6 | Carga | 500 req health Railway | Activo | Bajo | Ampliar escenarios API |
| INF-12 | Vite 5 | Build tool | Dev :5174 + proxy | Activo | Bajo | — |
| INF-13 | React 18 | UI | SPA cliente | Activo | Bajo | — |
| INF-14 | TailwindCSS 3 | Estilos | UI responsive | Activo | Bajo | — |
| INF-15 | JWT + bcrypt | Seguridad | Auth stateless | Activo | Medio | Rotar JWT_SECRET periódicamente |
| INF-16 | helmet + CORS | Seguridad | Headers y orígenes | Activo | Medio | Revisar CORS en nuevos dominios |
| INF-17 | render.yaml | IaC alternativo | Blueprint Render | Alternativa | Bajo | Unificar en Railway o deprecar |
| INF-18 | railway.json | IaC Railway | — | **No existe** | Medio | Documentar solo panel Railway |
| INF-19 | Docker | Contenedorización | — | **No implementado** | Medio | Evaluar Dockerfile futuro |
| INF-20 | GitHub Secrets | CI | SONAR_TOKEN, GITHUB_TOKEN | Activo | Medio | Rotación de tokens |

---

**Total componentes:** 20 | **Activos:** 17 | **No implementados:** 2 | **Alternativas:** 1
