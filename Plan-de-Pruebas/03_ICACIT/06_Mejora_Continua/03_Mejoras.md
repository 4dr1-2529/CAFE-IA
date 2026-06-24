# Plan Detallado de Mejoras — ICACIT Paso 6 — CAFE-IA

**Actividad:** Paso 6 — Mejora Continua  
**Fecha:** 24 de junio de 2026  
**Origen:** CON-001–CON-024 (FURPS/08), MM-01–MM-10 (ICACIT/05)  
**Estado remediación:** 0 %

---

| ID | Problema | Acción | Prioridad | Beneficio | Responsable | Tiempo estimado | Estado |
|----|----------|--------|-----------|-----------|-------------|-----------------|--------|
| CON-001 | `LoteService.create` sin transacción SQL | Implementar BEGIN/COMMIT/ROLLBACK multi-tabla (lote, trazabilidad, inventario) | **P1** | Integridad datos lotes; elimina riesgo crítico | Backend Dev | 2–3 días | Pendiente |
| CON-002 | Health expone `dbHost` y metadatos | Sanitizar respuesta `/api/health`; omitir datos de infraestructura | **P1** | Reduce reconocimiento de infraestructura (A05) | Backend Dev | 0.5 día | Pendiente |
| CON-003 | CORS `*.vercel.app` amplio | Configurar lista blanca `CORS_ORIGINS` con dominios explícitos | **P1** | Control cross-origin en producción (A05) | DevOps | 0.5 día | Pendiente |
| CON-004 | Permisos BD sin enforcement en runtime | Implementar middleware RBAC o eliminar tablas permisos no usadas | **P1** | RBAC coherente con modelo de datos (A01) | Backend Dev | 2 días | Pendiente |
| CON-005 | CVE HIGH form-data (backend) | Ejecutar `npm audit fix` y verificar ausencia de HIGH | **P1** | Elimina CVE documentado (A06) | Backend Dev | 0.5 día | Pendiente |
| CON-006 | Cypress E2E fuera de pipeline CI | Agregar job Cypress en GitHub Actions post-build | **P1** | Detección regresiones UI en merge | QA / DevOps | 1–2 días | Pendiente |
| CON-007 | Backups MySQL no documentados (Railway) | Documentar y validar política de backup/restore Railway | **P1** | Continuidad de negocio (R — Reliability) | DevOps | 1 día | Pendiente |
| CON-008 | CVE frontend (6 dependencias) | Actualizar react-router y dependencias vulnerables | **P2** | Superficie de ataque SPA reducida (A06) | Frontend Dev | 1 día | Pendiente |
| CON-009 | JWT almacenado en localStorage | Migrar a cookies httpOnly + SameSite | **P2** | Mitiga robo de sesión por XSS (A02) | Full-stack | 3–5 días | Pendiente |
| CON-010 | Rol seleccionable en registro público | Forzar rol `cliente` en endpoint de registro | **P2** | Previene escalación de privilegios (A07) | Backend Dev | 0.5 día | Pendiente |
| CON-011 | Sin endpoint POST `/auth/refresh` | Implementar refresh token y revocación de sesión | **P2** | Ciclo de sesión completo (A07) | Backend Dev | 2 días | Pendiente |
| CON-012 | CI audit con `continue-on-error` | Quitar tolerancia; bloquear merge con CVE HIGH | **P2** | Gate de seguridad en pipeline (A08) | DevOps | 0.5 día | Pendiente |
| CON-013 | Contraseña mínima 6 caracteres | Política ≥12 caracteres con complejidad | **P2** | Autenticación robusta (A07) | Backend Dev | 0.5 día | Pendiente |
| CON-014 | JMeter solo escenario health | Diseñar y ejecutar escenarios API con JWT (login, lotes) | **P2** | Baseline rendimiento real; Performance ≥ 75 % | QA | 2 días | Pendiente |
| CON-015 | Chunk Recharts 411 KB | Lazy load de componentes de gráficos en dashboard | **P3** | Mejor LCP y tiempo de carga | Frontend Dev | 1 día | Pendiente |
| CON-016 | Lotes sin PUT/DELETE en API | Implementar actualización y soft-delete de lotes | **P3** | Corrección operativa en campo | Backend Dev | 2 días | Pendiente |
| CON-017 | Módulo ML desacoplado del runtime Express | Integrar predicción o documentar explícitamente alcance heurístico | **P3** | Expectativas de IA alineadas con PMV | ML / Backend | 5+ días | Pendiente |
| CON-018 | Sin pruebas axe de accesibilidad | Incorporar axe-core en CI o suite Cypress | **P3** | WCAG verificable | QA / Frontend | 1 día | Pendiente |
| CON-019 | Cobertura SonarQube 0 % | Configurar c8 + export lcov a SonarCloud | **P3** | Deuda de tests visible; calidad código ≥ 80 % | QA | 2 días | Pendiente |
| CON-020 | `SKIP_INTEGRATION` activo en CI | Agregar servicio MySQL en GitHub Actions | **P3** | Tests de integración auth en pipeline | DevOps | 2 días | Pendiente |
| CON-021 | Sin flujo recovery de contraseña | Implementar forgot-password con token temporal | **P4** | Auto-servicio de usuarios (A07) | Full-stack | 3 días | Pendiente |
| CON-022 | Sin APM/SIEM configurado | Configurar alertas básicas en Railway/logs | **P4** | Detección temprana de incidentes (A09) | DevOps | 2 días | Pendiente |
| CON-023 | Entidad Fincas sin API/UI | Desarrollar CRUD fincas para trazabilidad geográfica | **P4** | Completitud funcional cadena productiva | Full-stack | 5 días | Pendiente |
| CON-024 | Evidencias Cypress/Sonar desactualizadas | Re-ejecutar pruebas y exportar reportes actuales | **P4** | Sustentación ICACIT actualizada | QA | 1 día | Pendiente |

---

## Acciones métricas complementarias (MM-01–MM-10)

| ID | Problema | Acción | Prioridad | Beneficio | Responsable | Tiempo | Estado |
|----|----------|--------|-----------|-----------|-------------|--------|--------|
| MM-01 | Performance 70 % | Documentar plan JMeter APIs autenticadas | Alta | Performance ≥ 75 % | QA | 2 días | Pendiente |
| MM-02 | OWASP 76 %; A06 55 % | Ejecutar plan remediación P1–P2 | Alta | Seguridad ≥ 85 % | Backend/Frontend | Sprint P1–P2 | Pendiente |
| MM-03 | Integración CI 65 % | Documentar gap y plan CI completo | Alta | Integración ≥ 80 % | DevOps | 1 día | Pendiente |
| MM-04 | Cobertura Sonar 0 % | Incorporar reporte c8 cuando se genere | Media | Visibilidad deuda tests | QA | 2 días | Pendiente |
| MM-05 | CE-03 74 % | Evidencias Sonar + CI actualizadas | Alta | CE-03 ≥ 80 % | QA / DevOps | Sprint P1–P3 | Pendiente |
| MM-06 | Calidad código 75 % | Exportar dashboard Sonar actualizado | Media | Código ≥ 80 % | QA | 1 día | Pendiente |
| MM-07 | Funcional 81 % | Documentar 11 capacidades parciales en matriz | Baja | Trazabilidad completa | Analista | 0.5 día | Pendiente |
| MM-08 | Automatización 72 % | Checklist CI completo (audit, Cypress, integración) | Media | DevOps ≥ 80 % | DevOps | 2 días | Pendiente |
| MM-09 | 0 capturas UI en evidencias | Incorporar capturas E-01–E-24 | Alta | Sustentación visual ICACIT | QA | 1 día | Pendiente |
| MM-10 | ICACIT global 82 % | Cerrar P1 + evidencias pendientes | Alta | ICACIT ≥ 85 % | Equipo completo | Sprint P1–P4 | Pendiente |

---

## Objetivos tras remediación

| Métrica | Actual | Meta |
|---------|--------|------|
| Calidad general | 77 % | ≥ 85 % |
| Seguridad OWASP | 76 % | ≥ 85 % |
| Hallazgos Crítico/Alto | 7 | 0 |
| Cumplimiento ICACIT | 82 % | ≥ 85 % |
| Remediación | 0 % | ≥ 90 % |
| Madurez | Nivel 3 | Nivel 4 |

---

*Plan detallado — 24 acciones correctivas + 10 acciones métricas — ICACIT Paso 6 — CAFE-IA.*
