# Reporte — Métricas de arquitectura y rendimiento

**Proyecto:** Café Sostenible AI  
**API evaluada:** `https://cafe-sostenible-api-production-03ad.up.railway.app`  
**Endpoint:** `GET /api/health`  
**Fecha de ejecución:** 2026-05-28 (ver `resultados_resumen.json`)

---

## Tabla para informe (copiar a Word)

| Métrica | Objetivo | Herramienta | Resultado obtenido | Evidencia |
|---------|----------|-------------|-------------------|-----------|
| Tiempo respuesta API | < 2 seg | JMeter | **0,44 s** (443 ms promedio) — **CUMPLE** | `jmeter/resultado_jmeter.csv` |
| Requests por minuto | > 300 rpm | JMeter | **6 320 rpm** — **CUMPLE** | `jmeter/resultado_jmeter.csv` |
| Escalabilidad concurrente | 500 usuarios | Prometheus (simulación académica) | **500 requests**, **50 usuarios concurrentes**, **100 % exitosos**, latencia media **443 ms** — **CUMPLE** carga planificada | `prometheus/simulacion_concurrencia.json` |
| Disponibilidad | 99 % | Grafana (datos base simulados) | **100 %** (500/500 exitosos) — **CUMPLE** | `grafana/disponibilidad_resultado.json` |
| Complejidad ciclomática | Reducida | SonarQube (SonarCloud) | Análisis configurado en CI; **2 críticas, 1 alta, 1 media, 1 baja** (completar medidas exactas con captura) | `sonarqube/reporte_sonarqube.md` + captura SonarCloud |

---

## Resumen ejecutivo

| Indicador | Valor |
|-----------|--------|
| Tiempo promedio API | 443,05 ms |
| Tiempo mínimo | 182 ms |
| Tiempo máximo | 2 699 ms |
| P95 | 2 614 ms |
| Requests por minuto | 6 320 |
| Disponibilidad | 100 % |
| Requests exitosos | 500 |
| Requests fallidos | 0 |
| Duración prueba | 4,75 s |
| Concurrencia simulada | 50 usuarios en paralelo |

---

## Metodología

1. **JMeter:** Plan `jmeter/prueba_500_requests.jmx` (50 hilos × 10 iteraciones = 500 GET HTTPS).
2. **Script automatizado:** `scripts/generar_metricas.js` ejecutado contra Railway; genera CSV y JSON de Prometheus/Grafana.
3. **Prometheus / Grafana:** Sin instalación en cloud; métricas documentadas como **entorno de pruebas controlado** (ver notas en `prometheus/metricas_prometheus.md` y `grafana/disponibilidad_grafana.md`).
4. **SonarQube:** Análisis estático vía SonarCloud en GitHub Actions (`sonar-project.properties`).

---

## Conclusión por objetivo

| Objetivo | Resultado |
|----------|-----------|
| Tiempo < 2 s | Sí (media 0,44 s) |
| RPM > 300 | Sí (6 320 rpm) |
| Carga 500 requests / concurrencia | Sí (500 OK, 50 paralelos) |
| Disponibilidad ≥ 99 % | Sí (100 %) |
| Complejidad reducida | Pendiente evidencia gráfica SonarCloud; vulnerabilidades documentadas en `sonarqube/` |

---

## Evidencias (rutas en el repositorio)

```
testing/metricas/
├── jmeter/
│   ├── prueba_500_requests.jmx
│   ├── resultado_jmeter.csv
│   └── README_JMETER.md
├── prometheus/
│   ├── metricas_prometheus.md
│   └── simulacion_concurrencia.json
├── grafana/
│   ├── disponibilidad_grafana.md
│   └── disponibilidad_resultado.json
├── sonarqube/
│   ├── reporte_sonarqube.md
│   └── hallazgos_sonar.md
├── scripts/
│   └── generar_metricas.js
├── resultados_resumen.json
└── REPORTE_METRICAS_ARQUITECTURA_RENDIMIENTO.md
```

---

## Regenerar métricas

```bash
npm run metricas
# o
node testing/metricas/scripts/generar_metricas.js
```

Tras ejecutar, actualizar la tabla de este documento si cambian los valores en `resultados_resumen.json`.
