import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const source = (nom) => readFileSync(new URL(`../public/js/${nom}.js`, import.meta.url), 'utf8');

// DOM minimal pour les scripts externes : ni navigateur ni dépendance de test.
// L'accès au style échoue volontairement : le contrat impose classes/attributs.
class Element extends EventTarget {
  attrs = new Map();
  dataset = {};
  textContent = '';
  scrollTop = 0;
  scrollLeft = 0;
  scrollHeight = 100;
  clientWidth = 280;
  classes = new Set();
  classList = {
    add: (...noms) => noms.forEach((nom) => this.classes.add(nom)),
    remove: (...noms) => noms.forEach((nom) => this.classes.delete(nom)),
    contains: (nom) => this.classes.has(nom),
  };
  get style() { throw new Error('Un script ne doit pas écrire de style inline'); }
  setAttribute(nom, valeur) {
    this.attrs.set(nom, String(valeur));
    if (nom.startsWith('data-')) {
      this.dataset[nom.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = String(valeur);
    }
  }
  getAttribute(nom) { return this.attrs.get(nom) ?? null; }
  hasAttribute(nom) { return this.attrs.has(nom); }
  removeAttribute(nom) { this.attrs.delete(nom); }
  click() { this.dispatchEvent(new Event('click')); }
  scrollTo({ left }) { this.scrollLeft = left; }
}

function theme({ lecture = true, ecriture = true, valeur = null } = {}) {
  const racine = new Element();
  const bascule = new Element();
  const choix = ['clair', 'sombre', 'auto'].map((c) => {
    const e = new Element(); e.dataset.themeChoix = c; return e;
  });
  const metas = ['#fcfaf3', '#12161a'].map((couleur) => {
    const e = new Element(); e.setAttribute('content', couleur); return e;
  });
  const document = {
    documentElement: racine,
    readyState: 'complete',
    querySelectorAll: (s) => ({
      '[data-theme-cycle]': [bascule], '[data-theme-choix]': choix,
      'meta[name="theme-color"]': metas,
    })[s] ?? [],
  };
  const localStorage = {
    getItem() { if (!lecture) throw new Error('SecurityError'); return valeur; },
    setItem(_, v) { if (!ecriture) throw new Error('QuotaExceededError'); valeur = v; },
    removeItem() { if (!ecriture) throw new Error('SecurityError'); valeur = null; },
  };
  runInNewContext(source('theme'), { document, localStorage });
  return { racine, bascule, choix, metas };
}

for (const options of [
  {}, { lecture: false, ecriture: false }, { ecriture: false },
]) {
  test(`la bascule parcourt les trois thèmes : ${JSON.stringify(options)}`, () => {
    const t = theme(options);
    for (const attendu of ['clair', 'sombre', 'auto']) {
      t.bascule.click();
      assert.equal(t.racine.getAttribute('data-theme-actuel'), attendu);
      assert.equal(t.choix.find((b) => b.getAttribute('aria-pressed') === 'true').dataset.themeChoix, attendu);
    }
    assert.deepEqual(t.metas.map((m) => m.getAttribute('content')), ['#fcfaf3', '#12161a']);
  });
}

test('le pied de page et la bascule partagent le même état malgré un stockage devenu périmé', () => {
  const t = theme({ ecriture: false, valeur: 'sombre' });
  t.choix[0].click();
  t.bascule.click();
  assert.equal(t.racine.getAttribute('data-theme'), 'sombre');
  assert.equal(t.bascule.getAttribute('aria-label'), 'Thème : sombre. Changer pour le thème système.');
});

function demo({ reduit = false, manque = null } = {}) {
  const racine = new Element();
  const noms = [
    '[data-demo-commande]', '[data-demo-fil]', '[data-demo-heure]',
    '[data-demo-frappe]', '[data-demo-envoi]', '[data-demo-bulle-ia]',
    '[data-demo-sources]', '.assistant-tour-utilisateur', '.assistant-tour-ia',
    '.assistant-sources-rangee', '.assistant-bulle-utilisateur',
  ];
  const noeuds = Object.fromEntries(noms.map((n) => [n, new Element()]));
  noeuds['.assistant-bulle-utilisateur'].textContent = 'Mon bailleur peut-il refuser de renouveler mon bail commercial ?';
  noeuds['[data-demo-commande]'].textContent = 'Rejouer l’animation';
  racine.querySelector = (s) => s === manque ? null : noeuds[s] ?? null;
  racine.querySelectorAll = () => [new Element(), new Element()];
  const mouvement = new EventTarget();
  mouvement.matches = reduit;
  const document = new EventTarget();
  document.hidden = false;
  document.querySelectorAll = () => [racine];
  let horodatage = 0, id = 0;
  const images = new Map(), observations = [], erreurs = [];
  class IntersectionObserver {
    constructor(rappel) { observations.push(rappel); }
    observe() {}
  }
  runInNewContext(source('demo-mibeko'), {
    document,
    window: { matchMedia: () => mouvement, IntersectionObserver },
    IntersectionObserver,
    requestAnimationFrame: (rappel) => { images.set(++id, rappel); return id; },
    cancelAnimationFrame: (i) => images.delete(i),
    performance: { now: () => horodatage },
    console: { error: (e) => erreurs.push(e) },
  });
  return {
    racine, noeuds, images, erreurs, document, observations,
    commande: noeuds['[data-demo-commande]'],
    reduire(valeur) { mouvement.matches = valeur; mouvement.dispatchEvent(new Event('change')); },
    async avancer(nombre) {
      for (let i = 0; i < nombre; i++) {
        horodatage += 40;
        const rappels = [...images.values()]; images.clear();
        rappels.forEach((rappel) => rappel(horodatage));
        // Vider les continuations imbriquées (horloge, frappe, boucle).
        for (let j = 0; j < 8; j++) await Promise.resolve();
      }
    },
  };
}

function verifierStatique(d) {
  assert.equal(d.racine.hasAttribute('data-demo-pret'), false);
  assert.equal(d.racine.hasAttribute('data-demo-frappe-active'), false);
  assert.equal(d.noeuds['[data-demo-frappe]'].textContent, '');
  assert.equal(d.noeuds['[data-demo-fil]'].classList.contains('assistant-fil-sortante'), false);
  assert.equal(d.commande.textContent, 'Rejouer l’animation');
  assert.equal(d.images.size, 0);
  assert.deepEqual(d.erreurs, []);
}

test('mouvement réduit dès le chargement : pas de lecture, reprise uniquement sur demande', async () => {
  const d = demo({ reduit: true });
  await d.avancer(30);
  verifierStatique(d);
  d.commande.click();
  verifierStatique(d);
  d.reduire(false);
  verifierStatique(d);
  d.commande.click();
  await d.avancer(25);
  assert.ok(d.noeuds['[data-demo-frappe]'].textContent.length > 0);
});

test('arrêt et réduction du mouvement restituent le HTML complet à chaque phase', async () => {
  for (const images of [5, 25, 75, 115, 155, 210, 280, 330]) {
    for (const arretSysteme of [false, true]) {
      const d = demo();
      await d.avancer(images);
      if (arretSysteme) d.reduire(true);
      else d.commande.click();
      await d.avancer(30);
      verifierStatique(d);
    }
  }
});

test('les arrêts/reprises rapides ne laissent pas plusieurs lectures concurrentes', async () => {
  const d = demo();
  for (let i = 0; i < 10; i++) {
    await d.avancer(15);
    d.commande.click();
    d.commande.click();
    assert.equal(d.images.size, 1);
  }
  d.commande.click();
  await d.avancer(100);
  verifierStatique(d);
  assert.equal(d.observations.length, 1);
});

test('le retour dans la fenêtre ne relance pas une lecture arrêtée volontairement', async () => {
  const d = demo();
  d.observations[0]([{ isIntersecting: false }]);
  await d.avancer(50);
  assert.equal(d.noeuds['[data-demo-frappe]'].textContent, '');
  d.observations[0]([{ isIntersecting: true }]);
  await d.avancer(25);
  assert.ok(d.noeuds['[data-demo-frappe]'].textContent.length > 0);
  d.commande.click();
  d.document.dispatchEvent(new Event('visibilitychange'));
  await d.avancer(50);
  verifierStatique(d);
});

test('sans les éléments requis, la démo ne masque pas le HTML et ne révèle aucune commande', () => {
  for (const manque of ['[data-demo-fil]', '[data-demo-commande]']) {
    const d = demo({ manque });
    assert.equal(d.racine.hasAttribute('data-demo-commandes'), false);
    verifierStatique(d);
  }
});
