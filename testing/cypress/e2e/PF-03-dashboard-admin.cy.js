/**
 * PF-03: Dashboard administrador
 * Valida KPIs del dashboard global y módulos de navegación visibles para ADMIN.
 */
describe('PF-03 — Dashboard administrador', () => {
  beforeEach(() => {
    cy.loginAsAdmin()
    cy.visit('/')
  })

  it('muestra el dashboard general y módulos de operación y sistema', () => {
    cy.contains('h1', 'Dashboard General del Sistema').should('be.visible')
    cy.contains('Total clientes').should('be.visible')
    cy.contains('Total lotes').should('be.visible')

    // Módulos PMV1 visibles para admin
    cy.contains('nav a', 'Productores').should('be.visible')
    cy.contains('nav a', 'Registro Producción').should('be.visible')
    cy.contains('nav a', 'Trazabilidad').should('be.visible')
    cy.contains('nav a', 'Módulo IA').should('be.visible')
    cy.contains('nav a', 'Reportes').should('be.visible')

    // Módulos exclusivos admin
    cy.contains('nav a', 'Usuarios').should('be.visible')
    cy.contains('nav a', 'Auditoría / Historial').should('be.visible')
    cy.contains('nav a', 'Evidencias PMV').should('be.visible')
    cy.captureEvidence('dashboard-admin')
  })
})
