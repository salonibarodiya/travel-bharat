import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://travel-bharat-kb0c.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})