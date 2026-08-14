/**
 * Génère src/lib/icones-tech.ts à partir de simple-icons.
 *
 * Le paquet n'est PAS une dépendance permanente : on l'installe, on génère, on
 * le retire. Voir l'en-tête du fichier généré pour le pourquoi.
 *
 *   npm i -D simple-icons && node scripts/generer-icones.mjs && npm rm simple-icons
 */
import * as si from 'simple-icons';
import { readFileSync, writeFileSync } from 'node:fs';

const version = JSON.parse(
  readFileSync('node_modules/simple-icons/package.json', 'utf8'),
).version;

/**
 * Slug local → slug simple-icons.
 *
 * Java pointe sur OpenJDK : Oracle a demandé le retrait de l'icône « Java » de
 * simple-icons, et OpenJDK est de toute façon le runtime réellement utilisé.
 * Les technos absentes de cette table — Power BI, AWS — n'ont pas d'icône
 * libre : le composant rend un monogramme, jamais un logo approximatif.
 */
const map = {
  java: 'openjdk',
  'spring-boot': 'springboot',
  laravel: 'laravel',
  php: 'php',
  python: 'python',
  fastapi: 'fastapi',
  nodejs: 'nodedotjs',
  typescript: 'typescript',
  react: 'react',
  astro: 'astro',
  vue: 'vuedotjs',
  kotlin: 'kotlin',
  flutter: 'flutter',
  postgresql: 'postgresql',
  docker: 'docker',
  ansible: 'ansible',
  traefik: 'traefikproxy',
  'github-actions': 'githubactions',
  openshift: 'redhatopenshift',
  linux: 'linux',
  minio: 'minio',
  git: 'git',
};

const key = (s) => 'si' + s.charAt(0).toUpperCase() + s.slice(1);

const lignes = [];
for (const [local, slug] of Object.entries(map)) {
  const icone = si[key(slug)];
  if (!icone) throw new Error(`icône introuvable dans simple-icons : ${slug}`);
  lignes.push(
    `  '${local}': { titre: ${JSON.stringify(icone.title)}, path: ${JSON.stringify(icone.path)} },`,
  );
}

const sortie = `/**
 * Tracés SVG des logos de technologies — VENDORISÉS, pas une dépendance.
 *
 * Source : simple-icons ${version}, licence CC0-1.0 (domaine public). Les
 * fichiers d'icônes sont libres ; les marques restent la propriété de leurs
 * détenteurs et ne sont utilisées ici que pour désigner la technologie.
 *
 * Pourquoi vendoriser plutôt que dépendre du paquet : le site n'embarque qu'un
 * seul fichier JS et refuse toute requête tierce ; garder 3 000 icônes en
 * node_modules pour en utiliser vingt contredit cette économie.
 *
 * ⚠️ Fichier GÉNÉRÉ — ne pas modifier à la main. Pour le régénérer :
 *   npm i -D simple-icons && node scripts/generer-icones.mjs && npm rm simple-icons
 *
 * Les icônes sont rendues en \`currentColor\` : aucune couleur de marque n'entre
 * dans le design system (invariant n°4), et le rendu suit le thème clair/sombre
 * sans effort. Une techno absente d'ici — Power BI, AWS — n'a pas d'icône
 * libre : le composant rend un monogramme plutôt qu'un logo approximatif.
 */

export interface IconeTech {
  titre: string;
  path: string;
}

export const ICONES_TECH: Record<string, IconeTech> = {
${lignes.join('\n')}
};
`;

writeFileSync('src/lib/icones-tech.ts', sortie);
console.log(`écrit : ${Object.keys(map).length} icônes, simple-icons ${version}`);
