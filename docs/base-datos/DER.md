# Diagrama Entidad-Relación (DER) — Café Sostenible AI

> **Fuente:** MySQL en vivo (`cafe_sostenible`) + `backend/sql/schema.sql`  
> **Generado:** 2026-06-04 (script `npm run db:docs`)

---

## DER global

```mermaid
erDiagram
    control_calidad ||--o{ evaluacion_defectos : "control_calidad_id"
    control_calidad ||--o{ evaluaciones_calidad : "control_calidad_id"
    control_calidad ||--o{ resultados_cata : "control_calidad_id"
    criterios_calidad ||--o{ evaluaciones_calidad : "criterio_id"
    defectos_grano ||--o{ evaluacion_defectos : "defecto_id"
    distritos ||--o{ fincas : "distrito_id"
    distritos ||--o{ productores : "distrito_id"
    estados_lote ||--o{ lotes : "estado_lote_id"
    fincas ||--o{ lotes : "finca_id"
    inventario ||--o{ movimientos_stock : "inventario_id"
    lotes ||--o{ alertas_ia : "lote_id"
    lotes ||--o{ control_calidad : "lote_id"
    lotes ||--o{ cosechas : "lote_id"
    lotes ||--o{ inventario : "lote_id"
    lotes ||--o{ predicciones_ia : "lote_id"
    lotes ||--o{ produccion : "lote_id"
    lotes ||--o{ produccion_diaria : "lote_id"
    lotes ||--o{ trazabilidad : "lote_id"
    permisos ||--o{ rol_permisos : "permiso_id"
    predicciones_ia ||--o{ alertas_ia : "prediccion_id"
    predicciones_ia ||--o{ recomendaciones_ia : "prediccion_id"
    predicciones_ia ||--o{ variables_prediccion : "prediccion_id"
    procesos_secado ||--o{ lotes : "proceso_secado_id"
    productores ||--o{ fincas : "productor_id"
    productores ||--o{ lotes : "productor_id"
    productores ||--o{ usuarios : "productor_id"
    provincias ||--o{ distritos : "provincia_id"
    regiones ||--o{ provincias : "region_id"
    reportes ||--o{ exportaciones : "reporte_id"
    reportes ||--o{ historial_reportes : "reporte_id"
    roles ||--o{ rol_permisos : "rol_id"
    roles ||--o{ usuarios : "rol_id"
    tipos_cultivo ||--o{ lotes : "tipo_cultivo_id"
    usuarios ||--o{ actividades_usuario : "usuario_id"
    usuarios ||--o{ auditoria_logs : "usuario_id"
    usuarios ||--o{ control_calidad : "evaluador_id"
    usuarios ||--o{ lotes : "user_id"
    usuarios ||--o{ movimientos_stock : "usuario_id"
    usuarios ||--o{ notificaciones : "usuario_id"
    usuarios ||--o{ productores : "user_id"
    usuarios ||--o{ reportes : "usuario_id"
    usuarios ||--o{ sesiones : "usuario_id"
    usuarios ||--o{ trazabilidad : "usuario_registro_id"
    variedades_cafe ||--o{ lotes : "variedad_id"
```

## Entidades

- `regiones`
- `provincias`
- `distritos`
- `roles`
- `permisos`
- `rol_permisos`
- `usuarios`
- `sesiones`
- `auditoria_logs`
- `productores`
- `fincas`
- `variedades_cafe`
- `tipos_cultivo`
- `procesos_secado`
- `estados_lote`
- `lotes`
- `cosechas`
- `produccion`
- `produccion_diaria`
- `inventario`
- `movimientos_stock`
- `trazabilidad`
- `criterios_calidad`
- `control_calidad`
- `evaluaciones_calidad`
- `defectos_grano`
- `evaluacion_defectos`
- `resultados_cata`
- `predicciones_ia`
- `variables_prediccion`
- `alertas_ia`
- `recomendaciones_ia`
- `reportes`
- `exportaciones`
- `historial_reportes`
- `notificaciones`
- `configuraciones`
- `actividades_usuario`
- `dashboard_metricas`

## Imágenes exportadas

Ver carpeta [`../Arquitectura de la solución planteada/`](../Arquitectura%20de%20la%20solución%20planteada/).
