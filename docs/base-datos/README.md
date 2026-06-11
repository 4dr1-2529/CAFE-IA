# Documentación de Base de Datos — CAFE-IA

Documentación generada automáticamente del esquema MySQL del proyecto **Café Sostenible AI**.

**Última generación:** 2026-06-04  
**Origen:** MySQL (`cafe_sostenible`) + schema.sql

## Archivos

| Documento | Descripción |
|-----------|-------------|
| [MODELO_CONCEPTUAL.md](./MODELO_CONCEPTUAL.md) | Entidades de negocio y relaciones |
| [MODELO_LOGICO.md](./MODELO_LOGICO.md) | Atributos, cardinalidades, FK por tabla |
| [MODELO_FISICO.md](./MODELO_FISICO.md) | Inventario, PK, FK, índices |
| [DER.md](./DER.md) | Diagramas Mermaid ER |
| [VERIFICACION.md](./VERIFICACION.md) | Última comparación schema.sql vs MySQL |
| [Arquitectura (PNG)](../Arquitectura%20de%20la%20solución%20planteada/) | DER y diagrama de capas |

## Regenerar

```bash
cd backend
npm run db:docs              # README + VERIFICACION
npm run db:docs -- --full     # además sobrescribe MODELO_*.md y DER.md
```

Requisitos: variables `MYSQL*` en `.env` (ver `.env.example`). Con XAMPP/MySQL activo valida el esquema en vivo.

## Resumen

| Métrica | Valor |
|---------|-------|
| Tablas | **39** |
| Relaciones FK | **43** |
| Vistas | **0** |

### Tablas clave

- `lotes` — Lote — entidad central de trazabilidad
- `productores` — Productores de café
- `usuarios` — Cuentas de acceso al sistema
- `trazabilidad` — Etapas del ciclo del lote
- `control_calidad` — Evaluación sensorial por lote (1:1)
- `predicciones_ia` — Predicciones de calidad por lote
- `alertas_ia` — Alertas del módulo IA
- `inventario` — Stock disponible por lote
- `auditoria_logs` — Registro de acciones API/sistema

### Fuentes del proyecto

- `backend/sql/schema.sql` — DDL principal (39 tablas)
- `backend/src/infrastructure/database/migrate.js` — migración al arranque
- `backend/sql/views.sql` — vistas de dashboard
- `backend/sql/migrations/*.sql` — cambios incrementales PMV2
