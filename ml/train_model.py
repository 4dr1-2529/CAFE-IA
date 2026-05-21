"""
Entrenamiento modelo calidad café — evidencia universitaria PMV3
"""
import json
import os
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib

DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'dataset_cafe.csv')
MODEL_DIR = os.path.join(os.path.dirname(__file__), 'models')

def main():
    df = pd.read_csv(DATA_PATH)
    X = df[['humedad', 'temperatura', 'altitud', 'dias_almacenamiento', 'puntaje_sensorial']]
    y = df['calidad_clase']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    pred = model.predict(X_test)
    acc = accuracy_score(y_test, pred)
    os.makedirs(MODEL_DIR, exist_ok=True)
    joblib.dump(model, os.path.join(MODEL_DIR, 'quality_model.joblib'))
    metrics = {
        'accuracy': round(float(acc), 4),
        'report': classification_report(y_test, pred, output_dict=True),
        'features': list(X.columns)
    }
    with open(os.path.join(MODEL_DIR, 'metrics.json'), 'w', encoding='utf-8') as f:
        json.dump(metrics, f, indent=2)
    print(f'Modelo guardado. Accuracy: {acc:.2%}')

if __name__ == '__main__':
    main()
