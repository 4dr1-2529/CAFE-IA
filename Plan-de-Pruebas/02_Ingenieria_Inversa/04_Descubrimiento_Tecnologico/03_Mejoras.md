# 03 — Plan de Mejoras Tecnológicas

**Proyecto:** CAFE-IA  
**Fecha:** 2026-06-24  
**Origen:** Descubrimiento Tecnológico — Paso 4 Ingeniería Inversa

---

## Mejoras identificadas

| ID | Tecnología | Problema | Riesgo | Impacto | Prioridad | Recomendación | Responsable | Esfuerzo |
|----|------------|----------|--------|---------|-----------|---------------|-------------|----------|
| **TEC-M01** | react-router-dom | CVE open redirect moderate | Medio | Phishing vía redirect | **Alta** | Actualizar a versión parcheada; `npm audit fix` frontend | Frontend Dev | 1–2 h |
| **TEC-M02** | Vite / esbuild | CVE dev server request leak | Medio | Solo desarrollo | **Media** | Upgrade Vite; no exponer `vite --host` público | Frontend Dev | 4–8 h |
| **TEC-M03** | Cypress | No ejecuta en GitHub Actions CI | Alto | Regresiones UI en merge | **Alta** | Job CI con backend+frontend+MySQL o mocks | DevOps + QA | 8–16 h |
| **TEC-M04** | node:test integración | SKIP_INTEGRATION=1 en CI | Medio | Regresiones API | **Alta** | Service container MySQL en workflow | DevOps | 4–8 h |
| **TEC-M05** | npm audit CI | `continue-on-error: true` | Medio | CVE en producción | **Media** | Fallar CI en audit high o usar Dependabot | DevOps | 1 h |
| **TEC-M06** | JMeter | Solo prueba `/api/health` | Medio | Falsa confianza rendimiento | **Media** | Escenarios login + lotes + dashboard JWT | QA + Perf | 4–8 h |
| **TEC-M07** | SonarCloud | Sin captura Quality Gate en evidencias | Bajo | Informe incompleto | **Media** | Exportar dashboard post-CI a Evidencias | QA | 1 h |
| **TEC-M08** | lcov cobertura | SonarCloud cobertura 0 % | Medio | Deuda testing invisible | **Media** | Instrumentar con c8; `sonar.javascript.lcov.reportPaths` | Backend Dev | 4 h |
| **TEC-M09** | Recharts bundle | Chunk ~411 KB en build | Bajo | LCP lento | **Baja** | Dynamic import en DashboardPage | Frontend Dev | 2–4 h |
| **TEC-M10** | ESLint frontend | 2 errores bloquean lint | Bajo | Calidad estática | **Media** | Corregir ErrorBoundary env; plugin react-hooks | Frontend Dev | 2 h |
| **TEC-M11** | Docker | Sin Dockerfile ni compose | Medio | Reproducibilidad entornos | **Media** | Dockerfile multi-stage backend+frontend dev | DevOps | 8 h |
| **TEC-M12** | ML Python | train_model.py no integrado en API | Bajo | Expectativa vs realidad IA | **Baja** | Documentar motor heurístico; o microservicio ML | ML + Backend | 40+ h |
| **TEC-M13** | JWT_SECRET Railway | Rotación manual secreto | Medio | Compromiso tokens | **Media** | Política rotación; validar ≥32 chars en deploy | DevOps | 1 h |
| **TEC-M14** | health endpoint | Expone dbHost en respuesta | Bajo | Reconocimiento infra | **Baja** | Reducir campos públicos `/api/health` | Backend Dev | 1 h |
| **TEC-M15** | Cypress evidencias | last-run.json mayo 2026 | Bajo | Evidencia desactualizada | **Media** | Re-ejecutar `npm run test:e2e` | QA | 1 h |
| **TEC-M16** | lucide-react | Versión 0.294.0 antigua | Bajo | Iconos desactualizados | **Baja** | Actualizar en próximo sprint frontend | Frontend Dev | 1 h |

---

## Recomendaciones de actualización tecnológica

| Área | Acción sugerida | Plazo |
|------|-----------------|-------|
| **Seguridad npm** | Parchear react-router, form-data (backend transitivo), evaluar Vite 6 | Corto plazo |
| **CI/CD** | Integrar Cypress + tests integración MySQL | 2–4 semanas |
| **Observabilidad** | Agregar health check sin datos sensibles; logs estructurados JSON | Medio plazo |
| **Contenedorización** | Dockerfile para dev local reproducible | Backlog |
| **ML** | Mantener PredictionEngine.js documentado; ML Python como pipeline offline | Documentación |
| **Node.js** | Mantener Node 20 LTS; planificar migración Node 22 cuando Railway lo soporte | 2026 H2 |

---

## Tecnologías solicitadas no adoptadas — decisión documentada

| Tecnología | Recomendación |
|------------|---------------|
| Axios | **No adoptar** — fetch nativo suficiente y sin dependencia extra |
| SweetAlert2 | **No adoptar** — ToastContext cubre UX |
| React Icons | **No adoptar** — lucide-react ya integrado |
| multer | **Adoptar solo si** se implementa upload de archivos (evidencias, certificados) |
| node-cron | **Adoptar solo si** se requieren jobs (limpieza sesiones, reportes programados) |

---

## Roadmap sugerido

| Fase | Mejoras | Plazo |
|------|---------|-------|
| **Inmediato** | TEC-M01, TEC-M15, TEC-M07 | 1 semana |
| **Corto plazo** | TEC-M03, TEC-M04, TEC-M05, TEC-M10 | 2–3 semanas |
| **Medio plazo** | TEC-M06, TEC-M08, TEC-M11 | 1 mes |
| **Backlog** | TEC-M09, TEC-M12, TEC-M16 | Según prioridad |

---

*Documento para anexar al informe ICACIT. No implica modificación del código CAFE-IA en esta fase.*
