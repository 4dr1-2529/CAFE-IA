# Métricas de Machine Learning — Semana 10

**Proyecto:** CAFE-IA · Café Sostenible AI

## Definición de métricas

| Métrica | Objetivo |
|---|---|
| Accuracy | Precisión global |
| Precision | Exactitud positiva |
| Recall | Sensibilidad |
| F1-Score | Balance ML |

## Contexto del proyecto (analizado en código)

| Componente | Ubicación | Rol |
|------------|-----------|-----|
| Motor en producción | `backend/src/domain/PredictionEngine.js` (v2.0-heuristic) | Predicción bajo demanda vía `POST /api/predicciones/ejecutar` |
| Pruebas unitarias | `backend/tests/prediction.test.js` | Valida salidas del motor (calidad, confianza, riesgo, alertas) — **no calcula Accuracy/Precision/Recall/F1** |
| Evidencia académica Python | `ml/train_model.py` + `ml/data/dataset_cafe.csv` | Entrenamiento `RandomForestClassifier` (PMV3 evidencia universitaria) |
| Módulo IA en UI | `frontend/src/pages/ia/ModuloIAPage.jsx` | Una predicción por lote; datos persistidos en `predicciones_ia` |

## Resultados reales de evaluación ML

**Pendiente de evaluación real con registros del módulo IA.**

Motivo documentado:

1. El módulo IA en producción usa el **motor heurístico v2** (`PredictionEngine.js`), no el modelo `RandomForest` de `ml/train_model.py`.
2. No existe `ml/models/metrics.json` versionado en el repositorio (se genera al ejecutar `python ml/train_model.py` localmente).
3. No hay pipeline automatizado que calcule Accuracy, Precision, Recall ni F1-Score sobre predicciones almacenadas en MySQL (`predicciones_ia`).

### Evidencia disponible hoy (sin métricas clásicas)

| Evidencia | Resultado |
|-----------|-----------|
| `prediction.test.js` | 2 tests passed — predicción con variables óptimas y detección de humedad crítica |
| Cypress `PF-08-modulo-ia.cy.js` | 1 test passed — carga del módulo IA y selector de lotes |
| `ml/train_model.py` | Script listo para entrenar; exporta `accuracy` y `classification_report` en `models/metrics.json` **tras ejecución local** |

### Próximo paso recomendado (no ejecutado en este entregable)

Ejecutar evaluación offline comparando `calidad_predicha` / etiquetas reales de `control_calidad` o ejecutar `ml/train_model.py` y versionar `models/metrics.json` con Precision, Recall y F1-Score del `classification_report`.
