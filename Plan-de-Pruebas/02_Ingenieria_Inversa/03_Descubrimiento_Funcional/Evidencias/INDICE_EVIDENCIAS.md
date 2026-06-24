# Índice de Evidencias — Paso 3 Descubrimiento Funcional

**Fecha:** 2026-06-24

---

## Evidencias incorporadas (archivos reales copiados)

| Archivo | Origen | Descripción |
|---------|--------|-------------|
| `MATRIZ_PRUEBAS_HU.md` | `cafe-cursor/docs/` | Matriz pruebas HU01–HU06 |
| `PMV2.md` | `cafe-cursor/docs/` | Evolución PMV1→PMV2 |
| `DOCUMENTACION_TECNICA.md` | `cafe-cursor/docs/` | API, arquitectura, JWT |
| `README_proyecto.md` | `cafe-cursor/README.md` | Módulos y despliegue |
| `cypress_last-run.json` | Reporte-Calidad-Software | E2E 13/13 OK |
| `README_PRUEBAS_FUNCIONALES.md` | Reporte Cypress | Inventario PF-01–PF-11 |
| `AUDITORIA_TECNICA.md` | Reporte documentación | Auditoría técnica PMV |
| `arquitectura-solucion-cafe-ia.md` | docs/Arquitectura | Arquitectura propuesta |
| `der-relaciones-completas.mmd` | docs/Arquitectura | DER Mermaid |
| `routes_frontend.js` | `frontend/src/constants/routes.js` | Rutas SPA |
| `routes_api_index.js` | `backend/.../routes/index.js` | Rutas API |

## Documentos generados en este paso

| Archivo | Descripción |
|---------|-------------|
| `Inventario_Funcional.md` | 59 funcionalidades clasificadas |
| `Matriz_Modulos.md` | 25 módulos MOD-01–MOD-25 |
| `Matriz_Modulos.xlsx` | Excel módulos |
| `Inventario_Funcional.xlsx` | Excel inventario |
| `Matriz_Casos_Uso.md` | 18 casos de uso |
| `Matriz_Historias_Usuario.md` | HU01–HU12 |
| `Resumen_Ejecutivo.md` | Síntesis ICACIT |

---

## Evidencias pendientes de incorporar

| ID | Tipo | Descripción |
|----|------|-------------|
| E-FUNC-01 | PNG | Capturas pantalla cada módulo (Login, Dashboard, Productores…) |
| E-FUNC-02 | PNG | Capturas módulos admin (Usuarios, Auditoría, Evidencias) |
| E-FUNC-03 | MP4 | Videos Cypress `testing/cypress/videos/` |
| E-FUNC-04 | PNG | Screenshots Cypress `testing/cypress/screenshots/` |
| E-FUNC-05 | PDF | Manual de usuario formal — no existe en repositorio |
| E-FUNC-06 | PNG | Dashboard producción Vercel en vivo |
| E-FUNC-07 | JSON | Export Postman colección API — no existe en repo |

> No se inventaron capturas ni manuales inexistentes.

---

## Referencia cruzada Pasos 1 y 2

| Paso | Relación |
|------|----------|
| Paso 1 Logs | Funcionalidades validadas por tests 18/18 y Cypress |
| Paso 2 Dependencias | Stack que soporta módulos (Express, React, Recharts…) |
