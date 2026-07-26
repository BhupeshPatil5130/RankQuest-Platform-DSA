import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 1. Import the 'path' module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  // 2. Add this 'resolve' section to create the alias
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})