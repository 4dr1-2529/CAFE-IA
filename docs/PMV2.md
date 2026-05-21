# PMV2 — Café Sostenible AI

## Evolución respecto a PMV1

| Área | PMV1 | PMV2 |
|------|------|------|
| Base de datos | SQLite local | MySQL 39 tablas, UTF-8 |
| Arquitectura | Rutas monolíticas | Hexagonal (controllers, services, repositories) |
| Seguridad | Básica | JWT, roles, `REQUIRE_AUTH` |
| UI | Tailwind simple | SaaS moderno, dark mode, toasts, skeletons |
| Datos demo | 2–3 lotes | 5 productores × 5 lotes = **25 lotes** |
| IA | Reglas v1 | Motor v2 (riesgo %, alertas, recomendaciones) |
| Reportes | Vista | PDF + Excel |
| QA | Manual | 13+ tests automatizados |

## Cargar datos de prueba PMV2

```bash
# Regenerar dataset completo (borra datos demo previos)
cd backend
set SEED_PMV2_FORCE=1
npm run db:seed:pmv2
```

Incluye: productores P001–P005 (IDs internos 1–5 tras reset), 25 lotes, trazabilidad 5 etapas, evaluaciones de calidad, ~15 predicciones IA con alertas.

### IDs de productores (P001 vs 9)

- En pantalla debe verse **P001, P002…** (código de negocio).
- El número **9** es el `id` auto-increment de MySQL si hubo borrados o seeds antiguos sin reset.
- Solución: `SEED_PMV2_FORCE=1` + `npm run db:seed:pmv2` (reinicia AUTO_INCREMENT).

## UTF-8

- MySQL: `utf8mb4_unicode_ci`
- API: `Content-Type: application/json; charset=utf-8`
- HTML: `<meta charset="UTF-8" />`
- Fuentes: archivos `.js` / `.sql` guardados en UTF-8

## Validaciones

- Backend: `application/validators/` + middleware `validateBody`
- Frontend: `src/utils/validation.js` (productor, lote, calidad)

## Componentes UI PMV2

- `PageHeader`, `KpiCard`, `EmptyState`, `Skeleton`
- `TrazabilidadTimeline`
- `ToastProvider` (notificaciones globales)
