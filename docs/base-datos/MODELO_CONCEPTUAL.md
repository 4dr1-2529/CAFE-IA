# Modelo Conceptual — Café Sostenible AI (CAFE-IA)

> **Fuente:** MySQL en vivo (`cafe_sostenible`) + `backend/sql/schema.sql`  
> **Generado:** 2026-06-04 (script `npm run db:docs`)

---

## 1. Propósito

Sistema de gestión y trazabilidad de café sostenible con IA: geografía, multiusuario, lotes, calidad, predicciones y auditoría.

## 2. Agregados (11 dominios, 39 tablas)

| Agregado | Tablas |
|----------|--------|
| **Geografía** | `regiones`, `provincias`, `distritos` |
| **Seguridad** | `roles`, `permisos`, `rol_permisos`, `usuarios`, `sesiones`, `auditoria_logs` |
| **Productores** | `productores`, `fincas` |
| **Catálogo** | `variedades_cafe`, `tipos_cultivo`, `procesos_secado`, `estados_lote` |
| **Café** | `lotes` |
| **Producción** | `cosechas`, `produccion`, `produccion_diaria`, `inventario`, `movimientos_stock` |
| **Trazabilidad** | `trazabilidad` |
| **Calidad** | `criterios_calidad`, `control_calidad`, `evaluaciones_calidad`, `defectos_grano`, `evaluacion_defectos`, `resultados_cata` |
| **IA** | `predicciones_ia`, `variables_prediccion`, `alertas_ia`, `recomendaciones_ia` |
| **Reportes** | `reportes`, `exportaciones`, `historial_reportes` |
| **Sistema** | `notificaciones`, `configuraciones`, `actividades_usuario`, `dashboard_metricas` |

## 3. Relaciones clave

- **Geografía:** Región → Provincia → Distrito.
- **Seguridad:** Rol ↔ Permiso (N:M); Usuario → Rol; Usuario ↔ Productor.
- **Núcleo:** Productor y Usuario → muchos Lotes.
- **Lote:** Producción, inventario, trazabilidad, calidad (1:1), IA y alertas.
- **IA:** Predicción → variables y recomendaciones; alertas por lote.

## 4. Métricas

| Métrica | Valor |
|---------|-------|
| Tablas | **39** |
| FK | **43** |
| Sin FK (lógica) | **1** |
