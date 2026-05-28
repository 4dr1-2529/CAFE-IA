import { ProductorRepository } from '../../infrastructure/repositories/ProductorRepository.js'
import { AppError } from '../../shared/AppError.js'
import { RoleHelper } from '../../shared/RoleHelper.js'
import { validateProductorBody } from '../validators/productor.validator.js'
import { ActionLogService } from './ActionLogService.js'
import { queryOne } from '../../infrastructure/database/pool.js'

export class ProductorService {
  static async assertClienteActivo(userId) {
    const row = await queryOne(
      `SELECT u.id, u.nombres, u.apellidos, r.codigo AS rol
       FROM usuarios u
       JOIN roles r ON u.rol_id = r.id
       WHERE u.id = ? AND u.deleted_at IS NULL AND u.activo = 1`,
      [userId]
    )
    if (!row) throw new AppError('Cliente no encontrado o inactivo', 404)
    if (row.rol !== 'cliente') throw new AppError('El usuario seleccionado no es un cliente activo', 400)
    return row
  }

  static async list(meta = {}, query = {}) {
    RoleHelper.requireAuth(meta.user)
    const isAdmin = RoleHelper.isAdmin(meta.user)

    if (!isAdmin && query.user_id && Number(query.user_id) !== Number(meta.user.sub)) {
      throw new AppError('No puede consultar productores de otro cliente', 403)
    }

    if (isAdmin && query.user_id) {
      const uid = Number(query.user_id)
      if (!uid || Number.isNaN(uid)) throw new AppError('user_id inválido', 400)
      return ProductorRepository.findByUserId(uid)
    }

    return ProductorRepository.findAllForUser({
      userId: Number(meta.user.sub),
      isAdmin,
    })
  }

  static parseBody(body) {
    const errors = validateProductorBody(body)
    if (errors.length) throw new AppError(errors.join('; '), 400)
    const nombres = body.nombres || body.nombre || ''
    const apellidos = body.apellidos || body.apellido || ''
    const correo = body.correo || body.email || ''
    const { dni, telefono, parcela, ubicacion, altitud, estado } = body
    return {
      nombres: nombres.trim(),
      apellidos: apellidos.trim(),
      dni: String(dni).trim(),
      telefono,
      correo: correo.trim(),
      parcela,
      ubicacion,
      altitud,
      estado,
    }
  }

  static async create(body, meta = {}) {
    RoleHelper.requireAuth(meta.user)
    const data = ProductorService.parseBody(body)
    const isAdmin = RoleHelper.isAdmin(meta.user)

    if (isAdmin) {
      const uid = Number(body.user_id)
      if (!uid || Number.isNaN(uid)) throw new AppError('Debe seleccionar el cliente responsable', 400)
      const cliente = await ProductorService.assertClienteActivo(uid)
      data.user_id = uid
      data._clienteLabel = `${cliente.nombres} ${cliente.apellidos || ''}`.trim()
    } else {
      data.user_id = Number(meta.user.sub)
    }

    const scope = await ProductorRepository.findByUserId(data.user_id)
    if (scope.some((p) => String(p.dni) === String(data.dni))) throw new AppError('dni duplicado', 409)
    if (scope.some((p) => String(p.correo || '').toLowerCase() === String(data.correo || '').toLowerCase())) {
      throw new AppError('correo duplicado', 409)
    }

    const row = await ProductorRepository.create(data)
    await ActionLogService.log({
      usuarioId: meta.user.sub,
      accion: 'CREAR_PRODUCTOR',
      modulo: 'productores',
      descripcion: isAdmin
        ? `ADMIN registró productor ${row?.codigo || ''} para CLIENTE ${data._clienteLabel || data.user_id}`
        : `CLIENTE registró productor propio ${row?.codigo || ''}`,
      entidad: 'productores',
      entidadId: row?.id || null,
      ip: meta.ip,
      userAgent: meta.userAgent,
    })
    return row
  }

  static async update(id, body, meta = {}) {
    RoleHelper.requireAuth(meta.user)
    if (!id) throw new AppError('ID inválido', 400)
    await RoleHelper.assertProductorAccess(id, meta.user)
    const data = ProductorService.parseBody(body)
    const isAdmin = RoleHelper.isAdmin(meta.user)

    let userIdUpdate
    if (isAdmin && body.user_id != null && body.user_id !== '') {
      const uid = Number(body.user_id)
      if (!uid || Number.isNaN(uid)) throw new AppError('Debe seleccionar el cliente responsable', 400)
      await ProductorService.assertClienteActivo(uid)
      userIdUpdate = uid
    }

    const scope = await ProductorService.list(meta, isAdmin && userIdUpdate ? { user_id: userIdUpdate } : {})
    if (scope.some((p) => p.id !== Number(id) && String(p.dni) === String(data.dni))) {
      throw new AppError('dni duplicado', 409)
    }
    if (scope.some((p) => p.id !== Number(id) && String(p.correo || '').toLowerCase() === String(data.correo || '').toLowerCase())) {
      throw new AppError('correo duplicado', 409)
    }

    const row = await ProductorRepository.update(id, data, userIdUpdate)
    if (!row) throw new AppError('Productor no encontrado', 404)
    await ActionLogService.log({
      usuarioId: meta.user.sub,
      accion: 'EDITAR_PRODUCTOR',
      modulo: 'productores',
      descripcion: isAdmin
        ? `ADMIN editó productor ${row?.codigo || id}${userIdUpdate ? ` (cliente user_id=${userIdUpdate})` : ''}`
        : `CLIENTE editó productor propio ${row?.codigo || id}`,
      entidad: 'productores',
      entidadId: id,
      ip: meta.ip,
      userAgent: meta.userAgent,
    })
    return row
  }

  static async remove(id, meta = {}) {
    RoleHelper.requireAuth(meta.user)
    if (!id) throw new AppError('ID inválido', 400)
    await RoleHelper.assertProductorAccess(id, meta.user)
    const lotes = await ProductorRepository.countLotesByProductor(id)
    if (lotes > 0) throw new AppError('No se puede eliminar un productor con lotes registrados', 400)
    const n = await ProductorRepository.softDelete(id)
    if (!n) throw new AppError('Productor no encontrado', 404)
    await ActionLogService.log({
      usuarioId: meta.user.sub,
      accion: 'ELIMINAR_PRODUCTOR',
      modulo: 'productores',
      descripcion: `Eliminar productor ${id}`,
      entidad: 'productores',
      entidadId: id,
      ip: meta.ip,
      userAgent: meta.userAgent,
    })
  }
}
