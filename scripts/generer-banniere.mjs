/**
 * Génère la bannière LinkedIn depuis le design system du site.
 *
 * Pourquoi un script plutôt qu'un fichier dessiné à la main : la bannière
 * affiche une stack et des couleurs qui vivent déjà ailleurs dans le dépôt.
 * Dessinée une fois dans un outil graphique, elle se périme dès que la stack
 * bouge — et c'est l'invariant n°5 (« rien de public ne reste agonisant »).
 * Générée, elle se refait en une commande.
 *
 * Ce que le script NE fait PAS, volontairement :
 *   - aucune couleur en dur : tout vient des tokens de src/styles/global.css ;
 *   - aucun tracé de logo en dur : tout vient de src/lib/icones-tech.ts,
 *     lui-même généré depuis simple-icons (CC0) ;
 *   - aucune couleur de marque : les logos sont rendus en encre, comme partout
 *     ailleurs sur le site (invariant n°4).
 *
 * Rendu par Chrome sans interface, et pas par un rastériseur SVG : librsvg
 * (utilisé par sharp) ignore les `@font-face` embarquées et retomberait sur une
 * police système. Chrome lit les woff2 d'IBM Plex inlinées en data: URI, donc
 * le fichier HTML intermédiaire est autonome et retouchable à la main.
 *
 * Usage :  node scripts/generer-banniere.mjs
 * Sortie :  selection-assets/banniere-linkedin.{html,png}   (dossier .gitignore)
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const sortie = join(racine, 'selection-assets');

/* -- Format imposé par LinkedIn ------------------------------------------- */
const L = 1584;
const H = 396;
/** Rendu à 2× puis réduit : le texte reste net après recompression LinkedIn. */
const ECHELLE = 2;

/**
 * Zone masquée par la photo de profil, mesurée sur le rendu réel du 18/08/2026 :
 * l'avatar couvre le quart gauche à partir de ~58 % de la hauteur. Rien de
 * signifiant ne doit y entrer — d'où la marge gauche du bloc de contenu.
 */
const MARGE_GAUCHE = 432;

/* -- 1. Les tokens, lus dans le design system ------------------------------ */
const css = readFileSync(join(racine, 'src/styles/global.css'), 'utf8');
const bloc = css.slice(css.indexOf(':root {'), css.indexOf('\n}', css.indexOf(':root {')));

function token(nom) {
  const m = bloc.match(new RegExp(`--${nom}:\\s*([^;]+);`));
  if (!m) throw new Error(`Token --${nom} introuvable dans global.css`);
  return m[1].trim();
}

const T = {
  bg: token('bg'),
  surface: token('surface'),
  fg: token('fg'),
  muted: token('muted'),
  rule: token('rule'),
  shadow: token('shadow'),
  mark: token('mark-1'),
  edge: token('edge'),
};

/* -- 2. Les tracés de logos, lus dans le fichier généré -------------------- */
const ts = readFileSync(join(racine, 'src/lib/icones-tech.ts'), 'utf8');
const ICONES = {};
for (const m of ts.matchAll(/'([a-z0-9-]+)':\s*\{\s*titre:\s*"([^"]*)",\s*path:\s*"([^"]*)"\s*\}/g)) {
  ICONES[m[1]] = { titre: m[2], path: m[3] };
}

/**
 * La sélection, et son ordre : back-end d'abord, puis données, puis production,
 * puis front, puis mobile. C'est l'inverse de la bannière qu'elle remplace, qui
 * mettait JavaScript, Vue et Angular en tête d'un profil Java.
 *
 * Chaque entrée est présente dans src/lib/stack.ts, dont la règle est qu'aucune
 * techno n'y figure si elle n'est pas défendable en entretien.
 */
const SELECTION = [
  'java', 'spring-boot', 'laravel', 'python',
  'postgresql',
  'docker', 'openshift', 'ansible', 'github-actions', 'linux',
  'typescript', 'react',
  'kotlin',
];

const manquantes = SELECTION.filter((c) => !ICONES[c]);
if (manquantes.length) throw new Error(`Tracés absents de icones-tech.ts : ${manquantes.join(', ')}`);

/* -- 3. Les polices, inlinées pour que le HTML soit autonome ---------------- */
const b64 = (p) => readFileSync(join(racine, p)).toString('base64');
const POLICES = {
  sans: b64('public/fonts/ibm-plex-sans-var-latin.woff2'),
  mono400: b64('public/fonts/ibm-plex-mono-400-latin.woff2'),
  mono600: b64('public/fonts/ibm-plex-mono-600-latin.woff2'),
};

/* -- 4. Composition -------------------------------------------------------- */
const TAILLE_ICONE = 48;
const ECART_ICONE = 32;

const icones = SELECTION.map((cle) => {
  const { titre, path } = ICONES[cle];
  return `<svg class="i" viewBox="0 0 24 24" role="img" aria-label="${titre}"><title>${titre}</title><path d="${path}"/></svg>`;
}).join('');

/** Signature pixel du site, en filet très pâle. Décorative : perdue au recadrage mobile sans dommage. */
const pixels = [[0, 0], [1, 0], [2, 1], [3, 1], [3, 2], [4, 2], [5, 3], [6, 3]]
  .map(([x, y]) => `<rect x="${x * 14}" y="${y * 14}" width="12" height="12"/>`)
  .join('');

const html = `<!doctype html>
<meta charset="utf-8">
<title>Bannière LinkedIn — benaja-bendo.fr</title>
<style>
  @font-face{font-family:"IBM Plex Sans";font-weight:400 700;font-style:normal;
    src:url(data:font/woff2;base64,${POLICES.sans}) format("woff2")}
  @font-face{font-family:"IBM Plex Mono";font-weight:400;font-style:normal;
    src:url(data:font/woff2;base64,${POLICES.mono400}) format("woff2")}
  @font-face{font-family:"IBM Plex Mono";font-weight:600;font-style:normal;
    src:url(data:font/woff2;base64,${POLICES.mono600}) format("woff2")}

  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:${L}px;height:${H}px;overflow:hidden}
  body{background:${T.bg};font-family:"IBM Plex Sans",sans-serif;
       -webkit-font-smoothing:antialiased;position:relative}

  /* Signature pixel, hors zone de contenu et hors zone avatar. */
  .signature{position:absolute;left:76px;top:64px;fill:${T.rule}}

  .bloc{position:absolute;left:${MARGE_GAUCHE}px;top:50%;transform:translateY(-50%);
        display:flex;flex-direction:column;align-items:flex-start;gap:26px}

  /* Étiquette : bordure pleine + ombre dure, 0 flou. C'est la signature du
     design system — voir docs/05, invariant « les ombres sont dures ». */
  .etiquette{font-family:"IBM Plex Mono",monospace;font-weight:600;font-size:19px;
    letter-spacing:.16em;text-transform:uppercase;color:${T.fg};background:${T.surface};
    border:${T.edge} solid ${T.fg};box-shadow:4px 4px 0 ${T.shadow};
    padding:9px 16px 8px;border-radius:6px}

  .accroche{font-size:60px;font-weight:600;line-height:1.08;color:${T.fg};
    letter-spacing:-.018em;white-space:nowrap}

  /* Surligneur : le mot qui porte le positionnement, marqué au feutre pâle.
     C'est un composant du site (--mark-1, « la preuve »), pas une décoration. */
  .marque{background:linear-gradient(${T.mark},${T.mark}) 0 82%/100% 42% no-repeat;
    padding:0 .06em}

  .rangee{display:flex;align-items:center;gap:${ECART_ICONE}px;color:${T.fg}}
  .i{width:${TAILLE_ICONE}px;height:${TAILLE_ICONE}px;fill:currentColor;display:block}
</style>
<svg class="signature" width="100" height="60" aria-hidden="true">${pixels}</svg>
<div class="bloc">
  <span class="etiquette">benaja-bendo.fr</span>
  <h1 class="accroche">Je conçois, je livre et <span class="marque">j’opère</span>.</h1>
  <div class="rangee">${icones}</div>
</div>
`;

mkdirSync(sortie, { recursive: true });
const cheminHtml = join(sortie, 'banniere-linkedin.html');
const cheminPng = join(sortie, 'banniere-linkedin.png');
writeFileSync(cheminHtml, html);

/* -- 5. Rendu -------------------------------------------------------------- */
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
execFileSync(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--force-device-scale-factor=${ECHELLE}`,
  `--window-size=${L},${H}`,
  `--screenshot=${cheminPng}`,
  `file://${cheminHtml}`,
], { stdio: 'pipe' });

/* Réduction à la taille exacte attendue par LinkedIn : rendu 2× puis réduit,
   le texte encaisse mieux la recompression du site que rendu à 1×. */
const sharp = (await import(join(racine, 'node_modules/sharp/dist/index.mjs'))).default;
const png = await sharp(cheminPng).resize(L, H, { fit: 'fill' }).png({ compressionLevel: 9 }).toBuffer();
writeFileSync(cheminPng, png);

const { width, height } = await sharp(cheminPng).metadata();
console.log(`✓ ${cheminPng}`);
console.log(`  ${width}×${height} px · ${(png.length / 1024).toFixed(0)} Ko · ${SELECTION.length} logos, en ${T.fg}`);
console.log(`  source retouchable : ${cheminHtml}`);
