# 02 — Objetivos

## 2.1 Objetivo general

Evaluar la calidad del software CAFE-IA mediante criterios reconocidos (FURPS+, OWASP), herramientas de análisis estático (SonarCloud), pruebas automatizadas (Cypress, Node test, JMeter) y revisión arquitectónica, generando un informe auditable basado exclusivamente en el código existente.

## 2.2 Objetivos específicos

### Funcionalidad
- Verificar implementación de módulos PMV1 (login, dashboard, productores, producción, trazabilidad, calidad, reportes, usuarios) y PMV2 (IA, chatbot, auditoría).
- Contrastar rutas frontend (`AppRoutes.jsx`) con endpoints backend (`routes/index.js`).

### Usabilidad y experiencia
- Evaluar navegación (`MainLayout.jsx`), diseño (Tailwind, dark mode), formularios y flujos E2E documentados en Cypress.

### Confiabilidad y rendimiento
- Analizar manejo de errores (`app.js`, `AppError`, `apiResponse.js`).
- Revisar pruebas de carga JMeter sobre `/api/health` en Railway.
- Evaluar integridad referencial de la base de datos (39 tablas, 43 FK).

### Seguridad
- Auditar JWT, RBAC, CORS, Helmet, rate limiting, validación de entrada y variables de entorno.
- Contrastar con OWASP Top 10 y correcciones documentadas en `docs/sonarqube/CORRECCIONES_SONARQUBE.md`.

### Mantenibilidad y soporte
- Evaluar modularidad hexagonal, organización del monorepo, CI/CD y documentación técnica.
- Identificar deuda técnica registrada en `AUDITORIA_TECNICA.md`.

### Pruebas y evidencias
- Documentar suite Cypress (11 specs PF-01 a PF-11).
- Inventariar API REST para equivalencia Postman (no existe colección en repo).
- Registrar resultados JMeter y tests backend Node.

## 2.3 Criterios de éxito del reporte

| Criterio | Indicador |
|----------|-----------|
| Trazabilidad | Cada hallazgo referencia archivo o documento del repo |
| No invención | Funcionalidades no presentes se marcan como "No implementado" |
| Accionabilidad | Plan de mejoras con prioridad e impacto |
| Presentación | Matrices Excel + documentos markdown estructurados |

## 2.4 Restricciones del análisis

- No se modificó código ni configuración del sistema.
- No se eliminaron archivos del proyecto.
- Métricas SonarCloud en tiempo real requieren acceso al dashboard (token CI); se documentan hallazgos conocidos y configuración.
- Tests backend con dependencia de MySQL/migrate fallaron parcialmente en el entorno de análisis local por error de sintaxis en `migrate.js` (línea 156).
