# Resumen Ejecutivo — Conclusión General — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 8 — Conclusión General  
**Fecha:** 24 de junio de 2026

---

## Veredicto de cierre

El proyecto CAFE-IA alcanza una **calidad general del 77 % (Bueno)** tras la evaluación integral FURPS+ y OWASP Top 10 (2021). El sistema es **apto para presentación académica y operación productiva con deuda técnica documentada**.

| Indicador | Valor |
|-----------|-------|
| Calidad general | **77 %** |
| FURPS+ | **77 %** |
| OWASP | **76 %** |
| Arquitectura | **88 %** |
| DevOps | **72 %** |
| QA | **75 %** |
| Madurez | Nivel 3 — Definido |
| Riesgo global | Medio-Alto |
| Preparación producción | 82 % — Apta con deuda |
| ICACIT | **78 %** |
| Remediación | **0 %** |

---

## Dashboard resumido

| Área | % | Estado |
|------|---|--------|
| Functionality | 83 | Bueno |
| Usability | 78 | Bueno |
| Reliability | 78 | Bueno |
| Performance | 70 | Regular |
| Supportability | 74 | Bueno |
| Seguridad OWASP | 76 | Bueno |
| Arquitectura | 88 | Bueno |
| DevOps | 72 | Bueno |
| QA | 75 | Bueno |
| **Calidad General** | **77** | **Bueno** |

---

## Hallazgos prioritarios (P1)

1. **CON-001** — Sin transacción SQL en creación de lotes (Crítico)
2. **CON-002** — Health expone `dbHost` (Alto)
3. **CON-003** — CORS `*.vercel.app` amplio (Alto)
4. **CON-004** — Permisos BD sin enforcement (Alto)
5. **CON-005** — CVE form-data HIGH (Alto)
6. **CON-006** — Cypress fuera de CI (Alto)
7. **CON-007** — Backups MySQL no documentados (Alto)

---

## Fortalezas clave

- Arquitectura hexagonal (88 %)
- PMV funcional completo con 13 APIs REST
- Autenticación JWT + bcrypt + adminGuard
- SQL parametrizado y correcciones SonarQube
- Despliegue activo Railway + Vercel (HTTP 200)
- Pruebas: 18/18 backend · 13/13 Cypress · JMeter 500/500
- Documentación ICACIT extensa (>200 archivos)

---

## Ciclo de evaluación

Ocho fases documentales (Pasos 01–08) sin modificación del código fuente. Consolidación de 24 hallazgos únicos en plan de mejoras ordenado por prioridad.

---

## Recomendación

Ejecutar Sprint P1 (CON-001 a CON-007) para elevar calidad y seguridad por encima del 85 % y reducir riesgo global a nivel Medio.

---

*Resumen ejecutivo — Paso 08 — Conclusión General — CAFE-IA.*
