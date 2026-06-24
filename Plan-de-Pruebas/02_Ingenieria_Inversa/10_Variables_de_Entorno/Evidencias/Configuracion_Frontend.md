# Configuración Frontend — Variables de Entorno

**Proyecto:** CAFE-IA | **Fecha:** 24 de junio de 2026

---

## 1. Modelo Vite (solo variables públicas)

| Aspecto | Detalle |
|---------|---------|
| Prefijo obligatorio | `VITE_` |
| Carga | `loadEnv(mode, process.cwd(), 'VITE_')` en `vite.config.js` |
| envPrefix | `['VITE_']` — bloquea exposición accidental de secretos servidor |
| Archivo local | `frontend/.env` (no versionado) |
| Plantilla | `frontend/.env.example` |

**Corrección SonarCloud documentada:** eliminado `define` que filtraba `process.env` completo al bundle.

---

## 2. Variables VITE_ implementadas

### VITE_API_URL

| Campo | Detalle |
|-------|---------|
| **Descripción** | URL base del backend REST sin sufijo `/api` |
| **Componentes** | `frontend/src/config/api.js`, `frontend/src/services/api/client.js` |
| **Obligatoria** | Sí en producción (build Vercel) |
| **Desarrollo** | Opcional — usa proxy Vite `/api` → `localhost:3029` |
| **Producción** | `vercel.json` en `env` y `build.env` |
| **Fallback código** | URL Railway hardcoded si no hay env en build prod |
| **Riesgo** | Medio — URL pública, no secreto |
| **Impacto** | Sin ella, SPA no contacta API en prod |

### VITE_API_BASE_URL

| Campo | Detalle |
|-------|---------|
| **Descripción** | Alias legacy de URL API |
| **Componente** | `api.js` (segunda opción en OR) |
| **Obligatoria** | No |
| **Estado** | Documentada como compatibilidad; preferir `VITE_API_URL` |
| **Riesgo** | Bajo |

### VITE_SHOW_DEMO_CREDENTIALS

| Campo | Detalle |
|-------|---------|
| **Descripción** | Muestra credenciales demo en pantalla login |
| **Componente** | `frontend/src/pages/auth/LoginPage.jsx` |
| **Valor esperado** | `'true'` para activar |
| **Default example** | `false` |
| **Obligatoria** | No |
| **Riesgo** | Medio en producción si `true` |
| **Impacto** | UX demo vs seguridad |

---

## 3. Variables built-in Vite

| Variable | Uso en código |
|----------|---------------|
| `import.meta.env.DEV` | Proxy `/api` vs URL absoluta |
| `import.meta.env.PROD` | Log producción; selección API_URL |
| `import.meta.env.MODE` | No referenciado directamente |

---

## 4. Configuración API (`api.js`)

Lógica de resolución `API_URL`:

1. `VITE_API_URL` o `VITE_API_BASE_URL` desde env
2. Si dev: `http://localhost:3029`
3. Si prod sin env: constante `RAILWAY_API_URL` embebida

`getApiRequestBases()`:

- Dev: `['/api']` (proxy Vite)
- Prod: `[${API_URL}/api]`

`getApiOrigin()` — descargas PDF/Excel:

- Dev: `window.location.origin`
- Prod: `API_URL`

---

## 5. Vercel — variables de build

**Archivo:** `frontend/vercel.json`

| Sección | Variable | Función |
|---------|----------|---------|
| `env` | VITE_API_URL | Runtime build Vercel |
| `build.env` | VITE_API_URL | Inyectada en `vite build` |

También configurable en panel Vercel (evidencia captura: pendiente).

---

## 6. Desarrollo local

| Mecanismo | Detalle |
|-----------|---------|
| Proxy Vite | `/api` → `http://127.0.0.1:3029` |
| Puerto | 5174 (`vite.config.js`, `package.json`) |
| .env local | Comentarios en `.env.example` para `localhost:3029` |

No se requiere `VITE_API_URL` en dev si se usa proxy.

---

## 7. Variables NO expuestas al frontend

Confirmado por diseño — **no deben existir** en bundle:

- `JWT_SECRET`, `MYSQL*`, `ADMIN_SEED_PASSWORD`
- Cualquier variable sin prefijo `VITE_`

---

## 8. Build

| Parámetro | Fuente |
|-----------|--------|
| `__APP_VERSION__` | `npm_package_version` en vite.config (no env usuario) |
| chunkSizeWarningLimit | 600 KB en vite.config |

---

## 9. Estado configuración frontend

| Variable | .env.example | vercel.json | Código | Estado |
|----------|--------------|---------------|--------|--------|
| VITE_API_URL | Sí | Sí | Sí | Configurada |
| VITE_API_BASE_URL | Comentada | No | Sí | Opcional |
| VITE_SHOW_DEMO_CREDENTIALS | Sí | No | Sí | Configurada |
