# Diccionario del Dominio — CAFE-IA

**Versión:** 1.0 | **Fecha:** 24 de junio de 2026

---

## 1. Usuario (`usuarios`)

| Campo | Descripción |
|-------|-------------|
| **Descripción** | Persona con cuenta de acceso al sistema (administrador o cliente). |
| **Atributos principales** | `id`, `nombre`, `email`, `password_hash`, `rol_id`, `activo`, `fecha_registro` |
| **Relaciones** | Pertenece a `roles`; posee `productores`, `lotes`, `sesiones`, `auditoria_logs` |
| **Reglas** | RN-01, RN-04, RN-05, RN-06 |
| **Estado** | `activo` (1/0) |

---

## 2. Rol (`roles`)

| Campo | Descripción |
|-------|-------------|
| **Descripción** | Perfil de autorización del usuario. |
| **Atributos principales** | `id`, `nombre` (`admin`, `cliente`) |
| **Relaciones** | Un rol agrupa muchos usuarios; `rol_permisos` no se aplica en runtime |
| **Reglas** | RN-02, RN-03 |
| **Estado** | Fijo en semillas |

---

## 3. Productor (`productores`)

| Campo | Descripción |
|-------|-------------|
| **Descripción** | Cafetalero o productor de café vinculado a un cliente (`user_id`). **No es actor de login.** |
| **Atributos principales** | `id`, `user_id`, `codigo_productor`, `nombre`, `documento`, `parcela`, `ubicacion`, `telefono` |
| **Relaciones** | Pertenece a `usuarios`; origina `lotes` |
| **Reglas** | RN-08, RN-09, RN-14 |
| **Estado** | Activo según operación CRUD |

---

## 4. Lote (`lotes`)

| Campo | Descripción |
|-------|-------------|
| **Descripción** | Unidad trazable de café desde cosecha hasta comercialización. |
| **Atributos principales** | `id`, `codigo_lote`, `productor_id`, `user_id`, `variedad_cafe`, `fecha_cosecha`, `tipo_secado`, `cantidad_kg`, `humedad`, `temperatura`, `altitud`, `estado`, `qr_code` |
| **Relaciones** | `productores`, `usuarios`, `trazabilidad`, `control_calidad`, `predicciones_ia`, `produccion`, `inventario` |
| **Reglas** | RN-10–RN-18 |
| **Estado** | Valores de `estados_lote` (ej. En proceso, Evaluado) |

---

## 5. Trazabilidad (`trazabilidad`)

| Campo | Descripción |
|-------|-------------|
| **Descripción** | Etapas del ciclo de vida del lote (cosecha, beneficio, secado, etc.). |
| **Atributos principales** | `id`, `lote_id`, `etapa`, `orden`, `fecha`, `ubicacion`, `responsable`, `observaciones` |
| **Relaciones** | Muchas etapas por `lote` |
| **Reglas** | RN-16, RN-19 |
| **Estado** | Por etapa (completada/pendiente según datos) |

---

## 6. Control de calidad (`control_calidad`)

| Campo | Descripción |
|-------|-------------|
| **Descripción** | Evaluación sensorial (cata) de un lote. |
| **Atributos principales** | `aroma`, `sabor`, `cuerpo`, `acidez`, `dulzor`, `balance` (1–10), `puntaje_taza` (0–100), `calidad_final`, `evaluador_id`, `fecha_evaluacion` |
| **Relaciones** | 1:1 con `lote` (una evaluación por lote) |
| **Reglas** | RN-20–RN-23 |
| **Estado** | `Evaluado` |

---

## 7. Producción (`produccion`)

| Campo | Descripción |
|-------|-------------|
| **Descripción** | Registro de eventos o volúmenes de producción asociados a un lote. |
| **Atributos principales** | `lote_id`, `cantidad`, `fecha`, `tipo`, `observaciones` |
| **Relaciones** | Pertenece a `lote` |
| **Reglas** | RN-04, RN-19 |
| **Estado** | Según registro |

---

## 8. Predicción IA (`predicciones_ia`)

| Campo | Descripción |
|-------|-------------|
| **Descripción** | Resultado de ejecutar el motor predictivo sobre un lote. |
| **Atributos principales** | `lote_id`, `calidad_estimada`, `confianza`, `riesgo`, `factores_json`, `alertas`, `recomendaciones`, `fecha_prediccion` |
| **Relaciones** | 1 predicción por lote en flujo UI |
| **Reglas** | RN-24–RN-26 |
| **Estado** | Generada / consultable |

---

## 9. PredictionEngine (dominio)

| Campo | Descripción |
|-------|-------------|
| **Descripción** | Motor heurístico v2.0 en capa de dominio (sin persistencia propia). |
| **Atributos** | Entrada: humedad, temperatura, altitud, variedad, secado, calidad previa |
| **Relaciones** | Invocado por `PrediccionService`; persiste en `predicciones_ia` |
| **Reglas** | RN-25, RN-26 |
| **Estado** | Stateless |

---

## 10. Auditoría (`auditoria_logs`)

| Campo | Descripción |
|-------|-------------|
| **Descripción** | Bitácora de acciones relevantes del sistema. |
| **Atributos principales** | `usuario_id`, `accion`, `modulo`, `descripcion`, `entidad`, `entidad_id`, `ip`, `fecha` |
| **Relaciones** | Generada por `usuarios` |
| **Reglas** | RN-29, RN-30 |
| **Estado** | Append-only en práctica |

---

## 11. Reporte (servicio)

| Campo | Descripción |
|-------|-------------|
| **Descripción** | Agregación consultable de producción, calidad, trazabilidad e IA. |
| **Atributos** | Tipo, filtros, formato export |
| **Relaciones** | Lee múltiples tablas operativas |
| **Reglas** | RN-27, RN-28 |
| **Estado** | Bajo demanda |

---

## 12. Finca (`fincas`) — no operativa

| Campo | Descripción |
|-------|-------------|
| **Descripción** | Propiedad cafetalera. Tabla en BD con seeds; **sin gestión en aplicación**. |
| **Atributos principales** | `nombre`, `ubicacion`, `hectareas`, `productor_id` |
| **Relaciones** | FK opcional en `lotes.finca_id` |
| **Reglas** | RN-34 (pendiente) |
| **Estado** | Solo persistencia |

---

## 13. Chatbot IA (servicio)

| Campo | Descripción |
|-------|-------------|
| **Descripción** | Asistente conversacional con intents sobre arquitectura, PMV y datos operativos. |
| **Atributos** | mensaje, intent, respuesta |
| **Relaciones** | Consulta MySQL vía `ChatbotDataService` |
| **Reglas** | RN-31 |
| **Estado** | Stateless por petición |

---

## 14. Dashboard (`dashboard_metricas` / servicio)

| Campo | Descripción |
|-------|-------------|
| **Descripción** | Panel de KPIs y gráficos filtrados por rol. |
| **Atributos** | conteos lotes, productores, evaluaciones, predicciones, trazabilidad activa |
| **Relaciones** | Agrega entidades operativas |
| **Reglas** | RN-33, RN-04 |
| **Estado** | Calculado en tiempo real |

---

## Catálogos de soporte

`variedades_cafe`, `tipos_cultivo`, `procesos_secado`, `estados_lote`, `criterios_calidad`, `regiones`, `provincias`, `distritos` — utilizados como referencia o resolución de FK; la mayoría sin UI dedicada.

---

## Entidades de persistencia sin módulo de dominio expuesto

`cosechas`, `produccion_diaria`, `inventario`, `movimientos_stock`, `evaluaciones_calidad`, `defectos_grano`, `evaluacion_defectos`, `resultados_cata`, `variables_prediccion`, `alertas_ia`, `recomendaciones_ia`, `historial_reportes`, `notificaciones`, `configuraciones`, `actividades_usuario`, `permisos`, `rol_permisos` — existen en schema; reglas de negocio en aplicación limitadas o inexistentes.
