/**
 * Les profils de CV — une version par type d'offre, jamais par entreprise.
 *
 * Le problème réglé (23/09/2026) : des offres aux stacks différentes, un seul
 * CV. Une « version .NET » avait été envoyée qui n'était que le CV général sous
 * un autre nom de fichier. Chaque profil est une page statique complète,
 * générée au build par src/pages/cv/[...profil].astro :
 *
 *   /cv              le CV général — indexé, lié depuis la navigation
 *   /cv/<slug>       une variante — `noindex`, hors sitemap, liée de nulle part :
 *                    elle n'existe que pour le lien envoyé avec une candidature
 *
 * LA règle : un profil choisit et ordonne, il n'écrit jamais un fait. Les
 * dates, intitulés, employeurs, chiffres et le texte de chaque point vivent
 * dans src/lib/parcours.ts, et ce type n'a AUCUN champ pour les modifier. La
 * seule prose propre à un profil est son accroche.
 *
 * Contrôles exécutés à chaque build par `resoudreProfil()` — une erreur arrête
 * le build (`astro build` ne vérifie pas les types, d'où ces contrôles-ci) :
 *  - tout identifiant cité (point, projet, groupe de stack) existe ;
 *  - toute techno de l'en-tête existe dans stack.ts ET se lit en toutes
 *    lettres dans un point affiché par CETTE version : pas de techno en
 *    vitrine sans preuve sur la même page ;
 *  - l'accroche ne contient pas d'autre balise que <strong> ;
 *  - quatre profils au plus. Au-delà, chaque variante devient une dette
 *    éditoriale de plus à tenir juste (invariant n°5).
 *
 * ⚠️ Ce dépôt est public (c'est le profil GitHub) : ce fichier aussi. Aucun
 * nom d'entreprise visée, aucune note de stratégie de candidature ici — une
 * URL non indexée n'est pas une URL privée.
 *
 * Mode d'emploi complet : docs/12-cv-par-profil.md.
 */
import { DISPONIBILITE, EXPERIENCES, PROJETS, type Etape, type Point, type Projet } from './parcours';
import { STACK, nomsTechnos, stackOrdonnee, type GroupeStack } from './stack';

export interface ProfilCV {
  /** Segment d'URL : /cv/<slug>. Absent = le CV général, servi sur /cv. */
  slug?: string;
  /** Intitulé sous le nom. */
  role: string;
  /**
   * La ligne de stack sous l'intitulé. Chaque sous-liste est jointe par « / »,
   * les sous-listes par « · ». Ces mêmes technos passent en tête de leur
   * groupe et sont mises en évidence dans « Compétences techniques » : ce que
   * l'en-tête annonce, la stack le montre en premier.
   */
  enTete: string[][];
  /** L'accroche : seule prose propre au profil. Seule balise admise : <strong>. */
  accroche: string;
  /** Les projets passent avant l'expérience salariée. */
  projetsEnPremier?: boolean;
  /** Points remontés en tête de LEUR expérience ou projet, dans cet ordre. */
  prioritaires?: string[];
  /** Points retirés de cette version — pertinence, ou tenue en deux pages. */
  masques?: string[];
  /** Ordre des projets (identifiants de PROJETS). Absent = ordre naturel. */
  projets?: string[];
  /** Groupes de stack à placer en tête (titres de stack.ts). */
  groupesStack?: string[];
  /** <title> de la page — repris par l'aperçu de lien. */
  titre: string;
  description: string;
  /**
   * Nom de fichier proposé par « Enregistrer au format PDF », posé par
   * public/js/cv.js le temps de l'impression. ASCII, sans espace : Chrome
   * remplace tout le reste par des tirets bas.
   */
  nomImpression: string;
}

const dispo = `Disponible en CDI à partir du ${DISPONIBILITE.texte}.`;

export const PROFILS: ProfilCV[] = [
  {
    // Le CV général : toutes les compétences, sans accent particulier.
    role: 'Développeur fullstack confirmé',
    enTete: [['Java', 'Spring Boot'], ['React', 'TypeScript'], ['Python'], ['Docker']],
    accroche:
      'Développeur fullstack confirmé avec 6 ans d’expérience, je conçois, fiabilise et <strong>opère</strong> des applications métier, du besoin à la production. Chez Capgemini, j’ai automatisé un processus concernant plus de 400 collaborateurs. En parallèle, je porte seul <strong>Mibeko</strong>, un SaaS juridique publié sur iOS et Android, dont je gère tout : l’API, le traitement des documents, la mise en ligne automatique et les serveurs.',
    masques: [
      'mibeko-livraison-web',
      'mibeko-livraison-mobile',
      'mibeko-tests',
      'mibeko-organisation',
      'mibeko-mesure',
    ],
    titre: 'CV de Bénaja Bendo-Matondo, développeur fullstack confirmé',
    description: `CV de Bénaja Bendo-Matondo, développeur fullstack confirmé avec 6 ans d’expérience. Java / Spring Boot · React / TypeScript · Python · Docker. ${dispo}`,
    nomImpression: 'CV-Benaja-Bendo-Matondo-Developpeur-Fullstack',
  },
  {
    slug: 'java-spring',
    role: 'Développeur fullstack confirmé, spécialisé Java / Spring Boot',
    enTete: [['Java', 'Spring Boot'], ['API REST'], ['PostgreSQL'], ['JUnit'], ['OpenShift'], ['Docker']],
    accroche:
      'Développeur fullstack confirmé avec 6 ans d’expérience, dont trois chez Capgemini, principalement en <strong>Java / Spring Boot</strong>&nbsp;: microservices pour les finances publiques (AIFE), puis refonte d’un service de collecte pour France Travail qui a ramené un cycle concernant plus de 400 collaborateurs d’environ 10 jours à 48 heures. En parallèle, je conçois et <strong>opère</strong> seul Mibeko, un SaaS juridique en production, tests, mise en ligne automatique et serveurs compris.',
    prioritaires: ['ft-refonte', 'aife-microservices', 'ft-pilotage', 'mibeko-stack', 'mibeko-production'],
    masques: [
      'mibeko-livraison-web',
      'mibeko-livraison-mobile',
      'mibeko-tests',
      'mibeko-ia-agentique',
      'mibeko-organisation',
      'mibeko-mesure',
    ],
    groupesStack: ['Back-end', 'Qualité & tests', 'Ops & production', 'Données & IA'],
    titre: 'CV de Bénaja Bendo-Matondo, développeur fullstack Java / Spring Boot',
    description: `CV de Bénaja Bendo-Matondo, développeur fullstack confirmé avec 6 ans d’expérience, dont trois en Java / Spring Boot chez Capgemini. API REST, PostgreSQL, JUnit, OpenShift, Docker. ${dispo}`,
    nomImpression: 'CV-Benaja-Bendo-Matondo-Developpeur-Java-Spring-Boot',
  },
  {
    slug: 'devops',
    role: 'Développeur fullstack confirmé, orienté DevOps',
    enTete: [
      ['Docker'],
      ['GitHub Actions'],
      ['Ansible'],
      ['OpenShift'],
      ['Java', 'Spring Boot'],
      ['Python', 'FastAPI'],
      ['React'],
    ],
    accroche:
      'Développeur fullstack confirmé avec 6 ans d’expérience&nbsp;: je livre et j’<strong>opère</strong> ce que je construis. Sur <strong>Mibeko</strong>, un SaaS juridique que je conçois et fais tourner seul, je gère toute la chaîne : tests automatiques, images Docker, mise en ligne continue sur des serveurs configurés en Ansible, publication des applications sur les stores, mesure d’audience. Chez Capgemini, j’ai refondu en Java / Spring Boot, sur OpenShift, un service qui a ramené un cycle concernant plus de 400 collaborateurs d’environ 10 jours à 48 heures.',
    // Mibeko est la preuve de ce profil : c'est là que toute la chaîne de
    // livraison se lit, dépôts publics à l'appui.
    projetsEnPremier: true,
    prioritaires: [
      'mibeko-assistant',
      'mibeko-stack',
      'mibeko-livraison-web',
      'mibeko-livraison-mobile',
      'mibeko-tests',
      'mibeko-ia-agentique',
      'mibeko-organisation',
      'mibeko-mesure',
      'ft-refonte',
      'ft-pilotage',
      'aviation-ia-aws',
    ],
    // Masqués pour tenir en deux pages, du moins pertinent pour ce profil au
    // plus : le détail d'ingestion et de recherche (couverts par « Stack »),
    // la ligne « production » (dépliée en livraison web / mobile / tests),
    // le décisionnel Power BI, la relation client de KabimGroup, et le point
    // C# d'InfraOne — .NET reste cité chez KabimGroup, sans être mis en avant.
    masques: [
      'mibeko-ingestion',
      'mibeko-recherche',
      'mibeko-production',
      'ft-decisionnel',
      'kabim-relation-client',
      'infraone-sites',
    ],
    groupesStack: ['Ops & production', 'Qualité & tests', 'Back-end', 'Front-end', 'Données & IA'],
    titre: 'CV de Bénaja Bendo-Matondo, développeur fullstack orienté DevOps',
    description: `CV de Bénaja Bendo-Matondo, développeur fullstack confirmé avec 6 ans d’expérience, orienté DevOps : CI/CD GitHub Actions, Docker, Ansible, OpenShift, tests automatisés. ${dispo}`,
    nomImpression: 'CV-Benaja-Bendo-Matondo-Developpeur-Fullstack-DevOps',
  },
];

/** Au-delà, chaque variante de plus est une page de plus à tenir juste. */
const MAX_PROFILS = 4;

/** Un CV prêt à rendre : faits filtrés et ordonnés selon le profil. */
export interface CVResolu {
  profil: ProfilCV;
  experiences: Etape[];
  projets: Projet[];
  stack: GroupeStack[];
  /** Technos de l'en-tête, à plat : mises en évidence dans la stack. */
  cibles: string[];
  /** La ligne d'en-tête, prête à afficher. */
  ligneEnTete: string;
}

function echec(profil: ProfilCV, message: string): never {
  throw new Error(`[cv-profils] Profil « ${profil.slug ?? 'général'} » : ${message}`);
}

/** Remonte les points prioritaires, retire les masqués, garde l'ordre naturel pour le reste. */
function trierPoints(points: Point[], prioritaires: string[], masques: string[]): Point[] {
  const rang = (id: string) => {
    const i = prioritaires.indexOf(id);
    return i === -1 ? prioritaires.length : i;
  };
  return points.filter((p) => !masques.includes(p.id)).sort((a, b) => rang(a.id) - rang(b.id));
}

function verifierEnsemble(): void {
  if (PROFILS.length > MAX_PROFILS) {
    throw new Error(
      `[cv-profils] ${PROFILS.length} profils déclarés pour ${MAX_PROFILS} au plus. Retirer un profil (et rediriger son URL vers /cv) avant d'en ajouter un.`,
    );
  }
  const generaux = PROFILS.filter((p) => p.slug === undefined);
  if (generaux.length !== 1) {
    throw new Error(`[cv-profils] Il faut exactement un profil sans slug (le CV général) ; trouvé : ${generaux.length}.`);
  }
  const slugs = PROFILS.flatMap((p) => (p.slug ? [p.slug] : []));
  for (const slug of slugs) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error(`[cv-profils] Slug « ${slug} » invalide : minuscules, chiffres et tirets seulement.`);
    }
  }
  if (new Set(slugs).size !== slugs.length) {
    throw new Error('[cv-profils] Deux profils partagent le même slug.');
  }
}

/**
 * Construit le CV d'un profil, après avoir vérifié tout ce qu'il cite.
 * Lève une erreur explicite — et donc arrête le build — au premier écart.
 */
export function resoudreProfil(profil: ProfilCV): CVResolu {
  verifierEnsemble();

  const tousLesPoints = [...EXPERIENCES, ...PROJETS].flatMap((e) => e.points ?? []);
  const idsPoints = new Set(tousLesPoints.map((p) => p.id));
  if (idsPoints.size !== tousLesPoints.length) {
    echec(profil, 'deux points de parcours.ts partagent le même identifiant.');
  }

  const prioritaires = profil.prioritaires ?? [];
  const masques = profil.masques ?? [];
  for (const id of [...prioritaires, ...masques]) {
    if (!idsPoints.has(id)) echec(profil, `le point « ${id} » n'existe pas dans parcours.ts.`);
  }
  for (const id of prioritaires) {
    if (masques.includes(id)) echec(profil, `le point « ${id} » est à la fois prioritaire et masqué.`);
  }

  const idsProjets = PROJETS.map((p) => p.id);
  const ordreProjets = profil.projets ?? idsProjets;
  for (const id of ordreProjets) {
    if (!idsProjets.includes(id)) echec(profil, `le projet « ${id} » n'existe pas dans parcours.ts.`);
  }

  const titresGroupes = STACK.map((g) => g.titre);
  for (const titre of profil.groupesStack ?? []) {
    if (!titresGroupes.includes(titre)) echec(profil, `le groupe de stack « ${titre} » n'existe pas dans stack.ts.`);
  }

  if (/<(?!\/?strong>)/.test(profil.accroche)) {
    echec(profil, 'l’accroche ne peut contenir que des balises <strong>.');
  }
  if (!/^[A-Za-z0-9-]+$/.test(profil.nomImpression)) {
    echec(profil, `nomImpression « ${profil.nomImpression} » : ASCII, chiffres et tirets seulement.`);
  }

  const experiences = EXPERIENCES.map((etape) => ({
    ...etape,
    points: trierPoints(etape.points ?? [], prioritaires, masques),
  }));
  const projets = ordreProjets
    .map((id) => PROJETS.find((p) => p.id === id)!)
    .map((projet) => ({ ...projet, points: trierPoints(projet.points, prioritaires, masques) }));

  // Pas de techno en vitrine sans preuve sur la même page : chaque nom de
  // l'en-tête doit exister dans stack.ts ET se lire dans un point affiché.
  const technos = nomsTechnos();
  const texteAffiche = [...experiences, ...projets]
    .flatMap((e) => e.points ?? [])
    .map((p) => p.texte)
    .join('\n');
  const cibles = profil.enTete.flat();
  for (const nom of cibles) {
    if (!technos.has(nom)) echec(profil, `la techno « ${nom} » de l'en-tête n'existe pas dans stack.ts.`);
    if (!texteAffiche.includes(nom)) {
      echec(
        profil,
        `la techno « ${nom} » est annoncée dans l'en-tête mais n'apparaît dans aucun point affiché par ce profil. Ajouter le fait dans parcours.ts, démasquer le point qui la porte, ou la retirer de l'en-tête.`,
      );
    }
  }

  return {
    profil,
    experiences,
    projets,
    stack: stackOrdonnee(profil.groupesStack ?? [], cibles),
    cibles,
    ligneEnTete: profil.enTete.map((segment) => segment.join(' / ')).join(' · '),
  };
}
