import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' pour que le site fonctionne sur un domaine custom (obsiwebs.com)
// comme sur GitHub Pages avec un sous-dossier.
export default defineConfig({
  plugins: [react()],
  base: './',
})