# Checklist de Evidencias — CAFE-IA

**Actualización:** 18 de junio de 2026 (auditoría final)  
**Metodología:** ítems verificables contra archivos en `Evidencias/` y `Reportes/`.

---

## Resumen de avance global

| Categoría | Ítems | Completados | Avance |
|-----------|-------|-------------|--------|
| **A. Artefactos técnicos (repo)** | 22 | 22 | **100 %** |
| **B. Capturas UI aplicación** | 24 | 0 | **0 %** |
| **C. Herramientas QA (capturas)** | 12 | 0 | **0 %** |
| **D. Infraestructura cloud** | 12 | 0 | **0 %** |
| **TOTAL ponderado** | 70 | 22 | **31.4 %** |

**Ponderación académica sugerida:** A=40 %, B=35 %, C=15 %, D=10 %  
**Avance ponderado:** 40 % + 0 % + 0 % + 0 % = **40.0 %** (solo artefactos automáticos)

**Avance documentación escrita del reporte:** **92 %** (docs 01–13, matrices, guías, trazabilidad)

---

## A. Artefactos técnicos copiados del repositorio

| ID | Evidencia | Ubicación | Estado | Doc |
|----|-----------|-----------|--------|-----|
| A-01 | Cypress last-run.json | `Evidencias/cypress/` | ✔ 13/13 OK | 08 |
| A-02 | Cypress README | `Evidencias/cypress/` | ✔ | 08 |
| A-03 | JMeter CSV 500 req | `Evidencias/jmeter/` | ✔ | 10 |
| A-04 | JMeter JMX plan | `Evidencias/jmeter/` | ✔ | 10 |
| A-05 | JMeter README | `Evidencias/jmeter/` | ✔ | 10 |
| A-06 | JMeter resumen JSON | `Evidencias/metricas/` | ✔ | 10 |
| A-07 | Prometheus simulación | `Evidencias/metricas/` | ✔ | 10 |
| A-08 | Grafana disponibilidad | `Evidencias/metricas/` | ✔ | 10 |
| A-09 | Reporte métricas MD | `Evidencias/metricas/` | ✔ | 10 |
| A-10 | Sonar correcciones | `Evidencias/sonarqube/` | ✔ | 07 |
| A-11 | Sonar reporte MD | `Evidencias/sonarqube/` | ✔ | 07 |
| A-12 | Sonar hallazgos MD | `Evidencias/sonarqube/` | ✔ | 07 |
| A-13 | Sonar SONARCLOUD.md | `Evidencias/sonarqube/` | ✔ | 07 |
| A-14 | DER Mermaid (3) | `Evidencias/diagramas-mermaid/` | ✔ | 01, 13 |
| A-15 | MATRIZ_PRUEBAS_HU | `Evidencias/documentacion-proyecto/` | ✔ | 13 |
| A-16 | ESQUEMA_RELACIONAL | `Evidencias/documentacion-proyecto/` | ✔ | 01 |
| A-17 | AUDITORIA_TECNICA | `Evidencias/documentacion-proyecto/` | ✔ | 11 |
| A-18 | ML metrics.json | `Evidencias/ml/` | ✔ | 05 F-10 |
| A-19 | Reportes cypress JSON | `Reportes/cypress_last-run.json` | ✔ | 08 |
| A-20 | Reportes jmeter CSV/JSON | `Reportes/jmeter_*` | ✔ | 10 |
| A-21 | Reportes sonar MD | `Reportes/sonarqube_*` | ✔ | 07 |
| A-22 | Métricas arquitectura MD | `Reportes/metricas_arquitectura_rendimiento.md` | ✔ | 10 |

**Subtotal A: 22/22 = 100 %**

---

## B. Capturas UI — aplicación (prioridad ALTA)

| ID | Módulo | Captura | Prioridad | Estado | Informe |
|----|--------|---------|-----------|--------|---------|
| E-01 | Login | Formulario | Alta | ✗ Pendiente | 05 F-01 |
| E-02 | Login | Error credenciales | Media | ✗ | 06 A07 |
| E-03 | Login | Admin exitoso | Alta | ✗ | 08 PF-01 |
| E-04 | Login | Cliente exitoso | Alta | ✗ | 08 PF-02 |
| E-05 | Dashboard | Admin KPIs | Alta | ✗ | 05 F-06 |
| E-06 | Dashboard | Cliente KPIs | Alta | ✗ | 08 PF-04 |
| E-07 | Usuarios | Listado admin | Media | ✗ | 05 F-02 |
| E-08 | Usuarios | Formulario alta | Media | ✗ | TR-02 |
| E-09 | Productores | Listado | Alta | ✗ | 08 PF-05 |
| E-10 | Productores | Alta | Alta | ✗ | TR-03 |
| E-11 | Producción | Registro lote | Alta | ✗ | 08 PF-06 |
| E-12 | Producción | Confirmación | Media | ✗ | TR-04 |
| E-13 | Trazabilidad | Lista | Alta | ✗ | 08 PF-07 |
| E-14 | Trazabilidad | QR/detalle | Alta | ✗ | TR-05 |
| E-15 | Calidad | Formulario | Media | ✗ | TR-06 |
| E-16 | Calidad | Puntaje | Media | ✗ | TR-06 |
| E-17 | Reportes | Pestañas | Alta | ✗ | 08 PF-09 |
| E-18 | Reportes | Export | Media | ✗ | TR-08 |
| E-19 | Chatbot | Interfaz | Alta | ✗ | 08 PF-10 |
| E-20 | Chatbot | Respuesta | Alta | ✗ | TR-11 |
| E-21 | Auditoría | Logs | Media | ✗ | TR-12 |
| E-22 | Auditoría | Resumen | Media | ✗ | TR-12 |
| E-23 | IA | Selector lotes | Alta | ✗ | 08 PF-08 |
| E-24 | IA | Predicción | Alta | ✗ | TR-10 |

**Subtotal B: 0/24 = 0 %** — Ver [GUIA_CAPTURAS.md](GUIA_CAPTURAS.md)

---

## C. Herramientas QA — capturas (prioridad MEDIA)

| ID | Herramienta | Captura | Prioridad | Estado | Informe |
|----|-------------|---------|-----------|--------|---------|
| E-27 | SonarCloud | Overview Quality Gate | **Alta** | ✗ | 07 |
| E-28 | SonarCloud | Vulnerabilities | Alta | ✗ | 06 |
| E-29 | SonarCloud | Measures | Media | ✗ | 07 |
| E-30 | Cypress | Test Runner 11/11 | Media | ✗ | 08 |
| E-31 | Cypress | Consola headless | Baja | ✗ | 08 |
| E-32 | Cypress | Screenshots PF-* | Media | ✗ | 08 |
| E-33 | Postman | Colección | Media | ✗ | 09 |
| E-34 | Postman | Runner results | Media | ✗ | GUIA_POSTMAN |
| E-35 | JMeter | Test Plan GUI | Baja | ✗ | 10 |
| E-36 | JMeter | Summary Report | Media | ✗ | 10 |
| E-37 | JMeter | Results Tree 200 | Baja | ✗ | 10 |
| E-47 | GitHub Actions | CI workflow OK | Media | ✗ | 04 |

**Subtotal C: 0/12 = 0 %** — Guías: `Reportes/GUIA_SONARCLOUD.md`, `Reportes/GUIA_POSTMAN.md`

---

## D. Infraestructura (prioridad BAJA–MEDIA)

| ID | Componente | Captura | Prioridad | Estado |
|----|------------|---------|-----------|--------|
| E-38 | Railway | Dashboard API | Media | ✗ |
| E-39 | Railway | MySQL service | Media | ✗ |
| E-40 | Railway | Logs | Baja | ✗ |
| E-41 | Vercel | Deploy dashboard | Media | ✗ |
| E-42 | Vercel | Env VITE_API_URL | Baja | ✗ |
| E-43 | Vercel | Sitio live | Alta | ✗ |
| E-44 | MySQL | 39 tablas | Media | ✗ |
| E-45 | MySQL | 43 FK | Baja | ✗ |
| E-46 | MySQL | Seed PMV2 | Baja | ✗ |
| E-48 | API | GET /api/health JSON | Media | ✗ |

**Subtotal D: 0/10 = 0 %**

---

## Priorización para sustentación universitaria

| Orden | Mínimo indispensable | Impacto |
|-------|---------------------|---------|
| 1 | E-03, E-04, E-05, E-06 (login + dashboard) | Demuestra PMV1 core |
| 2 | E-09, E-11, E-13 (productores, lote, trazabilidad) | Cadena negocio |
| 3 | E-19, E-23 (chatbot + IA) | PMV2 |
| 4 | E-27 (SonarCloud) | Calidad estática |
| 5 | E-33–E-34 (Postman) | API REST |
| 6 | E-43 (Vercel live) | Deploy |

Completar ítems 1–4 eleva evidencia visual a **~40 %** y cumplimiento global del módulo a **~88 %**.

---

## Referencias

- [GUIA_CAPTURAS.md](GUIA_CAPTURAS.md) — detalle por captura
- [13_Trazabilidad_Documental.md](../13_Trazabilidad_Documental.md) — cadena requisito→evidencia
- [AUDITORIA_FINAL.md](../AUDITORIA_FINAL.md) — veredicto entrega
