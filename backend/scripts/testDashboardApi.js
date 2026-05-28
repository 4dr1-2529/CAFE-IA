/**
 * Prueba HTTP del dashboard como ADMIN
 */
import { initDatabase } from '../src/infrastructure/database/migrate.js'
import { AuthService } from '../src/application/services/AuthService.js'
import { closePool } from '../src/infrastructure/database/pool.js'

const passwords = ['admin123', 'Admin123', 'admin', 'password', 'mabppe29', 'mbappe29']

async function main() {
  await initDatabase()
  let login = null
  for (const p of passwords) {
    try {
      login = await AuthService.login('admin@cafeai.com', p)
      console.log('Login OK con password:', p)
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
    console.log('rol:', json.rol)
    console.log('cards.totalClientes:', json.cards?.totalClientes)
    console.log('cards keys:', json.cards ? Object.keys(json.cards) : 'sin cards')
  } catch {
    console.log(text.slice(0, 500))
  }
  await closePool()
}

main().catch(async (e) => {
  console.error(e.message)
  await closePool()
  process.exit(1)
})
