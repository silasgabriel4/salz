import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/salz/',  // Ensure this matches your GitHub repository name
  server: { port: 5173 }
})
