/**
 * Ejecuta SQL global o con scope de usuario sin concatenar fragmentos en el repositorio.
 */
import { query, queryOne } from '../infrastructure/database/pool.js'

export function parseScopedUserId(userId) {
  if (userId == null || userId === '') return null
  const id = Number(userId)
  if (!Number.isInteger(id) || id < 1) {
    throw Object.assign(new Error('userId inválido'), { status: 400 })
  }
  return id
}

export async function queryOneScoped(userId, sqlGlobal, sqlScoped) {
  const id = parseScopedUserId(userId)
  if (id) return queryOne(sqlScoped, [id])
  return queryOne(sqlGlobal, [])
}

export async function queryScoped(userId, sqlGlobal, sqlScoped) {
  const id = parseScopedUserId(userId)
  if (id) return query(sqlScoped, [id])
  return query(sqlGlobal, [])
}
