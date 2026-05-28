/**
 * PF-08: Módulo IA
 * Valida que la página del modelo predictivo carga y muestra la opción de predicción.
 */
describe('PF-08 — Módulo IA', () => {
  beforeEach(() => {
    cy.loginAsCliente()
    cy.navigateTo('Módulo IA')
  })

  it('carga el módulo de machine learning y el selector de lotes', () => {
    cy.contains('h1', 'Modelo Predictivo de Machine Learning', { timeout: 20000 }).should(
      'be.visible'
    )
    cy.contains('Seleccionar lote').should('be.visible')
    cy.get('select[name="loteId"]').should('exist')
    cy.contains('button', 'Ejecutar Predicción').should('be.visible')
    cy.captureEvidence('modulo-ia')
  })
})
