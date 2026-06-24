# Conclusiones — Reconstrucción del Dominio CAFE-IA

**Paso:** 08 — Reconstrucción del Dominio  
**Fecha:** 24 de junio de 2026  
**Evaluación:** Informe ICACIT — Ingeniería Inversa

---

## Estado del dominio

El dominio de negocio de CAFE-IA se encuentra en un **estado operativo y funcional** para el ciclo principal del café especial: registro de productores, creación de lotes, trazabilidad por etapas, evaluación de calidad sensorial, consulta analítica, reportes exportables, predicción heurística bajo demanda, asistencia por chatbot y auditoría administrativa.

La reconstrucción confirma que **el núcleo del dominio está implementado** y alineado con 12 historias de usuario en estado «Implementado». Simultáneamente, el modelo de datos relacional (**39 tablas**) excede significativamente la superficie funcional expuesta (**~14 entidades operativas**), lo que indica un dominio **parcialmente materializado** en la capa de aplicación.

---

## Calidad del modelo de negocio

| Criterio | Evaluación |
|----------|------------|
| Claridad del agregado central (Lote) | Alta |
| Coherencia reglas código ↔ BD | Alta en módulos activos |
| Separación actor / entidad | Media (ambigüedad Productor) |
| Completitud schema vs aplicación | Media-baja |
| Expresividad del lenguaje ubicuo | Media |
| **Calificación global** | **7,5 / 10** |

Las reglas de negocio críticas (RBAC, alcance por `user_id`, validación de lotes, unicidad de calidad, motor predictivo) están **codificadas y testeadas** en servicios de aplicación y dominio, lo que constituye una base sólida para evolución del producto.

---

## Cobertura funcional

| Área | Cobertura |
|------|-----------|
| Identidad y acceso | Alta (login, usuarios, JWT) |
| Gestión productores | Alta |
| Gestión fincas | **Nula** (solo BD) |
| Lotes y trazabilidad | Alta |
| Calidad | Alta (sin defectos de grano) |
| Producción | Media (sin agregados diarios UI) |
| Reportes y dashboard | Alta |
| IA predictiva | Media (heurística, no ML runtime) |
| Chatbot | Media-alta |
| Auditoría | Alta (solo admin) |
| Inventario / stock | Baja (auto-create sin gestión) |

**Cobertura estimada del dominio declarado en schema:** ~60 % funcionalmente expuesto.  
**Cobertura del flujo de negocio cafetalero principal:** ~85 %.

---

## Fortalezas

1. **Lote como eje trazable** con automatismos al crear (trazabilidad, inventario, QR).
2. **RBAC binario claro** (admin global / cliente acotado) con helpers reutilizables.
3. **Calidad cuantificada** con fórmula determinista y tests unitarios.
4. **PredictionEngine desacoplado** en capa de dominio (DDD parcial).
5. **Trazabilidad de acciones** mediante `ActionLogService` y módulo de auditoría.
6. **12 HUs implementadas** con evidencia en código, tests E2E y matrices del Paso 03.

---

## Debilidades

1. **Brecha schema–aplicación:** 16+ tablas sin reglas ni UI.
2. **Fincas no gestionables** pese a existir en modelo relacional.
3. **Permisos granulares** definidos en BD pero no aplicados.
4. **Lotes inmutables** post-creación (sin edición controlada).
5. **Terminología inconsistente** en clasificación de calidad (HU vs código).
6. **IA presentada como predictiva** pero implementación heurística en runtime.

---

## Riesgos

| Riesgo | Probabilidad | Severidad |
|--------|--------------|-----------|
| Interpretación errónea del rol «Productor» en auditorías | Media | Media |
| Expectativa de ML no cumplida en evaluación ICACIT | Media | Alta |
| Datos huérfanos en tablas no expuestas | Alta | Baja |
| Deuda por modelo relacional sobredimensionado | Alta | Media |
| Falta de gestión de fincas limita trazabilidad geográfica | Alta | Media |

---

## Nivel de madurez del dominio

| Dimensión | Nivel (1–5) |
|-----------|-------------|
| Modelado conceptual | 4 |
| Implementación de reglas | 4 |
| Completitud funcional | 3 |
| Alineación datos–negocio | 3 |
| Evolucionabilidad | 3 |
| **Madurez global** | **3,4 / 5 (Intermedio-avanzado)** |

---

## Conclusión final

CAFE-IA dispone de un **dominio de negocio cafetalero reconstruible, coherente y demostrable** para fines de evaluación ICACIT en su flujo operativo principal. La documentación generada en este paso representa **fielmente lo implementado**, sin inventar entidades ni reglas inexistentes.

La principal recomendación estratégica es **reducir la brecha entre el modelo de datos y el dominio expuesto**: implementar o deprecar formalmente las entidades huérfanas, completar la gestión de fincas, y clarificar el alcance real de la «IA» del sistema. Con estas acciones, el dominio podría alcanzar madurez **4/5** en una siguiente iteración.

---

*Documento listo para anexar al informe de evaluación de evidencias ICACIT.*
