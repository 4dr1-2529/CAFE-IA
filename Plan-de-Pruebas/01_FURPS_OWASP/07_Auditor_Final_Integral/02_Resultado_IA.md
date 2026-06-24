# Informe Ejecutivo — Auditoría Final Integral — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 7 — Auditor Final Integral  
**Fecha:** 24 de junio de 2026  
**Alcance:** Consolidación Pasos 01–06 (FURPS+ y OWASP Top 10 2021)

---

## 1. Objetivo

Emitir un **diagnóstico integral** del proyecto CAFE-IA integrando los resultados de planificación, auditoría y verificación de implementación obtenidos en los seis pasos previos, sin re-ejecutar pruebas ni modificar el código fuente. El informe consolida calidad funcional (FURPS+), seguridad (OWASP), arquitectura, infraestructura y madurez del software para el informe académico ICACIT.

---

## 2. Metodología de consolidación

| Paso | Actividad | Aporte a este informe |
|------|-----------|----------------------|
| 01 | Planificador FURPS+ | 48 criterios, matriz, cronograma |
| 02 | Auditor FURPS+ | Cumplimiento 79 %, 18 hallazgos FUR-xxx |
| 03 | Implementación FURPS+ | Verificación código 77 %, 0 % remediación |
| 04 | Planificador OWASP | Plan A01–A10, checklist 72 controles |
| 05 | Auditor OWASP | Cumplimiento 76 %, 15 hallazgos OW-xxx |
| 06 | Implementación OWASP | Verificación 76 %, 0 % remediación |

**Proceso:** Extracción de indicadores y hallazgos → deduplicación (24 hallazgos únicos CON-001 a CON-024) → cálculo de indicadores globales → síntesis ejecutiva.

---

## 3. Información consolidada

### 3.1 Ciclo de evaluación completado

```text
FURPS+:  Planificar (01) → Auditar (02) → Verificar impl. (03)
OWASP:   Planificar (04) → Auditar (05) → Verificar impl. (06)
Integral: Consolidar (07) → Conclusión general (08)
```

### 3.2 Evidencias base

- **177 archivos** generados en `01_FURPS_OWASP/` (Pasos 01–06)
- **Pruebas:** 18/18 backend, 13/13 Cypress, JMeter 500/500 health
- **Despliegue:** Railway API + MySQL, Vercel SPA — HTTP 200 verificados
- **SAST:** 16 correcciones Sonar documentadas (pre-auditoría)
- **Dependencias:** 8 CVE npm documentados (2 backend + 6 frontend)

---

## 4. Resultados FURPS+ consolidados

### 4.1 Dashboard FURPS (implementación verificada — Paso 03)

| Atributo | Auditoría P02 | Implementación P03 | Estado | Madurez |
|----------|---------------|-------------------|--------|---------|
| **Functionality (F)** | 84 % | **83 %** | Bueno | Nivel 3 |
| **Usability (U)** | 80 % | **78 %** | Bueno | Nivel 3 |
| **Reliability (R)** | 83 % | **78 %** | Bueno | Nivel 3 |
| **Performance (P)** | 72 % | **70 %** | Regular | Nivel 2 |
| **Supportability (S)** | 76 % | **74 %** | Bueno | Nivel 3 |
| **Seguridad (+)** | 78 % | **76 %** | Bueno | Nivel 3 |
| **Arquitectura** | 88 % | **88 %** | Bueno | Nivel 4 |
| **Calidad general FURPS** | 79 % | **77 %** | Bueno | Nivel 3 |

**Remediación FURPS post-Paso 02:** 0 % (0/18 hallazgos FUR implementados).

### 4.2 Módulos funcionales — estado final

| Módulo | Cumplimiento | Estado operativo |
|--------|--------------|------------------|
| Login / JWT | 95 % | Excelente |
| Usuarios, productores, producción | 88–90 % | Bueno |
| Lotes | 65 % | Regular — TX pendiente |
| Trazabilidad, reportes, chatbot | 88–90 % | Bueno |
| Dashboard, auditoría | 85 % | Bueno |
| IA / predicciones | 75 % | Bueno — heurístico |

---

## 5. Resultados OWASP consolidados

### 5.1 Dashboard OWASP (Pasos 05 y 06 — idénticos)

| Categoría | Cumplimiento | Riesgo | Estado |
|-----------|--------------|--------|--------|
| A01 Broken Access Control | 78 % | Alto | Cumple parcialmente |
| A02 Cryptographic Failures | 85 % | Medio | Cumple |
| A03 Injection | 88 % | Medio | Cumple |
| A04 Insecure Design | 80 % | Medio | Cumple parcialmente |
| A05 Security Misconfiguration | 68 % | Alto | Cumple parcialmente |
| A06 Vulnerable Components | 55 % | Medio | No cumple |
| A07 Auth Failures | 72 % | Alto | Cumple parcialmente |
| A08 Data Integrity | 62 % | Medio | Cumple parcialmente |
| A09 Logging & Monitoring | 75 % | Medio | Cumple parcialmente |
| A10 SSRF | 95 % | Bajo | Cumple |
| **Seguridad OWASP global** | **76 %** | Medio-Alto | Bueno |

**Remediación OWASP post-Paso 05:** 0 % (0/15 hallazgos OW implementados).

---

## 6. Análisis global por dimensión

| Dimensión | % | Evaluación |
|-----------|---|------------|
| **Arquitectura** | 88 % | Hexagonal de 4 capas; 13 módulos API; modularidad 88 % |
| **Calidad código** | 75 % | Tests OK; ESLint 189 issues; 0 % cobertura Sonar |
| **Calidad documental** | 88 % | Plan-de-Pruebas extenso; README; HU en app |
| **Base de datos** | 80 % | 39 tablas, FK; SQL parametrizado; TX lotes ausente |
| **API REST** | 85 % | JWT, RBAC, validators; health expone metadatos |
| **Frontend** | 78 % | 15 páginas, AdminRoute; localStorage tokens |
| **Backend** | 82 % | Middleware sólido; brechas config y auth |
| **Infraestructura** | 75 % | Railway + Vercel operativos; CORS/health débiles |
| **Despliegue** | 90 % | Producción activa; sin CD automatizado |
| **Pruebas** | 75 % | Unit + E2E local; CI incompleto |
| **Mantenibilidad** | 88 % | Capas claras, validators reutilizables |
| **Escalabilidad** | 70 % | Pool MySQL configurable; sin IaC |
| **Seguridad** | 76 % | Controles base buenos; 4 hallazgos Altos |
| **Disponibilidad** | 95 % | JMeter 500/500; health OK |

---

## 7. Indicadores finales

| Indicador | Valor | Clasificación |
|-----------|-------|---------------|
| Cumplimiento FURPS+ | **77 %** | Bueno |
| Cumplimiento OWASP | **76 %** | Bueno |
| Calidad arquitectónica | **88 %** | Bueno |
| Calidad funcional | **83 %** | Bueno |
| Calidad técnica | **75 %** | Bueno |
| Calidad documental | **88 %** | Bueno |
| Nivel de seguridad | **76 %** | Bueno |
| Nivel DevOps | **72 %** | Regular-Bueno |
| Nivel QA | **75 %** | Bueno |
| **Nivel general del proyecto** | **77 %** | **Bueno** |
| Madurez del software | **Nivel 3 — Definido** | Controles establecidos |
| Riesgo global | **Medio-Alto** | 1 Crítico + 7 Altos |
| Preparación producción | **82 %** | Apta con deuda técnica |
| Cumplimiento ICACIT | **78 %** | Evidencias trazables P1–P6 |

---

## 8. Hallazgos consolidados (deduplicados)

Se unificaron **33 hallazgos** originales (18 FUR + 17 IMP-H con solapamiento + 15 OW) en **24 hallazgos únicos** (CON-001 a CON-024).

| Severidad | Cantidad | IDs representativos |
|-----------|----------|-------------------|
| Crítico | 1 | CON-001 (transacción lotes) |
| Alto | 6 | CON-002 a CON-007 |
| Medio | 14 | CON-008 a CON-020 |
| Bajo | 3 | CON-021 a CON-024 |

**Crítico y prioritarios:** CON-001 (integridad datos), CON-002/003 (config seguridad), CON-004 (permisos), CON-005 (CVE HIGH), CON-006 (CI E2E), CON-007 (backups).

Detalle completo: `Evidencias/Matriz_Consolidada_Hallazgos.md`.

---

## 9. Fortalezas consolidadas

1. Sistema **operativo en producción** (Railway + Vercel) con disponibilidad documentada 100 % en health.
2. **Arquitectura hexagonal** madura (88 %) con separación clara de responsabilidades.
3. **Autenticación robusta:** JWT, bcrypt, secreto ≥32 chars, adminGuard, IDOR en servicios.
4. **Protección inyección:** SQL parametrizado, sqlScope, corrección Sonar reportes.
5. **Auditoría HTTP** transversal con tabla `auditoria_logs`.
6. **Cobertura funcional PMV:** 48/59 features, 13/13 Cypress, 13 APIs REST.
7. **Documentación ICACIT:** 6 pasos con matrices, dashboards y evidencias copiadas.
8. **SSRF mitigado:** Sin requests salientes en backend (A10: 95 %).

---

## 10. Debilidades y riesgos consolidados

| Debilidad | Impacto | Pasos origen |
|-----------|---------|--------------|
| Cero remediación post-auditoría | Deuda técnica acumulada | P03, P06 |
| Transacción lotes ausente | Integridad datos | P02, P05, P06 |
| Health + CORS expuestos | Superficie ataque | P05, P06 |
| 8 CVE npm abiertos | Supply chain | P02, P05, P06 |
| CI incompleto (E2E, audit, integración) | Regresiones | P02, P03, P06 |
| Cobertura 0 % Sonar | Deuda invisible | P02, P03 |

**Riesgo global:** Medio-Alto — operación viable pero con brechas de seguridad y calidad no cerradas.

---

## 11. Estado general del proyecto

CAFE-IA es un **sistema de gestión cafetalera funcional, desplegado y documentado** que alcanza un **77 % de calidad integral (Bueno)** según la consolidación FURPS+ y OWASP. La evaluación de seis pasos demuestra **rigor metodológico ICACIT** con evidencias trazables.

El veredicto integral es: **APTO PARA PRODUCCIÓN ACADÉMICA Y OPERATIVA CON DEUDA TÉCNICA DOCUMENTADA**, condicionado a ejecutar el plan consolidado de mejoras (CON-001 a CON-007 en prioridad P1) antes de un despliegue productivo de mayor exigencia.

El Paso 08 (Conclusión General) cerrará el ciclo con recomendaciones estratégicas de evolución.

---

*Informe ejecutivo consolidado — Auditoría Final Integral — CAFE-IA.*
