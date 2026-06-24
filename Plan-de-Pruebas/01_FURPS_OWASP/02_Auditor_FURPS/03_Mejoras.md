# Plan de Mejora — Auditoría FURPS+ CAFE-IA

**Fecha:** 24 de junio de 2026  
**Origen:** Hallazgos FUR-001 a FUR-018 (Paso 02)

---

## Prioridad Crítica

| ID | Área | Problema | Prioridad | Riesgo | Solución propuesta | Beneficio esperado | Responsable |
|----|------|----------|-----------|--------|-------------------|-------------------|-------------|
| FUR-001 | F / R | Creación de lote sin transacción SQL (lote + trazabilidad + inventario) | Crítica | Pérdida integridad BD en fallo parcial | Envolver operación en BEGIN/COMMIT MySQL | Atomicidad y consistencia de datos | Backend Dev |

---

## Prioridad Alta

| ID | Área | Problema | Prioridad | Riesgo | Solución propuesta | Beneficio esperado | Responsable |
|----|------|----------|-----------|--------|-------------------|-------------------|-------------|
| FUR-002 | P | JMeter evalúa únicamente GET /api/health | Alta | Confianza insuficiente en rendimiento real | Diseñar plan JMeter con login JWT y flujos lotes/dashboard | Baseline P representativo | QA |
| FUR-003 | S | Cypress (11 specs) excluido de GitHub Actions | Alta | Regresiones UI en merge | Job CI con stack dockerizado + Cypress | Detección temprana fallos UI | DevOps + QA |
| FUR-004 | X | CVE react-router-dom open redirect (6.30.3) | Alta | Vector phishing | Actualizar a ≥6.30.4 | Cierre vulnerabilidad producción | Frontend Dev |
| FUR-005 | X | CVE HIGH form-data transitiva backend | Alta | Supply chain | `npm audit fix` backend | Reducción superficie ataque | Backend Dev |
| FUR-006 | S | Cobertura SonarCloud 0 % (sin lcov) | Alta | Deuda testing invisible | Instrumentar c8 + `lcov.reportPaths` | Métricas S-08 verificables | Backend Dev |
| FUR-015 | X | Política backups MySQL Railway no documentada | Alta | Pérdida datos | Configurar y documentar backups | Continuidad operativa | DevOps |

---

## Prioridad Media

| ID | Área | Problema | Prioridad | Riesgo | Solución propuesta | Beneficio esperado | Responsable |
|----|------|----------|-----------|--------|-------------------|-------------------|-------------|
| FUR-007 | S | `SKIP_INTEGRATION=1` en CI | Media | Regresiones API | MySQL service container en workflow | Tests integración en pipeline | DevOps |
| FUR-008 | P | P95 JMeter ≈ 2614 ms en health | Media | Latencia bajo carga | Warm-up instancia; revisar plan Railway | Tiempos estables | DevOps |
| FUR-009 | P | Chunk Recharts 411 KB | Media | LCP dashboard lento | Dynamic import en DashboardPage | Mejor rendimiento percibido | Frontend Dev |
| FUR-010 | F | Lotes sin PUT/DELETE en API | Media | Corrección solo vía SQL | Edición/soft-delete con auditoría | Flexibilidad operativa | Backend Dev |
| FUR-011 | F | Motor heurístico; ML no en runtime | Media | Expectativa IA incorrecta | Integrar ML o renombrar módulo | Alineación funcional | Product Owner |
| FUR-012 | U | Sin auditoría accesibilidad | Media | WCAG no verificado | Integrar axe-core en Login/Dashboard | U-04 medible | Frontend Dev |
| FUR-013 | S | ESLint 2 errores, 187 warnings | Media | Lint no limpio | Corregir ErrorBoundary y react-hooks config | S-07 operativo | Frontend Dev |
| FUR-014 | X | `/api/health` expone `dbHost` | Media | Reconocimiento infra | Reducir campos respuesta pública | Menor exposición | Backend Dev |
| FUR-018 | F | Fincas en BD sin API/UI | Media | Trazabilidad geográfica incompleta | CRUD fincas + finca_id en lotes | Coherencia dominio | Full Stack |

---

## Prioridad Baja

| ID | Área | Problema | Prioridad | Riesgo | Solución propuesta | Beneficio esperado | Responsable |
|----|------|----------|-----------|--------|-------------------|-------------------|-------------|
| FUR-016 | U | `cypress_last-run.json` mayo 2026 | Baja | Evidencia obsoleta | Re-ejecutar `npm run test:e2e` | Evidencia vigente ICACIT | QA |
| FUR-017 | S | Captura Sonar Quality Gate ausente | Baja | Informe visual incompleto | Exportar dashboard post-CI | Evidencia S-07 | QA |

---

## Resumen

| Prioridad | Cantidad |
|-----------|----------|
| Crítica | 1 |
| Alta | 6 |
| Media | 9 |
| Baja | 2 |
| **Total** | **18** |

---

*Plan derivado de auditoría FURPS+ Paso 02. Verificación en Paso 03 — Auditor Implementación.*
