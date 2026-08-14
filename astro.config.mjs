// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Typographie française dans le corps des fichiers Markdown : espace insécable
 * avant la ponctuation double, à l'intérieur des guillemets. Écrit à la main
 * pour ne pas ajouter de dépendance, et limité aux nœuds `text` — le code en
 * ligne, les blocs de code, les URL et les liens sont d'autres types de nœuds
 * et ne sont jamais touchés.
 *
 * Le frontmatter n'est pas du Markdown : il est traité par `typo()` dans
 * src/lib/contenu.ts. Les gabarits `.astro` portent leurs `&nbsp;` en clair.
 */
function remarkPonctuationFrancaise() {
  /** @param {any} tree */
  return (tree) => {
    /** @param {any} node */
    const parcourir = (node) => {
      if (node.type === 'text') {
        node.value = node.value
          .replace(/[ \t\n]+([:;!?])(?=\s|$)/g, ' $1')
          .replace(/[ \t\n]+»/g, ' »')
          .replace(/«[ \t\n]+/g, '« ');
      }
      node.children?.forEach(parcourir);
    };
    parcourir(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  // Domaine cible : le site est servi à la racine de benaja-bendo.fr par
  // Firebase Hosting. Le base path racine convient à l'apex domain.
  site: 'https://benaja-bendo.fr',
  trailingSlash: 'ignore',
  // Anciennes URL publiques. Elles ont été envoyées dans des candidatures : on
  // ne les casse pas pour rendre l'arborescence plus élégante (docs/08 §3).
  // La vraie 301 est servie par Firebase (firebase.json) ; la page générée ici
  // est le filet de sécurité portable, y compris en `npm run preview`.
  redirects: {
    '/mibeko': '/etudes/mibeko',
  },
  build: {
    // Émet toujours le CSS en fichiers externes (aucun <style> inline) : condition
    // pour une CSP stricte `style-src 'self'` sans hash ni 'unsafe-inline'.
    inlineStylesheets: 'never',
  },
  markdown: {
    remarkPlugins: [remarkPonctuationFrancaise],
    // ⚠️ Coloration syntaxique désactivée pour la même raison que l'API Fonts :
    // Shiki écrit ses couleurs en `style="..."` sur le <pre> et sur chaque
    // <span>, donc du style INLINE, bloqué par `style-src 'self'`. Les blocs de
    // code sont mis en forme par `.prose pre` dans global.css, avec les tokens
    // du design system. Constaté le 14/08/2026 sur la première note contenant
    // un bloc ```bash.
    syntaxHighlight: false,
  },
  // ⚠️ Polices : NE PAS activer l'API Fonts d'Astro (`fonts: [...]` + <Font/>).
  // Son composant injecte le @font-face via <style set:html>, donc un style
  // INLINE — bloqué par la CSP `style-src 'self'` servie par firebase.json
  // (et par public/_headers sur les hébergeurs compatibles). Constaté le
  // 13/08/2026 : 10 violations.
  // IBM Plex est donc auto-hébergée à la main : fichiers dans public/fonts/,
  // @font-face en tête de src/styles/global.css. Voir docs/05 §Typographie.
  // L'intégration sitemap exclut d'elle-même les routes de `redirects` :
  // vérifié le 14/08/2026, /mibeko n'apparaît pas dans sitemap-0.xml.
  integrations: [mdx(), sitemap()],
});
