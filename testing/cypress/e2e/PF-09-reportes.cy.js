/**
 * PF-09: Reportes
 * Valida que el módulo de reportes carga pestañas y datos para el rol autenticado.
 */
describe('PF-09 — Reportes', () => {
  beforeEach(() => {
    cy.loginAsCliente()
    cy.navigateTo('Reportes')
  })

  it('carga reportes personales con pestañas principales', () => {
    cy.contains('h1', 'Mis Reportes', { timeout: 20000 }).should('be.visible')

    cy.contains('button', 'Producción').should('be.visible')
    cy.contains('button', 'Calidad').should('be.visible')
    cy.contains('button', 'Trazabilidad').should('be.visible')
    cy.contains('button', 'Inteligencia Artificial').should('be.visible')

    cy.contains('button', 'Actualizar').should('be.visible')
    cy.contains('PERSONAL', { timeout: 25000 }).should('be.visible')
    cy.captureEvidence('reportes-cliente')
  })
})
