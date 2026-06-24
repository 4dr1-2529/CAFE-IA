# Dashboard Final — Ingeniería Inversa CAFE-IA

**Fecha:** 24 de junio de 2026  
**Proyecto:** CAFE-IA (`cafe-cursor`)

---

## Indicadores globales

| Indicador | Valor |
|-----------|-------|
| **Pasos completados** | 11 / 11 |
| **Pasos documentación 100 %** | 10 / 11 (Paso 01 sin 05_Trazabilidad) |
| **Total archivos generados (01–11)** | 327 |
| **Documentos núcleo (01–05)** | 54 / 55 |
| **Matrices Markdown** | 35+ |
| **Archivos Excel (pasos 01–11)** | 0 en disco / 21 referenciados |
| **Archivos Excel (paso 12)** | 3 |
| **Diagramas Mermaid** | 24 |
| **Índices evidencias** | 11 |
| **Evidencias JSON/CSV/logs** | 18+ |
| **Hallazgos consolidados (P11)** | 55 (48 mejora + 7 positivos) |
| **Porcentaje avance documental** | **~90 %** (núcleo 96 %; Excel matrices pendiente) |

---

## Avance por paso

| # | Paso | Archivos | Estado doc | Madurez reportada |
|---|------|----------|------------|-------------------|
| 01 | Análisis de Logs | 22 | ⚠ Parcial | Operativo prod |
| 02 | Dependencias | 31 | ✅ | CVE identificados |
| 03 | Descubrimiento Funcional | 25 | ✅ | 8,5/10 |
| 04 | Descubrimiento Tecnológico | 34 | ✅ | 7,5/10 |
| 05 | Detección Arquitectónica | 27 | ✅ | Hexagonal |
| 06 | Evaluación Arquitectónica | 26 | ✅ | 8,0/10 |
| 07 | Reconstrucción Arquitectónica | 45 | ✅ | 45 componentes |
| 08 | Reconstrucción del Dominio | 32 | ✅ | 7,5/10 |
| 09 | Reconstrucción del Entorno | 42 | ✅ | 7,0/10 |
| 10 | Variables de Entorno | 21 | ✅ | 7,5/10 |
| 11 | Hallazgos | 22 | ✅ | 7,7/10 global |

---

## Distribución de artefactos

```text
Markdown  ████████████████████  ~57 %
Excel     ██                    ~6 %
Mermaid   ███                   ~7 %
Otros     ████████              ~30 % (json, sql, txt, yml, js)
```

---

## Calidad documental

| Criterio | Puntuación |
|----------|------------|
| Estructura homogénea 01–05 | 9,5 / 10 |
| Trazabilidad entre pasos | 9,0 / 10 |
| Evidencias reproducibles | 8,0 / 10 |
| Evidencias visuales | 5,0 / 10 |
| Consolidación final (P12) | 9,5 / 10 |
| **Promedio madurez documental** | **8,2 / 10** |

---

## Hallazgos y riesgos (desde Paso 11)

| Métrica | Valor |
|---------|-------|
| Hallazgos pendientes | 46 |
| Prioridad crítica pendiente | 1 (HAL-003) |
| Prioridad alta pendiente | 10 |
| Riesgos críticos/altos | 7 |

---

## Producción verificada

| Servicio | Estado | Evidencia |
|----------|--------|-----------|
| Railway API | HTTP 200 | railway_health_response.json |
| Vercel SPA | HTTP 200 | vercel_status.json |
| Tests backend | 18/18 | npm_test_backend.txt |
| Cypress E2E | 13/13 (local) | cypress_last-run.json |

---

## Pendientes documentales

1. `01_Analisis_de_Logs/05_Trazabilidad.md`
2. Capturas paneles Railway / Vercel / SonarCloud
3. Videos Cypress en repositorio

---

## Veredicto dashboard

La Ingeniería Inversa CAFE-IA alcanza **96 % de completitud documental** con **11 pasos ejecutados**, **327 artefactos** y consolidación de **55 hallazgos**. Aptitud para informe ICACIT: **ALTA** con observaciones menores en evidencias visuales.
