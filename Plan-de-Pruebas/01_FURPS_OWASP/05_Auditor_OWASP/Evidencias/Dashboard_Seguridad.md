# Dashboard de Seguridad OWASP — CAFE-IA

**Proyecto:** CAFE-IA  
**Actividad:** Paso 5 — Auditor OWASP  
**Fecha:** 24 de junio de 2026

---

## 1. Dashboard OWASP Top 10

| Categoría OWASP | Cumplimiento | Riesgo residual | Resultado | Hallazgos |
|-----------------|--------------|-----------------|-----------|-----------|
| A01 — Broken Access Control | **78 %** | **Alto** | Cumple parcialmente | OW-003, OW-007 |
| A02 — Cryptographic Failures | **85 %** | Medio | Cumple | OW-006 |
| A03 — Injection | **88 %** | Medio | Cumple | OW-005 |
| A04 — Insecure Design | **80 %** | Medio | Cumple parcialmente | OW-003, OW-007 |
| A05 — Security Misconfiguration | **68 %** | **Alto** | Cumple parcialmente | OW-001, OW-002 |
| A06 — Vulnerable Components | **55 %** | Medio | No cumple | OW-004, OW-005 |
| A07 — Auth Failures | **72 %** | **Alto** | Cumple parcialmente | OW-006–OW-008, OW-010, OW-012, OW-014 |
| A08 — Data Integrity Failures | **62 %** | Medio | Cumple parcialmente | OW-009, OW-011, OW-015 |
| A09 — Logging Failures | **75 %** | Medio | Cumple parcialmente | OW-013 |
| A10 — SSRF | **95 %** | Bajo | Cumple | — |

---

## 2. Indicadores globales

| Indicador | Valor | Visual |
|-----------|-------|--------|
| **Nivel general de seguridad** | **76 %** | ████████░░ Bueno |
| **Riesgo global** | **Medio-Alto** | 3 categorías Alto |
| **Madurez de seguridad** | **Nivel 3 — Definido** | Controles + brechas |
| **Hallazgos totales** | 15 | 0C · 4A · 7M · 4B |

**Leyenda severidad:** C=Crítico · A=Alto · M=Medio · B=Bajo

---

## 3. Cumplimiento por dominio

| Dominio | % | Estado |
|---------|---|--------|
| Seguridad Backend | 82 % | Bueno |
| Seguridad Frontend | 70 % | Regular-Bueno |
| Seguridad API | 77 % | Bueno |
| Seguridad Infraestructura | 65 % | Regular |
| Seguridad Base de Datos | 80 % | Bueno |
| **Seguridad General** | **76 %** | **Bueno** |

---

## 4. Distribución de hallazgos

| Severidad | Cantidad | IDs |
|-----------|----------|-----|
| Crítico | 0 | — |
| Alto | 4 | OW-001, OW-002, OW-003, OW-004 |
| Medio | 7 | OW-005 a OW-011 |
| Bajo | 4 | OW-012 a OW-015 |

---

## 5. Comparativa Planificación vs Auditoría (Paso 04 → 05)

| Categoría | Riesgo planificado | Cumplimiento auditado | Δ |
|-----------|-------------------|----------------------|---|
| A01 | Alto | 78 % | Evaluado |
| A02 | Medio | 85 % | + sobre expectativa |
| A03 | Alto | 88 % | Mitigado (SQL) |
| A04 | Medio | 80 % | Evaluado |
| A05 | Alto | 68 % | Confirmado |
| A06 | Medio | 55 % | Por debajo |
| A07 | Alto | 72 % | Confirmado |
| A08 | Medio | 62 % | Por debajo |
| A09 | Medio | 75 % | Evaluado |
| A10 | Bajo | 95 % | Confirmado |

---

## 6. Top 5 acciones prioritarias

| # | ID | Acción | Impacto en % global estimado |
|---|-----|--------|---------------------------|
| 1 | OW-001 | Sanitizar `/api/health` | +3 % A05 |
| 2 | OW-004 | Remediar CVE form-data | +8 % A06 |
| 3 | OW-002 | Restringir CORS | +4 % A05 |
| 4 | OW-003 | Enforcement permisos | +5 % A01 |
| 5 | OW-009 | CI audit bloqueante | +4 % A08 |

**Objetivo Paso 06:** ≥ 85 % cumplimiento global.

---

*Dashboard generado tras auditoría OWASP Paso 05.*
