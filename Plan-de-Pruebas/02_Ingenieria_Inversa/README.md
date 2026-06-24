# 02 — Ingeniería Inversa

**Bloque:** Análisis, descubrimiento y reconstrucción del sistema CAFE-IA  
**Sistema analizado:** CAFE-IA (Café Sostenible AI) — monorepo en `cafe-cursor/`

---

## Objetivo

Documentar el proceso de **ingeniería inversa** aplicado al proyecto CAFE-IA: partir del sistema existente (código, logs, dependencias, despliegue) para reconstruir su arquitectura, dominio, entorno y hallazgos, registrando en cada paso el prompt de IA, el resultado, las mejoras y las evidencias.

Este bloque demuestra la capacidad de comprender un sistema real sin documentación previa completa, mediante análisis asistido por IA.

---

## Estructura de carpetas

```text
02_Ingenieria_Inversa/
├── README.md
├── 01_Analisis_de_Logs/
├── 02_Dependencias/
├── 03_Descubrimiento_Funcional/
├── 04_Descubrimiento_Tecnologico/
├── 05_Deteccion_Arquitectonica/
├── 06_Evaluacion_Arquitectonica/
├── 07_Reconstruccion_Arquitectonica/
├── 08_Reconstruccion_del_Dominio/
├── 09_Reconstruccion_del_Entorno/
├── 10_Variables_de_Entorno/
├── 11_Hallazgos/
├── 12_Generador_Final/
└── 13_Conclusion_General/          → solo Conclusion_Final.md
```

---

## Contenido por carpeta de trabajo

Cada carpeta del `01` al `12` incluye:

| Elemento | Qué registrar |
|----------|---------------|
| `01_Prompt.md` | Prompt de IA para esa fase del análisis |
| `02_Resultado_IA.md` | Diagramas, tablas, descripciones generadas |
| `03_Mejoras.md` | Mejoras identificadas o aplicadas tras el análisis |
| `04_Conclusiones.md` | Conclusiones parciales de la fase |
| `Evidencias/` | Logs, `package.json`, capturas, exports, diagramas |

---

## Descripción de cada fase

| Carpeta | Fase | Enfoque |
|---------|------|---------|
| `01_Analisis_de_Logs` | Logs | Logs de Railway, consola backend, errores de despliegue |
| `02_Dependencias` | Dependencias | `package.json` backend/frontend, árbol npm, vulnerabilidades |
| `03_Descubrimiento_Funcional` | Funcional | Módulos PMV1/PMV2, rutas, casos de uso, roles |
| `04_Descubrimiento_Tecnologico` | Tecnológico | Stack: Node, React, MySQL, Vite, Tailwind, JWT |
| `05_Deteccion_Arquitectonica` | Detección | Patrón hexagonal, capas, flujo HTTP → Repository |
| `06_Evaluacion_Arquitectonica` | Evaluación | Fortalezas, deuda técnica, acoplamiento, cohesión |
| `07_Reconstruccion_Arquitectonica` | Reconstrucción | Diagrama de capas y componentes reconstruido |
| `08_Reconstruccion_del_Dominio` | Dominio | Entidades: productor, lote, trazabilidad, calidad, IA |
| `09_Reconstruccion_del_Entorno` | Entorno | Railway, Vercel, GitHub Actions, MySQL |
| `10_Variables_de_Entorno` | Variables | `MYSQL*`, `JWT_SECRET`, `CORS_ORIGINS`, `VITE_API_URL` |
| `11_Hallazgos` | Hallazgos | Issues, bugs, deuda, riesgos detectados |
| `12_Generador_Final` | Informe final | Documento consolidado de ingeniería inversa |
| `13_Conclusion_General` | — | `Conclusion_Final.md` con síntesis del bloque |

---

## Flujo de trabajo recomendado

```text
Logs → Dependencias → Descubrimiento (funcional + tecnológico)
                              ↓
              Detección → Evaluación → Reconstrucción (arquitectura + dominio + entorno)
                              ↓
         Variables de entorno → Hallazgos → Generador Final → Conclusión General
```

---

## Fuentes de información en CAFE-IA

| Fuente | Ubicación |
|--------|-----------|
| Código backend | `cafe-cursor/backend/src/` |
| Código frontend | `cafe-cursor/frontend/src/` |
| Esquema BD | `cafe-cursor/backend/sql/schema.sql` |
| Variables de entorno | `cafe-cursor/backend/.env.example`, `frontend/.env.example` |
| Documentación técnica | `cafe-cursor/docs/`, `cafe-cursor/README.md` |
| Reporte de calidad | `cafe-cursor/Reporte-Calidad-Software/` |
| Despliegue producción | Railway API + MySQL, Vercel SPA |

---

## Relación con FURPS/OWASP

Los hallazgos de ingeniería inversa (`11_Hallazgos`) pueden alimentar las evaluaciones de `01_FURPS_OWASP/`. Mantener trazabilidad cruzada entre ambos bloques cuando un hallazgo derive en mejora de calidad o seguridad.

---

*Completar cada carpeta de forma secuencial. Los archivos están vacíos y listos para el llenado progresivo.*
