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
  /** Étude de cas correspondante, si elle existe. */
  etude?: string;
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
    quoi: 'Développeur fullstack — Capgemini',
    ou: 'Bordeaux · stage puis alternance · AIFE, puis compte France Travail',
    points: [
      {
        id: 'ft-refonte',
        texte:
          'Compte France Travail (2024–2026) : refonte de deux applications fragiles en un service Java / Spring Boot unique, déployé sur OpenShift et Docker. Cycle de collecte des prévisions ramené d’environ 10 jours à 48 heures pour plus de 400 collaborateurs, avec relances automatisées et imputations consultables en continu.',
      },
      {
        id: 'ft-pilotage',
        texte:
          'Livrable unique architecturé pour être piloté en ligne de commande : relances, envoi de mails et exposition d’API REST appelables indépendamment, suppression des traitements manuels du cycle.',
      },
      {
        id: 'ft-decisionnel',
        texte:
          'Conception de A à Z des tableaux de bord Power BI (Power Query / M, Power Automate) utilisés au quotidien par les engagement managers : prévisions consolidées, relances, suivi d’activité et de facturation.',
      },
      {
        id: 'aife-microservices',
        texte:
          'AIFE, finances publiques (2023–2024) : développement de microservices Java / Spring Boot (API REST, SQL, tests unitaires JUnit) dans une équipe backend de 10 personnes, en SAFe — PI planning, estimations, revues de code, démonstrations client.',
      },
      {
        id: 'aviation-ia-aws',
        texte:
          'Aviation, projet agile en équipe de 8 : conception d’un outil de traitement de gros volumes de documents PDF avec recherche assistée par IA, sur AWS (Python, Lambda, S3, PostgreSQL).',
      },
    ],
    etude: 'france-travail',
  },
  {
    id: 'kabimgroup',
    quand: '2021–2023',
    quoi: 'Développeur web & mobile — KabimGroup (startup)',
    ou: 'Pointe-Noire, Congo · salarié',
    points: [
      // C# / .NET est cité ici, et en dernier : c'est une expérience réelle,
      // pas la spécialité mise en avant (décision du 23/09/2026).
      {
        id: 'kabim-livraisons',
        texte:
          'Applications web et mobiles livrées en production — Laravel, Flutter, Node.js et C# / .NET — avec conception et intégration d’API REST.',
      },
      {
        id: 'kabim-ocr',
        texte:
          'Parseurs documentaires avec OCR : extraction et structuration de données issues de documents clients.',
      },
      {
        id: 'kabim-relation-client',
        texte:
          'Relation client directe : recueil du besoin, rédaction des cahiers des charges, animation des réunions.',
      },
    ],
  },
  {
    id: 'infraone',
    quand: '2020–2021',
    quoi: 'Développeur fullstack — InfraOne System',
    ou: 'Pointe-Noire, Congo · salarié',
    points: [
      {
        id: 'infraone-logiciels-metier',
        texte:
          'Développement de logiciels métier en équipe, sur l’ensemble du cycle : recueil du besoin, développement, livraison et corrections en production.',
      },
      {
        id: 'infraone-sites',
        texte:
          'Conception de sites d’entreprise en C# / ASP.NET Core pour des entreprises sous-traitantes de Total E&P Congo.',
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
    quoi: 'Mibeko — SaaS LegalTech, conçu et opéré seul',
    ou: 'Applications iOS et Android publiées · six dépôts publics',
    liens: [
      { label: 'mibeko.fr', url: 'https://mibeko.fr' },
      { label: 'App Store', url: 'https://apps.apple.com/app/id6768865781' },
      {
        label: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=cg.mibeko.app',
      },
      { label: 'Code et étude de cas', url: 'https://benaja-bendo.fr/etudes/mibeko' },
    ],
    points: [
      {
        id: 'mibeko-assistant',
        texte:
          'Un assistant qui rend le droit congolais et OHADA consultable en langage naturel, en citant l’article exact d’où vient chaque réponse — la traçabilité prime sur la formulation.',
      },
      {
        id: 'mibeko-stack',
        texte:
          'Stack : API Laravel / PostgreSQL, ingestion Python / FastAPI, tableau de bord React / TypeScript, portail Astro, applications mobiles Kotlin Multiplatform.',
      },
      {
        id: 'mibeko-ingestion',
        texte:
          'Chaîne d’ingestion documentaire : OCR, structuration par modèle de langage validée par un schéma strict, provenance conservée jusqu’à l’empreinte SHA-256 du fichier source.',
      },
      {
        id: 'mibeko-recherche',
        texte:
          'Recherche hybride PostgreSQL / pgvector combinant plein texte, proximité orthographique et similarité sémantique.',
      },
      {
        id: 'mibeko-production',
        texte:
          'Mise en production et exploitation : ~730 tests unitaires et d’intégration, CI/CD GitHub Actions, déploiement continu sur un VPS administré avec Docker, Ansible et Traefik.',
      },
      {
        id: 'mibeko-livraison-web',
        texte:
          'Livraison web : tests à chaque push et pull request, puis image Docker publiée sur GHCR et déployée par GitHub Actions sur un VPS décrit en Ansible (Traefik, PostgreSQL / pgvector, MinIO, sauvegardes du fonds).',
      },
      {
        id: 'mibeko-livraison-mobile',
        texte:
          'Livraison mobile : build et tests à chaque push, versions de test distribuées par Firebase App Distribution et TestFlight, publication sur Google Play déclenchée par un tag de version.',
      },
      {
        id: 'mibeko-tests',
        texte:
          'Tests unitaires et d’intégration : Pest contre une vraie base PostgreSQL / pgvector, Vitest et tests Kotlin exécutés en CI ; pytest sur la chaîne d’ingestion.',
      },
      {
        id: 'mibeko-ia-agentique',
        texte:
          'IA agentique encadrée : un agent interroge le fonds par appels d’outils, et un serveur MCP expose recherche, lecture d’article et détection d’anomalies — des outils qui signalent sans jamais modifier le corpus : chaque correction est publiée par un humain.',
      },
      {
        id: 'mibeko-organisation',
        texte:
          'Organisation : plus de 250 tickets GitHub Issues reliés aux pull requests ; agents de code (Claude Code, OpenCode) cadrés par des consignes versionnées dans chaque dépôt.',
      },
      {
        id: 'mibeko-mesure',
        texte:
          'Mesure d’audience Umami auto-hébergée et sans cookies ; journaux des conteneurs consultables avec Dozzle.',
      },
    ],
  },
  {
    id: 'trouve-ton-profil',
    quand: 'Depuis 2026',
    quoi: 'Trouve Ton Profil — plateforme Angular de mise en relation professionnelle',
    ou: 'Collaborateur technique · fondateur & lead dev : Styve Lioumba',
    liens: [{ label: 'trouve-ton-profil.com', url: 'https://trouve-ton-profil.com' }],
    points: [
      {
        id: 'ttp-contribution',
        texte:
          'Plateforme congolaise de mise en relation entre particuliers et professionnels locaux (authentification, gestion de profils, navigation par secteur d’activité) — contribution technique en Angular / TypeScript aux côtés du fondateur, qui porte la conception produit et l’architecture.',
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
    quoi: 'Expert en informatique — Bac+5 (titre RNCP niveau 7)',
    ou: 'EPSI Bordeaux · en attente de soutenance',
  },
  {
    id: 'epsi-bachelor',
    quand: '2022–2023',
    quoi: 'Bachelor Concepteur Développeur d’Applications',
    ou: 'EPSI Bordeaux · obtenu en septembre 2023',
  },
  // Yekolab figurait dans les expériences, sous « Reconversion vers le
  // développement ». C'était une formation : placée ici, elle comble aussi le
  // creux apparent entre la licence (2019) et le bachelor (2022), relevé à la
  // relecture du CV le 23/09/2026.
  {
    id: 'yekolab',
    quand: '2019–2020',
    quoi: 'Formation en développement mobile',
    ou: 'Yekolab, Pointe-Noire · incubateur & promotion des TIC',
  },
  {
    id: 'licence-gsi',
    quand: '2016–2019',
    quoi: 'Licence Génie des systèmes industriels — spécialité maintenance',
    ou: 'Institut International (2i), Pointe-Noire',
  },
];

/* -----------------------------------------------------------------------------
 * Faits d'état civil professionnel, cités par plusieurs pages.
 * -------------------------------------------------------------------------- */

export const DISPONIBILITE = {
  /** Date de disponibilité CDI, en clair et en ISO. */
  texte: '28 septembre 2026',
  iso: '2026-09-28',
  lieu: 'Bordeaux / Mérignac (33)',
  mobilite: 'Bordeaux / Mérignac (33) · mobile Paris et France entière · hybride · déplacements ponctuels',
} as const;

export const LANGUES = [
  'Français — langue maternelle',
  'Anglais — professionnel (réunions, échanges clients, documentation technique)',
] as const;

export const CONTACT = {
  email: 'contact@benaja-bendo.fr',
  site: 'benaja-bendo.fr',
  github: 'github.com/benaja-bendo',
  linkedin: 'linkedin.com/in/benaja-bendo',
} as const;
