# JMeter — Prueba de carga API Café Sostenible

Prueba planificada: **500 peticiones GET** al endpoint de salud en producción (Railway).

| Parámetro | Valor |
|-----------|--------|
| Protocolo | HTTPS |
| Host | `cafe-sostenible-api-production-03ad.up.railway.app` |
| Ruta | `/api/health` |
| Archivo plan | `prueba_500_requests.jmx` |
| Hilos | 50 × 10 iteraciones = 500 requests |

## Requisitos

- [Apache JMeter](https://jmeter.apache.org/download_jmeter.cgi) 5.6+ (Java 8+)
- Conexión a Internet (API en Railway)

## Cómo abrir JMeter

**Windows**

```text
C:\apache-jmeter-5.6.3\bin\jmeter.bat
```

**Linux / macOS**

```bash
./apache-jmeter-5.6.3/bin/jmeter
```

## Cargar y ejecutar la prueba

1. **File → Open** → seleccionar `testing/metricas/jmeter/prueba_500_requests.jmx`.
2. Verificar en el sampler **GET /api/health**:
   - Protocol: `https`
   - Server: `cafe-sostenible-api-production-03ad.up.railway.app`
   - Path: `/api/health`
3. En el plan, confirmar **Thread Group**: 50 usuarios, ramp-up 10 s, 10 loops.
4. Activar listeners:
   - **Summary Report**
   - **View Results Tree** (solo para depuración; desactivar en pruebas largas si ralentiza)
5. Clic en **▶ Start** (barra verde).
6. Al finalizar: en **Summary Report** → **Save Table Data** o configurar **filename** del listener a `resultado_jmeter.csv`.

## Alternativa rápida (sin GUI)

```bash
jmeter -n -t testing/metricas/jmeter/prueba_500_requests.jmx -l testing/metricas/jmeter/resultado_jmeter.csv
```

## Capturas recomendadas (evidencia informe)

1. Ventana del **Test Plan** con Thread Group y HTTP Request.
2. **Summary Report** al terminar (Average, Throughput, Error %).
3. Fragmento de **View Results Tree** con respuesta 200 en `/api/health`.
4. Archivo `resultado_jmeter.csv` abierto en Excel o editor.

## Interpretación de métricas

| Métrica JMeter | Significado | Objetivo del proyecto |
|----------------|-------------|------------------------|
| **Average** | Tiempo medio de respuesta (ms) | < 2000 ms (< 2 s) |
| **Throughput** | Requests por segundo | Convertir a rpm: × 60; objetivo **> 300 rpm** |
| **Error %** | Porcentaje de fallos | Idealmente 0 % |
| **Min / Max** | Latencia mínima y máxima | Referencia de estabilidad |
| **# Samples** | Total de muestras | Debe ser **500** |

**Requests por minuto (rpm)** ≈ `Throughput × 60`

Ejemplo: Throughput = 8.5/s → rpm ≈ 510 (cumple objetivo > 300).

## Resultados automatizados

El script Node genera el mismo CSV de referencia para el informe:

```bash
node testing/metricas/scripts/generar_metricas.js
```

Salida: `resultado_jmeter.csv` (misma carpeta).

## Objetivos vs herramienta

| Métrica | Objetivo | Evidencia |
|---------|----------|-----------|
| Tiempo respuesta API | < 2 s | Average en Summary Report |
| Requests por minuto | > 300 rpm | Throughput × 60 |
