# Inventario Arquitectónico — CAFE-IA

**Fecha:** 2026-06-24

---

## Componentes Backend (93 archivos src/)

| Subtipo | Cantidad | Estado |
|---------|----------|--------|
| Controllers | 13 | Implementado |
| Services | 17 | Implementado |
| Repositories | 11 | Implementado |
| Routes | 14 | Implementado |
| Middleware | 4 | Implementado |
| Validators | 7 | Implementado |
| Domain | 1 | Implementado |
| Shared utils | 13 | Implementado |
| Config | 2 | Implementado |
| Models ORM | 0 | **No implementado** |

---

## Componentes Frontend (60 archivos src/)

| Subtipo | Cantidad | Estado |
|---------|----------|--------|
| Pages | 15 | Implementado |
| Layouts | 1 | Implementado |
| Components | 17 | Implementado |
| Context | 3 | Implementado |
| Hooks | 2 | Implementado |
| Services | 3 | Implementado |
| Utils | 6 | Implementado |
| Constants | 4 | Implementado |
| Routing | 1 | Implementado |

---

## Base de Datos

| Componente | Detalle |
|------------|---------|
| Motor | MySQL 8 InnoDB |
| Tablas | 39 (schema.sql) |
| Vistas | views.sql |
| Scripts | seeds.sql, migrate.js |
| Pool | min 2, max 10 |

---

## APIs REST (13 módulos)

`/auth`, `/usuarios`, `/dashboard`, `/productores`, `/lotes`, `/produccion`, `/trazabilidad`, `/control-calidad`, `/predicciones`, `/reportes`, `/chatbot`, `/auditoria`, `/base-datos`, `/admin`

---

## Seguridad

| Componente | Ubicación |
|------------|-----------|
| helmet | app.js |
| cors | app.js |
| express-rate-limit | app.js |
| auth.js JWT | middleware |
| rbac.js | middleware |
| bcryptjs | AuthService |
| RoleHelper | shared |
| auditMiddleware | middleware + auditoria_logs |

---

## Inteligencia Artificial

| Componente | Entorno | Estado |
|------------|---------|--------|
| PredictionEngine.js | Producción API | Implementado |
| PrediccionService / PredictionService | Producción API | Implementado |
| ml/train_model.py | Offline académico | No integrado API |
| ChatbotService | Producción API | Implementado (intents, no LLM externo) |

---

## Infraestructura

| Componente | Estado |
|------------|--------|
| Vercel (SPA) | Producción activa |
| Railway (API) | Producción activa |
| Railway (MySQL) | Producción activa |
| GitHub Actions CI | Implementado |
| render.yaml | Referencia |
| Docker | **No implementado** |

---

## Servicios externos

| Servicio | Uso |
|----------|-----|
| SonarCloud | Análisis estático CI |
| GitHub | Repositorio + Actions |
| npm registry | Dependencias |

**No verificados:** OpenAI, servicios LLM externos, S3, email SMTP.

---

## Total componentes inventariados

| Categoría | Total |
|-----------|-------|
| Backend archivos | 93 |
| Frontend archivos | 60 |
| Tablas BD | 39 |
| Módulos API | 13 |
| Diagramas reconstruidos | 7 |
| **Componentes clave matriz** | **55** |

---

*Clasificación para expediente ICACIT — Paso 7.*
