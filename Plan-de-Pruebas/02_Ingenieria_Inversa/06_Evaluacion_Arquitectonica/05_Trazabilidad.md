# 05 — Trazabilidad — Evaluación Arquitectónica

**Proyecto:** CAFE-IA  
**Actividad:** Ingeniería Inversa — Paso 6  
**Fecha del análisis:** 2026-06-24

---

## Objetivo

Evaluar integralmente la **calidad arquitectónica** del sistema CAFE-IA mediante atributos de calidad (modularidad, cohesión, seguridad, rendimiento, etc.), criterios organizacionales (backend, frontend, BD, integraciones cloud) y checklist arquitectónico, generando evidencia cuantificada para evaluación ICACIT.

---

## Componentes evaluados

| Ámbito | Componentes |
|--------|-------------|
| Backend | 13 controllers, 17 services, 11 repositories, 14 routes, 4 middleware |
| Frontend | 15 pages, 17 components, 3 contexts, routing |
| Base de datos | 39 tablas, migrate.js, schema.sql |
| Infraestructura | Railway API+MySQL, Vercel SPA, GitHub Actions |
| Calidad | Cypress, JMeter, SonarCloud, node:test |
| IA | PredictionEngine.js, PrediccionService |

**Total atributos evaluados:** 26 (EVA) + 10 (ATTR) + 40 (checklist)

---

## Archivos revisados

| Archivo / Fuente | Uso en evaluación |
|------------------|-------------------|
| Pasos 1–5 `Plan-de-Pruebas/02_Ingenieria_Inversa/` | Base de hallazgos previos |
| `backend/src/app.js` | Seguridad, middleware |
| `backend/src/application/services/LoteService.js` | Robustez, transacciones |
| `backend/src/application/services/PredictionService.js` | Acoplamiento hexagonal |
| `backend/sql/schema.sql` | Organización BD |
| `frontend/src/routes/AppRoutes.jsx` | Usabilidad, routing |
| `frontend/vercel.json` | Integración Vercel |
| `jmeter_resumen.json` | Rendimiento, disponibilidad |
| `cypress_last-run.json` | Testabilidad E2E |
| `hallazgos_sonar.md` | Mantenibilidad |
| `ci.yml` | Testabilidad CI |
| `sonar-project.properties` | Calidad estática |

Copias en `Evidencias/`.

---

## Criterios utilizados

| Marco | Aplicación |
|-------|------------|
| Atributos calidad arquitectónica | 14 atributos ISO 25010 adaptados |
| Atributos calidad software | 10 ATTR con escala Excelente–Deficiente |
| Checklist arquitectónico | 40 criterios Cumple / Parcial / No cumple |
| Escala cumplimiento EVA | Alto ≥85 % · Medio 70–84 % · Bajo <70 % |
| Evidencia empírica | JMeter, Cypress, Sonar, tests backend |

---

## Evidencias recopiladas

Ver `Evidencias/INDICE_EVIDENCIAS.md`. Resumen:

- 14 copias de evidencias reales (schema, vercel, jmeter, cypress, sonar, DER, Mermaid…)
- 7 documentos generados (2 matrices md/xlsx, checklist, resumen, índice)
- Referencia cruzada Pasos 1–5

**Pendientes:** UML formal, capturas Railway/Vercel/Sonar en vivo, OpenAPI.

---

## Documentos generados

| Documento | Ruta |
|-----------|------|
| Prompt original | `01_Prompt.md` |
| Evaluación integral | `02_Resultado_IA.md` |
| Plan mejoras | `03_Mejoras.md` |
| Conclusiones | `04_Conclusiones.md` |
| Trazabilidad | `05_Trazabilidad.md` |
| Matriz evaluación | `Evidencias/Matriz_Evaluacion_Arquitectonica.md` / `.xlsx` |
| Matriz atributos calidad | `Evidencias/Matriz_Atributos_Calidad.md` / `.xlsx` |
| Checklist | `Evidencias/Checklist_Arquitectura.md` |
| Resumen ejecutivo | `Evidencias/Resumen_Ejecutivo.md` |

---

## Relación con pasos anteriores

| Paso | Aporte a evaluación |
|------|---------------------|
| Paso 1 Logs | Disponibilidad Railway, tests 18/18, CVE |
| Paso 2 Dependencias | Seguridad supply chain |
| Paso 3 Funcional | Usabilidad, cobertura módulos |
| Paso 4 Tecnológico | Stack, herramientas calidad |
| Paso 5 Detección | Componentes, patrones, acoplamiento base |

---

## Restricciones cumplidas

- No se modificó ningún archivo del proyecto CAFE-IA.
- Evaluación basada en arquitectura real; elementos inexistentes indicados.
- Sin instrucciones de IA en documentos finales.

---

**Fecha de cierre del análisis:** 2026-06-24
