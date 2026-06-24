# Dashboard de Mejora — ICACIT Paso 6 — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Estado remediación:** 0 %

---

## Semáforo de problemas

| Severidad | Cantidad | Estado | Indicador |
|-----------|----------|--------|-----------|
| 🔴 Crítico | **1** | Abierto | CON-001 |
| 🟠 Alto | **6** | Abierto | CON-002–CON-007 |
| 🟡 Medio | **14** | Abierto | CON-008–CON-021 |
| 🟢 Bajo | **3** | Abierto | CON-022–CON-024 |

---

## Distribución visual

```
Crítico  ████                          1  (4.2%)
Alto     ████████████████████████      6  (25.0%)
Medio    ████████████████████████████████████████████████████████  14  (58.3%)
Bajo     ████████████                  3  (12.5%)
         └────────────────────────────────────────────────────────┘
         0    2    4    6    8   10   12   14   16
```

---

## Acciones propuestas

| Métrica | Valor |
|---------|-------|
| Acciones correctivas (CON) | **24** |
| Acciones métricas (MM) | **10** |
| **Total acciones** | **34** |
| Acciones P1 prioritarias | **7** |
| Acciones completadas | **0** |
| Remediación actual | **0 %** |

---

## Acciones prioritarias (P1)

| # | ID | Acción | Impacto |
|---|-----|--------|---------|
| 1 | CON-001 | Transacción SQL lotes | Elimina riesgo crítico |
| 2 | CON-002 | Sanitizar health | Reduce exposición A05 |
| 3 | CON-003 | CORS whitelist | Control cross-origin |
| 4 | CON-004 | RBAC enforcement | Coherencia A01 |
| 5 | CON-005 | npm audit fix | Cierra CVE HIGH |
| 6 | CON-006 | Cypress en CI | Regresión automatizada |
| 7 | CON-007 | Backup Railway | Continuidad DR |

---

## Nivel de mejora esperado

| Indicador | Actual | Post-P1 | Post-PDCA | Semáforo actual → meta |
|-----------|--------|---------|-----------|------------------------|
| Calidad FURPS+ | 77 % | ~82 % | **≥ 85 %** | 🟡 → 🟢 |
| Seguridad OWASP | 76 % | ~83 % | **≥ 85 %** | 🟡 → 🟢 |
| ICACIT global | 82 % | ~84 % | **≥ 85 %** | 🟡 → 🟢 |
| CE-03 | 74 % | ~78 % | **≥ 80 %** | 🟡 → 🟢 |
| Hallazgos C/A | 7 | **0** | 0 | 🔴 → 🟢 |
| Performance | 70 % | 72 % | **≥ 75 %** | 🟡 → 🟢 |
| Remediación | 0 % | ~30 % | **≥ 90 %** | 🔴 → 🟢 |

---

## Nivel de madurez

| Nivel | Descripción | Actual | Esperado |
|-------|-------------|--------|----------|
| 1 | Inicial | — | — |
| 2 | Repetible | Superado | — |
| **3** | **Definido** | **● Actual** | Transición |
| **4** | **Gestionado** | — | **● Meta** |
| 5 | Optimizado | — | — |

**Evolución esperada:** Nivel 3 (82 % ICACIT, procesos documentados) → Nivel 4 (≥ 85 % ICACIT, métricas gestionadas, CI completo, remediación ≥ 90 %).

---

## Progreso por sprint PDCA

| Sprint | Hallazgos | Acciones | Completado | Progreso |
|--------|-----------|----------|------------|----------|
| P1 | 7 | 7 | 0 | ░░░░░░░░░░ 0 % |
| P2 | 7 | 7 | 0 | ░░░░░░░░░░ 0 % |
| P3 | 6 | 6 | 0 | ░░░░░░░░░░ 0 % |
| P4 | 4 | 4 | 0 | ░░░░░░░░░░ 0 % |

---

## Riesgo global

| Dimensión | Pre-mejora | Post-P1 | Post-PDCA |
|-----------|------------|---------|-----------|
| Riesgo global | **Medio-Alto** | Medio | **Medio-Bajo** |
| Integridad datos | Crítico | Resuelto | Resuelto |
| Seguridad | Alto | Medio | Bajo |
| Operaciones | Medio | Medio | Bajo |

---

*Dashboard de Mejora — ICACIT Paso 6 — CAFE-IA — ver `Dashboard_Mejora.xlsx` para datos editables.*
