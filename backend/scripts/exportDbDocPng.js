/**
 * Exporta PNG desde archivos .mmd generados por db:docs (script CLI, excluido de SonarCloud).
 * Uso: npm run db:docs:png
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { ARQUITECTURA_DIR } from './lib/dbDocGenerator.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BACKEND_ROOT = path.join(__dirname, '..')

const PNG_SPECS = [
  { file: 'der-modulos-base-datos', width: 2000 },
  { file: 'der-relaciones-completas', width: 3200 },
  { file: 'arquitectura-solucion-cafe-ia', width: 1600 },
]

function resolveMmdcBin() {
  const win = path.join(BACKEND_ROOT, 'node_modules/.bin/mmdc.cmd')
  const unix = path.join(BACKEND_ROOT, 'node_modules/.bin/mmdc')
  if (fs.existsSync(win)) return win
  if (fs.existsSync(unix)) return unix
  throw new Error('mmdc no encontrado. Ejecute npm install en backend/.')
}

function renderPng(mmdcBin, mmdPath, pngPath, width) {
  const args = ['-i', mmdPath, '-o', pngPath, '-w', String(width), '-b', 'white']
  const env = { ...process.env, PUPPETEER_SKIP_DOWNLOAD: 'true' }
  const chrome = process.env.PUPPETEER_EXECUTABLE_PATH?.trim()
  if (chrome && fs.existsSync(chrome)) env.PUPPETEER_EXECUTABLE_PATH = chrome
  execFileSync(mmdcBin, args, {
    stdio: 'pipe',
    cwd: BACKEND_ROOT,
    timeout: 120000,
    env,
    windowsHide: true,
  })
}

function main() {
  const mmdcBin = resolveMmdcBin()
  let count = 0
  for (const spec of PNG_SPECS) {
    const mmdPath = path.join(ARQUITECTURA_DIR, `${spec.file}.mmd`)
    const pngPath = path.join(ARQUITECTURA_DIR, `${spec.file}.png`)
    if (!fs.existsSync(mmdPath)) {
      console.warn(`[db:docs:png] Omitido (no existe): ${mmdPath}. Ejecute npm run db:docs:full primero.`)
      continue
    }
    renderPng(mmdcBin, mmdPath, pngPath, spec.width)
    count += 1
    console.log(`[db:docs:png] ${pngPath}`)
  }
  if (count === 0) {
    throw new Error('No se exportó ningún PNG. Genere .mmd con npm run db:docs:full.')
  }
}

main()
