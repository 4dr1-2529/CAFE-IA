# 01 — Evaluación FURPS+ y OWASP Top 10

**Bloque:** Calidad de software y seguridad web  
**Sistema evaluado:** CAFE-IA (Café Sostenible AI)  
**Referencia de prompts:** `Guia_FURPS_OWASP.docx`

---

## Objetivo

Documentar el proceso de evaluación del proyecto **CAFE-IA** según los atributos de calidad **FURPS+** y los riesgos del **OWASP Top 10**, utilizando un flujo de roles asistidos por IA:

1. **Planificador** — define el plan y los criterios de evaluación.
2. **Auditor** — analiza el sistema y detecta hallazgos.
3. **Auditor de Implementación** — verifica que las mejoras se hayan aplicado en el código.
4. **Auditor Final Integral** — consolida resultados de FURPS y OWASP.
5. **Conclusión General** — síntesis final del bloque.

---

## Estructura de carpetas

```text
01_FURPS_OWASP/
├── README.md
├── 01_Planificador_FURPS/
├── 02_Auditor_FURPS/
├── 03_Auditor_Implementacion_FURPS/
├── 04_Planificador_OWASP/
├── 05_Auditor_OWASP/
├── 06_Auditor_Implementacion_OWASP/
├── 07_Auditor_Final_Integral/
└── 08_Conclusion_General/          → solo Conclusion_Final.md
```

---

## Flujo de trabajo recomendado

```text
FURPS:  Planificador → Auditor → Auditor Implementación
OWASP:  Planificador → Auditor → Auditor Implementación
                    ↓
         Auditor Final Integral → Conclusión General
```

---

## Contenido por carpeta de trabajo

Cada carpeta del `01` al `07` incluye:

| Elemento | Qué registrar |
|----------|---------------|
| `01_Prompt.md` | Prompt enviado a la IA, alineado con `Guia_FURPS_OWASP.docx` |
| `02_Resultado_IA.md` | Informe, matriz o listado de hallazgos generado por la IA |
| `03_Mejoras.md` | Mejoras aplicadas en CAFE-IA (backend, frontend, BD, despliegue) |
| `04_Conclusiones.md` | Conclusiones parciales de esa fase |
| `Evidencias/` | Capturas SonarCloud, Cypress, logs Railway, matrices, etc. |

---

## Descripción de cada rol

| Carpeta | Rol | Enfoque |
|---------|-----|---------|
| `01_Planificador_FURPS` | Planificador FURPS+ | Definir alcance, criterios F/U/R/P/S y plan de revisión |
| `02_Auditor_FURPS` | Auditor FURPS+ | Evaluar el sistema contra cada atributo FURPS+ |
| `03_Auditor_Implementacion_FURPS` | Auditor de implementación | Verificar mejoras FURPS en el código desplegado |
| `04_Planificador_OWASP` | Planificador OWASP | Definir alcance OWASP Top 10 y vectores de ataque |
| `05_Auditor_OWASP` | Auditor OWASP | Analizar vulnerabilidades (JWT, CORS, SQLi, XSS, etc.) |
| `06_Auditor_Implementacion_OWASP` | Auditor de implementación | Verificar controles de seguridad implementados |
| `07_Auditor_Final_Integral` | Auditor final | Consolidar FURPS + OWASP en un informe unificado |
| `08_Conclusion_General` | — | `Conclusion_Final.md` con síntesis del bloque completo |

---

## Áreas del sistema a evaluar

| Área | Ruta en CAFE-IA |
|------|-----------------|
| API REST | `cafe-cursor/backend/src/interfaces/http/` |
| Servicios y dominio | `cafe-cursor/backend/src/application/`, `domain/` |
| Seguridad | `auth.js`, `rbac.js`, `helmet`, `env.js` |
| Frontend | `cafe-cursor/frontend/src/` |
| Base de datos | `cafe-cursor/backend/sql/schema.sql` |
| Despliegue | Railway (API + MySQL), Vercel (SPA) |
| CI/CD | `cafe-cursor/.github/workflows/ci.yml` |

---

## Material de apoyo existente

Puede cruzarse con el reporte previo en `cafe-cursor/Reporte-Calidad-Software/`:

- `05_Evaluacion_FURPS+.md`
- `06_Evaluacion_OWASP.md`
- `07_Analisis_SonarQube.md`
- `11_Plan_Mejoras.md`

---

*Completar cada carpeta en orden secuencial. Los archivos están vacíos y listos para el llenado progresivo.*
