/**
 * PF-07: Trazabilidad
 * Valida que el módulo carga lotes y permite ver el detalle de trazabilidad.
 */
describe('PF-07 — Trazabilidad', () => {
  beforeEach(() => {
    cy.loginAsCliente()
    cy.navigateTo('Trazabilidad')
  })

  it('carga la lista de lotes y muestra el panel de detalle', () => {
    cy.waitForApi('@apiLotes', 25000)
    cy.waitForApi('@apiTrazabilidad', 25000)
    cy.contains('h1', 'Trazabilidad del café', { timeout: 25000 }).should('be.visible')
    cy.get('input[placeholder*="Buscar"]').should('be.visible')
    cy.contains(/Lotes registrados \(\d+\)/).should('be.visible')

    // Seleccionar el primer lote de la lista lateral
    cy.contains('h3', /Lotes registrados/).parent().find('button').first().click()

    cy.contains('Productor', { timeout: 15000 }).should('be.visible')
    cy.contains('Registrado por').should('be.visible')
    cy.captureEvidence('detalle-trazabilidad')
  })
})
