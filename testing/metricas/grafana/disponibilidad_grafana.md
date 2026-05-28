# Grafana — Disponibilidad del servicio (entorno académico)

## Contexto

**Grafana** visualiza paneles (uptime, SLI/SLO, errores) a partir de fuentes como Prometheus, Loki o CloudWatch.

> **Nota académica:** No hay un dashboard Grafana desplegado en este repositorio. **Grafana representa la visualización de disponibilidad**; los **datos base** se generaron con una prueba de disponibilidad al endpoint en producción y se guardan en `disponibilidad_resultado.json` para documentar el informe.

## Métrica evaluada

| Campo | Valor |
|-------|--------|
| **Disponibilidad** | Porcentaje de requests exitosos en la ventana de prueba |
| **Objetivo** | **≥ 99 %** |
| **Endpoint** | `GET /api/health` (Railway) |

## Resultados

Valores actualizados en:

- `testing/metricas/grafana/disponibilidad_resultado.json`
- `testing/metricas/resultados_resumen.json`

### Última ejecución (2026-05-28)

| Indicador | Valor |
|-----------|--------|
| `total_requests` | 500 |
| `requests_exitosos` | 500 |
| `requests_fallidos` | 0 |
| `disponibilidad_porcentaje` | 100 % |
| `uptime_estimado_porcentaje` | 100 % |
| `cumple_objetivo_99` | true |

## Cómo se vería en Grafana (referencia)

En un panel real típico:

- **Stat panel:** Uptime % (últimas 24 h)
- **Time series:** Tasa de error
- **Gauge:** SLA 99 %

Los datos de `disponibilidad_resultado.json` pueden importarse a Grafana como *JSON API* o CSV en un laboratorio; aquí se entregan como evidencia estática del informe.

## Interpretación

- **Disponibilidad alta (≥ 99 %):** El endpoint de salud respondió de forma consistente durante la prueba; el servicio estuvo “disponible” para los clientes simulados.
- **Fallos puntuales:** Pueden deberse a límites de rate, cold start de Railway o latencia de red; conviene repetir la prueba y promediar si se requiere mayor rigor.
- **Alcance:** La prueba mide **disponibilidad del health check**, no de todos los módulos de negocio (login, lotes, etc.).

## Regenerar datos

```bash
node testing/metricas/scripts/generar_metricas.js
```

## Evidencia sugerida para Word

1. Captura del archivo JSON con `disponibilidad_porcentaje`.
2. Tabla del reporte final: `REPORTE_METRICAS_ARQUITECTURA_RENDIMIENTO.md`.
3. (Opcional) Mockup de panel Grafana con los mismos números del JSON.
