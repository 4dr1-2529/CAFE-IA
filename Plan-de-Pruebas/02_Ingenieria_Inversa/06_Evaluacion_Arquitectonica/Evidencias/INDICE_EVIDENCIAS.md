# Índice de Evidencias — Paso 6 Evaluación Arquitectónica

**Fecha:** 2026-06-24

---

## Documentos generados

| Archivo | Descripción |
|---------|-------------|
| `Matriz_Evaluacion_Arquitectonica.md` | 26 atributos EVA-001–EVA-026 |
| `Matriz_Evaluacion_Arquitectonica.xlsx` | Excel evaluación |
| `Matriz_Atributos_Calidad.md` | 10 atributos ATTR con valoración |
| `Matriz_Atributos_Calidad.xlsx` | Excel atributos calidad |
| `Checklist_Arquitectura.md` | 40 criterios C-01–C-40 |
| `Resumen_Ejecutivo.md` | Síntesis ICACIT |

---

## Evidencias incorporadas (copias reales)

| Archivo | Origen | Uso en evaluación |
|---------|--------|-------------------|
| `schema.sql` | backend/sql/ | Organización BD, integridad |
| `vercel.json` | frontend/ | Integración Vercel |
| `render.yaml` | raíz repo | Referencia despliegue |
| `backend_env.example.txt` | backend/.env.example | Gestión configuración |
| `sonar-project.properties` | raíz repo | Testabilidad, calidad estática |
| `ci.yml` | .github/workflows/ | CI/CD |
| `jmeter_resumen.json` | Reporte-Calidad-Software | Rendimiento, disponibilidad |
| `cypress_last-run.json` | Reporte-Calidad-Software | Usabilidad, testabilidad E2E |
| `hallazgos_sonar.md` | Reporte-Calidad-Software | Mantenibilidad, deuda técnica |
| `README_proyecto.md` | README.md | Documentación arquitectura |
| `arquitectura-solucion-cafe-ia.md` | docs/Arquitectura | Comparación diseño vs implementado |
| `arquitectura-solucion-cafe-ia.mmd` | docs/Arquitectura | Diagrama Mermaid |
| `der-relaciones-completas.md` | docs/Arquitectura | Modelo relacional |
| `projectStructure.js` | frontend/constants/ | Organización carpetas |

---

## Evidencias de pasos anteriores (referencia cruzada)

| Paso | Documentos utilizados |
|------|----------------------|
| Paso 3 Funcional | Cobertura módulos vs arquitectura |
| Paso 4 Tecnológico | Stack y herramientas calidad |
| Paso 5 Detección | Componentes COM, patrones, dependencias |

---

## Evidencias pendientes de incorporar

| ID | Tipo | Descripción |
|----|------|-------------|
| E-EVA-01 | UML | Diagramas UML formales — no existen en repo |
| E-EVA-02 | PNG | Captura panel Railway (servicios, métricas) |
| E-EVA-03 | PNG | Captura Vercel deployment analytics |
| E-EVA-04 | PNG | SonarCloud Quality Gate export |
| E-EVA-05 | JSON | OpenAPI/Swagger — no existe |
| E-EVA-06 | PNG | Diagrama C4 exportado |

> Evidencia pendiente de incorporar.

---

*Índice para expediente ICACIT — Ingeniería Inversa Paso 6.*
