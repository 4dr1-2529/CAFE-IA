# Checklist FURPS+ — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Leyenda:** ☐ Pendiente auditoría · ✅ Planificado · ⚠ Evidencia parcial · ❌ Evidencia ausente

---

## F — Functionality (10 criterios)

| ID | Criterio | Plan | Evidencia | Auditoría (Paso 02) |
|----|----------|------|-----------|---------------------|
| F-01 | Funciones implementadas (59 / 12 HU) | ✅ | Inventario IR | ☐ |
| F-02 | Casos de uso Cypress PF-01–11 | ✅ | cypress_last-run.json | ☐ |
| F-03 | Auth JWT 401 sin token | ✅ | npm_test_backend.txt | ☐ |
| F-04 | Roles admin/cliente | ✅ | PF-11, rbac.js | ☐ |
| F-05 | Integridad transaccional lotes | ✅ | HAL-003 | ☐ |
| F-06 | 13 APIs REST | ✅ | routes/ | ☐ |
| F-07 | Validación entrada | ✅ | validators + tests | ☐ |
| F-08 | Reportes PDF/Excel | ✅ | PF-09 | ☐ |
| F-09 | Chatbot | ✅ | PF-10 | ☐ |
| F-10 | Auditoría admin | ✅ | auditoria.routes | ☐ |

---

## U — Usability (7 criterios)

| ID | Criterio | Plan | Evidencia | Auditoría |
|----|----------|------|-----------|-----------|
| U-01 | Facilidad de uso | ✅ | Cypress | ☐ |
| U-02 | Interfaz coherente (design system) | ✅ | components/ui | ☐ |
| U-03 | Navegación PMV1/PMV2/Sistema | ✅ | AppRoutes | ☐ |
| U-04 | Accesibilidad | ✅ | ⚠ axe pendiente | ☐ |
| U-05 | Diseño responsive | ✅ | Tailwind | ☐ |
| U-06 | UX por rol (dashboards) | ✅ | PF-03, PF-04 | ☐ |
| U-07 | Mensajes de error | ✅ | apiResponse | ☐ |

---

## R — Reliability (7 criterios)

| ID | Criterio | Plan | Evidencia | Auditoría |
|----|----------|------|-----------|-----------|
| R-01 | Disponibilidad prod 100 % health | ✅ | railway, vercel, JMeter | ☐ |
| R-02 | Recuperación post-deploy | ✅ | HAL-001 corregido | ☐ |
| R-03 | Robustez API (404, handlers) | ✅ | npm_test_backend | ☐ |
| R-04 | Tolerancia a errores | ✅ | integration tests | ☐ |
| R-05 | Consistencia datos | ✅ | ⚠ HAL-003 | ☐ |
| R-06 | Pool MySQL | ✅ | env.example | ☐ |
| R-07 | Refresh token / logout | ✅ | auth.routes | ☐ |

---

## P — Performance (7 criterios)

| ID | Criterio | Plan | Evidencia | Auditoría |
|----|----------|------|-----------|-----------|
| P-01 | Tiempo respuesta (P95 ≈ 2614 ms) | ✅ | jmeter_resumen.json | ☐ |
| P-02 | Throughput RPM | ✅ | jmeter_resumen.json | ☐ |
| P-03 | Build frontend | ✅ | npm_build_frontend.txt | ☐ |
| P-04 | Bundle Recharts | ✅ | build log | ☐ |
| P-05 | Consultas SQL | ✅ | código repos | ☐ |
| P-06 | Rate limiting | ✅ | app.js | ☐ |
| P-07 | JMeter escenarios negocio | ✅ | ❌ pendiente | ☐ |

---

## S — Supportability (8 criterios)

| ID | Criterio | Plan | Evidencia | Auditoría |
|----|----------|------|-----------|-----------|
| S-01 | Mantenibilidad hexagonal | ✅ | IR Pasos 05–07 | ☐ |
| S-02 | Modularidad 13 módulos | ✅ | IR Paso 05 | ☐ |
| S-03 | Escalabilidad Railway | ✅ | IR Paso 09 | ☐ |
| S-04 | Documentación README/HU | ✅ | README | ☐ |
| S-05 | Tests 18 BE + 11 Cypress | ✅ | logs test | ☐ |
| S-06 | CI GitHub Actions | ✅ | ci.yml | ☐ |
| S-07 | SonarCloud + ESLint | ✅ | ⚠ captura pendiente | ☐ |
| S-08 | Cobertura código | ✅ | ❌ 0 % Sonar | ☐ |

---

## + — Extendidos (9 criterios)

| ID | Criterio | Plan | Evidencia | Auditoría |
|----|----------|------|-----------|-----------|
| X-01 | Seguridad JWT/helmet/CORS | ✅ | app.js, tests | ☐ |
| X-02 | Portabilidad Node 20 | ✅ | package.json | ☐ |
| X-03 | Compatibilidad navegador | ✅ | Cypress | ☐ |
| X-04 | Configuración 38 vars | ✅ | env.example | ☐ |
| X-05 | Instalación npm | ✅ | README | ☐ |
| X-06 | Despliegue Railway/Vercel | ✅ | health JSON | ☐ |
| X-07 | Monitoreo / health | ✅ | ⚠ sin APM | ☐ |
| — | Capturas cloud | — | ❌ pendiente | ☐ |
| — | Videos Cypress | — | ❌ pendiente | ☐ |

---

## Resumen checklist planificación

| Categoría | Criterios | Planificado |
|-----------|-----------|-------------|
| F | 10 | 10/10 |
| U | 7 | 7/7 |
| R | 7 | 7/7 |
| P | 7 | 7/7 |
| S | 8 | 8/8 |
| + | 7 (+2 evidencias) | 7/7 |
| **Total** | **48** | **100 % planificado** |

**Auditoría Paso 02:** 0/48 ejecutados (pendiente).

---

*Checklist base para auditor FURPS+.*
