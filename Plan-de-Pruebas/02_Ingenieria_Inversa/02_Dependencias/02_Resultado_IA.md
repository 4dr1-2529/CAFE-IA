# 02 — Resultado IA: Análisis de Dependencias

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Fecha:** 2026-06-24  
**Fuentes:** `package.json`, `package-lock.json`, `npm list`, `npm audit`, código fuente, `sonar-project.properties`, `ml/requirements.txt`

---

## 1. Resumen ejecutivo

CAFE-IA declara **34 dependencias directas npm** distribuidas en backend (12), frontend (20) y monorepo (2), más **3 paquetes Python** para evidencia ML. Los lockfiles resuelven versiones mayormente actualizadas dentro de los rangos semver declarados.

El stack es **deliberadamente minimalista**: sin Prisma, sin Axios, sin multer, sin node-cron, sin sweetalert2 ni react-icons. Las alternativas son `mysql2` + SQL, `fetch` nativo, `ToastContext` y `lucide-react`.

**npm audit** reporta **2 vulnerabilidades backend** (1 high) y **6 frontend** (mayoría en toolchain de desarrollo). La dependencia de mayor impacto en producción es **react-router-dom 6.30.3** (CVE moderate, parche ≥6.30.4).

---

## 2. Backend

### 2.1 Manifiestos

| Archivo | Versión proyecto | Dependencias prod | Dependencias dev |
|---------|------------------|-------------------|------------------|
| `backend/package.json` | 2.0.0 | 10 | 2 |

### 2.2 Análisis por dependencia

#### express 4.22.2

- **Función:** Servidor HTTP, router, middleware chain.
- **Módulos:** `src/app.js`, 13 archivos en `interfaces/http/routes/`.
- **Relacionadas:** cors, helmet, express-rate-limit.
- **Riesgos:** Superficie HTTP; mitigado con helmet + rate-limit + validación.
- **Compatibilidad:** Node ESM, Express 4.x estable.
- **Estado:** Actualizada.
- **Criticidad:** Crítica.

#### mysql2 3.22.3

- **Función:** Pool MySQL, prepared statements, SSL Railway.
- **Módulos:** `pool.js`, `migrate.js`, `database.js`.
- **Relacionadas:** MySQL 8 Railway/local.
- **Riesgos:** SQLi si queries dinámicas inseguras — proyecto usa placeholders.
- **Estado:** Actualizada.
- **Criticidad:** Crítica.

#### jsonwebtoken 9.0.3

- **Función:** JWT access/refresh.
- **Módulos:** `AuthService.js`.
- **Relacionadas:** bcryptjs, env JWT_SECRET.
- **Riesgos:** Token compromise si secreto débil — validación ≥32 chars.
- **Estado:** Actualizada.
- **Criticidad:** Crítica.

#### bcryptjs 2.4.3

- **Función:** Hash contraseñas (cost 10).
- **Módulos:** AuthService, UsuarioService, migrate, seeds.
- **Estado:** Actualizada.
- **Criticidad:** Alta.

#### cors 2.8.6 · helmet 7.2.0 · express-rate-limit 7.5.1

- **Función:** CORS, headers seguridad, 500 req/15 min.
- **Módulos:** `app.js`.
- **Estado:** Actualizadas.
- **Criticidad:** Alta / Media.

#### dotenv 16.6.1

- **Función:** `.env` local, `override: false` para Railway.
- **Módulos:** `database.js`.
- **Estado:** Actualizada.
- **Criticidad:** Alta.

#### exceljs 4.4.0 · pdfkit 0.15.2

- **Función:** Export reportes Excel/PDF.
- **Módulos:** `ReportExportService.js`.
- **Estado:** Actualizadas.
- **Criticidad:** Media.

#### supertest 6.3.4 (dev)

- **Función:** Soporte tests HTTP.
- **Riesgo:** Transitiva **form-data HIGH** (GHSA-hmw2-7cc7-3qxx).
- **Criticidad:** Baja (solo dev).

#### @mermaid-js/mermaid-cli 11.4.0 (dev)

- **Función:** Diagramas BD PNG.
- **Riesgo:** Transitiva **dompurify moderate**.
- **Criticidad:** Baja.

### 2.3 multer y node-cron

**No instalados.** No aparecen en `package.json` ni en imports del código fuente. El sistema no implementa upload multipart ni cron jobs en Node.

### 2.4 Overrides

- `tmp` ^0.2.6 — mitigación path traversal.
- `uuid` ^11.1.1 — mitigación CVE uuid.

---

## 3. Frontend

### 3.1 Manifiestos

| Archivo | Versión | Prod | Dev |
|---------|---------|------|-----|
| `frontend/package.json` | 1.0.3 | 7 | 13 |

### 3.2 Análisis por dependencia

#### react 18.3.1 · react-dom 18.3.1

- **Función:** UI declarativa, SPA.
- **Módulos:** Toda `frontend/src/`.
- **Estado:** Actualizada (React 18 LTS).
- **Criticidad:** Crítica.

#### react-router-dom 6.30.3

- **Función:** Rutas, ProtectedShell, AdminRoute, lazy loading.
- **Módulos:** `AppRoutes.jsx`, `MainLayout.jsx`.
- **Riesgo:** CVE GHSA-2j2x-hqr9-3h42 (open redirect, rango <6.30.4).
- **Estado:** **Desactualizada** respecto al parche de seguridad.
- **Criticidad:** Alta.

#### vite 5.4.21

- **Función:** Dev server puerto 5174, build producción.
- **Módulos:** `vite.config.js`.
- **Riesgo:** esbuild ≤0.24.2 moderate (solo dev server).
- **Estado:** Actualizada en rama 5.x.
- **Criticidad:** Crítica (build).

#### tailwindcss 3.4.19

- **Función:** Estilos, dark mode class.
- **Módulos:** `index.css`, componentes.
- **Estado:** Actualizada.
- **Criticidad:** Alta.

#### recharts 2.15.4

- **Función:** Gráficos dashboard/reportes.
- **Módulos:** DashboardPage, ReportesPage.
- **Riesgo:** Bundle 411 KB (build log).
- **Criticidad:** Media.

#### lucide-react 0.294.0

- **Función:** Iconos (reemplazo de react-icons).
- **Estado:** Desactualizada (0.x semver).
- **Criticidad:** Baja.

#### react-qr-code 2.0.21 · prop-types 15.8.1

- **Función:** QR lotes, validación props.
- **Criticidad:** Baja.

### 3.3 Axios, SweetAlert2, React Icons

| Paquete | Estado | Alternativa en proyecto |
|---------|--------|----------------------|
| axios | **No instalado** | `fetch` en `services/api/client.js` |
| sweetalert2 | **No instalado** | `context/ToastContext.jsx` |
| react-icons | **No instalado** | `lucide-react` |

---

## 4. Herramientas

| Herramienta | Versión / ref | Función | Criticidad |
|-------------|---------------|---------|------------|
| Cypress | 13.17.0 | E2E 13 tests | Alta |
| JMeter | Externo | 500 req health 0% error | Media |
| SonarCloud | `4dr1-2529_CAFE-IA` | Análisis estático CI | Alta |
| Railway | PaaS | API + MySQL | Crítica |
| Vercel | PaaS | SPA build Vite | Crítica |
| MySQL | 8 | 39 tablas | Crítica |
| GitHub Actions | Node 20 | CI test/build/sonar | Alta |

---

## 5. Matriz consolidada

Ver `Evidencias/Matriz_Dependencias.md` (42 entradas DEP-001 a DEP-042).

### Vulnerabilidades npm audit

**Backend:**

| Paquete | Severidad | CVE / GHSA |
|---------|-----------|------------|
| form-data | High | GHSA-hmw2-7cc7-3qxx |
| dompurify | Moderate | GHSA-vxr8-fq34-vvx9, GHSA-cmwh-pvxp-8882 |

**Frontend:**

| Paquete | Severidad | CVE / GHSA |
|---------|-----------|------------|
| react-router | Moderate | GHSA-2j2x-hqr9-3h42 |
| esbuild | Moderate | GHSA-67mh-4wv8-2f99 |
| js-yaml | Moderate | GHSA-h67p-54hq-rp68 |
| @babel/core | Low | GHSA-4x5r-pxfx-6jf8 |

---

## 6. Compatibilidad general

| Capa | Node | ESM | Producción |
|------|------|-----|------------|
| Backend | 18–22 | Sí (`type: module`) | Railway Node 22 (logs) |
| Frontend | 18+ build | Sí | Vercel static |
| Tests | Node 20 CI | Sí | — |

---

## 7. Conclusión del análisis

Las dependencias de CAFE-IA forman un **stack acotado y mantenible**, alineado con arquitectura hexagonal y SPA moderna. Los riesgos principales son **CVE en transitivas** y **react-router-dom sin parche**, no la obsolescencia del core (Express, React 18, mysql2, Vite 5).

Detalle de mejoras en `03_Mejoras.md`. Trazabilidad en `05_Trazabilidad.md`.

---

*Documento ICACIT — Ingeniería Inversa Paso 2. Sin modificación del código CAFE-IA.*
