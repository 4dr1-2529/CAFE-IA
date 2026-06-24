# Resumen Ejecutivo — Variables de Entorno CAFE-IA

**Fecha:** 24 de junio de 2026

---

## Indicadores

| Indicador | Valor |
|-----------|-------|
| **Total variables identificadas** | 38 |
| Variables backend runtime | 18 |
| Variables backend scripts | 7 |
| Variables frontend VITE_* | 3 |
| Variables Vite built-in | 2 |
| Variables testing | 1 |
| Variables CI / secrets | 7 |
| **Variables críticas (seguridad)** | 4 |
| **Variables faltantes en .env.example** | 5 (scripts/dev) |
| Variables legacy eliminadas | 4 (`DB_*`) |

---

## Variables críticas

| Variable | Categoría | Riesgo |
|----------|-----------|--------|
| `JWT_SECRET` | JWT | Alto — compromiso de sesiones |
| `MYSQLPASSWORD` | BD | Alto — acceso a datos |
| `ADMIN_SEED_PASSWORD` | Seeds | Alto — solo desarrollo |
| `SONAR_TOKEN` | CI secret | Medio — acceso análisis |

---

## Estado general de configuración

| Área | Evaluación |
|------|------------|
| Plantillas `.env.example` | Completa para runtime |
| Paridad MYSQL* local/Railway | Alta |
| Separación secretos frontend | Alta (solo VITE_*) |
| Validación arranque backend | Alta (JWT + MySQL) |
| Documentación README | Alta |
| Scripts sin documentar en example | Media-baja |
| **Calificación global** | **7,5 / 10** |

---

## Variables correctamente implementadas

- Conjunto `MYSQL*` unificado (sin legacy `DB_HOST`)
- `JWT_SECRET` con validación longitud mínima
- `CORS_ORIGINS` obligatorio en producción
- `dotenv` con `override: false` para Railway
- `VITE_*` aislado en Vite; corrección leakage Sonar
- `vercel.json` con `VITE_API_URL` en build
- CI con variables test aisladas y `SKIP_INTEGRATION`

---

## Variables faltantes o incompletas

| Variable / aspecto | Estado |
|--------------------|--------|
| `PUPPETEER_EXECUTABLE_PATH` | Usada; no en `.env.example` |
| `VERIFY_*` (4 variables) | Usadas en script; no en example |
| `CYPRESS_BASE_URL` | En scripts npm; no en `.env.example` |
| Variables seeds `SEED_*` | Solo en código scripts |
| Documentación panel Railway | Evidencia pendiente de incorporar |
| `railway.json` / export variables Railway | No existe en repo |

---

## Conclusión ejecutiva

La gestión de variables de entorno en CAFE-IA es **sólida en el núcleo operativo** (MySQL, JWT, CORS, VITE_API_URL) con buenas prácticas de seguridad en frontend y validación en backend. Las brechas principales son variables de **scripts de desarrollo** no documentadas en plantillas y dependencia de configuración manual en paneles cloud.

Documentación generada **sin exponer valores sensibles**, apta para anexo ICACIT.
