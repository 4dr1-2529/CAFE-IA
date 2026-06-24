# Checklist Arquitectónico — CAFE-IA

**Fecha:** 2026-06-24  
**Leyenda:** ✅ Cumple · ⚠️ Cumple parcialmente · ❌ No cumple

---

## Estilos y patrones arquitectónicos

| # | Criterio | Estado | Evidencia |
|---|----------|--------|-----------|
| C-01 | Arquitectura hexagonal implementada | ✅ Cumple | Carpetas domain/application/infrastructure/interfaces |
| C-02 | Separación por capas (presentación, aplicación, dominio, infra) | ✅ Cumple | Controllers → Services → Repositories |
| C-03 | Arquitectura cliente-servidor | ✅ Cumple | Vercel SPA + Railway API |
| C-04 | API REST con recursos nombrados | ✅ Cumple | 13 grupos `/api` |
| C-05 | Repository pattern | ⚠️ Parcial | 11 repos; SQL inline en PredictionService |
| C-06 | Dependency Injection (IoC) | ❌ No cumple | Imports estáticos; métodos static |
| C-07 | MVC en frontend | ✅ Cumple | Pages (view) + Context (model state) + Routes |
| C-08 | Middleware pattern seguridad | ✅ Cumple | helmet, cors, auth, rbac, audit |

---

## Organización y estructura

| # | Criterio | Estado | Evidencia |
|---|----------|--------|-----------|
| C-09 | Organización carpetas backend coherente | ✅ Cumple | `backend/src/` hexagonal |
| C-10 | Organización carpetas frontend coherente | ✅ Cumple | pages/components/context/services |
| C-11 | Monorepo con scripts centralizados | ✅ Cumple | `package.json` raíz |
| C-12 | Capa Models/entidades explícita | ❌ No cumple | Sin ORM ni models/ |
| C-13 | Validación entrada centralizada | ✅ Cumple | 7 validators + validate middleware |
| C-14 | Manejo errores centralizado | ✅ Cumple | AppError + middleware error app.js |
| C-15 | Documentación arquitectura en repo | ⚠️ Parcial | README + docs; sin UML formal |

---

## Base de datos

| # | Criterio | Estado | Evidencia |
|---|----------|--------|-----------|
| C-16 | Esquema relacional normalizado | ✅ Cumple | schema.sql 39 tablas |
| C-17 | Integridad referencial (FK) | ✅ Cumple | CONSTRAINT fk_* en schema |
| C-18 | Migraciones versionadas | ⚠️ Parcial | migrate.js al arranque; sin flyway/liquibase |
| C-19 | Soft delete en entidades | ✅ Cumple | `deleted_at` en tablas operativas |
| C-20 | Alineación esquema ↔ módulos API | ⚠️ Parcial | fincas, permisos sin API |

---

## Seguridad arquitectónica

| # | Criterio | Estado | Evidencia |
|---|----------|--------|-----------|
| C-21 | Autenticación JWT | ✅ Cumple | jsonwebtoken + auth middleware |
| C-22 | Autorización RBAC por rol | ✅ Cumple | admin/cliente + RoleHelper |
| C-23 | Permisos granulares | ❌ No cumple | Tablas seeds sin middleware |
| C-24 | Rate limiting | ✅ Cumple | express-rate-limit 500/15min |
| C-25 | Headers seguridad HTTP | ✅ Cumple | helmet |
| C-26 | CORS configurado | ✅ Cumple | cors + Vercel origins |
| C-27 | Auditoría acciones críticas | ✅ Cumple | auditMiddleware + auditoria_logs |

---

## Despliegue e integración

| # | Criterio | Estado | Evidencia |
|---|----------|--------|-----------|
| C-28 | Despliegue frontend cloud (Vercel) | ✅ Cumple | vercel.json |
| C-29 | Despliegue backend cloud (Railway) | ✅ Cumple | server.js + MYSQL* |
| C-30 | Variables entorno externalizadas | ✅ Cumple | env.js + .env.example |
| C-31 | CI/CD automatizado | ⚠️ Parcial | GitHub Actions; sin Cypress en CI |
| C-32 | Contenedorización Docker | ❌ No cumple | Sin Dockerfile |
| C-33 | Integración IA en dominio aislado | ✅ Cumple | PredictionEngine.js |
| C-34 | ML Python integrado en API | ❌ No cumple | Solo script offline |

---

## Calidad y pruebas

| # | Criterio | Estado | Evidencia |
|---|----------|--------|-----------|
| C-35 | Tests unitarios backend | ✅ Cumple | 18/18 node:test |
| C-36 | Tests E2E frontend | ⚠️ Parcial | Cypress manual; no en CI |
| C-37 | Análisis estático (SonarCloud) | ✅ Cumple | ci.yml + sonar-project.properties |
| C-38 | Pruebas carga | ⚠️ Parcial | JMeter solo /api/health |
| C-39 | Cobertura código en Sonar | ❌ No cumple | 0 % lcov reportado |
| C-40 | Contrato API formal (OpenAPI) | ❌ No cumple | Sin swagger/postman en repo |

---

## Resumen checklist

| Estado | Cantidad | % |
|--------|----------|---|
| ✅ Cumple | **24** | 60 % |
| ⚠️ Cumple parcialmente | **8** | 20 % |
| ❌ No cumple | **8** | 20 % |
| **Total criterios** | **40** | 100 % |

---

*Checklist basado en arquitectura verificada en Pasos 3–5 y evidencias de calidad.*
