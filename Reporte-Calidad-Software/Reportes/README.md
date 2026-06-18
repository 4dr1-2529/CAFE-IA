# Reportes — Artefactos y guías

Carpeta con **resultados reales** copiados del monorepo `cafe-cursor/` y guías para obtener los faltantes.

---

## Artefactos incluidos (copiados automáticamente)

| Archivo | Origen | Contenido |
|---------|--------|-----------|
| [cypress_last-run.json](cypress_last-run.json) | `testing/cypress/evidencias/reports/last-run.json` | **13/13 tests OK**, 2026-05-28, duración 348 s |
| [jmeter_resultado.csv](jmeter_resultado.csv) | `testing/metricas/jmeter/resultado_jmeter.csv` | **500 muestras** GET /api/health Railway |
| [jmeter_resumen.json](jmeter_resumen.json) | `testing/metricas/resultados_resumen.json` | Promedio **443.05 ms**, 0 fallos, 6320 rpm |
| [sonarqube_correcciones.md](sonarqube_correcciones.md) | `docs/sonarqube/CORRECCIONES_SONARQUBE.md` | **16 hallazgos** con mitigación documentada |
| [sonarqube_reporte.md](sonarqube_reporte.md) | `testing/metricas/sonarqube/reporte_sonarqube.md` | Plantilla métricas SonarCloud |
| [metricas_arquitectura_rendimiento.md](metricas_arquitectura_rendimiento.md) | `testing/metricas/REPORTE_METRICAS_ARQUITECTURA_RENDIMIENTO.md` | Informe métricas agregado |
| [GUIA_POSTMAN.md](GUIA_POSTMAN.md) | — | Guía paso a paso colección + Newman |
| [GUIA_SONARCLOUD.md](GUIA_SONARCLOUD.md) | — | Guía capturas dashboard SonarCloud |

---

## Resultados NO disponibles en el repositorio

### SonarCloud (métricas live)

**Estado:** Configurado en CI (`sonar-project.properties`, job `sonarcloud` en `ci.yml`) pero **sin export JSON/PDF** en el repo.

**Cómo obtener:**

1. Acceder a https://sonarcloud.io/project/overview?id=4dr1-2529_CAFE-IA
2. Tras push a `main` con secret `SONAR_TOKEN` configurado en GitHub
3. Capturar pantalla Overview (Quality Gate, Bugs, Vulnerabilities, Code Smells, Coverage)
4. Exportar o capturar Issues → filtrar Vulnerabilities
5. Guardar en `Evidencias/sonarqube/` como PNG o PDF

**Referencia offline:** `sonarqube_correcciones.md` (correcciones ya aplicadas en código).

---

### Cypress (ejecución actual)

**Estado:** Último reporte JSON del **2026-05-28** incluido. Videos/screenshots **no** estaban en el repo al auditar.

**Cómo regenerar:**

```bash
cd cafe-cursor
npm run backend    # terminal 1 — MySQL + API :3029
npm run frontend   # terminal 2 — Vite :5174
cd backend && npm run db:seed:multiusuario   # cliente1
npm run test:e2e   # desde raíz cafe-cursor
```

**Salida esperada:**

- Consola: 11 specs, 13 tests passing
- `testing/cypress/evidencias/reports/last-run.json`
- Videos: `testing/cypress/videos/` (archivados en `evidencias/videos/` si pasa 100 %)
- Screenshots: `testing/cypress/screenshots/`

Copiar JSON actualizado a `Reportes/cypress_last-run.json`.

---

### JMeter (ejecución GUI)

**Estado:** CSV y resumen JSON incluidos. Plan `.jmx` en `Evidencias/jmeter/`.

**Cómo re-ejecutar:**

```bash
jmeter -n -t cafe-cursor/testing/metricas/jmeter/prueba_500_requests.jmx \
  -l Reportes/jmeter_resultado_nuevo.csv
```

O GUI: File → Open → `prueba_500_requests.jmx` → Start → capturar Summary Report.

**Endpoint probado:** `https://cafe-sostenible-api-production-03ad.up.railway.app/api/health`

---

### Postman

**Estado:** **No existe** colección, environment ni resultados Newman en el repositorio.

**Cómo obtener:**

1. Importar manualmente endpoints desde [09_Pruebas_Postman.md](../09_Pruebas_Postman.md)
2. Crear environment: `baseUrl` = `http://localhost:3029` o URL Railway
3. Request `POST {{baseUrl}}/api/auth/login` → guardar `accessToken` en variable `token`
4. Header colección: `Authorization: Bearer {{token}}`
5. Ejecutar Collection Runner → Export Results JSON
6. Guardar como `Reportes/postman_results.json` (pendiente)

**Alternativa CLI:** `newman run CAFE-IA.postman_collection.json -e env.json --reporters cli,json`

---

## Resumen de disponibilidad

| Herramienta | En repo | En Reportes/ | Acción pendiente |
|-------------|---------|--------------|------------------|
| Cypress JSON | Sí | Sí | Regenerar si código cambió |
| Cypress video/screenshot | No | No | Ejecutar test:e2e |
| JMeter CSV/JSON | Sí | Sí | Captura GUI opcional |
| SonarCloud dashboard | No | Parcial (MD) | [GUIA_SONARCLOUD.md](GUIA_SONARCLOUD.md) |
| Postman | No | No | [GUIA_POSTMAN.md](GUIA_POSTMAN.md) |

---

## Referencia cruzada

- Documento Cypress: [08_Pruebas_Cypress.md](../08_Pruebas_Cypress.md)
- Documento JMeter: [10_Pruebas_JMeter.md](../10_Pruebas_JMeter.md)
- Documento Sonar: [07_Analisis_SonarQube.md](../07_Analisis_SonarQube.md)
- Guía capturas UI: [Evidencias/GUIA_CAPTURAS.md](../Evidencias/GUIA_CAPTURAS.md)
- Checklist avance: [Evidencias/CHECKLIST_EVIDENCIAS.md](../Evidencias/CHECKLIST_EVIDENCIAS.md)
- Trazabilidad: [13_Trazabilidad_Documental.md](../13_Trazabilidad_Documental.md)
