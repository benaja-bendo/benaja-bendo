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
  // ⚠️ Polices : NE PAS activer l'API Fonts d'Astro (`fonts: [...]` + <Font/>)
  // en l'état. Son composant injecte le @font-face via <style set:html>, donc
  // un style INLINE — bloqué par la CSP `style-src 'self'` servie par
  // public/_headers et deploy/apache-benaja-bendo.conf (vérifié le 13/08/2026).
  // Les deux seules sorties propres sont documentées dans
  // docs/05-design-system-papier-pixels.md §Typographie. En attendant, la pile
  // système est utilisée via --font-sans / --font-mono dans global.css.
  integrations: [mdx(), sitemap()],
});
