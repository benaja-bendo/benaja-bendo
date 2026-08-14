/**
 * Expériences et formation — source unique.
 *
 * Ces données étaient écrites en dur dans `src/pages/parcours.astro`. Elles sont
 * maintenant partagées avec `/cv`, et c'est tout l'intérêt : deux surfaces qui
 * récitent un CV de mémoire finissent toujours par diverger d'une date. Ici, un
 * fait corrigé une fois est corrigé partout. C'est la règle de contenu n°2
 * appliquée à l'intérieur du site.
 *
 * Les `points` sont la seule nouveauté : la page Parcours n'en avait pas besoin
 * — elle raconte — mais un CV sans détail de mission ne sert à personne. Chaque
 * point est repris des études de cas déjà publiées (src/content/etudes), jamais
 * inventé pour meubler. Si un fait n'est pas dans une étude, il n'entre pas ici.
 */

export interface Etape {
  /** Période affichée. Format libre mais homogène : « 2023 – 2026 ». */
  quand: string;
  /** Intitulé du poste ou du diplôme. */
  quoi: string;
  /** Employeur ou école, lieu, statut. */
  ou: string;
  /** Détail de mission, pour le CV uniquement. */
  points?: string[];
  /** Étude de cas correspondante, si elle existe. */
  etude?: string;
}

export const EXPERIENCES: Etape[] = [
  {
    quand: '2023–2026',
    quoi: 'Développeur fullstack — Capgemini',
    ou: 'Bordeaux · stage puis alternance · AIFE, puis compte France Travail',
    points: [
      'Compte France Travail (2024–2026) : refonte de deux applications fragiles en un service Java / Spring Boot unique, déployé sur OpenShift et Docker — la collecte des prévisions de plus de 400 collaborateurs passe de plusieurs semaines de relances manuelles à un cycle automatisé.',
      'Conception de A à Z des tableaux de bord Power BI (Power Query / M, Power Automate) utilisés au quotidien par les engagement managers : prévisions consolidées, relances, suivi d’activité et de facturation.',
      'AIFE, finances publiques (2023–2024) : microservices Java / Spring Boot dans une équipe backend de 10 personnes, en agilité à l’échelle — PI planning, estimations, revues de code, démonstrations client.',
      'Contribution à un projet cloud AWS (Python, Lambda, S3, PostgreSQL) au sein d’une équipe de 8.',
    ],
    etude: 'france-travail',
  },
  {
    quand: '2021–2023',
    quoi: 'Développeur web & mobile, en freelance',
    ou: 'Pointe-Noire, Congo · clients directs',
    points: [
      'Applications mobiles Flutter et API Laravel / Node.js livrées à des clients réels, du recueil du besoin à la mise en production.',
    ],
  },
  {
    quand: '2020–2021',
    quoi: 'Développeur fullstack — InfraOne System',
    ou: 'Pointe-Noire, Congo · salarié',
    points: [
      'Développement de logiciels métier en équipe, première expérience salariée après une reconversion depuis la maintenance industrielle.',
    ],
  },
];

export const FORMATION: Etape[] = [
  {
    quand: '2024–2026',
    // L'intitulé humain d'abord, la référence administrative ensuite, le statut
    // daté en dernier : « Bac+5 » à côté d'une période « 2024–2026 » sans
    // mention se lisait comme inachevé.
    quoi: 'Expert en informatique — Bac+5 (titre RNCP niveau 7)',
    ou: 'EPSI Bordeaux · en attente de soutenance',
  },
  {
    quand: '2022–2023',
    quoi: 'Bachelor Concepteur Développeur d’Applications',
    ou: 'EPSI Bordeaux · obtenu en septembre 2023',
  },
  {
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
} as const;

export const CONTACT = {
  email: 'contact@benaja-bendo.fr',
  site: 'benaja-bendo.fr',
  github: 'github.com/benaja-bendo',
  linkedin: 'linkedin.com/in/benaja-bendo',
} as const;
