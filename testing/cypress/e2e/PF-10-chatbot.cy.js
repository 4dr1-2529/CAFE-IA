/**
 * PF-10: Chatbot IA
 * Valida que el chatbot responde a una consulta del usuario.
 */
describe('PF-10 — Chatbot IA', () => {
  beforeEach(() => {
    cy.loginAsCliente()
    cy.navigateTo('Chatbot IA')
  })

  it('envía un mensaje y recibe respuesta del asistente', () => {
    cy.contains('h1', 'Chatbot IA lógico', { timeout: 20000 }).should('be.visible')
    cy.contains('Conversación').should('be.visible')
    cy.contains('Asistente').should('be.visible')

    const pregunta = '¿Cuántos lotes tengo?'
    cy.get('input[placeholder="Escribe tu consulta..."]').clear().type(pregunta)
    cy.contains('button', 'Enviar').click()
    cy.waitForApi('@apiChatbot', 25000)

    cy.contains('Tú').should('be.visible')
    cy.contains(pregunta).should('be.visible')

    // Espera respuesta del bot (texto distinto al saludo inicial)
    cy.get('.chat-bubble-bot p', { timeout: 25000 })
      .should('have.length.at.least', 2)
    cy.captureEvidence('chatbot-respuesta')
  })
})
