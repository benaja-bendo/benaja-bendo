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
 */

export interface Techno {
  nom: string;
  /** Clé de ICONES_TECH. Absente = pas d'icône libre, on rend un monogramme. */
  icone?: string;
  /** Monogramme de repli, 2 à 3 caractères. Utilisé seulement sans `icone`. */
  mono?: string;
  /** Retenue dans la variante compacte (accueil). */
  cle?: boolean;
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
      { nom: 'Java', icone: 'java', cle: true },
      { nom: 'Spring Boot', icone: 'spring-boot', cle: true },
      { nom: 'Hibernate / JPA', mono: 'JPA' },
      { nom: 'API REST', mono: 'API' },
      { nom: 'Laravel / PHP', icone: 'laravel', cle: true },
      { nom: 'Python', icone: 'python', cle: true },
      { nom: 'FastAPI', icone: 'fastapi' },
      { nom: 'Node.js', icone: 'nodejs' },
    ],
  },
  {
    titre: 'Front-end',
    precision: 'Des interfaces livrées, pas des maquettes.',
    technos: [
      { nom: 'TypeScript', icone: 'typescript', cle: true },
      { nom: 'Angular', icone: 'angular' },
      { nom: 'React', icone: 'react', cle: true },
      { nom: 'Astro', icone: 'astro' },
      { nom: 'Vue', icone: 'vue' },
      { nom: 'HTML / CSS', mono: 'WEB' },
    ],
  },
  {
    titre: 'Mobile',
    precision: 'Deux applications publiées sur l’App Store et le Play Store.',
    technos: [
      { nom: 'Kotlin Multiplatform', icone: 'kotlin', cle: true },
      // Retenu dans la variante compacte pour une raison de composition autant
      // que de fond : seul, « Mobile » laissait une colonne à une puce à côté
      // d'une colonne à quatre, et la grille se lisait comme un oubli.
      { nom: 'Flutter', icone: 'flutter', cle: true },
      // Même icône que React : Meta réutilise le même logo pour les deux.
      { nom: 'React Native', icone: 'react' },
    ],
  },
  {
    titre: 'Données & IA',
    precision: 'Recherche hybride et traçabilité de la source, sur Mibeko.',
    technos: [
      { nom: 'PostgreSQL', icone: 'postgresql', cle: true },
      { nom: 'SQL', mono: 'SQL' },
      { nom: 'pgvector', mono: 'pgv', cle: true },
      { nom: 'MySQL', icone: 'mysql' },
      { nom: 'MongoDB', icone: 'mongodb' },
      { nom: 'Firebase', icone: 'firebase' },
      { nom: 'Power BI', mono: 'BI', cle: true },
      { nom: 'RAG sourcé', mono: 'RAG' },
      { nom: 'OCR', mono: 'OCR' },
    ],
  },
  {
    titre: 'Qualité & tests',
    precision: 'Tests automatisés et revues de code sur les missions comme sur mes produits.',
    technos: [
      { nom: 'JUnit', mono: 'JUT' },
      { nom: 'TDD', mono: 'TDD' },
      { nom: 'Tests d’intégration', mono: 'INT' },
      { nom: 'Revues de code', mono: 'PR' },
    ],
  },
  {
    titre: 'Ops & production',
    precision: 'Ce que je déploie, je l’exploite — mises en production comprises.',
    technos: [
      { nom: 'Docker', icone: 'docker', cle: true },
      { nom: 'Git', mono: 'GIT' },
      { nom: 'Maven', icone: 'maven' },
      { nom: 'Gradle', icone: 'gradle' },
      { nom: 'Ansible', icone: 'ansible', cle: true },
      { nom: 'GitHub Actions', icone: 'github-actions', cle: true },
      { nom: 'OpenShift', icone: 'openshift' },
      { nom: 'Kubernetes / Helm', mono: 'K8S' },
      { nom: 'Kafka', mono: 'KFK' },
      { nom: 'Traefik', icone: 'traefik' },
      { nom: 'Linux', icone: 'linux' },
      { nom: 'AWS', mono: 'AWS' },
    ],
  },
  {
    titre: 'Méthodes',
    precision: 'Travail collectif, livraison incrémentale et contraintes applicatives.',
    technos: [
      { nom: 'SAFe', mono: 'SAF' },
      { nom: 'Scrum', mono: 'SCR' },
      { nom: 'PI planning', mono: 'PI' },
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
