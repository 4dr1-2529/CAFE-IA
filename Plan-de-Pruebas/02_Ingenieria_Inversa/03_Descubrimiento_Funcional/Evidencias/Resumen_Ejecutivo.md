# Resumen Ejecutivo — Descubrimiento Funcional CAFE-IA

**Fecha:** 2026-06-24  
**Actividad:** Ingeniería Inversa — Paso 3

---

## Totales

| Métrica | Valor |
|---------|-------|
| Módulos funcionales identificados | **25** (MOD-01 a MOD-25) |
| Funcionalidades inventariadas | **59** |
| Historias de usuario (HU) | **12** — todas implementadas |
| Casos de uso documentados | **18** |
| Vistas React (rutas) | **15** (+ login) |
| Módulos API REST | **13** grupos de rutas |
| Pruebas E2E Cypress | **11 specs / 13 tests** |

---

## Estado por categoría

| Categoría | Completo | Parcial | No implementado |
|-----------|----------|---------|-----------------|
| Autenticación | 6 | 1 | 1 |
| Administración | 8 | 0 | 0 |
| Producción | 10 | 1 | 2 |
| Trazabilidad | 5 | 0 | 0 |
| Calidad | 4 | 0 | 0 |
| IA | 5 | 0 | 1 |
| Reportes | 6 | 0 | 0 |
| Dashboard | 4 | 0 | 0 |
| Configuración/Sistema | 5 | 2 | 1 |

---

## Funcionalidades implementadas (núcleo PMV1 + PMV2)

- Login, logout, JWT, roles admin/cliente con scope `user_id`
- CRUD usuarios (admin)
- CRUD productores con código automático
- Registro y consulta de lotes + producción
- Trazabilidad con timeline y QR
- Control de calidad sensorial con puntaje
- Dashboard KPIs por rol
- Reportes con export PDF/Excel
- Predicción IA heurística v2 bajo demanda
- Chatbot con intents y datos MySQL
- Auditoría (admin)
- Base de datos, evidencias PMV, arquitectura, historias HU (admin)

---

## Funcionalidades parciales

1. **Fincas** — tabla MySQL y seeds; sin API ni pantalla dedicada (dato `parcela` en productor).
2. **Lotes** — sin PUT/DELETE; solo alta y consulta.
3. **Inventario** — insert automático al crear lote; sin módulo de gestión.
4. **Configuraciones** — seed en migrate; sin UI de administración.
5. **Registro público** — API existe; deshabilitado en producción por defecto.

---

## Funcionalidades pendientes / no implementadas

1. **Permisos granulares** (tablas `permisos`, `rol_permisos` en seeds sin uso en API).
2. **CRUD fincas** como módulo independiente.
3. **Modelo ML Python** integrado en API de producción (solo `PredictionEngine.js`).
4. **Edición y baja de lotes** vía API.

---

## Estado general

CAFE-IA implementa **el 100 % de las 12 historias de usuario** documentadas en la aplicación y cubre **PMV1 (operaciones)** y **PMV2 (IA, chatbot, auditoría)** con trazabilidad verificable en código, API y 11 pruebas Cypress.

**Cobertura funcional estimada: 88 %** del dominio cafetalero modelado (considerando entidades BD no expuestas en UI).

**Madurez funcional: 8.5 / 10**

---

*Ver `Inventario_Funcional.md` y `Matriz_Modulos.md` para detalle completo.*
