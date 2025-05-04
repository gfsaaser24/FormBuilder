import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'formbuilder-core': path.resolve(__dirname, './packages/core/src')
    },
  },
  server: {
    port: 7017,
    open: true
  },
})