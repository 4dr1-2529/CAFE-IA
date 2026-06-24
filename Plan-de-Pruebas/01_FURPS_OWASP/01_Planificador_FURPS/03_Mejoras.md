# Recomendaciones — Fortalecimiento de la Evaluación FURPS+

**Proyecto:** CAFE-IA  
**Fecha:** 24 de junio de 2026  
**Fase:** Planificador FURPS (Paso 01)

---

## Prioridad Alta

| ID | Área | Recomendación | Beneficio para evaluación FURPS+ |
|----|------|---------------|----------------------------------|
| RF-01 | Performance | Ampliar JMeter a escenarios con JWT: login, listado lotes, dashboard | Evaluar P y R con carga representativa de negocio |
| RF-02 | Evidencias | Re-ejecutar Cypress y archivar `cypress_last-run.json` actualizado | U y F con evidencia vigente |
| RF-03 | Calidad | Capturar Quality Gate SonarCloud tras CI | S-07 y S-08 con métricas objetivas |
| RF-04 | Cobertura | Instrumentar c8/lcov antes de auditoría | Evitar evaluación S-08 solo con 0 % reportado |
| RF-05 | Trazabilidad | Vincular cada criterio FURPS+ con ID HAL de ingeniería inversa | Evitar duplicar hallazgos entre bloques IR y FURPS |

---

## Prioridad Media

| ID | Área | Recomendación | Beneficio |
|----|------|---------------|-----------|
| RF-06 | Usability | Incluir checklist heurístico (Nielsen) en Paso 02 para 5 flujos críticos | U estructurada más allá de Cypress |
| RF-07 | Seguridad (+) | Documentar matriz de amenazas STRIDE ligera para JWT y CORS | Complemento X-01 sin duplicar OWASP |
| RF-08 | Functionality | Matriz caso de uso ↔ endpoint ↔ spec Cypress | Trazabilidad F-02 verificable |
| RF-09 | Reliability | Incluir prueba de recuperación documentada post-deploy Railway | R-02 con evidencia operativa |
| RF-10 | Evidencias | Incorporar capturas Railway/Vercel antes de auditoría oral ICACIT | X-06, X-07 visuales |
| RF-11 | Supportability | Evaluar deuda técnica Sonar (code smells, duplicación) en Paso 02 | S-01 cuantificado |

---

## Prioridad Baja

| ID | Área | Recomendación | Beneficio |
|----|------|---------------|-----------|
| RF-12 | Usability | Evaluar accesibilidad con axe-core en Login y Dashboard | U-04 automatizada |
| RF-13 | Performance | Registrar consumo memoria Railway en health extendido | P-02 infra |
| RF-14 | Documentación | Anexar diagrama arquitectura de IR Paso 07 como referencia S | Contexto para evaluadores |
| RF-15 | Cronograma | Reservar buffer 20 % en cronograma para hallazgos imprevistos | Reducir riesgo RE-01 |

---

## Mejoras al plan (meta-evaluación)

| Aspecto | Estado actual | Mejora sugerida |
|---------|---------------|----------------|
| Matriz FURPS | 48 criterios | Revisar tras Paso 02 si faltan atributos por módulo huérfano (fincas) |
| Checklist | Por categoría F/U/R/P/S/+ | Añadir columna «Responsable auditor» en Paso 02 |
| Evidencias | 14 copiadas, 6 pendientes | Priorizar las 6 pendientes antes de sustentación |
| Integración OWASP | Separada en bloque 04+ | Marcar en matriz criterios X-01 que se cruzarán con OWASP |

---

*Recomendaciones para fortalecer la auditoría; no implican cambios en código CAFE-IA en esta fase.*
