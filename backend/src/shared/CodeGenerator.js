/**
 * Generación automática de códigos legibles (multiusuario PMV2).
 */

export class CodeGenerator {
  static productorCode(codigoUsuario, correlativo) {
    const cu = String(codigoUsuario || 'USU-000').trim()
    const n = String(correlativo).padStart(3, '0')
    return `PROD-${cu}-${n}`
  }

  /** P001 a partir del correlativo numérico del productor (1..n) */
  static productorShort(correlativo) {
    return `P${String(correlativo).padStart(3, '0')}`
  }

  /** Extrae P001 de PROD-USU-001-003 */
  static shortFromProductorCode(codigoProductor) {
    const parts = String(codigoProductor || '').split('-')
    const last = parts.at(-1) || '001'
    return `P${String(last).padStart(3, '0')}`
  }

  static loteCode(codigoUsuario, productorShort, correlativo) {
    const cu = String(codigoUsuario || 'USU-000').trim()
    const ps = String(productorShort || 'P001').trim()
    const n = String(correlativo).padStart(3, '0')
    return `LOT-${cu}-${ps}-${n}`
  }
}
