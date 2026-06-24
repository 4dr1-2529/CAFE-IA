# 04 — Conclusiones — Análisis de Dependencias

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Ingeniería Inversa — Paso 2  
**Fecha:** 2026-06-24

---

## Estado general de las dependencias

El ecosistema de dependencias de CAFE-IA es **estable, coherente y proporcionado** para un sistema full-stack académico-productivo. Se identificaron **34 dependencias directas npm** con lockfiles en tres niveles (monorepo, backend, frontend), lo que garantiza builds reproducibles.

Las versiones instaladas (resueltas por lockfile) están **mayormente actualizadas** dentro de los rangos semver. El núcleo de producción — Express 4.22.2, mysql2 3.22.3, jsonwebtoken 9.0.3, React 18.3.1, Vite 5.4.21 — se encuentra en ramas estables y soportadas.

Las vulnerabilidades detectadas por `npm audit` se concentran en **dependencias transitivas** (form-data, dompurify, esbuild, react-router) y en **herramientas de desarrollo**, no en el núcleo runtime de producción, salvo **react-router-dom 6.30.3** que requiere parche de seguridad.

---

## Fortalezas del proyecto

1. **Stack minimalista:** Sin dependencias redundantes (no Axios, no ORM Prisma, no cron).
2. **Lockfiles completos:** Tres `package-lock.json` para reproducibilidad.
3. **Overrides de seguridad:** `tmp` y `uuid` forzados tras hallazgos SonarCloud.
4. **Separación clara:** Backend 10 prod deps; frontend 7 prod deps.
5. **Herramientas de calidad:** Cypress 13, SonarCloud, npm audit en CI.
6. **Alternativas nativas:** `fetch` en lugar de Axios reduce superficie npm.
7. **ML aislado:** Python deps en `ml/requirements.txt` sin contaminar Node prod.

---

## Riesgos detectados

| Riesgo | Severidad | Probabilidad |
|--------|-----------|--------------|
| CVE form-data (backend transitiva) | Alta | Baja (solo dev/test) |
| CVE react-router open redirect | Media | Media |
| Cypress fuera de CI | Alta impacto | Media |
| eslint 8 EOL próximo | Baja | Alta |
| Bundle Recharts pesado | Baja | Alta |
| Sin SBOM formal | Media | — |

---

## Dependencias críticas

| Dependencia | Rol | Si falla |
|-------------|-----|------------|
| express | API REST | Sistema inoperativo |
| mysql2 + MySQL 8 | Persistencia | Sin datos |
| jsonwebtoken + bcryptjs | Auth | Sin acceso seguro |
| react + react-dom | UI | Sin interfaz |
| react-router-dom | Navegación | SPA rota |
| vite (build) | Artefacto prod | Sin deploy frontend |
| Railway / Vercel | Hosting | Sin acceso público |

---

## Recomendaciones para mantenimiento

1. **Mensual:** Ejecutar `npm audit` en backend y frontend; archivar en `Evidencias/`.
2. **Por release:** Revisar lockfiles y overrides; actualizar parches de seguridad.
3. **Trimestral:** Evaluar upgrades major (Vite, ESLint, React).
4. **Continuo:** Dependabot o Renovate en GitHub.
5. **ICACIT:** Mantener copias de package.json, lockfiles y audit JSON en Plan-de-Pruebas.
6. **No agregar** multer/node-cron sin requisito documentado — evitar inflar dependencias.

---

## Nivel de madurez tecnológica (dependencias)

| Dimensión | Puntuación | Justificación |
|-----------|------------|---------------|
| Selección de stack | 9/10 | Moderno, estándar industria |
| Actualización versiones | 7/10 | Lock actualizado; 1 CVE prod pendiente |
| Seguridad supply chain | 7/10 | Audit + overrides; transitivas pendientes |
| Reproducibilidad | 9/10 | Lockfiles triples |
| Documentación deps | 8/10 | README + este plan |
| Automatización | 6/10 | CI parcial; Cypress manual |

### **Madurez global dependencias: 7.8 / 10**

Clasificación: **Apto para producción y evaluación ICACIT**, con plan de actualización de seguridad documentado en `03_Mejoras.md`.

---

## Cierre

El Paso 2 confirma que CAFE-IA gestiona sus dependencias de forma **profesional y trazable**, con brechas acotadas y plan de remediación priorizado. Se recomienda continuar con el **Paso 3: Descubrimiento Funcional** (`03_Descubrimiento_Funcional/`).

---

*Conclusión para informe ICACIT — Ingeniería Inversa CAFE-IA.*
