import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        work: resolve(__dirname, 'work.html'),
        'hire-me': resolve(__dirname, 'hire-me.html'),
        'contact-me': resolve(__dirname, 'contact-me.html'),
        'my-story': resolve(__dirname, 'my-story.html'),
        'terms': resolve(__dirname, 'terms.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
