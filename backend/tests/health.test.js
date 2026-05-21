import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createApp } from '../src/app.js'

test('GET /api/health responde ok', async () => {
  const app = createApp()
  const server = app.listen(0)
  const port = server.address().port
  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/health`)
    assert.equal(res.status, 200)
    const body = await res.json()
    assert.equal(body.ok, true)
    assert.match(body.revision, /mysql/)
  } finally {
    server.close()
  }
})
