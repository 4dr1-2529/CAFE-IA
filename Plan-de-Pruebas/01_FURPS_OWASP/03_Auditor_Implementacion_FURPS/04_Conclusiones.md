# Conclusiones — Auditor de Implementación FURPS+ CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 03 — Verificación de Implementación FURPS+  
**Fecha:** 24 de junio de 2026

---

## Nivel de implementación alcanzado

La verificación de implementación sobre el código fuente y las evidencias operativas de CAFE-IA arroja un **cumplimiento general del 77 %**, clasificado como **cumple parcialmente** respecto a los atributos FURPS+ planificados y auditados en los pasos anteriores. El sistema materializa en código la mayor parte del producto mínimo viable: quince páginas React, trece grupos de API REST, esquema relacional con integridad referencial a nivel de base de datos y despliegue activo en Railway y Vercel.

No obstante, **ninguna de las diecisiete mejoras derivadas de la auditoría FURPS+ del Paso 02 se encuentra implementada** en el código analizado. La brecha más grave permanece en la capa de aplicación: la creación compuesta de lotes ejecuta múltiples operaciones de persistencia sin transacción SQL, contradiciendo el requisito de integridad definido en el plan FURPS+.

---

## Grado de cumplimiento FURPS+

| Dimensión | Auditoría (P02) | Implementación (P03) |
|-----------|-----------------|----------------------|
| Functionality | 84 % | 83 % |
| Usability | 80 % | 78 % |
| Reliability | 83 % | 78 % |
| Performance | 72 % | 70 % |
| Supportability | 76 % | 74 % |
| Seguridad | 78 % | 76 % |
| **Global** | **79 %** | **77 %** |

La ligera reducción respecto al Paso 02 refleja la confirmación en código de hallazgos antes inferidos por evidencias indirectas. El grado de cumplimiento FURPS+ se mantiene en rango **bueno**, sin alcanzar excelencia por deuda técnica no remediada.

---

## Calidad del desarrollo

El desarrollo presenta **coherencia estructural** con arquitectura hexagonal, separación de responsabilidades por capas y validadores por agregado de dominio. Los tests backend (dieciocho de dieciocho exitosos) y Cypress local (trece de trece) confirman comportamiento funcional alineado con el diseño.

La calidad del desarrollo se ve limitada por: dependencias npm con CVE sin parchear, ESLint frontend con dos errores bloqueantes, ausencia de cobertura instrumentada y exclusión de pruebas de integración y E2E del pipeline de integración continua. La calificación de desarrollo se estima en **76 % — buena con reservas**.

---

## Calidad de la arquitectura

La arquitectura implementada coincide con el diseño documentado: patrón hexagonal con interfaces HTTP, servicios de aplicación, dominio e infraestructura de persistencia MySQL. La modularidad alcanza aproximadamente el **88 %** de cumplimiento, con desviaciones puntuales (`PredictionService` con acceso directo a pool, tablas de permisos sin enforcement en runtime).

La calidad arquitectónica es el **punto más sólido** de la implementación verificada.

---

## Calidad del despliegue

El despliegue en Railway (API + MySQL) y Vercel (SPA) está **operativo y verificado** mediante respuestas HTTP 200 y endpoint de salud con `ok: true`. La configuración de variables de entorno sigue convenciones documentadas (`MYSQL*`, `JWT_SECRET`, `VITE_API_URL`).

Persisten limitaciones: ausencia de despliegue continuo automatizado documentado, política de respaldos no evidenciada y exposición de metadatos internos en `/api/health`. Calidad de despliegue: **90 % en operatividad**, **75 % en madurez operacional**.

---

## Calidad de las pruebas

| Tipo | Estado implementación |
|------|----------------------|
| Tests unitarios/integración local backend | Implementado — 18/18 |
| Cypress E2E local | Implementado — 13/13 (evidencia mayo 2026) |
| Cypress en CI | No implementado |
| Integración MySQL en CI | No implementado (`SKIP_INTEGRATION=1`) |
| JMeter escenarios negocio | No implementado |
| Cobertura lcov Sonar | No implementado |

Calidad de pruebas: **68 % — cumple parcialmente**. Las pruebas locales son sólidas; la automatización en pipeline es insuficiente.

---

## Calidad de la documentación

El repositorio incluye README extenso, documentación de historias de usuario en la aplicación, dieciséis correcciones Sonar documentadas y corpus de ingeniería inversa. Para ICACIT faltan capturas Sonar Quality Gate y paneles cloud. Documentación: **85 % — buena**.

---

## Fortalezas del proyecto (implementación verificada)

1. Arquitectura hexagonal materializada en estructura de carpetas y flujo de dependencias.
2. Autenticación JWT con validación de secreto mínimo de treinta y dos caracteres.
3. RBAC admin/cliente con scope `user_id` en middleware.
4. Esquema MySQL con claves foráneas en entidades nucleares.
5. Correcciones de seguridad Sonar aplicadas (SQL parametrizado, Vite `VITE_*` only, SHA en Actions).
6. Producción Railway + Vercel operativa.
7. Design system frontend con catorce componentes reutilizables.

---

## Debilidades encontradas (implementación)

1. **Crítica:** transacción SQL ausente en `LoteService.create`.
2. Cypress y tests de integración excluidos de CI.
3. CVE react-router y form-data sin remediación en `package.json`/lock.
4. Cobertura de código no instrumentada.
5. Chunk Recharts de cuatrocientos once kilobytes sin carga diferida.
6. Entidad fincas modelada en BD sin capa de aplicación.
7. Endpoint health con exposición de `dbHost` interno.

---

## Recomendaciones para mejorar la implementación

1. **Inmediato:** implementar IMP-H001 (transacción lote) antes de cualquier despliegue con carga de datos críticos.
2. **Corto plazo:** IMP-H002 a IMP-H006 (CI Cypress, CVE, lcov, backups).
3. **Medio plazo:** IMP-H007 a IMP-H015 según plan `03_Mejoras.md`.
4. **Siguiente fase bloque FURPS+OWASP:** iniciar **Paso 04 — Planificador OWASP** en paralelo, cruzando IMP-H003/H004/H013 con vectores OWASP.
5. **Re-verificación:** tras aplicar correcciones en código CAFE-IA (fuera de alcance de esta documentación), ejecutar nueva pasada de implementación o cierre en Auditor Final Integral (Paso 07).

---

## Veredicto

La implementación de CAFE-IA **cumple parcialmente (77 %)** los atributos FURPS+ verificados en código y evidencias. El producto es **desplegable, funcional y arquitectónicamente sólido**, pero **no ha incorporado las mejoras** identificadas en la auditoría previa. Se recomienda proceder al bloque OWASP condicionado a un plan de remediación activo de los hallazgos IMP-H001 a IMP-H017.

---

*Conclusión Paso 03 — lista para incorporación al informe académico e ICACIT.*
