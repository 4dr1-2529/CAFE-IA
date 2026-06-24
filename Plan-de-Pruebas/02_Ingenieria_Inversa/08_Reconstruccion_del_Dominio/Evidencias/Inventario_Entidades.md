# Inventario de Entidades — CAFE-IA

**Proyecto:** CAFE-IA (`cafe-cursor`)  
**Fuente:** `backend/sql/schema.sql`, servicios API, páginas React  
**Fecha:** 24 de junio de 2026

---

## Resumen

| Categoría | Cantidad |
|-----------|----------|
| Tablas en schema MySQL | 39 |
| Entidades con API/UI operativa | 14 |
| Entidades solo catálogo/semilla | 8 |
| Entidades solo persistencia (sin módulo dedicado) | 16 |
| Componente de dominio sin tabla | 1 (`PredictionEngine`) |

---

## Inventario detallado

| ID | Entidad (tabla) | Tipo | API / UI | Descripción breve |
|----|-----------------|------|----------|-------------------|
| ENT-01 | `regiones` | Catálogo geográfico | No expuesto | Regiones de Perú (semilla) |
| ENT-02 | `provincias` | Catálogo geográfico | No expuesto | Provincias por región |
| ENT-03 | `distritos` | Catálogo geográfico | No expuesto | Distritos por provincia |
| ENT-04 | `roles` | Seguridad | Implícito (JWT) | Roles `admin`, `cliente` |
| ENT-05 | `permisos` | Seguridad | No expuesto | Permisos granulares (solo seeds) |
| ENT-06 | `rol_permisos` | Seguridad | No expuesto | Relación rol–permiso (no usada en RBAC runtime) |
| ENT-07 | `usuarios` | Operativa | `/api/usuarios`, `/usuarios` | Cuentas de acceso |
| ENT-08 | `sesiones` | Operativa | `/api/auth` (refresh) | Tokens de sesión |
| ENT-09 | `auditoria_logs` | Operativa | `/api/auditoria`, `/auditoria` | Bitácora de acciones |
| ENT-10 | `productores` | Operativa | `/api/productores`, `/productores` | Cafetaleros vinculados a `user_id` |
| ENT-11 | `fincas` | Persistencia | **No implementado** | Tabla y seeds; sin CRUD API/UI |
| ENT-12 | `variedades_cafe` | Catálogo | Resolución FK en lotes | Variedades de café |
| ENT-13 | `tipos_cultivo` | Catálogo | Resolución FK en lotes | Tipos de cultivo |
| ENT-14 | `procesos_secado` | Catálogo | Resolución FK en lotes | Métodos de secado |
| ENT-15 | `estados_lote` | Catálogo | Validación en `LoteService` | Estados válidos de lote |
| ENT-16 | `lotes` | Operativa | `/api/lotes`, `/lotes` | Unidad trazable de café |
| ENT-17 | `cosechas` | Persistencia | No expuesto | Registro de cosechas |
| ENT-18 | `produccion` | Operativa | `/api/produccion`, `/produccion` | Eventos de producción por lote |
| ENT-19 | `produccion_diaria` | Persistencia | No expuesto | Agregados diarios |
| ENT-20 | `inventario` | Persistencia | Auto al crear lote | Stock por lote |
| ENT-21 | `movimientos_stock` | Persistencia | No expuesto | Movimientos de inventario |
| ENT-22 | `trazabilidad` | Operativa | `/api/trazabilidad`, `/trazabilidad` | Etapas del lote |
| ENT-23 | `criterios_calidad` | Catálogo | No expuesto | Criterios de evaluación |
| ENT-24 | `control_calidad` | Operativa | `/api/control-calidad`, `/calidad` | Evaluación sensorial |
| ENT-25 | `evaluaciones_calidad` | Persistencia | No expuesto | Histórico alternativo |
| ENT-26 | `defectos_grano` | Persistencia | No expuesto | Catálogo de defectos |
| ENT-27 | `evaluacion_defectos` | Persistencia | No expuesto | Defectos por evaluación |
| ENT-28 | `resultados_cata` | Persistencia | No expuesto | Resultados de cata |
| ENT-29 | `predicciones_ia` | Operativa | `/api/predicciones`, `/ia` | Predicciones guardadas |
| ENT-30 | `variables_prediccion` | Persistencia | No expuesto | Variables del modelo |
| ENT-31 | `alertas_ia` | Persistencia | Embebidas en predicción | Alertas generadas por motor |
| ENT-32 | `recomendaciones_ia` | Persistencia | Embebidas en predicción | Recomendaciones del motor |
| ENT-33 | `reportes` | Operativa | `/api/reportes`, `/reportes` | Agregación en tiempo de consulta |
| ENT-34 | `exportaciones` | Operativa | `/api/reportes/export` | Export PDF/Excel |
| ENT-35 | `historial_reportes` | Persistencia | No expuesto | Histórico de reportes |
| ENT-36 | `notificaciones` | Persistencia | No expuesto | Notificaciones a usuario |
| ENT-37 | `configuraciones` | Persistencia | Solo seeds | Parámetros del sistema |
| ENT-38 | `actividades_usuario` | Persistencia | Parcial vía auditoría | Actividad de usuario |
| ENT-39 | `dashboard_metricas` | Operativa | `/api/dashboard` | KPIs calculados |
| DOM-01 | `PredictionEngine` | Dominio puro | `domain/PredictionEngine.js` | Motor heurístico v2.0 (sin tabla) |

---

## Entidades solicitadas no implementadas como módulo

| Entidad solicitada | Estado en CAFE-IA |
|--------------------|-------------------|
| Finca (gestión) | Tabla `fincas` existe; **no hay API ni UI**. Ubicación en `productores.parcela` |
| Modelo IA (ML entrenado) | Solo heurística `PredictionEngine`; scripts Python offline no integrados en runtime |
| Historial (genérico) | `historial_reportes`, `actividades_usuario` sin módulo dedicado |

---

## Nota sobre «Productor»

**Productor** es entidad de negocio (cafetalero), **no** rol de autenticación. Los roles implementados son `admin` y `cliente`. El rol legacy `productor`/`supervisor` se normaliza a `cliente` en `RoleHelper.js`.
