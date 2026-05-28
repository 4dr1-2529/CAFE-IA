// Soporte global E2E — Actividad 4 Café Sostenible AI
import './commands.js'

// Errores de terceros / HMR que no invalidan la prueba funcional
Cypress.on('uncaught:exception', (err) => {
  const ignore = [
    'ResizeObserver',
    'Loading chunk',
    'ChunkLoadError',
    'hydrat',
  ]
  if (ignore.some((msg) => err.message?.includes(msg))) {
    return false
  }
  return undefined
})

beforeEach(() => {
  cy.setupApiIntercepts()
})

afterEach(function () {
  const spec = Cypress.spec.name.replace('.cy.js', '')
  const testTitle = this.currentTest?.title || 'test'
  const state = this.currentTest?.state || 'unknown'
  const safeTitle = testTitle.replace(/[^a-z0-9áéíóúñ]/gi, '_').slice(0, 50)
  const prefix = state === 'passed' ? 'OK' : 'FAIL'

  cy.screenshot(`${spec}/${prefix}-${safeTitle}`, {
    capture: 'viewport',
    overwrite: true,
  })
})
