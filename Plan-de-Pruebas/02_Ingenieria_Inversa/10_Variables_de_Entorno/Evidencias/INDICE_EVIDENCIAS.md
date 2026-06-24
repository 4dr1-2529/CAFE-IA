# Índice de Evidencias — Paso 10: Variables de Entorno

**Carpeta:** `10_Variables_de_Entorno/Evidencias/`  
**Fecha:** 24 de junio de 2026

---

## Documentos generados

| Archivo | Descripción |
|---------|-------------|
| `Inventario_Variables.md` / `.xlsx` | 38 variables clasificadas |
| `Matriz_Variables.md` / `.xlsx` | Matriz ID, riesgo, recomendación |
| `Configuracion_Backend.md` | dotenv, validación, MySQL, JWT |
| `Configuracion_Frontend.md` | VITE_*, Vercel, proxy |
| `Resumen_Ejecutivo.md` | Indicadores y conclusión |
| `INDICE_EVIDENCIAS.md` | Este índice |

---

## Evidencias copiadas

| Archivo | Origen | Estado |
|---------|--------|--------|
| `backend_env.example` | `backend/.env.example` | Copiado (sin secretos reales) |
| `frontend_env.example` | `frontend/.env.example` | Copiado |
| `vercel.json` | `frontend/vercel.json` | Copiado |
| `github_actions_ci.yml` | `.github/workflows/ci.yml` | Copiado |
| `sonar-project.properties` | raíz monorepo | Copiado |
| `SONARCLOUD.md` | `docs/SONARCLOUD.md` | Copiado |
| `render.yaml` | raíz monorepo | Copiado |
| `README_variables_entorno.md` | `README.md` (sección env) | Copiado |

---

## Evidencias NO copiadas (seguridad)

| Archivo | Motivo |
|---------|--------|
| `backend/.env` | Contiene secretos potenciales |
| `frontend/.env` | Puede contener configuración local |

---

## Evidencias pendientes de incorporar

| Evidencia | Estado |
|-----------|--------|
| Capturas panel Railway (variables MYSQL*, JWT) | Evidencia pendiente de incorporar |
| Capturas panel Vercel (VITE_API_URL) | Evidencia pendiente de incorporar |
| Export documentado variables Railway | Evidencia pendiente de incorporar |
| `railway.json` | No existe en repositorio |

---

## Referencias cruzadas

- Paso 09: `09_Reconstruccion_del_Entorno/`
- Paso 01: auditorías npm, health Railway
- `Reporte-Calidad-Software/06_Evaluacion_OWASP.md` — leakage VITE_
