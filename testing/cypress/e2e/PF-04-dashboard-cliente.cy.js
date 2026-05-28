/**
 * PF-04: Dashboard cliente
 * Valida el dashboard personal y que NO aparecen enlaces de administración.
 */
describe('PF-04 — Dashboard cliente', () => {
  beforeEach(() => {
    cy.loginAsCliente()
    cy.visit('/')
  })

  it('muestra el dashboard del cliente sin módulos admin', () => {
    cy.contains('h1', 'Mi Dashboard de Producción').should('be.visible')
    cy.contains('Mis productores').should('be.visible')
    cy.contains('Mis lotes').should('be.visible')

    // Módulos operativos permitidos
    cy.contains('nav a', 'Productores').should('be.visible')
    cy.contains('nav a', 'Chatbot IA').should('be.visible')

    // Módulos admin no deben estar en el menú
    cy.contains('nav a', 'Usuarios').should('not.exist')
    cy.contains('nav a', 'Auditoría / Historial').should('not.exist')
    cy.contains('nav a', 'Evidencias PMV').should('not.exist')
    cy.contains('nav a', 'Arquitectura').should('not.exist')
    cy.captureEvidence('dashboard-cliente')
  })
})
