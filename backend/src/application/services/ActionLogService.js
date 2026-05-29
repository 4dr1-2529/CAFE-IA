import { execute } from '../../infrastructure/database/pool.js'
import { columnExists } from '../../infrastructure/database/schemaHelpers.js'

function toSafeJson(value) {
  try {
    return JSON.stringify(value ?? {})
  } catch {
    return JSON.stringify({ note: 'detalle_no_serializable' })
  }
}

export function requestMeta(req) {
  return {
    req,
    user: req.user,
    ip: req.ip,
    userAgent: req.get('user-agent'),
    metodo: req.method,
    ruta: req.originalUrl?.split('?')[0] || req.path,
  }
}

function userFields(params = {}) {
  return {
    usuarioId: params.usuarioId ?? null,
    usuarioNombre: params.usuarioNombre ?? null,
    usuarioEmail: params.usuarioEmail ?? null,
    rol: params.rol ?? null,
  }
}

export class ActionLogService {
  static fromMeta(meta = {}, fields = {}) {
    const user = meta.user
    return ActionLogService.log({
      ...userFields({
        usuarioId: fields.usuarioId ?? user?.sub ?? null,
        usuarioNombre: fields.usuarioNombre ?? user?.nombre ?? null,
        usuarioEmail: fields.usuarioEmail ?? user?.email ?? null,
        rol: fields.rol ?? user?.rol ?? null,
      }),
      metodo: fields.metodo ?? meta.metodo ?? null,
      ruta: fields.ruta ?? meta.ruta ?? null,
      ip: fields.ip ?? meta.ip ?? null,
      userAgent: fields.userAgent ?? meta.userAgent ?? null,
      accion: fields.accion,
      modulo: fields.modulo ?? null,
      descripcion: fields.descripcion ?? null,
      entidad: fields.entidad ?? null,
      entidadId: fields.entidadId ?? null,
      resultado: fields.resultado ?? 'exito',
      detalle: fields.detalle ?? {},
      req: meta.req,
    })
  }

  static async log({
    usuarioId = null,
    usuarioNombre = null,
    usuarioEmail = null,
    rol = null,
    accion,
    modulo = null,
    descripcion = null,
    entidad = null,
    entidadId = null,
    metodo = null,
    ruta = null,
    resultado = 'exito',
    ip = null,
    userAgent = null,
    detalle = {},
    req = null,
  }) {
    if (!accion) return
    const payload = {
      modulo,
      descripcion,
      resultado,
      user_agent: userAgent,
      usuario_nombre: usuarioNombre,
      usuario_email: usuarioEmail,
      rol,
      metodo,
      ruta,
      ...detalle,
    }
    try {
      const hasExtended = await columnExists('auditoria_logs', 'modulo')
      if (hasExtended) {
        await execute(
          `INSERT INTO auditoria_logs (
            usuario_id, usuario_nombre, usuario_email, rol,
            accion, modulo, descripcion, entidad, entidad_id,
            metodo, ruta, detalle, ip_address, user_agent
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            usuarioId,
            usuarioNombre,
            usuarioEmail,
            rol,
            accion,
            modulo,
            descripcion,
            entidad,
            entidadId,
            metodo,
            ruta,
            toSafeJson(payload),
            ip,
            userAgent,
          ]
        )
      } else {
        await execute(
          `INSERT INTO auditoria_logs (usuario_id, accion, entidad, entidad_id, detalle, ip_address)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [usuarioId, accion, entidad, entidadId, toSafeJson(payload), ip]
        )
      }
      if (req) req._auditLogged = true
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[ActionLogService]', err.message?.slice(0, 120))
      }
    }
  }
}
