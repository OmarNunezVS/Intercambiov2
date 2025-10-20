import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/https://github.com/OmarNunezVS/Intercambiov2/', // 👈 Muy importante
})
