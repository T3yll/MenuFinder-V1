import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';



export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  // Filtrer les variables d'environnement pour éviter l'exposition de toutes les variables système
  const filteredEnv = Object.keys(env)
    .filter(key => key.startsWith('VITE_') || key.startsWith('REACT_APP_'))
    .reduce((filtered, key) => {
      filtered[`process.env.${key}`] = JSON.stringify(env[key]);
      return filtered;
    }, {});

  return {
    plugins: [react()],
    define: filteredEnv,
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api']
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api': {
          target: `http://backend:4000`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/uploads': {
          target: `http://backend:4000`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/uploads/, '/uploads'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});

