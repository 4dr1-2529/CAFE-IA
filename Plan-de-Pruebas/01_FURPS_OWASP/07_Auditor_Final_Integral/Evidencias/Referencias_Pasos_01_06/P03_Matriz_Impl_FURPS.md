# Matriz de Implementación FURPS+ — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Actividad:** Paso 03 — Verificación en código  
**Ítems verificados:** 30

---

## Resumen por área

| Área | Ítems | Cumple | Parcial | No cumple | % área |
|------|-------|--------|---------|-----------|--------|
| Frontend | 7 | 4 | 0 | 3 | 82 % |
| Backend | 8 | 5 | 0 | 3 | 81 % |
| Base datos | 3 | 1 | 0 | 2 | 76 % |
| Infraestructura | 5 | 2 | 1 | 2 | 75 % |
| Calidad | 5 | 3 | 0 | 2 | 68 % |
| Seguridad (+) | 4 | 1 | 0 | 3 | 76 % |

---

## Frontend

| ID | Requisito | Estado código | Cumplimiento | Evidencia |
|----|-----------|---------------|--------------|-----------|
| IMP-F01 | React 18 + Vite 5 | Implementado | Cumple | 15 páginas, build OK |
| IMP-F02 | Design system 14 ui | Implementado | Cumple | `components/ui/` |
| IMP-F03 | Navegación PMV | Implementado | Cumple | AppRoutes.jsx |
| IMP-F04 | Validaciones FE | Implementado | Cumple | validation.js |
| IMP-F05 | ESLint limpio | No implementado | No cumple | 2 errores |
| IMP-F06 | Accesibilidad axe | No implementado | No cumple | Pendiente |
| IMP-F07 | Lazy Recharts | No implementado | No cumple | 411 KB chunk |

---

## Backend

| ID | Requisito | Estado código | Cumplimiento | Evidencia |
|----|-----------|---------------|--------------|-----------|
| IMP-B01 | Hexagonal | Implementado | Cumple | Estructura capas |
| IMP-B02 | 13 APIs REST | Implementado | Cumple | routes/ |
| IMP-B03 | JWT ≥32 chars | Implementado | Cumple | env.js |
| IMP-B04 | RBAC | Implementado | Cumple | rbac.js |
| IMP-B05 | helmet + rate-limit | Implementado | Cumple | app.js |
| IMP-B06 | Transacción lote | **No implementado** | **No cumple** | LoteService.js |
| IMP-B07 | PUT/DELETE lotes | No implementado | No cumple | lotes.routes.js |
| IMP-B08 | Manejo errores | Implementado | Cumple | asyncHandler |

---

## Base de datos

| ID | Requisito | Estado | Cumplimiento |
|----|-----------|--------|--------------|
| IMP-BD01 | schema 39 tablas FK | Implementado | Cumple |
| IMP-BD02 | TX aplicación lote | No implementado | No cumple |
| IMP-BD03 | fincas CRUD | No implementado | No cumple |

---

## Infraestructura y calidad

| ID | Requisito | Estado | Cumplimiento |
|----|-----------|--------|--------------|
| IMP-INF01 | Railway prod | Implementado | Cumple |
| IMP-INF02 | Vercel prod | Implementado | Cumple |
| IMP-INF03 | CI pipeline | Parcial | Parcial |
| IMP-INF04 | Cypress CI | No implementado | No cumple |
| IMP-INF05 | Backups doc | No implementado | No cumple |
| IMP-Q01 | Tests 18/18 | Implementado | Cumple |
| IMP-Q02 | Cypress 13/13 | Implementado | Cumple |
| IMP-Q03 | Sonar fixes | Implementado | Cumple |
| IMP-Q04 | lcov | No implementado | No cumple |
| IMP-Q05 | JMeter negocio | No implementado | No cumple |

---

## Seguridad (+)

| ID | Requisito | Estado | Cumplimiento |
|----|-----------|--------|--------------|
| IMP-X01 | CVE react-router | No implementado | No cumple |
| IMP-X02 | CVE form-data | No implementado | No cumple |
| IMP-X03 | Vite VITE_* only | Implementado | Cumple |
| IMP-X04 | Health sin dbHost | No implementado | No cumple |

---

*Excel: `Matriz_Implementacion_FURPS.xlsx`*
