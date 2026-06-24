# 03 — Plan de Mejoras Funcionales

**Proyecto:** CAFE-IA  
**Fecha:** 2026-06-24  
**Origen:** Descubrimiento Funcional — Paso 3 Ingeniería Inversa

---

## Mejoras identificadas

| ID | Funcionalidad | Problema encontrado | Impacto | Riesgo | Prioridad | Recomendación | Responsable | Esfuerzo |
|----|---------------|---------------------|---------|--------|-----------|---------------|-------------|----------|
| **FUNC-01** | Fincas | Tabla `fincas` en BD y DER sin API ni vista dedicada | Modelo de datos incompleto respecto al esquema; trazabilidad sin finca explícita | Medio — inconsistencia modelo vs UI | **Alta** | Implementar `fincas.routes.js`, servicio y vista CRUD vinculada a productor | Backend + Frontend | 16–24 h |
| **FUNC-02** | Lotes | Sin PUT/DELETE en API; no se puede corregir ni dar de baja un lote | Errores de captura irreversibles sin intervención BD | Alto — integridad operativa | **Alta** | Agregar endpoints editar/soft-delete con validación scope rol | Backend Dev | 8–12 h |
| **FUNC-03** | Permisos granulares | Tablas `permisos` y `rol_permisos` en seeds sin middleware de uso | RBAC limitado a dos roles; no escalable a permisos finos | Medio — seguridad y extensibilidad | **Media** | Implementar middleware por permiso o documentar como fuera de alcance PMV | Arquitecto + Backend | 24–40 h |
| **FUNC-04** | Inventario | Insert automático al crear lote sin módulo de consulta/gestión | Stock no visible para el usuario final | Bajo — funcionalidad auxiliar | **Media** | Vista inventario con GET filtrado por rol y ajuste de cantidades | Full Stack | 12–16 h |
| **FUNC-05** | Configuración | Parámetros en tabla `configuraciones` solo por seed | No se pueden ajustar `app.nombre`, versión IA sin SQL | Bajo — operación manual | **Baja** | Pantalla admin para CRUD configuraciones clave-valor | Backend + Frontend | 8 h |
| **FUNC-06** | Modelo ML Python | `ml/train_model.py` no integrado en API producción | Discrepancia documentación académica vs runtime (`PredictionEngine.js`) | Bajo — expectativa IA | **Baja** | Documentar explícitamente motor heurístico en prod; o microservicio ML opcional | ML + Backend | 40+ h (integración) |
| **FUNC-07** | Registro público | POST `/api/auth/register` deshabilitado en prod (`ALLOW_PUBLIC_REGISTER`) | Onboarding manual de clientes | Bajo — proceso admin | **Baja** | Habilitar con captcha y aprobación admin si se requiere autoservicio | Backend Dev | 4–8 h |
| **FUNC-08** | Cypress E2E | Sin specs para calidad, usuarios, auditoría, base datos | Brechas de regresión en módulos admin | Medio — calidad | **Alta** | Agregar PF-12 a PF-15 cubriendo módulos faltantes | QA | 8–12 h |
| **FUNC-09** | Capturas evidencia | Sin screenshots por módulo en repositorio | Informe ICACIT incompleto visualmente | Bajo — documentación | **Media** | Capturar cada vista en Vercel/Railway y anexar a `Evidencias/` | QA | 2–4 h |
| **FUNC-10** | Manual usuario | No existe manual formal en repo | Curva aprendizaje para usuarios finales | Bajo — adopción | **Baja** | Redactar manual basado en HU01–HU12 y rutas verificadas | Analista | 16 h |
| **FUNC-11** | Lote `finca_id` | FK nullable en `lotes` no poblada desde UI | Trazabilidad geográfica incompleta | Medio — trazabilidad | **Media** | Selector finca en formulario registro lote (depende FUNC-01) | Full Stack | 4 h |
| **FUNC-12** | Postman/API docs | Sin colección Postman en repositorio | Integración externa dificultada | Bajo — DX | **Baja** | Exportar OpenAPI o colección desde rutas verificadas | Backend Dev | 4 h |

---

## Funcionalidades faltantes respecto a la arquitectura propuesta

Comparación con `arquitectura-solucion-cafe-ia.md` y DER `der-relaciones-completas.mmd`:

| ID | Funcionalidad arquitectura | Estado actual | Brecha |
|----|---------------------------|---------------|--------|
| **ARQ-01** | Módulo Fincas (CRUD) | Tabla BD + seeds | API y UI ausentes |
| **ARQ-02** | Gestión Inventario | Auto-insert en lote | Sin pantalla ni API dedicada |
| **ARQ-03** | RBAC permisos granulares | Seeds `permisos`/`rol_permisos` | Solo roles `admin`/`cliente` |
| **ARQ-04** | Integración ML Python en API | Script offline `train_model.py` | Motor heurístico Node.js en prod |
| **ARQ-05** | Configuración centralizada UI | Seed migrate | Sin administración parametrizable |
| **ARQ-06** | Edición completa de lotes | POST + GET | Sin PUT/DELETE |
| **ARQ-07** | Notificaciones / alertas push | No en arquitectura explícita | Alertas solo en salida predicción IA |
| **ARQ-08** | Multi-tenant por organización | Modelo por `user_id` | Sin entidad organización/empresa |

---

## Roadmap sugerido

| Fase | Mejoras | Plazo estimado |
|------|---------|----------------|
| **Inmediato** | FUNC-08, FUNC-09 | 1 semana |
| **Corto plazo** | FUNC-01, FUNC-02, FUNC-11 | 2–3 semanas |
| **Medio plazo** | FUNC-04, FUNC-03 | 1 mes |
| **Backlog** | FUNC-05, FUNC-06, FUNC-07, FUNC-10, FUNC-12 | Según prioridad negocio |

---

*Documento para anexar al informe ICACIT. No implica modificación del código CAFE-IA en esta fase.*
