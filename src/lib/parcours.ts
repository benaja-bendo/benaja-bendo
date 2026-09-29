/**
 * Expériences, projets et formation — source unique.
 *
 * Ces données étaient écrites en dur dans `src/pages/parcours.astro`. Elles sont
 * maintenant partagées avec `/cv`, et c'est tout l'intérêt : deux surfaces qui
 * récitent un CV de mémoire finissent toujours par diverger d'une date. Ici, un
 * fait corrigé une fois est corrigé partout. C'est la règle de contenu n°2
 * appliquée à l'intérieur du site.
 *
 * Les `points` servent au CV uniquement : la page Parcours n'en a pas besoin
 * — elle raconte — mais un CV sans détail de mission ne sert à personne. Chaque
 * point est repris du CV de septembre 2026, des études de cas publiées
 * (src/content/etudes) ou des dépôts publics de Mibeko, jamais inventé pour
 * meubler.
 *
 * Depuis le 23/09/2026, chaque point porte un `id` stable : les profils de CV
 * (src/lib/cv-profils.ts) le citent pour le remonter, le masquer ou l'ordonner
 * — sans jamais recopier ni reformuler son texte. Renommer un `id` casse le
 * build tant qu'un profil le cite encore : c'est voulu.
 */

export interface Point {
  /** Identifiant stable, cité par les profils de CV. */
  id: string;
  texte: string;
}

export interface Etape {
  /** Identifiant stable, pour les ancres et les profils. */
  id: string;
  /** Période affichée. Format libre mais homogène : « 2023–2026 ». */
  quand: string;
  /** Intitulé du poste ou du diplôme. */
  quoi: string;
  /** Employeur ou école, lieu, statut. */
  ou: string;
  /** Détail de mission, pour le CV uniquement. */
  points?: Point[];
  /**
   * Pages de preuve affichées sous l'intitulé, sur le CV : le lecteur clique
   * et arrive sur la rubrique qui montre ce travail. URL absolues, pour que le
   * PDF exporté garde des liens valides. Ajouté le 24/09/2026.
   */
  liens?: LienCV[];
}

/** Un lien de preuve affiché sur le CV : le lecteur doit pouvoir vérifier. */
export interface LienCV {
  label: string;
  url: string;
}

export interface Projet extends Etape {
  points: Point[];
  /** Produit en ligne, fiches des stores, étude de cas : ce qui se vérifie. */
  liens: LienCV[];
}

export const EXPERIENCES: Etape[] = [
  {
    id: 'capgemini',
    quand: '2023–2026',
    quoi: 'Développeur fullstack chez Capgemini',
    ou: 'Bordeaux · stage puis alternance · AIFE, puis compte France Travail',
    points: [
      {
        id: 'ft-refonte',
        texte:
          'Compte France Travail (2024–2026) : refonte de deux applications fragiles en un service Java / Spring Boot unique, déployé sur OpenShift (Kubernetes) et Docker. Cycle de collecte des prévisions ramené d’environ 10 jours à 48 heures pour plus de 400 collaborateurs, avec relances automatisées et imputations consultables en continu.',
      },
      {
        id: 'ft-pilotage',
        texte:
          'Un seul outil, pilotable en ligne de commande : relances, envoi de mails et API REST se lancent séparément, ce qui a supprimé les traitements manuels du cycle.',
      },
      {
        id: 'ft-decisionnel',
        texte:
          'Conception de A à Z des tableaux de bord Power BI (Power Query / M, Power Automate) utilisés au quotidien par les engagement managers : prévisions consolidées, relances, suivi d’activité et de facturation.',
      },
      {
        id: 'aife-microservices',
        texte:
          'AIFE, finances publiques (2023–2024) : développement de microservices Java / Spring Boot (API REST, SQL, tests unitaires JUnit) dans une équipe backend de 10 personnes, avec la méthode agile SAFe : PI planning, estimations, revues de code, démonstrations client.',
      },
      {
        id: 'aviation-ia-aws',
        texte:
          'Aviation, projet agile en équipe de 8 : conception d’un outil de traitement de gros volumes de documents PDF avec recherche assistée par IA, sur AWS (Python, Lambda, S3, PostgreSQL).',
      },
    ],
    // La page AIFE couvre aussi le projet aviation (même période, même
    // client Capgemini) : deux liens suffisent pour les cinq points.
    liens: [
      { label: 'Réalisation France Travail', url: 'https://benaja-bendo.fr/realisations/france-travail-collecte' },
      { label: 'Réalisation AIFE', url: 'https://benaja-bendo.fr/realisations/aife-microservices' },
    ],
  },
  {
    id: 'kabimgroup',
    quand: '2021–2023',
    quoi: 'Développeur web et mobile chez KabimGroup (startup)',
    ou: 'Pointe-Noire, Congo · salarié',
    // Revu le 30/09/2026 avec Bénaja : fin 2021 à février 2023, surtout un
    // parseur de CV en Node.js et Laravel. Flutter, C# / .NET et Xamarin
    // étaient attribués à tort à ce poste : C# / .NET et Xamarin sont chez
    // InfraOne, Flutter sur bgrfacile.
    points: [
      {
        id: 'kabim-parseur',
        texte:
          'Parseur de CV en Node.js et Laravel, avec son API REST : lire un CV automatiquement (OCR) et en extraire les informations utiles. Beaucoup de R&D, avant l’arrivée des IA génératives.',
      },
      {
        id: 'kabim-relation-client',
        texte:
          'Relation client directe : recueil du besoin, cahiers des charges, animation des réunions.',
      },
    ],
    // Une seule rangée pour les deux expériences au Congo : elles mènent à la
    // même page, et une seconde rangée faisait passer le CV à trois pages.
    liens: [
      { label: 'Réalisation : InfraOne System et KabimGroup', url: 'https://benaja-bendo.fr/realisations/congo-web-mobile' },
    ],
  },
  {
    id: 'infraone',
    quand: '2020–2021',
    quoi: 'Développeur fullstack chez InfraOne System',
    ou: 'Pointe-Noire, Congo · salarié',
    // Revu le 30/09/2026 avec Bénaja. InfraChecking remplace « sites
    // d'entreprise en ASP.NET Core pour des sous-traitants de Total » : même
    // client, décrit cette fois par le projet lui-même. C# / .NET est cité
    // ici : c'est une expérience réelle, pas la spécialité mise en avant
    // (décision du 23/09/2026).
    points: [
      {
        id: 'infraone-logiciels-metier',
        texte:
          'Développement en équipe, surtout en C# / .NET Core, sur des applications très variées, du recueil du besoin aux corrections en production.',
      },
      {
        id: 'infraone-infrachecking',
        texte:
          'InfraChecking : une application mobile pour que les sous-traitants de Total E&P Congo badgent leurs arrivées et leurs départs plus simplement (back-end .NET et Laravel).',
      },
      {
        id: 'infraone-nyota',
        texte:
          'Nyota IT : projet d’appli de commande de repas, un peu comme Uber Eats (Xamarin, Laravel, Angular).',
      },
    ],
  },
];

/**
 * Les projets menés hors contrat de travail, rendus sur le CV sous
 * « Projets en production ». Ils vivaient en dur dans cv.astro, en
 * contradiction avec la règle écrite en tête de cette même page.
 *
 * Les points Mibeko décrivant la livraison, les tests, l'IA et la mesure
 * d'audience ont été vérifiés le 23/09/2026 dans les six dépôts publics :
 * workflows GitHub Actions, rôles Ansible de `vps_infra`, `app/Ai` et
 * `app/Mcp` de `mibeko-dashboard`, tickets GitHub. Aucun ne décrit une
 * intention : chacun renvoie à du code consultable.
 */
export const PROJETS: Projet[] = [
  {
    id: 'mibeko',
    quand: 'Depuis déc. 2025',
    quoi: 'Mibeko : un SaaS juridique (LegalTech) que j’ai créé, de l’idée à la production',
    ou: 'Applications iOS et Android publiées · six dépôts publics',
    liens: [
      { label: 'mibeko.fr', url: 'https://mibeko.fr' },
      { label: 'App Store', url: 'https://apps.apple.com/app/id6768865781' },
      {
        label: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=cg.mibeko.app',
      },
      { label: 'Code et détails', url: 'https://benaja-bendo.fr/realisations/mibeko' },
    ],
    points: [
      {
        id: 'mibeko-assistant',
        texte:
          'Un assistant qui répond aux questions de droit congolais et OHADA posées avec ses propres mots, en citant l’article exact d’où vient chaque réponse.',
      },
      {
        id: 'mibeko-stack',
        texte:
          'Stack : API Laravel / PostgreSQL, traitement des documents en Python / FastAPI, tableau de bord React / TypeScript, site public Astro, applications mobiles Kotlin Multiplatform.',
      },
      {
        id: 'mibeko-ingestion',
        texte:
          'Traitement des documents : lecture des PDF scannés (OCR), mise en forme par un modèle de langage contrôlé par un schéma strict, origine de chaque texte gardée jusqu’au fichier source.',
      },
      {
        id: 'mibeko-recherche',
        texte:
          'Recherche hybride PostgreSQL / pgvector : mots exacts, fautes de frappe proches et sens de la question, pour trouver le bon article sans connaître les termes de la loi.',
      },
      {
        id: 'mibeko-production',
        texte:
          'Mise en production et exploitation : chaque modification est testée automatiquement avant sa mise en ligne (CI/CD GitHub Actions) ; serveur administré avec Docker, Ansible et Traefik.',
      },
      {
        id: 'mibeko-livraison-web',
        texte:
          'Mise en ligne du web : à chaque modification, les tests tournent ; s’ils passent, GitHub Actions construit une image Docker et la déploie sur un serveur configuré en Ansible (Traefik, PostgreSQL / pgvector, MinIO, sauvegardes).',
      },
      {
        id: 'mibeko-livraison-mobile',
        texte:
          'Mise en ligne mobile : compilation et tests à chaque modification, versions d’essai pour les testeurs (Firebase App Distribution, TestFlight), publication sur Google Play à chaque version validée.',
      },
      {
        id: 'mibeko-tests',
        texte:
          'Tests unitaires (une fonction seule) et d’intégration (plusieurs briques ensemble, vraie base PostgreSQL) : Pest, Vitest et Kotlin lancés à chaque modification, plus pytest.',
      },
      {
        id: 'mibeko-ia-agentique',
        texte:
          'IA agentique encadrée : un agent IA cherche lui-même les articles utiles, et un serveur MCP (accès standard pour assistants IA) permet de chercher, lire ou signaler une anomalie, qu’un humain corrige.',
      },
      {
        id: 'mibeko-organisation',
        texte:
          'Organisation : chaque tâche est un ticket GitHub (plus de 250), relié au code qui la traite. Assistants de code IA (Claude Code, OpenCode) encadrés par des règles écrites dans chaque dépôt.',
      },
      {
        id: 'mibeko-mesure',
        texte:
          'Mesure d’audience avec Umami, hébergé sur mon serveur et sans cookies. Journaux des services consultables avec Dozzle.',
      },
    ],
  },
  {
    // Présenté avec l'accord du fondeur (24/09/2026). Aucun statut n'est
    // écrit : la rubrique « Projets en production » dit déjà qu'il ne s'agit
    // pas d'un contrat de travail. Faits vérifiés dans les dépôts le même
    // jour : 189 tests Jest et 15 tests Vitest, déploiement GitHub Actions
    // (tests, image Docker, VPS), premier déploiement en novembre 2025.
    id: 'la-grenaille',
    quand: 'Depuis nov. 2025',
    quoi: 'La Grenaille : le site et l’espace pro d’une fonderie de bijoux',
    ou: 'Réalisé en direct avec le fondeur · en production',
    liens: [
      { label: 'lagrenaille.fr', url: 'https://lagrenaille.fr' },
      { label: 'Réalisation', url: 'https://benaja-bendo.fr/realisations/la-grenaille' },
    ],
    points: [
      {
        id: 'grenaille-solution',
        texte:
          'Site public et espace professionnel pour les bijoutiers : suivi du métal précieux confié à la fonderie (solde en grammes par métal), commandes, factures et modèles 3D.',
      },
      {
        id: 'grenaille-stack',
        texte:
          'Front React / TypeScript, API NestJS (Node.js) avec Prisma et PostgreSQL ; tests automatisés (Jest, Vitest) avant chaque mise en ligne, faite par GitHub Actions et Docker.',
      },
      {
        id: 'grenaille-client',
        texte:
          'Travail en direct avec le fondeur : recueil du besoin, retours testés puis traités par lots, évolutions livrées en continu.',
      },
    ],
  },
  {
    id: 'trouve-ton-profil',
    quand: 'Depuis 2026',
    quoi: 'Trouve Ton Profil : trouver le bon professionnel près de chez soi, au Congo',
    ou: 'Collaborateur technique, développeur fullstack · fondateur et lead dev : Styve Lioumba',
    liens: [{ label: 'trouve-ton-profil.com', url: 'https://trouve-ton-profil.com' }],
    points: [
      // Décrit d'après le site lui-même (lu le 23/09/2026) : sa mission, son
      // fonctionnement, et la page « L'équipe » qui me présente comme
      // collaborateur technique, développeur fullstack.
      {
        id: 'ttp-solution',
        texte:
          'Une plateforme gratuite pour trouver un professionnel en République du Congo, du bâtiment à la formation. Chacun y crée son profil pour être trouvé, avec une idée simple : rendre visibles des savoir-faire qui ne passent pas forcément par un diplôme.',
      },
      {
        id: 'ttp-contribution',
        texte:
          'Développement en Angular / TypeScript ; le fondateur pilote le produit et l’architecture.',
      },
    ],
  },
];

export const FORMATION: Etape[] = [
  {
    id: 'epsi-expert',
    quand: '2024–2026',
    // L'intitulé humain d'abord, la référence administrative ensuite, le statut
    // daté en dernier : « Bac+5 » à côté d'une période « 2024–2026 » sans
    // mention se lisait comme inachevé.
    quoi: 'Expert en informatique, Bac+5 (titre RNCP niveau 7)',
    ou: 'EPSI Bordeaux · obtenu en 2026',
  },
  {
    // Corrigé le 30/09/2026 : commencé le 1er septembre 2023 (et non en
    // 2022), après la fin de KabimGroup en février 2023. L'ancienne période
    // faisait chevaucher le Bachelor à Bordeaux et le poste à Pointe-Noire.
    id: 'epsi-bachelor',
    quand: '2023–2024',
    quoi: 'Bachelor Concepteur Développeur d’Applications',
    ou: 'EPSI Bordeaux · obtenu en 2024',
  },
  // Yekolab figurait dans les expériences, sous « Reconversion vers le
  // développement ». C'était une formation : placée ici, elle comble aussi le
  // creux apparent entre la licence (2019) et les premiers postes (2020),
  // relevé à la relecture du CV le 23/09/2026.
  {
    id: 'yekolab',
    quand: '2019–2020',
    quoi: 'Formation en développement mobile',
    ou: 'Yekolab, Pointe-Noire · incubateur & promotion des TIC',
  },
  {
    id: 'licence-gsi',
    quand: '2016–2019',
    quoi: 'Licence Génie des systèmes industriels, spécialité maintenance',
    ou: 'Institut International (2i), Pointe-Noire',
  },
];

/* -----------------------------------------------------------------------------
 * Faits d'état civil professionnel, cités par plusieurs pages.
 * -------------------------------------------------------------------------- */

export const DISPONIBILITE = {
  /**
   * LA phrase de disponibilité, affichée telle quelle. Jusqu'au 30/09/2026,
   * le site affichait une date (« à partir du 28 septembre 2026 ») : une
   * fois passée, elle faisait vieillir chaque page. « Dès maintenant » reste
   * vrai jusqu'à la signature ; ce jour-là, on change cette ligne et elle
   * seule (puis le README et LinkedIn).
   *
   * Volontairement affichée à quatre endroits seulement : pied de page, haut
   * de l'accueil et contact (composant Disponibilite.astro), en-tête du CV.
   * Voir docs/13-refonte-contenu.md §1.
   */
  texte: 'Disponible dès maintenant pour un CDI',
  lieu: 'Bordeaux et ses alentours',
  // Des villes nommées plutôt que « France entière » (24/09/2026) : une liste
  // courte se lit comme un choix réel, et un recruteur qui cherche par ville
  // la trouve. La raison de ces villes (des proches sur place) ne s'écrit pas.
  mobilite:
    'Bordeaux et ses alentours · ouvert à Toulouse, Nantes, l’Île-de-France et Strasbourg · télétravail complet ou partiel',
} as const;

export const LANGUES = [
  'Français : langue maternelle',
  'Anglais : professionnel (réunions, échanges clients, documentation technique)',
] as const;

export const CONTACT = {
  email: 'contact@benaja-bendo.fr',
  site: 'benaja-bendo.fr',
  github: 'github.com/benaja-bendo',
  linkedin: 'linkedin.com/in/benaja-bendo',
} as const;
