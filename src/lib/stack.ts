/**
 * La stack, en un seul endroit.
 *
 * Pourquoi ce fichier existe : jusqu'ici, les technologies n'apparaissaient que
 * dans le frontmatter des réalisations. Conséquence mesurée sur le build du
 * 14/08/2026 — l'accueil nommait « Spring Boot » deux fois et « React »,
 * « TypeScript », « Kotlin », « Laravel », « Docker », « Ansible » zéro fois.
 * Un lecteur qui scanne une page d'accueil pendant dix secondes ne pouvait pas
 * savoir ce que je sais faire. Les pages de taxonomie ne rattrapaient rien :
 * leur seuil de deux réalisations (SEUIL_FILTRE) exclut justement React,
 * Laravel, Kotlin et Flutter, portés par une seule réalisation chacun.
 *
 * Règle de contenu : rien ici ne doit être une compétence que je ne peux pas
 * défendre en entretien. Chaque entrée est adossée à une réalisation publiée,
 * à une étude de cas ou à une mission décrite sur le site — pas à une liste de
 * mots-clés. Il n'y a volontairement AUCUN niveau, aucune jauge, aucune étoile :
 * une barre de progression sur une techno est une opinion déguisée en mesure.
 *
 * `cle: true` = affiché aussi dans la variante compacte de l'accueil.
 *
 * `preuve` (ajouté le 24/09/2026) : la page du site qui montre cette techno
 * au travail. Sur l'accueil comme sur le CV, la puce devient un lien, et le
 * PDF exporté le garde cliquable. Une techno sans page qui la NOMME n'a pas
 * de `preuve` : `npm test` vérifie que la page visée (ou la section, si
 * l'URL porte un fragment) contient bien son nom. Préférer une page de
 * taxonomie (/realisations/tech/…) quand plusieurs réalisations l'utilisent.
 *
 * Sans preuve à ce jour (24/09/2026) : Hibernate / JPA, Angular, Vue,
 * React Native, MongoDB, Firebase, TDD, Git, Maven, Gradle, Kafka, Scrum,
 * RGPD. Chacune attend une page qui la montre, ou son retrait de la
 * liste. (Sortis le même jour : RAG, MCP, Pest, Vitest, pytest, tests
 * d'intégration, Linux et Umami avec l'étude Mibeko ; C# / .NET, Node.js et
 * Flutter avec la réalisation Congo, publiée ; MySQL avec la réalisation
 * bgrfacile, publiée le même jour.)
 */

export interface Techno {
  nom: string;
  /** Clé de ICONES_TECH. Absente = pas d'icône libre, on rend un monogramme. */
  icone?: string;
  /** Monogramme de repli, 2 à 3 caractères. Utilisé seulement sans `icone`. */
  mono?: string;
  /** Retenue dans la variante compacte (accueil). */
  cle?: boolean;
  /** Chemin de la page qui la montre au travail, fragment possible. */
  preuve?: string;
}

export interface GroupeStack {
  titre: string;
  /** Ce que ce groupe prouve, en une ligne. Sert de légende, pas de slogan. */
  precision: string;
  technos: Techno[];
}

export const STACK: GroupeStack[] = [
  {
    titre: 'Back-end',
    precision: 'Le cœur du métier, en entreprise comme sur mes propres produits.',
    technos: [
      { nom: 'Java', icone: 'java', cle: true, preuve: '/realisations/tech/java' },
      { nom: 'Spring Boot', icone: 'spring-boot', cle: true, preuve: '/realisations/tech/spring-boot' },
      { nom: 'Hibernate / JPA', mono: 'JPA' },
      { nom: 'API REST', mono: 'API', preuve: '/etudes/aife#ce-que-jai-fait' },
      { nom: 'Laravel / PHP', icone: 'laravel', cle: true, preuve: '/etudes/mibeko#la-construction' },
      { nom: 'Python', icone: 'python', cle: true, preuve: '/realisations/tech/python' },
      { nom: 'FastAPI', icone: 'fastapi', preuve: '/etudes/mibeko#la-construction' },
      { nom: 'Node.js', icone: 'nodejs', preuve: '/realisations/congo-web-mobile' },
      // Expérience réelle (InfraOne, KabimGroup, 2020–2023) mais pas une
      // spécialité mise en avant : ni `cle`, ni tête de liste, ni mention dans
      // les en-têtes de CV. Décision du 23/09/2026 — à rouvrir si les offres
      // visées changent.
      { nom: 'C# / .NET', mono: 'C#', preuve: '/realisations/congo-web-mobile' },
    ],
  },
  {
    titre: 'Front-end',
    precision: 'Des interfaces livrées, pas des maquettes.',
    technos: [
      { nom: 'TypeScript', icone: 'typescript', cle: true, preuve: '/etudes/mibeko' },
      { nom: 'Angular', icone: 'angular', cle: true },
      { nom: 'React', icone: 'react', cle: true, preuve: '/etudes/mibeko#la-construction' },
      { nom: 'Astro', icone: 'astro', preuve: '/realisations/tech/astro' },
      { nom: 'Vue', icone: 'vue' },
      { nom: 'HTML / CSS', mono: 'WEB', preuve: '/realisations/benaja-bendo-fr' },
    ],
  },
  {
    titre: 'Mobile',
    precision: 'Deux applications publiées sur l’App Store et le Play Store.',
    technos: [
      { nom: 'Kotlin Multiplatform', icone: 'kotlin', cle: true, preuve: '/etudes/mibeko#la-construction' },
      // Retenu dans la variante compacte pour une raison de composition autant
      // que de fond : seul, « Mobile » laissait une colonne à une puce à côté
      // d'une colonne à quatre, et la grille se lisait comme un oubli.
      { nom: 'Flutter', icone: 'flutter', cle: true, preuve: '/realisations/congo-web-mobile' },
      // Même icône que React : Meta réutilise le même logo pour les deux.
      { nom: 'React Native', icone: 'react' },
    ],
  },
  {
    titre: 'Données & IA',
    precision: 'Recherche hybride et traçabilité de la source, sur Mibeko.',
    technos: [
      { nom: 'PostgreSQL', icone: 'postgresql', cle: true, preuve: '/realisations/tech/postgresql' },
      { nom: 'SQL', mono: 'SQL', preuve: '/etudes/aife#ce-que-jai-fait' },
      { nom: 'pgvector', mono: 'pgv', cle: true, preuve: '/etudes/mibeko#la-construction' },
      { nom: 'MySQL', icone: 'mysql', preuve: '/realisations/bgrfacile' },
      { nom: 'MongoDB', icone: 'mongodb' },
      { nom: 'Firebase', icone: 'firebase' },
      { nom: 'Power BI', mono: 'BI', cle: true, preuve: '/etudes/france-travail#ce-que-jai-fait' },
      { nom: 'RAG sourcé', mono: 'RAG', preuve: '/etudes/mibeko#la-construction' },
      // Un agent à appels d'outils et un serveur MCP, dans mibeko-dashboard
      // (app/Ai, app/Mcp) — vérifié le 23/09/2026.
      { nom: 'Agents IA & MCP', mono: 'MCP', preuve: '/etudes/mibeko#la-construction' },
      { nom: 'OCR', mono: 'OCR', preuve: '/etudes/mibeko#la-construction' },
    ],
  },
  {
    titre: 'Qualité & tests',
    precision: 'Tests automatisés et revues de code sur les missions comme sur mes produits.',
    technos: [
      { nom: 'JUnit', mono: 'JUT', preuve: '/etudes/aife#ce-que-jai-fait' },
      // Les trois suites de Mibeko, lisibles dans ses dépôts publics.
      { nom: 'Pest', mono: 'PST', preuve: '/etudes/mibeko#la-production' },
      { nom: 'Vitest', mono: 'VIT', preuve: '/etudes/mibeko#la-production' },
      { nom: 'pytest', mono: 'PYT', preuve: '/etudes/mibeko#la-production' },
      { nom: 'TDD', mono: 'TDD' },
      { nom: 'Tests d’intégration', mono: 'INT', preuve: '/etudes/mibeko#la-production' },
      { nom: 'Revues de code', mono: 'PR', preuve: '/etudes/aife#ce-que-jai-fait' },
    ],
  },
  {
    titre: 'Ops & production',
    precision: 'Ce que je mets en ligne, je le fais aussi tourner au quotidien.',
    technos: [
      { nom: 'Docker', icone: 'docker', cle: true, preuve: '/realisations/tech/docker' },
      { nom: 'Git', mono: 'GIT' },
      { nom: 'Maven', icone: 'maven' },
      { nom: 'Gradle', icone: 'gradle' },
      { nom: 'Ansible', icone: 'ansible', cle: true, preuve: '/etudes/mibeko#la-production' },
      { nom: 'GitHub Actions', icone: 'github-actions', cle: true, preuve: '/realisations/tech/github-actions' },
      // OpenShift est une distribution de Kubernetes : c'est là, chez France
      // Travail, que se trouve l'usage réel. « Kubernetes / Helm » a été retiré
      // le 24/09/2026 : aucune preuve sur le site, et Helm n'était pas manipulé
      // personnellement. À rouvrir quand le cluster Raspberry Pi sera documenté.
      { nom: 'OpenShift (Kubernetes)', icone: 'openshift', preuve: '/etudes/france-travail#ce-que-jai-fait' },
      { nom: 'Kafka', mono: 'KFK' },
      { nom: 'Traefik', icone: 'traefik', preuve: '/etudes/mibeko#la-production' },
      { nom: 'Linux', icone: 'linux', preuve: '/etudes/mibeko#la-production' },
      // Auto-hébergé par un rôle Ansible de vps_infra, actif sur mibeko.fr.
      { nom: 'Umami', mono: 'UMI', preuve: '/etudes/mibeko#la-production' },
      { nom: 'AWS', mono: 'AWS', preuve: '/etudes/aife#ce-que-jai-fait' },
    ],
  },
  {
    titre: 'Méthodes',
    precision: 'Travail collectif, livraison incrémentale et contraintes applicatives.',
    technos: [
      { nom: 'SAFe', mono: 'SAF', preuve: '/etudes/aife' },
      { nom: 'Scrum', mono: 'SCR' },
      { nom: 'PI planning', mono: 'PI', preuve: '/etudes/aife#ce-que-jai-fait' },
      { nom: 'RGPD & sécurité applicative', mono: 'SEC' },
    ],
  },
];

/** La stack réduite aux entrées `cle`, pour l'accueil. Les groupes vides sautent. */
export function stackCompacte(): GroupeStack[] {
  return STACK.map((groupe) => ({
    ...groupe,
    technos: groupe.technos.filter((t) => t.cle),
  })).filter((groupe) => groupe.technos.length > 0);
}

/** Tous les noms de technos, pour valider ce que citent les profils de CV. */
export function nomsTechnos(): Set<string> {
  return new Set(STACK.flatMap((groupe) => groupe.technos.map((t) => t.nom)));
}

/**
 * La stack complète, réordonnée pour un profil de CV (src/lib/cv-profils.ts).
 *
 * Rien n'est retiré — un profil hiérarchise, il ne cache pas une compétence :
 *  - les groupes cités par `ordreGroupes` passent en tête, dans cet ordre ;
 *    les autres suivent dans leur ordre naturel ;
 *  - dans chaque groupe, les technos `cibles` passent en tête, dans l'ordre
 *    où le profil les cite ; les autres gardent leur ordre.
 *
 * La validation des noms est faite en amont, par `resoudreProfil()`.
 */
export function stackOrdonnee(ordreGroupes: readonly string[], cibles: readonly string[]): GroupeStack[] {
  const rangGroupe = (titre: string) => {
    const i = ordreGroupes.indexOf(titre);
    return i === -1 ? ordreGroupes.length : i;
  };
  const rangTechno = (nom: string) => {
    const i = cibles.indexOf(nom);
    return i === -1 ? cibles.length : i;
  };
  // `sort` est stable : à rang égal, l'ordre naturel de STACK est conservé.
  return [...STACK]
    .sort((a, b) => rangGroupe(a.titre) - rangGroupe(b.titre))
    .map((groupe) => ({
      ...groupe,
      technos: [...groupe.technos].sort((a, b) => rangTechno(a.nom) - rangTechno(b.nom)),
    }));
}
