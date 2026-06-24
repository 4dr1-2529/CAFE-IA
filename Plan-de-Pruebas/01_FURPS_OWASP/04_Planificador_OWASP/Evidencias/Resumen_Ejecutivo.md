# Resumen Ejecutivo — Planificador OWASP Top 10 — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 4 — Planificador OWASP  
**Fecha:** 24 de junio de 2026  
**Audiencia:** Dirección técnica, evaluación ICACIT, equipo DevSecOps

---

## Síntesis

Se ha completado la **planificación integral** de la auditoría de seguridad del sistema CAFE-IA conforme al **OWASP Top 10 (2021)**. El plan cubre las diez categorías de riesgo web, mapeadas a componentes reales del proyecto: frontend React/Vite en Vercel, backend Express hexagonal en Railway, API REST con JWT/bcrypt, MySQL y módulos de negocio (lotes, trazabilidad, reportes, chatbot, auditoría).

**Estado actual:** Todas las categorías en estado **Pendiente** — la evaluación formal se ejecutará en el Paso 05.

---

## Dashboard OWASP

| Categoría | Descripción breve | Estado | Riesgo esperado |
|-----------|-------------------|--------|-----------------|
| **A01** | Control de acceso (RBAC, JWT, permisos) | Pendiente | **Alto** |
| **A02** | Criptografía (bcrypt, JWT, HTTPS) | Pendiente | Medio |
| **A03** | Inyección (SQL, XSS) | Pendiente | **Alto** |
| **A04** | Diseño inseguro (arquitectura, auth flow) | Pendiente | Medio |
| **A05** | Configuración (CORS, health, deploy) | Pendiente | **Alto** |
| **A06** | Componentes vulnerables (npm CVE) | Pendiente | Medio |
| **A07** | Autenticación (login, tokens) | Pendiente | **Alto** |
| **A08** | Integridad (CI/CD, locks) | Pendiente | Medio |
| **A09** | Logging y monitoreo | Pendiente | Medio |
| **A10** | SSRF | Pendiente | Bajo |

---

## Hallazgos preliminares (planificación, no auditoría)

Información verificada en código y evidencias existentes que **orienta** la auditoría — no constituye hallazgos OWASP confirmados:

| Área | Observación | Categoría |
|------|-------------|-----------|
| Permisos granulares en BD sin uso en API | Brecha diseño/implementación | A01, A04 |
| `/api/health` expone `dbHost` | Misconfiguración información | A05 |
| CORS permite `*.vercel.app` | Superficie ampliada | A05 |
| 8 CVE npm (form-data HIGH backend) | Dependencias vulnerables | A06 |
| CI: npm audit no bloqueante | Integridad pipeline | A05, A08 |
| Sin requests HTTP salientes en backend | SSRF improbable | A10 |
| 16 correcciones Sonar (SQL reportes) | Controles A03 reforzados | A03 |

---

## Alcance planificado

- **13 grupos de rutas API** bajo `/api`
- **15 páginas frontend** con rutas protegidas
- **39 tablas MySQL** en esquema
- **Herramientas:** SonarQube, npm audit, Cypress, Postman, JMeter, revisión manual
- **Duración estimada:** 7 días hábiles

---

## Entregables generados

| Documento | Propósito |
|-----------|-----------|
| `02_Resultado_IA.md` | Plan maestro de auditoría |
| `Checklist_OWASP.md` | 72 controles verificables |
| `Matriz_OWASP.md` / `.xlsx` | Trazabilidad A01–A10 |
| `Plan_Auditoria_OWASP.md` | Fases y criterios de cierre |
| `Cronograma_Auditoria.md` | Calendario 7 días |
| `INDICE_EVIDENCIAS.md` | Inventario de artefactos |

---

## Evidencias incorporadas

18 artefactos copiados desde el proyecto y auditorías previas (package.json, locks, npm audit, Sonar, CI, health Railway, Vercel, tests, arquitectura, schema). Evidencias DAST (ZAP) y export Sonar pendientes de incorporar.

---

## Próximo paso

**Paso 05 — Auditor OWASP:** ejecutar checklist, registrar hallazgos OW-xxx, actualizar dashboard de «Pendiente» a «Evaluado» con porcentaje de cumplimiento por categoría.

---

## Conclusión ejecutiva

CAFE-IA dispone de controles de seguridad fundamentales (JWT, bcrypt, helmet, rate-limit, auditoría HTTP, CI con SonarCloud), pero la planificación identifica **cuatro categorías de riesgo alto esperado** (A01, A03, A05, A07) que concentrarán el esfuerzo de auditoría. El paquete documental generado cumple los requisitos para continuar el ciclo de evaluación ICACIT sin modificar el código fuente.

---

*Resumen ejecutivo — Paso 04 Planificador OWASP.*
