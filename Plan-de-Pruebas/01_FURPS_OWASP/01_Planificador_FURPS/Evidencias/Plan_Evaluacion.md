# Plan de Evaluación FURPS+ — CAFE-IA

**Versión:** 1.0  
**Fecha:** 24 de junio de 2026  
**Responsable fase:** Planificador FURPS (Paso 01)

---

## 1. Propósito

Establecer el plan formal de evaluación de calidad del sistema CAFE-IA según el modelo FURPS+, como base para la auditoría del Paso 02 y la verificación de implementación del Paso 03.

---

## 2. Sistema bajo evaluación

| Atributo | Valor |
|----------|-------|
| Nombre | CAFE-IA (Café Sostenible AI) |
| Tipo | Monorepo full-stack web |
| Backend | Node.js 20, Express, MySQL |
| Frontend | React 18, Vite 5, Tailwind |
| Arquitectura | Hexagonal |
| Producción API | Railway |
| Producción SPA | Vercel (cafe-ia-inky.vercel.app) |
| Roles | admin (global), cliente (scope user_id) |

---

## 3. Fases del plan

| Fase | Actividad | Entregable | Duración estimada |
|------|-----------|------------|-------------------|
| **1** | Planificación FURPS+ | Matriz, checklist, cronograma | Completada (este paso) |
| **2** | Auditoría FURPS+ | Informe con Cumple/Parcial/No cumple por criterio | 3–5 días |
| **3** | Auditor implementación | Verificación de mejoras en código | 2–3 días |
| **4** | Integración OWASP | Bloque paralelo 04–06 | Según cronograma global |
| **5** | Auditoría final integral | Consolidación FURPS + OWASP | 1–2 días |

---

## 4. Equipo y roles (planificado)

| Rol | Responsabilidad |
|-----|-----------------|
| Arquitecto / Planificador | Definir criterios y alcance (Paso 01) |
| Auditor FURPS | Ejecutar evaluación contra matriz (Paso 02) |
| Auditor implementación | Verificar mejoras aplicadas (Paso 03) |
| QA | Cypress, JMeter, evidencias de prueba |
| DevOps | Railway, Vercel, CI, variables entorno |

---

## 5. Criterios de aceptación del plan

- [x] 48 criterios FURPS+ definidos en matriz
- [x] 19 componentes mapeados
- [x] Checklist por categoría generado
- [x] Cronograma de evaluación definido
- [x] Evidencias base copiadas al directorio
- [ ] Evidencias pendientes incorporadas antes de sustentación ICACIT

---

## 6. Referencias

- `02_Resultado_IA.md` — Plan detallado
- `Evidencias/Matriz_FURPS.md` — Criterios completos
- `Plan-de-Pruebas/02_Ingenieria_Inversa/` — Contexto y hallazgos HAL
- `cafe-cursor/README.md` — Documentación del proyecto

---

*Plan aprobado para iniciar auditoría FURPS+ — Paso 02.*
