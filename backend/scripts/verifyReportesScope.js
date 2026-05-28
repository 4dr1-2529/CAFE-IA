/**
 * Verifica que reportes respeten alcance ADMIN (global) vs CLIENTE (personal).
 * Uso: node scripts/verifyReportesScope.js
 */
import '../src/config/env.js'
import { AuthService } from '../src/application/services/AuthService.js'
import { ReportesService } from '../src/application/services/ReportesService.js'

const CLIENTE_EMAIL = process.env.VERIFY_CLIENTE_EMAIL || 'cliente1@cafeai.com'
const CLIENTE_PASS = process.env.VERIFY_CLIENTE_PASS || 'mbappe29'
const ADMIN_EMAIL = process.env.VERIFY_ADMIN_EMAIL || 'admin@cafeai.com'
const ADMIN_PASS = process.env.VERIFY_ADMIN_PASS || 'admin123'

async function main() {
  const adminLogin = await AuthService.login(ADMIN_EMAIL, ADMIN_PASS, {})
  const clienteLogin = await AuthService.login(CLIENTE_EMAIL, CLIENTE_PASS, {})
  const adminUser = { sub: adminLogin.user.id, email: adminLogin.user.email, rol: adminLogin.user.rol }
  const clienteUser = { sub: clienteLogin.user.id, email: clienteLogin.user.email, rol: clienteLogin.user.rol }

  const adminProd = await ReportesService.getProduccion({ user: adminUser })
  const clienteProd = await ReportesService.getProduccion({ user: clienteUser })

  const adminLotes = Number(adminProd.resumen?.total_lotes || 0)
  const clienteLotes = Number(clienteProd.resumen?.total_lotes || 0)

  console.log('ADMIN scope:', adminProd.scope, '| lotes:', adminLotes, '| clientes:', adminProd.totalClientes)
  console.log('CLIENTE scope:', clienteProd.scope, '| userId:', clienteProd.userId, '| lotes:', clienteLotes)

  if (adminProd.scope !== 'global') throw new Error('ADMIN debe tener scope global')
  if (clienteProd.scope !== 'personal') throw new Error('CLIENTE debe tener scope personal')
  if (clienteLotes >= adminLotes && adminLotes > 0) {
    throw new Error(`CLIENTE (${clienteLotes}) no debe ver totales globales (${adminLotes})`)
  }
  console.log('OK: reportes filtrados por rol')
}

main().catch((e) => {
  console.error(e.message || e)
  process.exit(1)
})
