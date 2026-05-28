/**
 * PF-02: Login cliente
 * Valida que cliente1@cafeai.com puede autenticarse y ver su dashboard personal.
 */
describe('PF-02 — Login cliente', () => {
  it('inicia sesión con credenciales cliente y muestra el dashboard personal', () => {
    const email = 'cliente1@cafeai.com'
    const password = 'mbappe29'

    cy.visit('/login')
    cy.get('#login-email').type(email)
    cy.get('#login-password').type(password)
    cy.contains('button[type="submit"]', 'Iniciar sesión').click()

    cy.url({ timeout: 20000 }).should('not.include', '/login')
    cy.contains('Mi Dashboard de Producción', { timeout: 30000 }).should('be.visible')
    cy.contains('CLIENTE').should('be.visible')
    cy.captureEvidence('login-cliente-dashboard')
  })
})
