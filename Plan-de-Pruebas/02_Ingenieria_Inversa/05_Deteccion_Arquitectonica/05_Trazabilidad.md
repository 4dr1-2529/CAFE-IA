# 05 — Trazabilidad — Detección Arquitectónica

**Proyecto:** CAFE-IA  
**Actividad:** Ingeniería Inversa — Paso 5  
**Fecha del análisis:** 2026-06-24

---

## Objetivo

Detectar, documentar y evaluar la **arquitectura realmente implementada** en CAFE-IA — estilos arquitectónicos, componentes por capa, patrones de diseño, integraciones y despliegue — mediante ingeniería inversa sobre código fuente y artefactos de configuración, generando evidencia para evaluación ICACIT.

---

## Carpetas analizadas

| Carpeta | Propósito |
|---------|-----------|
| `cafe-cursor/backend/src/domain/` | Lógica dominio IA |
| `cafe-cursor/backend/src/application/` | Services, validators |
| `cafe-cursor/backend/src/infrastructure/` | Repositories, database |
| `cafe-cursor/backend/src/interfaces/http/` | Controllers, routes, middleware |
| `cafe-cursor/backend/src/shared/` | Utilidades transversales |
| `cafe-cursor/backend/src/config/` | Configuración entorno |
| `cafe-cursor/backend/sql/` | Schema, seeds, views |
| `cafe-cursor/frontend/src/pages/` | Vistas por módulo |
| `cafe-cursor/frontend/src/components/` | UI, features, guards |
| `cafe-cursor/frontend/src/routes/` | Routing SPA |
| `cafe-cursor/frontend/src/context/` | Providers React |
| `cafe-cursor/frontend/src/services/` | Cliente API |
| `cafe-cursor/docs/Arquitectura de la solución planteada/` | Documentación arquitectura |

---

## Archivos inspeccionados (muestra representativa)

| Archivo | Hallazgo clave |
|---------|----------------|
| `backend/src/app.js` | Pipeline middleware hexagonal entrada |
| `backend/server.js` | Bootstrap Railway + migrate |
| `backend/src/interfaces/http/routes/index.js` | 13 módulos API montados |
| `backend/src/interfaces/http/controllers/LoteController.js` | Patrón controller estático |
| `backend/src/application/services/LoteService.js` | Orquestación 5 repos |
| `backend/src/application/services/PrediccionService.js` | Fachada predicción |
| `backend/src/application/services/PredictionService.js` | SQL inline (excepción) |
| `backend/src/domain/PredictionEngine.js` | Dominio puro IA |
| `backend/src/infrastructure/repositories/LoteRepository.js` | Repository pattern |
| `backend/src/shared/RoleHelper.js` | RBAC scope |
| `backend/sql/schema.sql` | 39 tablas, FK |
| `frontend/src/routes/AppRoutes.jsx` | 15 rutas lazy |
| `frontend/src/layouts/MainLayout.jsx` | Shell navegación |
| `frontend/src/services/api/client.js` | Adaptador HTTP fetch |
| `frontend/src/constants/projectStructure.js` | Árbol arquitectura UI |
| `frontend/vercel.json` | Despliegue SPA |
| `render.yaml` | Blueprint alternativo |

Copias en `Evidencias/`.

---

## Componentes identificados

| Categoría | Cantidad |
|-----------|----------|
| Controllers | 13 |
| Services | 17 |
| Repositories | 11 |
| Routes | 14 |
| Middleware | 4 |
| Validators | 7 |
| Shared utils | 13 |
| Domain | 1 |
| Frontend pages | 15 |
| Frontend components | 17 |
| Context/Hooks | 5 |
| Tablas MySQL | 39 |
| **Matriz COM** | **51** |

---

## Patrones detectados

1. Arquitectura Hexagonal  
2. Arquitectura por Capas  
3. Cliente-Servidor  
4. Modularización por dominio  
5. REST API  
6. Repository Pattern  
7. MVC adaptado  
8. Middleware Pattern  
9. DTO/Validator  
10. Context Provider + Lazy Loading (FE)

**No detectado:** Dependency Injection (IoC container).

Detalle en `Evidencias/Patrones_Arquitectonicos.md`.

---

## Evidencias recopiladas

Ver `Evidencias/INDICE_EVIDENCIAS.md`. Resumen:

- schema.sql, vercel.json, render.yaml, env.example
- Documentación arquitectura + DER + Mermaid
- projectStructure.js, AppRoutes.jsx, routes_api_index.js
- hallazgos_sonar.md, sonar-project.properties
- 8 documentos generados + 2 Excel

**Pendientes:** UML formal, capturas Railway/Vercel, OpenAPI export.

---

## Documentos generados

| Documento | Ruta |
|-----------|------|
| Prompt original | `01_Prompt.md` |
| Análisis arquitectónico | `02_Resultado_IA.md` |
| Plan mejoras | `03_Mejoras.md` |
| Conclusiones | `04_Conclusiones.md` |
| Trazabilidad | `05_Trazabilidad.md` |
| Inventario componentes | `Evidencias/Inventario_Componentes.md` / `.xlsx` |
| Matriz componentes | `Evidencias/Matriz_Componentes.md` / `.xlsx` |
| Dependencias | `Evidencias/Matriz_Dependencias_Componentes.md` |
| Patrones | `Evidencias/Patrones_Arquitectonicos.md` |
| Resumen ejecutivo | `Evidencias/Resumen_Ejecutivo.md` |

---

## Relación con pasos anteriores

| Paso | Aporte |
|------|--------|
| Paso 3 Funcional | Módulos ↔ componentes arquitectónicos |
| Paso 4 Tecnológico | Stack ↔ capas y adaptadores |

---

## Restricciones cumplidas

- No se modificó ningún archivo del proyecto CAFE-IA.
- No se inventó arquitectura; componentes inexistentes indicados explícitamente.
- Sin instrucciones de IA en documentos finales.

---

**Fecha de cierre del análisis:** 2026-06-24
