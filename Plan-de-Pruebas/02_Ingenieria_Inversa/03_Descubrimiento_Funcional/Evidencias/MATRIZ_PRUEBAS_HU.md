# Matriz de pruebas HU01–HU06 (PMV2)

| ID | Caso | Pasos | Resultado esperado | Automatizado |
|----|------|-------|-------------------|--------------|
| HU01 | Login admin | POST /auth/login | 200 + JWT | `integration.test.js` |
| HU01 | Listar productores | GET /productores + JWT | 200 array | `integration.test.js` |
| HU01 | Crear productor inválido | POST sin campos | 400 | validators |
| HU02 | Lotes sin token | POST /lotes | 401 | `integration.test.js` |
| HU02 | Lotes inválido | POST body vacío + JWT | 400 | `integration.test.js` |
| HU04 | Calidad puntaje | computeScores 9,9,9… | Excelente ≥85 | `calidad.service.test.js` |
| HU05 | IA motor | PredictionEngine óptimo | Alta/Media + riesgo | `prediction.test.js` |
| HU06 | Dashboard | GET /dashboard/metrics | kpis object | `integration.test.js` |

Ejecutar: `cd backend && npm test`
