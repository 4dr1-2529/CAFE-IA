import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

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
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.3'),
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
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            charts: ['recharts'],
            icons: ['lucide-react'],
          },
        },
      },
    },
  }
})
