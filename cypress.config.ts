import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // Configuration des événements si nécessaire
    },
  },
  component: {
    devServer: {
      framework: 'react', // Ou un autre framework utilisé
      bundler: 'vite',    // Si vous utilisez Vite comme bundler
    },
  },
});
