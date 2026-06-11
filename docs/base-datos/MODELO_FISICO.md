# Modelo Físico — Café Sostenible AI (CAFE-IA)

> **Fuente:** MySQL en vivo (`cafe_sostenible`) + `backend/sql/schema.sql`  
> **Generado:** 2026-06-04 (script `npm run db:docs`)

---

## Inventario (39 tablas)

| # | Tabla | Módulo | Descripción | PK |
|---|-------|--------|-------------|----|
| 1 | `regiones` | Geografía | Regiones del país (ej. Junín) | `id` |
| 2 | `provincias` | Geografía | Provincias por región | `id` |
| 3 | `distritos` | Geografía | Distritos por provincia | `id` |
| 4 | `roles` | Seguridad | Roles del sistema (admin, cliente) | `id` |
| 5 | `permisos` | Seguridad | Permisos por módulo y acción | `id` |
| 6 | `rol_permisos` | Seguridad | Asignación rol–permiso (N:M) | `(rol_id, permiso_id)` |
| 7 | `usuarios` | Seguridad | Cuentas de acceso al sistema | `id` |
| 8 | `sesiones` | Seguridad | Refresh tokens y sesiones activas | `id` |
| 9 | `auditoria_logs` | Seguridad | Registro de acciones API/sistema | `id` |
| 10 | `productores` | Productores | Productores de café | `id` |
| 11 | `fincas` | Productores | Fincas/parcelas por productor | `id` |
| 12 | `variedades_cafe` | Catálogo | Variedades (Arabica, Typica, …) | `id` |
| 13 | `tipos_cultivo` | Catálogo | Tipos de cultivo | `id` |
| 14 | `procesos_secado` | Catálogo | Métodos de secado | `id` |
| 15 | `estados_lote` | Catálogo | Estados del ciclo del lote | `id` |
| 16 | `lotes` | Café | Lote — entidad central de trazabilidad | `id` |
| 17 | `cosechas` | Producción | Registros de cosecha por lote | `id` |
| 18 | `produccion` | Producción | Procesos de producción por lote | `id` |
| 19 | `produccion_diaria` | Producción | Kg procesados por día y turno | `id` |
| 20 | `inventario` | Producción | Stock disponible por lote | `id` |
| 21 | `movimientos_stock` | Producción | Entradas/salidas/ajustes de inventario | `id` |
| 22 | `trazabilidad` | Trazabilidad | Etapas del ciclo del lote | `id` |
| 23 | `criterios_calidad` | Calidad | Criterios de evaluación sensorial | `id` |
| 24 | `control_calidad` | Calidad | Evaluación sensorial por lote (1:1) | `id` |
| 25 | `evaluaciones_calidad` | Calidad | Puntaje por criterio en un control | `id` |
| 26 | `defectos_grano` | Calidad | Catálogo de defectos del grano | `id` |
| 27 | `evaluacion_defectos` | Calidad | Defectos detectados en un control | `id` |
| 28 | `resultados_cata` | Calidad | Resultados de cata profesional | `id` |
| 29 | `predicciones_ia` | IA | Predicciones de calidad por lote | `id` |
| 30 | `variables_prediccion` | IA | Variables y pesos de cada predicción | `id` |
| 31 | `alertas_ia` | IA | Alertas del módulo IA | `id` |
| 32 | `recomendaciones_ia` | IA | Recomendaciones asociadas a predicción | `id` |
| 33 | `reportes` | Reportes | Solicitudes de reportes | `id` |
| 34 | `exportaciones` | Reportes | Archivos exportados (PDF/Excel/CSV) | `id` |
| 35 | `historial_reportes` | Reportes | Historial de acciones sobre reportes | `id` |
| 36 | `notificaciones` | Sistema | Notificaciones in-app por usuario | `id` |
| 37 | `configuraciones` | Sistema | Parámetros globales clave-valor | `id` |
| 38 | `actividades_usuario` | Sistema | Actividad reciente por usuario | `id` |
| 39 | `dashboard_metricas` | Sistema | Métricas agregadas para dashboard | `id` |

## Claves foráneas (43)

| Tabla | Columna | Constraint | → Referencia | ON DELETE |
|-------|---------|------------|--------------|----------|
| `provincias` | `region_id` | `fk_provincias_region` | `regiones(id)` | — |
| `distritos` | `provincia_id` | `fk_distritos_provincia` | `provincias(id)` | — |
| `rol_permisos` | `rol_id` | `fk_rp_rol` | `roles(id)` | ON DELETE CASCADE |
| `rol_permisos` | `permiso_id` | `fk_rp_permiso` | `permisos(id)` | ON DELETE CASCADE |
| `usuarios` | `rol_id` | `fk_usuarios_rol` | `roles(id)` | — |
| `sesiones` | `usuario_id` | `fk_sesiones_usuario` | `usuarios(id)` | ON DELETE CASCADE |
| `auditoria_logs` | `usuario_id` | `fk_auditoria_usuario` | `usuarios(id)` | ON DELETE SET NULL |
| `productores` | `distrito_id` | `fk_productores_distrito` | `distritos(id)` | — |
| `productores` | `user_id` | `fk_productores_usuario` | `usuarios(id)` | ON DELETE SET NULL |
| `fincas` | `productor_id` | `fk_fincas_productor` | `productores(id)` | — |
| `fincas` | `distrito_id` | `fk_fincas_distrito` | `distritos(id)` | — |
| `lotes` | `productor_id` | `fk_lotes_productor` | `productores(id)` | — |
| `lotes` | `user_id` | `fk_lotes_usuario` | `usuarios(id)` | — |
| `lotes` | `finca_id` | `fk_lotes_finca` | `fincas(id)` | — |
| `lotes` | `variedad_id` | `fk_lotes_variedad` | `variedades_cafe(id)` | — |
| `lotes` | `tipo_cultivo_id` | `fk_lotes_tipo_cultivo` | `tipos_cultivo(id)` | — |
| `lotes` | `proceso_secado_id` | `fk_lotes_proceso_secado` | `procesos_secado(id)` | — |
| `lotes` | `estado_lote_id` | `fk_lotes_estado` | `estados_lote(id)` | — |
| `cosechas` | `lote_id` | `fk_cosechas_lote` | `lotes(id)` | — |
| `produccion` | `lote_id` | `fk_produccion_lote` | `lotes(id)` | — |
| `produccion_diaria` | `lote_id` | `fk_prod_diaria_lote` | `lotes(id)` | — |
| `inventario` | `lote_id` | `fk_inventario_lote` | `lotes(id)` | — |
| `movimientos_stock` | `inventario_id` | `fk_mov_stock_inventario` | `inventario(id)` | — |
| `movimientos_stock` | `usuario_id` | `fk_mov_stock_usuario` | `usuarios(id)` | — |
| `trazabilidad` | `lote_id` | `fk_trazabilidad_lote` | `lotes(id)` | ON DELETE CASCADE |
| `trazabilidad` | `usuario_registro_id` | `fk_trazabilidad_usuario` | `usuarios(id)` | — |
| `control_calidad` | `lote_id` | `fk_calidad_lote` | `lotes(id)` | — |
| `control_calidad` | `evaluador_id` | `fk_calidad_evaluador` | `usuarios(id)` | — |
| `evaluaciones_calidad` | `control_calidad_id` | `fk_eval_calidad_control` | `control_calidad(id)` | ON DELETE CASCADE |
| `evaluaciones_calidad` | `criterio_id` | `fk_eval_calidad_criterio` | `criterios_calidad(id)` | — |
| `evaluacion_defectos` | `control_calidad_id` | `fk_eval_def_control` | `control_calidad(id)` | ON DELETE CASCADE |
| `evaluacion_defectos` | `defecto_id` | `fk_eval_def_defecto` | `defectos_grano(id)` | — |
| `resultados_cata` | `control_calidad_id` | `fk_cata_control` | `control_calidad(id)` | ON DELETE CASCADE |
| `variables_prediccion` | `prediccion_id` | `fk_var_pred` | `predicciones_ia(id)` | ON DELETE CASCADE |
| `alertas_ia` | `lote_id` | `fk_alertas_lote` | `lotes(id)` | — |
| `alertas_ia` | `prediccion_id` | `fk_alertas_pred` | `predicciones_ia(id)` | ON DELETE SET NULL |
| `recomendaciones_ia` | `prediccion_id` | `fk_recom_pred` | `predicciones_ia(id)` | ON DELETE CASCADE |
| `reportes` | `usuario_id` | `fk_reportes_usuario` | `usuarios(id)` | — |
| `exportaciones` | `reporte_id` | `fk_export_reporte` | `reportes(id)` | ON DELETE CASCADE |
| `historial_reportes` | `reporte_id` | `fk_hist_reporte` | `reportes(id)` | ON DELETE CASCADE |
| `notificaciones` | `usuario_id` | `fk_notif_usuario` | `usuarios(id)` | ON DELETE CASCADE |
| `actividades_usuario` | `usuario_id` | `fk_actividades_usuario` | `usuarios(id)` | ON DELETE CASCADE |
| `usuarios` | `productor_id` | `fk_usuarios_productor` | `productores(id)` | ON DELETE SET NULL |

## Sin FK declarada

- `predicciones_ia.lote_id` → `lotes(id)` (índice en DDL)

## Estadísticas

| Métrica | Valor |
|---------|-------|
| Tablas | 39 |
| FK | 43 |
| Soft delete | 7 |
