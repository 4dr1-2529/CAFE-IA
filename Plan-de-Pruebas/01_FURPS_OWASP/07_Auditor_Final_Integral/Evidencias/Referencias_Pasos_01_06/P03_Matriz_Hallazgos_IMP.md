# Matriz de Hallazgos — Implementación FURPS+

**Fecha:** 24 de junio de 2026  
**Total:** 17 hallazgos (IMP-H001 a IMP-H017)  
**Estado corrección en código:** 0/17 implementados post Paso 02

---

## Crítico

| ID | Descripción | Evidencia | Riesgo | Impacto | Causa | Recomendación |
|----|-------------|-----------|--------|---------|-------|---------------|
| IMP-H001 | Sin transacción en `LoteService.create` | `LoteService.js` L108-122; sin BEGIN/COMMIT | Pérdida integridad | Alto | Secuencia await independiente | BEGIN/COMMIT MySQL |

---

## Alto

| ID | Descripción | Evidencia | Riesgo | Impacto | Causa | Recomendación |
|----|-------------|-----------|--------|---------|-------|---------------|
| IMP-H002 | Cypress no en CI | `ci.yml` sin job E2E | Regresiones UI | Alto | Job no configurado | Job Cypress Actions |
| IMP-H003 | CVE react-router | `package.json` ^6.20.0 | Open redirect | Medio | Versión vulnerable | ≥6.30.4 |
| IMP-H004 | CVE form-data BE | `npm_audit_backend.txt` | Supply chain | Medio | Transitiva sin fix | npm audit fix |
| IMP-H005 | Sin lcov/c8 | Sin archivo cobertura | Deuda invisible | Medio | No instrumentado | c8 + Sonar |
| IMP-H006 | Backups no doc | IR Paso 09 | Pérdida datos | Alto | Política ausente | Documentar Railway |

---

## Medio

| ID | Descripción | Evidencia | Causa | Recomendación |
|----|-------------|-----------|-------|---------------|
| IMP-H007 | SKIP_INTEGRATION CI | ci.yml L25 | MySQL omitido en CI | Service container |
| IMP-H008 | Recharts 411 KB | build log | Import estático | Lazy load |
| IMP-H009 | Lotes inmutables | lotes.routes.js | Sin rutas PUT/DELETE | Soft-delete |
| IMP-H010 | ML desacoplado | ml/ vs PredictionEngine | Script no integrado | Integrar o renombrar |
| IMP-H011 | Sin axe | — | Herramienta ausente | axe-core |
| IMP-H012 | ESLint errores | lint log | Config rota | Corregir eslint |
| IMP-H013 | dbHost en health | railway JSON | app.js sin filtrar | Reducir campos |
| IMP-H014 | fincas sin API | schema.sql | Solo BD | CRUD fincas |
| IMP-H015 | JMeter solo health | jmeter JSON | Plan limitado | Escenarios JWT |

---

## Bajo

| ID | Descripción | Evidencia | Recomendación |
|----|-------------|-----------|---------------|
| IMP-H016 | Cypress mayo 2026 | cypress JSON | Re-ejecutar E2E |
| IMP-H017 | Sin captura Sonar | — | Exportar dashboard |

---

*Excel: `Matriz_Hallazgos.xlsx` · Trazabilidad FUR-001–018 Paso 02*
