import mysql from 'mysql2/promise'
import { loadEnv, assertMysqlEnv } from '../../config/database.js'

loadEnv()

let pool = null

function poolOptions() {
  assertMysqlEnv()
  const opts = {
    host: process.env.MYSQLHOST,
    port: Number(process.env.MYSQLPORT),
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_POOL_MAX) || 10,
    queueLimit: 0,
    enableKeepAlive: true,
    charset: 'utf8mb4_unicode_ci',
    dateStrings: true,
  }
  if (process.env.MYSQL_SSL === 'true' || process.env.RAILWAY_ENVIRONMENT) {
    opts.ssl = { rejectUnauthorized: false }
  }
  return opts
}

export function getPool() {
  if (!pool) {
    pool = mysql.createPool(poolOptions())
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
