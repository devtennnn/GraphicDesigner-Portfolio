import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  // Base URL for GitHub Pages (replace 'your-repo-name' with actual repo name)
  base: './',
  
  plugins: [
    react({
      // Include JSX runtime for better performance
      jsxRuntime: 'automatic',
    }),
  ],
  
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true, // Automatically open browser
    cors: true,
  },
  
  build: {
    // Generate source maps for better debugging
    sourcemap: true,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
      '@components': resolve(__dirname, './components'),
      '@types': resolve(__dirname, './types'),
    },
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  
  // CSS configuration
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      // Add any CSS preprocessor options here if needed
    },
  },
  
  // Preview configuration for production build
  preview: {
    port: 4173,
    host: '0.0.0.0',
    open: true,
  },
});
