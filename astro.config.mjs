// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Domaine cible : le site est destiné à benaja-bendo.fr (VPS / hébergeur avec
  // en-têtes personnalisés). Le base path racine convient à l'apex domain.
  site: 'https://benaja-bendo.fr',
  trailingSlash: 'ignore',
  build: {
    // Émet toujours le CSS en fichiers externes (aucun <style> inline) : condition
    // pour une CSP stricte `style-src 'self'` sans hash ni 'unsafe-inline'.
    inlineStylesheets: 'never',
  },
  integrations: [mdx(), sitemap()],
});
