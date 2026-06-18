# Esquema relacional — Café Sostenible AI

## Relaciones principales (multiusuario)

```
usuarios (1) ──────< (N) lotes
usuarios (1) ──────< (N) productores
productores (1) ───< (N) lotes
```

| Tabla        | Columna FK      | Referencia     | Descripción                          |
|-------------|-----------------|----------------|--------------------------------------|
| `lotes`     | `user_id`       | `usuarios.id`  | Usuario que registró el lote         |
| `lotes`     | `productor_id`  | `productores.id` | Productor / finca del lote         |
| `productores` | `user_id`     | `usuarios.id`  | Usuario que gestiona el productor    |
| `produccion` | `user_id`      | `usuarios.id`  | Responsable (heredado del lote)      |
| `predicciones_ia` | `user_id` | `usuarios.id`  | Usuario que ejecutó la predicción    |
| `control_calidad` | `user_id` | `usuarios.id`  | Responsable de la evaluación         |
| `trazabilidad` | `usuario_registro_id` | `usuarios.id` | Quién registró la etapa      |
| `usuarios`  | `productor_id`  | `productores.id` | Enlace opcional rol productor    |

## Roles

| Código | Alcance |
|--------|---------|
| `admin` | ADMIN — ve todo el sistema y gestiona usuarios |
| `usuario` | USUARIO — solo sus datos (`user_id = JWT.sub`) |
| `supervisor` / `productor` | USUARIO (alcance personal, reglas por módulo) |

## Código de lote automático

- Formato: `LOT-{USER_ID}-{CORRELATIVO}` (ej. `LOT-4-006`)
- Correlativo: `COUNT(lotes WHERE user_id = ?) + 1`
- `codigo_lote` es UNIQUE; el backend ignora cualquier valor enviado por el frontend.

## Reglas de acceso

| Rol        | Listar lotes              | Crear lote                          |
|-----------|---------------------------|-------------------------------------|
| `admin`   | Todos (+ registrante)     | Cualquier productor; opcional `responsable_user_id` |
| `supervisor` / `productor` | Solo `lotes.user_id = JWT.sub` | Productor propio o `productores.user_id` |

## Migración

Archivo: `backend/sql/migrations/001_multiusuario_lotes.sql`  
Aplicación automática al iniciar: `apply-migrations.js` (sin borrar datos; lotes sin `user_id` → admin id=1).
