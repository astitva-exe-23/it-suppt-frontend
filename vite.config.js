import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Add this line

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Add this line
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
