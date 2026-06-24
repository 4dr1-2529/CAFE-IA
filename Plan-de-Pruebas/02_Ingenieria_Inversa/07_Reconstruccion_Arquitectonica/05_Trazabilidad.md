# 05 — Trazabilidad — Reconstrucción Arquitectónica

**Proyecto:** CAFE-IA  
**Actividad:** Ingeniería Inversa — Paso 7  
**Fecha:** 2026-06-24

---

## Objetivo

Reconstruir documental y gráficamente la **arquitectura completa** del sistema CAFE-IA — lógica, física, componentes, despliegue, flujos de datos e integraciones — mediante ingeniería inversa, generando diagramas Mermaid y matrices para expediente ICACIT.

---

## Carpetas revisadas

| Carpeta | Contenido analizado |
|---------|---------------------|
| `cafe-cursor/backend/src/` | Capas hexagonal completas |
| `cafe-cursor/frontend/src/` | Pages, components, routing |
| `cafe-cursor/backend/sql/` | schema, seeds, views |
| `cafe-cursor/docs/` | Arquitectura propuesta |
| `cafe-cursor/.github/workflows/` | CI |
| `Plan-de-Pruebas/02_Ingenieria_Inversa/01–06/` | Hallazgos previos |

---

## Archivos analizados (muestra)

| Archivo | Uso reconstrucción |
|---------|-------------------|
| `backend/src/app.js` | Pipeline middleware |
| `backend/src/interfaces/http/routes/index.js` | Módulos API |
| `backend/src/application/services/LoteService.js` | Flujo datos lote |
| `backend/src/domain/PredictionEngine.js` | Dominio IA |
| `frontend/src/routes/AppRoutes.jsx` | Routing SPA |
| `frontend/vercel.json` | Despliegue FE |
| `backend/sql/schema.sql` | Modelo relacional |
| `jmeter_resumen.json` | Validación prod |

---

## Componentes reconstruidos

| Categoría | Cantidad |
|-----------|----------|
| Backend archivos | 93 |
| Frontend archivos | 60 |
| Matriz REC componentes clave | 30 |
| Tablas MySQL | 39 |
| Módulos API | 13 |
| Capas hexagonal | 5 |

---

## Diagramas generados

| # | Diagrama | Formatos |
|---|----------|----------|
| 1 | General del Sistema | .mmd + .md |
| 2 | Componentes | .mmd + .md |
| 3 | Capas | .mmd + .md |
| 4 | Cliente-Servidor | .mmd + .md |
| 5 | Despliegue | .mmd + .md |
| 6 | Flujo de Datos | .mmd + .md |
| 7 | Comunicación módulos | .mmd + .md |

**Total archivos diagrama:** 14

---

## Evidencias utilizadas

- Código fuente CAFE-IA (solo lectura)
- Pasos 1–6 Ingeniería Inversa
- 15 copias en `Evidencias/` (schema, vercel, jmeter, cypress, sonar, DER…)
- 11 documentos generados + 2 Excel

**Pendientes:** UML formal, PNG renders, capturas Railway/Vercel.

---

## Documentos generados

| Documento | Ruta |
|-----------|------|
| Prompt | `01_Prompt.md` |
| Reconstrucción completa | `02_Resultado_IA.md` |
| Refactorización | `03_Mejoras.md` |
| Conclusiones | `04_Conclusiones.md` |
| Trazabilidad | `05_Trazabilidad.md` |
| Arquitectura lógica/física/componentes/despliegue/flujo | `Evidencias/Arquitectura_*.md` |
| Inventario y matriz | `Evidencias/Inventario_*.md/xlsx`, `Matriz_*.md/xlsx` |
| Diagramas | `Evidencias/Diagrama_*` |
| Resumen e índice | `Evidencias/Resumen_Ejecutivo.md`, `INDICE_EVIDENCIAS.md` |

---

## Restricciones cumplidas

- No se modificó CAFE-IA.
- No se inventaron componentes.
- Sin instrucciones IA en documentos finales.

---

**Fecha de cierre:** 2026-06-24
