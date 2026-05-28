/** Credenciales de demostración PMV2 (backend seed) */
const CREDENTIALS = {
  admin: { email: 'admin@cafeai.com', password: 'admin123' },
  cliente: { email: 'cliente1@cafeai.com', password: 'mbappe29' },
}

const TOKEN_KEY = 'cafe_trace_token'

/** Intercepta APIs críticas para esperas estables (no falla si no se dispara). */
Cypress.Commands.add('setupApiIntercepts', () => {
  cy.intercept('POST', '**/api/auth/login').as('apiLogin')
  cy.intercept('GET', '**/api/auth/me').as('apiMe')
  cy.intercept('GET', '**/api/dashboard**').as('apiDashboard')
  cy.intercept('GET', '**/api/productores**').as('apiProductores')
  cy.intercept('GET', '**/api/lotes**').as('apiLotes')
  cy.intercept('GET', '**/api/trazabilidad**').as('apiTrazabilidad')
  cy.intercept('POST', '**/api/chatbot').as('apiChatbot')
})

/** Espera respuesta de API interceptada. */
Cypress.Commands.add('waitForApi', (alias, timeout = 20000) => {
  cy.wait(alias, { timeout })
})

/**
 * Login UI completo (usar en PF-01 / PF-02).
 */
Cypress.Commands.add('login', (email, password) => {
  cy.setupApiIntercepts()
  cy.visit('/login')
  cy.get('#login-email').should('be.visible').clear().type(email)
  cy.get('#login-password').clear().type(password, { log: false })
  cy.contains('button[type="submit"]', 'Iniciar sesión').click()
  cy.wait('@apiLogin', { timeout: 20000 })
  cy.url({ timeout: 20000 }).should('not.include', '/login')
  cy.contains('Cerrar sesión', { timeout: 30000 }).should('be.visible')
})

Cypress.Commands.add('loginAsAdmin', () => {
  cy.login(CREDENTIALS.admin.email, CREDENTIALS.admin.password)
})

Cypress.Commands.add('loginAsCliente', () => {
  cy.login(CREDENTIALS.cliente.email, CREDENTIALS.cliente.password)
})

Cypress.Commands.add('logout', () => {
  cy.contains('button', 'Cerrar sesión').click()
  cy.url({ timeout: 15000 }).should('include', '/login')
  cy.window().then((win) => {
    win.localStorage.removeItem(TOKEN_KEY)
    win.localStorage.removeItem('cafe_trace_session')
    win.localStorage.removeItem('cafe_trace_refresh')
  })
})

/** Navega por el menú lateral usando el texto del enlace. */
Cypress.Commands.add('navigateTo', (label) => {
  cy.contains('nav a', label, { timeout: 15000 }).should('be.visible').click()
  cy.get('main', { timeout: 15000 }).should('be.visible')
})

/** Espera que desaparezca el spinner de carga de página lazy. */
Cypress.Commands.add('waitForPageReady', () => {
  cy.get('main', { timeout: 20000 }).should('be.visible')
  cy.get('.animate-spin', { timeout: 5000 }).should('not.exist')
})

/** Captura evidencia final con nombre estandarizado. */
Cypress.Commands.add('captureEvidence', (stepName) => {
  const spec = Cypress.spec.name.replace('.cy.js', '')
  const safe = String(stepName).replace(/[^a-z0-9-_]/gi, '_').slice(0, 60)
  cy.screenshot(`${spec}/${safe}`, { capture: 'fullPage' })
})
