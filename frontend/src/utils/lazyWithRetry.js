import { lazy } from 'react'

export const CHUNK_RELOAD_KEY = 'cafe:chunk-reload'

export function isChunkLoadError(error) {
  const message = String(error?.message || '')
  return (
    message.includes('Failed to fetch dynamically imported module') ||
    message.includes('Importing a module script failed') ||
    message.includes('error loading dynamically imported module') ||
    error?.name === 'ChunkLoadError'
  )
}

export function lazyWithRetry(importFn) {
  return lazy(() =>
    importFn().catch((error) => {
      if (isChunkLoadError(error) && !sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
        sessionStorage.setItem(CHUNK_RELOAD_KEY, '1')
        window.location.reload()
        return new Promise(() => {})
      }
      sessionStorage.removeItem(CHUNK_RELOAD_KEY)
      throw error
    })
  )
}
