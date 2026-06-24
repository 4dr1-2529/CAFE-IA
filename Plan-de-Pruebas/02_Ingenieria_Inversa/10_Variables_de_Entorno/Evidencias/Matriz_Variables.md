# Matriz de Variables de Entorno — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Sin valores sensibles**

---

| ID | Variable | Componente | Ambiente | Obligatoria | Estado | Riesgo | Recomendación |
|----|----------|------------|----------|-------------|--------|--------|---------------|
| VAR-01 | MYSQLHOST | database.js | Dev/Prod | Sí | Configurada | Medio | No exponer en logs públicos |
| VAR-02 | MYSQLPORT | database.js | Dev/Prod | Sí | Configurada | Bajo | — |
| VAR-03 | MYSQLUSER | database.js | Dev/Prod | Sí | Configurada | Medio | Usuario dedicado en prod |
| VAR-04 | MYSQLPASSWORD | database.js | Dev/Prod | Sí | Configurada | **Alto** | Secret manager Railway |
| VAR-05 | MYSQLDATABASE | database.js | Dev/Prod | Sí | Configurada | Medio | — |
| VAR-06 | MYSQL_SSL | database.js | Prod | No | Configurada | Medio | true en Railway |
| VAR-07 | MYSQL_SSL_REJECT_UNAUTHORIZED | database.js | Prod | No | Configurada | Medio | Documentar cert Railway |
| VAR-08 | DB_POOL_MIN | database.js | Todos | No | Configurada | Bajo | — |
| VAR-09 | DB_POOL_MAX | database.js | Todos | No | Configurada | Bajo | Ajustar bajo carga |
| VAR-10 | JWT_SECRET | env.js | Todos | Sí | Configurada | **Alto** | Min 32 chars; rotar |
| VAR-11 | JWT_EXPIRES_IN | env.js | Todos | No | Configurada | Bajo | — |
| VAR-12 | JWT_REFRESH_EXPIRES_IN | env.js | Todos | No | Configurada | Bajo | — |
| VAR-13 | REQUIRE_AUTH | env.js, auth.js | Todos | No | Configurada | Medio | true en prod si aplica |
| VAR-14 | ALLOW_PUBLIC_REGISTER | env.js | Todos | No | Configurada | Medio | false en prod |
| VAR-15 | ADMIN_SEED_PASSWORD | migrate.js | Dev | No | Configurada | **Alto** | No usar en prod |
| VAR-16 | NODE_ENV | env.js, app.js | Todos | No | Configurada | Bajo | production en Railway |
| VAR-17 | PORT | env.js, server.js | Todos | No | Configurada | Bajo | Railway asigna |
| VAR-18 | CORS_ORIGINS | env.js, app.js | Dev/Prod | Sí prod | Configurada | Medio | Lista explícita Vercel |
| VAR-19 | RAILWAY_ENVIRONMENT | database.js | Prod | No | Plataforma | Bajo | Auto Railway |
| VAR-20 | RAILWAY_SERVICE_NAME | database.js | Prod | No | Plataforma | Bajo | Auto Railway |
| VAR-21 | RAILWAY_PROJECT_ID | database.js | Prod | No | Plataforma | Bajo | Auto Railway |
| VAR-22 | SEED_PMV2_FORCE | scripts seed | Dev | No | Código | Bajo | Solo dev |
| VAR-23 | SEED_FINAL_FORCE | scripts seed | Dev | No | Código | Bajo | Solo dev |
| VAR-24 | SEED_MULTIUSUARIO_FORCE | scripts seed | Dev | No | Código | Bajo | Solo dev |
| VAR-25 | REDISTRIBUIR_TRAZA | script PMV2 | Dev | No | Código | Bajo | Solo dev |
| VAR-26 | PUPPETEER_EXECUTABLE_PATH | exportDbDocPng | Dev | No | No en example | Bajo | Añadir a doc scripts |
| VAR-27 | SKIP_INTEGRATION | tests, CI | Pruebas | No | Configurada CI | Bajo | OK para CI sin MySQL |
| VAR-28 | VERIFY_* | script verificación | Dev | No | No en example | Medio | Mover a .env.example scripts |
| VAR-29 | VITE_API_URL | api.js, vercel.json | Dev/Prod | Sí prod | Configurada | Medio | Solo URL pública |
| VAR-30 | VITE_API_BASE_URL | api.js | Dev | No | Legacy | Bajo | Deprecar |
| VAR-31 | VITE_SHOW_DEMO_CREDENTIALS | LoginPage | Todos | No | Configurada | Medio | false en prod |
| VAR-32 | import.meta.env.DEV | api.js | Dev | — | Built-in | Bajo | — |
| VAR-33 | import.meta.env.PROD | api.js | Prod | — | Built-in | Bajo | — |
| VAR-34 | CYPRESS_BASE_URL | cypress, package.json | Pruebas | No | Scripts | Bajo | Documentar en .env.example |
| VAR-35 | SONAR_TOKEN | ci.yml secret | CI | Sí Sonar | Secret | Medio | Rotar periódicamente |
| VAR-36 | GITHUB_TOKEN | ci.yml secret | CI | Sí Sonar | Secret | Bajo | Auto GitHub |
| VAR-37 | JWT_SECRET (CI) | ci.yml inline | CI | Sí | Inline | Bajo | No reutilizar en prod |
| VAR-38 | MYSQL* (CI) | ci.yml inline | CI | Sí | Inline | Bajo | BD test aislada |

---

**Total:** 38 variables | **Críticas:** 4 | **No en .env.example:** 3 grupos (Railway auto, VERIFY_*, PUPPETEER)
