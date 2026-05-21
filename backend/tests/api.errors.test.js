import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createApp } from '../src/app.js'

test('GET /api/ruta-inexistente responde 404', async () => {
  const app = createApp()
  const server = app.listen(0)
  const port = server.address().port
  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/no-existe`)
    assert.equal(res.status, 404)
    const body = await res.json()
    assert.ok(body.message)
  } finally {
    server.close()
  }
})

test('POST /api/lotes sin token responde 401', async () => {
  const app = createApp()
  const server = app.listen(0)
  const port = server.address().port
  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/lotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    assert.equal(res.status, 401)
  } finally {
    server.close()
  }
})
