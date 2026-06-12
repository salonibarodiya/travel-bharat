import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure base path is absolute for clean asset paths
  build: {
    outDir: 'dist', // Default build folder inside client/
    assetsDir: 'assets', // All JS/CSS will strictly sit inside assets/
    emptyOutDir: true, // Empties the folder before building to avoid ghost files
  },
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