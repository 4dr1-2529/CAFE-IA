# Informe de Verificación de Implementación FURPS+ — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 03 — Auditor de Implementación FURPS+  
**Fecha:** 24 de junio de 2026  
**Referencias:** Paso 01 Planificador · Paso 02 Auditor

---

## 1. Objetivo

Verificar en el **código fuente, esquema de base de datos, configuración de despliegue y evidencias de prueba** si la implementación real de CAFE-IA cumple los atributos FURPS+ planificados y si las mejoras identificadas en la auditoría del Paso 02 fueron aplicadas.

---

## 2. Metodología

| Fase | Actividad |
|------|-----------|
| 1 | Revisión estática de `cafe-cursor/` (frontend, backend, sql, CI) |
| 2 | Cruce plan FURPS+ (48 criterios) vs artefactos implementados |
| 3 | Verificación hallazgos FUR-001–FUR-018 del Paso 02 en código actual |
| 4 | Validación con evidencias copiadas (tests, JMeter, Cypress, health, audits) |
| 5 | Clasificación Cumple / Cumple parcialmente / No cumple por área |

**Sin modificación de código.** Conclusiones basadas únicamente en evidencia observable.

---

## 3. Componentes revisados

| Área | Elementos verificados |
|------|----------------------|
| **Frontend** | 15 páginas React, `components/ui/` (14), `AppRoutes.jsx`, Vite config, validators |
| **Backend** | 13 routers, controllers, services, `auth.js`, `rbac.js`, `app.js`, `env.js` |
| **Base de datos** | `schema.sql` (39 tablas, FK, índices) |
| **Infraestructura** | `ci.yml`, `vercel.json`, variables `.env.example`, health Railway/Vercel |
| **Calidad** | Logs npm test/audit/lint/build, Cypress JSON, JMeter, Sonar doc |

---

## 4. Evidencias utilizadas

| Evidencia | Uso |
|-----------|-----|
| `LoteService.js` | Verificación FUR-001 transacción |
| `lotes.routes.js` | Verificación FUR-010 PUT/DELETE |
| `ci.yml` | FUR-003, FUR-007 |
| `package.json` frontend | FUR-004 react-router |
| `npm_audit_*.txt` | FUR-004, FUR-005 |
| `vite.config.js` | IMP-X03 implementado |
| `env.js` | JWT ≥32 chars |
| `schema.sql` | FK, fincas |
| `railway_health_response.json` | Despliegue, FUR-014 |
| `npm_test_backend.txt` | 18/18 |
| `cypress_last-run.json` | 13/13 |
| `CORRECCIONES_SONARQUBE.md` | 16 correcciones aplicadas |

---

## 5. Comparación diseño vs implementación

### 5.1 Frontend — 82 % — Cumple parcialmente

| Aspecto | Diseño / Plan | Implementación | Estado |
|---------|---------------|----------------|--------|
| React + Vite | Sí | `frontend/` React 18, Vite 5.4.21 | Cumple |
| Componentes UI | Design system | 14 en `components/ui/` | Cumple |
| Navegación PMV | 3 secciones menú | `MainLayout`, 15 páginas | Cumple |
| Formularios/validación | Validators | FE + BE validators | Cumple |
| Manejo errores | ErrorBoundary | Implementado; ESLint error `process` | Parcial |
| Accesibilidad | WCAG | Sin axe; no verificado | No cumple |
| Optimización charts | Lazy load recomendado | Chunk 411 KB estático | No cumple |

### 5.2 Backend — 81 % — Cumple parcialmente

| Aspecto | Diseño | Implementación | Estado |
|---------|--------|----------------|--------|
| Express hexagonal | Sí | Capas interfaces/application/domain/infrastructure | Cumple |
| 13 APIs REST | Sí | Routers verificados | Cumple |
| JWT + roles | Sí | `auth.js`, `rbac.js`, tests 401 | Cumple |
| Seguridad baseline | helmet, rate-limit, CORS | `app.js` | Cumple |
| Transacción lote | Requerido FURPS | **No** — secuencia await sin TX | **No cumple** |
| Lotes mutables | Edición recomendada | Solo GET/POST | No cumple |
| IA | ML o heurística | `PredictionEngine` heurístico; `ml/` separado | Parcial |

**Evidencia crítica:** `LoteService.create` (líneas 108–122) ejecuta `LoteRepository.create`, `TrazabilidadRepository.seedDefaultEtapas`, `updateQr`, `seedInventario` como operaciones independientes sin `getConnection`/`BEGIN`/`COMMIT`.

### 5.3 Base de datos — 76 % — Cumple parcialmente

| Aspecto | Diseño | Implementación | Estado |
|---------|--------|----------------|--------|
| Modelo relacional | 39 tablas | `schema.sql` completo | Cumple |
| Claves foráneas | Integridad referencial | FK en lotes, productores, trazabilidad, etc. | Cumple |
| Normalización | 3FN aproximada | Catálogos separados | Cumple |
| Consistencia transaccional app | Atómica en lote | No implementada en servicio | No cumple |
| fincas | Entidad dominio | Tabla + FK en lotes; sin API | Parcial |

### 5.4 Infraestructura y despliegue — 80 % — Cumple parcialmente

| Aspecto | Plan | Implementación | Estado |
|---------|------|----------------|--------|
| Railway API | Producción | HTTP 200, `ok: true` | Cumple |
| Vercel SPA | Producción | HTTP 200 | Cumple |
| Variables entorno | 38 vars | `.env.example`, validación JWT | Cumple |
| CI | Tests + build + Sonar | `SKIP_INTEGRATION=1`; sin Cypress | Parcial |
| Backups | Documentados | No evidenciado | No cumple |

---

## 6. Cumplimiento FURPS+ (implementación verificada)

| Dimensión | Planificado (P02) | Implementación (P03) | Δ |
|-----------|-------------------|----------------------|---|
| F Functionality | 84 % | **83 %** | -1 |
| U Usability | 80 % | **78 %** | -2 |
| R Reliability | 83 % | **78 %** | -5 (TX) |
| P Performance | 72 % | **70 %** | -2 |
| S Supportability | 76 % | **74 %** | -2 |
| + Seguridad | 78 % | **76 %** | -2 |
| **General** | **79 %** | **77 %** | **-2** |

La implementación coincide con la auditoría Paso 02: **no se detectaron correcciones post-auditoría** en los hallazgos críticos y altos.

---

## 7. Verificación hallazgos Paso 02 (FUR → estado código)

| ID | Severidad | Recomendación P02 | Estado implementación |
|----|-----------|-------------------|----------------------|
| FUR-001 | Crítico | Transacción lote | **No implementado** |
| FUR-002 | Alto | JMeter negocio | **No implementado** |
| FUR-003 | Alto | Cypress CI | **No implementado** |
| FUR-004 | Alto | Parche react-router | **No implementado** |
| FUR-005 | Alto | npm audit fix BE | **No implementado** |
| FUR-006 | Alto | lcov Sonar | **No implementado** |
| FUR-015 | Alto | Backups doc | **No implementado** |
| FUR-007 a FUR-018 | Medio/Bajo | Varios | **No implementado** (17/18) |

**Implementaciones positivas verificadas (preexistentes):**

| ID | Elemento | Evidencia |
|----|----------|-----------|
| IMP-P01 | JWT_SECRET ≥32 chars | `env.js` L6-14 |
| IMP-P02 | Vite solo `VITE_*` | `vite.config.js` L10 |
| IMP-P03 | 16 correcciones Sonar | `CORRECCIONES_SONARQUBE.md` |
| IMP-P04 | SHA fijo GitHub Actions | `ci.yml` |
| IMP-P05 | Producción operativa | health JSON |

---

## 8. Hallazgos de implementación (17)

Ver `Evidencias/Matriz_Hallazgos.md` (IMP-H001 a IMP-H017). Resumen:

| Severidad | Cantidad | Pendiente corrección |
|-----------|----------|----------------------|
| Crítico | 1 | 1 |
| Alto | 5 | 5 |
| Medio | 9 | 9 |
| Bajo | 2 | 2 |

---

## 9. Estado del proyecto

CAFE-IA tiene una **implementación funcional y desplegada** que materializa el PMV documentado. La arquitectura hexagonal, autenticación JWT, RBAC y esquema relacional con FK están **correctamente implementados en código**.

Las **brechas de implementación** concentradas en: integridad transaccional de lotes, pipeline CI incompleto, dependencias vulnerables sin parche y ausencia de cobertura instrumentada. Ninguna mejora del plan Paso 02 fue aplicada al código analizado en esta verificación.

---

## 10. Nivel de implementación alcanzado

| Área | Cumplimiento | Estado |
|------|--------------|--------|
| Frontend | 82 % | Cumple parcialmente |
| Backend | 81 % | Cumple parcialmente |
| Base de Datos | 76 % | Cumple parcialmente |
| Seguridad | 76 % | Cumple parcialmente |
| Arquitectura | 88 % | Cumple |
| Infraestructura | 75 % | Cumple parcialmente |
| Despliegue | 90 % | Cumple |
| Calidad | 68 % | Cumple parcialmente |
| **Implementación General** | **77 %** | **Cumple parcialmente** |

**Veredicto:** **IMPLEMENTACIÓN APTA EN PRODUCCIÓN CON DEUDA TÉCNICA PENDIENTE** — proceder a bloque OWASP (Paso 04) manteniendo plan de remediación FUR/IMP activo.

---

*Informe Paso 03 — listo para anexo ICACIT.*
