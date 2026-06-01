# Prometheus — Escalabilidad concurrente (entorno académico)

## Contexto

**Prometheus** recopila series temporales de métricas (latencia, errores, carga) en sistemas desplegados. En producción se usaría un *exporter* o instrumentación en el backend y un servidor Prometheus real.

> **Nota académica:** En este proyecto **no se instaló un cluster Prometheus** en Railway/Vercel. Para efectos del informe se **simuló** la métrica de concurrencia mediante el script `testing/metricas/scripts/generar_metricas.js`, que ejecuta **500 requests** con **50 usuarios concurrentes** contra la API desplegada. Los resultados se exportan a `simulacion_concurrencia.json` con la misma información que reportaría un scrape básico de carga.

## Métrica evaluada

| Campo | Descripción |
|-------|-------------|
| **Escalabilidad concurrente** | Capacidad del sistema ante múltiples clientes simultáneos |
| **Objetivo** | Soportar carga equivalente a **500 usuarios/requests** en la ventana de prueba |
| **Endpoint** | `GET https://cafe-sostenible-api-production-03ad.up.railway.app/api/health` |

## Resultados (última ejecución)

Consultar valores actualizados en:

- `testing/metricas/prometheus/simulacion_concurrencia.json`
- `testing/metricas/resultados_resumen.json`

### Última ejecución (2026-05-28)

| Indicador | Valor |
|-----------|--------|
| Total requests | 500 |
| Usuarios concurrentes simulados | 50 |
| Requests exitosos | 500 |
| Requests fallidos | 0 |
| Porcentaje exitoso | 100 % |
| Latencia promedio (ms) | 443,05 |
| Latencia P95 (ms) | 2614 |
| Throughput (rpm) | 6320 |

## Interpretación académica

1. **Concurrencia:** 50 peticiones en paralelo por oleadas aproximan el comportamiento de muchos clientes accediendo al health check al mismo tiempo.
2. **Porcentaje exitoso:** Si es ≥ 99 %, el servicio mantiene estabilidad bajo la carga de la prueba.
3. **Latencia:** Valores medios por debajo de 2000 ms indican que el tiempo de respuesta cumple el objetivo de la API bajo carga moderada.
4. **Limitaciones:** Railway (plan gratuito/compartido), cold start y red del evaluador afectan los números; la prueba es **reproducible** pero no sustituye un entorno Prometheus + Grafana en producción.

## Equivalencia Prometheus

En un despliegue real se registrarían métricas como:

- `http_requests_total{status="200"}`
- `http_request_duration_seconds` (histograma)
- `process_cpu_seconds_total`

El JSON `simulacion_concurrencia.json` resume esos conceptos en un único informe para el entorno de pruebas controlado.

## Regenerar datos

```bash
node testing/metricas/scripts/generar_metricas.js
```
