# Indicadores Finales — Ingeniería Inversa CAFE-IA

**Fecha:** 24 de junio de 2026  
**Fuente:** Consolidación Pasos 01–12

---

## Conteos documentales

| Indicador | Valor | Fuente |
|-----------|-------|--------|
| Total documentos generados (01–11) | **327** | Paso 12 Inventario |
| Documentos núcleo (01–05 × 11 pasos) | 54 / 55 | Falta Trazabilidad Paso 01 |
| Documentos Paso 12 (generador) | 5 + 10 evidencias | `12_Generador_Final/` |
| Documentos Paso 13 (conclusión) | 5 + 5 evidencias | Este paso |
| **Total matrices Markdown** | **35+** | Pasos 01–11 Evidencias |
| **Total diagramas Mermaid** | **24** | Pasos 05–09, 11 |
| **Total evidencias operativas** | **18+** | Logs, JSON, SQL, configs |
| Excel pasos 01–11 | 0 / 21 referenciados | Pendiente |
| Excel paso 12 | 3 | Generados |

---

## Hallazgos, riesgos y mejoras

| Indicador | Valor |
|-----------|-------|
| Total hallazgos registrados | **55** |
| Hallazgos de mejora (HAL-001–048) | 48 |
| Hallazgos positivos (HAL-P01–P07) | 7 |
| Hallazgos pendientes | 46 |
| Corregidos / verificados | 9 |
| **Total riesgos (RSK)** | **17** |
| Riesgos críticos | 1 |
| Riesgos altos | 6 |
| Riesgos medios | 8 |
| Riesgos bajos | 2 |
| **Total mejoras planificadas** | **43** |
| Mejoras críticas pendientes | 1 |
| Mejoras alta prioridad pendientes | 11 |
| Mejoras media prioridad pendientes | 22 |
| Mejoras baja prioridad pendientes | 12 |

---

## Niveles de madurez (escala 0–10)

| Dimensión | Nivel | Base |
|-----------|-------|------|
| **Madurez arquitectónica** | **8,0** | Paso 06 (7,8 evaluación; 8,0 reportado consolidado) |
| **Madurez tecnológica** | **7,5** | Paso 04 |
| **Calidad funcional** | **8,5** | Paso 03 (88 % cobertura) |
| **Calidad del software** | **7,7** | Paso 11 |
| **Nivel de documentación** | **8,2** | Paso 12 |
| **Nivel general del proyecto** | **7,8** | Promedio ponderado integrador |

---

## Cobertura y cumplimiento

| Métrica | Porcentaje |
|---------|------------|
| Cobertura ingeniería inversa global | ~92 % |
| Completitud documentos núcleo | 96 % (54/55) |
| Evidencias operativas | ~85 % |
| Evidencias visuales | ~30 % |
| Pasos analíticos completados | 100 % (11/11) |
| Funcionalidades completas vs inventario | 81 % (48/59) |
| Cobertura funcional vs dominio | 88 % |

---

## Producción verificada

| Servicio | Resultado |
|----------|-----------|
| Railway API `/api/health` | HTTP 200 |
| Vercel SPA | HTTP 200 |
| Tests backend locales | 18/18 |
| Cypress E2E (última corrida doc.) | 13/13 |
| JMeter health (500 req) | 0 % error |

---

## Pendientes documentales

1. `01_Analisis_de_Logs/05_Trazabilidad.md`
2. 21 archivos Excel de matrices (pasos 01–11)
3. Capturas Railway, Vercel, SonarCloud
4. Videos Cypress

---

*Indicadores calculados en Paso 13 a partir de evidencias de Pasos 01–12.*
