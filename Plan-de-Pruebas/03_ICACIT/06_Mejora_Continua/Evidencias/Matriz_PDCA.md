# Matriz PDCA — Mejora Continua — ICACIT Paso 6 — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Metodología:** Plan → Do → Check → Act

---

## Sprint P1 — Crítico y Alto (CON-001–007)

| Fase | Actividad | Entrada | Salida / Evidencia | Responsable |
|------|-----------|---------|-------------------|-------------|
| **Plan** | Priorizar 7 hallazgos P1; asignar recursos | FURPS/08, ICACIT/04 | `Plan_Mejora.md` | Arquitecto |
| **Do** | Ejecutar acciones correctivas P1 | Backlog técnico | Código + CI (post-eval) | Backend, DevOps, QA |
| **Check** | Verificar tests, audit, health, Cypress CI | npm test, npm audit, pipeline | Reportes verificación | QA |
| **Act** | Actualizar métricas; cerrar hallazgos C/A | ICACIT/05 | `Dashboard_Mejora.md` | Líder calidad |

---

## Sprint P2 — Seguridad y rendimiento (CON-008–014)

| Fase | Actividad | Entrada | Salida / Evidencia | Responsable |
|------|-----------|---------|-------------------|-------------|
| **Plan** | Planificar remediación OWASP A02/A06/A07 | OWASP checklist | `Matriz_Mejora.md` | Seguridad |
| **Do** | Actualizar deps, auth, JMeter | Frontend/Backend | Commits + docs JMeter | Equipo dev |
| **Check** | Re-evaluación OWASP; JMeter APIs | FURPS/05 | Informe OWASP ≥ 80 % | QA |
| **Act** | Elevar OWASP a meta ≥ 85 % | ICACIT/07 | Auditoría final | Evaluador |

---

## Sprint P3 — Deuda técnica (CON-015–020)

| Fase | Actividad | Entrada | Salida / Evidencia | Responsable |
|------|-----------|---------|-------------------|-------------|
| **Plan** | Priorizar Sonar, CI integración, a11y | MM-04, MM-08 | Sprint backlog P3 | DevOps/QA |
| **Do** | c8+lcov, MySQL CI, axe-core, lazy load | Pipeline config | Artefactos CI | DevOps, Frontend |
| **Check** | Sonar > 0 %; integración sin SKIP | SonarQube dashboard | Evidencia SQ | QA |
| **Act** | Performance ≥ 75 %; código ≥ 80 % | ICACIT/05 | Dashboard actualizado | Líder calidad |

---

## Sprint P4 — Sustentación (CON-021–024)

| Fase | Actividad | Entrada | Salida / Evidencia | Responsable |
|------|-----------|---------|-------------------|-------------|
| **Plan** | Planificar evidencias y features P4 | MM-09, ICACIT/03 | Checklist evidencias | QA |
| **Do** | Recovery pwd, alertas, fincas, re-run CY/SQ | Backlog P4 | Capturas E-01–E-24 | Full-stack, QA |
| **Check** | Corpus evidencias completo | ICACIT/03 catálogo | EV actualizadas | Documental |
| **Act** | ICACIT ≥ 85 %; madurez Nivel 4 | 08_Conclusion | Informe final | Evaluador |

---

## Ciclo PDCA transversal

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  PLAN   │────►│   DO    │────►│  CHECK  │────►│   ACT   │
│Priorizar│     │Ejecutar │     │Verificar│     │Estandar.│
│Asignar  │     │Remediar │     │Medir    │     │Document.│
└─────────┘     └─────────┘     └─────────┘     └────┬────┘
     ▲                                                  │
     └──────────────────────────────────────────────────┘
                    Mejora continua
```

---

## Indicadores de cierre por sprint

| Sprint | Indicador Check | Umbral Act |
|--------|-----------------|------------|
| P1 | Hallazgos C/A | 0 |
| P2 | OWASP | ≥ 85 % |
| P3 | Sonar cobertura; Performance | > 0 %; ≥ 75 % |
| P4 | ICACIT global; capturas UI | ≥ 85 %; E-01–E-24 |

---

*Matriz PDCA — ICACIT Paso 6 — CAFE-IA.*
