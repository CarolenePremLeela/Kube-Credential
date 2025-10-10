import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_PORT || '3003'),
      host: true,
      strictPort: true
    },
    preview: {
      port: parseInt(env.VITE_PORT || '3003'),
      host: true
    },
    // Optional: Define global constants
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_NAME || 'Kube Credential')
    }
  }
})