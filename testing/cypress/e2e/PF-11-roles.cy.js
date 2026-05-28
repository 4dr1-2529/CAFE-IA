/**
 * PF-11: Roles ADMIN / CLIENTE
 * Valida permisos de navegación y acceso a rutas restringidas según el rol.
 */
describe('PF-11 — Roles y permisos', () => {
  it('ADMIN accede a Usuarios y ve badge ADMIN', () => {
    cy.loginAsAdmin()
    cy.contains('ADMIN').should('be.visible')
    cy.navigateTo('Usuarios')
    cy.url().should('include', '/usuarios')
    cy.contains(/Usuarios|Gestión de usuarios/i).should('be.visible')
    cy.captureEvidence('admin-usuarios')
  })

  it('CLIENTE no ve módulos admin y es redirigido desde /usuarios', () => {
    cy.loginAsCliente()
    cy.contains('CLIENTE').should('be.visible')
    cy.contains('nav a', 'Usuarios').should('not.exist')

    cy.visit('/usuarios')
    cy.url({ timeout: 10000 }).should('not.include', '/usuarios')
    cy.contains('Mi Dashboard de Producción', { timeout: 20000 }).should('be.visible')
    cy.captureEvidence('cliente-sin-usuarios')
  })

  it('ADMIN ve reportes globales y CLIENTE reportes personales', () => {
    cy.loginAsAdmin()
    cy.navigateTo('Reportes')
    cy.contains('h1', 'Reportes Generales del Sistema').should('be.visible')
    cy.contains('GLOBAL').should('be.visible')

    cy.logout()
    cy.loginAsCliente()
    cy.navigateTo('Reportes')
    cy.contains('h1', 'Mis Reportes').should('be.visible')
    cy.contains('PERSONAL', { timeout: 25000 }).should('be.visible')
    cy.captureEvidence('reportes-roles')
  })
})
