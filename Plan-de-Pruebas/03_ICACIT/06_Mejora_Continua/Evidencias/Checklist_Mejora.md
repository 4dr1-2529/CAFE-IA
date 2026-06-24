# Checklist de Mejora — ICACIT Paso 6 — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Uso:** Verificación post-remediación por hallazgo

---

## Sprint P1 — Crítico y Alto

| # | ID | Verificación | Criterio de cierre | ☐ |
|---|-----|-------------|-------------------|---|
| 1 | CON-001 | Transacción SQL en `LoteService.create` | Rollback verificado en fallo simulado | ☐ |
| 2 | CON-002 | `/api/health` sanitizado | Respuesta sin `dbHost` ni metadatos infra | ☐ |
| 3 | CON-003 | CORS restringido | Solo dominios en `CORS_ORIGINS` | ☐ |
| 4 | CON-004 | RBAC enforcement | Permisos validados en endpoints protegidos | ☐ |
| 5 | CON-005 | CVE form-data remediado | `npm audit`: 0 HIGH backend | ☐ |
| 6 | CON-006 | Cypress en CI | Job verde en GitHub Actions | ☐ |
| 7 | CON-007 | Política backup Railway | Documento DR con frecuencia y restore | ☐ |

---

## Sprint P2 — Seguridad y rendimiento

| # | ID | Verificación | Criterio de cierre | ☐ |
|---|-----|-------------|-------------------|---|
| 8 | CON-008 | CVE frontend remediados | `npm audit`: 0 HIGH frontend | ☐ |
| 9 | CON-009 | JWT en cookies httpOnly | Token no en localStorage | ☐ |
| 10 | CON-010 | Rol forzado en registro | Solo rol `cliente` asignable | ☐ |
| 11 | CON-011 | Endpoint refresh activo | POST `/auth/refresh` operativo | ☐ |
| 12 | CON-012 | Audit bloqueante en CI | Pipeline falla con CVE HIGH | ☐ |
| 13 | CON-013 | Política contraseñas | Mínimo 12 chars + complejidad | ☐ |
| 14 | CON-014 | JMeter APIs autenticadas | Escenarios login + lotes documentados | ☐ |

---

## Sprint P3 — Deuda técnica

| # | ID | Verificación | Criterio de cierre | ☐ |
|---|-----|-------------|-------------------|---|
| 15 | CON-015 | Lazy load Recharts | Chunk < 411 KB o cargado bajo demanda | ☐ |
| 16 | CON-016 | CRUD lotes completo | PUT y DELETE (soft) operativos | ☐ |
| 17 | CON-017 | ML documentado/integrado | README o endpoint predicción | ☐ |
| 18 | CON-018 | axe-core en CI | Reporte a11y sin violaciones críticas | ☐ |
| 19 | CON-019 | Cobertura Sonar > 0 % | lcov exportado a SonarCloud | ☐ |
| 20 | CON-020 | Integración CI activa | `SKIP_INTEGRATION` desactivado; MySQL service | ☐ |

---

## Sprint P4 — Sustentación

| # | ID | Verificación | Criterio de cierre | ☐ |
|---|-----|-------------|-------------------|---|
| 21 | CON-021 | Recovery contraseña | Flujo forgot-password E2E | ☐ |
| 22 | CON-022 | Alertas Railway | Configuración alertas documentada | ☐ |
| 23 | CON-023 | CRUD fincas | API + UI operativos | ☐ |
| 24 | CON-024 | Evidencias actualizadas | Cypress + Sonar re-ejecutados jun 2026+ | ☐ |

---

## Checklist métricas (MM)

| # | ID | Verificación | Criterio | ☐ |
|---|-----|-------------|----------|---|
| 25 | MM-01 | Performance ≥ 75 % | JMeter APIs documentado | ☐ |
| 26 | MM-02 | OWASP ≥ 85 % | Re-evaluación FURPS/05 | ☐ |
| 27 | MM-03 | Integración ≥ 80 % | CI completo documentado | ☐ |
| 28 | MM-05 | CE-03 ≥ 80 % | Evidencias Sonar + CI | ☐ |
| 29 | MM-09 | Capturas UI | E-01–E-24 incorporadas | ☐ |
| 30 | MM-10 | ICACIT ≥ 85 % | Resultado auditoría final | ☐ |

---

## Resumen de avance

| Sprint | Total ítems | Completados | % |
|--------|-------------|-------------|---|
| P1 | 7 | 0 | 0 % |
| P2 | 7 | 0 | 0 % |
| P3 | 6 | 0 | 0 % |
| P4 | 4 | 0 | 0 % |
| MM | 6 | 0 | 0 % |
| **Total** | **30** | **0** | **0 %** |

---

*Checklist de Mejora — ICACIT Paso 6 — CAFE-IA.*
