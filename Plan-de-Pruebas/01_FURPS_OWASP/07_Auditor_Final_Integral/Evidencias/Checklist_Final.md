# Checklist Final — Auditoría Integral — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Consolidación:** Pasos 01–06

**Leyenda:** ☑ Cumple | ◐ Parcial | ✗ No cumple

---

## FURPS+

| # | Atributo | % | Estado | Evidencia paso |
|---|----------|---|--------|----------------|
| F-01 | Functionality | 83 | ◐ | Paso 03 |
| F-02 | Usability | 78 | ◐ | Paso 02/03 |
| F-03 | Reliability | 78 | ◐ | Paso 03 |
| F-04 | Performance | 70 | ◐ | Paso 02 |
| F-05 | Supportability | 74 | ◐ | Paso 02/03 |
| F-06 | Seguridad (+) | 76 | ◐ | Paso 03 |
| F-07 | Arquitectura | 88 | ☑ | Paso 02 |

---

## OWASP Top 10

| # | Categoría | % | Riesgo | Estado |
|---|-----------|---|--------|--------|
| O-01 | A01 Access Control | 78 | Alto | ◐ |
| O-02 | A02 Cryptographic Failures | 85 | Medio | ☑ |
| O-03 | A03 Injection | 88 | Medio | ☑ |
| O-04 | A04 Insecure Design | 80 | Medio | ◐ |
| O-05 | A05 Misconfiguration | 68 | Alto | ◐ |
| O-06 | A06 Vulnerable Components | 55 | Medio | ✗ |
| O-07 | A07 Auth Failures | 72 | Alto | ◐ |
| O-08 | A08 Data Integrity | 62 | Medio | ◐ |
| O-09 | A09 Logging | 75 | Medio | ◐ |
| O-10 | A10 SSRF | 95 | Bajo | ☑ |

---

## Dimensiones globales

| # | Dimensión | % | Estado |
|---|-----------|---|--------|
| G-01 | Arquitectura hexagonal | 88 | ☑ |
| G-02 | API REST (13 módulos) | 85 | ☑ |
| G-03 | Base de datos MySQL | 80 | ◐ |
| G-04 | Frontend React 15 páginas | 78 | ◐ |
| G-05 | Backend Express | 82 | ☑ |
| G-06 | Infra Railway + Vercel | 75 | ◐ |
| G-07 | Despliegue producción | 90 | ☑ |
| G-08 | Pruebas (unit + E2E local) | 75 | ◐ |
| G-09 | CI/CD pipeline | 68 | ◐ |
| G-10 | Documentación ICACIT | 88 | ☑ |
| G-11 | Remediación post-auditoría | 0 | ✗ |
| G-12 | Preparación producción | 82 | ◐ |

---

## Ciclo de evaluación (Pasos 01–06)

| Paso | Entregable | Completado |
|------|------------|------------|
| 01 | Planificador FURPS | ☑ |
| 02 | Auditor FURPS | ☑ |
| 03 | Impl. FURPS | ☑ |
| 04 | Planificador OWASP | ☑ |
| 05 | Auditor OWASP | ☑ |
| 06 | Impl. OWASP | ☑ |
| 07 | Integral | ☑ |

---

## Resumen

| Marco | Cumple | Parcial | No cumple |
|-------|--------|---------|-----------|
| FURPS+ (7) | 1 | 6 | 0 |
| OWASP (10) | 3 | 6 | 1 |
| Global (12) | 4 | 7 | 1 |

**Calidad general consolidada:** 77 % — Bueno

---

*Excel: `Checklist_Final.xlsx`*
