# Informe de Auditoría FURPS+ — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 02 — Auditor FURPS+  
**Fecha:** 24 de junio de 2026  
**Referencia plan:** `01_Planificador_FURPS/` (48 criterios)

---

## 1. Metodología utilizada

La auditoría se ejecutó sobre el sistema desplegado y el repositorio `cafe-cursor/`, sin modificar código, aplicando la matriz FURPS+ del Paso 01 con escala de cumplimiento porcentual y clasificación cualitativa (Excelente / Bueno / Regular / Deficiente).

| Fuente | Uso |
|--------|-----|
| Código fuente | Rutas API, middleware, servicios, páginas React |
| Evidencias Paso 01 | Logs npm, JMeter, Cypress, health Railway/Vercel |
| Ingeniería inversa | Inventario funcional, arquitectura, hallazgos HAL |
| SonarCloud documentado | `CORRECCIONES_SONARQUBE.md` (16 correcciones) |

**Escala de clasificación:**

| Rango % | Clasificación |
|---------|---------------|
| 90–100 | Excelente |
| 75–89 | Bueno |
| 60–74 | Regular |
| < 60 | Deficiente |

---

## 2. Dashboard resumen FURPS+

| Atributo | Cumplimiento | Estado |
|----------|--------------|--------|
| **Functionality** | **84 %** | Bueno |
| **Usability** | **80 %** | Bueno |
| **Reliability** | **83 %** | Bueno |
| **Performance** | **72 %** | Regular |
| **Supportability** | **76 %** | Bueno |
| **Seguridad (+)** | **78 %** | Bueno |
| **Arquitectura (S)** | **88 %** | Bueno |
| **Calidad General** | **79 %** | Bueno |

---

## 3. Functionality (F) — 84 % — Bueno

### 3.1 Evaluación por módulo

| Módulo | Estado | Cumplimiento | Clasificación | Riesgos | Observaciones |
|--------|--------|--------------|---------------|---------|---------------|
| **Login** | Operativo | 95 % | Excelente | Bajo | JWT, bcrypt, refresh; PF-01/02 OK |
| **Roles** | Operativo | 90 % | Bueno | Medio | admin/cliente; permisos granulares no usados |
| **Usuarios** | Operativo | 90 % | Bueno | Bajo | CRUD admin; rutas `usuarios.routes.js` |
| **Productores** | Operativo | 90 % | Bueno | Bajo | CRUD completo; PF-05 OK |
| **Producción** | Operativo | 85 % | Bueno | Bajo | POST/GET; PF-06 OK |
| **Lotes** | Operativo con brechas | 65 % | Regular | **Alto** | Sin PUT/DELETE; **sin transacción SQL** (FUR-001) |
| **Trazabilidad** | Operativo | 90 % | Bueno | Bajo | Timeline + QR; PF-07 OK |
| **Control calidad** | Operativo | 88 % | Bueno | Bajo | CalidadService ponderado; validators |
| **Dashboard** | Operativo | 85 % | Bueno | Medio | KPIs Recharts; PF-03/04 OK |
| **Reportes** | Operativo | 90 % | Bueno | Bajo | JSON + PDF/Excel; PF-09 OK |
| **IA** | Operativo heurístico | 75 % | Bueno | Medio | `PredictionEngine` v2; ML script no en runtime |
| **Chatbot** | Operativo | 88 % | Bueno | Bajo | POST `/api/chatbot`; PF-10 OK |
| **Auditoría** | Operativo | 85 % | Bueno | Bajo | Solo admin; `auditoria.routes.js` |
| **APIs REST** | Operativo | 92 % | Bueno | Bajo | 13 grupos bajo `/api` |
| **Seguridad JWT** | Operativo | 92 % | Bueno | Medio | 401 verificado; secreto ≥32 chars |

### 3.2 Criterios F (matriz)

| ID | Resultado | % | Evidencia |
|----|-----------|---|-----------|
| F-01 | Cumple | 85 | 48/59 features, 12 HU implementadas |
| F-02 | Cumple | 88 | 13/13 Cypress (mayo 2026) |
| F-03 | Cumple | 100 | POST /lotes sin token → 401 |
| F-04 | Cumple | 90 | PF-11 roles 3/3 |
| F-05 | **No cumple** | 35 | Sin BEGIN/COMMIT en LoteService |
| F-06 | Cumple | 92 | 13 routers verificados |
| F-07 | Cumple | 88 | Suite Validators 5/5 |
| F-08 | Cumple | 90 | PF-09 reportes |
| F-09 | Cumple | 88 | PF-10 chatbot |
| F-10 | Cumple | 85 | adminGuard auditoría |

---

## 4. Usability (U) — 80 % — Bueno

| Aspecto | Cumplimiento | Clasificación | Evidencia |
|---------|--------------|---------------|-----------|
| Interfaz | 88 % | Bueno | Design system `components/ui/`, Tailwind |
| Navegación | 90 % | Bueno | PMV1 Operaciones, PMV2 Mejoras, Sistema (admin) |
| Organización | 85 % | Bueno | 15 páginas por dominio |
| Diseño | 88 % | Bueno | Inter font, componentes reutilizables |
| Accesibilidad | 50 % | Regular | Sin prueba axe; labels parciales |
| Experiencia usuario | 82 % | Bueno | Cypress flujos completos |
| Facilidad aprendizaje | 80 % | Bueno | Menú estructurado PMV |
| Consistencia visual | 88 % | Bueno | KpiCard, PageHeader, patrones UI |
| Validaciones | 85 % | Bueno | FE + BE validators |
| Mensajes sistema | 78 % | Bueno | apiResponse; toasts |

**Observaciones:** ESLint reporta 189 problemas (2 errores bloqueantes en ErrorBoundary y react-hooks). No se evidencia auditoría WCAG automatizada.

---

## 5. Reliability (R) — 83 % — Bueno

| Aspecto | Cumplimiento | Clasificación | Evidencia |
|---------|--------------|---------------|-----------|
| Disponibilidad | 95 % | Excelente | JMeter 500/500 OK; Railway/Vercel HTTP 200 |
| Recuperación | 85 % | Bueno | Incidente migrate.js corregido (HAL-001) |
| Estabilidad | 88 % | Bueno | 18/18 tests backend |
| Tolerancia fallos | 85 % | Bueno | Validators, 404 handler |
| Consistencia datos | 55 % | Regular | Transacción lote ausente; seeds con warning |
| Manejo errores | 85 % | Bueno | asyncHandler, mensajes JSON |
| Robustez | 90 % | Bueno | rate-limit, helmet |
| Integridad | 55 % | Regular | FUR-001 crítico |

**Evidencia producción:** `railway_health_response.json` — `ok: true`, revisión `mysql-hexagonal-v2.6.1-usuarios-limit`, HTTP 200.

---

## 6. Performance (P) — 72 % — Regular

| Aspecto | Cumplimiento | Clasificación | Evidencia |
|---------|--------------|---------------|-----------|
| Tiempo respuesta API | 68 % | Regular | P95 ≈ 2614 ms (JMeter health) |
| APIs negocio | 20 % | Deficiente | Sin baseline JMeter con JWT |
| Consultas MySQL | 75 % | Bueno | Repositories parametrizados; revisión estática |
| Rendimiento frontend | 80 % | Bueno | Build Vite 23.65 s exitoso |
| Rendimiento backend | 85 % | Bueno | Throughput health 6320 RPM |
| Railway | 85 % | Bueno | 100 % disponibilidad documentada |
| Vercel | 90 % | Bueno | HTTP 200 SPA |
| Memoria/CPU | N/A | — | Evidencia pendiente de incorporar |

**Build frontend:** chunk `charts-BWGUVb6p.js` **411.26 KB** (gzip 110.64 KB); `vendor` 164 KB. Impacto en LCP del dashboard.

---

## 7. Supportability (S) — 76 % — Bueno

| Aspecto | Cumplimiento | Clasificación | Evidencia |
|---------|--------------|---------------|-----------|
| Arquitectura | 88 % | Bueno | Hexagonal 7.8/10 (IR Paso 06) |
| Modularidad | 88 % | Bueno | 13 módulos API, 88 % modularidad |
| Escalabilidad | 70 % | Regular | Railway sin IaC; pool configurable |
| Reutilización | 85 % | Bueno | components/ui, validators compartidos |
| Mantenibilidad | 88 % | Bueno | Capas interfaces/application/domain/infra |
| Documentación | 90 % | Bueno | README extenso, HU en app |
| Facilidad pruebas | 80 % | Bueno | node:test + Cypress; Cypress no en CI |
| Organización código | 85 % | Bueno | Estructura monorepo clara |
| Facilidad despliegue | 72 % | Regular | Manual Railway/Vercel; sin CD |

**CI:** `ci.yml` ejecuta tests backend con `SKIP_INTEGRATION=1`, build frontend, SonarCloud, npm audit con `continue-on-error`.

**Cobertura Sonar:** 0 % reportado — **Deficiente** (S-08).

---

## 8. Atributos extendidos (+) — 78 % seguridad — Bueno

| ID | Atributo | % | Clasificación | Observación |
|----|----------|---|---------------|-------------|
| X-01 | Seguridad | 78 | Bueno | JWT, helmet, bcrypt; 8 CVE npm; CORS amplio `*.vercel.app` |
| X-02 | Portabilidad | 90 | Bueno | Node 20, ES modules |
| X-03 | Compatibilidad | 88 | Bueno | React 18; Cypress electron |
| X-04 | Configuración | 85 | Bueno | 38 variables; `.env.example` |
| X-05 | Instalación | 90 | Bueno | Scripts npm documentados |
| X-06 | Despliegue | 92 | Bueno | Railway + Vercel operativos |
| X-07 | Monitoreo | 60 | Regular | Solo `/api/health`; sin APM |

**SonarCloud:** 16 hallazgos mitigados documentados en `CORRECCIONES_SONARQUBE.md`. Captura Quality Gate: evidencia pendiente de incorporar.

---

## 9. Hallazgos de auditoría (18)

| ID | Severidad | Descripción breve |
|----|-----------|-------------------|
| FUR-001 | **Crítico** | LoteService sin transacción SQL |
| FUR-002 | Alto | JMeter solo health |
| FUR-003 | Alto | Cypress fuera CI |
| FUR-004 | Alto | CVE react-router |
| FUR-005 | Alto | CVE form-data backend |
| FUR-006 | Alto | Cobertura 0 % Sonar |
| FUR-007 | Medio | SKIP_INTEGRATION CI |
| FUR-008 | Medio | P95 JMeter marginal |
| FUR-009 | Medio | Chunk Recharts 411 KB |
| FUR-010 | Medio | Lotes inmutables API |
| FUR-011 | Medio | IA heurística vs ML |
| FUR-012 | Medio | Sin accesibilidad axe |
| FUR-013 | Medio | ESLint 2 errores |
| FUR-014 | Medio | Health expone dbHost |
| FUR-015 | Medio | Backups no documentados |
| FUR-016 | Bajo | Cypress desactualizado |
| FUR-017 | Bajo | Captura Sonar pendiente |
| FUR-018 | Bajo | Fincas sin CRUD |

Detalle completo en `Evidencias/Matriz_Hallazgos.md`.

---

## 10. Riesgos consolidados

| Nivel | Cantidad | Principal |
|-------|----------|-----------|
| Crítico | 1 | Integridad BD lotes |
| Alto | 5 | CI E2E, CVE, cobertura, backups |
| Medio | 9 | Performance, lint, IA, accesibilidad |
| Bajo | 3 | Evidencias obsoletas, fincas |

---

## 11. Nivel de calidad alcanzado

| Dimensión | Puntuación |
|-----------|------------|
| Calidad funcional FURPS F | 84 % |
| Calidad experiencia U | 80 % |
| Calidad operativa R | 83 % |
| Calidad rendimiento P | 72 % |
| Calidad mantenimiento S | 76 % |
| **Calidad global FURPS+** | **79 % — Bueno** |

---

## 12. Estado general del proyecto

CAFE-IA es un sistema **funcional en producción** con **PMV implementado**, arquitectura hexagonal sólida y baseline de seguridad aceptable. La auditoría FURPS+ identifica **fortalezas claras** en disponibilidad, modularidad y cobertura funcional del flujo cafetalero, y **debilidades prioritarias** en integridad transaccional de lotes, pruebas E2E en CI, rendimiento bajo carga representativa y cobertura de código.

**Veredicto auditoría:** **APTO CON OBSERVACIONES** — apto para continuar a Paso 03 (Auditor de Implementación) y bloque OWASP, con plan de mejora FUR-001 a FUR-018.

---

*Informe generado en Paso 02 — Auditor FURPS+. Listo para anexo ICACIT.*
