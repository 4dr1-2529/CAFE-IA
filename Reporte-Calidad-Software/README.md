# Reporte de Calidad de Software — CAFE-IA

**Proyecto:** Café Sostenible AI (CAFE-IA)  
**Repositorio:** [github.com/4dr1-2529/CAFE-IA](https://github.com/4dr1-2529/CAFE-IA)  
**Versión analizada:** 2.0.0 (monorepo `cafe-cursor/`)  
**Fecha del reporte:** 18 de junio de 2026  
**Metodología:** Análisis estático del código, documentación existente, pruebas automatizadas y evidencias del repositorio.

---

## Aclaración técnica importante

El código fuente analizado utiliza **React 18 + Vite + Tailwind** en el frontend, **no Angular 17**. El backend es **Node.js 20 + Express 4** con arquitectura hexagonal parcial, **MySQL 8** (39 tablas, 43 claves foráneas), despliegue en **Railway** (API + BD) y **Vercel** (SPA).

Toda la información de este reporte proviene exclusivamente del código y documentación en `cafe-cursor/`.

---

## Índice del reporte

| # | Documento | Contenido |
|---|-----------|-----------|
| 01 | [01_Introduccion.md](01_Introduccion.md) | Contexto, stack real, alcance del análisis |
| 02 | [02_Objetivos.md](02_Objetivos.md) | Objetivos de calidad evaluados |
| 03 | [03_Alcance.md](03_Alcance.md) | Componentes incluidos y excluidos |
| 04 | [04_Metodologia.md](04_Metodologia.md) | Métodos, herramientas y criterios |
| 05 | [05_Evaluacion_FURPS+.md](05_Evaluacion_FURPS+.md) | Evaluación FURPS+ completa |
| 06 | [06_Evaluacion_OWASP.md](06_Evaluacion_OWASP.md) | Análisis OWASP Top 10 |
| 07 | [07_Analisis_SonarQube.md](07_Analisis_SonarQube.md) | SonarCloud / calidad de código |
| 08 | [08_Pruebas_Cypress.md](08_Pruebas_Cypress.md) | Pruebas E2E funcionales |
| 09 | [09_Pruebas_Postman.md](09_Pruebas_Postman.md) | Inventario API REST (sin colección Postman) |
| 10 | [10_Pruebas_JMeter.md](10_Pruebas_JMeter.md) | Pruebas de carga y rendimiento |
| 11 | [11_Plan_Mejoras.md](11_Plan_Mejoras.md) | Plan de acciones correctivas |
| 12 | [12_Conclusiones.md](12_Conclusiones.md) | Conclusiones basadas en evidencia |
| 13 | [13_Trazabilidad_Documental.md](13_Trazabilidad_Documental.md) | Trazabilidad PMV1/PMV2 (20 cadenas TR) |
| — | [AUDITORIA_FINAL.md](AUDITORIA_FINAL.md) | Auditoría de completitud — **89.2 %** |

---

## Evidencias y reportes

| Carpeta | Contenido |
|---------|-----------|
| [Evidencias/](Evidencias/) | 22 artefactos + [GUIA_CAPTURAS.md](Evidencias/GUIA_CAPTURAS.md) + [CHECKLIST_EVIDENCIAS.md](Evidencias/CHECKLIST_EVIDENCIAS.md) |
| [Reportes/](Reportes/) | Cypress, JMeter, Sonar + [GUIA_POSTMAN.md](Reportes/GUIA_POSTMAN.md) + [GUIA_SONARCLOUD.md](Reportes/GUIA_SONARCLOUD.md) |

## Matrices (Excel)

| Archivo | Descripción |
|---------|-------------|
| [Matrices/Matriz_FURPS.xlsx](Matrices/Matriz_FURPS.xlsx) | 28 criterios FURPS+ — auditado 18-jun-2026 |
| [Matrices/Matriz_OWASP.xlsx](Matrices/Matriz_OWASP.xlsx) | 14 riesgos OWASP |
| [Matrices/Matriz_Casos_Prueba.xlsx](Matrices/Matriz_Casos_Prueba.xlsx) | 26 casos Cypress/backend/JMeter |
| [Matrices/Matriz_Riesgos.xlsx](Matrices/Matriz_Riesgos.xlsx) | 15 riesgos priorizados |
| [Matrices/Matriz_Plan_Mejoras.xlsx](Matrices/Matriz_Plan_Mejoras.xlsx) | 15 acciones correctivas |

---

## Evidencias (resumen)

- **Copiados:** 22 artefactos en [Evidencias/](Evidencias/) + 8 en [Reportes/](Reportes/)
- **Checklist:** [CHECKLIST_EVIDENCIAS.md](Evidencias/CHECKLIST_EVIDENCIAS.md) — avance global **89.2 %** módulo / **40 %** capturas ponderadas
- **Guía capturas:** [GUIA_CAPTURAS.md](Evidencias/GUIA_CAPTURAS.md)
- **Trazabilidad:** [13_Trazabilidad_Documental.md](13_Trazabilidad_Documental.md)
- **Cypress:** 13/13 OK — `Reportes/cypress_last-run.json`
- **JMeter:** 500/500 OK, 443.05 ms — `Reportes/jmeter_resumen.json`
- **SonarCloud / Postman:** guías en `Reportes/GUIA_*.md` — dashboard y colección pendientes
- **Imágenes UI:** 0 PNG en repo

---

## Resumen ejecutivo

| Área | Estado | Nivel |
|------|--------|-------|
| Funcionalidad (PMV1 + PMV2) | Módulos core implementados | Alto |
| Seguridad (JWT, RBAC, Helmet) | Controles presentes; correcciones Sonar documentadas | Medio-Alto |
| Pruebas E2E (Cypress) | 11 specs, 13 tests — última ejecución 100 % OK | Alto |
| Pruebas backend (Node test) | 10/13 pass; 3 fallan por error en `migrate.js` | Medio |
| SonarCloud | Configurado en CI; métricas live pendientes de captura | Medio |
| Postman | No existe colección en el repositorio | Bajo |
| JMeter | Plan y CSV de 500 req; solo endpoint health | Medio |
| Arquitectura | Hexagonal parcial (deuda en reportes/producción) | Medio |

---

## Referencias internas del proyecto

- README principal: `cafe-cursor/README.md`
- Documentación técnica: `cafe-cursor/docs/DOCUMENTACION_TECNICA.md`
- Auditoría técnica: `cafe-cursor/docs/AUDITORIA_TECNICA.md`
- Correcciones Sonar: `cafe-cursor/docs/sonarqube/CORRECCIONES_SONARQUBE.md`
