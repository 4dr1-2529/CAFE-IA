import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const RAILWAY_API_DEFAULT = 'https://cafe-sostenible-api-production-03ad.up.railway.app'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiUrl =
    env.VITE_API_URL ||
    env.VITE_API_BASE_URL ||
    (mode === 'production' ? RAILWAY_API_DEFAULT : 'http://localhost:3029')

  return {
    plugins: [react()],
    envPrefix: ['VITE_'],
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl),
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
