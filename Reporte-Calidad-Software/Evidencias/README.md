# Evidencias — Índice y artefactos

**Auditoría final:** 18-jun-2026 | **Artefactos automáticos:** 22/22 (100 %) | **Capturas UI:** 0/46 (0 %)

→ **[CHECKLIST_EVIDENCIAS.md](CHECKLIST_EVIDENCIAS.md)** — porcentaje de avance por categoría  
→ **[GUIA_CAPTURAS.md](GUIA_CAPTURAS.md)** — 48 capturas con prioridad y ubicación en informe

---

## Artefactos copiados del repositorio CAFE-IA

| Carpeta | Archivos | Descripción |
|---------|----------|-------------|
| `cypress/` | last-run.json, README | 13/13 tests OK 2026-05-28 |
| `jmeter/` | CSV, JMX, README | 500 req health Railway |
| `sonarqube/` | 4 MD | Correcciones, hallazgos, SONARCLOUD |
| `metricas/` | JSON×3, MD | JMeter resumen, Prometheus, Grafana |
| `diagramas-mermaid/` | 3 .mmd | DER y arquitectura (PNG no generados en repo) |
| `documentacion-proyecto/` | MATRIZ_HU, ESQUEMA, AUDITORIA | Docs fuente |
| `ml/` | metrics.json | Evidencia ML académica Scikit-learn |

**Búsqueda automática:** 0 imágenes PNG/JPG/HTML/PDF en `cafe-cursor/`.

---

## Prioridad de capturas manuales

| Prioridad | IDs | Módulos |
|-----------|-----|---------|
| **Alta** | E-03–E-06, E-09, E-11, E-13, E-19, E-23, E-27, E-43 | Login, dashboard, core PMV, Sonar, Vercel |
| Media | E-07–E-08, E-15–E-18, E-21–E-22, E-33–E-36 | Usuarios, calidad, reportes, Postman, JMeter GUI |
| Baja | E-38–E-46, E-47–E-48 | Railway, MySQL, CI |

---

## Comandos

```bash
cd cafe-cursor && npm run test:e2e          # Cypress
cd backend && npm run db:docs:png           # PNG desde Mermaid
```

Credenciales: `admin@cafeai.com` / `admin123` | `cliente1@cafeai.com` / `mbappe29`

---

## Trazabilidad

Ver [13_Trazabilidad_Documental.md](../13_Trazabilidad_Documental.md) — cada TR referencia evidencias E-*.
