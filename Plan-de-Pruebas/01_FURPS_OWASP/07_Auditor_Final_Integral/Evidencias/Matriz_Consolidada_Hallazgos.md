# Matriz Consolidada de Hallazgos — CAFE-IA

**Actividad:** Paso 7 — Auditor Final Integral  
**Fecha:** 24 de junio de 2026  
**Origen:** FUR-001–018 + IMP-H001–017 + OW-001–015 (deduplicados)  
**Total único:** 24 hallazgos (CON-001 a CON-024)

---

| ID | Severidad | Área | Descripción | Evidencia | Riesgo | Recomendación | Referencias |
|----|-----------|------|-------------|-----------|--------|---------------|-------------|
| CON-001 | **Crítico** | FUR / R / A08 | `LoteService.create` sin transacción SQL multi-tabla | `LoteService.js` L108-122 | Alto — integridad | BEGIN/COMMIT MySQL | FUR-001, IMP-H001, OW-011 |
| CON-002 | Alto | Seguridad / A05 | `/api/health` expone `dbHost`, `database`, `pid` | `app.js`; `railway_health_response.json` | Reconocimiento infra | Sanitizar health | FUR-014, IMP-H013, OW-001 |
| CON-003 | Alto | Seguridad / A05 | CORS autoriza cualquier `*.vercel.app` | `app.js` L31-39 | Cross-origin abuse | Lista blanca `CORS_ORIGINS` | OW-002 |
| CON-004 | Alto | Seguridad / A01 / A04 | Tablas `permisos`/`rol_permisos` sin enforcement API | `schema.sql` L62-76 | RBAC incoherente | Middleware o eliminar tablas | OW-003 |
| CON-005 | Alto | Seguridad / A06 | CVE HIGH `form-data` 4.0.0–4.0.5 backend | `npm_audit_backend.txt` | CRLF injection | `npm audit fix` | FUR-005, IMP-H004, OW-004 |
| CON-006 | Alto | QA / DevOps | Cypress 11 specs no en GitHub Actions | `ci.yml` (sin job E2E) | Regresiones UI | Job Cypress CI | FUR-003, IMP-H002 |
| CON-007 | Alto | Ops / R | Backups MySQL Railway no documentados | IR Paso 09 | Pérdida datos | Política backup | FUR-015, IMP-H006 |
| CON-008 | Medio | Seguridad / A06 / A03 | 6 CVE frontend (react-router, esbuild, js-yaml) | `npm_audit_frontend.txt` | Open redirect; dev exposure | Actualizar dependencias | FUR-004, IMP-H003, OW-005 |
| CON-009 | Medio | Seguridad / A02 / A07 | JWT y refresh en `localStorage` | `client.js` L25-33 | Robo sesión XSS | Cookies httpOnly | OW-006 |
| CON-010 | Medio | Seguridad / A07 / A01 | `AuthService.register` acepta `rol` del body | `AuthService.js` L80-88 | Escalación admin | Forzar rol `cliente` | OW-007 |
| CON-011 | Medio | Seguridad / A07 | Sin `POST /auth/refresh` pese a generar refresh | `auth.routes.js` | Sesión incompleta | Implementar refresh | OW-008 |
| CON-012 | Medio | DevOps / A08 | `npm audit` CI con `continue-on-error: true` | `ci.yml` L67-71 | CVE en producción | Fallar en HIGH | OW-009 |
| CON-013 | Medio | Seguridad / A07 | Contraseña mínima 6 caracteres | `AuthService.js` L85-86 | Credenciales débiles | Min 12 + complejidad | OW-010 |
| CON-014 | Medio | Performance | JMeter solo GET `/api/health` (500 req) | `jmeter_resumen.json` | Falsa confianza perf. | Escenarios JWT negocio | FUR-002, IMP-H015 |
| CON-015 | Medio | Performance | Chunk Recharts 411 KB sin lazy load | `npm_build_frontend.txt` | LCP dashboard | Dynamic import | FUR-009, IMP-H008 |
| CON-016 | Medio | Functionality | Lotes sin PUT/DELETE | `lotes.routes.js` | Errores irreversibles | Soft-delete | FUR-010, IMP-H009 |
| CON-017 | Medio | Functionality | `PredictionEngine` heurístico; `ml/` no integrado | Código + README | Expectativa IA | Integrar o documentar | FUR-011, IMP-H010 |
| CON-018 | Medio | Usability | Sin prueba accesibilidad automatizada (axe) | — | WCAG no verificado | axe-core CI | FUR-012, IMP-H011 |
| CON-019 | Medio | Supportability | Cobertura SonarCloud 0 %; sin lcov | — | Deuda invisible | c8 + Sonar | FUR-006, IMP-H005 |
| CON-020 | Medio | DevOps / A08 | `SKIP_INTEGRATION=1` en CI backend | `ci.yml` L25 | Regresiones API | MySQL service CI | FUR-007, IMP-H007, OW-015 |
| CON-021 | Bajo | Seguridad / A07 | Sin recuperación de contraseña | `auth.routes.js` | Usuarios bloqueados | Flujo reset email | OW-012 |
| CON-022 | Bajo | Seguridad / A09 | Sin APM/SIEM centralizado | — | Detección tardía | Alertas Railway | OW-013 |
| CON-023 | Bajo | Functionality | Tabla `fincas` sin API ni UI | `schema.sql` | Trazabilidad geo | CRUD fincas | FUR-018, IMP-H014 |
| CON-024 | Bajo | QA | Cypress mayo 2026; Sonar sin export | `cypress_last-run.json` | Evidencia ICACIT | Re-ejecutar/exportar | FUR-016, FUR-017, IMP-H016/017 |

---

## Distribución

| Severidad | Cantidad | % |
|-----------|----------|---|
| Crítico | 1 | 4 % |
| Alto | 6 | 25 % |
| Medio | 14 | 58 % |
| Bajo | 3 | 13 % |

**Estado remediación:** 0/24 implementados

---

*Excel: `Matriz_Consolidada_Hallazgos.xlsx`*
