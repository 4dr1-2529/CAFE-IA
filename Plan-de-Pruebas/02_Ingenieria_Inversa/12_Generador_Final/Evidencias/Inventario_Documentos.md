# Inventario Documental — Ingeniería Inversa CAFE-IA

**Fecha:** 24 de junio de 2026  
**Raíz:** `Plan-de-Pruebas/02_Ingenieria_Inversa/`  
**Total archivos (Pasos 01–11):** 327

---

## Resumen por paso

| Carpeta | Archivos | Docs núcleo (5) | Excel | Mermaid | INDICE | Estado |
|---------|----------|-----------------|-------|---------|--------|--------|
| 01_Analisis_de_Logs | 22 | 4/5 | 1 | 0 | ✅ | ⚠ Parcial |
| 02_Dependencias | 31 | 5/5 | 1 | 0 | ✅ | ✅ |
| 03_Descubrimiento_Funcional | 25 | 5/5 | 2 | 0 | ✅ | ✅ |
| 04_Descubrimiento_Tecnologico | 34 | 5/5 | 2 | 0 | ✅ | ✅ |
| 05_Deteccion_Arquitectonica | 27 | 5/5 | 2 | 7 | ✅ | ✅ |
| 06_Evaluacion_Arquitectonica | 26 | 5/5 | 2 | 0 | ✅ | ✅ |
| 07_Reconstruccion_Arquitectonica | 45 | 5/5 | 2 | 7 | ✅ | ✅ |
| 08_Reconstruccion_del_Dominio | 32 | 5/5 | 3 | 5 | ✅ | ✅ |
| 09_Reconstruccion_del_Entorno | 42 | 5/5 | 2 | 5 | ✅ | ✅ |
| 10_Variables_de_Entorno | 21 | 5/5 | 2 | 0 | ✅ | ✅ |
| 11_Hallazgos | 22 | 5/5 | 2 | 1 | ✅ | ✅ |
| **Total** | **327** | **54/55** | **21** | **24** | **11** | **96 %** |

---

## Documentos núcleo (patrón estándar)

| Archivo | Tipo | Pasos | Observaciones |
|---------|------|-------|---------------|
| `01_Prompt.md` | Prompt | 01–11 | Especificación original por paso |
| `02_Resultado_IA.md` | Informe | 01–11 | Análisis principal |
| `03_Mejoras.md` | Plan mejora | 01–11 | Acciones recomendadas |
| `04_Conclusiones.md` | Conclusión | 01–11 | Cierre por paso |
| `05_Trazabilidad.md` | Trazabilidad | 02–11 | **Falta en Paso 01** |

---

## Matrices Excel (inventario completo)

| # | Carpeta | Archivo Excel |
|---|---------|---------------|
| 1 | 01/Evidencias | Matriz_Hallazgos.xlsx |
| 2 | 02/Evidencias | Matriz_Dependencias.xlsx |
| 3 | 03/Evidencias | Inventario_Funcional.xlsx |
| 4 | 03/Evidencias | Matriz_Modulos.xlsx |
| 5 | 04/Evidencias | Inventario_Tecnologico.xlsx |
| 6 | 04/Evidencias | Matriz_Tecnologias.xlsx |
| 7 | 05/Evidencias | Inventario_Componentes.xlsx |
| 8 | 05/Evidencias | Matriz_Componentes.xlsx |
| 9 | 06/Evidencias | Matriz_Atributos_Calidad.xlsx |
| 10 | 06/Evidencias | Matriz_Evaluacion_Arquitectonica.xlsx |
| 11 | 07/Evidencias | Inventario_Componentes.xlsx |
| 12 | 07/Evidencias | Matriz_Componentes.xlsx |
| 13 | 08/Evidencias | Inventario_Entidades.xlsx |
| 14 | 08/Evidencias | Matriz_Procesos.xlsx |
| 15 | 08/Evidencias | Matriz_Reglas_Negocio.xlsx |
| 16 | 09/Evidencias | Inventario_Entorno.xlsx |
| 17 | 09/Evidencias | Matriz_Infraestructura.xlsx |
| 18 | 10/Evidencias | Inventario_Variables.xlsx |
| 19 | 10/Evidencias | Matriz_Variables.xlsx |
| 20 | 11/Evidencias | Matriz_Hallazgos.xlsx |
| 21 | 11/Evidencias | Matriz_Riesgos.xlsx |

**Nota verificación disco (24-jun-2026):** Los 21 archivos Excel listados arriba **no están materializados** en las carpetas de pasos 01–11. Solo existen las versiones Markdown equivalentes. Estado: **Pendiente de incorporar**.

---

## Documentos de evidencia recurrentes por paso

| Archivo | Tipo | Pasos con archivo |
|---------|------|-------------------|
| `INDICE_EVIDENCIAS.md` | Índice | 01–11 |
| `Resumen_Ejecutivo.md` | Resumen | 01–11 |
| `Diccionario_*.md` / `Configuracion_*.md` | Referencia | Varios |
| Diagramas `.mmd` + `.md` | Diagrama | 05, 07, 08, 09, 11 |

---

## Paso 12 — Generador Final (este paso)

| Archivo | Tipo | Estado |
|---------|------|--------|
| `01_Prompt.md` | Prompt | Generado |
| `02_Resultado_IA.md` | Informe consolidado | Generado |
| `03_Mejoras.md` | Plan consolidado | Generado |
| `04_Conclusiones.md` | Conclusión final | Generado |
| `05_Trazabilidad.md` | Trazabilidad | Generado |
| `Evidencias/Checklist_Final.*` | Verificación | Generado |
| `Evidencias/Inventario_*` | Inventarios | Generado |
| `Evidencias/AUDITORIA_FINAL.md` | Auditoría | Generado |

---

## Observaciones

1. **No se duplicaron** los 327 archivos en Paso 12; se referencian rutas originales y se copiaron muestras operativas en `12_Generador_Final/Evidencias/`.
2. **Capturas visuales** de paneles cloud: pendientes en todos los pasos.
3. Documentación lista para anexo ICACIT con estructura homogénea 01–05 + Evidencias.
