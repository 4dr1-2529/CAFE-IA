/**
 * PF-01: Login administrador
 * Valida que admin@cafeai.com puede autenticarse y acceder al dashboard global.
 */
describe('PF-01 — Login administrador', () => {
  it('inicia sesión con credenciales admin y muestra el dashboard', () => {
    const email = 'admin@cafeai.com'
    const password = 'admin123'

    cy.visit('/login')
    cy.contains('h2', 'Iniciar sesión').should('be.visible')

    cy.get('#login-email').type(email)
    cy.get('#login-password').type(password)
    cy.contains('button[type="submit"]', 'Iniciar sesión').click()

    // Redirección exitosa al dashboard (ruta /) — espera carga lazy del módulo
    cy.url({ timeout: 20000 }).should('not.include', '/login')
    cy.contains('Cerrar sesión', { timeout: 20000 }).should('be.visible')
    cy.contains('Dashboard General del Sistema', { timeout: 30000 }).should('be.visible')
    cy.contains('ADMIN').should('be.visible')
    cy.captureEvidence('login-admin-dashboard')
  })
})
