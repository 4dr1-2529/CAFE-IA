# Dependencias Frontend — CAFE-IA

**Fuente:** `cafe-cursor/frontend/package.json` · `npm_list_frontend.json`  
**Fecha:** 2026-06-24

---

## Resumen

| Categoría | Cantidad |
|-----------|----------|
| Dependencias de producción | 7 |
| Dependencias de desarrollo | 13 |

---

## Dependencias de producción

### react — 18.3.1 (declarada ^18.2.0)

| Atributo | Detalle |
|----------|---------|
| **Función** | Biblioteca UI principal |
| **Módulos** | Toda `frontend/src/` — páginas, layouts, context, components |
| **Relacionadas** | react-dom, react-router-dom |
| **Riesgos** | Bajo si se mantiene parcheado |
| **Estado** | **Actualizada** (18.3.1 LTS) |
| **Criticidad** | **Crítica** |

### react-dom — 18.3.1

| Atributo | Detalle |
|----------|---------|
| **Función** | Renderizado DOM |
| **Módulos** | `main.jsx`, montaje SPA |
| **Estado** | **Actualizada** |
| **Criticidad** | **Crítica** |

### react-router-dom — 6.30.3 (declarada ^6.20.0)

| Atributo | Detalle |
|----------|---------|
| **Función** | Enrutamiento SPA, rutas protegidas |
| **Módulos** | `routes/AppRoutes.jsx`, `layouts/MainLayout.jsx`, `AdminRoute.jsx` |
| **Relacionadas** | react-router 6.30.3 |
| **Riesgos** | **CVE moderate** GHSA-2j2x-hqr9-3h42 (open redirect, rango <6.30.4) |
| **Estado** | **Desactualizada** (parcheado en ≥6.30.4 pendiente) |
| **Criticidad** | **Alta** |

### vite — 5.4.21 (declarada ^5.0.8)

| Atributo | Detalle |
|----------|---------|
| **Función** | Bundler y dev server |
| **Módulos** | `vite.config.js`, scripts build/dev |
| **Relacionadas** | @vitejs/plugin-react, esbuild (transitiva) |
| **Riesgos** | **esbuild** moderate en dev server (GHSA-67mh-4wv8-2f99) |
| **Estado** | **Actualizada** dentro de rama 5.x |
| **Criticidad** | **Crítica** (build) |

### tailwindcss — 3.4.19 (declarada ^3.3.6)

| Atributo | Detalle |
|----------|---------|
| **Función** | Estilos utility-first, dark mode `class` |
| **Módulos** | `index.css`, `tailwind.config.js`, componentes UI |
| **Relacionadas** | postcss, autoprefixer |
| **Estado** | **Actualizada** |
| **Criticidad** | **Alta** |

### recharts — 2.15.4 (declarada ^2.10.3)

| Atributo | Detalle |
|----------|---------|
| **Función** | Gráficos dashboard y reportes |
| **Módulos** | `DashboardPage.jsx`, `ReportesPage.jsx` |
| **Riesgos** | Bundle pesado (~411 KB chunk en build) |
| **Estado** | **Actualizada** |
| **Criticidad** | **Media** |

### lucide-react — 0.294.0

| Atributo | Detalle |
|----------|---------|
| **Función** | Iconografía UI (sustituto de React Icons) |
| **Módulos** | Layout, páginas, componentes UI |
| **Estado** | **Desactualizada** (semver 0.x; funcional) |
| **Criticidad** | **Baja** |

### react-qr-code — 2.0.21

| Atributo | Detalle |
|----------|---------|
| **Función** | Códigos QR por lote |
| **Módulos** | `components/features/LoteQrPanel.jsx` |
| **Estado** | **Actualizada** |
| **Criticidad** | **Baja** |

### prop-types — 15.8.1

| Atributo | Detalle |
|----------|---------|
| **Función** | Validación props en componentes |
| **Módulos** | Componentes UI selectos |
| **Estado** | **Actualizada** |
| **Criticidad** | **Baja** |

---

## Dependencias de desarrollo (selección)

| Paquete | Versión | Función | Estado | Criticidad |
|---------|---------|---------|--------|------------|
| @vitejs/plugin-react | 4.7.0 | Plugin React para Vite | Actualizada | Alta |
| eslint | 8.57.1 | Lint JS/JSX | Desactualizada (ESLint 9 disponible) | Media |
| eslint-plugin-react | 7.37.5 | Reglas React | Actualizada | Media |
| eslint-plugin-react-hooks | 4.6.2 | Reglas hooks | Actualizada | Media |
| prettier | 3.8.3 | Formato código | Actualizada | Baja |
| postcss | 8.5.10 | Pipeline CSS | Actualizada | Media |
| autoprefixer | 10.5.0 | Prefijos CSS | Actualizada | Baja |
| @fontsource/inter | 5.2.8 | Fuente Inter local | Actualizada | Baja |
| @types/react | 18.3.28 | Tipos TS (referencia) | Actualizada | Baja |
| @types/react-dom | 18.3.7 | Tipos TS DOM | Actualizada | Baja |

---

## HTTP cliente: fetch nativo (no Axios)

El proyecto **no instala Axios**. El cliente REST está en `services/api/client.js` usando **`fetch` nativo** del navegador con JWT en `localStorage`.

---

## Dependencias solicitadas en alcance pero NO instaladas

| Paquete | Alternativa en CAFE-IA |
|---------|------------------------|
| **axios** | `fetch` en `services/api/client.js` |
| **sweetalert2** | `ToastContext.jsx` (notificaciones propias) |
| **react-icons** | `lucide-react` |

---

## Vulnerabilidades npm audit

| Paquete | Severidad | Nota |
|---------|-----------|------|
| react-router | Moderate | Afecta react-router-dom 6.30.3 |
| esbuild | Moderate | Transitiva de Vite — solo dev |
| js-yaml | Moderate | Transitiva ESLint |
| @babel/core | Low | Transitiva build |

Ver `Evidencias/npm_audit_frontend.json`.
