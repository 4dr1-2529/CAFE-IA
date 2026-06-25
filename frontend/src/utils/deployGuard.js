/** Protección ante caché obsoleta tras despliegues en Vercel. */

export const CHUNK_RELOAD_KEY = 'cafe:chunk-reload'
const VERSION_KEY = 'cafe:app-version'

export function isChunkLoadError(error) {
  const message = String(error?.message || error || '')
  return (
    message.includes('Failed to fetch dynamically imported module') ||
    message.includes('Importing a module script failed') ||
    message.includes('error loading dynamically imported module') ||
    message.includes('Failed to load module script') ||
    error?.name === 'ChunkLoadError'
  )
}

/** Recarga una vez si hay nueva versión publicada (package.json). */
export function syncDeployVersion() {
  const current = typeof __APP_VERSION__ !== 'undefined' ? String(__APP_VERSION__) : ''
  if (!current) return

  const stored = localStorage.getItem(VERSION_KEY)
  if (stored && stored !== current) {
    localStorage.setItem(VERSION_KEY, current)
    sessionStorage.removeItem(CHUNK_RELOAD_KEY)
    globalThis.location.reload()
    return
  }
  localStorage.setItem(VERSION_KEY, current)
}

export function reloadOnStaleChunk(error) {
  if (isChunkLoadError(error) && !sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
    sessionStorage.setItem(CHUNK_RELOAD_KEY, '1')
    globalThis.location.reload()
    return true
  }
  return false
}

export function registerDeployGuard() {
  sessionStorage.removeItem(CHUNK_RELOAD_KEY)
  syncDeployVersion()

  globalThis.addEventListener('unhandledrejection', (event) => {
    if (reloadOnStaleChunk(event.reason)) event.preventDefault()
  })

  globalThis.addEventListener('error', (event) => {
    if (reloadOnStaleChunk(event.error || event.message)) event.preventDefault()
  })
}
