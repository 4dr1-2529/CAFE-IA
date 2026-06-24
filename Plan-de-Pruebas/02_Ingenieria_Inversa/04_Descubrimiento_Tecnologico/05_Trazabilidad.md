# 05 — Trazabilidad — Descubrimiento Tecnológico

**Proyecto:** CAFE-IA  
**Actividad:** Ingeniería Inversa — Paso 4  
**Fecha del análisis:** 2026-06-24

---

## Objetivo

Inventariar, analizar y documentar el **stack tecnológico completo** del proyecto CAFE-IA — frontend, backend, base de datos, infraestructura cloud, herramientas de calidad y machine learning — identificando versiones, ubicaciones, riesgos y estado de implementación real, como evidencia para evaluación ICACIT.

---

## Archivos revisados

### Código fuente (solo lectura)

| Ruta | Propósito |
|------|-----------|
| `cafe-cursor/backend/package.json` | Dependencias backend |
| `cafe-cursor/frontend/package.json` | Dependencias frontend |
| `cafe-cursor/package.json` | Monorepo, Cypress, scripts |
| `cafe-cursor/backend/src/app.js` | Middleware Express (helmet, cors, rate-limit) |
| `cafe-cursor/backend/server.js` | Arranque Railway + migrate |
| `cafe-cursor/frontend/src/services/api/client.js` | Cliente fetch (no axios) |
| `cafe-cursor/frontend/vite.config.js` | Config Vite |
| `cafe-cursor/frontend/tailwind.config.js` | Config Tailwind |
| `cafe-cursor/backend/sql/schema.sql` | 39 tablas MySQL |
| `cafe-cursor/backend/src/domain/PredictionEngine.js` | Motor IA producción |
| `cafe-cursor/ml/train_model.py` | ML Python offline |
| `cafe-cursor/ml/requirements.txt` | Deps Python ML |

### Configuraciones de despliegue

| Archivo | Propósito |
|---------|-----------|
| `frontend/vercel.json` | Deploy Vercel + VITE_API_URL |
| `render.yaml` | Blueprint Render alternativo |
| `backend/.env.example` | Variables entorno |
| `.github/workflows/ci.yml` | Pipeline CI/CD |
| `sonar-project.properties` | SonarCloud |

### Reportes calidad existentes

| Archivo | Propósito |
|---------|-----------|
| `Reporte-Calidad-Software/Reportes/jmeter_resumen.json` | Carga JMeter |
| `Reporte-Calidad-Software/Evidencias/cypress/last-run.json` | E2E Cypress |
| `Reporte-Calidad-Software/Evidencias/sonarqube/hallazgos_sonar.md` | Sonar |

---

## package.json inspeccionados

| Archivo | Versión proyecto | Deps directas |
|---------|------------------|---------------|
| `cafe-cursor/package.json` | 2.0.0 | cross-env, cypress |
| `cafe-cursor/backend/package.json` | 2.0.0 | 10 prod + 2 dev |
| `cafe-cursor/frontend/package.json` | 1.0.3 | 7 prod + 11 dev |

Copias en `Evidencias/` con prefijos `monorepo_`, `backend_`, `frontend_`.

---

## package-lock.json inspeccionados

| Archivo | Uso |
|---------|-----|
| `cafe-cursor/package-lock.json` | Versiones Cypress, cross-env |
| `cafe-cursor/backend/package-lock.json` | express 4.22.2, mysql2 3.22.3, etc. |
| `cafe-cursor/frontend/package-lock.json` | react 18.3.1, vite 5.4.21, etc. |

Versiones resueltas cruzadas con Paso 2 Dependencias (`npm_list_*.json`).

---

## Configuraciones analizadas

| Configuración | Hallazgo |
|---------------|----------|
| Vercel | Framework vite, rewrite SPA, API Railway en env |
| Railway | Variables MYSQL*, JWT_SECRET, CORS_ORIGINS |
| GitHub Actions | Node 20, 4 jobs, SonarCloud qualitygate.wait |
| SonarCloud | Fuentes FE+BE, excluye ml/ y sql |
| Cypress | 11 specs PF-*, baseUrl 5174 |
| JMeter | 500 req health Railway |
| render.yaml | Referencia; Railway es despliegue activo |

---

## Herramientas utilizadas

| Herramienta | Uso en este análisis |
|-------------|---------------------|
| Lectura archivos proyecto | package.json, lockfiles, configs, código |
| Grep código fuente | Verificar ausencia axios, multer, node-cron |
| PowerShell Copy-Item | Copia evidencias sin modificar origen |
| ExcelJS (backend node_modules) | Generación `.xlsx` |
| Referencia Paso 2 | Versiones npm y CVE |
| Referencia Paso 3 | Módulos que consumen tecnologías |

---

## Evidencias recopiladas

Ver `Evidencias/INDICE_EVIDENCIAS.md`. Resumen:

- 6 archivos package.json / lock (copias)
- vercel.json, render.yaml, ci.yml, sonar-project.properties
- schema.sql, ml_requirements.txt, backend_env.example.txt
- README, DOCUMENTACION_TECNICA, arquitectura, DER mermaid
- jmeter_resumen.json, cypress_last-run.json, hallazgos_sonar.md
- 8 documentos generados (inventario, matriz, stack, arquitectura, resumen)

**Pendientes:** Dockerfile (no existe), capturas Railway/Vercel/Sonar en vivo.

---

## Tecnologías identificadas

| Métrica | Valor |
|---------|-------|
| Ítems inventario | 54 |
| Matriz TEC | 45 |
| Implementadas | 37 |
| No implementadas (checklist) | 5 |
| Categorías | 8 (FE, BE, BD, Infra, DevOps, Calidad, ML, Seguridad) |

---

## Documentos generados

| Documento | Ruta |
|-----------|------|
| Prompt original | `01_Prompt.md` |
| Análisis tecnológico completo | `02_Resultado_IA.md` |
| Plan de mejoras | `03_Mejoras.md` |
| Conclusiones | `04_Conclusiones.md` |
| Trazabilidad | `05_Trazabilidad.md` |
| Inventario tecnológico | `Evidencias/Inventario_Tecnologico.md` / `.xlsx` |
| Matriz tecnologías | `Evidencias/Matriz_Tecnologias.md` / `.xlsx` |
| Stack tecnológico | `Evidencias/Stack_Tecnologico.md` |
| Arquitectura tecnológica | `Evidencias/Arquitectura_Tecnologica.md` |
| Resumen ejecutivo | `Evidencias/Resumen_Ejecutivo.md` |
| Índice evidencias | `Evidencias/INDICE_EVIDENCIAS.md` |

---

## Relación con pasos anteriores

| Paso | Aporte |
|------|--------|
| Paso 1 Logs | Tests 18/18, health Railway, CVE npm, migrate.js |
| Paso 2 Dependencias | 34 deps, versiones lockfile, fichas por paquete |
| Paso 3 Funcional | Consumo tecnológico por módulo (Recharts, JWT, etc.) |

---

## Restricciones cumplidas

- No se modificó ningún archivo del proyecto CAFE-IA.
- No se inventaron tecnologías; las ausentes se indican explícitamente.
- Documentación en formato profesional listo para informe ICACIT.

---

**Fecha de cierre del análisis:** 2026-06-24
