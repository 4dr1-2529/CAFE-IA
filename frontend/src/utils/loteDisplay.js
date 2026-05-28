/**
 * Presentación amigable de códigos de lote (LOT-USU-003-P005-003 → N° 003).
 */

export function parseLoteCodigo(codigoLote = '') {
  const raw = String(codigoLote || '').trim()
  if (!raw) return { numero: '—', codigoInterno: raw, usuarioCodigo: null, productorShort: null }

  const parts = raw.split('-')
  // LOT-USU-003-P005-003
  if (parts.length >= 6 && parts[0] === 'LOT') {
    const usuarioCodigo = `${parts[1]}-${parts[2]}-${parts[3]}`
    const productorShort = parts[4]
    const numero = parts.slice(5).join('-') || parts[parts.length - 1]
    return {
      numero: String(numero).padStart(3, '0'),
      codigoInterno: raw,
      usuarioCodigo,
      productorShort,
    }
  }

  // Legacy LOT-20-026
  const legacy = raw.match(/LOT[E]?-(\d+)-(\d+)/i)
  if (legacy) {
    return {
      numero: String(legacy[2]).padStart(3, '0'),
      codigoInterno: raw,
      usuarioCodigo: `USR-${legacy[1]}`,
      productorShort: null,
    }
  }

  return { numero: raw.replace(/^LOT-?/i, '').slice(-3) || raw, codigoInterno: raw, usuarioCodigo: null, productorShort: null }
}

export function tituloLote(codigoLote) {
  const { numero } = parseLoteCodigo(codigoLote)
  return `Lote N° ${numero}`
}

export function subtituloLote(lote = {}) {
  const prod = lote.productor || lote.parcela || 'Sin productor'
  const kg = lote.cantidad_kg ?? lote.cantidad ?? '—'
  const fecha = lote.fecha_cosecha || '—'
  return `${prod} · ${kg} kg · ${fecha}`
}
