# Matriz de Riesgos Consolidada — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Origen:** Pasos 1–10 Ingeniería Inversa

---

| ID | Riesgo | Probabilidad | Impacto | Nivel | Mitigación | Responsable |
|----|--------|--------------|---------|-------|------------|-------------|
| RSK-01 | Pérdida integridad datos por creación lote sin transacción | Media | Alto | **Crítico** | HAL-003: transacciones SQL | Backend Dev |
| RSK-02 | Exposición secretos por commit accidental `.env` | Baja | Alto | **Alto** | HAL-048: gitignore + pre-commit | Seguridad |
| RSK-03 | Compromiso JWT por secreto débil o sin rotación | Media | Alto | **Alto** | HAL-028: secret manager Railway | DevOps |
| RSK-04 | Sin usuario admin en prod (`ADMIN_SEED_PASSWORD`) | Media | Alto | **Alto** | HAL-002: variable Railway | DevOps |
| RSK-05 | Pérdida datos MySQL sin backups documentados | Baja | Alto | **Alto** | HAL-035: política backup Railway | DevOps |
| RSK-06 | Regresiones UI en producción (Cypress fuera CI) | Alta | Medio | **Alto** | HAL-010: job E2E en Actions | DevOps + QA |
| RSK-07 | CVE react-router open redirect en producción | Media | Medio | **Alto** | HAL-013: parche dependencia | Frontend Dev |
| RSK-08 | Deuda modelo BD (39 vs 14 tablas) genera bugs silenciosos | Alta | Medio | **Alto** | HAL-006: consolidar schema | Arquitecto |
| RSK-09 | Expectativa IA ML no cumplida (heurística only) | Media | Medio | **Medio** | HAL-009: documentar o integrar ML | Product Owner |
| RSK-10 | CVE npm high mergeadas por audit permisivo | Media | Medio | **Medio** | HAL-016: endurecer CI audit | DevOps |
| RSK-11 | Regresiones API (SKIP_INTEGRATION en CI) | Media | Medio | **Medio** | HAL-011: MySQL en CI | DevOps |
| RSK-11 | Config Railway no reproducible (sin IaC) | Media | Medio | **Medio** | HAL-026: documentar/IaC | DevOps |
| RSK-12 | Falsa confianza rendimiento (JMeter solo health) | Alta | Bajo | **Medio** | HAL-020: escenarios negocio | QA |
| RSK-13 | RBAC granular ficticio (tablas permisos sin uso) | Media | Medio | **Medio** | HAL-007: implementar o retirar | Arquitecto |
| RSK-14 | CORS amplio en previews Vercel | Baja | Medio | **Medio** | HAL-029: lista explícita | Backend Dev |
| RSK-15 | Reconocimiento infra vía `/api/health` | Alta | Bajo | **Bajo** | HAL-022: reducir campos | Backend Dev |
| RSK-16 | Bundle frontend pesado (LCP) | Media | Bajo | **Bajo** | HAL-024: lazy load Recharts | Frontend Dev |
| RSK-17 | Recurrencia crash deploy por migrate (histórico) | Baja | Alto | **Medio** | HAL-001: tests migrate; monitoreo | DevOps |

---

## Distribución por nivel

| Nivel | Cantidad |
|-------|----------|
| Crítico | 1 |
| Alto | 6 |
| Medio | 8 |
| Bajo | 2 |

---

## Mapa riesgo → hallazgos

Cada riesgo referencia IDs HAL de `Matriz_Hallazgos.md` para trazabilidad ICACIT.
