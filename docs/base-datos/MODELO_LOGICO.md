# Modelo Lógico — Café Sostenible AI (CAFE-IA)

> **Fuente:** MySQL en vivo (`cafe_sostenible`) + `backend/sql/schema.sql`  
> **Generado:** 2026-06-04 (script `npm run db:docs`)

---

## Convenciones

PK: `id` INT UNSIGNED (o compuesta en `rol_permisos`). Integridad: 43 FK.

### regiones

**Módulo:** Geografía · Regiones del país (ej. Junín)

| PK | id |
| Referenciada por | provincias |

### provincias

**Módulo:** Geografía · Provincias por región

| PK | id |
| Referencias | region_id→regiones |
| Referenciada por | distritos |

### distritos

**Módulo:** Geografía · Distritos por provincia

| PK | id |
| Referencias | provincia_id→provincias |
| Referenciada por | productores, fincas |

### roles

**Módulo:** Seguridad · Roles del sistema (admin, cliente)

| PK | id |
| Referenciada por | rol_permisos, usuarios |

### permisos

**Módulo:** Seguridad · Permisos por módulo y acción

| PK | id |
| Referenciada por | rol_permisos |

### rol_permisos

**Módulo:** Seguridad · Asignación rol–permiso (N:M)

| PK | (rol_id, permiso_id) |
| Referencias | rol_id→roles; permiso_id→permisos |

### usuarios

**Módulo:** Seguridad · Cuentas de acceso al sistema

| PK | id |
| Referencias | rol_id→roles; productor_id→productores |
| Referenciada por | sesiones, auditoria_logs, productores, lotes, movimientos_stock, trazabilidad, control_calidad, reportes, notificaciones, actividades_usuario |

### sesiones

**Módulo:** Seguridad · Refresh tokens y sesiones activas

| PK | id |
| Referencias | usuario_id→usuarios |

### auditoria_logs

**Módulo:** Seguridad · Registro de acciones API/sistema

| PK | id |
| Referencias | usuario_id→usuarios |

### productores

**Módulo:** Productores · Productores de café

| PK | id |
| Referencias | distrito_id→distritos; user_id→usuarios |
| Referenciada por | fincas, lotes, usuarios |

### fincas

**Módulo:** Productores · Fincas/parcelas por productor

| PK | id |
| Referencias | productor_id→productores; distrito_id→distritos |
| Referenciada por | lotes |

### variedades_cafe

**Módulo:** Catálogo · Variedades (Arabica, Typica, …)

| PK | id |
| Referenciada por | lotes |

### tipos_cultivo

**Módulo:** Catálogo · Tipos de cultivo

| PK | id |
| Referenciada por | lotes |

### procesos_secado

**Módulo:** Catálogo · Métodos de secado

| PK | id |
| Referenciada por | lotes |

### estados_lote

**Módulo:** Catálogo · Estados del ciclo del lote

| PK | id |
| Referenciada por | lotes |

### lotes

**Módulo:** Café · Lote — entidad central de trazabilidad

| PK | id |
| Referencias | productor_id→productores; user_id→usuarios; finca_id→fincas; variedad_id→variedades_cafe; tipo_cultivo_id→tipos_cultivo; proceso_secado_id→procesos_secado; estado_lote_id→estados_lote |
| Referenciada por | cosechas, produccion, produccion_diaria, inventario, trazabilidad, control_calidad, alertas_ia |

### cosechas

**Módulo:** Producción · Registros de cosecha por lote

| PK | id |
| Referencias | lote_id→lotes |

### produccion

**Módulo:** Producción · Procesos de producción por lote

| PK | id |
| Referencias | lote_id→lotes |

### produccion_diaria

**Módulo:** Producción · Kg procesados por día y turno

| PK | id |
| Referencias | lote_id→lotes |

### inventario

**Módulo:** Producción · Stock disponible por lote

| PK | id |
| Referencias | lote_id→lotes |
| Referenciada por | movimientos_stock |

### movimientos_stock

**Módulo:** Producción · Entradas/salidas/ajustes de inventario

| PK | id |
| Referencias | inventario_id→inventario; usuario_id→usuarios |

### trazabilidad

**Módulo:** Trazabilidad · Etapas del ciclo del lote

| PK | id |
| Referencias | lote_id→lotes; usuario_registro_id→usuarios |

### criterios_calidad

**Módulo:** Calidad · Criterios de evaluación sensorial

| PK | id |
| Referenciada por | evaluaciones_calidad |

### control_calidad

**Módulo:** Calidad · Evaluación sensorial por lote (1:1)

| PK | id |
| Referencias | lote_id→lotes; evaluador_id→usuarios |
| Referenciada por | evaluaciones_calidad, evaluacion_defectos, resultados_cata |

### evaluaciones_calidad

**Módulo:** Calidad · Puntaje por criterio en un control

| PK | id |
| Referencias | control_calidad_id→control_calidad; criterio_id→criterios_calidad |

### defectos_grano

**Módulo:** Calidad · Catálogo de defectos del grano

| PK | id |
| Referenciada por | evaluacion_defectos |

### evaluacion_defectos

**Módulo:** Calidad · Defectos detectados en un control

| PK | id |
| Referencias | control_calidad_id→control_calidad; defecto_id→defectos_grano |

### resultados_cata

**Módulo:** Calidad · Resultados de cata profesional

| PK | id |
| Referencias | control_calidad_id→control_calidad |

### predicciones_ia

**Módulo:** IA · Predicciones de calidad por lote

| PK | id |
| Referenciada por | variables_prediccion, alertas_ia, recomendaciones_ia |

### variables_prediccion

**Módulo:** IA · Variables y pesos de cada predicción

| PK | id |
| Referencias | prediccion_id→predicciones_ia |

### alertas_ia

**Módulo:** IA · Alertas del módulo IA

| PK | id |
| Referencias | lote_id→lotes; prediccion_id→predicciones_ia |

### recomendaciones_ia

**Módulo:** IA · Recomendaciones asociadas a predicción

| PK | id |
| Referencias | prediccion_id→predicciones_ia |

### reportes

**Módulo:** Reportes · Solicitudes de reportes

| PK | id |
| Referencias | usuario_id→usuarios |
| Referenciada por | exportaciones, historial_reportes |

### exportaciones

**Módulo:** Reportes · Archivos exportados (PDF/Excel/CSV)

| PK | id |
| Referencias | reporte_id→reportes |

### historial_reportes

**Módulo:** Reportes · Historial de acciones sobre reportes

| PK | id |
| Referencias | reporte_id→reportes |

### notificaciones

**Módulo:** Sistema · Notificaciones in-app por usuario

| PK | id |
| Referencias | usuario_id→usuarios |

### configuraciones

**Módulo:** Sistema · Parámetros globales clave-valor

| PK | id |

### actividades_usuario

**Módulo:** Sistema · Actividad reciente por usuario

| PK | id |
| Referencias | usuario_id→usuarios |

### dashboard_metricas

**Módulo:** Sistema · Métricas agregadas para dashboard

| PK | id |

## Relación sin FK

| Tabla | Columna | Referencia |
|-------|---------|------------|
| `predicciones_ia` | `lote_id` | `lotes(id)` |
