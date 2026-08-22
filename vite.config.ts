import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub Pages serves the project from https://<user>.github.io/<repo>/
// Set BASE_PATH env var at build time (e.g. "/besiktas-caliskanoglu/") or
// edit the fallback below to match your repository name.
const base = process.env.BASE_PATH || '/besiktas-caliskanoglu/';

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: false, // we ship a hand-written manifest.json in /public
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,webp}'],
        navigateFallback: 'index.html',
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    host: true,
  },
});
