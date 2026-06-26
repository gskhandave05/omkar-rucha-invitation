import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site: https://gskhandave05.github.io/omkar-rucha-invitation/
const repoBase = '/omkar-rucha-invitation/'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? repoBase : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
}))