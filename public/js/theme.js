/**
 * Choix du thème — le seul JavaScript envoyé sur TOUTES les pages.
 *
 * (Le site en compte un second depuis le 14/08/2026, `cv.js`, chargé par la
 * seule page /cv pour son bouton d'impression. Voir l'invariant n°3.)
 *
 * Pourquoi il existe : une préférence de thème doit survivre à la navigation.
 * Sur un site multi-pages, une bascule en CSS pur (`:has()` + case à cocher) se
 * réinitialise à chaque lien suivi. La persistance impose `localStorage`, donc
 * du script. L'invariant n°3 du projet prévoit ce cas : vanilla, dans un
 * fichier externe, jamais en ligne — `script-src 'self'` reste respectée.
 *
 * Pourquoi il est chargé SANS `defer` dans le <head> : il doit poser
 * l'attribut avant que le body soit peint, sinon la page s'affiche une
 * fraction de seconde dans le thème du système avant de basculer. C'est le
 * seul endroit du site où l'on accepte de bloquer le rendu — 1,5 Ko une fois
 * compressé, servi depuis le même domaine, mis en cache une semaine.
 *
 * Trois états : « clair », « sombre », et « auto » (défaut), qui retire
 * l'attribut et rend la main à `prefers-color-scheme`.
 */
(() => {
  const CLE = 'theme';
  const CHOIX_VALIDES = ['clair', 'sombre', 'auto'];
  const racine = document.documentElement;

  /** Couleur de la barre du navigateur, par thème (voir <meta theme-color>). */
  const COULEUR_UI = { clair: '#fcfaf3', sombre: '#12161a' };

  // localStorage jette dans certains modes privés : une préférence indisponible
  // ne doit jamais empêcher la page de s'afficher.
  const lire = () => {
    try {
      const valeur = localStorage.getItem(CLE);
      return CHOIX_VALIDES.includes(valeur) ? valeur : 'auto';
    } catch {
      return 'auto';
    }
  };

  const ecrire = (choix) => {
    try {
      if (choix === 'auto') localStorage.removeItem(CLE);
      else localStorage.setItem(CLE, choix);
    } catch {
      /* préférence non persistée, la page reste utilisable */
    }
  };

  const appliquer = (choix) => {
    if (choix === 'auto') racine.removeAttribute('data-theme');
    else racine.setAttribute('data-theme', choix);
  };

  /**
   * Les deux <meta theme-color> portent une media query : elles continueraient
   * de suivre le système alors que l'utilisateur a tranché. Quand un choix est
   * forcé, on leur donne la même couleur — celle qui gagne est donc la bonne.
   */
  const accorderCouleurUI = (choix) => {
    const metas = document.querySelectorAll('meta[name="theme-color"]');
    for (const meta of metas) {
      if (choix === 'auto') {
        const dorigine = meta.dataset.couleurOrigine;
        if (dorigine) meta.setAttribute('content', dorigine);
      } else {
        if (!meta.dataset.couleurOrigine) {
          meta.dataset.couleurOrigine = meta.getAttribute('content');
        }
        meta.setAttribute('content', COULEUR_UI[choix]);
      }
    }
  };

  // Avant le premier rendu.
  appliquer(lire());

  const cabler = () => {
    accorderCouleurUI(lire());

    const groupe = document.querySelector('[data-theme-commande]');
    if (!groupe) return;

    const boutons = Array.from(groupe.querySelectorAll('[data-theme-choix]'));
    if (boutons.length === 0) return;

    const refleter = (choix) => {
      for (const bouton of boutons) {
        bouton.setAttribute(
          'aria-pressed',
          String(bouton.dataset.themeChoix === choix),
        );
      }
    };

    for (const bouton of boutons) {
      bouton.addEventListener('click', () => {
        const choix = bouton.dataset.themeChoix;
        appliquer(choix);
        ecrire(choix);
        accorderCouleurUI(choix);
        refleter(choix);
      });
    }

    refleter(lire());

    // La commande ne sert à rien sans script : elle reste masquée par le CSS
    // tant que cet attribut n'est pas posé. Pas de bouton mort.
    racine.setAttribute('data-theme-pret', '');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cabler);
  } else {
    cabler();
  }
})();
