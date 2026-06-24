# Informe de Mejora Continua — ICACIT Paso 6 — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 6 — Mejora Continua  
**Fecha:** 24 de junio de 2026  
**Fuentes:** Ingeniería Inversa, FURPS+, OWASP, Reporte Calidad, ICACIT Pasos 01–05, SonarQube, Cypress, JMeter, Railway, Vercel

---

## 1. Objetivo

Analizar los resultados consolidados de la evaluación ICACIT del proyecto CAFE-IA y elaborar un Plan de Mejora Continua estructurado en ciclo PDCA, orientado a incrementar la calidad del software, cerrar hallazgos documentados y elevar el nivel de preparación para una nueva auditoría.

---

## 2. Metodología

1. **Recopilación:** Integración de hallazgos CON-001–CON-024 (FURPS+/OWASP Paso 08), recomendaciones métricas MM-01–MM-10 (ICACIT Paso 05), resultados por competencia (ICACIT Paso 04, 82 % global) y evidencias catalogadas (Paso 03, 83 %).
2. **Clasificación:** Severidad (Crítico, Alto, Medio, Bajo), área afectada (seguridad, funcionalidad, DevOps, QA, documentación, infraestructura) y prioridad P1–P4.
3. **Análisis de causa raíz:** Derivado de ingeniería inversa, auditoría OWASP A01–A10, métricas SonarQube (cobertura 0 %), pipeline CI/CD y despliegue Railway/Vercel.
4. **Planificación PDCA:** Cuatro sprints alineados a prioridades P1–P4.
5. **Verificación:** Indicadores meta post-remediación sin modificación de código en esta fase.

---

## 3. Problemas encontrados

### 3.1 Resumen por severidad

| Severidad | Cantidad | IDs |
|-----------|----------|-----|
| **Crítico** | 1 | CON-001 |
| **Alto** | 6 | CON-002 a CON-007 |
| **Medio** | 14 | CON-008 a CON-021 |
| **Bajo** | 3 | CON-022 a CON-024 |
| **Total** | **24** | — |

### 3.2 Resumen por categoría

| Categoría | Cantidad | Hallazgos representativos |
|-----------|----------|---------------------------|
| Seguridad (OWASP) | 11 | CON-002, CON-003, CON-004, CON-005, CON-008–CON-013, CON-021, CON-022 |
| Deuda técnica / QA | 5 | CON-006, CON-019, CON-020, CON-024, MM-04 |
| Funcionalidad | 3 | CON-016, CON-017, CON-023 |
| Integridad / Arquitectura | 1 | CON-001 |
| Performance | 2 | CON-014, CON-015 |
| Infraestructura / Ops | 2 | CON-007, CON-022 |
| Usabilidad | 1 | CON-018 |
| DevOps / CI | 2 | CON-012, CON-020 |
| Documental | 1 | CON-024, MM-09 |

### 3.3 Indicadores base (pre-mejora)

| Indicador | Valor actual | Fuente |
|-----------|--------------|--------|
| Calidad general FURPS+ | 77 % | FURPS/08 |
| Seguridad OWASP | 76 % (A06: 55 %) | FURPS/05 |
| Cumplimiento Reporte Calidad | 89.2 % | Reporte-Calidad |
| ICACIT global | 82 % | ICACIT/04 |
| CE-03 (Ingeniería y Sociedad) | 74 % | ICACIT/04 |
| Remediación hallazgos | 0 % | FURPS/08 |
| Madurez software | Nivel 3 — Definido | FURPS/08 |
| Riesgo global | Medio-Alto | FURPS/08 |
| Hallazgos abiertos | 24 | CON-001–024 |
| Cobertura SonarQube | 0 % | SonarQube |
| Cypress E2E | 13/13 (fuera CI) | Cypress |
| JMeter | 500/500 health only | JMeter |

---

## 4. Análisis

### 4.1 Problemas críticos y altos (P1)

El hallazgo **CON-001** (ausencia de transacción SQL en `LoteService.create`) representa el riesgo máximo para la integridad de datos en un sistema de trazabilidad alimentaria. Las operaciones multi-tabla sin BEGIN/COMMIT/ROLLBACK pueden dejar registros huérfanos en lote, trazabilidad e inventario.

Los seis hallazgos **altos** concentran debilidades de seguridad operativa (health endpoint, CORS, RBAC, CVE npm), calidad de pipeline (Cypress ausente en CI) y continuidad (backups MySQL no documentados en Railway). Estos elementos elevan el riesgo global a **Medio-Alto** pese a un despliegue funcional verificado (Railway HTTP 200, Vercel operativo).

### 4.2 Problemas medios (P2–P3)

Los 14 hallazgos medios abarcan superficie de ataque frontend (6 CVE), autenticación (JWT localStorage, refresh ausente, política de contraseñas), observabilidad de calidad (Sonar 0 %, SKIP_INTEGRATION en CI), rendimiento (JMeter limitado, bundle Recharts 411 KB) y funcionalidad incompleta (lotes sin PUT/DELETE, ML desacoplado).

### 4.3 Problemas bajos y documentales (P4)

CON-022 a CON-024 corresponden a capacidades no críticas para el PMV (APM/SIEM, CRUD fincas) y evidencias de prueba desactualizadas (Cypress/Sonar de mayo 2026), impactando la sustentación ICACIT más que la operación inmediata.

### 4.4 Deuda técnica consolidada

| Área | Deuda identificada | Impacto en ICACIT |
|------|-------------------|-------------------|
| Seguridad | A06 55 %, 7 CVE documentados | CE-03 74 %, OWASP 76 % |
| Pruebas | Cobertura 0 %, CI parcial | CT-04, CE-03 |
| Performance | Sin baseline API autenticada | Performance 70 % |
| Documentación | 0 capturas UI, 5 evidencias pendientes | MM-09 |

---

## 5. Priorización

| Prioridad | Hallazgos | Sprint PDCA | Plazo sugerido |
|-----------|-----------|-------------|----------------|
| **P1 — Crítico/Alto** | CON-001 a CON-007 | Sprint P1 | 1–2 semanas |
| **P2 — Medio seguridad/perf** | CON-008 a CON-014 | Sprint P2 | 2–3 semanas |
| **P3 — Deuda técnica** | CON-015 a CON-020 | Sprint P3 | 3–4 semanas |
| **P4 — Mejora incremental** | CON-021 a CON-024 | Sprint P4 | 4+ semanas |

Criterios aplicados: severidad del hallazgo, impacto en competencias ICACIT (especialmente CE-03), probabilidad de explotación o regresión, y complejidad de implementación documentada.

---

## 6. Plan de mejora (PDCA)

### Sprint P1 — Plan

| Fase | Actividad |
|------|-----------|
| **Plan** | Priorizar CON-001 a CON-007; asignar responsables Backend, DevOps, QA |
| **Do** | Transacción SQL lotes; sanitizar health; CORS whitelist; RBAC; npm audit fix; job Cypress CI; política backup Railway |
| **Check** | npm test 18/18; npm audit sin HIGH; health sin dbHost; Cypress en pipeline |
| **Act** | Actualizar métricas ICACIT/05; registrar evidencias EV-039+ |

### Sprint P2 — Seguridad y rendimiento

| Fase | Actividad |
|------|-----------|
| **Plan** | CON-008 a CON-014; elevar OWASP A06 y A07 |
| **Do** | Actualizar deps frontend; cookies httpOnly; refresh token; gate audit CI; política contraseñas; escenarios JMeter JWT |
| **Check** | Re-evaluación OWASP; JMeter APIs documentadas |
| **Act** | OWASP meta ≥ 85 % |

### Sprint P3 — Deuda técnica y calidad

| Fase | Actividad |
|------|-----------|
| **Plan** | CON-015 a CON-020; MM-04, MM-06 |
| **Do** | Lazy load charts; soft-delete lotes; documentar ML; axe-core; c8+lcov; MySQL en CI |
| **Check** | Sonar cobertura > 0 %; integración CI activa |
| **Act** | Performance ≥ 75 %; calidad código ≥ 80 % |

### Sprint P4 — Cierre y sustentación

| Fase | Actividad |
|------|-----------|
| **Plan** | CON-021 a CON-024; MM-09 |
| **Do** | Recovery contraseña; alertas Railway; CRUD fincas; re-ejecutar Cypress/Sonar |
| **Check** | Evidencias actualizadas; capturas UI E-01–E-24 |
| **Act** | ICACIT ≥ 85 %; madurez Nivel 4 |

---

## 7. Resultados esperados

| Métrica | Actual | Meta post-PDCA | Responsable verificación |
|---------|--------|----------------|--------------------------|
| Calidad general | 77 % | ≥ 85 % | FURPS re-evaluación |
| Seguridad OWASP | 76 % | ≥ 85 % | OWASP checklist |
| Hallazgos Crítico/Alto | 7 | 0 | Matriz_Mejora |
| ICACIT global | 82 % | ≥ 85 % | ICACIT/07 Auditoría |
| CE-03 | 74 % | ≥ 80 % | Evidencias Sonar+CI |
| Remediación | 0 % | ≥ 90 % | Dashboard_Mejora |
| Madurez | Nivel 3 | Nivel 4 — Gestionado | AUTOEVALUACION |
| Riesgo global | Medio-Alto | Medio | Resumen_Ejecutivo |

---

## 8. Acciones transversales

| Tipo | Acción |
|------|--------|
| **Preventiva** | Gate npm audit bloqueante en CI (CON-012) |
| **Correctiva** | Transacción SQL lotes (CON-001); remediación CVE (CON-005, CON-008) |
| **Seguimiento** | Dashboard métricas ICACIT/05 actualizado trimestralmente |
| **Verificación** | Re-ejecución Cypress, JMeter, Sonar post-remediación (CON-024) |

---

*Informe Paso 6 — Mejora Continua — derivado exclusivamente de evaluación documentada CAFE-IA — listo para anexo al informe final ICACIT.*
