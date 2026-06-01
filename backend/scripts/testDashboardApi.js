/**
 * Prueba HTTP del dashboard como ADMIN
 */
import { initDatabase } from '../src/infrastructure/database/migrate.js'
import { AuthService } from '../src/application/services/AuthService.js'
import { closePool } from '../src/infrastructure/database/pool.js'

const passwords = ['admin123', 'Admin123', 'admin', 'password', 'mabppe29', 'mbappe29']

function sanitizeLog(value) {
  return String(value ?? '')
    .replaceAll(/[\r\n\t<>]/g, ' ')
    .replaceAll(/\s+/g, ' ')
    .trim()
    .slice(0, 200)
}

async function main() {
  await initDatabase()
  let login = null
  for (const p of passwords) {
    try {
      login = await AuthService.login('admin@cafeai.com', p)
      console.log('Login OK (credencial de prueba válida)')
      break
    } catch {
      // next
    }
  }
  if (!login?.accessToken) {
    console.log('No se pudo login admin — prueba manual con tu contraseña')
    await closePool()
    return
  }

  const res = await fetch('http://localhost:3029/api/dashboard', {
    headers: { Authorization: `Bearer ${login.accessToken}` },
  })
  const text = await res.text()
  console.log('Status:', res.status)
  try {
    const json = JSON.parse(text)
    console.log('rol:', sanitizeLog(json.rol))
    console.log('cards.totalClientes:', sanitizeLog(json.cards?.totalClientes))
    const keys = json.cards ? Object.keys(json.cards).join(', ') : 'sin cards'
    console.log('cards keys:', sanitizeLog(keys))
  } catch {
    console.log(sanitizeLog(text.slice(0, 500)))
  }
  await closePool()
}

main().catch(async (e) => {
  console.error(sanitizeLog(e.message))
  await closePool()
  process.exit(1)
})
