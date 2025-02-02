import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // Permet l'accès depuis n'importe quelle adresse IP
    strictPort: true, // Empêche Vite de chercher un autre port si 5173 est occupé
  },
})