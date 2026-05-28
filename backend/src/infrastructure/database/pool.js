import mysql from 'mysql2/promise'
import { env } from '../../config/env.js'

let pool = null

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: env.db.host,
      port: env.db.port,
      user: env.db.user,
      password: env.db.password,
      database: env.db.database,
      waitForConnections: true,
      connectionLimit: env.db.poolMax,
      queueLimit: 0,
      enableKeepAlive: true,
      charset: 'utf8mb4_unicode_ci',
      dateStrings: true
    })
    pool.on('connection', (conn) => {
      conn.query("SET NAMES 'utf8mb4' COLLATE 'utf8mb4_unicode_ci'")
    })
  }
  return pool
}

export async function query(sql, params = []) {
  const [rows] = await getPool().execute(sql, params)
  return rows
}

export async function queryOne(sql, params = []) {
  const rows = await query(sql, params)
  return rows[0] ?? null
}

export async function execute(sql, params = []) {
  const [result] = await getPool().execute(sql, params)
  return result
}

export async function testConnection() {
  const conn = await getPool().getConnection()
  await conn.ping()
  conn.release()
  return true
}

export async function closePool() {
  if (pool) {
    await pool.end()
    pool = null
  }
}
