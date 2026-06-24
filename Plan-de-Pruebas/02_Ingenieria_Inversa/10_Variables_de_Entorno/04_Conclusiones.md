# Conclusiones — Variables de Entorno CAFE-IA

**Paso:** 10 — Variables de Entorno  
**Fecha:** 24 de junio de 2026  
**Evaluación:** Informe ICACIT — Ingeniería Inversa

---

## Estado general de la configuración

La gestión de variables de entorno en CAFE-IA presenta un **nivel de madurez intermedio-alto (7,5/10)** en el núcleo operativo. El backend valida credenciales críticas al arranque; el frontend aísla secretos mediante prefijo `VITE_`; la producción documenta paridad `MYSQL*` entre local y Railway.

La documentación generada en este paso **no expone valores sensibles** y refleja únicamente variables **realmente referenciadas en código**.

---

## Variables correctamente implementadas

1. **Conjunto MYSQL* unificado** — eliminación explícita de legacy `DB_HOST`.
2. **JWT_SECRET** con validación de longitud mínima (32 caracteres).
3. **CORS_ORIGINS** obligatorio en `NODE_ENV=production`.
4. **dotenv** con `override: false` — compatible con Railway y CI.
5. **VITE_*** aislado en Vite; corrección documentada de leakage SonarCloud.
6. **vercel.json** con `VITE_API_URL` en `env` y `build.env`.
7. **Plantillas `.env.example`** completas para runtime backend y frontend.
8. **CI** con variables de test aisladas y `SKIP_INTEGRATION`.

---

## Variables faltantes o incompletas

| Grupo | Detalle |
|-------|---------|
| Scripts dev | `SEED_*`, `REDISTRIBUIR_TRAZA`, `PUPPETEER_*`, `VERIFY_*` — usadas en código, no en `.env.example` |
| Testing | `CYPRESS_BASE_URL` — solo en `package.json` scripts |
| Infraestructura | Export variables Railway — evidencia pendiente de incorporar |
| IaC | `railway.json` — no existe |
| Legacy | `DB_*`, `DATABASE_URL` — intencionalmente no implementadas |

---

## Riesgos de configuración

| Riesgo | Severidad | Mitigación actual |
|--------|-----------|-------------------|
| Compromiso JWT_SECRET | Alta | Validación longitud; no en frontend |
| MYSQLPASSWORD en panel | Alta | SSL en Railway |
| ADMIN_SEED_PASSWORD en dev | Alta | Solo migrate seeds |
| VITE_SHOW_DEMO_CREDENTIALS=true en prod | Media | Default false en example |
| VERIFY_* defaults en script | Media | Solo scripts manuales |
| Fallback URL Railway en código | Media | vercel.json primario |
| Commit accidental .env | Alta | .gitignore (verificar) |

---

## Recomendaciones

1. Completar documentación de variables de **scripts** en plantilla separada.
2. Migrar secretos críticos a **gestión centralizada** (Railway secrets, GitHub secrets).
3. Eliminar **fallback hardcoded** Railway en `api.js`.
4. Incorporar **capturas de paneles** Railway/Vercel como evidencia ICACIT.
5. Rotación periódica de **JWT_SECRET** y **SONAR_TOKEN**.
6. Pre-commit hook para detectar archivos `.env` en staging.

---

## Nivel de madurez del entorno de configuración

| Dimensión | Nivel (1–5) |
|-----------|-------------|
| Documentación plantillas | 4 |
| Validación arranque | 5 |
| Seguridad frontend | 4 |
| Cobertura scripts/dev | 2 |
| Reproducibilidad cloud | 3 |
| Trazabilidad evidencias | 3 |
| **Madurez global** | **3,5 / 5** |

---

## Conclusión final

CAFE-IA implementa un **modelo de configuración coherente y seguro en producción**, con separación clara entre secretos de servidor (backend `.env` / Railway) y variables públicas de cliente (`VITE_*`). Las brechas se concentran en variables de **herramientas de desarrollo y scripts** no reflejadas en plantillas, y en la **ausencia de IaC** para exportar configuración Railway.

La documentación del Paso 10 está **lista para anexarse al informe ICACIT** sin exposición de contraseñas, tokens ni claves.

---

*Documento listo para anexar al informe de evaluación de evidencias ICACIT.*
