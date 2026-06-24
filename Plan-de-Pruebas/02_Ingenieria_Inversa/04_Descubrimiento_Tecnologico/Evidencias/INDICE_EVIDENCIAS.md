# Índice de Evidencias — Paso 4 Descubrimiento Tecnológico

**Fecha:** 2026-06-24

---

## Documentos generados en este paso

| Archivo | Descripción |
|---------|-------------|
| `Inventario_Tecnologico.md` | 54 tecnologías en 8 categorías |
| `Inventario_Tecnologico.xlsx` | Excel inventario |
| `Matriz_Tecnologias.md` | 45 entradas TEC-001–TEC-045 |
| `Matriz_Tecnologias.xlsx` | Excel matriz |
| `Stack_Tecnologico.md` | Diagrama y capas del stack |
| `Arquitectura_Tecnologica.md` | Flujos integración FE/BE/BD/IA/Cloud |
| `Resumen_Ejecutivo.md` | Síntesis ICACIT |

---

## Evidencias incorporadas (archivos reales copiados)

| Archivo | Origen | Descripción |
|---------|--------|-------------|
| `monorepo_package.json` | `cafe-cursor/package.json` | Scripts Cypress, cross-env |
| `monorepo_package-lock.json` | `cafe-cursor/package-lock.json` | Lock monorepo |
| `backend_package.json` | `cafe-cursor/backend/package.json` | Deps Express, mysql2, JWT |
| `backend_package-lock.json` | `cafe-cursor/backend/package-lock.json` | Versiones resueltas backend |
| `frontend_package.json` | `cafe-cursor/frontend/package.json` | Deps React, Vite, Tailwind |
| `frontend_package-lock.json` | `cafe-cursor/frontend/package-lock.json` | Versiones resueltas frontend |
| `vercel.json` | `cafe-cursor/frontend/vercel.json` | Deploy Vercel + VITE_API_URL |
| `render.yaml` | `cafe-cursor/render.yaml` | Blueprint alternativo Render |
| `sonar-project.properties` | `cafe-cursor/sonar-project.properties` | SonarCloud config |
| `ci.yml` | `cafe-cursor/.github/workflows/ci.yml` | Pipeline GitHub Actions |
| `README_proyecto.md` | `cafe-cursor/README.md` | Documentación stack |
| `backend_env.example.txt` | `cafe-cursor/backend/.env.example` | Variables entorno |
| `schema.sql` | `cafe-cursor/backend/sql/schema.sql` | 39 tablas MySQL |
| `ml_requirements.txt` | `cafe-cursor/ml/requirements.txt` | Python ML deps |
| `DOCUMENTACION_TECNICA.md` | `cafe-cursor/docs/` | API y arquitectura |
| `arquitectura-solucion-cafe-ia.md` | `cafe-cursor/docs/Arquitectura de la solución planteada/` | Arquitectura propuesta |
| `der-relaciones-completas.md` | `cafe-cursor/docs/Arquitectura de la solución planteada/` | DER relaciones |
| `jmeter_resumen.json` | Reporte-Calidad-Software | Carga 500 req health |
| `cypress_last-run.json` | Reporte-Calidad-Software | E2E 13/13 OK |
| `hallazgos_sonar.md` | Reporte-Calidad-Software | Hallazgos Sonar |

---

## Evidencias pendientes de incorporar

| ID | Tipo | Descripción |
|----|------|-------------|
| E-TEC-01 | PNG | Captura panel Railway (servicios activos) |
| E-TEC-02 | PNG | Captura dashboard Vercel (deploy) |
| E-TEC-03 | PNG | Quality Gate SonarCloud en vivo |
| E-TEC-04 | PNG/MP4 | Videos Cypress `testing/cypress/videos/` |
| E-TEC-05 | JMX | Archivo plan JMeter completo — solo CSV/JSON en repo |
| E-TEC-06 | — | **Dockerfile** — no existe en repositorio |
| E-TEC-07 | PNG | Screenshot SonarCloud dashboard export |

> No se inventaron capturas ni artefactos inexistentes.

---

## Referencia cruzada pasos anteriores

| Paso | Relación |
|------|----------|
| Paso 1 Logs | Tests 18/18, health Railway, CVE npm |
| Paso 2 Dependencias | 34 deps directas, versiones lockfile |
| Paso 3 Funcional | Módulos que consumen cada tecnología |

---

*Índice para expediente ICACIT — Ingeniería Inversa Paso 4.*
