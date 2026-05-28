import { LoteRepository } from '../../infrastructure/repositories/LoteRepository.js'
import { ProductorRepository } from '../../infrastructure/repositories/ProductorRepository.js'
import { UsuarioRepository } from '../../infrastructure/repositories/UsuarioRepository.js'
import { TrazabilidadRepository } from '../../infrastructure/repositories/TrazabilidadRepository.js'
import { CatalogRepository } from '../../infrastructure/repositories/CatalogRepository.js'
import { AppError } from '../../shared/AppError.js'
import { RoleHelper } from '../../shared/RoleHelper.js'
import { validateCreateLote } from '../validators/lote.validator.js'
import { ActionLogService } from './ActionLogService.js'

const ESTADOS_VALIDOS = new Set(['Produccion', 'Secado', 'Calidad', 'Almacenamiento', 'Comercializacion'])

function parsePreviewCode(codigo) {
  const parts = String(codigo || '').split('-')
  if (parts.length >= 6 && parts[0] === 'LOT') {
    return {
      numeroLote: parts.slice(5).join('-'),
      usuarioCodigo: `${parts[1]}-${parts[2]}-${parts[3]}`,
    }
  }
  const m = String(codigo).match(/LOT-(\d+)-(\d+)/)
  return m ? { numeroLote: m[2], usuarioCodigo: `USR-${m[1]}` } : { numeroLote: null, usuarioCodigo: null }
}

export class LoteService {
  static async list(meta = {}) {
    RoleHelper.requireAuth(meta.user)
    if (RoleHelper.isAdmin(meta.user)) return LoteRepository.findAllAdmin()
    return LoteRepository.findAllByUser(meta.user.sub)
  }

  static async getById(id, meta = {}) {
    RoleHelper.requireAuth(meta.user)
    if (!id) throw new AppError('ID inválido', 400)
    const isAdmin = RoleHelper.isAdmin(meta.user)
    const row = await LoteRepository.findById(id, { includeRegistrant: isAdmin })
    if (!row) throw new AppError('Lote no encontrado', 404)
    if (!isAdmin && Number(row.user_id) !== Number(meta.user.sub)) {
      throw new AppError('No tiene permiso para ver este lote', 403)
    }
    if (!isAdmin) {
      const { user_id, nombre_usuario, email_usuario, ...rest } = row
      return rest
    }
    return row
  }

  static async nextCode(meta = {}, query = {}) {
    RoleHelper.requireAuth(meta.user)
    let targetUserId = meta.user.sub
    if (RoleHelper.isAdmin(meta.user) && query.user_id) {
      const uid = Number(query.user_id)
      const u = await UsuarioRepository.findById(uid)
      if (!u) throw new AppError('Usuario responsable no encontrado', 400)
      targetUserId = uid
    }
    const productorId = query.productor_id ? Number(query.productor_id) : null
    const nextCode = await LoteRepository.nextCodeForUser(targetUserId, productorId || undefined)
    const parsed = nextCode ? { codigoInterno: nextCode, ...parsePreviewCode(nextCode) } : {}
    return { nextCode, ...parsed, preview: true, user_id: targetUserId }
  }

  static async resolveOwnerUserId(actor, body) {
    const actorDb = await UsuarioRepository.findById(actor.sub)
    if (!actorDb) throw new AppError('Usuario no autenticado', 401)

    let ownerId = actor.sub
    if (RoleHelper.isAdmin(actor)) {
      const raw = body.responsable_user_id ?? body.usuario_responsable_id
      if (raw == null || raw === '') {
        throw new AppError('Debe seleccionar el cliente responsable', 400)
      }
      const uid = Number(raw)
      const target = await UsuarioRepository.findById(uid)
      if (!target) throw new AppError('Usuario responsable no encontrado', 400)
      ownerId = target.id
    }
    return { ownerId, actorDb }
  }

  static async assertProductorAccess(actor, productorId, ownerId) {
    const prod = await RoleHelper.assertProductorAccess(productorId, actor)
    if (Number(prod.user_id) !== Number(ownerId)) {
      throw new AppError('El productor no pertenece al cliente seleccionado', 403)
    }
    return prod
  }

  static validateBody(body) {
    const errors = validateCreateLote(body)
    if (errors.length) throw new AppError(errors.join('; '), 400)
    if (body.estado && !ESTADOS_VALIDOS.has(body.estado)) {
      throw new AppError('estado de lote no válido', 400)
    }
  }

  static async create(body, meta = {}) {
    RoleHelper.requireAuth(meta.user)
    LoteService.validateBody(body)

    const { ownerId, actorDb } = await LoteService.resolveOwnerUserId(meta.user, body)
    const productorId = Number(body.productor_id)
    const prod = await LoteService.assertProductorAccess(meta.user, productorId, ownerId)

    const code = await LoteRepository.nextCodeForUser(ownerId, productorId)
    const ownerUser = ownerId === meta.user.sub ? actorDb : await UsuarioRepository.findById(ownerId)

    try {
      const catalog = await CatalogRepository.resolveLoteFk(body)
      const loteId = await LoteRepository.create({
        ...body,
        ...catalog,
        codigo_lote: code,
        user_id: ownerId,
        productor_id: productorId,
      })
      const ubicacion = prod?.parcela || prod?.ubicacion || ''
      await TrazabilidadRepository.seedDefaultEtapas(loteId, body.fecha_cosecha, ubicacion, ownerId)
      const qr = `CAFE-${loteId}-${Date.now().toString(36).toUpperCase()}`
      await LoteRepository.updateQr(loteId, qr)
      await LoteRepository.seedInventario(loteId, body.cantidad_kg)
      const row = await LoteRepository.findRawById(loteId)

      const nombreReg = `${ownerUser?.nombres || ''} ${ownerUser?.apellidos || ''}`.trim()
      const parcela = prod?.parcela || 'productor'
      const auditDesc = RoleHelper.isAdmin(meta.user)
        ? `ADMIN registró lote ${row?.codigo_lote || code} para CLIENTE ${nombreReg} (productor ${parcela}, ${body.cantidad_kg} kg)`
        : `CLIENTE registró lote propio ${row?.codigo_lote || code} (productor ${parcela}, ${body.cantidad_kg} kg)`

      await ActionLogService.log({
        usuarioId: meta.user.sub,
        accion: 'CREAR_LOTE',
        modulo: 'lotes',
        descripcion: auditDesc,
        entidad: 'lotes',
        entidadId: loteId,
        ip: meta.ip,
        userAgent: meta.userAgent,
        resultado: 'exito',
        detalle: {
          codigo_lote: row?.codigo_lote || code,
          user_id: ownerId,
          productor_id: productorId,
          cantidad_kg: body.cantidad_kg,
        },
      })
      await ActionLogService.log({
        usuarioId: meta.user.sub,
        accion: 'GENERAR_QR_TRAZABILIDAD',
        modulo: 'trazabilidad',
        descripcion: `QR generado para lote ${row?.codigo_lote || code}`,
        entidad: 'lotes',
        entidadId: loteId,
        ip: meta.ip,
        userAgent: meta.userAgent,
      })
      return row
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') throw new AppError('Ya existe un lote con ese código', 409)
      throw e
    }
  }
}
