# Resumen Ejecutivo — Reconstrucción del Dominio CAFE-IA

**Fecha:** 24 de junio de 2026  
**Alcance:** Dominio implementado en `cafe-cursor` (backend Node.js + frontend React + MySQL)

---

## Indicadores clave

| Indicador | Valor |
|-----------|-------|
| **Entidades en schema MySQL** | 39 tablas |
| **Entidades operativas (API/UI)** | 14 |
| **Componentes de dominio puro** | 1 (`PredictionEngine`) |
| **Procesos de negocio reconstruidos** | 16 |
| **Procesos implementados** | 14 (+ 1 parcial, 1 no implementado) |
| **Actores identificados** | 6 |
| **Reglas de negocio documentadas** | 35 (32 operativas) |
| **Historias de usuario** | 12 (todas «Implementado» en UI) |

---

## Actores del dominio

| Actor | Rol en el sistema |
|-------|-------------------|
| **Administrador** | Rol `admin`; alcance global |
| **Cliente** | Rol `cliente`; alcance por `user_id` |
| **Usuario** | Término genérico para cuenta autenticada |
| **Productor** | Entidad de negocio (cafetalero), no rol de login |
| **Chatbot IA** | Servicio conversacional PMV2 |
| **Sistema** | Migraciones, seeds, automatismos (trazabilidad, inventario) |

---

## Cobertura del dominio

El núcleo del negocio cafetalero está **implementado y operativo**: gestión de productores, lotes, trazabilidad, calidad, producción, reportes, dashboard, predicción IA heurística, chatbot y auditoría.

**Brechas identificadas:**

- Gestión de **fincas** (tabla sin módulo).
- RBAC granular (`permisos`/`rol_permisos`) sin enforcement.
- Múltiples tablas de soporte (inventario, notificaciones, defectos) sin exposición funcional.
- Modelo ML Python no integrado en runtime (solo heurística).

---

## Calidad del modelo de negocio

| Dimensión | Valoración |
|-----------|------------|
| Coherencia entidad–proceso | Alta en flujo lote → trazabilidad → calidad → IA |
| Separación actor vs entidad | Media (rol «productor» legacy confunde con entidad Productor) |
| Completitud del schema vs app | Media-baja (39 tablas, ~14 expuestas) |
| Trazabilidad de reglas en código | Alta (validadores + servicios + tests) |
| Madurez global del dominio | **7,5 / 10** |

---

## Conclusión ejecutiva

CAFE-IA presenta un **dominio cafetalero funcional y trazable** alineado con PMV1 (operación) y PMV2 (IA asistida). El modelo de datos es **más amplio** que la aplicación expuesta; la reconstrucción refleja fielmente lo implementado sin extrapolar reglas inexistentes.
