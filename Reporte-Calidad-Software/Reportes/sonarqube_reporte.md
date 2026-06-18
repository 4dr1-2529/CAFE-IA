# SonarQube / SonarCloud — Complejidad y calidad de código

## Herramienta

- **Producción del análisis:** [SonarCloud](https://sonarcloud.io) (SonarQube en la nube)
- **Proyecto:** `4dr1-2529_CAFE-IA`
- **Configuración:** `sonar-project.properties` (raíz del repo)
- **CI:** job `sonarcloud` en `.github/workflows/ci.yml`
- **Documentación:** `docs/SONARCLOUD.md`

## Métrica del informe

| Métrica | Objetivo | Herramienta |
|---------|----------|-------------|
| Complejidad ciclomática | Reducida / bajo control | SonarQube (SonarCloud) |

SonarCloud calcula **complejidad cognitiva y ciclomática** por función, además de ratings de mantenibilidad (A–E).

## Resumen de calidad (completar con dashboard)

> Los valores numéricos exactos deben tomarse del dashboard tras el último análisis. No se inventan aquí.

| Indicador | Valor en SonarCloud | Captura |
|-----------|---------------------|---------|
| Quality Gate | _Pendiente / OK / Error_ | _adjuntar_ |
| Bugs | _número_ | Issues → Bugs |
| Vulnerabilidades | _número_ | Issues → Vulnerabilities |
| Code Smells | _número_ | Issues → Code Smells |
| Security Hotspots | _número_ | Security |
| Cobertura | _%_ (si está configurada) | Measures |
| Duplicación | _%_ | Measures |
| Complejidad ciclomática (resumen) | _ver medida Complexity_ | Measures → Complexity |
| Índice de mantenibilidad | _rating A–E_ | Maintainability |

## Vulnerabilidades referenciadas (último informe conocido)

Según revisión en SonarCloud (completar severidades y archivos con captura):

| Severidad | Cantidad referenciada | Estado |
|-----------|----------------------|--------|
| Crítica | 2 | _corregir / documentar_ |
| Alta | 1 | _corregir / documentar_ |
| Media | 1 | _corregir / documentar_ |
| Baja | 1 | _corregir / documentar_ |

Detalle por issue: ver `hallazgos_sonar.md` y el enlace directo a Issues en SonarCloud.

## Interpretación académica

1. **Complejidad reducida:** Objetivo de mantener funciones cortas, pocos niveles de anidación y rutas de negocio en capas (controllers → services → repositories).
2. **Vulnerabilidades:** Priorizar críticas y altas (inyección, secretos, validación de entrada).
3. **Code smells:** Refactorizar duplicados y métodos largos para mejorar mantenibilidad sin cambiar comportamiento.
4. **Integración continua:** Cada push a `main` puede ejecutar el análisis si existe el secret `SONAR_TOKEN`.

## Enlaces

- Overview: https://sonarcloud.io/project/overview?id=4dr1-2529_CAFE-IA
- Issues: https://sonarcloud.io/project/issues?id=4dr1-2529_CAFE-IA

## Evidencia para el informe

1. Captura de pantalla del **Overview** (Quality Gate + medidas).
2. Captura de **Issues** filtradas por Vulnerability.
3. Export PDF o captura de **Measures → Complexity**.
