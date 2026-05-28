# Datos de prueba PMV2 — Multiusuario

Dataset ordenado para pruebas de roles **ADMIN** y **CLIENTE** con códigos automáticos legibles.

## Ejecutar el seed

```bash
cd backend
npm run db:seed:multiusuario
```

Para **limpiar y regenerar** aunque ya existan lotes:

```bash
# Windows PowerShell
$env:SEED_MULTIUSUARIO_FORCE="1"; npm run db:seed:multiusuario

# Linux / macOS
SEED_MULTIUSUARIO_FORCE=1 npm run db:seed:multiusuario
```

El script:

1. Conserva `admin@cafeai.com`
2. Elimina datos demo (productores, lotes, trazabilidad, calidad, IA, auditoría, etc.)
3. Elimina usuarios CLIENTE anteriores
4. Crea 5 clientes + 25 productores + 125 lotes + datos relacionados

## Credenciales

### Administrador (conservado)

| Campo | Valor |
|--------|--------|
| Email | `admin@cafeai.com` |
| Código | `ADM-001` |
| Rol | ADMIN |
| Contraseña | La definida en el seed/migración inicial del proyecto (no se muestra en pantalla de login) |

### Clientes (generados por seed)

Contraseña común para los 5 clientes: **`mbappe29`**

| Código | Nombre | Email |
|--------|--------|--------|
| USU-001 | Cliente Uno Café | cliente1@cafeai.com |
| USU-002 | Cliente Dos Café | cliente2@cafeai.com |
| USU-003 | Cliente Tres Café | cliente3@cafeai.com |
| USU-004 | Cliente Cuatro Café | cliente4@cafeai.com |
| USU-005 | Cliente Cinco Café | cliente5@cafeai.com |

> La contraseña **no** aparece en la UI de login. Solo en esta documentación interna.

## Totales esperados

| Entidad | Cantidad |
|---------|----------|
| ADMIN | 1 |
| CLIENTES | 5 |
| Productores | 25 (5 × 5) |
| Lotes | 125 (25 × 5) |
| Trazabilidad | 625 (125 × 5 etapas) |
| Control de calidad | 125 (1 por lote) |
| Predicciones IA | 125 (1 por lote) |
| Producción | 125 (1 por lote) |

### Datos pendientes (opcional)

Para añadir **5 productores** y **15 lotes** sin trazabilidad, calidad ni IA (práctica manual):

```bash
cd backend
npm run db:seed:pendientes
```

Tras el seed pendientes (sobre dataset existente):

| Entidad | Extra |
|---------|-------|
| Productores | +5 (`PROD-USU-00X-006`) |
| Lotes | +15 (`LOT-USU-00X-P006-001` … `003`) |

Los clientes quedan con contraseña **`mbappe29`** (bcrypt).

## Esquema de códigos

### Usuario

- Admin: `ADM-001`
- Clientes: `USU-001` … `USU-005`

### Productor

`PROD-{codigoUsuario}-{correlativo}`

Ejemplos:

- `PROD-USU-001-001`
- `PROD-USU-002-003`

### Lote

`LOT-{codigoUsuario}-{Pxxx}-{correlativo}`

Donde `P001` es el productor corto (correlativo del productor).

Ejemplos:

- `LOT-USU-001-P001-001`
- `LOT-USU-001-P002-003`
- `LOT-USU-003-P005-005`

El backend genera estos códigos automáticamente al registrar productores y lotes (no los escribe el cliente).

## Relaciones

```
usuarios (CLIENTE)
  └── productores (user_id)
        └── lotes (user_id, productor_id)
              ├── trazabilidad
              ├── produccion
              ├── control_calidad
              └── predicciones_ia
```

- Cada **CLIENTE** solo ve registros con su `user_id`.
- **ADMIN** ve el universo completo en dashboard y módulos globales.

## Cómo probar

### ADMIN

1. Login: `admin@cafeai.com`
2. Dashboard global: ~5 clientes, 25 productores, 125 lotes
3. Módulos: Usuarios, Auditoría, Base de datos, todos los lotes

### CLIENTE 1

1. Login: `cliente1@cafeai.com` / `mabppe29`
2. Dashboard personal: 5 productores, 25 lotes propios
3. Verificar que **no** aparecen datos de `cliente2@…`

### Flujo CLIENTE

1. Productores → listar solo los 5 de USU-001
2. Registro producción → nuevo lote con código auto `LOT-USU-001-P00x-00y`
3. Trazabilidad / Calidad / IA → solo sobre sus lotes

## Archivos relacionados

| Archivo | Descripción |
|---------|-------------|
| `backend/scripts/seedMultiusuarioPMV2.js` | Script principal Node + bcrypt |
| `backend/sql/migrations/004_codigo_usuario.sql` | Columna `codigo_usuario` |
| `backend/src/shared/CodeGenerator.js` | Reglas de códigos |
| `backend/src/infrastructure/database/apply-migrations.js` | Aplica migración en arranque |

## Notas

- No se eliminan tablas ni estructura SQL.
- La auditoría anterior se limpia; se registran eventos nuevos del seed.
- Variables de entorno MySQL: `backend/.env` (ver `backend/.env.example`).
