# 05 — Trazabilidad — Descubrimiento Funcional

**Proyecto:** CAFE-IA  
**Actividad:** Ingeniería Inversa — Paso 3  
**Fecha del análisis:** 2026-06-24

---

## Objetivo del análisis

Identificar, documentar y clasificar todas las funcionalidades **implementadas y verificables** del sistema CAFE-IA mediante ingeniería inversa sobre código fuente, rutas API, vistas React, pruebas automatizadas y documentación del repositorio, generando evidencia para evaluación ICACIT.

---

## Carpetas revisadas

| Carpeta | Propósito |
|---------|-----------|
| `cafe-cursor/backend/src/` | Servicios, repositorios, rutas HTTP, dominio |
| `cafe-cursor/backend/src/interfaces/http/routes/` | Endpoints REST por módulo |
| `cafe-cursor/backend/src/application/services/` | Lógica de negocio |
| `cafe-cursor/backend/src/infrastructure/database/` | schema.sql, seeds, migrate |
| `cafe-cursor/frontend/src/pages/` | Vistas por módulo funcional |
| `cafe-cursor/frontend/src/constants/` | Rutas SPA |
| `cafe-cursor/frontend/src/contexts/` | AuthContext, ThemeContext |
| `cafe-cursor/frontend/src/components/` | Layout, guards, timeline, QR |
| `cafe-cursor/testing/cypress/e2e/` | Pruebas E2E PF-01–PF-11 |
| `cafe-cursor/docs/` | PMV2, documentación técnica, arquitectura |
| `cafe-cursor/Reporte-Calidad-Software/` | Cypress, JMeter, Sonar evidencias |
| `cafe-cursor/ml/` | Script ML Python (referencia académica) |

---

## Componentes analizados

### Backend (13 grupos API)

| Grupo | Archivo ruta | Estado verificado |
|-------|--------------|-------------------|
| auth | `auth.routes.js` | Completo |
| usuarios | `usuarios.routes.js` | Completo |
| dashboard | `dashboard.routes.js` | Completo |
| productores | `productores.routes.js` | Completo |
| lotes | `lotes.routes.js` | Parcial |
| produccion | `produccion.routes.js` | Completo |
| trazabilidad | `trazabilidad.routes.js` | Completo |
| control-calidad | `control-calidad.routes.js` | Completo |
| predicciones | `predicciones.routes.js` | Completo |
| reportes | `reportes.routes.js` | Completo |
| chatbot | `chatbot.routes.js` | Completo |
| auditoria | `auditoria.routes.js` | Completo |
| base-datos | `base-datos.routes.js` | Completo |
| admin | `admin.routes.js` | Completo |

### Frontend (15 rutas + login)

Dashboard, Productores, Registro, Trazabilidad, Calidad, IA, Chatbot, Reportes, BaseDatos, Usuarios, Auditoría, Evidencias, Arquitectura, Historias, Login.

### Seguridad y roles

- `middleware/auth.js` — JWT
- `middleware/rbac.js` — adminGuard, readGuard, writeGuard
- `domain/helpers/RoleHelper.js` — scope `user_id` para cliente

### Motor IA producción

- `domain/ai/PredictionEngine.js` — heurístico v2
- `application/services/PrediccionService.js`
- `application/services/ChatbotService.js`

---

## Archivos inspeccionados (muestra representativa)

| Archivo | Hallazgo clave |
|---------|----------------|
| `frontend/src/routes/AppRoutes.jsx` | 15 rutas protegidas + login |
| `frontend/src/constants/routes.js` | Constantes ROUTES |
| `frontend/src/layouts/MainLayout.jsx` | Menú PMV1/PMV2/Sistema |
| `frontend/src/pages/HistoriasUsuarioPage.jsx` | HU01–HU12 Implementado |
| `backend/src/interfaces/http/routes/index.js` | Montaje 13 routers |
| `backend/src/infrastructure/database/schema.sql` | 20+ tablas incl. fincas, permisos |
| `backend/src/infrastructure/database/seeds.sql` | Seeds permisos no usados en API |
| `backend/src/domain/ai/PredictionEngine.js` | Motor prod (no Python) |
| `testing/cypress/e2e/*.cy.js` | 11 specs funcionales |
| `docs/PMV2.md` | Evolución funcional PMV2 |
| `docs/DOCUMENTACION_TECNICA.md` | API y JWT |

Copias en `Evidencias/`: `routes_frontend.js`, `routes_api_index.js`, `README_proyecto.md`, `DOCUMENTACION_TECNICA.md`, `PMV2.md`, `MATRIZ_PRUEBAS_HU.md`, `AUDITORIA_TECNICA.md`, `arquitectura-solucion-cafe-ia.md`, `der-relaciones-completas.mmd`, `cypress_last-run.json`, `README_PRUEBAS_FUNCIONALES.md`.

---

## Evidencias utilizadas

| Tipo | Cantidad | Ubicación |
|------|----------|-----------|
| Documentos generados | 8 | `Evidencias/*.md` |
| Archivos Excel | 2 | `Inventario_Funcional.xlsx`, `Matriz_Modulos.xlsx` |
| Copias documentación proyecto | 11 | `Evidencias/` |
| Reportes calidad (Cypress) | 2 | cypress_last-run.json, README pruebas |
| Capturas pantalla | 0 | *Evidencia pendiente de incorporar* |
| Manual usuario | 0 | *Evidencia pendiente de incorporar* |

---

## Funcionalidades identificadas

| Métrica | Valor |
|---------|-------|
| Módulos (MOD-01–MOD-25) | 25 |
| Funcionalidades inventariadas | 59 |
| Completas | 48 |
| Parciales | 7 |
| No implementadas | 4 |
| Historias de usuario | 12 (todas implementadas) |
| Casos de uso documentados | 18 |

Detalle en `Evidencias/Inventario_Funcional.md` y `Evidencias/Matriz_Modulos.md`.

---

## Documentos generados

| Documento | Ruta |
|-----------|------|
| Prompt original | `01_Prompt.md` |
| Análisis funcional completo | `02_Resultado_IA.md` |
| Plan de mejoras | `03_Mejoras.md` |
| Conclusiones | `04_Conclusiones.md` |
| Trazabilidad | `05_Trazabilidad.md` |
| Inventario funcional | `Evidencias/Inventario_Funcional.md` / `.xlsx` |
| Matriz módulos | `Evidencias/Matriz_Modulos.md` / `.xlsx` |
| Matriz casos de uso | `Evidencias/Matriz_Casos_Uso.md` |
| Matriz historias usuario | `Evidencias/Matriz_Historias_Usuario.md` |
| Resumen ejecutivo | `Evidencias/Resumen_Ejecutivo.md` |
| Índice evidencias | `Evidencias/INDICE_EVIDENCIAS.md` |

---

## Relación con pasos anteriores

| Paso | Aporte a descubrimiento funcional |
|------|-----------------------------------|
| Paso 1 — Análisis de Logs | Confirmación tests 18/18 backend; Cypress 13/13; health Railway operativo |
| Paso 2 — Dependencias | Stack verificado (Express, React, Recharts, exceljs, pdfkit) que soporta módulos |

---

## Restricciones cumplidas

- No se modificó ningún archivo del proyecto CAFE-IA.
- No se inventaron funcionalidades; las no implementadas se indican explícitamente.
- Documentación en formato profesional listo para informe ICACIT.

---

**Fecha de cierre del análisis:** 2026-06-24
