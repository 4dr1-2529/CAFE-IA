import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))

/**
 * Solo variables públicas VITE_*.
 * No cargar MYSQL*, JWT_SECRET ni otras credenciales de servidor.
 * El frontend usa import.meta.env.VITE_API_URL (ver frontend/src/config/api.js).
 */
export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [react()],
    envPrefix: ['VITE_'],
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
    server: {
      port: 5174,
      host: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3029',
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
      chunkSizeWarningLimit: 800,
      // Un solo bundle de aplicación: evita chunks huérfanos tras deploy en Vercel.
      rollupOptions: {
        output: {
          manualChunks: undefined,
          inlineDynamicImports: true,
        },
      },
    },
  }
})
