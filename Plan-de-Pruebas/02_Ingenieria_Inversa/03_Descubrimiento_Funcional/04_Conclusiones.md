# 04 — Conclusiones — Descubrimiento Funcional

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Fecha:** 2026-06-24  
**Actividad:** Ingeniería Inversa — Paso 3

---

## Cobertura funcional del sistema

El análisis de ingeniería inversa sobre el repositorio CAFE-IA confirma una **plataforma web operativa** orientada a la trazabilidad del café, con **15 vistas funcionales** (más login), **13 grupos de rutas API REST** y **12 historias de usuario** documentadas en la propia aplicación, todas con estado **Implementado**.

Se inventariaron **59 funcionalidades** distribuidas en ocho categorías (autenticación, administración, producción, trazabilidad, calidad, inteligencia artificial, reportes y configuración/sistema). De ellas, **48 están completas**, **7 parciales** y **4 no implementadas** en la capa de aplicación.

La cobertura funcional estimada respecto al dominio modelado en base de datos y documentación de arquitectura es del **88 %**, considerando entidades presentes en el esquema MySQL que no están expuestas en API ni interfaz.

---

## Módulos completamente implementados

Los siguientes módulos cumplen el ciclo completo vista ↔ API ↔ persistencia, con reglas de negocio verificables:

| Área | Módulos |
|------|---------|
| **Autenticación** | Login, logout, JWT, refresh token, roles admin/cliente con scope `user_id` |
| **Gestión** | Usuarios (CRUD admin), productores (CRUD completo), producción |
| **Procesos** | Trazabilidad (timeline + QR), control de calidad, dashboard, reportes (JSON + PDF/Excel) |
| **Inteligencia Artificial** | Predicción heurística v2, recomendaciones/alertas, chatbot con intents |
| **Administración** | Auditoría, base de datos (transparencia), evidencias PMV, arquitectura, historias HU |

Evidencia cruzada: 11 especificaciones Cypress (PF-01 a PF-11), 18 tests de integración backend y pruebas unitarias de dominio (calidad, predicción).

---

## Funcionalidades parcialmente implementadas

| Funcionalidad | Hallazgo |
|---------------|----------|
| **Fincas** | Entidad en MySQL y seeds; sin rutas API ni pantalla. El dato de parcela se captura en productor. |
| **Lotes** | Alta y consulta operativas; ausencia de edición y baja vía API. |
| **Inventario** | Registro automático al crear lote; sin módulo de visualización o ajuste. |
| **Configuración** | Valores iniciales por seed (`migrate.js`); sin interfaz de administración. |
| **Registro público** | Endpoint implementado; deshabilitado en producción por defecto (`ALLOW_PUBLIC_REGISTER`). |

Estas brechas no impiden la operación del núcleo PMV1/PMV2, pero generan **desalineación entre el modelo de datos y la experiencia de usuario**.

---

## Funcionalidades pendientes

Funcionalidades **no implementadas** o **no operativas en producción**, verificadas en código:

1. **Permisos granulares RBAC** — tablas `permisos` y `rol_permisos` en seeds sin uso en middleware.
2. **CRUD de fincas** como módulo independiente.
3. **Edición y eliminación de lotes** mediante API REST.
4. **Integración del modelo ML Python** (`train_model.py`) en el flujo de predicción de la API (producción usa `PredictionEngine.js`).

---

## Nivel de madurez funcional

| Dimensión | Valoración | Justificación |
|-----------|------------|---------------|
| **Núcleo operativo PMV1** | 9.5 / 10 | Productores, lotes, trazabilidad, calidad, dashboard y reportes operativos |
| **Mejoras PMV2** | 9.0 / 10 | IA, chatbot, auditoría, vistas sistema admin |
| **Alineación modelo BD ↔ UI** | 7.0 / 10 | Fincas, inventario, permisos y configuración sin exposición |
| **Cobertura pruebas E2E** | 7.5 / 10 | 11 specs; faltan módulos admin y calidad |
| **Madurez funcional global** | **8.5 / 10** | Sistema desplegable y usable; brechas acotadas y documentadas |

---

## Recomendaciones

1. **Priorizar FUNC-01 y FUNC-02** (fincas y edición de lotes) para cerrar la brecha entre esquema relacional y operación diaria.
2. **Ampliar suite Cypress** a calidad, usuarios, auditoría y base de datos (FUNC-08).
3. **Documentar explícitamente** que el motor de predicción en producción es heurístico Node.js, no el modelo RandomForest Python (FUNC-06).
4. **Completar evidencias visuales** (capturas por módulo) para el expediente ICACIT (FUNC-09).
5. **Evaluar alcance de permisos granulares**: implementar o retirar tablas huérfanas del esquema para evitar ambigüedad arquitectónica.

---

## Veredicto

CAFE-IA **cumple el alcance funcional comprometido en PMV1 y PMV2**, con trazabilidad verificable desde login hasta exportación de reportes y predicción IA. Las funcionalidades pendientes son **acotadas, identificadas y no bloquean** el despliegue actual en Railway y Vercel. El sistema es **apto para evaluación de evidencias ICACIT** con la documentación generada en este paso.

---

*Conclusión del Paso 3 — Descubrimiento Funcional. Ver `02_Resultado_IA.md`, `03_Mejoras.md` y carpeta `Evidencias/`.*
