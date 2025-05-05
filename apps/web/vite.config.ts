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
      // Add direct alias for json-schema-to-zod to ensure it's resolved correctly
      'json-schema-to-zod': path.resolve(__dirname, '../../node_modules/json-schema-to-zod')
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
    include: ['json-schema-to-zod'],
    // Add the core package to the esbuild find/replace
    esbuildOptions: {
      plugins: [
        {
          name: 'fix-core-imports',
          setup(build) {
            // Help esbuild resolve imports from the core package
            build.onResolve({ filter: /^json-schema-to-zod$/ }, args => {
              return { path: path.resolve(__dirname, '../../node_modules/json-schema-to-zod/dist/index.js') }
            })
          }
        }
      ]
    }
  }
});