# 12 — Conclusiones

## 12.1 Conclusión general

El proyecto **CAFE-IA** (Café Sostenible AI) presenta un **nivel de madurez funcional alto** para un sistema académico/empresarial PMV2: los módulos core de trazabilidad, productores, calidad, IA heurística, reportes, chatbot y auditoría están **implementados y verificables en código**, con despliegue activo en **Railway + Vercel** y documentación técnica extensa en `cafe-cursor/docs/`.

La evaluación de calidad revela **fortalezas claras en funcionalidad y pruebas E2E**, complementadas por **deuda técnica moderada** en arquitectura hexagonal, cobertura de pruebas backend y artefactos formales de API (Postman).

## 12.2 Hallazgos principales (basados en evidencia)

### Fortalezas

1. **Stack coherente y moderno:** React 18 + Vite + Express + MySQL 8, monorepo bien documentado (`README.md` v2.0.0).
2. **Seguridad baseline sólida:** JWT con secreto obligatorio (≥32 chars), RBAC en tres niveles, Helmet, rate limiting, CORS configurable, bcrypt, auditoría de acciones.
3. **Base de datos robusta:** 39 tablas y 43 claves foráneas en `schema.sql`, migración automática, seeds PMV2 multiusuario.
4. **Pruebas E2E exitosas:** Cypress 11 specs, **13/13 tests OK** (2026-05-28) cubriendo login, dashboards, productores, producción, trazabilidad, IA, reportes, chatbot y RBAC.
5. **Correcciones Sonar documentadas:** 16 hallazgos con mitigación aplicada según `CORRECCIONES_SONARQUBE.md`.
6. **CI automatizado:** Tests backend, build frontend, SonarCloud y npm audit en GitHub Actions.
7. **Rendimiento health check:** JMeter 500/500 requests, 0 % error, promedio ~442 ms (< 2 s objetivo).

### Debilidades

1. **Error sintaxis `migrate.js:156`:** Impide ejecutar 3 suites de tests backend (health, integration, api.errors) en el entorno analizado — **riesgo crítico de regresión**.
2. **Arquitectura hexagonal parcial:** Reportes y producción mantienen deuda; duplicidad conceptual lotes/produccion.
3. **Sin colección Postman** en el repositorio — inventario API derivado manualmente en este reporte.
4. **SonarCloud:** Métricas numéricas live (bugs, smells, coverage) no disponibles offline; requieren captura dashboard.
5. **JMeter limitado** a `/api/health` — no representa carga de negocio autenticado.
6. **Cypress no integrado en CI** — riesgo de drift entre código y pruebas.
7. **Frontend es React, no Angular 17** — discrepancia con documentación externa del encargo.

## 12.3 Evaluación por dimensión

| Dimensión | Calificación | Justificación breve |
|-----------|--------------|---------------------|
| Functionality | **Alto** | PMV1 + PMV2 operativos, rutas UI ↔ API alineadas |
| Usability | **Medio-Alto** | UI Tailwind/dark mode; gaps formularios/toasts |
| Reliability | **Medio-Alto** | Error handling OK; tests backend parcialmente rotos |
| Performance | **Medio** | Health OK; sin perf test negocio |
| Supportability | **Medio** | Buena docs; hexagonal incompleta |
| Security | **Medio-Alto** | OWASP controls; dev auth opcional |
| Testability | **Medio-Alto** | Cypress fuerte; backend/Postman gaps |

## 12.4 Veredicto de calidad

El sistema **CAFE-IA es apto para demostración, evaluación académica y operación controlada en producción** (Railway/Vercel), condicionado a:

- Corregir el error en `migrate.js` para restaurar confianza en tests automatizados
- Completar evidencias SonarCloud y capturas visuales
- Ampliar pruebas de carga y API formales (Postman/Newman)

**Nivel global de calidad estimado: 7.5 / 10** — funcionalmente completo, con deuda técnica documentada.

**Cumplimiento del módulo Reporte-Calidad-Software: 89.2 %** — ver [AUDITORIA_FINAL.md](AUDITORIA_FINAL.md). Con capturas mínimas de sustentación (E-03–E-06, E-27): **~94 %**.

## 12.5 Próximos pasos recomendados (orden de prioridad)

1. Corregir `migrate.js:156` y validar `npm test` → 13/13
2. Capturar Quality Gate SonarCloud post-CI
3. Crear colección Postman desde inventario doc 09
4. Integrar Cypress en pipeline CI
5. Ampliar JMeter a flujos autenticados
6. Añadir specs E2E calidad, auditoría, usuarios

## 12.6 Declaración de integridad del reporte

Este reporte fue generado **exclusivamente** a partir del análisis del código y documentación en `cafe-cursor/`. No se inventaron funcionalidades. Donde la información no existía en el repositorio (métricas Sonar live, colección Postman, capturas centralizadas), se indicó explícitamente y se sugirió cómo obtenerla.

---

**Elaborado:** Reporte de Calidad de Software CAFE-IA  
**Fecha:** 18 de junio de 2026  
**Referencia repositorio:** [github.com/4dr1-2529/CAFE-IA](https://github.com/4dr1-2529/CAFE-IA)
