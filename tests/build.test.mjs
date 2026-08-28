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
    if (scripts.includes('/js/cv.js')) assert.equal(chemin, 'cv/index.html');
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
