# Matriz de Trazabilidad Final — ICACIT Paso 7 — CAFE-IA

**Actividad:** Paso 7 — Auditoría Final  
**Fecha:** 24 de junio de 2026  
**Cadena:** Competencia → Documento → Artefacto → Evidencia → Resultado → Conclusión

---

## CT-01 — Conocimientos de Ingeniería

| Competencia | Documento | Artefacto | Evidencia | Resultado | Conclusión |
|-------------|-----------|-----------|-----------|-----------|------------|
| CT-01 | `02_Ingenieria_Inversa/04/` | `backend/src/`, `schema.sql` | README, npm test 18/18 | **82 %** | Cumple — dominio técnico documentado |

---

## CT-02 — Medio Ambiente y Sostenibilidad

| Competencia | Documento | Artefacto | Evidencia | Resultado | Conclusión |
|-------------|-----------|-----------|-----------|-----------|------------|
| CT-02 | `01_FURPS_OWASP/02/` | Módulos trazabilidad, calidad | Cypress PF-04/05, II/08 | **83 %** | Cumple — PMV sostenible operativo |

---

## CT-03 — Ingeniería y Sociedad

| Competencia | Documento | Artefacto | Evidencia | Resultado | Conclusión |
|-------------|-----------|-----------|-----------|-----------|------------|
| CT-03 | `02_Ingenieria_Inversa/03/` | `auth.js`, `rbac.js`, chatbot | Cypress PF-11, 12 HU | **78 %** | Cumple — RBAC y flujos verificados |

---

## CT-04 — Gestión de Proyectos

| Competencia | Documento | Artefacto | Evidencia | Resultado | Conclusión |
|-------------|-----------|-----------|-----------|-----------|------------|
| CT-04 | `03_ICACIT/01_Planificacion/` | Cronograma 8 fases, matrices | >884 archivos corpus | **88 %** | Cumple — gestión documental sólida |

---

## CE-01 — Diseño de Soluciones

| Competencia | Documento | Artefacto | Evidencia | Resultado | Conclusión |
|-------------|-----------|-----------|-----------|-----------|------------|
| CE-01 | `02_Ingenieria_Inversa/07/` | 35 diagramas, 13 APIs | 43 FK, hexagonal | **88 %** | Cumple — diseño validado |

---

## CE-02 — Análisis de Problemas

| Competencia | Documento | Artefacto | Evidencia | Resultado | Conclusión |
|-------------|-----------|-----------|-----------|-----------|------------|
| CE-02 | `01_FURPS_OWASP/07/` | Matriz_Riesgos, CON-001–024 | Sonar 16 correcciones | **82 %** | Cumple — análisis exhaustivo |

---

## CE-03 — Uso de Herramientas Modernas

| Competencia | Documento | Artefacto | Evidencia | Resultado | Conclusión |
|-------------|-----------|-----------|-----------|-----------|------------|
| CE-03 | `03_ICACIT/05_Metricas/` | Cypress, JMeter, ci.yml, Sonar | 13/13 CY; 500/500 JM | **74 %** | Parcial — bajo meta 75 % |

---

## Trazabilidad por marco evaluativo

| Competencia / Marco | Documento | Artefacto | Evidencia | Resultado | Conclusión |
|---------------------|-----------|-----------|-----------|-----------|------------|
| FURPS+ | `01_FURPS_OWASP/08/` | Matriz 48 criterios | FUR-001–018, CON | **77 %** | Bueno — Performance 70 % |
| OWASP | `01_FURPS_OWASP/08/` | Checklist A01–A10 | npm audit, health | **76 %** | Bueno — A06 55 % |
| Ingeniería Inversa | `02_Ingenieria_Inversa/13/` | 327+ artefactos II | II/01–13 | Funcional **88 %** | Operativo en producción |
| Reporte Calidad | `Reporte-Calidad-Software/12` | 13 capítulos | CHECKLIST_EVIDENCIAS | **89.2 %** | Cumplimiento documental alto |
| ICACIT global | `03_ICACIT/04_Resultados/` | 7 competencias | Pasos 01–06 | **82 %** | Bueno — 6/7 cumplen |
| Mejora Continua | `03_ICACIT/06_Mejora_Continua/` | Plan PDCA | 24 acciones | **0 %** remediación | Plan documentado |

---

## Trazabilidad hallazgos → acciones

| Hallazgo | Documento origen | Evidencia | Acción (Plan Maestro) | Resultado esperado |
|----------|------------------|-----------|----------------------|-------------------|
| CON-001 | FURPS/07, II/09 | LoteService.create | TX SQL | 0 críticos |
| CON-002–003 | OWASP/06 | health response, CORS | Sanitizar; whitelist | A05 mejorado |
| CON-005–008 | OWASP/06 | npm audit | audit fix; deps | A06 ≥ 85 % |
| CON-006 | ICACIT/02 | Cypress local | Job CI | QA ≥ 80 % |
| CON-019 | ICACIT/05 | Sonar 0 % | c8 + lcov | CE-03 ≥ 80 % |
| CON-024 | ICACIT/03 | CY/SQ mayo 2026 | Re-ejecutar | Evidencias actuales |

---

## Diagrama consolidado

```
Competencias ICACIT (CT/CE)
        │
        ├── Documentos (II, FURPS, ICACIT, Reporte)
        │         │
        │         ├── Artefactos (código, schema, CI, tests)
        │         │         │
        │         │         ├── Evidencias (EV-001–044, logs)
        │         │         │         │
        │         │         │         ├── Resultados (%, semáforo)
        │         │         │         │         │
        │         │         │         │         └── Conclusión auditoría
        │         │         │         │
        └── Hallazgos CON-001–024 ──► Plan Maestro ──► PDCA Paso 06
```

---

## Cobertura de trazabilidad

| Elemento | Vinculados | Cobertura |
|----------|------------|-----------|
| Competencias ICACIT (7) | 7/7 | 100 % |
| Marcos evaluativos (5) | 5/5 | 100 % |
| Hallazgos CON | 24/24 | 100 % |
| Acciones Plan Maestro | 24/24 | 100 % |

---

*Matriz de Trazabilidad Final — ICACIT Paso 7 — CAFE-IA.*
