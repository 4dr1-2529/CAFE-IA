# Conclusión Final — Proyecto CAFE-IA

**Evaluación:** FURPS+ y OWASP Top 10 (2021)  
**Fecha de cierre:** 24 de junio de 2026  
**Ciclo:** Pasos 01–08 · `Plan-de-Pruebas/01_FURPS_OWASP/`

---

El proyecto **CAFE-IA** (Café Sostenible AI) ha sido sometido a una evaluación integral de calidad y seguridad conforme a los marcos **FURPS+** y **OWASP Top 10 (2021)**, ejecutada en ocho fases documentales sin alteración del código fuente.

**Resultado global: 77 % (Bueno).** Seguridad OWASP: 76 %. Arquitectura: 88 %. Preparación para producción: 82 % (apta con deuda técnica documentada). Madurez: Nivel 3 — Definido. Riesgo residual: Medio-Alto.

El sistema demuestra un PMV funcional y desplegado (Railway + Vercel), con arquitectura hexagonal madura, autenticación JWT/bcrypt, trece APIs REST, auditoría HTTP y pruebas automatizadas exitosas (18 tests backend, 13 Cypress E2E, JMeter 500/500). Se consolidaron **24 hallazgos únicos** (1 Crítico, 6 Altos, 14 Medios, 3 Bajos) con **0 % de remediación** aplicada.

**Veredicto de cierre:** El proyecto **cumple los objetivos académicos y operativos** de la evaluación ICACIT, con reservas documentadas en integridad de datos (transacción lotes), configuración de seguridad (health, CORS), dependencias npm y pipeline CI. Se recomienda ejecutar el plan de mejoras P1 (CON-001 a CON-007) como continuidad post-evaluación.

La documentación generada en `08_Conclusion_General/` y el corpus de evidencias de los Pasos 01–07 constituyen el anexo definitivo del informe final.

---

*Documento de cierre — Conclusión Final — CAFE-IA.*
