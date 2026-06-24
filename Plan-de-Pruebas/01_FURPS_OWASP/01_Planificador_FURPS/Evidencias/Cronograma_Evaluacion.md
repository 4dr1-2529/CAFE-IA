# Cronograma de Evaluación FURPS+ — CAFE-IA

**Fecha inicio plan:** 24 de junio de 2026  
**Duración total estimada:** 10–12 días hábiles (bloque FURPS pasos 01–03)

---

## Vista general

```text
Semana 1                    Semana 2
│ D1-D2 │ D3-D5 │ D6-D7 │ D8-D9 │ D10 │
│ Plan    │ Audit │ Evid  │ Impl  │ Rev │
│ (P01)   │ (P02) │ extra │ (P03) │     │
```

---

## Detalle por actividad

| # | Actividad | Paso | Duración | Dependencias | Entregable |
|---|-----------|------|----------|--------------|------------|
| 1 | Planificación FURPS+ | 01 | 2 días | IR completa | Matriz, checklist, plan |
| 2 | Revisión código backend (F, R, S) | 02 | 1 día | Paso 01 | Notas auditoría |
| 3 | Revisión frontend y UX (U) | 02 | 1 día | Paso 01 | Notas auditoría |
| 4 | Ejecución tests + Cypress | 02 | 0,5 día | Entorno local | Logs actualizados |
| 5 | Análisis performance JMeter | 02 | 0,5 día | jmeter_resumen | Informe P |
| 6 | Revisión seguridad baseline (+) | 02 | 0,5 día | env, app.js | Informe X-01 |
| 7 | Evaluación despliegue Railway/Vercel | 02 | 0,5 día | health JSON | Informe X-06 |
| 8 | Consolidación informe auditor FURPS | 02 | 1 día | Act. 2–7 | 02_Resultado_IA Paso 02 |
| 9 | Incorporar evidencias pendientes | 02 | 1 día | Capturas Sonar | Evidencias/ |
| 10 | Verificación mejoras en código | 03 | 2 días | Informe Paso 02 | 03_Mejoras Paso 03 |
| 11 | Revisión cruzada con HAL (IR) | 03 | 0,5 día | Paso 11 IR | Trazabilidad |
| 12 | Cierre parcial FURPS | 03 | 0,5 día | — | 04_Conclusiones Paso 03 |

---

## Hitos

| Hito | Fecha objetivo | Criterio de éxito |
|------|----------------|-------------------|
| H1 — Plan aprobado | 24-jun-2026 | Matriz 48 criterios + evidencias base |
| H2 — Auditoría iniciada | +3 días | Paso 02 en progreso |
| H3 — Auditoría cerrada | +7 días | 48 criterios evaluados |
| H4 — Implementación verificada | +10 días | Paso 03 completo |
| H5 — Listo para OWASP | +12 días | Handoff a 04_Planificador_OWASP |

---

## Recursos necesarios

| Recurso | Uso |
|---------|-----|
| Repositorio `cafe-cursor/` | Código fuente |
| Entorno local Node 20 + MySQL | Tests backend |
| Acceso lectura Railway/Vercel | Health checks |
| GitHub Actions / SonarCloud | CI y calidad |
| Documentación IR (Pasos 01–13) | Contexto y HAL |

---

## Riesgos al cronograma

| Riesgo | Impacto | Contingencia |
|--------|---------|--------------|
| Cypress no ejecutable local | Retraso U, F-02 | Usar último JSON + revisión manual |
| Sin acceso panel Sonar | Retraso S-07 | Documentar desde CORRECCIONES_SONAR |
| JMeter negocio no listo | Retraso P-07 | Marcar No cumple con plan de remediación |

---

*Cronograma referencial; ajustar fechas según calendario académico ICACIT.*
