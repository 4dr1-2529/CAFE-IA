# Índice de Evidencias — Paso 9: Reconstrucción del Entorno

**Carpeta:** `09_Reconstruccion_del_Entorno/Evidencias/`  
**Fecha:** 24 de junio de 2026

---

## Documentos generados

| Archivo | Descripción |
|---------|-------------|
| `Inventario_Entorno.md` / `.xlsx` | Inventario completo del entorno |
| `Matriz_Infraestructura.md` / `.xlsx` | 20 componentes infraestructura |
| `Matriz_Herramientas.md` | Herramientas dev/deploy/QA |
| `Configuracion_Entorno.md` | Detalle configuraciones |
| `Resumen_Ejecutivo.md` | Indicadores y conclusión |
| `INDICE_EVIDENCIAS.md` | Este índice |

---

## Diagramas Mermaid

| .mmd | .md | Contenido |
|------|-----|-----------|
| `Diagrama_Entorno.mmd` | `Diagrama_Entorno.md` | Entorno desarrollo local |
| `Diagrama_Infraestructura.mmd` | `Diagrama_Infraestructura.md` | GitHub, Railway, Vercel, QA |
| `Diagrama_Despliegue.mmd` | `Diagrama_Despliegue.md` | Flujo CI → producción |
| `Diagrama_Cliente_Servidor.mmd` | `Diagrama_Cliente_Servidor.md` | Secuencia HTTPS JWT |
| `Diagrama_Comunicacion.mmd` | `Diagrama_Comunicacion.md` | Capas comunicación |

---

## Evidencias copiadas del repositorio

| Archivo | Origen | Estado |
|---------|--------|--------|
| `backend_env.example` | `backend/.env.example` | Copiado |
| `frontend_env.example` | `frontend/.env.example` | Copiado |
| `package_root.json` | `package.json` | Copiado |
| `package_backend.json` | `backend/package.json` | Copiado |
| `package_frontend.json` | `frontend/package.json` | Copiado |
| `vercel.json` | `frontend/vercel.json` | Copiado |
| `render.yaml` | raíz monorepo | Copiado |
| `sonar-project.properties` | raíz | Copiado |
| `github_actions_ci.yml` | `.github/workflows/ci.yml` | Copiado |
| `schema.sql` | `backend/sql/schema.sql` | Copiado |
| `README_proyecto.md` | `README.md` | Copiado |
| `prueba_500_requests.jmx` | `testing/metricas/jmeter/` | Copiado |
| `resultado_jmeter.csv` | jmeter | Copiado |
| `railway_health_response.json` | Paso 01 logs | Copiado |
| `vercel_status.json` | Paso 01 logs | Copiado |
| `cypress_last-run.json` | Paso 01 logs | Copiado |
| `jmeter_resumen.json` | Paso 01 logs | Copiado |
| `hallazgos_sonar.md` | Paso 01 logs | Copiado |
| `CORRECCIONES_SONARQUBE.md` | Paso 01 logs | Copiado |

---

## Evidencias pendientes de incorporar

| Evidencia solicitada | Estado |
|---------------------|--------|
| `railway.json` | **No existe en repositorio** |
| `package-lock.json` (copia) | No copiado (archivos voluminosos; existen en repo) |
| `backend/.env` (real) | No copiado (contiene secretos) |
| Capturas panel Railway | Evidencia pendiente de incorporar |
| Capturas panel Vercel | Evidencia pendiente de incorporar |
| Reportes Cypress videos | Evidencia pendiente de incorporar |
| Evidencias PMV1 despliegue | Evidencia pendiente de incorporar |

---

## Referencias cruzadas

- Paso 01: `01_Analisis_de_Logs/` (health Railway, Cypress, Sonar)
- Paso 04: `04_Descubrimiento_Tecnologico/`
- Paso 07: `07_Reconstruccion_Arquitectonica/`
- Reporte: `cafe-cursor/Reporte-Calidad-Software/`
