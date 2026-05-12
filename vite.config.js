import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

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
    // This allows Vite to serve files from the root assets/styles/scripts folders
    fs: {
      allow: ['.'],
    },
  },
  // Simple plugin to serve static files from root folders during dev
  plugins: [
    {
      name: 'serve-root-assets',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const publicFolders = ['/assets', '/styles', '/scripts'];
          if (publicFolders.some(folder => req.url.startsWith(folder))) {
            const filePath = resolve(__dirname, req.url.slice(1));
            if (fs.existsSync(filePath)) {
              // Simple mime type detection
              const ext = req.url.split('.').pop();
              const mimes = {
                'png': 'image/png',
                'jpg': 'image/jpeg',
                'jpeg': 'image/jpeg',
                'css': 'text/css',
                'js': 'application/javascript',
                'pdf': 'application/pdf',
                'svg': 'image/svg+xml'
              };
              res.setHeader('Content-Type', mimes[ext] || 'text/plain');
              res.end(fs.readFileSync(filePath));
              return;
            }
          }
          next();
        });
      },
    },
  ],
});
