# Inventario de Evidencias — Ingeniería Inversa CAFE-IA

**Fecha:** 24 de junio de 2026  
**Clasificación automática por tipo**

---

## Resumen por tipo

| Tipo | Cantidad | Estado |
|------|----------|--------|
| Markdown (.md) | ~186 | ✅ |
| Excel (.xlsx) pasos 01–11 | 0 en disco (21 referenciados) | ❌ Pendiente |
| Excel (.xlsx) paso 12 | 3 | ✅ |
| Mermaid (.mmd) | 24 | ✅ |
| JSON | 8+ | ✅ |
| CSV / TXT (logs) | 10+ | ✅ |
| SQL | 2+ | ✅ |
| Config (yml, json, properties) | 15+ | ✅ |
| Capturas (imagen) | 0 | ❌ Pendiente |

---

## Logs

| Archivo | Paso | Descripción |
|---------|------|-------------|
| npm_test_backend.txt | 01 | Salida tests backend 18/18 |
| npm_audit_backend.txt | 01 | Auditoría CVE backend |
| npm_audit_frontend.txt | 01 | Auditoría CVE frontend |
| npm_lint_frontend.txt | 01 | ESLint frontend |
| npm_build_frontend.txt | 01 | Build Vite + chunks |

---

## Reportes

| Archivo | Paso | Descripción |
|---------|------|-------------|
| CORRECCIONES_SONARQUBE.md | 01, 11 | Correcciones análisis estático |
| hallazgos_sonar.md | 01 | Hallazgos SonarCloud |
| Matriz_Hallazgos_Consolidada.md | 11 (copia P12) | 48 hallazgos HAL |
| Plan_Accion.md | 11 | 38 acciones |
| Dashboard_Hallazgos.md | 11 | Estadísticas hallazgos |

---

## Matrices

| Ubicación | Cantidad |
|-----------|----------|
| Pasos 01–11 / Evidencias / Matriz_*.md | 25+ |
| Pasos 01–11 / Evidencias / Inventario_*.md | 10+ |
| Excel asociados pasos 01–11 | 0 en disco / 21 referenciados |
| Excel paso 12 | 3 generados |

---

## Diagramas

| Paso | Diagramas (.mmd) |
|------|------------------|
| 05 | Arquitectura, capas, módulos |
| 07 | 7 diagramas arquitectónicos |
| 08 | Modelo dominio, procesos, casos uso (5) |
| 09 | Entorno, infra, despliegue, comunicación (5) |
| 11 | Infraestructura (1) |
| **Total** | **24** |

---

## Configuraciones

| Archivo | Paso | Tipo |
|---------|------|------|
| backend_env.example / .txt | 01, 09, 10 | Variables backend |
| frontend_env.example | 09, 10 | Variables frontend |
| vercel.json | 09, 10 | Deploy Vercel |
| github_actions_ci.yml | 09, 10 | CI |
| sonar-project.properties | 09, 10 | SonarCloud |
| render.yaml | 09, 10 | Render alternativo |
| schema.sql | 08 | MySQL DDL |
| RoleHelper.js | 08 | RBAC evidencia |

---

## JSON / CSV

| Archivo | Paso | Contenido |
|---------|------|-----------|
| railway_health_response.json | 01, 12 | Health API Railway |
| vercel_status.json | 01, 12 | Status frontend |
| cypress_last-run.json | 01, 12 | Resultado E2E |
| jmeter_resumen.json | 01, 12 | Métricas carga |
| disponibilidad_resultado.json | 01 | Disponibilidad |
| resultado_jmeter.csv | 01 | Detalle JMeter |

---

## Capturas

| Evidencia | Estado |
|-----------|--------|
| Panel Railway variables | Evidencia pendiente de incorporar |
| Panel Vercel env | Evidencia pendiente de incorporar |
| SonarCloud Quality Gate | Evidencia pendiente de incorporar |
| Screenshots módulos UI | Evidencia pendiente de incorporar |
| Videos Cypress | Evidencia pendiente de incorporar |

---

## Evidencias en Paso 12 (copias muestra)

| Archivo | Origen |
|---------|--------|
| railway_health_response.json | Paso 01 |
| vercel_status.json | Paso 01 |
| cypress_last-run.json | Paso 01 |
| jmeter_resumen.json | Paso 01 |
| CORRECCIONES_SONARQUBE.md | Paso 01 |
| Matriz_Hallazgos_Consolidada.md | Paso 11 |
| schema.sql | Paso 08 |

---

**Total evidencias inventariadas:** 120+ artefactos únicos en Pasos 01–11
