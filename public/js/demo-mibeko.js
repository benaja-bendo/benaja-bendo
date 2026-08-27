/**
 * Démonstration animée de l'écran Assistant Mibeko — galerie de preuves de
 * l'étude de cas.
 *
 * Le moteur (horloge par image, arrêt propre hors écran, variation de frappe)
 * et la chorégraphie (question → attente → sources, jamais de réponse
 * inventée) reprennent celles du composant `AssistantConversation.astro` du
 * dépôt `mibeko-site` — même auteur, même produit, le vrai comportement de
 * l'application plutôt qu'une simulation de chat générique.
 *
 * Chargé uniquement par la page d'étude Mibeko, en `defer` (prop `script` de
 * Base.astro). Le HTML servi par `DemoMibeko.astro` porte déjà la conversation
 * complète et immobile : ce script la vide puis la rejoue.
 *
 * ── Le contrat ────────────────────────────────────────────────────────────────
 * 1. Il ne prend la main qu'après avoir posé `data-demo-pret` sur la racine.
 *    Tant que cet attribut manque, le CSS affiche l'échange complet.
 * 2. Aucun `style=` — uniquement des classes et du `textContent`.
 * 3. Sous `prefers-reduced-motion: reduce`, il ne fait rien.
 * 4. Il n'invente aucun texte : le HTML qu'il rejoue est celui qu'Astro a
 *    rendu, jamais un contenu généré par le script.
 */
(() => {
  'use strict';

  const REGLAGES = {
    /** Millisecondes par caractère, avec une variation toutes les sept lettres
     *  pour casser l'impression d'un défilement mécanique — même mesure que
     *  `AssistantConversation.astro`. */
    frappe: { base: 30, variation: 62, tous: 7 },
    attente: {
      debut: 420,
      apresFrappe: 420,
      apresEnvoi: 120,
      apresUtilisateur: 620,
      reflexion: 1700,
      sourcesVersCarrousel: 700,
      carrousel: 1200,
      lecture: 3600,
      sortie: 520,
    },
  };

  const INTERRUPTION = Symbol('interruption');

  /* ---------------------------------------------------------------------------
   * Horloge — une boucle rAF pilote délais ET frappe, avec un delta plafonné à
   * 250 ms. Mesuré sur le produit réel : dans un onglet visible mais non
   * focalisé, Chrome ramène `setTimeout` à une granularité d'une seconde et la
   * chorégraphie s'effondre. Compter le temps image par image évite ce défaut
   * et donne la pause hors écran pour rien — cesser d'avancer l'horloge, pas
   * annuler ce qui attend.
   * ------------------------------------------------------------------------ */
  class Horloge {
    constructor() {
      this.attentes = new Set();
      this.enPause = false;
      this.image = null;
      this.dernier = 0;
      this._image = this._image.bind(this);
    }

    demarrer() {
      if (this.image !== null) return;
      this.dernier = performance.now();
      this.image = requestAnimationFrame(this._image);
    }

    arreter() {
      if (this.image !== null) cancelAnimationFrame(this.image);
      this.image = null;
      for (const a of this.attentes) a.rejeter(INTERRUPTION);
      this.attentes.clear();
    }

    _image(maintenant) {
      this.image = requestAnimationFrame(this._image);
      const dt = Math.min(maintenant - this.dernier, 250);
      this.dernier = maintenant;
      if (this.enPause) return;
      for (const a of [...this.attentes]) {
        a.reste -= dt;
        if (a.reste <= 0) {
          this.attentes.delete(a);
          a.resoudre();
        }
      }
    }

    patienter(ms) {
      return new Promise((resoudre, rejeter) => {
        this.attentes.add({ reste: ms, resoudre, rejeter });
      });
    }
  }

  /* ---------------------------------------------------------------------------
   * La démonstration
   * ------------------------------------------------------------------------ */
  class Demo {
    constructor(racine) {
      this.racine = racine;
      this.fil = racine.querySelector('[data-demo-fil]');
      this.heure = racine.querySelector('[data-demo-heure]');
      this.frappeNoeud = racine.querySelector('[data-demo-frappe]');
      this.curseur = racine.querySelector('[data-demo-curseur]');
      this.placeholder = racine.querySelector('[data-demo-placeholder]');
      this.envoi = racine.querySelector('[data-demo-envoi]');
      this.bulleIA = racine.querySelector('[data-demo-bulle-ia]');
      this.points = racine.querySelector('[data-demo-points]');
      this.sources = racine.querySelector('[data-demo-sources]');
      this.horloge = new Horloge();

      this.tourUtilisateur = racine.querySelector('.assistant-tour-utilisateur');
      this.tourIA = racine.querySelector('.assistant-tour-ia');
      this.rangeeCartes = racine.querySelector('.assistant-sources-rangee');
      this.cartes = [...racine.querySelectorAll('.assistant-carte')];
      this.cartes.forEach((carte, i) => carte.style.setProperty('--i', String(i)));

      // La question servie par Astro, relevée une fois : c'est elle qu'on tape,
      // jamais une autre.
      this.question = racine.querySelector('.assistant-bulle-utilisateur')?.textContent ?? '';
    }

    lancer() {
      if (!this.question || this.tours() === 0) return;
      this._mettreAJourHeure();
      this._surveillerVisibilite();

      this.racine.setAttribute('data-demo-pret', '');
      this.horloge.demarrer();
      this._boucle().catch((err) => {
        if (err !== INTERRUPTION) throw err;
      });
    }

    tours() {
      return this.tourUtilisateur && this.tourIA ? 1 : 0;
    }

    /* ---------- chorégraphie ---------- */

    async _boucle() {
      for (;;) {
        this._reinitialiser();
        this._mettreAJourHeure();
        await this.horloge.patienter(REGLAGES.attente.debut);

        await this._frapperQuestion();

        // « Envoi » : le champ se vide, la bulle rejoint le fil.
        this.envoi?.setAttribute('data-demo-presse', '');
        this.frappeNoeud.textContent = '';
        this.curseur.style.display = 'none';
        this.placeholder.style.display = '';
        await this.horloge.patienter(REGLAGES.attente.apresEnvoi);
        this.envoi?.removeAttribute('data-demo-presse');

        this.tourUtilisateur.classList.add('is-in');
        this._suivreLeBas();
        await this.horloge.patienter(REGLAGES.attente.apresUtilisateur);

        this.tourIA.classList.add('is-in');
        this._suivreLeBas();

        // Les trois points d'attente — le comportement réel de l'application
        // le temps qu'une réponse arrive.
        await this.horloge.patienter(REGLAGES.attente.reflexion);

        // Aucune réponse n'est capturée pour cette démonstration : la bulle
        // d'attente s'efface au moment où les sources arrivent, plutôt que de
        // laisser trois points tourner sur un tour de parole terminé.
        this.bulleIA.setAttribute('data-demo-vide', '');

        this.sources.classList.add('is-in');
        this._suivreLeBas();
        await this.horloge.patienter(
          REGLAGES.attente.sourcesVersCarrousel + this.cartes.length * 160,
        );

        // On pousse le rail d'un demi-cran : le visiteur voit qu'il y a
        // d'autres cartes derrière la première.
        if (this.cartes.length > 1 && this.rangeeCartes) {
          this.rangeeCartes.scrollTo({
            left: Math.round(this.rangeeCartes.clientWidth * 0.42),
            behavior: 'smooth',
          });
          await this.horloge.patienter(REGLAGES.attente.carrousel);
        }

        await this.horloge.patienter(REGLAGES.attente.lecture);
        this.fil.classList.add('assistant-fil-sortante');
        await this.horloge.patienter(REGLAGES.attente.sortie);
      }
    }

    /* ---------- primitives ---------- */

    _reinitialiser() {
      this.tourUtilisateur.classList.remove('is-in');
      this.tourIA.classList.remove('is-in');
      this.sources.classList.remove('is-in');
      this.bulleIA.removeAttribute('data-demo-vide');
      this.fil.classList.remove('assistant-fil-sortante');
      this.frappeNoeud.textContent = '';
      this.curseur.style.display = 'none';
      this.placeholder.style.display = '';
      if (this.rangeeCartes) this.rangeeCartes.scrollLeft = 0;
      this.fil.scrollTop = 0;
    }

    async _frapperQuestion() {
      this.placeholder.style.display = 'none';
      this.curseur.style.display = '';
      const { base, variation, tous } = REGLAGES.frappe;
      for (let i = 1; i <= this.question.length; i += 1) {
        this.frappeNoeud.textContent = this.question.slice(0, i);
        await this.horloge.patienter(i % tous === 0 ? variation : base);
      }
      await this.horloge.patienter(REGLAGES.attente.apresFrappe);
    }

    _suivreLeBas() {
      this.fil.scrollTop = this.fil.scrollHeight;
    }

    _mettreAJourHeure() {
      if (!this.heure) return;
      const t = new Date();
      this.heure.textContent = `${t.getHours()}:${String(t.getMinutes()).padStart(2, '0')}`;
    }

    _surveillerVisibilite() {
      const actualiser = () => {
        this.horloge.enPause = document.hidden || this.horsEcran === true;
      };
      document.addEventListener('visibilitychange', actualiser);
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(
          ([entree]) => {
            this.horsEcran = !entree.isIntersecting;
            actualiser();
          },
          { threshold: 0.2 },
        ).observe(this.racine);
      }
    }
  }

  const mouvementRefuse =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (mouvementRefuse) return;

  for (const racine of document.querySelectorAll('[data-demo]')) {
    new Demo(racine).lancer();
  }
})();
