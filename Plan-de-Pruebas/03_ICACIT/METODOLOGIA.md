# Metodología ICACIT — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Marco:** ICACIT 2025 · FURPS+ · OWASP Top 10 · ISO/IEC 25010 · Ingeniería Inversa  
**Fecha:** 24 de junio de 2026

---

## 1. Enfoque metodológico

La evaluación ICACIT del proyecto CAFE-IA sigue un modelo **basado en evidencias**, documental y sin modificación del código fuente. Cada fase produce artefactos verificables en `Plan-de-Pruebas/03_ICACIT/` integrando resultados de evaluaciones previas.

---

## 2. Fases del ciclo ICACIT

| Fase | Actividad | Base metodológica | Resultado |
|------|-----------|-------------------|-----------|
| 01 Planificación | Competencias, cronograma, trazabilidad | `01_Planificacion/` | Plan aprobado |
| 02 Ejecución | Registro revisiones y validaciones | II, FURPS, código | 82 % |
| 03 Evidencias | Consolidación EV-001–044 | Inventarios corpus | 83 % cobertura |
| 04 Resultados | Resultados por competencia CT/CE | Métricas documentadas | 82 % global |
| 05 Métricas | 32 indicadores, semáforo | FURPS/08, ICACIT/04 | 2V·7A·0R |
| 06 Mejora Continua | Plan PDCA CON-001–024 | FURPS/08 hallazgos | 24 acciones |
| 07 Auditoría Final | Consolidación cruzada | Todos los módulos | APTO CON RESERVAS |
| 08 Conclusión General | Autovaloración y cierre | Pasos 01–07 | Informe final |

---

## 3. Marcos de referencia

| Marco | Alcance | Resultado documentado |
|-------|---------|----------------------|
| **FURPS+** | 48 criterios, 5 atributos | 77 % global |
| **OWASP Top 10 API** | A01–A10 | 76 %; A06 55 % |
| **Ingeniería Inversa** | 13 fases | Funcional 88 %; arquitectura 88 % |
| **Reporte Calidad** | 13 capítulos | 89.2 % cumplimiento |
| **ISO/IEC 25010** | Calidades funcionales y no funcionales | Mapeo en auditoría final |

---

## 4. Fuentes de evidencia

- Código: `cafe-cursor/backend/`, `frontend/`, `sql/schema.sql`
- Pruebas: npm test 18/18, Cypress 13/13, JMeter 500/500
- CI/CD: `.github/workflows/ci.yml`, SonarCloud
- Despliegue: Railway (API+MySQL), Vercel (SPA), HTTP 200
- Documentación: `Plan-de-Pruebas/` (~884 archivos corpus)

---

## 5. Criterios de evaluación

| Criterio | Umbral | Escala semáforo |
|----------|--------|-----------------|
| Competencia ICACIT | Según meta por CT/CE | Alto ≥ 80 % / Medio-Alto ≥ 75 % |
| Indicador técnico | Documentado por fase | Verde ≥ 85 % · Amarillo 70–84 % · Rojo < 70 % |
| Hallazgo | CON-001–024 | Crítico / Alto / Medio / Bajo |
| Remediación | Post-evaluación | 0 % al cierre documental |

---

## 6. Principios

1. **Trazabilidad:** competencia → documento → artefacto → evidencia → resultado.
2. **No invención:** métricas derivadas exclusivamente de evaluaciones documentadas.
3. **No alteración:** el código fuente de CAFE-IA no se modifica durante la evaluación.
4. **Consolidación:** un único plan de mejoras (CON-001–024) sin duplicación.

---

*Metodología — Módulo ICACIT — CAFE-IA.*
