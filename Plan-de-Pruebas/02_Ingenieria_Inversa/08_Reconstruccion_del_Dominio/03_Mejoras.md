# Plan de Mejora del Dominio — CAFE-IA

**Fecha:** 24 de junio de 2026

---

| ID | Entidad | Problema | Riesgo | Impacto | Prioridad | Recomendación | Responsable | Esfuerzo |
|----|---------|----------|--------|---------|-----------|---------------|-------------|----------|
| DOM-M01 | Finca | Tabla `fincas` sin API/UI; ubicación dispersa en `productores.parcela` | Inconsistencia de datos geográficos | Alto en trazabilidad territorial | Alta | Implementar CRUD fincas y vincular lotes a `finca_id` | Backend + Frontend | 2–3 sprints |
| DOM-M02 | Rol / Permiso | `permisos` y `rol_permisos` en BD sin enforcement | Falsa sensación de RBAC granular | Medio en seguridad | Media | Activar RBAC o eliminar tablas no usadas del modelo expuesto | Arquitecto + Backend | 1 sprint |
| DOM-M03 | Productor vs Cliente | Confusión entre entidad Productor y rol legacy `productor` | Errores de interpretación en auditorías | Medio en documentación | Media | Documentar glosario; renombrar rol legacy en migración de datos | Analista + Backend | 3–5 días |
| DOM-M04 | Lote | Sin PUT/DELETE; correcciones requieren soporte manual | Datos incorrectos persisten | Medio operativo | Media | Definir reglas de edición limitada o anulación con auditoría | Product Owner + Backend | 1 sprint |
| DOM-M05 | Inventario | Creado automáticamente pero sin módulo de gestión | Stock desincronizado de producción | Medio en inventario | Media | Exponer movimientos_stock con reglas de negocio | Backend | 1–2 sprints |
| DOM-M06 | Calidad | Una sola evaluación por lote; sin re-cata formal | No captura evolución de calidad | Bajo–Medio | Baja | Permitir reevaluaciones versionadas con historial | Backend + BD | 1 sprint |
| DOM-M07 | Predicción IA | Solo heurística; ML Python no integrado | Expectativa de «IA real» no cumplida | Alto en credibilidad PMV2 | Alta | Integrar modelo entrenado o renombrar a «estimación heurística» | Data Science + Backend | 2–4 sprints |
| DOM-M08 | Defectos grano | Tablas `defectos_grano`, `evaluacion_defectos` sin uso | Modelo de calidad incompleto | Medio en certificación | Media | Incorporar evaluación de defectos al flujo de calidad | Backend | 1 sprint |
| DOM-M09 | Notificaciones | Tabla `notificaciones` sin servicio | Usuario no alertado de eventos | Medio en UX | Media | Servicio de notificaciones ante alertas IA y calidad | Backend + Frontend | 1 sprint |
| DOM-M10 | Historial reportes | `historial_reportes` sin persistencia en export | Sin trazabilidad de descargas | Bajo | Baja | Registrar cada export en historial | Backend | 3–5 días |
| DOM-M11 | Registro público | Flujo de registro parcial según config | Barrera de onboarding | Medio en adopción | Media | Completar registro self-service con validación email | Backend + Frontend | 1 sprint |
| DOM-M12 | Trazabilidad | Etapas por defecto fijas (5); poca personalización | No adapta a todos los procesos productivos | Bajo–Medio | Baja | Parametrizar etapas en `configuraciones` | Backend | 1 sprint |
| DOM-M13 | Auditoría | Solo consulta admin; sin retención/archivo definido | Crecimiento ilimitado de logs | Bajo a largo plazo | Baja | Política de retención y archivo | DevOps + Backend | 3–5 días |
| DOM-M14 | Catálogos | Variedades/secado sin UI de mantenimiento | Dependencia de seeds SQL | Medio en operación | Media | CRUD catálogos para admin | Backend + Frontend | 1 sprint |
| DOM-M15 | Reglas de negocio | 16 tablas sin reglas en aplicación | Schema «hinchado» vs dominio real | Alto en mantenibilidad | Alta | Consolidar modelo: eliminar o implementar entidades huérfanas | Arquitecto | 2–3 sprints |

---

## Oportunidades de mejora en reglas de negocio

1. **Unificar clasificación de calidad:** HU06 menciona Alta/Media/Baja; código usa Excelente/Buena/Aceptable/Regular — alinear terminología.
2. **Validar rangos ambientales en lote:** humedad/temperatura/altitud aceptan positivos sin techo; PredictionEngine asume rangos óptimos — validar en creación de lote.
3. **Regla explícita de transición de estados de lote:** actualmente estado es texto libre del catálogo sin máquina de estados.
4. **Encadenar calidad → predicción:** exigir evaluación de calidad antes de predicción para mayor coherencia (opcional según negocio).
5. **Scope en chatbot:** auditar que ningún intent filtre datos de otro cliente.

---

**Total mejoras:** 15 | **Prioridad Alta:** 3 | **Esfuerzo estimado global:** 12–20 sprints-persona
