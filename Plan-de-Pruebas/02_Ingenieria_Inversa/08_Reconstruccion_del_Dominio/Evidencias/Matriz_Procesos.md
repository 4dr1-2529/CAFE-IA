# Matriz de Procesos de Negocio — CAFE-IA

**Fecha:** 24 de junio de 2026

---

| ID | Proceso | Actor | Entrada | Salida | Regla de negocio | Estado |
|----|---------|-------|---------|--------|------------------|--------|
| PROC-01 | Autenticación (login) | Usuario, Sistema | email, password | JWT access + refresh, datos usuario | RN-01, RN-07 | Implementado |
| PROC-02 | Cierre de sesión (logout) | Usuario, Sistema | token activo | invalidación sesión | RN-07 | Implementado |
| PROC-03 | Registro público | Usuario | datos registro | cuenta cliente (parcial según config) | RN-06 | Parcial |
| PROC-04 | Gestión de usuarios | Administrador | CRUD usuario | usuario activo/inactivo | RN-04, RN-05, RN-06 | Implementado |
| PROC-05 | Gestión de productores | Admin, Cliente | datos productor | productor con código | RN-08, RN-09 | Implementado |
| PROC-06 | Gestión de fincas | — | — | — | RN-34 | **No implementado** |
| PROC-07 | Registro de lotes | Admin, Cliente | DTO lote + productor | lote, trazabilidad, inventario, QR | RN-10–RN-18 | Implementado |
| PROC-08 | Registro de producción | Admin, Cliente | evento producción | fila `produccion` | RN-04, RN-19 | Implementado |
| PROC-09 | Trazabilidad de lote | Admin, Cliente | etapas, fechas, ubicación | historial etapas | RN-16, RN-19 | Implementado |
| PROC-10 | Control de calidad | Admin, Cliente | cata sensorial 6 attrs | puntaje, clasificación | RN-20–RN-23 | Implementado |
| PROC-11 | Dashboard analítico | Admin, Cliente | token JWT | KPIs y gráficos | RN-04, RN-33 | Implementado |
| PROC-12 | Generación de reportes | Admin, Cliente | tipo reporte, filtros | JSON + export PDF/Excel | RN-27, RN-28 | Implementado |
| PROC-13 | Consulta base de datos | Admin, Cliente | nombre tabla | filas filtradas por rol | RN-32, RN-29 | Implementado |
| PROC-14 | Predicción IA bajo demanda | Admin, Cliente | lote_id | predicción, factores, alertas | RN-24–RN-26 | Implementado |
| PROC-15 | Consulta chatbot IA | Admin, Cliente | mensaje usuario | respuesta contextual | RN-31 | Implementado |
| PROC-16 | Auditoría de acciones | Administrador | filtros consulta | log `auditoria_logs` | RN-29, RN-30 | Implementado |

---

**Total procesos:** 16 (14 implementados, 1 parcial, 1 no implementado)
