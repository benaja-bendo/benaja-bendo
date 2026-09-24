import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const racine = fileURLToPath(new URL('../dist/', import.meta.url));
function fichiers(dossier) {
  return readdirSync(dossier, { withFileTypes: true }).flatMap((entree) => {
    const chemin = join(dossier, entree.name);
    return entree.isDirectory() ? fichiers(chemin) : [chemin];
  });
}
assert.ok(existsSync(racine), 'Exécuter npm run build avant npm test.');
const pages = new Map(fichiers(racine).filter((f) => f.endsWith('.html')).map((f) => [f, readFileSync(f, 'utf8')]));
const ids = new Map([...pages].map(([f, html]) => [f, [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])]));

test('toutes les pages respectent la CSP et gardent des identifiants uniques', () => {
  assert.ok(pages.size > 0);
  for (const [f, html] of pages) {
    assert.doesNotMatch(html, /<style(?:\s|>)/i, f);
    assert.doesNotMatch(html, /<[a-zA-Z][^>]*\s(?:style|on[\w-]+)\s*=/i, f);
    for (const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      assert.match(script[1], /\bsrc="\//, f);
      assert.equal(script[2].trim(), '', f);
    }
    assert.equal(new Set(ids.get(f)).size, ids.get(f).length, `Identifiant dupliqué : ${f}`);
  }
});

test('les liens internes et leurs fragments ont une destination dans le build', () => {
  for (const [f, html] of pages) {
    for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
      const url = new URL(href, `https://preview.invalid/${relative(racine, f)}`);
      if (url.origin !== 'https://preview.invalid') continue;
      let cible = resolve(racine, `.${decodeURIComponent(url.pathname)}`);
      assert.ok(existsSync(cible), `${relative(racine, f)} → ${href}`);
      if (statSync(cible).isDirectory()) cible = join(cible, 'index.html');
      assert.ok(existsSync(cible), `${relative(racine, f)} → ${href}`);
      if (url.hash && pages.has(cible)) {
        assert.ok(ids.get(cible).includes(decodeURIComponent(url.hash.slice(1))), `${relative(racine, f)} → ${href}`);
      }
    }
  }
});

test('les scripts de page restent locaux au CV et à l’étude Mibeko', () => {
  for (const [f, html] of pages) {
    const chemin = relative(racine, f);
    const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/gi)].map((m) => m[1]);
    if (scripts.includes('/js/demo-mibeko.js')) assert.equal(chemin, 'etudes/mibeko/index.html');
    if (scripts.includes('/js/cv.js')) assert.match(chemin, /^cv\/(?:[a-z0-9-]+\/)?index\.html$/);
    for (const script of scripts) assert.ok(existsSync(join(racine, script)), `${f} → ${script}`);
  }
  assert.match(pages.get(join(racine, 'etudes/mibeko/index.html')), /src="\/js\/demo-mibeko.js"/);
});

test('la démo servie est complète, la commande est hors de l’image décorative', () => {
  const html = pages.get(join(racine, 'etudes/mibeko/index.html'));
  assert.doesNotMatch(html, /\sdata-demo-pret(?:\s|=|>)/);
  assert.match(html, /class="assistant-bulle assistant-bulle-utilisateur"/);
  assert.match(html, /Article 123/);
  assert.match(html, /Article 127/);
  assert.match(html, /<button[^>]*data-demo-commande[^>]*aria-controls="assistant-mibeko-ecran"/);
  assert.ok(html.indexOf('data-demo-commande') < html.indexOf('id="assistant-mibeko-ecran"'));
});

test('sans script, la CSS masque la commande et l’attente, et les liens du sommaire font au moins 44 px', () => {
  const css = readFileSync(join(dirname(racine), 'src/styles/global.css'), 'utf8');
  assert.match(css, /\n\.assistant-commande\s*\{\s*display:\s*none/);
  assert.match(css, /\n\.assistant-bulle-ia\s*\{\s*display:\s*none/);
  const points = css.match(/\n\.assistant-points i\s*\{([^}]+)\}/)[1];
  assert.doesNotMatch(points, /animation:/);
  const sources = css.match(/\n\.assistant-sources\s*\{([^}]+)\}/)[1];
  assert.doesNotMatch(sources, /transition:/, 'Le retour au rendu statique doit être immédiat.');
  assert.match(css, /\n\.sommaire a\s*\{[^}]*min-height:\s*2\.75rem/);
});

// Les versions du CV (src/lib/cv-profils.ts) : /cv est le CV général, public et
// indexé ; /cv/<profil> sont des variantes à envoyer, jamais à découvrir.
const SITE = 'https://benaja-bendo.fr';

/** Fichier du build et section visés par un lien, relatif ou absolu vers le site. */
function destination(href, depuis) {
  const url = new URL(href.startsWith(`${SITE}/`) ? href.slice(SITE.length) : href, `https://preview.invalid/${relative(racine, depuis)}`);
  let cible = resolve(racine, `.${decodeURIComponent(url.pathname)}`);
  if (existsSync(cible) && statSync(cible).isDirectory()) cible = join(cible, 'index.html');
  return { page: pages.has(cible) ? cible : undefined, fragment: decodeURIComponent(url.hash.slice(1)) };
}

/** Texte lisible d'un morceau de HTML, espaces normalisées. */
function texte(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&rsquo;/g, '’')
    .replace(/\s+/g, ' ');
}

const pagesCV = [...pages].filter(([f]) => /^cv\/(?:[a-z0-9-]+\/)?index\.html$/.test(relative(racine, f)));
const variantes = pagesCV.filter(([f]) => relative(racine, f) !== 'cv/index.html');

test('le CV général est indexé ; ses variantes sont en noindex, hors sitemap et liées de nulle part', () => {
  const general = pages.get(join(racine, 'cv/index.html'));
  assert.ok(general, 'dist/cv/index.html manquant');
  assert.doesNotMatch(general, /<meta name="robots"/);
  assert.ok(variantes.length > 0, 'aucune variante de CV générée');
  const sitemap = readdirSync(racine)
    .filter((f) => /^sitemap-\d+\.xml$/.test(f))
    .map((f) => readFileSync(join(racine, f), 'utf8'))
    .join('\n');
  assert.match(sitemap, /\/cv\/<\/loc>/);
  for (const [f, html] of variantes) {
    const chemin = `/${relative(racine, f).replace(/index\.html$/, '')}`;
    assert.match(html, /<meta name="robots" content="noindex, follow">/, chemin);
    assert.ok(!sitemap.includes(chemin), `${chemin} ne doit pas figurer dans le sitemap`);
    // Un lien <a>, pas la canonique que la variante porte sur elle-même.
    const motif = new RegExp(`<a\\b[^>]*\\bhref="(?:https://benaja-bendo\\.fr)?${chemin.replace(/\/$/, '')}/?"`);
    for (const [autre, contenu] of pages) {
      assert.doesNotMatch(contenu, motif, `${relative(racine, autre)} renvoie vers la variante ${chemin}`);
    }
  }
});

test('chaque version du CV nomme son PDF, montre ses preuves et ne lie qu’en absolu', () => {
  const noms = new Set();
  for (const [f, html] of pagesCV) {
    const chemin = relative(racine, f);
    const nom = html.match(/data-nom-impression="([^"]+)"/)?.[1];
    assert.match(nom ?? '', /^[A-Za-z0-9-]+$/, chemin);
    noms.add(nom);
    assert.match(html, /href="https:\/\/apps\.apple\.com\/app\/id6768865781"/, chemin);
    assert.match(html, /href="https:\/\/play\.google\.com\/store\/apps\/details\?id=cg\.mibeko\.app"/, chemin);
    assert.match(html, /href="https:\/\/trouve-ton-profil\.com"/, chemin);
    // Présenté avec l'accord du fondeur (24/09/2026) : le seul projet mené en
    // direct pour un client, il figure sur chaque version.
    assert.match(html, /href="https:\/\/lagrenaille\.fr"/, chemin);
    // Un lien relatif deviendrait « localhost » dans un PDF exporté en local.
    const article = html.slice(html.indexOf('<article class="cv'), html.indexOf('</article>'));
    for (const [, href] of article.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
      assert.match(href, /^(?:https:|mailto:)/, `${chemin} : lien non absolu ${href}`);
      // Absolu vers le site : le test des liens internes ne le voit pas, on
      // vérifie donc ici que la page (et la section) existent dans le build.
      if (href.startsWith(`${SITE}/`)) {
        const { page, fragment } = destination(href, f);
        assert.ok(page, `${chemin} → ${href} : page absente du build`);
        if (fragment) assert.ok(ids.get(page).includes(fragment), `${chemin} → ${href} : section absente`);
      }
    }
    // L'étape 2 du 24/09/2026 : sous l'expérience Capgemini, les études qui
    // la prouvent ; dans la stack, des compétences cliquables et annoncées.
    assert.match(article, /href="https:\/\/benaja-bendo\.fr\/etudes\/france-travail"/, chemin);
    assert.match(article, /href="https:\/\/benaja-bendo\.fr\/etudes\/aife"/, chemin);
    assert.match(article, /class="cv-stack-legende"/, chemin);
  }
  assert.equal(noms.size, pagesCV.length, 'deux versions du CV proposent le même nom de PDF');
});

// Une compétence cliquable promet une preuve : la page visée doit la nommer,
// dans la section visée quand le lien porte un fragment. Sans ce contrôle, une
// étude réécrite ou une section renommée laisserait un lien qui ne prouve plus
// rien (docs/10 : « un lien de preuve est vérifié avant d'être publié »).
test('chaque compétence cliquable mène à une page qui la nomme', () => {
  let liens = 0;
  for (const [f, html] of pages) {
    for (const [, href, attribut] of html.matchAll(/<a href="([^"]+)" data-techno="([^"]+)"/g)) {
      liens += 1;
      const techno = texte(attribut).trim();
      const origine = `${relative(racine, f)} → ${techno}`;
      const { page, fragment } = destination(href, f);
      assert.ok(page, `${origine} : ${href} absent du build`);
      let zone = pages.get(page);
      const main = zone.indexOf('<main');
      zone = zone.slice(main === -1 ? 0 : main);
      if (fragment) {
        const debut = zone.indexOf(`id="${fragment}"`);
        assert.ok(debut !== -1, `${origine} : section #${fragment} absente`);
        const fin = zone.indexOf('<h2', debut + 1);
        zone = zone.slice(debut, fin === -1 ? undefined : fin);
      }
      // « Laravel / PHP » est prouvé par « Laravel », « OpenShift (Kubernetes) »
      // par « OpenShift », « Agents IA & MCP » par « MCP » : une des parties
      // du nom suffit.
      const parties = techno
        .replace(/\([^)]*\)/g, '')
        .split(/\s+[\/&]\s+/)
        .map((m) => m.trim().toLowerCase())
        .filter(Boolean);
      const lu = texte(zone).toLowerCase();
      assert.ok(parties.some((m) => lu.includes(m)), `${origine} : ${href} ne nomme pas « ${techno} »`);
    }
  }
  assert.ok(liens > 0, 'aucune compétence cliquable trouvée dans le build');
});

// Choix d'écriture du 23/09/2026 : pas de tiret cadratin dans le texte publié.
// Le site vise aussi des lecteurs non techniques ; virgule, deux-points,
// parenthèses ou point font le même travail plus simplement. Les commentaires
// du code source ne sont pas publiés et ne sont donc pas concernés.
test('aucun tiret cadratin dans les pages ni dans le flux RSS', () => {
  const publies = fichiers(racine).filter((f) => /\.(html|xml)$/.test(f));
  for (const f of publies) {
    const contenu = readFileSync(f, 'utf8');
    assert.doesNotMatch(contenu, /—|&mdash;|&#8212;|&#x2014;/i, relative(racine, f));
  }
});
