# Conclusiones — Reconstrucción del Entorno CAFE-IA

**Paso:** 09 — Reconstrucción del Entorno  
**Fecha:** 24 de junio de 2026  
**Evaluación:** Informe ICACIT — Ingeniería Inversa

---

## Estado del entorno

El entorno de CAFE-IA se encuentra **operativo en producción** con despliegue real en **Railway (API + MySQL)** y **Vercel (frontend SPA)**, respaldado por un **pipeline CI en GitHub Actions** con análisis **SonarCloud** y auditoría de dependencias.

El entorno de **desarrollo local** está documentado en README con stack **Node.js + Vite + Express + MySQL (XAMPP en Windows)**, variables unificadas bajo prefijo `MYSQL*` para paridad local/producción.

---

## Calidad de configuración

| Criterio | Evaluación |
|----------|------------|
| Documentación README despliegue | Alta |
| Plantillas `.env.example` | Alta |
| Paridad variables local/prod | Alta |
| Seguridad HTTP (helmet, CORS, JWT, rate-limit) | Media-alta |
| Infraestructura como código | Baja-media (sin railway.json/Docker) |
| Automatización CI | Media-alta |
| Automatización CD | Baja (deploy manual) |
| Pruebas E2E en CI | No implementado |
| **Calificación global** | **7,0 / 10** |

La configuración es **coherente y verificable** mediante archivos en repositorio (`vercel.json`, `ci.yml`, `sonar-project.properties`, `render.yaml`) y evidencias de health check, Cypress y JMeter del Paso 01.

---

## Fortalezas

1. **Arquitectura cloud clara:** separación Vercel (estático) / Railway (API + BD).
2. **Variables MySQL unificadas** (`MYSQL*`) con detección Railway y SSL automático.
3. **CI robusto:** tests backend, build frontend, SonarCloud, npm audit en Node 20.
4. **Seguridad base:** JWT con longitud mínima, helmet, rate limiting, CORS configurable.
5. **Proxy Vite** simplifica desarrollo sin CORS local.
6. **Evidencias de calidad:** 11 specs Cypress, plan JMeter 500 req, reportes SonarCloud.
7. **URLs producción públicas** y health endpoint documentado.

---

## Debilidades

1. **Ausencia de `railway.json`** y Docker — configuración cloud parcialmente manual.
2. **Cypress no integrado en CI** — E2E depende de ejecución local.
3. **Sin CD automático** desde GitHub Actions a Railway/Vercel.
4. **render.yaml** como alternativa puede generar ambigüedad.
5. **Sin `engines`/`.nvmrc`** — versión Node no fijada en package.json raíz.
6. **URL Railway hardcoded** en `api.js` como fallback de producción.
7. **npm audit** con `continue-on-error: true` — vulnerabilidades no bloquean CI.
8. **Capturas paneles Railway/Vercel** no en repositorio.

---

## Riesgos

| Riesgo | Probabilidad | Severidad |
|--------|--------------|-----------|
| Configuración Railway no reproducible sin panel | Media | Media |
| Regresiones UI sin E2E en CI | Media | Alta |
| Pérdida datos sin política backup documentada | Baja | Alta |
| Inconsistencia Node dev vs CI | Media | Baja |
| CORS amplio en previews Vercel | Baja | Media |

---

## Recomendaciones

1. Fijar **Node 20** con `engines` y `.nvmrc`.
2. Integrar **Cypress en CI** o pipeline nightly.
3. Implementar **CD** controlado a Railway/Vercel.
4. Documentar o exportar configuración **Railway**; evaluar Docker para dev.
5. Endurecer **npm audit** en CI para vulnerabilidades high/critical.
6. Definir política de **backups MySQL** Railway.
7. Incorporar capturas de paneles cloud como evidencia ICACIT.

---

## Nivel de madurez del entorno

| Dimensión | Nivel (1–5) |
|-----------|-------------|
| Desarrollo local | 4 |
| Configuración y secretos | 3 |
| CI (integración) | 4 |
| CD (despliegue) | 2 |
| Observabilidad | 2 |
| Seguridad infraestructura | 3 |
| **Madurez global** | **3,0 / 5 (Intermedio)** |

---

## Conclusión final

El entorno de CAFE-IA es **funcional, desplegado y documentado** para evaluación ICACIT, con evidencia verificable de producción (Railway + Vercel), calidad (SonarCloud, Cypress, JMeter) e integración continua (GitHub Actions).

La reconstrucción refleja **fielmente lo implementado**, indicando explícitamente elementos no encontrados (`railway.json`, Docker, E2E en CI). La evolución hacia madurez **4/5** requiere principalmente IaC cloud, CD automatizado y pruebas E2E en pipeline.

---

*Documento listo para anexar al informe de evaluación de evidencias ICACIT.*
