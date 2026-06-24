# Informe Ejecutivo — Conclusión General FURPS+ y OWASP — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 8 — Conclusión General  
**Fecha:** 24 de junio de 2026  
**Alcance:** Consolidación definitiva Pasos 01–07

---

## 1. Objetivo

Cerrar el ciclo de evaluación de calidad y seguridad del proyecto CAFE-IA mediante la síntesis ejecutiva de los resultados FURPS+ y OWASP Top 10 (2021), obtenidos en siete fases de planificación, auditoría y verificación de implementación, con entregables aptos para el informe académico ICACIT.

---

## 2. Metodología utilizada

La evaluación siguió un modelo bifurcado y convergente:

| Bloque | Fases | Marco |
|--------|-------|-------|
| Calidad | Pasos 01–03 | FURPS+ (48 criterios, 5 atributos + extendidos) |
| Seguridad | Pasos 04–06 | OWASP Top 10 2021 (A01–A10) |
| Integración | Paso 07 | Consolidación hallazgos y métricas |
| Cierre | Paso 08 | Conclusión general y trazabilidad |

Cada fase produjo documentación en `Plan-de-Pruebas/01_FURPS_OWASP/` sin modificar el código fuente de `cafe-cursor/`. El Paso 8 no re-ejecuta pruebas; integra exclusivamente resultados documentados.

---

## 3. Resumen de auditorías realizadas

| Paso | Denominación | Producto principal | Resultado |
|------|--------------|-------------------|-----------|
| 01 | Planificador FURPS+ | Matriz 48 criterios, cronograma | Plan aprobado |
| 02 | Auditor FURPS+ | 18 hallazgos FUR-xxx | **79 %** calidad |
| 03 | Auditor Impl. FURPS+ | Verificación código | **77 %** · 0 % remediación |
| 04 | Planificador OWASP | Plan A01–A10, 72 controles | Plan aprobado |
| 05 | Auditor OWASP | 15 hallazgos OW-xxx | **76 %** seguridad |
| 06 | Auditor Impl. OWASP | Verificación controles | **76 %** · 0 % remediación |
| 07 | Auditoría integral | 24 hallazgos CON-xxx | **77 %** global |

**Evidencias generadas en el ciclo:** más de 200 archivos (informes, matrices, Excel, logs npm/JMeter/Cypress, health Railway/Vercel).

---

## 4. Resultado FURPS+

### 4.1 Atributos (implementación verificada — Paso 03)

| Atributo | Cumplimiento | Estado |
|----------|--------------|--------|
| Functionality (F) | **83 %** | Bueno |
| Usability (U) | **78 %** | Bueno |
| Reliability (R) | **78 %** | Bueno |
| Performance (P) | **70 %** | Regular |
| Supportability (S) | **74 %** | Bueno |
| Seguridad extendida (+) | **76 %** | Bueno |
| **Cumplimiento FURPS+ global** | **77 %** | **Bueno** |

### 4.2 Síntesis funcional

El PMV documentado se materializa en 15 páginas React, 13 grupos API REST, 39 tablas MySQL y módulos operativos (login, lotes, trazabilidad, calidad, IA heurística, reportes, chatbot, auditoría). Cypress reportó 13/13 escenarios exitosos; el backend ejecutó 18/18 tests unitarios. La brecha funcional principal reside en el módulo de lotes (sin transacción SQL ni PUT/DELETE) y en entidades planificadas no expuestas (fincas).

---

## 5. Resultado OWASP

| Categoría | % | Riesgo | Estado |
|-----------|---|--------|--------|
| A01 Access Control | 78 | Alto | Parcial |
| A02 Cryptographic Failures | 85 | Medio | Cumple |
| A03 Injection | 88 | Medio | Cumple |
| A04 Insecure Design | 80 | Medio | Parcial |
| A05 Misconfiguration | 68 | Alto | Parcial |
| A06 Vulnerable Components | 55 | Medio | No cumple |
| A07 Auth Failures | 72 | Alto | Parcial |
| A08 Data Integrity | 62 | Medio | Parcial |
| A09 Logging & Monitoring | 75 | Medio | Parcial |
| A10 SSRF | 95 | Bajo | Cumple |
| **Seguridad OWASP global** | **76 %** | Medio-Alto | **Bueno** |

Los controles fundamentales (JWT, bcrypt, helmet, SQL parametrizado, auditMiddleware) están implementados. Persisten cuatro hallazgos de severidad Alta en configuración, permisos y dependencias, sin remediación aplicada.

---

## 6. Resultado arquitectónico

| Dimensión | % |
|-----------|---|
| Arquitectura hexagonal | **88 %** |
| Modularidad (13 APIs) | 88 % |
| Mantenibilidad | 88 % |
| Escalabilidad | 70 % |
| **Calidad arquitectónica** | **88 %** |

La organización en capas interfaces/application/domain/infrastructure, repositorios MySQL, validators por agregado y middleware transversal constituye la fortaleza estructural del proyecto.

---

## 7. Resultado DevOps

| Aspecto | % | Observación |
|---------|---|-------------|
| CI GitHub Actions | 68 % | Tests, build, Sonar; sin E2E ni audit bloqueante |
| Despliegue Railway + Vercel | 90 % | Producción HTTP 200 verificada |
| SHA pins Actions | Cumple | Cadena suministro |
| Backups documentados | No cumple | CON-007 |
| **Nivel DevOps** | **72 %** | Regular-Bueno |

---

## 8. Resultado QA

| Aspecto | % | Observación |
|---------|---|-------------|
| Tests backend | 100 % | 18/18 |
| Cypress E2E local | 100 % | 13/13 |
| JMeter disponibilidad | 100 % | 500/500 health |
| Cobertura Sonar | 0 % | Sin lcov |
| CI integración/E2E | No | SKIP_INTEGRATION; sin Cypress CI |
| **Nivel QA** | **75 %** | Bueno |

---

## 9. Estado general del proyecto

| Indicador | Valor |
|-----------|-------|
| Calidad general | **77 %** (Bueno) |
| Madurez | Nivel 3 — Definido |
| Riesgo global | Medio-Alto |
| Preparación producción | 82 % — Apta con deuda técnica |
| Cumplimiento ICACIT | 78 % |
| Hallazgos únicos | 24 (1 Crítico, 6 Altos) |
| Remediación | 0 % |

**Veredicto:** CAFE-IA cumple los objetivos académicos y operativos del PMV con calidad Buena, arquitectura sólida y seguridad fundamental adecuada, condicionado a la ejecución del plan de mejoras consolidado (CON-001 a CON-007 en prioridad inmediata).

---

*Informe ejecutivo — Conclusión General — Paso 08 — CAFE-IA.*
