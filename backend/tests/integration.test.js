import { test, describe, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { createApp } from '../src/app.js'
import { closePool } from '../src/infrastructure/database/pool.js'

let token = null
let app
let baseUrl
let server

async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${baseUrl}${path}`, { ...options, headers })
  const text = await res.text()
  const data = text ? JSON.parse(text) : null
  return { res, data }
}

describe('Integración API PMV2', { skip: process.env.SKIP_INTEGRATION === '1' }, () => {
  before(async () => {
    const { applyMultiusuarioMigrations } = await import('../src/infrastructure/database/apply-migrations.js')
    await applyMultiusuarioMigrations()
    app = createApp()
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        baseUrl = `http://127.0.0.1:${server.address().port}/api`
        resolve(server)
      })
    })
  })

  after(async () => {
    if (!server) return
    await new Promise((resolve) => server.close(resolve))
    await closePool()
  })

  test('login admin', async () => {
    const { res, data } = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@cafeai.com', password: 'admin123' }),
    })
    assert.equal(res.status, 200)
    assert.ok(data.accessToken)
    token = data.accessToken
  })

  test('GET /lotes con JWT', async () => {
    const { res, data } = await api('/lotes')
    assert.equal(res.status, 200)
    assert.ok(Array.isArray(data))
  })

  test('POST /lotes sin token responde 401', async () => {
    const prev = token
    token = null
    const { res } = await api('/lotes', { method: 'POST', body: JSON.stringify({}) })
    token = prev
    assert.equal(res.status, 401)
  })

  test('POST /lotes inválido responde 400', async () => {
    const { res } = await api('/lotes', { method: 'POST', body: JSON.stringify({}) })
    assert.equal(res.status, 400)
  })

  test('GET /dashboard/metrics', async () => {
    const { res, data } = await api('/dashboard/metrics')
    assert.equal(res.status, 200)
    assert.ok(data.kpis)
    assert.equal(data.rol, 'ADMIN')
    assert.ok(Number(data.cards?.totalClientes ?? data.totalClientes) >= 0)
  })
})
