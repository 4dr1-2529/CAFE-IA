import { execute } from '../../infrastructure/database/pool.js'

function toSafeJson(value) {
  try {
    return JSON.stringify(value ?? {})
  } catch {
    return JSON.stringify({ note: 'detalle_no_serializable' })
  }
}

export class ActionLogService {
  static async log({
    usuarioId = null,
    accion,
    modulo = null,
    descripcion = null,
    entidad = null,
    entidadId = null,
    resultado = 'exito',
    ip = null,
    userAgent = null,
    detalle = {},
  }) {
    if (!accion) return
    const payload = {
      modulo,
      descripcion,
      resultado,
      user_agent: userAgent,
      ...detalle,
    }
    try {
      await execute(
        `INSERT INTO auditoria_logs (usuario_id, accion, entidad, entidad_id, detalle, ip_address)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [usuarioId, accion, entidad, entidadId, toSafeJson(payload), ip]
      )
    } catch {
      // La auditoría nunca debe bloquear la operación principal.
    }
  }
}
