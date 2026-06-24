# 02 — Resultado IA: Descubrimiento Tecnológico

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Fecha:** 2026-06-24  
**Metodología:** Ingeniería inversa sobre package.json, lockfiles, código fuente, CI/CD y evidencias de calidad

---

## 1. Panorama tecnológico

CAFE-IA es un **monorepo npm** (v2.0.0) con backend hexagonal Node.js/Express y frontend React/Vite, desplegado en **Railway** (API + MySQL) y **Vercel** (SPA). Se identificaron **54 tecnologías** en 8 categorías; **5 tecnologías del checklist académico no están implementadas** (Axios, SweetAlert2, React Icons, multer, node-cron).

**Fuentes:** `backend/package.json`, `frontend/package.json`, `package-lock.json`, `app.js`, `client.js`, `schema.sql`, `ci.yml`, `vercel.json`.

---

## 2. Frontend

### 2.1 React — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Versión** | 18.3.1 (react-dom 18.3.1) |
| **Propósito** | Framework UI SPA con componentes funcionales |
| **Ubicación** | `frontend/src/` — pages, components, contexts, hooks |
| **Componentes** | 15 páginas, MainLayout, AuthContext, DashboardPage, etc. |
| **Ventajas** | Ecosistema maduro, hooks, concurrent features |
| **Desventajas** | Bundle Recharts elevado (~411 KB) |
| **Riesgos** | Bajo — rama 18.x estable |
| **Estado** | Implementado y desplegado en Vercel |

### 2.2 Vite — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Versión** | 5.4.21 (`@vitejs/plugin-react` 4.7.0) |
| **Propósito** | Bundler, HMR, build producción |
| **Ubicación** | `frontend/vite.config.js`, scripts `dev`/`build` |
| **Ventajas** | Build rápido, ESM nativo |
| **Desventajas** | CVE esbuild en dev server (solo desarrollo) |
| **Riesgos** | Medio en entorno dev expuesto |
| **Estado** | Implementado |

### 2.3 Tailwind CSS — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Versión** | 3.4.19 + PostCSS 8.5.10 + Autoprefixer 10.5.0 |
| **Propósito** | Estilos utility-first, diseño responsive |
| **Ubicación** | `tailwind.config.js`, `index.css`, clases en JSX |
| **Ventajas** | Consistencia visual, productividad |
| **Riesgos** | Bajo |
| **Estado** | Implementado |

### 2.4 React Router — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Versión** | react-router-dom 6.30.3 |
| **Propósito** | Enrutamiento SPA, rutas protegidas, AdminRoute |
| **Ubicación** | `routes/AppRoutes.jsx`, `constants/routes.js` |
| **Ventajas** | Nested routes, loaders compatibles v6 |
| **Desventajas** | CVE open redirect moderate pendiente |
| **Riesgos** | Medio — actualizar a versión parcheada |
| **Estado** | Implementado |

### 2.5 Axios — **No implementado**

| Atributo | Detalle |
|----------|---------|
| **Hallazgo** | No aparece en `package.json` ni imports del código |
| **Sustituto** | **Fetch API nativo** en `services/api/client.js` |
| **Funcionalidad** | GET/POST/PUT/PATCH/DELETE, timeout 8s, manejo 401 |
| **Estado** | **No implementado** — fetch cubre necesidad |

### 2.6 Recharts — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Versión** | 2.15.4 |
| **Propósito** | Gráficos KPIs dashboard (barras, líneas, pie) |
| **Ubicación** | `DashboardPage.jsx`, `chartTheme.js` |
| **Ventajas** | Integración React declarativa |
| **Desventajas** | Bundle pesado |
| **Riesgos** | Bajo rendimiento LCP |
| **Estado** | Implementado |

### 2.7 SweetAlert2 — **No implementado**

| Atributo | Detalle |
|----------|---------|
| **Hallazgo** | No en dependencias |
| **Sustituto** | **ToastContext** (`context/ToastContext.jsx`, `useToast.js`) |
| **Estado** | **No implementado** |

### 2.8 React Icons — **No implementado**

| Atributo | Detalle |
|----------|---------|
| **Hallazgo** | No en dependencias |
| **Sustituto** | **lucide-react** 0.294.0 en MainLayout, páginas y componentes |
| **Estado** | **No implementado** |

### 2.9 Tecnologías frontend adicionales verificadas

| Tecnología | Versión | Propósito | Estado |
|------------|---------|-----------|--------|
| react-qr-code | 2.0.21 | QR trazabilidad | Implementado |
| prop-types | 15.8.1 | Validación props | Implementado |
| @fontsource/inter | 5.2.8 | Tipografía | Implementado |
| ESLint + Prettier | 8.57.1 / 3.8.3 | Calidad código | Implementado |

---

## 3. Backend

### 3.1 Node.js — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Versión** | 20 (CI GitHub Actions) |
| **Propósito** | Runtime JavaScript servidor |
| **Ubicación** | `backend/server.js`, módulos ES (`"type": "module"`) |
| **Riesgos** | Bajo — LTS activo |
| **Estado** | Implementado en Railway |

### 3.2 Express — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Versión** | 4.22.2 |
| **Propósito** | Framework HTTP REST, middleware chain |
| **Ubicación** | `src/app.js`, routers en `interfaces/http/routes/` |
| **Ventajas** | Maduro, middleware extensible |
| **Desventajas** | Sin tipado estático |
| **Estado** | Implementado |

### 3.3 JWT (jsonwebtoken) — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Versión** | 9.0.3 |
| **Propósito** | Access token + refresh token |
| **Ubicación** | `AuthService`, `middleware/auth.js`, tabla `sesiones` |
| **Reglas** | JWT_SECRET ≥32 chars; expiración 8h / refresh 7d |
| **Riesgos** | Medio — rotación secreto en Railway |
| **Estado** | Implementado |

### 3.4 bcrypt (bcryptjs) — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Versión** | 2.4.3 |
| **Propósito** | Hash contraseñas usuarios |
| **Ubicación** | AuthService, UsuarioService |
| **Estado** | Implementado |

### 3.5 mysql2 — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Versión** | 3.22.3 |
| **Propósito** | Driver MySQL con pool de conexiones |
| **Ubicación** | `infrastructure/database/pool.js`, repositorios |
| **Config** | Pool min 2, max 10; SSL Railway |
| **Estado** | Implementado |

### 3.6 dotenv — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Versión** | 16.6.1 |
| **Propósito** | Carga variables `.env` / Railway panel |
| **Ubicación** | `config/env.js` |
| **Riesgos** | Medio — secretos en panel cloud |
| **Estado** | Implementado |

### 3.7 cors — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Versión** | 2.8.6 |
| **Propósito** | Control orígenes cross-origin |
| **Ubicación** | `app.js` — Vercel `*.vercel.app`, CORS_ORIGINS, LAN dev |
| **Riesgos** | Medio — lista orígenes debe mantenerse |
| **Estado** | Implementado |

### 3.8 helmet — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Versión** | 7.2.0 |
| **Propósito** | Headers seguridad HTTP |
| **Ubicación** | `app.js` primera middleware |
| **Estado** | Implementado |

### 3.9 express-rate-limit — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Versión** | 7.5.1 |
| **Propósito** | Limitar 500 peticiones / 15 min por IP |
| **Ubicación** | `app.js` (deshabilitado en tests) |
| **Estado** | Implementado |

### 3.10 multer — **No implementado**

| Atributo | Detalle |
|----------|---------|
| **Hallazgo** | No en `package.json`; sin endpoints multipart |
| **Estado** | **No implementado** — API no maneja upload de archivos |

### 3.11 node-cron — **No implementado**

| Atributo | Detalle |
|----------|---------|
| **Hallazgo** | No en dependencias; sin jobs programados |
| **Estado** | **No implementado** |

### 3.12 Backend adicionales verificados

| Tecnología | Versión | Propósito | Estado |
|------------|---------|-----------|--------|
| exceljs | 4.4.0 | Export Excel reportes | Implementado |
| pdfkit | 0.15.2 | Export PDF reportes | Implementado |
| supertest | 6.3.4 | Tests HTTP (dev) | Implementado |
| node:test | nativo | Suite tests backend | Implementado |

---

## 4. Base de Datos

### 4.1 MySQL — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Versión** | 8.x (Railway managed) |
| **Propósito** | Persistencia relacional transaccional |
| **Ubicación** | Railway MySQL + local XAMPP dev |
| **Estado** | Implementado producción |

### 4.2 Estructura — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Script** | `backend/sql/schema.sql` |
| **Tablas** | **39** CREATE TABLE |
| **Módulos** | Geografía, seguridad, productores, fincas, lotes, trazabilidad, calidad, IA, inventario, auditoría |
| **Engine** | InnoDB, utf8mb4_unicode_ci |
| **Estado** | Implementado |

### 4.3 Scripts SQL — **Implementado**

| Script | Función |
|--------|---------|
| `schema.sql` | DDL completo |
| `seeds.sql` | Datos catálogo y permisos |
| `migrate.js` | Ejecución DDL + seeds al arranque |
| `backend/scripts/*.js` | Seeds PMV2, demo, verificación |

### 4.4 Relaciones e integridad — **Implementado**

| Mecanismo | Ejemplo |
|-----------|---------|
| Foreign Keys | `lotes.productor_id` → `productores.id` |
| UNIQUE | `usuarios.email`, códigos productor |
| Índices | email, rol_id, fechas auditoría |
| Soft delete | `deleted_at` en entidades principales |
| CASCADE | `rol_permisos`, `sesiones` |

---

## 5. Infraestructura

### 5.1 Railway — **Implementado (producción activa)**

| Atributo | Detalle |
|----------|---------|
| **Servicios** | API Node.js + MySQL |
| **Evidencia** | `server.js` logs `[Railway]`, health 200, `VITE_API_URL` en vercel.json |
| **Variables** | MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, JWT_SECRET |
| **Estado** | Implementado |

### 5.2 Vercel — **Implementado (producción activa)**

| Atributo | Detalle |
|----------|---------|
| **Config** | `frontend/vercel.json` |
| **Build** | `npm run build` → `dist/` |
| **Routing** | SPA rewrite a index.html |
| **API URL** | `https://cafe-sostenible-api-production-03ad.up.railway.app` |
| **Estado** | Implementado |

### 5.3 GitHub — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Repositorio** | `4dr1-2529/CAFE-IA` |
| **CI** | `.github/workflows/ci.yml` — backend test, frontend build, SonarCloud, npm audit |
| **Node** | 20 en runners |
| **Estado** | Implementado |

### 5.4 Variables de entorno — **Implementado**

Referencia completa en `backend/.env.example` (copia Evidencias): PORT, MYSQL*, JWT_*, CORS_ORIGINS, ADMIN_SEED_PASSWORD, ALLOW_PUBLIC_REGISTER.

### 5.5 Configuración de despliegue — **Implementado**

| Plataforma | Archivo | Estado |
|------------|---------|--------|
| Vercel | `vercel.json` | Activo |
| Render | `render.yaml` | Referencia alternativa |
| Docker | — | **No implementado** |

---

## 6. Calidad

### 6.1 Cypress — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Versión** | 13.17.0 (monorepo devDependency) |
| **Ubicación** | `testing/cypress/e2e/PF-*.cy.js` |
| **Cobertura** | 11 specs, 13 tests — login, dashboard, productores, registro, trazabilidad, IA, reportes, chatbot, RBAC |
| **Evidencia** | `cypress_last-run.json` — 13/13 OK |
| **Gap** | No ejecuta en GitHub Actions CI |
| **Estado** | Implementado (manual/local) |

### 6.2 JMeter — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Ubicación** | `testing/metricas/jmeter/`, Reporte-Calidad-Software |
| **Escenario** | 500 requests, 50 usuarios concurrentes → `/api/health` Railway |
| **Resultado** | 100 % éxito, P95 2614 ms, RPM 6320 |
| **Gap** | No prueba endpoints autenticados |
| **Estado** | Implementado |

### 6.3 SonarQube / SonarCloud — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Producto** | **SonarCloud** (SaaS) — no SonarQube on-prem |
| **Config** | `sonar-project.properties` |
| **CI** | Job `sonarcloud` post backend+frontend |
| **Fuentes** | `frontend/src`, `backend/src` |
| **Exclusiones** | `ml/`, `*.sql`, scripts |
| **Estado** | Implementado |

### 6.4 Tests backend — **Implementado**

| Atributo | Detalle |
|----------|---------|
| **Framework** | node:test nativo Node 20 |
| **HTTP** | supertest 6.3.4 |
| **Resultado** | 18/18 pass (Paso 1 Logs) |
| **CI** | SKIP_INTEGRATION=1 en GitHub Actions |
| **Estado** | Implementado |

---

## 7. Machine Learning

### 7.1 Modelo implementado en producción — **PredictionEngine.js**

| Atributo | Detalle |
|----------|---------|
| **Tecnología** | JavaScript heurístico v2.0 |
| **Ubicación** | `backend/src/domain/PredictionEngine.js` |
| **Propósito** | Predecir calidad, riesgo, alertas, recomendaciones |
| **Trigger** | POST `/api/predicciones/ejecutar` |
| **Integración** | PrediccionService → MySQL lectura lote/calidad |
| **Estado** | **Implementado en API producción** |

### 7.2 Modelo ML Python — **No integrado en API**

| Atributo | Detalle |
|----------|---------|
| **Script** | `ml/train_model.py` |
| **Algoritmo** | RandomForestClassifier (scikit-learn) |
| **Librerías** | pandas ≥2.0, scikit-learn ≥1.3, joblib ≥1.5 |
| **Salida** | `ml/models/quality_model.joblib`, `metrics.json` |
| **Flujo** | Offline — entrenamiento académico PMV3 |
| **Integración API** | **No implementada** |
| **Estado** | Académico / evidencia universitaria |

### 7.3 Flujo del modelo (producción)

```
Usuario → ModuloIAPage → API predicciones → PredictionEngine.js
  → factores (humedad, altitud, evaluación sensorial…)
  → puntaje calidad estimado + confianza + alertas
  → INSERT predicciones_ia
  → Reportes incluyen predicciones
```

### 7.4 Chatbot (sin ML externo)

`ChatbotService` — intents basados en datos MySQL; **no se verificó integración con LLM externo** (OpenAI, etc.).

---

## 8. Matriz resumen de estados

| Tecnología solicitada | Estado |
|----------------------|--------|
| React, Vite, Tailwind, React Router, Recharts | Implementado |
| Axios, SweetAlert2, React Icons | **No implementado** |
| Node.js, Express, JWT, bcrypt, mysql2, dotenv, cors, helmet, rate-limit | Implementado |
| multer, node-cron | **No implementado** |
| MySQL + schema + migrate | Implementado |
| Railway, Vercel, GitHub | Implementado |
| Cypress, JMeter, SonarCloud | Implementado |
| ML Python API | **No integrado** |
| PredictionEngine.js | Implementado (prod) |

---

## 9. Conclusión del análisis tecnológico

El stack de CAFE-IA es **moderno, desplegable y verificable**, con separación clara frontend (Vercel) / backend (Railway) / datos (MySQL). Las desviaciones respecto al checklist académico (Axios, SweetAlert2, React Icons, multer, node-cron) están **documentadas con sustitutos reales o ausencia justificada**.

Detalle de mejoras en `03_Mejoras.md`. Inventario completo en `Evidencias/Inventario_Tecnologico.md`.

---

*Documento ICACIT — Ingeniería Inversa Paso 4. Basado exclusivamente en artefactos del repositorio CAFE-IA.*
