# Índice de Evidencias — Paso 7 Reconstrucción Arquitectónica

**Fecha:** 2026-06-24

---

## Documentos de arquitectura generados

| Archivo | Descripción |
|---------|-------------|
| `Arquitectura_Logica.md` | Capas hexagonal + módulos |
| `Arquitectura_Fisica.md` | Nodos Vercel/Railway/MySQL |
| `Arquitectura_Componentes.md` | Inventario BE/FE/BD |
| `Arquitectura_Despliegue.md` | Pipeline prod y variables |
| `Flujo_Datos.md` | Flujos auth, lote, IA, RBAC |
| `Inventario_Componentes.md` / `.xlsx` | Clasificación arquitectónica |
| `Matriz_Componentes.md` / `.xlsx` | REC-001–REC-030 |
| `Resumen_Ejecutivo.md` | Síntesis ICACIT |

---

## Diagramas Mermaid (7 × 2 formatos)

| Diagrama | .mmd | .md |
|----------|------|-----|
| General del Sistema | Diagrama_General.mmd | Diagrama_General.md |
| Componentes | Diagrama_Componentes.mmd | Diagrama_Componentes.md |
| Capas | Diagrama_Capas.mmd | Diagrama_Capas.md |
| Cliente-Servidor | Diagrama_Cliente_Servidor.mmd | Diagrama_Cliente_Servidor.md |
| Despliegue | Diagrama_Despliegue.mmd | Diagrama_Despliegue.md |
| Flujo de Datos | Diagrama_Flujo_Datos.mmd | Diagrama_Flujo_Datos.md |
| Comunicación módulos | Diagrama_Comunicacion_Modulos.mmd | Diagrama_Comunicacion_Modulos.md |

---

## Evidencias copiadas del proyecto

| Archivo | Origen |
|---------|--------|
| schema.sql | backend/sql/ |
| vercel.json | frontend/ |
| render.yaml | raíz |
| backend_env.example.txt | backend/.env.example |
| README_proyecto.md | README.md |
| DOCUMENTACION_TECNICA.md | docs/ |
| der-relaciones-completas.md | docs/Arquitectura |
| arquitectura-propuesta.mmd | docs/Arquitectura (referencia) |
| routes_api_index.js | backend routes |
| AppRoutes.jsx | frontend routes |
| ci.yml | GitHub Actions |
| sonar-project.properties | raíz |
| jmeter_resumen.json | Reporte calidad |
| cypress_last-run.json | Reporte calidad |
| hallazgos_sonar.md | Reporte calidad |

---

## Evidencias pendientes de incorporar

| ID | Tipo | Descripción |
|----|------|-------------|
| E-REC-01 | UML | Diagramas UML .puml / .xmi — no existen |
| E-REC-02 | PNG | Export PNG diagramas Mermaid renderizados |
| E-REC-03 | PNG | Panel Railway architecture |
| E-REC-04 | PNG | Vercel analytics |
| E-REC-05 | JSON | OpenAPI spec |

> Evidencia pendiente de incorporar.

---

## Referencia Pasos 1–6

Pasos anteriores de Ingeniería Inversa utilizados como base de reconstrucción.

---

*Índice ICACIT — Paso 7 Reconstrucción Arquitectónica.*
