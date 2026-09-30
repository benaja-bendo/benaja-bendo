// @ts-check
import { defineConfig } from 'astro/config';
// Le plugin qui pose les `id` sur les titres du Markdown. Astro l'applique déjà
// tout seul, mais APRÈS les plugins rehype de cette configuration : sans cet
// import explicite, `rehypeAncresDeTitres` ne verrait aucun `id` et n'écrirait
// aucune ancre. C'est le motif documenté par Astro pour cet exact besoin.
// `@astrojs/markdown-remark` porte aussi le processeur Unified explicite :
// les plugins et les identifiants de titres utilisent ainsi le même moteur.
// Mettre ce paquet à jour avec Astro, puis vérifier les ancres du build.
import { rehypeHeadingIds, unified } from '@astrojs/markdown-remark';
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

/**
 * Ancre de section sur chaque titre du Markdown.
 *
 * Astro pose déjà un `id` sur les titres ; ce qui manquait, c'était de quoi
 * cliquer dessus. Sans ancre, on ne peut pas envoyer un lien vers un passage
 * précis d'une étude de cas — or c'est exactement ce qu'on fait dans un message
 * de candidature ou pour citer une note.
 *
 * Écrit à la main comme `remarkPonctuationFrancaise` ci-dessus : vingt lignes
 * ne justifient pas d'installer `rehype-autolink-headings` et ses dépendances.
 * L'ancre est ajoutée APRÈS le texte du titre pour que la navigation par titres
 * d'un lecteur d'écran annonce le titre, pas le dièse.
 */
function rehypeAncresDeTitres() {
  /** @param {any} tree */
  return (tree) => {
    /** @param {any} node */
    const parcourir = (node) => {
      const id = node.properties?.id;
      if (node.type === 'element' && /^h[23]$/.test(node.tagName) && id) {
        node.children.push({
          type: 'element',
          tagName: 'a',
          properties: {
            className: ['ancre-titre'],
            href: `#${id}`,
            'aria-label': 'Lien direct vers cette section',
          },
          children: [{ type: 'text', value: '#' }],
        });
        return; // ne pas redescendre : l'ancre qu'on vient d'ajouter est un enfant
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
  //
  // ⚠️ La page générée par Astro est une redirection HTML : elle PERD le
  // fragment (#la-construction…). Seule la 301 de Firebase le garde, et c'est
  // elle que reçoivent les visiteurs. Toute entrée ajoutée ici doit donc
  // l'être aussi dans firebase.json.
  redirects: {
    '/mibeko': '/realisations/mibeko',
    // Études de cas fusionnées dans les réalisations le 30/09/2026 (docs/13
    // §5). Leurs adresses figurent dans des CV déjà envoyés, avec des ancres
    // (#ce-que-jai-fait, #la-construction, #la-production, #preuves-titre)
    // que les pages de destination gardent.
    '/etudes': '/realisations',
    '/etudes/mibeko': '/realisations/mibeko',
    '/etudes/france-travail': '/realisations/france-travail-collecte',
    '/etudes/aife': '/realisations/aife-microservices',
    // L'ancienne page de compatibilité. Ses ancres #aife et #france-travail
    // sont portées par les lignes de /realisations (voir
    // /notes/fragment-url-et-redirections).
    '/experiences': '/realisations',
    // La fiche « benaja-bendo.fr » a été retirée le 30/09/2026 : le colophon
    // dit la même chose. Sa page et celle de la techno Astro (qui n'avait plus
    // qu'une réalisation) sont liées depuis les puces des CV déjà envoyés.
    '/realisations/benaja-bendo-fr': '/colophon',
    '/realisations/tech/astro': '/colophon',
    // Renommée le 14/08/2026. Un CHEMIN se redirige côté serveur, contrairement
    // à un fragment (voir /notes/fragment-url-et-redirections) : la 301 est
    // donc réelle, servie par firebase.json, et cette entrée n'est que le
    // filet portable pour `npm run preview`.
    '/a-propos': '/parcours',
  },
  build: {
    // Émet toujours le CSS en fichiers externes (aucun <style> inline) : condition
    // pour une CSP stricte `style-src 'self'` sans hash ni 'unsafe-inline'.
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // ⚠️ esbuild et NON lightningcss (le défaut). Constaté le 25/08/2026 :
      // lightningcss replie `animation` + `animation-timeline: view()` en un
      // seul raccourci — `animation: .42s ease-out both entree-pose view()` —
      // que les navigateurs REJETTENT : le timeline a été retiré du raccourci
      // dans la spécification. Résultat : `animation-name: none`, toutes les
      // apparitions au défilement mortes dans le build de production alors
      // qu'elles fonctionnaient en dev. Il tronque en prime
      // `animation-range: entry 10% entry 100%` en `entry 10%`, ce qui change
      // la fin de plage et ramène le défaut qu'on cherchait justement à éviter
      // (un élément visible mais non défilé, figé à moitié transparent).
      // esbuild ne réécrit pas les raccourcis ; le CSS est un peu plus gros.
      cssMinify: 'esbuild',
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkPonctuationFrancaise],
      // L'ordre compte : les `id` d'abord, les ancres qui les utilisent ensuite.
      rehypePlugins: [rehypeHeadingIds, rehypeAncresDeTitres],
    }),
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
  integrations: [
    mdx(),
    sitemap({
      // Les variantes du CV (/cv/<profil>) existent pour le lien envoyé avec
      // une candidature, pas pour Google, qui y verrait trois fois le même
      // CV : elles sortent du plan de site. /cv lui-même reste indexé.
      // (/experiences y était aussi exclue ; c'est une redirection depuis le
      // 30/09/2026, que l'intégration écarte d'elle-même.)
      filter: (page) => !/\/cv\/[^/]+/.test(page),
    }),
  ],
});
