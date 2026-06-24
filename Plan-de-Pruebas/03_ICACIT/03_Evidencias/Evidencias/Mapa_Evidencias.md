# Mapa de Evidencias — Consolidación ICACIT — CAFE-IA

**Fecha:** 24 de junio de 2026

---

```mermaid
flowchart TB
    subgraph Fuentes["Fuentes documentales"]
        II[Ingeniería Inversa 336 archivos]
        FUR[FURPS+OWASP 302 archivos]
        RC[Reporte Calidad 76 archivos]
        TST[testing/ 92 archivos]
        DOC[docs/ 26 archivos]
    end

    subgraph Categorias["14 categorías ICACIT"]
        ARQ[Arquitectura]
        BE[Backend]
        FE[Frontend]
        BD[Base de Datos]
        API[APIs]
        PRU[Pruebas]
        CAL[Calidad]
        SEG[Seguridad]
        DES[Despliegue]
        INF[Infraestructura]
        DOC2[Documentación]
        ML[Machine Learning]
        REP[Reportes]
        MET[Métricas]
    end

    subgraph Competencias["Competencias ICACIT"]
        CT01[CT-01]
        CT02[CT-02]
        CT03[CT-03]
        CT04[CT-04]
        CE01[CE-01]
        CE02[CE-02]
        CE03[CE-03]
    end

    II --> ARQ
    II --> BD
    FUR --> CAL
    FUR --> SEG
    RC --> PRU
    TST --> PRU
    DOC --> ARQ
    ARQ --> CE01
    PRU --> CE03
    SEG --> CE02
    DOC2 --> CT04
    ML --> CT02
```

---

## Rutas canónicas recomendadas (evitar duplicados)

| Tipo | Ruta canónica | Duplicados en |
|------|---------------|---------------|
| Arquitectura mmd | `docs/Arquitectura de la solución planteada/` | 10 carpetas Evidencias/ |
| Cypress results | `Reporte-Calidad-Software/Evidencias/cypress/last-run.json` | 15+ carpetas |
| npm audit backend | `Plan-de-Pruebas/01_FURPS_OWASP/07/.../npm_audit_backend.txt` | 10+ carpetas |
| DER mermaid | `docs/.../der-relaciones-completas.mmd` | 4 ubicaciones |
| JMeter | `testing/metricas/jmeter/` + `Reporte-Calidad/Evidencias/jmeter/` | 2 (equivalentes) |

---

*Mapa — Paso 03 Evidencias ICACIT.*
