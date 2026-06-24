# Conclusiones — Planificador FURPS+ CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 01 — Planificador FURPS  
**Fecha:** 24 de junio de 2026

---

## Importancia del modelo FURPS+

El modelo **FURPS+** (Functionality, Usability, Reliability, Performance, Supportability y atributos extendidos) proporciona un marco sistemático para evaluar la calidad de software más allá de la mera verificación funcional. Para un sistema como CAFE-IA —plataforma de trazabilidad cafetalera en producción con múltiples actores, datos sensibles y despliegue cloud— resulta indispensable abordar de forma estructurada no solo qué hace el sistema, sino cómo lo hace en términos de experiencia de usuario, disponibilidad, rendimiento, mantenibilidad y seguridad operativa.

La planificación realizada en este paso traduce el inventario real del proyecto —13 módulos API, 15 páginas frontend, arquitectura hexagonal, despliegue Railway/Vercel— en **48 criterios de evaluación** distribuidos en seis dimensiones, evitando inventar capacidades no presentes en el código.

---

## Beneficios para CAFE-IA

| Beneficio | Descripción |
|---------|-------------|
| **Visión integral** | Evalúa frontend, backend, BD, API, IA heurística, chatbot y despliegue bajo un mismo esquema |
| **Trazabilidad académica** | Matriz, checklist y cronograma aptos para informe ICACIT |
| **Priorización objetiva** | Criterios vinculados a evidencias reales (tests, JMeter, health, Cypress) |
| **Base para mejoras** | Entrada estructurada al Auditor FURPS y cruce con hallazgos HAL de ingeniería inversa |
| **Separación de alcances** | FURPS planificado aquí; OWASP en bloque posterior sin solapamiento confuso |

---

## Cobertura esperada

| Dimensión | Criterios planificados | Componentes cubiertos |
|-----------|------------------------|----------------------|
| F — Functionality | 10 | APIs, roles, lotes, trazabilidad, calidad, IA, reportes, chatbot, auditoría |
| U — Usability | 7 | Navegación PMV, dashboards, formularios, UX por rol |
| R — Reliability | 7 | Disponibilidad prod, robustez API, consistencia BD, pool MySQL |
| P — Performance | 7 | JMeter, build Vite, Recharts, rate-limit, SQL |
| S — Supportability | 8 | Hexagonal, CI, Sonar, tests, documentación |
| + Extendidos | 9 | Seguridad, portabilidad, config, despliegue, monitoreo |
| **Total** | **48** | **19 componentes** |

La cobertura esperada de la auditoría FURPS+ sobre el sistema implementado se estima en **~90 %** del PMV documentado. No se planifica evaluar como operativas las entidades huérfanas (fincas CRUD, permisos granulares) ni el script ML desacoplado del runtime.

---

## Calidad esperada de la auditoría

Con el plan, la matriz y las evidencias base incorporadas, se anticipa una auditoría FURPS+ de **calidad alta** para fines académicos, condicionada a:

1. Completar evidencias pendientes (capturas Sonar, paneles cloud, JMeter negocio).
2. Ejecutar el Paso 02 — Auditor FURPS con la escala Cumple / Parcial / No cumple.
3. Mantener coherencia con la documentación de ingeniería inversa ya generada.

La madurez esperada del **informe de auditoría** (post Paso 02) se sitúa en **8,0 / 10**, alineada con la madurez documental del proyecto (7,8–8,2 según IR).

---

## Veredicto del planificador

El plan de evaluación FURPS+ para CAFE-IA queda **completo y listo** para iniciar la fase de auditoría. La documentación generada —incluyendo matriz de 48 criterios, checklist, cronograma y evidencias operativas copiadas— constituye la base formal para los pasos 02 y 03 del bloque FURPS+ y para su posterior integración con OWASP y la conclusión general del bloque `01_FURPS_OWASP`.

---

*Conclusión del Paso 01. Sin instrucciones de IA. Listo para anexo al informe final.*
