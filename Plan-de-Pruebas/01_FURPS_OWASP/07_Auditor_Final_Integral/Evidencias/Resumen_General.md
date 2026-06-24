# Resumen General — Ciclo de Evaluación CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Fecha:** 24 de junio de 2026  
**Alcance:** Pasos 01–07 · FURPS+ y OWASP Top 10 2021

---

## 1. Trayectoria de evaluación

```text
┌─────────────────────────────────────────────────────────────────┐
│  FURPS+ (Pasos 01–03)          OWASP (Pasos 04–06)              │
│  Plan → Auditar 79% → Impl 77%  Plan → Auditar 76% → Impl 76%   │
│                           ↓                    ↓                 │
│              ┌──────────────────────────────────────┐           │
│              │  PASO 07 — AUDITORÍA INTEGRAL  77%    │           │
│              └──────────────────────────────────────┘           │
│                           ↓                                      │
│              Paso 08 — Conclusión General (pendiente)            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Métricas consolidadas

| Métrica | Valor | Tendencia |
|---------|-------|-----------|
| Calidad FURPS+ (auditoría) | 79 % | — |
| Calidad FURPS+ (implementación) | 77 % | -2 % |
| Seguridad OWASP | 76 % | Estable |
| Arquitectura | 88 % | Fortaleza |
| Performance | 70 % | Debilidad |
| Remediación global | 0 % | Sin mejora |
| Hallazgos únicos | 24 | Consolidados |
| Evidencias generadas | 177+ archivos | ICACIT |

---

## 3. Componentes del sistema evaluados

| Componente | Tecnología | Evaluación |
|------------|------------|------------|
| Frontend | React 18 + Vite + Tailwind | 78 % Bueno |
| Backend | Express hexagonal + JWT | 82 % Bueno |
| API REST | 13 grupos `/api` | 85 % Bueno |
| Base de datos | MySQL 39 tablas | 80 % Bueno |
| Infraestructura | Railway + Vercel | 75 % Bueno |
| CI/CD | GitHub Actions + Sonar | 68 % Regular |
| Pruebas | node:test + Cypress + JMeter | 75 % Bueno |
| Seguridad | OWASP A01–A10 | 76 % Bueno |

---

## 4. Hallazgos por origen (pre-deduplicación)

| Origen | Cantidad | Remediados |
|--------|----------|------------|
| FURPS Paso 02 (FUR) | 18 | 0 |
| FURPS Paso 03 (IMP-H) | 17 | 0 |
| OWASP Paso 05 (OW) | 15 | 0 |
| **Consolidado único (CON)** | **24** | **0** |

---

## 5. Clasificación integral

| Clasificación | Rango | CAFE-IA |
|---------------|-------|---------|
| Excelente | 90–100 % | — |
| **Bueno** | **75–89 %** | **77 % ✓** |
| Regular | 60–74 % | Performance 70 % |
| Deficiente | <60 % | A06 OWASP 55 % |

---

## 6. Preparación para producción

| Criterio | Estado |
|----------|--------|
| Funcionalidad PMV operativa | ✅ |
| Despliegue Railway/Vercel activo | ✅ |
| Autenticación y RBAC | ✅ |
| Integridad transaccional lotes | ❌ |
| CVE HIGH remediados | ❌ |
| CI completo (E2E, audit, integración) | ❌ |
| Backups documentados | ❌ |
| **Veredicto** | **82 % — Apta con deuda** |

---

## 7. Cumplimiento ICACIT

| Requisito | Evidencia |
|-----------|-----------|
| Metodología documentada | 6 pasos FURPS+OWASP |
| Matrices y dashboards | Excel + Markdown |
| Hallazgos trazables | CON-001–024 |
| Evidencias operativas | npm, JMeter, Cypress, health |
| Conclusiones profesionales | Pasos 04, 07, 08 |
| **Cumplimiento estimado** | **78 %** |

**Pendiente ICACIT:** Export SonarCloud, ZAP, backups, capturas actualizadas.

---

## 8. Recomendación estratégica

Ejecutar **Sprint P1** (CON-001 a CON-007) antes del cierre académico para elevar seguridad y calidad por encima del 85 % y reducir riesgo global a Medio.

---

*Resumen general — Auditoría Final Integral — CAFE-IA*
