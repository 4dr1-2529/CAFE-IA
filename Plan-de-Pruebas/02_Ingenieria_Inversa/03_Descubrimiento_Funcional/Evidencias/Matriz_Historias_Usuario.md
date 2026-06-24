# Matriz de Historias de Usuario — CAFE-IA

**Fuente verificada:** `frontend/src/pages/sistema/HistoriasUsuarioPage.jsx`  
**Fecha:** 2026-06-24

| ID | Historia | Actor | PMV | Módulo | Vista | Endpoint principal | Estado | Prueba E2E |
|----|----------|-------|-----|--------|-------|-------------------|--------|------------|
| HU01 | Iniciar sesión con JWT | admin, cliente | PMV1 | Login | /login | POST /api/auth/login | Implementado | PF-01, PF-02 |
| HU02 | Gestionar usuarios del sistema | admin | PMV1 | Usuarios | /usuarios | GET/POST/PUT /api/usuarios | Implementado | PF-11 |
| HU03 | Registrar y gestionar productores | admin, cliente | PMV1 | Productores | /productores | CRUD /api/productores | Implementado | PF-05 |
| HU04 | Registrar producción y lotes | admin, cliente | PMV1 | Registro | /registro | POST /api/lotes | Implementado | PF-06 |
| HU05 | Consultar trazabilidad de lotes | admin, cliente | PMV1 | Trazabilidad | /trazabilidad | GET /api/trazabilidad | Implementado | PF-07 |
| HU06 | Evaluar calidad del café | admin, cliente | PMV1 | Calidad | /calidad | GET/POST /api/control-calidad | Implementado | — |
| HU07 | Dashboard analítico por rol | admin, cliente | PMV1 | Dashboard | / | GET /api/dashboard/metrics | Implementado | PF-03, PF-04 |
| HU08 | Generar reportes y exportaciones | admin, cliente | PMV1 | Reportes | /reportes | GET /api/reportes/* | Implementado | PF-09 |
| HU09 | Consultar base de datos | admin, cliente | PMV1 | Base Datos | /basedatos | GET /api/base-datos | Implementado | — |
| HU10 | Predecir calidad con IA | admin, cliente | PMV2 | Módulo IA | /ia | POST /api/predicciones/ejecutar | Implementado | PF-08 |
| HU11 | Consultar Chatbot IA | admin, cliente | PMV2 | Chatbot | /chatbot-ia | POST /api/chatbot | Implementado | PF-10 |
| HU12 | Auditar acciones del sistema | admin | PMV2 | Auditoría | /auditoria | GET/POST /api/auditoria | Implementado | PF-11 |

**Resumen:** 12 historias documentadas en código — **12 Implementadas** (100 % del inventario HU en app).

---

## Historias no documentadas en HistoriasUsuarioPage (brechas arquitectura)

| Funcionalidad | Estado en sistema | Nota |
|---------------|-------------------|------|
| Gestión fincas CRUD | No implementado | Tabla BD sin API/UI |
| Permisos granulares | No implementado | Seeds sin middleware |
| Modelo ML Python en API | No implementado | Solo evidencia académica |
| Edición/eliminación lotes | No implementado | Solo POST/GET lotes |
| Configuración sistema UI | No implementado | Solo seed configuraciones |
