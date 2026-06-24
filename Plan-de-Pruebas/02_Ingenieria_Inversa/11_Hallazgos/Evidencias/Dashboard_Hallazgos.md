# Dashboard de Hallazgos — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Alcance:** Consolidación Pasos 1–10

---

## 1. Resumen global

| Indicador | Valor |
|-----------|-------|
| **Total hallazgos registrados** | 55 |
| Hallazgos de mejora (HAL-001–048) | 48 |
| Hallazgos positivos verificados (HAL-P01–P07) | 7 |
| **Pendientes de acción** | 46 |
| **Corregidos / verificados** | 9 |

---

## 2. Distribución por prioridad (mejoras pendientes)

| Prioridad | Cantidad | % |
|-----------|----------|---|
| **Crítica** | 1 | 2,2 % |
| **Alta** | 10 | 21,7 % |
| **Media** | 22 | 47,8 % |
| **Baja** | 13 | 28,3 % |
| **Total pendientes** | **46** | 100 % |

---

## 3. Distribución por categoría

| Categoría | Hallazgos |
|-----------|-----------|
| Infraestructura / DevOps | 12 |
| Dependencias / Seguridad npm | 7 |
| Dominio / Base de Datos | 9 |
| Arquitectura | 6 |
| Calidad / Testing | 8 |
| Configuración / Variables entorno | 6 |
| Frontend | 4 |
| Rendimiento | 2 |
| Machine Learning | 1 |

---

## 4. Estado de hallazgos

| Estado | Cantidad | IDs representativos |
|--------|----------|---------------------|
| **Corregido** | 2 | HAL-001, HAL-P06 |
| **Verificado (positivo)** | 6 | HAL-P01–P05, HAL-P07 |
| **Pendiente** | 46 | HAL-002–HAL-048 (excepto HAL-001) |
| **En progreso** | 0 | — |

---

## 5. Hallazgos críticos y altos (pendientes)

| ID | Hallazgo | Prioridad | Categoría |
|----|----------|-----------|-----------|
| HAL-003 | LoteService sin transacción SQL | Crítica | Base de Datos |
| HAL-002 | ADMIN_SEED_PASSWORD ausente prod | Alta | Configuración |
| HAL-005 | Fincas sin módulo | Alta | Dominio |
| HAL-006 | Schema hinchado vs app | Alta | Dominio/BD |
| HAL-008 | Lotes sin PUT/DELETE | Alta | Backend |
| HAL-010 | Cypress fuera CI | Alta | DevOps |
| HAL-013 | CVE react-router | Alta | Seguridad |
| HAL-028 | JWT_SECRET sin rotación | Alta | Configuración |
| HAL-035 | Backups MySQL no documentados | Alta | Infraestructura |
| HAL-037 | E2E incompleto módulos admin | Alta | Calidad |
| HAL-048 | Riesgo commit `.env` | Alta | Configuración |

---

## 6. Fortalezas verificadas (dashboard positivo)

| Métrica | Valor | Fuente |
|---------|-------|--------|
| Tests backend | 18/18 OK | Paso 01 |
| Cypress E2E local | 13/13 OK | Paso 01 |
| Railway health | HTTP 200 | Paso 01 |
| Vercel frontend | HTTP 200 | Paso 01 |
| HUs implementadas | 12/12 | Paso 03 |
| Madurez arquitectónica | 8,0/10 | Paso 06 |
| Madurez dominio | 7,5/10 | Paso 08 |
| Variables entorno core | 7,5/10 | Paso 10 |

---

## 7. Evolución por paso fuente

| Paso | Hallazgos únicos aportados |
|------|---------------------------|
| 01 Análisis Logs | 25 (base LOG-*) |
| 02 Dependencias | 8 CVE/deps |
| 03 Funcional | 8 brechas funcionales |
| 04 Tecnológico | 6 stack/CI |
| 05 Detección arq. | 10 violaciones |
| 06 Evaluación arq. | 8 atributos calidad |
| 07 Reconstrucción arq. | 6 refactor |
| 08 Dominio | 10 dominio/BD |
| 09 Entorno | 9 infra/DevOps |
| 10 Variables env | 8 configuración |

*Consolidados sin duplicar en 48 HAL únicos.*

---

## 8. Tendencia recomendada

```text
Críticos/Altos pendientes: 11 → objetivo 0 en 4–6 semanas
Medios pendientes: 22 → backlog priorizado trimestral
Evidencias ICACIT: 38 % completas (capturas pendientes)
```
