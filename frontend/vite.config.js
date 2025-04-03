import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.FRONTEND_PORT) || 3000,
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.BACKEND_PORT || 4000}`, // Mettre 'backend' au lieu de 'localhost' si Docker est utilisé
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
