import { queryOne } from '../database/pool.js'

const VARIEDAD_MAP = {
  Arabica: 'ARB',
  Typica: 'TYP',
  Bourbon: 'BOU',
  Caturra: 'CAT',
  Catimor: 'CTM',
}

const SECADO_MAP = {
  Natural: 'NAT',
  Lavado: 'LAV',
  Wash: 'LAV',
  'Semi-Wash': 'HON',
  Honey: 'HON',
}

const ESTADO_MAP = {
  Produccion: 'PROD',
  Secado: 'SEC',
  Calidad: 'CAL',
  Almacenamiento: 'ALM',
  Comercializacion: 'COM',
}

export class CatalogRepository {
  static async variedadIdByNombre(nombre) {
    const codigo = VARIEDAD_MAP[nombre] || 'ARB'
    const row = await queryOne(`SELECT id FROM variedades_cafe WHERE codigo=? LIMIT 1`, [codigo])
    return row?.id ?? null
  }

  static async procesoSecadoIdByNombre(nombre) {
    const codigo = SECADO_MAP[nombre] || 'NAT'
    const row = await queryOne(`SELECT id FROM procesos_secado WHERE codigo=? LIMIT 1`, [codigo])
    return row?.id ?? null
  }

  static async estadoLoteIdByNombre(estado) {
    const codigo = ESTADO_MAP[estado] || 'PROD'
    const row = await queryOne(`SELECT id FROM estados_lote WHERE codigo=? LIMIT 1`, [codigo])
    return row?.id ?? null
  }

  static async resolveLoteFk(body) {
    const variedad_cafe = body.variedad_cafe || 'Arabica'
    const tipo_secado = body.tipo_secado || 'Natural'
    const estado = body.estado || 'Produccion'
    return {
      variedad_cafe,
      tipo_secado,
      variedad_id: await CatalogRepository.variedadIdByNombre(variedad_cafe),
      proceso_secado_id: await CatalogRepository.procesoSecadoIdByNombre(tipo_secado),
      estado_lote_id: await CatalogRepository.estadoLoteIdByNombre(estado),
      estado,
    }
  }
}
