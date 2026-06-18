# 01 — Introducción

## 1.1 Propósito del documento

Este módulo constituye el **Reporte de Calidad de Software** del proyecto **CAFE-IA** (Café Sostenible AI), elaborado mediante análisis directo del código fuente, configuración, pruebas y documentación existente en el repositorio. No se han inventado funcionalidades ni modificado el sistema.

## 1.2 Descripción del sistema

CAFE-IA es una plataforma web de **trazabilidad inteligente para café sostenible** que gestiona:

- Productores y lotes
- Producción y trazabilidad por etapas
- Control de calidad sensorial
- Predicción IA (motor heurístico `PredictionEngine.js`)
- Dashboard analítico con KPIs
- Reportes exportables (PDF/Excel)
- Chatbot IA con intenciones predefinidas
- Auditoría de acciones (rol admin)
- Gestión de usuarios con RBAC

**Roles operativos:** `admin` (alcance global) y `cliente` (datos filtrados por `user_id`).

## 1.3 Stack tecnológico real (evidencia en código)

| Capa | Tecnología | Evidencia |
|------|------------|-----------|
| Frontend | React 18.2, Vite 5, Tailwind 3, React Router 6 | `frontend/package.json`, `vite.config.js` |
| Backend | Node.js, Express 4, ES Modules | `backend/package.json`, `backend/server.js` |
| Base de datos | MySQL 8, utf8mb4 | `backend/sql/schema.sql`, `pool.js` |
| Autenticación | JWT (jsonwebtoken), bcryptjs | `AuthService.js`, `auth.js` |
| Autorización | RBAC: readGuard, writeGuard, adminGuard | `rbac.js` |
| IA producción | PredictionEngine v2 (heurístico) | `backend/src/domain/PredictionEngine.js` |
| IA académica | Python Scikit-learn (no runtime) | `ml/train_model.py` |
| Despliegue API | Railway | README.md, health en producción |
| Despliegue SPA | Vercel | `frontend/vercel.json` |
| CI/CD | GitHub Actions | `.github/workflows/ci.yml` |

> **Nota:** La documentación externa del encargo menciona Angular 17; el repositorio CAFE-IA implementa **React + Vite**, no Angular. Este reporte refleja el stack real.

## 1.4 Arquitectura

```text
Frontend (React SPA)
    ↓ REST JSON + Bearer JWT
Express /api (Helmet, CORS, rate-limit)
    ↓
Controllers → Services → Repositories → MySQL Pool
    ↓
Domain: PredictionEngine, RoleHelper, CodeGenerator
```

Arquitectura **hexagonal parcial**: núcleo operativo (productores, lotes, calidad, trazabilidad, predicciones, dashboard) sigue Controller → Service → Repository. Reportes y producción mantienen deuda técnica documentada en `docs/AUDITORIA_TECNICA.md`.

## 1.5 Base de datos

| Propiedad | Valor verificado |
|-----------|------------------|
| Motor | MySQL 8 |
| Tablas | **39** (`CREATE TABLE` en `schema.sql`) |
| Claves foráneas | **43** (`FOREIGN KEY` en `schema.sql`) |
| Charset | utf8mb4_unicode_ci |
| Migración | Automática al iniciar (`migrate.js`) |
| Producción | Railway MySQL |

## 1.6 Entornos

| Entorno | URL / Puerto |
|---------|--------------|
| Frontend local | http://localhost:5174 |
| API local | http://localhost:3029/api |
| Frontend producción | https://cafe-ia-inky.vercel.app |
| API producción | https://cafe-sostenible-api-production-03ad.up.railway.app |

## 1.7 Credenciales de prueba (documentadas en README)

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@cafeai.com | admin123 |
| Cliente | cliente1@cafeai.com | mbappe29 |

## 1.8 Versión y revisión

- Monorepo versión: **2.0.0** (`package.json` raíz)
- Backend revisión health: `mysql-hexagonal-v2.6.1-usuarios-limit` (`app.js`)
