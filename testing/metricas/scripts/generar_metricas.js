/**
 * Genera métricas de arquitectura y rendimiento contra la API en producción (Railway).
 * Equivalente académico a prueba JMeter + simulación Prometheus/Grafana.
 *
 * Uso: node testing/metricas/scripts/generar_metricas.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'cafe-sostenible-api-production-03ad.up.railway.app';
const API_PATH = '/api/health';
const TOTAL_REQUESTS = 500;
const CONCURRENT_USERS = 50;
const REQUEST_TIMEOUT_MS = 30000;

const ROOT = path.resolve(__dirname, '..');
const OUT_CSV = path.join(ROOT, 'jmeter', 'resultado_jmeter.csv');
const OUT_PROMETHEUS = path.join(ROOT, 'prometheus', 'simulacion_concurrencia.json');
const OUT_GRAFANA = path.join(ROOT, 'grafana', 'disponibilidad_resultado.json');
const OUT_RESUMEN = path.join(ROOT, 'resultados_resumen.json');

function httpsGet() {
  const start = Date.now();
  return new Promise((resolve) => {
    const req = https.request(
      {
        hostname: HOST,
        port: 443,
        path: API_PATH,
        method: 'GET',
        headers: { Accept: 'application/json', 'User-Agent': 'CafeMetricas/1.0' },
        timeout: REQUEST_TIMEOUT_MS,
      },
      (res) => {
        res.on('data', () => {});
        res.on('end', () => {
          resolve({
            elapsedMs: Date.now() - start,
            statusCode: res.statusCode,
            success: res.statusCode >= 200 && res.statusCode < 400,
            timestamp: new Date().toISOString(),
          });
        });
      }
    );
    req.on('error', (err) => {
      resolve({
        elapsedMs: Date.now() - start,
        statusCode: 0,
        success: false,
        error: err.message,
        timestamp: new Date().toISOString(),
      });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({
        elapsedMs: Date.now() - start,
        statusCode: 0,
        success: false,
        error: 'timeout',
        timestamp: new Date().toISOString(),
      });
    });
    req.end();
  });
}

async function runBatch(startIndex, size) {
  const tasks = [];
  for (let i = 0; i < size; i += 1) {
    tasks.push(httpsGet().then((r) => ({ ...r, sample: startIndex + i + 1 })));
  }
  return Promise.all(tasks);
}

function stats(elapsedList) {
  if (!elapsedList.length) return { min: 0, max: 0, avg: 0, p95: 0 };
  const sorted = [...elapsedList].sort((a, b) => a - b);
  const sum = sorted.reduce((a, b) => a + b, 0);
  const p95Index = Math.min(sorted.length - 1, Math.ceil(sorted.length * 0.95) - 1);
  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    avg: Math.round((sum / sorted.length) * 100) / 100,
    p95: sorted[p95Index],
  };
}

async function main() {
  console.log(`\n=== Métricas Café Sostenible API ===`);
  console.log(`URL: https://${HOST}${API_PATH}`);
  console.log(`Requests: ${TOTAL_REQUESTS} | Concurrencia: ${CONCURRENT_USERS}\n`);

  const allResults = [];
  const wallStart = Date.now();

  for (let offset = 0; offset < TOTAL_REQUESTS; offset += CONCURRENT_USERS) {
    const batchSize = Math.min(CONCURRENT_USERS, TOTAL_REQUESTS - offset);
    const batch = await runBatch(offset, batchSize);
    allResults.push(...batch);
    process.stdout.write(`\rProgreso: ${allResults.length}/${TOTAL_REQUESTS}`);
  }

  const wallEnd = Date.now();
  const durationMs = wallEnd - wallStart;
  const durationSec = durationMs / 1000;

  const elapsedOk = allResults.filter((r) => r.success).map((r) => r.elapsedMs);
  const elapsedAll = allResults.map((r) => r.elapsedMs);
  const ok = allResults.filter((r) => r.success).length;
  const fail = allResults.length - ok;
  const timing = stats(elapsedAll);
  const timingOk = stats(elapsedOk.length ? elapsedOk : [0]);

  const rpm = durationSec > 0 ? Math.round((allResults.length / durationSec) * 60) : 0;
  const availabilityPct = Math.round((ok / allResults.length) * 10000) / 100;
  const errorPct = Math.round((fail / allResults.length) * 10000) / 100;
  const objetivoTiempoMs = 2000;
  const cumpleTiempo = timing.avg < objetivoTiempoMs;
  const cumpleRpm = rpm > 300;
  const cumpleDisponibilidad = availabilityPct >= 99;

  const fecha = new Date().toISOString();

  const csvHeader =
    'sample,elapsed_ms,status_code,success,timestamp,label,thread_group';
  const csvRows = allResults.map(
    (r) =>
      `${r.sample},${r.elapsedMs},${r.statusCode},${r.success},${r.timestamp},GET /api/health,${CONCURRENT_USERS}_usuarios_simulados`
  );
  fs.writeFileSync(OUT_CSV, [csvHeader, ...csvRows].join('\n'), 'utf8');

  const prometheusPayload = {
    meta: {
      descripcion:
        'Simulación académica de métricas de concurrencia (equivalente a scrape Prometheus en entorno de pruebas)',
      herramienta_base: 'Node.js generar_metricas.js',
      entorno: 'pruebas_controladas',
      api: `https://${HOST}${API_PATH}`,
      fecha_ejecucion: fecha,
    },
    escalabilidad_concurrente: {
      usuarios_simulados: CONCURRENT_USERS,
      total_requests: TOTAL_REQUESTS,
      duracion_segundos: Math.round(durationSec * 100) / 100,
      requests_exitosos: ok,
      requests_fallidos: fail,
      porcentaje_exitoso: availabilityPct,
      latencia_promedio_ms: timing.avg,
      latencia_p95_ms: timing.p95,
      latencia_min_ms: timing.min,
      latencia_max_ms: timing.max,
      throughput_rpm: rpm,
      objetivo_usuarios: 500,
      nota: 'Para efectos de entorno académico se simuló la métrica de concurrencia mediante script Node, equivalente a una prueba básica de carga.',
    },
  };
  fs.writeFileSync(OUT_PROMETHEUS, JSON.stringify(prometheusPayload, null, 2), 'utf8');

  const grafanaPayload = {
    meta: {
      descripcion:
        'Datos base para visualización de disponibilidad (Grafana); generados por prueba al endpoint desplegado',
      herramienta_visualizacion: 'Grafana (referencia académica)',
      fuente_datos: 'generar_metricas.js',
      api: `https://${HOST}${API_PATH}`,
      fecha_ejecucion: fecha,
    },
    disponibilidad: {
      total_requests: allResults.length,
      requests_exitosos: ok,
      requests_fallidos: fail,
      disponibilidad_porcentaje: availabilityPct,
      error_porcentaje: errorPct,
      uptime_estimado_porcentaje: availabilityPct,
      downtime_estimado_porcentaje: Math.round((100 - availabilityPct) * 100) / 100,
      ventana_prueba_segundos: Math.round(durationSec * 100) / 100,
      objetivo_disponibilidad_porcentaje: 99,
      cumple_objetivo_99: cumpleDisponibilidad,
      nota: 'Grafana representa la visualización de disponibilidad; los datos base fueron generados mediante prueba de disponibilidad al endpoint desplegado.',
    },
    series_temporal_resumen: {
      intervalos: Math.min(10, allResults.length),
      muestra: allResults
        .filter((_, i) => i % Math.ceil(allResults.length / 10) === 0)
        .slice(0, 10)
        .map((r) => ({
          sample: r.sample,
          elapsed_ms: r.elapsedMs,
          success: r.success,
        })),
    },
  };
  fs.writeFileSync(OUT_GRAFANA, JSON.stringify(grafanaPayload, null, 2), 'utf8');

  const resumen = {
    fecha_ejecucion: fecha,
    endpoint: `https://${HOST}${API_PATH}`,
    total_requests: allResults.length,
    requests_exitosos: ok,
    requests_fallidos: fail,
    tiempo_promedio_ms: timing.avg,
    tiempo_minimo_ms: timing.min,
    tiempo_maximo_ms: timing.max,
    tiempo_p95_ms: timing.p95,
    tiempo_promedio_exitosos_ms: timingOk.avg,
    duracion_total_segundos: Math.round(durationSec * 100) / 100,
    requests_por_minuto: rpm,
    disponibilidad_porcentaje: availabilityPct,
    concurrencia_usuarios: CONCURRENT_USERS,
    cumple_objetivo_tiempo_2s: cumpleTiempo,
    cumple_objetivo_rpm_300: cumpleRpm,
    cumple_objetivo_disponibilidad_99: cumpleDisponibilidad,
  };
  fs.writeFileSync(OUT_RESUMEN, JSON.stringify(resumen, null, 2), 'utf8');

  console.log('\n\n--- Resultados ---');
  console.log(`Tiempo promedio:     ${timing.avg} ms`);
  console.log(`Tiempo mín / máx:    ${timing.min} / ${timing.max} ms`);
  console.log(`Requests por minuto: ${rpm}`);
  console.log(`Disponibilidad:      ${availabilityPct}%`);
  console.log(`Exitosos / Fallidos: ${ok} / ${fail}`);
  console.log(`Duración total:      ${durationSec.toFixed(2)} s`);
  console.log(`\nArchivos generados:`);
  console.log(`  ${OUT_CSV}`);
  console.log(`  ${OUT_PROMETHEUS}`);
  console.log(`  ${OUT_GRAFANA}`);
  console.log(`  ${OUT_RESUMEN}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
