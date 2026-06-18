# Guía paso a paso — SonarCloud

**Estado:** CI configurado; **no hay export PDF/PNG** en el repositorio.

**Proyecto:** https://sonarcloud.io/project/overview?id=4dr1-2529_CAFE-IA

---

## Paso 1 — Verificar CI

1. GitHub → repositorio CAFE-IA → Actions.
2. Workflow **SonarCloud Analysis** debe ejecutarse tras backend + frontend.
3. Requiere secret `SONAR_TOKEN` en repo settings.

Configuración: `cafe-cursor/sonar-project.properties`, `cafe-cursor/.github/workflows/ci.yml`.

---

## Paso 2 — Capturas obligatorias

| ID | Pantalla | Guardar en |
|----|----------|------------|
| E-27 | Overview — Quality Gate + Ratings | `Evidencias/sonarqube/overview.png` |
| E-28 | Issues → Vulnerabilities | `Evidencias/sonarqube/vulnerabilities.png` |
| E-29 | Measures → Complexity, Debt, Duplication | `Evidencias/sonarqube/measures.png` |

---

## Paso 3 — Completar plantilla offline

Actualizar valores en `Evidencias/sonarqube/hallazgos_sonar.md` con datos reales del dashboard (no inventar).

---

## Evidencia offline ya disponible

| Archivo | Contenido |
|---------|-----------|
| `Reportes/sonarqube_correcciones.md` | 16 mitigaciones en código |
| `Reportes/sonarqube_reporte.md` | Plantilla métricas |
| `Evidencias/sonarqube/SONARCLOUD.md` | Configuración proyecto |

---

## Trazabilidad

Doc 07 | Matriz OWASP | TR-16 | CHECKLIST C-01 a C-03
