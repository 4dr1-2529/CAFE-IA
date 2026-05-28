/**
 * PF-05: Registro de productor
 * Valida que un cliente puede registrar un nuevo productor en el módulo Productores.
 */
describe('PF-05 — Registro de productor', () => {
  const suffix = Date.now().toString().slice(-6)

  beforeEach(() => {
    cy.loginAsCliente()
    cy.navigateTo('Productores')
  })

  it('registra un productor y lo muestra en la lista', () => {
    cy.contains('h2', 'Registrar / Editar productor').should('be.visible')

    cy.get('input[name="nombres"]').clear().type('E2E')
    cy.get('input[name="apellidos"]').clear().type(`Productor${suffix}`)
    cy.get('input[name="dni"]').clear().type(`99${suffix}`)
    cy.get('input[name="correo"]').clear().type(`e2e.${suffix}@test.local`)
    cy.get('input[name="parcela"]').clear().type('Parcela E2E')
    cy.get('input[name="ubicacion"]').clear().type('Junín')
    cy.get('input[name="altitud"]').clear().type('1650')

    cy.get('button.btn-primary').contains('productor').click()

    cy.contains('Lista de productores', { timeout: 15000 }).should('be.visible')
    cy.contains(`Productor${suffix}`, { timeout: 20000 }).should('be.visible')
    cy.captureEvidence('productor-registrado')
  })
})
