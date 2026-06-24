# Paso 8 — Reconstrucción del Dominio CAFE-IA

**Proyecto:** CAFE-IA (`cafe-cursor`)  
**Metodología:** Ingeniería inversa sobre código fuente, schema MySQL y documentación existente  
**Fecha:** 24 de junio de 2026  
**Restricción:** Solo dominio **realmente implementado**; entidades o reglas inexistentes se indican explícitamente.

---

## 1. Contexto del dominio

CAFE-IA es un sistema de gestión y trazabilidad del café peruano orientado a productores y administradores. El dominio gira en torno al **lote** como agregado central: desde su registro (vinculado a un productor y cliente responsable) fluyen trazabilidad, producción, evaluación de calidad, predicción IA, reportes y auditoría.

La capa de persistencia define **39 tablas** en MySQL; la aplicación expone operativamente **14 entidades** mediante API REST y 15 páginas React. Existe un componente de dominio puro **`PredictionEngine`** (heurístico v2.0) sin tabla propia.

---

## 2. Actores

| Actor | Implementación | Alcance / notas |
|-------|----------------|-----------------|
| **Administrador** | Rol `admin` en JWT y `roles` | Acceso global a usuarios, productores, lotes, auditoría y todas las consultas sin filtro `user_id` |
| **Cliente** | Rol `cliente` en JWT | Acceso restringido a registros donde `user_id` coincide con el usuario autenticado |
| **Productor** | **Entidad de negocio**, no rol de login | Cafetalero en tabla `productores`; gestionado por admin o cliente. El rol legacy `productor` en tokens se normaliza a `cliente` (`RoleHelper.js`) |
| **Usuario** | Cualquier cuenta en `usuarios` | Término genérico; requiere autenticación para operaciones protegidas |
| **Chatbot IA** | `ChatbotService` + `ChatbotDataService` | Actor/servicio PMV2; responde intents con datos MySQL según rol |
| **Sistema** | Seeds, migraciones, automatismos | Al crear lote: 5 etapas trazabilidad, fila inventario, código QR; registro en `auditoria_logs` vía `ActionLogService` |

**Aclaración crítica:** En la solicitud de análisis figura «Productor» como actor. En la implementación, **Productor es entidad** vinculada a un Cliente (`user_id`). No existe login con rol `productor` activo en runtime.

---

## 3. Entidades

### 3.1 Núcleo operativo (API + UI)

| Entidad | Tabla / componente | Módulo | Estado |
|---------|-------------------|--------|--------|
| Usuario | `usuarios` | `/usuarios`, `/api/usuarios` | Implementado |
| Rol | `roles` | Implícito en auth | Implementado (`admin`, `cliente`) |
| Sesión | `sesiones` | `/api/auth` | Implementado |
| Productor | `productores` | `/productores` | Implementado |
| Lote | `lotes` | `/lotes` | Implementado (sin PUT/DELETE) |
| Trazabilidad | `trazabilidad` | `/trazabilidad` | Implementado |
| Producción | `produccion` | `/produccion` | Implementado |
| Calidad | `control_calidad` | `/calidad` | Implementado |
| Predicción | `predicciones_ia` | `/ia` | Implementado |
| Motor IA | `PredictionEngine.js` | Dominio puro | Implementado (heurística) |
| Reporte | Servicio agregador | `/reportes` | Implementado |
| Exportación | `exportaciones` + servicio | `/api/reportes/export` | Implementado |
| Auditoría | `auditoria_logs` | `/auditoria` (solo admin) | Implementado |
| Dashboard | `dashboard_metricas` + servicio | `/` | Implementado |
| Base de datos (vista) | Múltiples tablas | `/basedatos` | Implementado |
| Chatbot | Servicio | `/chatbot-ia` | Implementado |

### 3.2 Catálogos (resolución FK / seeds)

`variedades_cafe`, `tipos_cultivo`, `procesos_secado`, `estados_lote`, `criterios_calidad`, `regiones`, `provincias`, `distritos` — presentes en BD; sin módulos CRUD dedicados en frontend.

### 3.3 Persistencia sin módulo de aplicación

`fincas`, `cosechas`, `produccion_diaria`, `inventario`, `movimientos_stock`, `evaluaciones_calidad`, `defectos_grano`, `evaluacion_defectos`, `resultados_cata`, `variables_prediccion`, `alertas_ia`, `recomendaciones_ia`, `historial_reportes`, `notificaciones`, `configuraciones`, `actividades_usuario`, `permisos`, `rol_permisos`.

### 3.4 Entidades solicitadas no implementadas

| Entidad | Estado |
|---------|--------|
| **Finca (gestión)** | Tabla `fincas` con seeds; **sin API ni UI**. Ubicación operativa en `productores.parcela` |
| **Historial (módulo)** | Tablas `historial_reportes`, `actividades_usuario` sin exposición funcional |
| **Modelo IA (ML entrenado)** | Scripts Python offline; runtime usa solo `PredictionEngine` heurístico |

Inventario completo: `Evidencias/Inventario_Entidades.md` (39 tablas + DOM-01).

---

## 4. Reglas de negocio

### 4.1 Autorización y alcance

- **RN-01:** Endpoints protegidos requieren JWT válido (`authMiddleware`, `RoleHelper.requireAuth`).
- **RN-02–RN-03:** Roles runtime `admin` y `cliente`; legacy `productor`/`supervisor` → `cliente`.
- **RN-04:** Admin sin filtro `user_id`; cliente con `scopeUserId`.
- **RN-30:** Auditoría solo administrador.

### 4.2 Usuarios

- **RN-05:** No desactivar último admin activo.
- **RN-06:** Email único.
- **RN-07:** Login emite JWT; refresh en `sesiones`.

### 4.3 Productores y lotes

- **RN-08–RN-09:** Productor acotado por `user_id`; código autogenerado.
- **RN-10–RN-12:** Validación DTO lote (campos obligatorios, positivos, fecha válida, estado en catálogo).
- **RN-13–RN-14:** Admin asigna cliente responsable; productor debe pertenecer a ese cliente.
- **RN-15–RN-17:** Código lote autogenerado; 5 etapas trazabilidad; inventario + QR al crear.
- **RN-18:** Sin actualización/eliminación de lotes vía API.

### 4.4 Calidad

- **RN-20–RN-21:** Seis atributos 1–10 → `puntaje_taza` 0–100; clasificación Excelente/Buena/Aceptable/Regular.
- **RN-22–RN-23:** Una evaluación por lote (409 si duplicado); actualiza estado del lote.

### 4.5 IA

- **RN-24:** Una predicción por lote en flujo UI.
- **RN-25–RN-26:** Heurística humedad/temperatura/altitud/variedad/secado; riesgo bajo/medio/alto.

### 4.6 Reportes, dashboard, chatbot

- **RN-27–RN-28:** Reportes por rol; export PDF/Excel.
- **RN-31–RN-33:** Chatbot con scope; base datos 7/6 tablas; KPIs dashboard.

Matriz completa (35 reglas): `Evidencias/Matriz_Reglas_Negocio.md`.

---

## 5. Procesos de negocio

### PROC-01 — Autenticación (Login)

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Identificar usuario y emitir credenciales de sesión |
| **Entradas** | `email`, `password` |
| **Salidas** | JWT access, refresh token, perfil usuario |
| **Actores** | Usuario, Sistema |
| **Reglas** | RN-01, RN-07 |
| **Dependencias** | `usuarios`, `sesiones`, bcrypt, JWT |
| **Estado** | Implementado (HU01) |

### PROC-02 — Cierre de sesión

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Invalidar sesión activa |
| **Entradas** | Token / refresh |
| **Salidas** | Confirmación logout |
| **Actores** | Usuario, Sistema |
| **Reglas** | RN-07 |
| **Dependencias** | `AuthService` |
| **Estado** | Implementado |

### PROC-03 — Registro público

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Alta de nueva cuenta cliente |
| **Entradas** | Datos de registro |
| **Salidas** | Usuario creado |
| **Actores** | Usuario |
| **Reglas** | RN-06 |
| **Dependencias** | Endpoint registro (según configuración) |
| **Estado** | Parcial |

### PROC-04 — Gestión de usuarios

| Campo | Detalle |
|-------|---------|
| **Objetivo** | CRUD de cuentas (solo admin) |
| **Entradas** | DTO usuario, rol |
| **Salidas** | Usuario activo/inactivo |
| **Actores** | Administrador |
| **Reglas** | RN-04, RN-05, RN-06 |
| **Dependencias** | `UsuarioService` |
| **Estado** | Implementado (HU02) |

### PROC-05 — Gestión de productores

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Registrar y mantener cafetaleros del cliente |
| **Entradas** | nombre, documento, parcela, etc. |
| **Salidas** | Productor con `codigo_productor` |
| **Actores** | Administrador, Cliente |
| **Reglas** | RN-08, RN-09 |
| **Dependencias** | `ProductorService`, scope rol |
| **Estado** | Implementado (HU03) |

### PROC-06 — Gestión de fincas

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Administrar fincas cafetaleras |
| **Entradas** | — |
| **Salidas** | — |
| **Actores** | — |
| **Reglas** | RN-34 |
| **Dependencias** | Tabla `fincas` sin servicio |
| **Estado** | **No implementado** |

### PROC-07 — Gestión de lotes

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Registrar lote trazable de café |
| **Entradas** | productor_id, variedad, cosecha, secado, parámetros ambientales |
| **Salidas** | Lote, trazabilidad inicial, inventario, QR |
| **Actores** | Administrador, Cliente |
| **Reglas** | RN-10–RN-18 |
| **Dependencias** | `LoteService`, catálogos, `TrazabilidadRepository` |
| **Estado** | Implementado (HU04) |

### PROC-08 — Producción

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Registrar eventos de producción por lote |
| **Entradas** | lote_id, cantidad, fecha |
| **Salidas** | Registro en `produccion` |
| **Actores** | Administrador, Cliente |
| **Reglas** | RN-04, RN-19 |
| **Dependencias** | `ProduccionService` |
| **Estado** | Implementado |

### PROC-09 — Trazabilidad

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Documentar etapas del lote |
| **Entradas** | etapa, fechas, ubicación, observaciones |
| **Salidas** | Historial de etapas |
| **Actores** | Administrador, Cliente |
| **Reglas** | RN-16, RN-19 |
| **Dependencias** | `TrazabilidadService` |
| **Estado** | Implementado (HU05) |

### PROC-10 — Control de calidad

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Evaluar calidad sensorial y clasificar |
| **Entradas** | 6 atributos 1–10, lote_id |
| **Salidas** | puntaje 0–100, calidad_final |
| **Actores** | Administrador, Cliente |
| **Reglas** | RN-20–RN-23 |
| **Dependencias** | `CalidadService.computeScores` |
| **Estado** | Implementado (HU06) |

### PROC-11 — Dashboard

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Visualizar KPIs operativos |
| **Entradas** | JWT (rol) |
| **Salidas** | Métricas y gráficos Recharts |
| **Actores** | Administrador, Cliente |
| **Reglas** | RN-04, RN-33 |
| **Dependencias** | `DashboardService` |
| **Estado** | Implementado (HU07) |

### PROC-12 — Reportes

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Consultar y exportar reportes |
| **Entradas** | tipo, filtros, formato |
| **Salidas** | JSON, PDF, Excel |
| **Actores** | Administrador, Cliente |
| **Reglas** | RN-27, RN-28 |
| **Dependencias** | `ReportesService`, pdfkit, exceljs |
| **Estado** | Implementado (HU08) |

### PROC-13 — Consulta base de datos

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Transparencia de datos MySQL |
| **Entradas** | nombre tabla |
| **Salidas** | Filas filtradas por rol |
| **Actores** | Administrador, Cliente |
| **Reglas** | RN-32, RN-29 |
| **Dependencias** | `BaseDatosService` |
| **Estado** | Implementado (HU09) |

### PROC-14 — Predicción IA

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Estimar calidad futura del lote bajo demanda |
| **Entradas** | lote_id (pendiente de predicción) |
| **Salidas** | calidad, confianza, riesgo, factores, alertas |
| **Actores** | Administrador, Cliente |
| **Reglas** | RN-24–RN-26 |
| **Dependencias** | `PredictionEngine`, `PrediccionService` |
| **Estado** | Implementado (HU10) |

### PROC-15 — Chatbot IA

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Asistencia conversacional sobre operación y arquitectura |
| **Entradas** | mensaje usuario |
| **Salidas** | respuesta por intent |
| **Actores** | Administrador, Cliente, Chatbot IA |
| **Reglas** | RN-31 |
| **Dependencias** | `ChatbotService`, MySQL |
| **Estado** | Implementado (HU11) |

### PROC-16 — Auditoría

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Consultar bitácora de acciones |
| **Entradas** | filtros (fecha, módulo, usuario) |
| **Salidas** | registros `auditoria_logs` |
| **Actores** | Administrador |
| **Reglas** | RN-29, RN-30 |
| **Dependencias** | `AuditoriaService` |
| **Estado** | Implementado (HU12) |

---

## 6. Flujo de información del dominio

```text
Cliente/Admin → Auth (JWT)
     → Productor (user_id)
          → Lote (productor_id, user_id, catálogos)
               → Trazabilidad (5 etapas auto + manual)
               → Producción
               → Calidad (1:1, puntaje)
               → Predicción IA (heurística)
     → Dashboard / Reportes / Base datos (agregación por rol)
     → Chatbot (consulta datos scope)
Admin → Auditoría (global)
Sistema → ActionLog en operaciones críticas
```

---

## 7. Diagramas

Ver carpeta `Evidencias/`:

- `Modelo_Dominio.md` / `.mmd`
- `Modelo_Conceptual.md` / `.mmd`
- `Relaciones_Entidades.md` / `.mmd`
- `Flujo_Procesos.md` / `.mmd`
- `Casos_Uso.md` / `.mmd`

---

## 8. Alineación con historias de usuario

Las 12 HUs documentadas en `HistoriasUsuarioPage.jsx` están en estado **«Implementado»**, cubriendo autenticación, usuarios, productores, lotes, trazabilidad, calidad, dashboard, reportes, base de datos, IA, chatbot y auditoría.

---

## 9. Referencias

- `backend/sql/schema.sql` — modelo de datos
- `backend/src/shared/RoleHelper.js` — RBAC y alcance
- `backend/src/application/services/*.js` — reglas de aplicación
- `backend/src/domain/PredictionEngine.js` — lógica IA
- `frontend/src/pages/sistema/HistoriasUsuarioPage.jsx` — HUs
- Pasos previos 03, 05, 07 de ingeniería inversa
