import { defineConfig } from 'vite';

export default defineConfig({
  base: '/synaesthesia/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          tone: ['tone'],
        },
      },
    },
  },
});
