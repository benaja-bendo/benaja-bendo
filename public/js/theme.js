/**
 * Choix du thème — le seul JavaScript envoyé sur TOUTES les pages.
 *
 * (Les scripts propres à une page passent par la prop `script` de Base.astro et
 * sont chargés en `defer` ; voir `cv.js`. Celui-ci est le seul qui soit global,
 * et le seul à bloquer le rendu.)
 *
 * Pourquoi il existe : une préférence de thème doit survivre à la navigation.
 * Sur un site multi-pages, une bascule en CSS pur (`:has()` + case à cocher) se
 * réinitialise à chaque lien suivi. La persistance impose `localStorage`, donc
 * du script. Vanilla, dans un fichier externe, jamais en ligne — la CSP
 * `script-src 'self'` l'exige.
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
    // `data-theme` ne peut pas porter « auto » : son absence EST l'état auto,
    // c'est ce qui rend la main à prefers-color-scheme. Mais la bascule de
    // l'en-tête doit afficher un glyphe pour les trois états, y compris auto —
    // d'où un second attribut, purement descriptif, que le CSS peut lire.
    racine.setAttribute('data-theme-actuel', choix);
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

  /** Libellé du bouton compact : l'état courant, puis ce que le clic fera. */
  const ETAT_LU = { clair: 'clair', sombre: 'sombre', auto: 'système' };

  const cabler = () => {
    accorderCouleurUI(lire());

    // Deux commandes, une seule source de vérité. Le groupe de trois boutons du
    // pied de page nomme les états ; la bascule de l'en-tête les fait défiler
    // là où on la cherche. Les deux doivent refléter le même choix, sinon le
    // site se contredit à deux endroits de la même page.
    const boutons = Array.from(document.querySelectorAll('[data-theme-choix]'));
    const bascules = Array.from(document.querySelectorAll('[data-theme-cycle]'));
    if (boutons.length === 0 && bascules.length === 0) return;

    const refleter = (choix) => {
      for (const bouton of boutons) {
        bouton.setAttribute(
          'aria-pressed',
          String(bouton.dataset.themeChoix === choix),
        );
      }
      const apres = CHOIX_VALIDES[(CHOIX_VALIDES.indexOf(choix) + 1) % CHOIX_VALIDES.length];
      for (const bascule of bascules) {
        // Le bouton ne porte pas de texte : son libellé accessible doit donc
        // dire l'état ET l'effet du clic, sinon il annonce une action sans
        // jamais dire où l'on en est.
        bascule.setAttribute(
          'aria-label',
          `Thème : ${ETAT_LU[choix]}. Changer pour le thème ${ETAT_LU[apres]}.`,
        );
      }
    };

    const choisir = (choix) => {
      appliquer(choix);
      ecrire(choix);
      accorderCouleurUI(choix);
      refleter(choix);
    };

    for (const bouton of boutons) {
      bouton.addEventListener('click', () => choisir(bouton.dataset.themeChoix));
    }

    for (const bascule of bascules) {
      bascule.addEventListener('click', () => {
        const rang = CHOIX_VALIDES.indexOf(lire());
        choisir(CHOIX_VALIDES[(rang + 1) % CHOIX_VALIDES.length]);
      });
    }

    refleter(lire());

    // Les commandes ne servent à rien sans script : elles restent masquées par
    // le CSS tant que cet attribut n'est pas posé. Pas de bouton mort.
    racine.setAttribute('data-theme-pret', '');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cabler);
  } else {
    cabler();
  }
})();
