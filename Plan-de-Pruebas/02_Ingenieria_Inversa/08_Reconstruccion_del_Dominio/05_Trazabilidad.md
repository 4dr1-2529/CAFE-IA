# Trazabilidad — Paso 8: Reconstrucción del Dominio

**Fecha de ejecución:** 24 de junio de 2026  
**Proyecto analizado:** CAFE-IA (`cafe-cursor/`)  
**Restricción aplicada:** Sin modificación del código fuente del proyecto

---

## Objetivo

Reconstruir mediante ingeniería inversa el **dominio de negocio realmente implementado** en CAFE-IA: actores, entidades, reglas de negocio, procesos y relaciones, generando documentación y evidencias aptas para el informe de evaluación ICACIT.

---

## Entidades analizadas

**Total:** 40 elementos (39 tablas MySQL + 1 componente de dominio `PredictionEngine`)

| Categoría | Cantidad |
|-----------|----------|
| Operativas (API/UI) | 14 |
| Catálogos / seeds | 8 |
| Solo persistencia | 16 |
| Dominio puro sin tabla | 1 |

Detalle: `Evidencias/Inventario_Entidades.md`

---

## Procesos reconstruidos

**Total:** 16 procesos (PROC-01 a PROC-16)

| Estado | Cantidad |
|--------|----------|
| Implementado | 14 |
| Parcial | 1 (registro público) |
| No implementado | 1 (gestión fincas) |

Detalle: `Evidencias/Matriz_Procesos.md`

---

## Reglas de negocio identificadas

**Total:** 35 reglas (RN-01 a RN-35)  
**Operativas:** 32 | **No operativas / pendientes:** 3

Detalle: `Evidencias/Matriz_Reglas_Negocio.md`

---

## Archivos del proyecto revisados

### Backend

| Archivo | Propósito |
|---------|-----------|
| `backend/sql/schema.sql` | Modelo de datos (39 tablas) |
| `backend/src/shared/RoleHelper.js` | RBAC y alcance |
| `backend/src/application/services/AuthService.js` | Login/logout |
| `backend/src/application/services/UsuarioService.js` | Gestión usuarios |
| `backend/src/application/services/ProductorService.js` | Gestión productores |
| `backend/src/application/services/LoteService.js` | Reglas de lotes |
| `backend/src/application/services/TrazabilidadService.js` | Trazabilidad |
| `backend/src/application/services/CalidadService.js` | Control calidad |
| `backend/src/application/services/ProduccionService.js` | Producción |
| `backend/src/application/services/PrediccionService.js` | Predicción IA |
| `backend/src/application/services/ReportesService.js` | Reportes |
| `backend/src/application/services/DashboardService.js` | Dashboard |
| `backend/src/application/services/ChatbotService.js` | Chatbot |
| `backend/src/application/services/ActionLogService.js` | Auditoría |
| `backend/src/domain/PredictionEngine.js` | Motor heurístico |
| `backend/src/application/validators/*.js` | Validaciones DTO |

### Frontend

| Archivo | Propósito |
|---------|-----------|
| `frontend/src/pages/sistema/HistoriasUsuarioPage.jsx` | 12 HUs |
| Páginas en `frontend/src/pages/` | Módulos UI por dominio |

### Documentación previa

| Carpeta | Paso |
|---------|------|
| `03_Descubrimiento_Funcional/` | Casos de uso, HUs, inventario funcional |
| `05_Deteccion_Arquitectonica/` | Capas y módulos |
| `07_Reconstruccion_Arquitectonica/` | Arquitectura de referencia |

---

## Evidencias utilizadas

### Copiadas a `Evidencias/`

- `schema.sql`
- `der-relaciones-completas.md`
- `PMV2.md`
- `README_proyecto.md`
- `RoleHelper.js`
- `Matriz_Casos_Uso.md`
- `Matriz_Historias_Usuario.md`
- `MATRIZ_PRUEBAS_HU.md`

### Pendientes

- Diagramas ER en imagen
- Carpeta evidencias PMV1 dedicada
- Manuales de usuario

Registro: «Evidencia pendiente de incorporar.» en `INDICE_EVIDENCIAS.md`

---

## Documentos generados

### Raíz del paso

| Archivo | Contenido |
|---------|-----------|
| `01_Prompt.md` | Prompt original del paso |
| `02_Resultado_IA.md` | Reconstrucción completa del dominio |
| `03_Mejoras.md` | Plan de mejora (15 ítems) |
| `04_Conclusiones.md` | Conclusiones ICACIT |
| `05_Trazabilidad.md` | Este documento |

### Carpeta `Evidencias/`

| Tipo | Archivos |
|------|----------|
| Inventarios | `Inventario_Entidades.md`, `.xlsx` |
| Matrices | `Matriz_Reglas_Negocio`, `Matriz_Procesos` (.md + .xlsx) |
| Diccionario | `Diccionario_Dominio.md` |
| Resumen | `Resumen_Ejecutivo.md` |
| Índice | `INDICE_EVIDENCIAS.md` |
| Diagramas | 5 pares `.md` / `.mmd` |
| Copias | 8 archivos de evidencia del repositorio |

---

## Actores documentados

| # | Actor |
|---|-------|
| 1 | Administrador |
| 2 | Cliente |
| 3 | Usuario (genérico) |
| 4 | Productor (entidad de negocio) |
| 5 | Chatbot IA |
| 6 | Sistema |

---

## Fecha

**24 de junio de 2026**

---

*Paso 8 completado. Documentación lista para anexar al informe ICACIT.*
