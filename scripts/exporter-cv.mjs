/**
 * Exporte chaque version du CV en PDF, dans output/pdf/ — `npm run cv:pdf`.
 *
 * Pourquoi ce script existe : les sites d'emploi (Hellowork, APEC, Welcome…)
 * exigent un fichier, pas un lien. Jusqu'ici, chaque PDF était produit à la
 * main depuis la boîte d'impression, avec deux pièges : la case « En-têtes et
 * pieds de page » à décocher, et un nom de fichier à retaper.
 *
 * Ce qu'il ne change PAS : la décision « le CV est une page, pas un PDF »
 * (docs/10 §5). Rien de ce qu'il produit n'est déployé — output/ est hors de
 * dist/. Le PDF sort de la même source que la page, au moment où on postule,
 * et se régénère en une commande : il ne peut pas diverger du site.
 *
 * Aucune dépendance : un serveur statique de vingt lignes sur dist/, et le
 * Chrome déjà installé en mode headless (`--no-pdf-header-footer` retire la
 * date, l'URL et la pagination du navigateur). Chemin de Chrome surchargeable
 * par la variable CHROME_PATH.
 *
 * Contrôle au passage : chaque version doit tenir en deux pages A4. Au-delà,
 * le script le signale et sort en erreur — le fichier est tout de même écrit.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, join, normalize, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = fileURLToPath(new URL('../', import.meta.url));
const dist = join(racine, 'dist');
const sortie = join(racine, 'output', 'pdf');
const PAGES_MAX = 2;

if (!existsSync(join(dist, 'cv', 'index.html'))) {
  console.error('dist/cv/index.html introuvable : lancer `npm run build` d’abord (ou `npm run cv:pdf`, qui le fait).');
  process.exit(1);
}

const chrome = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find((chemin) => chemin && existsSync(chemin));
if (!chrome) {
  console.error('Chrome introuvable. Indiquer son chemin : CHROME_PATH=/chemin/vers/chrome npm run cv:pdf');
  process.exit(1);
}

/* Serveur statique minimal sur dist/, avec les URL propres de firebase.json. */
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
};
const serveur = createServer((requete, reponse) => {
  const chemin = normalize(decodeURIComponent(new URL(requete.url, 'http://x').pathname));
  const candidats = [join(dist, chemin), join(dist, chemin, 'index.html'), join(dist, `${chemin}.html`)];
  const fichier = candidats.find((c) => c.startsWith(dist) && existsSync(c) && statSync(c).isFile());
  if (!fichier) {
    reponse.writeHead(404).end();
    return;
  }
  reponse.writeHead(200, { 'Content-Type': types[extname(fichier)] ?? 'application/octet-stream' });
  reponse.end(readFileSync(fichier));
});
await new Promise((ok) => serveur.listen(0, '127.0.0.1', ok));
const origine = `http://127.0.0.1:${serveur.address().port}`;

/* Toutes les versions générées : /cv et /cv/<profil>. */
const pagesCV = [join(dist, 'cv', 'index.html')].concat(
  readdirSync(join(dist, 'cv'), { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(join(dist, 'cv', e.name, 'index.html')))
    .map((e) => join(dist, 'cv', e.name, 'index.html')),
);

/*
 * Chrome headless écrit le PDF mais ne se termine pas toujours ensuite
 * (constaté le 23/09/2026 avec Chrome 153 : le processus reste en vie
 * indéfiniment). On n'attend donc pas sa sortie : on surveille le fichier,
 * et dès que sa taille ne bouge plus, on ferme Chrome nous-mêmes.
 */
const attendre = (ms) => new Promise((ok) => setTimeout(ok, ms));
const tailleSiPresent = (fichier) => (existsSync(fichier) ? statSync(fichier).size : 0);

const imprimer = (url, fichier) =>
  new Promise((ok, echec) => {
    rmSync(fichier, { force: true });
    // Profil jetable : ne touche jamais au Chrome ouvert de l'utilisateur.
    const profil = mkdtempSync(join(tmpdir(), 'cv-pdf-'));
    const processus = spawn(chrome, [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      `--user-data-dir=${profil}`,
      '--no-pdf-header-footer',
      '--virtual-time-budget=10000',
      `--print-to-pdf=${fichier}`,
      url,
    ], { stdio: 'ignore' });
    let termine = false;
    const finir = (erreur) => {
      if (termine) return;
      termine = true;
      processus.kill('SIGKILL');
      // Laisser Chrome relâcher son profil avant de le supprimer.
      setTimeout(() => rmSync(profil, { recursive: true, force: true }), 500);
      erreur ? echec(erreur) : ok();
    };
    processus.on('error', finir);
    processus.on('exit', (code) => {
      if (tailleSiPresent(fichier) > 0) finir();
      else finir(new Error(`Chrome s'est arrêté (code ${code}) sans écrire ${fichier}`));
    });
    (async () => {
      let precedente = -1;
      for (let essai = 0; essai < 120 && !termine; essai += 1) {
        await attendre(500);
        const taille = tailleSiPresent(fichier);
        if (taille > 0 && taille === precedente) return finir();
        precedente = taille;
      }
      finir(new Error(`Délai dépassé : aucun PDF stable après 60 s pour ${url}`));
    })();
  });

mkdirSync(sortie, { recursive: true });
let trop = 0;
try {
  for (const page of pagesCV) {
    const html = readFileSync(page, 'utf8');
    const nom = html.match(/data-nom-impression="([^"]+)"/)?.[1];
    if (!nom) throw new Error(`${relative(dist, page)} ne déclare pas data-nom-impression`);
    const chemin = `/${relative(dist, page).replace(/index\.html$/, '')}`;
    const fichier = join(sortie, `${nom}.pdf`);
    await imprimer(`${origine}${chemin}`, fichier);
    // Chrome n'utilise pas de flux d'objets : chaque page est un objet
    // `/Type /Page` lisible en clair (à ne pas confondre avec `/Pages`).
    const pages = readFileSync(fichier).toString('latin1').match(/\/Type\s*\/Page(?![a-zA-Z])/g)?.length ?? 0;
    const ok = pages > 0 && pages <= PAGES_MAX;
    if (!ok) trop += 1;
    console.log(`${ok ? '✓' : '✗'} ${chemin.padEnd(18)} → output/pdf/${nom}.pdf (${pages} page${pages > 1 ? 's' : ''})`);
  }
} finally {
  serveur.close();
}

if (trop > 0) {
  console.error(`\n${trop} version(s) dépassent ${PAGES_MAX} pages : masquer un point dans src/lib/cv-profils.ts.`);
  process.exit(1);
}
