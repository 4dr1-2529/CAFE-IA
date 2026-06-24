# Hallazgos SonarCloud — Registro para el informe

Completar cada fila con el enlace y la captura del issue en SonarCloud después del último análisis.

## Resumen por severidad (referencia del proyecto)

| Severidad | Cantidad indicada | Acción recomendada |
|-----------|-------------------|--------------------|
| Crítica | 2 | Corregir antes de producción |
| Alta | 1 | Planificar en sprint actual |
| Media | 1 | Evaluar riesgo / mitigar |
| Baja | 1 | Backlog de mejora |

## Detalle de issues (plantilla)

### Vulnerabilidad crítica 1

| Campo | Valor |
|-------|--------|
| Regla Sonar | _ej. javascript:Sxxxx_ |
| Archivo | _ruta en repo_ |
| Línea | _número_ |
| Mensaje | _texto del issue_ |
| Enlace | _URL issue SonarCloud_ |
| Estado | Abierto / Corregido |

### Vulnerabilidad crítica 2

| Campo | Valor |
|-------|--------|
| Regla Sonar | |
| Archivo | |
| Línea | |
| Mensaje | |
| Enlace | |
| Estado | |

### Vulnerabilidad alta 1

| Campo | Valor |
|-------|--------|
| Regla Sonar | |
| Archivo | |
| Línea | |
| Mensaje | |
| Enlace | |
| Estado | |

### Vulnerabilidad media 1

| Campo | Valor |
|-------|--------|
| Regla Sonar | |
| Archivo | |
| Línea | |
| Mensaje | |
| Enlace | |
| Estado | |

### Vulnerabilidad baja 1

| Campo | Valor |
|-------|--------|
| Regla Sonar | |
| Archivo | |
| Línea | |
| Mensaje | |
| Enlace | |
| Estado | |

## Complejidad ciclomática

| Métrica SonarCloud | Valor | Objetivo informe |
|--------------------|-------|------------------|
| Complejidad ciclomática (total / por archivo) | _completar_ | Reducida |
| Cognitive Complexity | _completar_ | Baja en módulos críticos |
| Funciones con complejidad > 15 | _completar_ | Refactorizar |

## Code smells relevantes

| # | Tipo | Archivo | Descripción breve |
|---|------|---------|-------------------|
| 1 | | | |
| 2 | | | |

## Notas

- Si el Quality Gate falla por cobertura, documentar que el proyecto prioriza pruebas E2E (Cypress) y tests backend.
- Tras corregir issues, ejecutar nuevo análisis en CI o local con `SONAR_TOKEN`.
