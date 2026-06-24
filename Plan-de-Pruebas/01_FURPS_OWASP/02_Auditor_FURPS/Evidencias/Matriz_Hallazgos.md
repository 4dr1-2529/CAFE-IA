# Matriz de Hallazgos — Auditoría FURPS+

**Fecha:** 24 de junio de 2026  
**Total hallazgos:** 18 (FUR-001 a FUR-018)

---

## Crítico

| ID | Área | Descripción | Evidencia | Riesgo | Impacto | Recomendación |
|----|------|-------------|-----------|--------|---------|---------------|
| FUR-001 | F / R | `LoteService.create` ejecuta inserciones múltiples (lote, trazabilidad, inventario) sin transacción SQL | Código backend; HAL-003; grep sin BEGIN/COMMIT | Pérdida integridad en fallo parcial | **Alto** — datos inconsistentes en BD | Implementar BEGIN/COMMIT MySQL |

---

## Alto

| ID | Área | Descripción | Evidencia | Riesgo | Impacto | Recomendación |
|----|------|-------------|-----------|--------|---------|---------------|
| FUR-002 | P | JMeter solo evalúa GET /api/health (500 req) | `jmeter_resumen.json` | Falsa confianza rendimiento | Medio | Escenarios login + lotes + dashboard con JWT |
| FUR-003 | S | Cypress 11 specs no ejecutados en GitHub Actions | `ci.yml` sin job E2E; 13/13 local | Regresiones UI en merge | **Alto** | Job CI Cypress |
| FUR-004 | X | CVE react-router open redirect (6.7.0–6.30.3) | `npm_audit_frontend.txt` | Phishing vía redirect | Medio | Actualizar ≥6.30.4 |
| FUR-005 | X | CVE HIGH form-data transitiva backend | `npm_audit_backend.txt` | Supply chain | Medio | `npm audit fix` |
| FUR-006 | S | Cobertura SonarCloud reportada 0 % | Sin lcov en repo | Deuda testing invisible | Medio | Instrumentar c8 + Sonar |
| FUR-015 | X | Backups MySQL Railway no documentados | IR Paso 09 | Pérdida datos | **Alto** | Política backup documentada |

---

## Medio

| ID | Área | Descripción | Evidencia | Riesgo | Impacto | Recomendación |
|----|------|-------------|-----------|--------|---------|---------------|
| FUR-007 | S | `SKIP_INTEGRATION=1` en CI backend | `ci.yml` línea 25 | Regresiones API | Medio | MySQL en CI |
| FUR-008 | P | P95 JMeter ≈ 2614 ms (cerca límite 2 s) | `jmeter_resumen.json` | Latencia bajo carga | Medio | Warm-up Railway |
| FUR-009 | P | Chunk charts 411.26 KB gzip 110 KB | `npm_build_frontend.txt` | LCP dashboard | Bajo | Lazy load Recharts |
| FUR-010 | F | Lotes sin PUT/DELETE | `lotes.routes.js` | Errores irreversibles | Medio | Soft-delete |
| FUR-011 | F | `PredictionEngine` heurístico; `ml/train_model.py` no integrado | Código + README | Expectativa IA | Medio | Documentar o integrar ML |
| FUR-012 | U | Sin prueba accesibilidad automatizada | — | WCAG no verificado | Bajo | axe-core |
| FUR-013 | S | ESLint 2 errores, 187 warnings | `npm_lint_frontend.txt` | Lint bloqueado | Bajo | Corregir config |
| FUR-014 | X | `/api/health` expone `dbHost: mysql.railway.internal` | `railway_health_response.json` | Reconocimiento | Bajo | Reducir campos |
| FUR-018 | F | Tabla `fincas` sin API ni UI | schema.sql; IR Paso 08 | Trazabilidad geo | Medio | CRUD fincas |

---

## Bajo

| ID | Área | Descripción | Evidencia | Riesgo | Impacto | Recomendación |
|----|------|-------------|-----------|--------|---------|---------------|
| FUR-016 | U | Cypress last-run mayo 2026 | `cypress_last-run.json` | Evidencia obsoleta | Bajo | Re-ejecutar E2E |
| FUR-017 | S | Captura Sonar Quality Gate ausente | — | ICACIT visual | Bajo | Exportar dashboard |

---

## Distribución

| Severidad | Cantidad |
|-----------|----------|
| Crítico | 1 |
| Alto | 6 |
| Medio | 9 |
| Bajo | 2 |

---

*Excel: `Matriz_Hallazgos.xlsx`*
