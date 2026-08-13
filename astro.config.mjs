// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Domaine cible : le site est servi à la racine de benaja-bendo.fr par
  // Firebase Hosting. Le base path racine convient à l'apex domain.
  site: 'https://benaja-bendo.fr',
  trailingSlash: 'ignore',
  build: {
    // Émet toujours le CSS en fichiers externes (aucun <style> inline) : condition
    // pour une CSP stricte `style-src 'self'` sans hash ni 'unsafe-inline'.
    inlineStylesheets: 'never',
  },
  // ⚠️ Polices : NE PAS activer l'API Fonts d'Astro (`fonts: [...]` + <Font/>).
  // Son composant injecte le @font-face via <style set:html>, donc un style
  // INLINE — bloqué par la CSP `style-src 'self'` servie par firebase.json
  // (et par public/_headers sur les hébergeurs compatibles). Constaté le
  // 13/08/2026 : 10 violations.
  // IBM Plex est donc auto-hébergée à la main : fichiers dans public/fonts/,
  // @font-face en tête de src/styles/global.css. Voir docs/05 §Typographie.
  integrations: [mdx(), sitemap()],
});
