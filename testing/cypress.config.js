const { defineConfig } = require('cypress')
const fs = require('fs')
const path = require('path')

/** URL de la app React (Vite). Curso: 5173; este proyecto dev: 5174 vía scripts npm. */
const baseUrl = process.env.CYPRESS_BASE_URL || 'http://localhost:5173'

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function copyIfExists(src, dest) {
  if (src && fs.existsSync(src)) {
    ensureDir(path.dirname(dest))
    fs.copyFileSync(src, dest)
    return true
  }
  return false
}

module.exports = defineConfig({
  e2e: {
    baseUrl,
    specPattern: 'cypress/e2e/PF-*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    requestTimeout: 20000,
    responseTimeout: 30000,
    viewportWidth: 1280,
    viewportHeight: 800,
    retries: {
      runMode: 0,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      const projectRoot = config.projectRoot
      const videosDir = path.join(projectRoot, 'cypress', 'videos')
      const evidenciasVideos = path.join(projectRoot, 'cypress', 'evidencias', 'videos')
      const evidenciasReports = path.join(projectRoot, 'cypress', 'evidencias', 'reports')

      ensureDir(videosDir)
      ensureDir(evidenciasVideos)
      ensureDir(evidenciasReports)

      // Cypress elimina videos de specs que pasan; archivamos copia antes del borrado
      on('after:spec', (spec, results) => {
        if (!results?.video) return
        const fileName = path.basename(results.video)
        const targets = [
          path.join(videosDir, fileName),
          path.join(evidenciasVideos, fileName),
        ]
        for (const dest of targets) {
          copyIfExists(results.video, dest)
        }
      })

      on('after:run', (results) => {
        const summary = {
          timestamp: new Date().toISOString(),
          baseUrl,
          browser: results?.browserName,
          totalTests: results?.totalTests,
          totalPassed: results?.totalPassed,
          totalFailed: results?.totalFailed,
          totalDuration: results?.totalDuration,
          runs: results?.runs?.map((run) => ({
            spec: path.basename(run.spec?.name || run.spec?.relative || ''),
            tests: run.tests?.length,
            passes: run.tests?.filter((t) => t.state === 'passed').length,
            failures: run.tests?.filter((t) => t.state === 'failed').length,
            duration: run.duration,
          })),
        }
        fs.writeFileSync(
          path.join(evidenciasReports, 'last-run.json'),
          JSON.stringify(summary, null, 2),
          'utf8'
        )
      })

      config.env.baseUrl = baseUrl
      return config
    },
  },
})
