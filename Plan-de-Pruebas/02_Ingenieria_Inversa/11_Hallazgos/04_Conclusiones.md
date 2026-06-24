# Conclusiones — Consolidación de Hallazgos CAFE-IA

**Paso:** 11 — Hallazgos  
**Fecha:** 24 de junio de 2026  
**Evaluación:** Informe ICACIT — Ingeniería Inversa

---

## Estado general del proyecto

CAFE-IA es un **sistema de trazabilidad cafetalera full-stack en producción**, con despliegue activo en Railway y Vercel, **12 historias de usuario implementadas** y documentación de ingeniería inversa completada en **10 pasos previos**. La consolidación de hallazgos confirma un producto **funcional y evaluable**, con deuda técnica **identificada, cuantificada y priorizada**.

---

## Número total de hallazgos

| Tipo | Cantidad |
|------|----------|
| Hallazgos de mejora (HAL-001–048) | 48 |
| Hallazgos positivos verificados (HAL-P01–P07) | 7 |
| **Total registrado** | **55** |
| Pendientes de acción | 46 |
| Corregidos / verificados | 9 |

---

## Principales fortalezas

1. **Producción operativa** — API Railway y frontend Vercel con health HTTP 200 verificado.
2. **Cobertura funcional PMV** — 12 HUs implementadas; flujo lote → trazabilidad → calidad → IA.
3. **Arquitectura hexagonal** reconocible con separación interfaces/application/domain/infrastructure.
4. **Seguridad baseline** — JWT con validación, RBAC admin/cliente, helmet, rate-limit, CORS configurable.
5. **Pipeline CI** — tests backend, build frontend, SonarCloud, npm audit en Node 20.
6. **Pruebas locales** — 18/18 tests backend; 13/13 Cypress E2E (ejecución manual).
7. **Variables entorno** — paridad MYSQL* local/Railway; frontend aislado con VITE_*.
8. **Corrección histórica crítica** — crash migrate.js resuelto; leakage Sonar VITE corregido.

---

## Principales debilidades

1. **Integridad datos** — creación de lote sin transacción SQL (hallazgo crítico pendiente).
2. **Modelo BD vs aplicación** — 39 tablas, ~14 expuestas; fincas, permisos, inventario huérfanos.
3. **CI incompleto** — Cypress y tests integración omitidos en GitHub Actions.
4. **CVE pendientes** — react-router, form-data y otras en npm audit.
5. **Infraestructura** — sin Docker, sin CD automático, sin backups documentados.
6. **Evidencias ICACIT** — capturas paneles cloud y Sonar pendientes.
7. **IA PMV2** — motor heurístico vs expectativa ML Python documentada.

---

## Riesgos críticos

| Riesgo | Hallazgo | Nivel |
|--------|----------|-------|
| Inconsistencia BD en fallo parcial al crear lote | HAL-003 | **Crítico** |
| Exposición secretos (.env, JWT) | HAL-028, HAL-048 | Alto |
| Sin admin inicial en prod | HAL-002 | Alto |
| Pérdida datos sin backup | HAL-035 | Alto |
| Regresiones UI sin Cypress CI | HAL-010 | Alto |

---

## Nivel de calidad alcanzado

| Dimensión | Puntuación |
|-----------|------------|
| Funcional | 8,5 / 10 |
| Arquitectónica | 8,0 / 10 |
| Tecnológica | 7,5 / 10 |
| Dominio | 7,5 / 10 |
| Entorno / DevOps | 7,0 / 10 |
| Configuración | 7,5 / 10 |
| **Global consolidado** | **7,7 / 10** |

---

## Recomendaciones generales

1. Abordar **HAL-003 (transacciones)** como prioridad cero antes de nuevas funcionalidades.
2. Completar **pipeline CI** con Cypress e integración MySQL en el mismo sprint.
3. Ejecutar **parche CVE** react-router y endurecer npm audit en CI.
4. Definir **política de secretos y backups** documentada para Railway.
5. Decidir estrategia sobre **tablas huérfanas**: implementar módulos o deprecar formalmente.
6. Completar **evidencias visuales** para cierre informe ICACIT.

---

## Nivel de madurez del software

| Dimensión | Nivel (1–5) |
|-----------|-------------|
| Funcionalidad | 4,5 |
| Arquitectura | 4,0 |
| Calidad / pruebas | 3,0 |
| Seguridad | 3,5 |
| Operaciones / DevOps | 3,0 |
| Documentación | 4,0 |
| **Madurez global** | **3,5 / 5 (Intermedio-avanzado)** |

---

## Conclusión final

La ingeniería inversa de CAFE-IA (Pasos 1–11) produce un **inventario integral de hallazgos reales**, consolidado sin duplicación, apto para anexar al informe ICACIT. El proyecto demuestra **madurez funcional y arquitectónica superior a la media** para un PMV académico con despliegue real, con **brechas accionables** en integridad de datos, automatización de pruebas y alineación modelo–código.

La visión consolidada habilita un **plan de acción de 43 mejoras** ordenadas por criticidad, con 9 fortalezas ya verificadas que sustentan la evaluación positiva del estado actual.

---

*Documento listo para anexar al informe de evaluación de evidencias ICACIT.*
