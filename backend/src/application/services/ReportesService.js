import { ReportesRepository } from '../../infrastructure/repositories/ReportesRepository.js'
import { ReportExportService } from './ReportExportService.js'
import { ActionLogService } from './ActionLogService.js'
import { RoleHelper } from '../../shared/RoleHelper.js'
import { wrapReportesResponse } from '../../shared/reportesResponse.js'

const EXPORT_TIPOS = new Set(['produccion', 'calidad', 'trazabilidad', 'ia', 'predicciones'])

function normalizeExportTipo(tipo) {
  const t = String(tipo || '').toLowerCase()
  if (t === 'predicciones') return 'ia'
  if (!EXPORT_TIPOS.has(t)) {
    throw Object.assign(new Error('Tipo de reporte inválido'), { status: 400 })
  }
  return t === 'predicciones' ? 'ia' : t
}

export class ReportesService {
  static async getProduccion(meta = {}) {
    RoleHelper.requireAuth(meta.user)
    const data = await ReportesRepository.produccion(RoleHelper.scopeUserId(meta.user))
    return wrapReportesResponse(meta.user, data)
  }

  static async getCalidad(meta = {}) {
    RoleHelper.requireAuth(meta.user)
    const data = await ReportesRepository.calidad(RoleHelper.scopeUserId(meta.user))
    return wrapReportesResponse(meta.user, data)
  }

  static async getPredicciones(meta = {}) {
    RoleHelper.requireAuth(meta.user)
    const data = await ReportesRepository.predicciones(RoleHelper.scopeUserId(meta.user))
    return wrapReportesResponse(meta.user, data)
  }

  static async getTrazabilidad(meta = {}) {
    RoleHelper.requireAuth(meta.user)
    const isAdmin = RoleHelper.isAdmin(meta.user)
    const data = await ReportesRepository.trazabilidad(RoleHelper.scopeUserId(meta.user))
    ActionLogService.log({
      usuarioId: meta.user.sub,
      accion: isAdmin ? 'CONSULTAR_REPORTE_TRAZABILIDAD_GLOBAL' : 'CONSULTAR_REPORTE_TRAZABILIDAD_PERSONAL',
      modulo: 'reportes',
      descripcion: isAdmin
        ? 'Administrador consultó reporte de trazabilidad global'
        : 'Cliente consultó reporte de trazabilidad personal',
      entidad: 'reportes',
      entidadId: null,
      ip: meta.ip,
      userAgent: meta.userAgent,
      resultado: 'exito',
    }).catch(() => {})
    return wrapReportesResponse(meta.user, data)
  }

  static async export(tipo, formato, meta = {}) {
    RoleHelper.requireAuth(meta.user)
    const tipoNorm = normalizeExportTipo(tipo)
    const userId = RoleHelper.scopeUserId(meta.user)
    const isAdmin = RoleHelper.isAdmin(meta.user)
    const alcance = isAdmin ? 'GLOBAL' : 'PERSONAL'
    const data = await ReportExportService.buildReportData(tipoNorm, userId, {
      email: meta.user.email,
      rol: isAdmin ? 'ADMIN' : 'CLIENTE',
      alcance,
      nombre: meta.user.nombre,
    })
    const plain = JSON.stringify(data?.rows || data?.resumen || data || {})
    if (!data || plain === '{}' || plain === '[]') {
      throw Object.assign(new Error('No hay datos para exportar el reporte solicitado'), { status: 400 })
    }
    const auditDesc = `${isAdmin ? 'ADMIN' : 'CLIENTE'} generó reporte ${alcance} ${tipoNorm} ${formato.toUpperCase()}`
    if (formato === 'pdf') {
      await ActionLogService.log({
        usuarioId: meta.user.sub,
        accion: isAdmin ? 'GENERAR_REPORTE_GLOBAL_PDF' : 'GENERAR_REPORTE_PERSONAL_PDF',
        modulo: 'reportes',
        descripcion: auditDesc,
        entidad: 'reportes',
        resultado: 'exito',
        ip: meta.ip,
        userAgent: meta.userAgent,
      })
      return { buffer: await ReportExportService.toPdf(tipoNorm, data), contentType: 'application/pdf', ext: 'pdf' }
    }
    if (formato === 'excel' || formato === 'xlsx') {
      await ActionLogService.log({
        usuarioId: meta.user.sub,
        accion: isAdmin ? 'GENERAR_REPORTE_GLOBAL_EXCEL' : 'GENERAR_REPORTE_PERSONAL_EXCEL',
        modulo: 'reportes',
        descripcion: auditDesc,
        entidad: 'reportes',
        resultado: 'exito',
        ip: meta.ip,
        userAgent: meta.userAgent,
      })
      return {
        buffer: await ReportExportService.toExcel(tipoNorm, data),
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ext: 'xlsx',
      }
    }
    throw Object.assign(new Error('Formato no soportado. Use pdf o excel'), { status: 400 })
  }
}
