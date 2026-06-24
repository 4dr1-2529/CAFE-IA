# 03 — Mejoras propuestas (Análisis de Logs)

**Proyecto:** CAFE-IA  
**Fecha:** 2026-06-24  
**Origen:** Hallazgos LOG-01 a LOG-25

---

| ID | Problema | Descripción | Impacto | Prioridad | Solución propuesta | Esfuerzo | Responsable |
|----|----------|-------------|---------|-----------|-------------------|----------|-------------|
| **M-01** | Crash Railway migrate.js | SyntaxError en seeds SQL impedía arranque API | API caída, 0 % uptime | **Crítico** *(aplicada)* | Separar cada `INSERT` en `await execute()` independiente; restaurar `ensureDemoData/Lotes` | 2–4 h | Backend Dev |
| **M-02** | ADMIN_SEED_PASSWORD ausente | Warning en logs; admin no se crea en prod | Sin acceso admin inicial | **Alto** | Definir variable en panel Railway con password seguro | 30 min | DevOps |
| **M-03** | Cypress fuera de CI | E2E solo manual; riesgo regresión UI | Bugs UI en producción | **Alto** | Job CI con MySQL + backend + frontend dockerizados; `npm run test:e2e` | 8–16 h | DevOps + QA |
| **M-04** | SKIP_INTEGRATION en CI | Suite integración omitida en GitHub Actions | Regresiones API no detectadas | **Medio** | Service container MySQL en workflow o mocks | 4–8 h | DevOps |
| **M-05** | CVE form-data (backend) | Vulnerabilidad HIGH en dependencia transitiva | Supply chain | **Medio** | `npm audit fix` en backend; verificar supertest | 1–2 h | Backend Dev |
| **M-06** | CVE react-router (frontend) | Open redirect moderate | Phishing vía redirect | **Medio** | Actualizar `react-router-dom` a versión parcheada | 1–2 h | Frontend Dev |
| **M-07** | CVE esbuild/vite (frontend) | Dev server request leak | Solo desarrollo | **Medio** | Evaluar upgrade Vite; no exponer dev server público | 4–8 h | Frontend Dev |
| **M-08** | ESLint 2 errores | Lint falla; calidad estática bloqueada | Deuda técnica oculta | **Medio** | Agregar `env: { node: true }` en ErrorBoundary; instalar/configurar react-hooks plugin | 2 h | Frontend Dev |
| **M-09** | SonarCloud sin captura | Métricas live no en evidencias | Informe incompleto docente | **Medio** | Capturar Quality Gate y exportar issues post-CI | 1 h | QA |
| **M-10** | Sin lcov SonarCloud | Cobertura 0 % en dashboard | Visibilidad testing limitada | **Medio** | Instrumentar tests con `c8`; configurar `sonar.javascript.lcov.reportPaths` | 4 h | Backend Dev |
| **M-11** | npm audit continue-on-error | CI no falla con CVE high | Vulnerabilidades en merge | **Medio** | Quitar `continue-on-error` o elevar umbral | 30 min | DevOps |
| **M-12** | JMeter solo health | No valida rendimiento negocio | Falsa confianza perf | **Medio** | Escenarios JMeter: login + lotes + dashboard con JWT | 4–8 h | QA + Perf |
| **M-13** | JMeter P95 marginal | 2614 ms cerca límite 2 s | UX lenta en picos | **Medio** | Warm-up requests; revisar plan Railway; cache | 4 h | DevOps |
| **M-14** | Seeds silenciosos | logSeedWarning no detiene arranque | BD inconsistente | **Medio** | Fail-fast en seeds críticos; log estructurado | 2–4 h | Backend Dev |
| **M-15** | Health expone dbHost | Info infra en respuesta pública | Reconocimiento | **Bajo** | Reducir campos en `/api/health` público | 1 h | Backend Dev |
| **M-16** | npm warn omit=dev | Warning en logs Railway | Ruido operacional | **Bajo** | `npm ci --omit=dev` en build Railway | 30 min | DevOps |
| **M-17** | ESLint 187 warnings | no-unused-vars en JSX | Ruido en lint | **Bajo** | Configurar `react/jsx-uses-vars` | 2 h | Frontend Dev |
| **M-18** | Bundle charts 411 KB | Recharts pesado | LCP frontend | **Bajo** | Dynamic import charts en dashboard | 2–4 h | Frontend Dev |
| **M-19** | Evidencias visuales pendientes | Sin capturas Railway/Sonar/Cypress | Informe incompleto | **Medio** | Completar según `INDICE_EVIDENCIAS.md` | 2–4 h | QA |
| **M-20** | Re-ejecutar Cypress | last-run.json de mayo 2026 | Evidencia desactualizada | **Medio** | `npm run test:e2e` y actualizar JSON en Evidencias | 1 h | QA |

---

## Mejoras ya aplicadas (confirmadas en logs)

| ID | Mejora | Commit / evidencia |
|----|--------|-------------------|
| M-01 | Corrección migrate.js SyntaxError | `2f7ac27` — Railway health 200 |
| — | 16 correcciones SonarCloud | `CORRECCIONES_SONARQUBE.md` |
| — | Variables MYSQL* unificadas | `database.js`, health Railway OK |
| — | JWT_SECRET obligatorio ≥32 | `env.js` — sin error arranque |

---

## Roadmap sugerido

| Fase | Mejoras | Plazo |
|------|---------|-------|
| **Inmediato** | M-02, M-19, M-20 | 1 semana |
| **Corto plazo** | M-05, M-06, M-08, M-11 | 2 semanas |
| **Medio plazo** | M-03, M-04, M-10, M-12 | 1 mes |
| **Largo plazo** | M-13, M-14, M-17, M-18 | Backlog |

---

*Documento generado para anexar al informe final. No implica modificación del código en esta fase.*
