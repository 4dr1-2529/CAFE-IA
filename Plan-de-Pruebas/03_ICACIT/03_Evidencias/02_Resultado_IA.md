# Informe de Consolidación de Evidencias ICACIT — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 3 — Consolidación de Evidencias  
**Fecha:** 24 de junio de 2026  
**Base:** Planificación (Paso 01) y Ejecución (Paso 02)

---

## 1. Objetivo

Consolidar, clasificar y documentar el inventario completo de evidencias del proyecto CAFE-IA necesarias para la evaluación ICACIT, identificando evidencias existentes, faltantes, incompletas y duplicadas, sin modificar el código fuente ni inventar artefactos.

---

## 2. Metodología

| Paso | Actividad | Fuente |
|------|-----------|--------|
| 1 | Barrido de `Plan-de-Pruebas/` (684 archivos) | Inventario automático |
| 2 | Barrido de `Reporte-Calidad-Software/` (76 archivos) | CHECKLIST_EVIDENCIAS |
| 3 | Barrido de `testing/`, `docs/`, `backend/tests/` | Artefactos operativos |
| 4 | Clasificación en 14 categorías ICACIT | Matriz categorías |
| 5 | Catalogación de 44 evidencias clave (EV-001–044) | Inventario Excel |
| 6 | Identificación gaps y duplicados | Índices FURPS/II/Reporte |

---

## 3. Inventario de evidencias

### 3.1 Resumen cuantitativo del repositorio

| Ubicación | Archivos | Descripción |
|-----------|----------|-------------|
| `Plan-de-Pruebas/` | 684 | II (13 fases) + FURPS/OWASP (8) + ICACIT (3 fases) |
| `Reporte-Calidad-Software/` | 76 | Informe 13 capítulos + evidencias |
| `testing/` | 92 | Cypress, JMeter, métricas |
| `docs/` | 26 | Documentación técnica y diagramas |
| `backend/tests/` | 6 | Suites unitarias |
| **Corpus total revisado** | **~884** | Sin contar `node_modules/` ni `dist/` |

### 3.2 Por tipo de archivo (Plan-de-Pruebas)

| Tipo | Cantidad |
|------|----------|
| Markdown (.md) | 401 |
| Excel (.xlsx) | 46 |
| JSON | 97 |
| TXT (logs npm) | 53 |
| Mermaid (.mmd) en repo | 35 |
| CSV | 2 |
| JMX (JMeter) | 1 |
| Capturas (png/jpg) | **0** |

### 3.3 Catálogo consolidado (EV-001–044)

| Estado | Cantidad | % |
|--------|----------|---|
| Existentes | 38 | 86 % |
| Incompletas | 1 | 2 % |
| Pendientes de incorporar | 5 | 12 % |
| **Total catalogadas** | **44** | 100 % |

---

## 4. Clasificación por categoría

| Categoría | Evidencias catálogo | Existentes | Pendientes |
|-----------|---------------------|------------|------------|
| Arquitectura | 3 | 3 | 0 |
| Backend | 3 | 3 | 0 |
| Frontend | 2 | 2 | 0 |
| Base de Datos | 2 | 2 | 0 |
| APIs | 2 | 1 | 1 (+ 1 incompleta) |
| Pruebas | 6 | 5 | 1 |
| Calidad | 4 | 3 | 1 |
| Seguridad | 5 | 4 | 1 |
| Despliegue | 3 | 3 | 0 |
| Infraestructura | 3 | 2 | 1 |
| Documentación | 3 | 3 | 0 |
| Machine Learning | 2 | 2 | 0 |
| Reportes | 2 | 2 | 0 |
| Métricas | 2 | 2 | 0 |
| Capturas | 1 | 0 | 1 |

---

## 5. Cantidad encontrada

| Indicador | Valor |
|-----------|-------|
| Archivos en corpus de evidencias | ~884 |
| Evidencias clave catalogadas | 44 |
| Documentos markdown evaluación | 401+ |
| Reportes formales | 13 cap. + 21 fases Plan-de-Pruebas |
| Diagramas Mermaid | 35 (únicos ~18; resto duplicados) |
| Matrices Excel | 46 |
| Capturas UI | 0 |
| Logs operativos (npm, tests) | 53+ |

---

## 6. Coberturas alcanzadas

| Dimensión | Cobertura | Base de cálculo |
|-----------|-----------|-----------------|
| **Cobertura documental** | **88 %** | 684 archivos Plan-de-Pruebas + Reporte 89.2 % |
| **Cobertura técnica** | **82 %** | Stack, BD, backend, frontend documentados |
| **Cobertura funcional** | **83 %** | Functionality FURPS; 48/59 capacidades II |
| **Cobertura arquitectónica** | **88 %** | FURPS + II; 35 diagramas |
| **Cobertura de pruebas** | **75 %** | Cypress/JMeter OK; CI parcial; 0 capturas |
| **Cobertura de seguridad** | **76 %** | OWASP consolidado; gaps Sonar/ZAP |

---

## 7. Evidencias faltantes (documentadas)

| ID | Evidencia | Estado |
|----|-----------|--------|
| EV-039 | Capturas UI E-01 a E-24 | Evidencia pendiente de incorporar. |
| EV-040 | Export SonarCloud PDF/HTML | Evidencia pendiente de incorporar. |
| EV-041 | Reporte OWASP ZAP | Evidencia pendiente de incorporar. |
| EV-042 | Colección Postman exportada | Evidencia pendiente de incorporar. |
| EV-043 | Política backups MySQL Railway | Evidencia pendiente de incorporar. |
| EV-044 | Reporte lcov/c8 cobertura | Evidencia pendiente de incorporar. |

## 8. Evidencias duplicadas identificadas

| Artefacto | Ubicaciones | Acción recomendada |
|-----------|-------------|-------------------|
| `arquitectura-solucion-cafe-ia.mmd` | ~10 carpetas Evidencias/ | Referenciar `docs/` como canónica |
| `der-relaciones-completas.mmd` | 4 ubicaciones | Referenciar `docs/` como canónica |
| `cypress_last-run.json` | 15+ carpetas FURPS/II | Referenciar `testing/` o Reporte |
| `npm_audit_*.txt` | 10+ carpetas | Referenciar FURPS/07 o II/01 |

## 9. Evidencias desactualizadas

| Evidencia | Fecha | Observación |
|-----------|-------|-------------|
| Cypress last-run.json | 2026-05-28 | Última corrida documentada |
| JMeter CSV | 2026-05-28 | Health check únicamente |
| Reporte-Calidad | 2026-06-18 | Anterior a cierre FURPS 06-24 |

---

*Informe consolidación — Paso 03 ICACIT — CAFE-IA.*
