# Métricas de Machine Learning — CAFE-IA

**Proyecto:** Café Sostenible AI · Semana 10  
**Última actualización:** 2026-05-31

---

## 1. Definición

| Métrica | Objetivo |
|---|---|
| Accuracy | Precisión global del clasificador |
| Precision | Exactitud de predicciones positivas |
| Recall | Sensibilidad — proporción de positivos detectados |
| F1-Score | Balance entre Precision y Recall |

---

## 2. Resultados reales

### Módulo IA en producción (runtime)

| Métrica | Resultado |
|---|---|
| Accuracy | **No aplicable** |
| Precision | **No aplicable** |
| Recall | **No aplicable** |
| F1-Score | **No aplicable** |

> **El proyecto utiliza IA basada en reglas y consultas, por lo que no se dispone de métricas clásicas de Machine Learning.**

### Evidencia técnica analizada

| Componente | Tipo real | Ubicación |
|--------------|-----------|-----------|
| Motor de predicción | **Heurístico v2.0** (reglas ponderadas, sin entrenamiento) | `backend/src/domain/PredictionEngine.js` |
| Servicio de predicción | Orquestación + persistencia MySQL | `backend/src/application/services/PredictionService.js` |
| Chatbot IA | **Intents por reglas** + consultas SQL | `ChatbotService.js`, `chatbotIntentScoring.js` |
| Tabla predicciones | Almacena salida heurística (`predicciones_ia`) | MySQL vía `PrediccionRepository` |
| Script académico ML | `RandomForestClassifier` — **no integrado en runtime** | `ml/train_model.py` |
| Dataset académico | 20 registros CSV | `ml/data/dataset_cafe.csv` |

### Pruebas verificables (no son métricas ML clásicas)

| Evidencia | Resultado | Fuente |
|-----------|-----------|--------|
| Motor heurístico — caso óptimo | Calidad Alta/Media, confianza ≥ 65 % | `backend/tests/prediction.test.js` |
| Motor heurístico — humedad crítica | Riesgo ≥ 20 %, alertas generadas | Idem |
| UI módulo IA | 1/1 test passed | `PF-08-modulo-ia.cy.js` |
| Chatbot | 1/1 test passed | `PF-10-chatbot.cy.js` |

### Script académico `ml/train_model.py` (PMV3 — no desplegado)

El repositorio incluye entrenamiento Scikit-learn como **evidencia universitaria**, desacoplado de la API (`docs/AUDITORIA_TECNICA.md`: *«no integrado en runtime»*).

| Métrica | Resultado | Notas |
|---|---|---|
| Accuracy | **No reportada en repo versionado** | `ml/models/metrics.json` no está en git |
| Precision / Recall / F1 | **No reportadas en repo versionado** | Requieren ejecutar `python train_model.py` localmente |

Ejecución local de referencia (2026-05-31, dataset 20 filas, holdout 20 % = 4 muestras): el script puede generar `metrics.json`, pero **no representa el módulo IA en producción** ni un volumen estadístico evaluable para el informe. **No se incluyen porcentajes** por no estar versionados ni integrados al sistema desplegado.

---

## 3. Interpretación

- **Producción:** `PredictionEngine` declara explícitamente `MODEL_VERSION = 'v2.0-heuristic'`. Calcula calidad, confianza, riesgo y alertas mediante **funciones de reglas** (`applyHumedad`, `applyTemperatura`, etc.), no mediante un modelo entrenado con dataset etiquetado en tiempo de inferencia.
- **Chatbot:** Clasificación por **scoring de intents** y respuestas desde plantillas + consultas MySQL; no hay modelo NLP entrenado ni matriz de confusión evaluable.
- **ML evaluable:** Existe solo como **artefacto académico** (`ml/train_model.py` + `dataset_cafe.csv` con 20 registros). No hay pipeline que compare predicciones almacenadas en `predicciones_ia` contra etiquetas reales de `control_calidad`, ni `metrics.json` versionado.
- **Conclusión para el informe:** Las métricas Accuracy, Precision, Recall y F1-Score **no aplican** al sistema desplegado. La validación real del módulo IA son **pruebas funcionales y unitarias** (2 tests Node + 1 Cypress), no métricas de clasificación supervisada.

---

## Archivos utilizados

| Archivo | Uso |
|---------|-----|
| `backend/src/domain/PredictionEngine.js` | Confirmación motor heurístico v2.0 |
| `backend/src/application/services/PredictionService.js` | Flujo POST `/api/predicciones/ejecutar` |
| `backend/tests/prediction.test.js` | Pruebas del motor (no métricas ML) |
| `backend/src/application/services/ChatbotService.js` | Chatbot por reglas |
| `ml/train_model.py` | Script académico RandomForest (no runtime) |
| `ml/data/dataset_cafe.csv` | 20 registros — evidencia PMV3 |
| `ml/README.md` | Documentación módulo ML académico |
| `docs/AUDITORIA_TECNICA.md` | Diagrama: ML no integrado en API |
| `frontend/src/pages/sistema/HistoriasUsuarioPage.jsx` | HU10 (IA), HU11 (Chatbot) |

## Resumen

| Tipo | Detalle |
|------|---------|
| **ML evaluable en producción** | **No** — IA heurística + chatbot por reglas |
| **Métricas clásicas (Accuracy, P, R, F1)** | **No disponibles** para runtime |
| **Evidencia académica** | `train_model.py` + CSV (20 filas), no integrado, sin `metrics.json` versionado |
| **Validación real del módulo IA** | `prediction.test.js` (2/2), `PF-08-modulo-ia.cy.js` (1/1) |
