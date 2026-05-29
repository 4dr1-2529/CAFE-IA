/**
 * Presentación amigable de códigos de lote.
 * L001 → "Lote N° 001"
 * LOT-USU-003-P005-003 → N° 003 (legacy)
 */

export function parseLoteCodigo(codigoLote = '') {
  const raw = String(codigoLote || '').trim()
  if (!raw) return { numero: '—', codigoInterno: raw, usuarioCodigo: null, productorShort: null }

  // Formato demo final: L001, L150
  const simple = raw.match(/^L(\d+)$/i)
  if (simple) {
    return {
      numero: String(simple[1]).padStart(3, '0'),
      codigoInterno: raw,
      usuarioCodigo: null,
      productorShort: null,
    }
  }

  const parts = raw.split('-')
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

export function nombreProductor(lote = {}) {
  if (lote.productor_nombre) return lote.productor_nombre
  if (typeof lote.productor === 'string' && lote.productor.trim()) return lote.productor.trim()
  const p = lote.productor
  if (p && typeof p === 'object') {
    const full = [p.nombres, p.apellidos].filter(Boolean).join(' ').trim()
    if (full) return full
  }
  const n = [lote.productor_nombres, lote.productor_apellidos].filter(Boolean).join(' ').trim()
  return n || null
}

export function tituloLote(codigoLote, productorNombre) {
  const { numero } = parseLoteCodigo(codigoLote)
  const prod = productorNombre || null
  if (prod) return `Lote N° ${numero} - Productor ${prod}`
  return `Lote N° ${numero}`
}

export function tituloLoteFromRecord(lote = {}) {
  return tituloLote(lote.codigo_lote || lote.codigo, nombreProductor(lote))
}

export function subtituloLote(lote = {}) {
  const prod = nombreProductor(lote) || lote.parcela || 'Sin productor'
  const kg = lote.cantidad_kg ?? lote.cantidad ?? '—'
  const fecha = lote.fecha_cosecha || '—'
  const estado = lote.estado ? ` · ${lote.estado}` : ''
  return `${prod} · ${kg} kg · ${fecha}${estado}`
}
