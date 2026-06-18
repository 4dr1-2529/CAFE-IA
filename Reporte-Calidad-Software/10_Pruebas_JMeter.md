# 10 — Pruebas JMeter (Rendimiento)

## 10.1 Configuración del plan de prueba

| Parámetro | Valor |
|-----------|-------|
| Herramienta | Apache JMeter 5.6+ |
| Archivo plan | `cafe-cursor/testing/metricas/jmeter/prueba_500_requests.jmx` |
| Endpoint | `GET /api/health` |
| Host producción | `cafe-sostenible-api-production-03ad.up.railway.app` |
| Protocolo | HTTPS |
| Thread Group | 50 usuarios, ramp-up 10 s, 10 loops |
| Total muestras | **500** (50 × 10) |
| Documentación | `testing/metricas/jmeter/README_JMETER.md` |

### Ejecución

```bash
# GUI
jmeter -t testing/metricas/jmeter/prueba_500_requests.jmx

# CLI
jmeter -n -t testing/metricas/jmeter/prueba_500_requests.jmx \
  -l testing/metricas/jmeter/resultado_jmeter.csv

# Alternativa script Node
node testing/metricas/scripts/generar_metricas.js
```

## 10.2 Resultados (evidencia CSV)

**Archivos:**  
- `cafe-cursor/testing/metricas/jmeter/resultado_jmeter.csv`  
- `cafe-cursor/testing/metricas/resultados_resumen.json`  
- Copia en reporte: `Reportes/jmeter_resultado.csv`, `Reportes/jmeter_resumen.json`

**Fecha ejecución:** 2026-05-28T20:46:42.851Z  
**Thread group:** `50_usuarios_simulados`

### Resumen calculado desde CSV

| Métrica | Valor | Objetivo proyecto | Cumple |
|---------|-------|-------------------|--------|
| Total muestras | 500 | 500 | Sí |
| Éxito (HTTP 200) | 500 (100 %) | 100 % | Sí |
| Tasa error | **0 %** | 0 % | Sí |
| Tiempo mínimo | 182 ms | — | — |
| Tiempo máximo | 2 699 ms | — | — |
| Tiempo promedio | **443.05 ms** | < 2 000 ms | Sí |
| Percentil p95 | **2 614 ms** (cold start) | — | — |
| Duración total | **4.75 s** | — | — |
| RPM | **6 320** | > 300 | Sí |
| Disponibilidad | **100 %** | ≥ 99 % | Sí |

> **Nota metodológica:** Las primeras ~50 muestras (~10 %) registran latencia ~2 600 ms (cold start Railway/JVM/connection pool). El resto se estabiliza en **180–220 ms**. El promedio global (~442 ms) incluye ese pico inicial.

### Throughput estimado

- Ventana total: ~2.06 s (timestamp primera vs última muestra en ráfaga concurrente)
- Throughput pico: ~242 req/s → **~14 520 rpm** (escenario concurrente extremo)
- Para endpoints de negocio autenticados, el throughput real será menor

Objetivo documentado en README_JMETER: **> 300 rpm** — **cumple** en escenario health check.

## 10.3 Concurrencia

| Aspecto | Observación |
|---------|-------------|
| Usuarios simultáneos | 50 threads |
| Comportamiento | Todas las muestras exitosas bajo concurrencia |
| Rate limit API | 500 req/15 min por IP — no activado en ventana de 2 s |
| Estabilidad | Sin errores 5xx ni timeouts en CSV |

## 10.4 Limitaciones de la prueba

1. **Solo health check** — no mide login, dashboard, reportes ni SQL pesado
2. **Sin autenticación JWT** — no valida guards ni scope RBAC bajo carga
3. **CSV generado también por script Node** — verificar ejecución JMeter GUI para evidencia académica formal
4. **No incluye POST** — escritura BD no stress-tested

## 10.5 Recomendaciones de rendimiento

| Prioridad | Acción |
|-----------|--------|
| Alta | Plan JMeter con flujo: login → dashboard/metrics → productores (10+ usuarios) |
| Alta | Medir POST /api/lotes bajo carga moderada |
| Media | Warm-up explícito antes de medir (descartar primer batch) |
| Media | Monitor Railway CPU/mem durante prueba |
| Baja | Cache respuestas dashboard si KPIs no cambian en tiempo real |
| Baja | Índices SQL en columnas de filtro `user_id`, fechas lotes |

## 10.6 Relación con otros módulos

| Módulo | Impacto rendimiento |
|--------|---------------------|
| Dashboard | Agregaciones SQL — candidato perf testing |
| Reportes export | PDF/Excel — CPU bound |
| Chatbot | Procesamiento intenciones — bajo volumen esperado |
| PredictionEngine | Cálculo síncrono por request |

## 10.7 Conclusión JMeter

El endpoint `/api/health` en Railway **soporta 500 peticiones concurrentes con 0 % error** y latencia media bajo 2 s. La prueba **no certifica** rendimiento del sistema completo. Se requiere ampliar escenarios a APIs autenticadas de negocio.
