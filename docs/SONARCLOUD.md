# SonarCloud — Calidad y seguridad del código

Análisis estático integrado en GitHub Actions (complementa Cypress y `npm test`).

## Configuración inicial (una sola vez)

1. Entra en [https://sonarcloud.io](https://sonarcloud.io) e inicia sesión con **GitHub**.
2. **+** → Analyze new project → elige el repositorio **`4dr1-2529/CAFE-IA`**.
3. Confirma que coincidan:
   - **Organization:** `4dr1-2529`
   - **Project key:** `4dr1-2529_CAFE-IA`
4. En SonarCloud: **My Account** → **Security** → **Generate Token** (tipo *Analyze*).
5. En GitHub del repo: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:
   - Nombre: `SONAR_TOKEN`
   - Valor: el token generado

Sin `SONAR_TOKEN`, el job `sonarcloud` en CI fallará; el resto de jobs (backend, frontend) seguirá funcionando.

## Qué analiza

| Ruta | Contenido |
|------|-----------|
| `frontend/src` | React / Vite |
| `backend/src` | Node / Express |
| `backend/tests` | Tests unitarios e integración |
| `testing/cypress/e2e` | Pruebas E2E (como tests) |

Excluido del análisis (`.sonarignore` + `sonar.exclusions`): `Plan-de-Pruebas/`, `Reporte-Calidad-Software/`, `docs/`, `backend/scripts/`, `testing/metricas/`, SQL, `ml/`, artefactos de build.

La detección de duplicación (CPD) también excluye esas carpetas, archivos `.md`/`.txt` y copias intencionadas entre servicios.

## Ajustes en SonarCloud (UI, una vez)

En [Project Settings](https://sonarcloud.io/project/configuration?id=4dr1-2529_CAFE-IA):

1. **Analysis Method** → desactivar *Automatic Analysis* (el análisis oficial es el job CI).
2. **New Code** → definición: *Reference branch* = `main`.
3. **Analysis Scope** → no ampliar fuentes más allá de `frontend/src` y `backend/src` (el CI ya lo fuerza).

Tras el próximo push, las métricas *New Lines* y *Duplications* deben reflejar solo código de aplicación.

## CI

El workflow `.github/workflows/ci.yml` ejecuta en cada push/PR a `main`, `master` o `develop`:

1. Tests backend  
2. Build frontend  
3. **SonarCloud** (requiere los dos anteriores + `SONAR_TOKEN`)

El job SonarCloud fuerza en CI el alcance del análisis (`sonar.sources=frontend/src,backend/src`) y excluye documentación (`Plan-de-Pruebas/`, `Reporte-Calidad-Software/`, `docs/`) para que la duplicación refleje solo código de aplicación.

## Ver resultados

- Dashboard: `https://sonarcloud.io/project/overview?id=4dr1-2529_CAFE-IA`
- En cada PR: comentario/check de SonarCloud si el token está configurado.

## Archivo de configuración

`sonar-project.properties` en la raíz del monorepo.

## Alternativa local (opcional)

Con [SonarScanner](https://docs.sonarsource.com/sonarqube-cloud/advanced-setup/ci-based-analysis/sonarscanner-cli/) y variable `SONAR_TOKEN`:

```bash
sonar-scanner
```
