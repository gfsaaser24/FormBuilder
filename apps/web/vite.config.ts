import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Add alias for the core package
      'formbuilder-core': path.resolve(__dirname, '../../packages/core/src'),
    },
    // Ensure node_modules are properly resolved
    dedupe: ['react', 'react-dom'],
    preserveSymlinks: true
  },
  server: {
    port: 7017,
  },
  // Configure optimizeDeps to include dependencies from core package
  optimizeDeps: {
    include: ['json-schema-to-zod']
  }
});