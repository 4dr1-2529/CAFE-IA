# EDT, Scrum y Gantt — Café Sostenible AI v2.0

## EDT (Estructura de Descomposición del Trabajo)

| WBS | Entregable | % Plan | % Real |
|-----|------------|--------|--------|
| 1 | Análisis y diseño (arquitectura hexagonal, MySQL) | 15% | 100% |
| 2 | Base de datos (35 tablas, migración, seeds) | 20% | 100% |
| 3 | Backend API + JWT + IA v2 | 25% | 100% |
| 4 | Frontend React (módulos PMV, dark mode, QR) | 25% | 95% |
| 5 | QA y documentación | 10% | 85% |
| 6 | Deploy (Render/Vercel config) | 5% | 70% |

**Avance global estimado:** ~92% planificado vs real.

## Scrum — Sprints

| Sprint | Objetivo | HU |
|--------|----------|-----|
| PMV1 | CRUD + trazabilidad + calidad + IA básica | HU01–HU06 |
| PMV2 | MySQL + JWT + reportes PDF/Excel | Migración BD, auth |
| PMV3 | IA avanzada + dashboard + QR + dark mode | Riesgo %, métricas, QR real |

## Gantt simplificado (ejecutado)

```text
Sem 1-2  ████████ Análisis + diseño
Sem 3-4  ████████ MySQL schema + migración
Sem 5-7  ████████████ Backend hexagonal + JWT
Sem 8-10 ████████████ Frontend módulos + API
Sem 11   ██████ QA + docs + deploy config
```

## Evidencias Scrum

- Historias en `frontend/src/components/HistoriasUsuario.jsx`
- PMV en `EvidenciasPMV.jsx`
- Daily/Review: registro en commits y `TODO.md`
