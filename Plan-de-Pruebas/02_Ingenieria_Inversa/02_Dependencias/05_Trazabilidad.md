# 05 — Trazabilidad — Análisis de Dependencias

**Proyecto:** CAFE-IA  
**Actividad:** Ingeniería Inversa — Paso 2  
**Fecha del análisis:** 2026-06-24

---

## Objetivo del análisis

Inventariar, analizar y documentar todas las dependencias del proyecto CAFE-IA (backend, frontend, herramientas, ML y servicios externos), identificando versiones instaladas, funciones, riesgos, vulnerabilidades y plan de mejoras, como evidencia para evaluación ICACIT.

---

## Archivos revisados

### Código fuente (solo lectura)

| Ruta | Propósito |
|------|-----------|
| `cafe-cursor/backend/src/**/*.js` | Verificación imports (express, mysql2, jwt, etc.) |
| `cafe-cursor/frontend/src/**/*.jsx` | Verificación imports (react, recharts, lucide) |
| `cafe-cursor/frontend/src/services/api/client.js` | Confirmación fetch vs axios |
| `cafe-cursor/.github/workflows/ci.yml` | Herramientas CI |
| `cafe-cursor/sonar-project.properties` | SonarCloud |
| `cafe-cursor/ml/requirements.txt` | Python ML |

### Reportes existentes

| Ruta | Propósito |
|------|-----------|
| `cafe-cursor/Reporte-Calidad-Software/Evidencias/sonarqube/*` | Hallazgos Sonar |
| `cafe-cursor/Reporte-Calidad-Software/Evidencias/cypress/last-run.json` | E2E |
| `cafe-cursor/Reporte-Calidad-Software/Reportes/jmeter_resumen.json` | Carga |

---

## package.json analizados

| Archivo | Ruta original | Versión proyecto |
|---------|---------------|------------------|
| Monorepo | `cafe-cursor/package.json` | 2.0.0 |
| Backend | `cafe-cursor/backend/package.json` | 2.0.0 |
| Frontend | `cafe-cursor/frontend/package.json` | 1.0.3 |

---

## package-lock.json analizados

| Archivo | Ruta original |
|---------|---------------|
| Monorepo | `cafe-cursor/package-lock.json` |
| Backend | `cafe-cursor/backend/package-lock.json` |
| Frontend | `cafe-cursor/frontend/package-lock.json` |

Copias en `Evidencias/` con prefijos `monorepo_`, `backend_`, `frontend_`.

---

## Configuraciones inspeccionadas

| Configuración | Ubicación |
|---------------|-----------|
| SonarCloud | `sonar-project.properties` |
| Vercel build | `frontend/vercel.json` |
| Cypress | `testing/cypress.config.js` |
| Vite | `frontend/vite.config.js` |
| Tailwind | `frontend/tailwind.config.js` |
| Variables entorno ref | `backend/.env.example` |
| Overrides npm | `backend/package.json`, `package.json` raíz |

---

## Herramientas utilizadas

| Herramienta | Uso en este análisis |
|-------------|---------------------|
| Lectura archivos proyecto | package.json, lockfiles, código |
| `npm list --depth=0 --json` | Versiones resueltas backend/frontend/monorepo |
| `npm audit --json` | CVE backend y frontend |
| PowerShell Copy-Item | Copia evidencias sin modificar origen |
| ExcelJS (backend node_modules) | Generación `Matriz_Dependencias.xlsx` |
| Grep código fuente | Verificación uso real de dependencias |

---

## Evidencias recopiladas

Ver `Evidencias/INDICE_EVIDENCIAS.md`. Resumen:

- 6 archivos package.json / lock (copias)
- 3 archivos npm_list_*.json
- 2 archivos npm_audit_*.json + 2 .txt
- sonar-project.properties, ml_requirements.txt
- hallazgos_sonar.md, cypress_last-run.json, jmeter_resumen.json
- 8 documentos generados (matriz, inventario, resumen, fichas)

---

## Documentos generados

| Documento | Ubicación |
|-----------|-----------|
| 01_Prompt.md | `02_Dependencias/` |
| 02_Resultado_IA.md | `02_Dependencias/` |
| 03_Mejoras.md | `02_Dependencias/` |
| 04_Conclusiones.md | `02_Dependencias/` |
| 05_Trazabilidad.md | `02_Dependencias/` (este archivo) |
| Matriz_Dependencias.md / .xlsx | `Evidencias/` |
| Inventario_Dependencias.md | `Evidencias/` |
| Dependencias_Backend.md | `Evidencias/` |
| Dependencias_Frontend.md | `Evidencias/` |
| Dependencias_Herramientas.md | `Evidencias/` |
| Resumen_Ejecutivo.md | `Evidencias/` |
| INDICE_EVIDENCIAS.md | `Evidencias/` |

---

## Relación con Paso 1

| Paso 1 (Logs) | Paso 2 (Dependencias) |
|---------------|----------------------|
| npm_audit_*.txt | Ampliado con audit JSON y fichas por paquete |
| Hallazgos LOG-05, LOG-06 | Detallados en Matriz DEP-031–034 |
| Mejoras M-05, M-06 | Plan M-DEP-01 a M-DEP-15 |

---

## Fecha del análisis

**2026-06-24** (UTC-5 Perú)

---

*Trazabilidad documental ICACIT — CAFE-IA Ingeniería Inversa.*
