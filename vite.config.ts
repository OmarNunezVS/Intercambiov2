import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Intercambiov2/', // ✅ Solo el nombre del repositorio, entre diagonales
})