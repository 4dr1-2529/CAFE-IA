# Arquitectura de Despliegue — CAFE-IA

**Fecha:** 2026-06-24

---

## 1. Entornos

| Entorno | Frontend | Backend | Base de datos |
|---------|----------|---------|---------------|
| **Producción** | Vercel | Railway Web Service | Railway MySQL 8 |
| **Desarrollo** | Vite :5174 | Node :3029 | MySQL local XAMPP |
| **CI** | npm run build | npm test | SKIP_INTEGRATION (sin MySQL real) |

---

## 2. Pipeline de despliegue

```
git push → GitHub
    ├── GitHub Actions: backend test + frontend build + SonarCloud
    ├── Vercel: auto-deploy frontend (vercel.json)
    └── Railway: auto-deploy backend (git connect / npm start)
```

---

## 3. Configuración Vercel

| Parámetro | Valor verificado |
|-----------|------------------|
| framework | vite |
| buildCommand | npm run build |
| outputDirectory | dist |
| rewrites | SPA → index.html |
| VITE_API_URL | Railway API production URL |

**Archivo:** `frontend/vercel.json` (copia en Evidencias).

---

## 4. Configuración Railway

| Parámetro | Fuente |
|-----------|--------|
| startCommand | npm start → server.js |
| host | 0.0.0.0 |
| MYSQLHOST/PORT/USER/PASSWORD/DATABASE | Panel Railway |
| JWT_SECRET | Panel Railway (≥32 chars) |
| CORS_ORIGINS | Incluye dominio Vercel |

**Evidencia:** `server.js`, `backend/.env.example`, health `/api/health` OK.

**render.yaml:** Blueprint alternativo — no despliegue principal activo documentado.

---

## 5. Variables críticas despliegue

| Variable | Capa |
|----------|------|
| VITE_API_URL | Vercel build |
| MYSQL* | Railway runtime |
| JWT_SECRET | Railway runtime |
| CORS_ORIGINS | Railway runtime |
| ADMIN_SEED_PASSWORD | Railway seed admin |

---

## 6. Diagrama despliegue

Ver `Diagrama_Despliegue.md` / `.mmd`.

---

## 7. No implementado en despliegue

- Dockerfile / docker-compose
- Blue-green / canary
- CDN para API (solo para SPA)
- Multi-región activo-activo

---

*Reconstrucción basada en configuraciones reales del repositorio.*
