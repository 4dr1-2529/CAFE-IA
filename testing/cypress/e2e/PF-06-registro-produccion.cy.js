/**
 * PF-06: Registro de producción / lote
 * Valida que el cliente puede registrar un lote con un productor existente.
 */
describe('PF-06 — Registro de producción', () => {
  beforeEach(() => {
    cy.loginAsCliente()
    cy.navigateTo('Registro Producción')
  })

  it('registra un lote de café con datos válidos', () => {
    cy.contains('h1', 'Registro de Producción').should('be.visible')
    cy.waitForApi('@apiProductores', 25000)

    cy.get('select[name="productorId"]', { timeout: 25000 })
      .should('not.be.disabled')
      .find('option')
      .eq(1)
      .then(($opt) => {
        const value = $opt.val()
        expect(value).to.not.equal('')
        cy.get('select[name="productorId"]').select(value)
      })

    cy.get('input[name="cantidad"]').clear().type('120')
    cy.get('input[name="humedad"]').clear().type('12')
    cy.get('input[name="temperatura"]').clear().type('22')
    cy.get('input[name="altitud"]').clear().type('1650')

    cy.contains('button', 'Registrar Lote').click()

    cy.contains('Lote registrado exitosamente', { timeout: 25000 }).should('be.visible')
    cy.captureEvidence('lote-registrado')
  })
})
