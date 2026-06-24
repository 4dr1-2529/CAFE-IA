# Informe de Ejecución ICACIT — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 2 — Ejecución de la Evaluación ICACIT  
**Fecha:** 24 de junio de 2026  
**Base:** Planificación Paso 01 + documentación existente

---

## 1. Objetivo

Ejecutar la evaluación ICACIT del proyecto CAFE-IA conforme al plan definido en `01_Planificacion/`, contrastando las siete competencias (cuatro transversales y tres específicas) contra evidencias reales documentadas en Ingeniería Inversa, FURPS+, OWASP, Reporte de Calidad e informes de cierre, sin modificar el código fuente.

---

## 2. Metodología

| Paso | Actividad | Fuente |
|------|-----------|--------|
| 1 | Revisión del plan ICACIT Paso 01 | `01_Planificacion/02_Resultado_IA.md` |
| 2 | Contraste competencias vs. evidencias | Matrices FURPS, OWASP, II |
| 3 | Validación de 11 áreas técnicas | Reporte-Calidad, README, evidencias |
| 4 | Evaluación por competencia CT/CE | Indicadores documentados |
| 5 | Consolidación hallazgos y riesgos | 24 CON-*, Reporte §12 |
| 6 | Registro de resultados y trazabilidad | Presente informe |

**Principio:** evaluación basada exclusivamente en evidencias existentes; sin ejecución de nuevas pruebas ni análisis de código en tiempo real.

---

## 3. Proceso ejecutado

### 3.1 Entradas utilizadas

| Entrada | Ubicación | Estado |
|---------|-----------|--------|
| Ingeniería Inversa | `02_Ingenieria_Inversa/` (13 fases) | Completa |
| FURPS+ | `01_FURPS_OWASP/` Pasos 01–03 | Calidad 77 % |
| OWASP Top 10 | `01_FURPS_OWASP/` Pasos 04–08 | Seguridad 76 % |
| Reporte de Calidad | `Reporte-Calidad-Software/` | 89.2 % cumplimiento |
| Informe Final | Conclusiones FURPS/II/Reporte | Documentado |
| Cypress | `last-run.json` | 13/13 OK |
| JMeter | `jmeter_resumen.json` | 500/500 OK |
| SonarQube | `CORRECCIONES_SONARQUBE.md` | 16 correcciones |
| Railway / Vercel | README, health response | HTTP 200 |

### 3.2 Validaciones realizadas

| Área | Resultado | % / Estado | Evidencia principal |
|------|-----------|------------|---------------------|
| Arquitectura | Validado | 88 % | II Pasos 05–07, FURPS |
| Base de datos | Validado | 80 % | 39 tablas, 43 FK |
| Backend | Validado | 82 % | 18/18 tests, hexagonal |
| Frontend | Validado | 78 % | 15 páginas, Cypress |
| APIs | Parcial | 85 % | 13 módulos; sin Postman |
| Seguridad | Validado | 76 % | OWASP, JWT/bcrypt |
| Calidad | Validado | 77 % | FURPS consolidado |
| Despliegue | Validado | 90 % | Railway + Vercel activos |
| Documentación | Validado | 88 % | >600 archivos Plan-de-Pruebas |
| Pruebas | Parcial | 75 % | Cypress fuera CI |
| Evidencias | Validado | 85 % | Inventarios II y FURPS |

---

## 4. Competencias evaluadas

### 4.1 CT-01 — Conocimientos de Ingeniería

| Campo | Detalle |
|-------|---------|
| Objetivo | Verificar fundamentos de ingeniería de software aplicados |
| Artefactos | `backend/src/`, `frontend/src/`, `schema.sql`, `docs/` |
| Evidencias | README v2.0, II Paso 04, Reporte §03–04, 18 tests backend |
| Resultado | **82 %** |
| Nivel alcanzado | Alto |
| Observaciones | Stack Node/React/MySQL coherente; arquitectura 88 %; calidad técnica 75 % |

### 4.2 CT-02 — Medio Ambiente y Sostenibilidad

| Campo | Detalle |
|-------|---------|
| Objetivo | Evidenciar trazabilidad y café sostenible |
| Artefactos | Módulos trazabilidad, lotes, productores, calidad |
| Evidencias | Functionality 83 %, Cypress PF-04/05, II Paso 08 |
| Resultado | **83 %** |
| Nivel alcanzado | Alto |
| Observaciones | PMV trazabilidad operativo; QR por lote; 48/59 funcionalidades completas |

### 4.3 CT-03 — Ingeniería y Sociedad

| Campo | Detalle |
|-------|---------|
| Objetivo | Evaluar impacto en usuarios y cadena productiva |
| Artefactos | RBAC, chatbot, reportes, `MATRIZ_PRUEBAS_HU.md` |
| Evidencias | Cypress PF-11, Usability 78 %, 12 HU implementadas |
| Resultado | **78 %** |
| Nivel alcanzado | Medio-Alto |
| Observaciones | Roles admin/cliente verificados; gaps en E2E administrativos |

### 4.4 CT-04 — Gestión de Proyectos

| Campo | Detalle |
|-------|---------|
| Objetivo | Documentar gestión del ciclo de evaluación |
| Artefactos | `03_ICACIT/`, Plan-de-Pruebas, cronogramas |
| Evidencias | 13 fases II + 8 FURPS + 8 ICACIT planificadas |
| Resultado | **88 %** |
| Nivel alcanzado | Alto |
| Observaciones | Cobertura documental 88 %; trazabilidad multi-módulo |

### 4.5 CE-01 — Diseño de Soluciones

| Campo | Detalle |
|-------|---------|
| Objetivo | Validar arquitectura hexagonal y diseño de solución |
| Artefactos | Diagramas mermaid, 13 APIs, `schema.sql` |
| Evidencias | Arquitectura 88 %, 45 componentes, 13 controladores |
| Resultado | **88 %** |
| Nivel alcanzado | Alto |
| Observaciones | Hexagonal madura; deuda en reportes/producción |

### 4.6 CE-02 — Análisis de Problemas

| Campo | Detalle |
|-------|---------|
| Objetivo | Consolidar hallazgos y análisis de riesgos |
| Artefactos | Matrices FURPS/OWASP, `11_Hallazgos/`, CON-* |
| Evidencias | 24 hallazgos (1C·6A·14M·3B), 0 % remediación |
| Resultado | **82 %** |
| Nivel alcanzado | Alto |
| Observaciones | Análisis exhaustivo; remediación pendiente |

### 4.7 CE-03 — Uso de Herramientas Modernas

| Campo | Detalle |
|-------|---------|
| Objetivo | Evidenciar herramientas QA, DevOps y análisis |
| Artefactos | Cypress, JMeter, SonarCloud, CI, Railway, Vercel |
| Evidencias | 13/13 Cypress, 500/500 JMeter, `ci.yml`, npm audit |
| Resultado | **74 %** |
| Nivel alcanzado | Medio-Alto |
| Observaciones | DevOps 72 %, QA 75 %; Cypress fuera CI; Sonar 0 % cobertura |

---

## 5. Resultados obtenidos

| Indicador | Valor |
|-----------|-------|
| Promedio competencias ICACIT | **82 %** |
| Calidad general (FURPS+) | 77 % |
| Seguridad (OWASP) | 76 % |
| Cumplimiento Reporte Calidad | 89.2 % |
| Cumplimiento ICACIT estimado | 78 % → **82 %** post-ejecución |
| Madurez | Nivel 3 — Definido |
| Preparación auditoría | Apta con reservas |

---

## 6. Hallazgos

| ID | Severidad | Hallazgo | Fuente |
|----|-----------|----------|--------|
| CON-001 | Crítico | Sin transacción SQL en `LoteService.create` | FURPS/OWASP |
| CON-002 | Alto | Health expone `dbHost` | OWASP A05 |
| CON-003 | Alto | CORS `*.vercel.app` amplio | OWASP A05 |
| CON-004 | Alto | Permisos BD sin enforcement | OWASP A01 |
| CON-005 | Alto | CVE form-data HIGH | OWASP A06 |
| CON-006 | Alto | Cypress fuera de CI | Reporte §12 |
| CON-007 | Alto | Backups MySQL no documentados | II Paso 09 |
| — | Medio | SonarCloud cobertura 0 % | Reporte §07 |
| — | Medio | Sin colección Postman | Reporte §09 |
| — | Medio | JMeter solo `/api/health` | Reporte §10 |

---

## 7. Riesgos

| Riesgo | Nivel | Mitigación documentada |
|--------|-------|------------------------|
| Integridad datos lotes (CON-001) | Alto | Plan P1 FURPS |
| Exposición infraestructura (CON-002/003) | Alto | Sanitizar health, CORS whitelist |
| CVE sin remediar (CON-005) | Alto | npm audit fix |
| Drift pruebas E2E (CON-006) | Alto | Integrar Cypress en CI |
| Riesgo global residual | Medio-Alto | 24 hallazgos, 0 % remediación |

---

## 8. Fortalezas

1. Arquitectura hexagonal documentada y evaluada al 88 %.
2. PMV funcional completo con 13 APIs REST y 15 páginas React.
3. Seguridad baseline: JWT/bcrypt, Helmet, rate limiting, SQL parametrizado.
4. Pruebas E2E Cypress 13/13 y backend 18/18 documentadas.
5. Despliegue activo Railway + Vercel con health verificado.
6. Corpus documental >600 archivos en Plan-de-Pruebas.
7. 16 correcciones SonarQube documentadas.
8. JMeter 500/500 requests sin error.

---

## 9. Debilidades

1. 0 % remediación sobre 24 hallazgos consolidados.
2. OWASP A06 (componentes vulnerables) al 55 % — no cumple.
3. Performance al 70 % — JMeter limitado a health.
4. Cobertura SonarCloud en 0 % por ausencia de lcov.
5. CI incompleto: sin Cypress, sin tests integración BD.
6. Colección Postman ausente en repositorio.
7. Transaccionalidad lotes pendiente (Crítico).

---

## 10. Nivel de cumplimiento

| Dimensión | Cumplimiento | Estado |
|-----------|--------------|--------|
| Competencias transversales (promedio) | 83 % | Bueno |
| Competencias específicas (promedio) | 81 % | Bueno |
| Validaciones técnicas (11 áreas) | 9/11 validadas, 2 parciales | Bueno |
| **Ejecución ICACIT global** | **82 %** | **Bueno** |

---

*Informe de Ejecución — Paso 02 ICACIT — CAFE-IA.*
