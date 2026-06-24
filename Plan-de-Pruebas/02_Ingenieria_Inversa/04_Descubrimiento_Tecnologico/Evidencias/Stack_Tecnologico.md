# Stack Tecnológico — CAFE-IA

**Fecha:** 2026-06-24  
**Versión proyecto:** Backend 2.0.0 · Frontend 1.0.3

---

## Vista general

```
┌─────────────────────────────────────────────────────────────────┐
│                        USUARIO (Navegador)                       │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS
┌────────────────────────────▼────────────────────────────────────┐
│  VERCEL — SPA React 18 + Vite 5 + Tailwind 3 + React Router 6   │
│  Puerto build: dist/  ·  VITE_API_URL → Railway API             │
└────────────────────────────┬────────────────────────────────────┘
                             │ REST JSON + JWT Bearer
┌────────────────────────────▼────────────────────────────────────┐
│  RAILWAY — Node.js 20 + Express 4 + Arquitectura Hexagonal        │
│  helmet · cors · rate-limit · JWT · bcrypt · audit middleware   │
└────────────────────────────┬────────────────────────────────────┘
                             │ mysql2 pool (SSL)
┌────────────────────────────▼────────────────────────────────────┐
│  RAILWAY MySQL 8 — 39 tablas · FK · utf8mb4 · migrate.js        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  IA PRODUCCIÓN: PredictionEngine.js (Node.js heurístico v2)     │
│  IA ACADÉMICA:  ml/train_model.py (scikit-learn offline)        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Capa Frontend

| Componente | Tecnología | Versión |
|------------|------------|---------|
| Framework UI | React | 18.3.1 |
| Build tool | Vite | 5.4.21 |
| Estilos | Tailwind CSS + PostCSS | 3.4.19 |
| Routing | React Router DOM | 6.30.3 |
| Gráficos | Recharts | 2.15.4 |
| Iconos | lucide-react | 0.294.0 |
| QR | react-qr-code | 2.0.21 |
| HTTP | Fetch API nativo | — |
| Notificaciones | ToastContext (propio) | — |
| Tipografía | @fontsource/inter | 5.2.8 |

**No presentes:** Axios, SweetAlert2, React Icons.

---

## Capa Backend

| Componente | Tecnología | Versión |
|------------|------------|---------|
| Runtime | Node.js | 20 |
| Framework | Express | 4.22.2 |
| Auth | jsonwebtoken + bcryptjs | 9.0.3 / 2.4.3 |
| BD driver | mysql2 | 3.22.3 |
| Config | dotenv | 16.6.1 |
| Seguridad HTTP | helmet + cors + express-rate-limit | 7.2.0 / 2.8.6 / 7.5.1 |
| Reportes | pdfkit + exceljs | 0.15.2 / 4.4.0 |
| Arquitectura | Hexagonal (domain/application/infrastructure) | — |

**No presentes:** multer, node-cron.

---

## Capa Datos

| Componente | Detalle |
|------------|---------|
| Motor | MySQL 8 (Railway) |
| Esquema | `backend/sql/schema.sql` — 39 tablas |
| Migración | `migrate.js` — DDL + seeds |
| Charset | utf8mb4_unicode_ci |
| Integridad | FK CASCADE, índices, soft delete |
| Pool | min 2, max 10 conexiones |

---

## Capa Infraestructura

| Servicio | Rol | Evidencia |
|----------|-----|-----------|
| **Vercel** | Hosting SPA | `frontend/vercel.json` |
| **Railway** | API Node + MySQL | `server.js`, variables MYSQL* |
| **GitHub** | Código + CI | `.github/workflows/ci.yml` |
| render.yaml | Blueprint alternativo | No despliegue principal |

---

## Capa Calidad y DevOps

| Herramienta | Versión | Uso |
|-------------|---------|-----|
| Cypress | 13.17.0 | E2E PF-01–PF-11 |
| node:test | Node 20 | 18 tests backend |
| supertest | 6.3.4 | Tests HTTP |
| JMeter | scripts | Carga `/api/health` 500 req |
| SonarCloud | SaaS | Análisis estático en CI |
| GitHub Actions | — | backend + frontend + sonar + audit |

---

## Capa Machine Learning

| Componente | Entorno | Tecnología |
|------------|---------|------------|
| Predicción API | **Producción** | `PredictionEngine.js` (heurístico Node.js) |
| Entrenamiento | **Offline / académico** | Python + scikit-learn RandomForest |
| Librerías ML | `ml/requirements.txt` | pandas, scikit-learn, joblib |
| Integración API↔Python | — | **No implementada** |

---

## Variables de entorno clave

| Variable | Capa | Propósito |
|----------|------|-----------|
| `VITE_API_URL` | Frontend (Vercel) | URL API Railway |
| `MYSQLHOST/PORT/USER/PASSWORD/DATABASE` | Backend | Conexión MySQL |
| `JWT_SECRET` | Backend | Firma tokens (≥32 chars) |
| `CORS_ORIGINS` | Backend | Orígenes permitidos |
| `ADMIN_SEED_PASSWORD` | Backend | Seed admin Railway |

Referencia: `backend/.env.example` (copia en Evidencias).

---

*Stack verificado exclusivamente sobre artefactos del repositorio CAFE-IA.*
