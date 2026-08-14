import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Accès au contenu — un seul endroit décide de ce qui est public.
 * Règles de publication : docs/08-plan-contenu.md §6.
 */

export type Realisation = CollectionEntry<'realisations'>;
export type Etude = CollectionEntry<'etudes'>;
export type Note = CollectionEntry<'notes'>;

/** `brouillon: true` retire d'un coup des routes, des index, du RSS et du sitemap. */
const publie = (entree: { data: { brouillon: boolean } }) => !entree.data.brouillon;

/* -----------------------------------------------------------------------------
 * Typographie française du frontmatter
 *
 * Le corps Markdown est traité par le plugin remark d'astro.config.mjs, mais le
 * frontmatter n'est pas du Markdown : ses chaînes arrivent telles quelles. On
 * pose l'espace insécable ici, une fois, plutôt que dans chaque gabarit — et
 * plutôt que d'écrire un caractère invisible dans les fichiers de contenu.
 * L'opération est idempotente : elle exige une espace ordinaire avant la
 * ponctuation, qu'elle vient justement de supprimer.
 * -------------------------------------------------------------------------- */

export function typo(texte: string): string {
  return texte
    .replace(/[ \t]+([:;!?])(?=\s|$)/g, ' $1')
    .replace(/[ \t]+»/g, ' »')
    .replace(/«[ \t]+/g, '« ');
}

function applique<T extends object>(data: T, champs: (keyof T)[]): void {
  for (const champ of champs) {
    const valeur = data[champ];
    if (typeof valeur === 'string') {
      data[champ] = typo(valeur) as T[keyof T];
    }
  }
}

export async function getRealisations(): Promise<Realisation[]> {
  const entrees = await getCollection('realisations', publie);
  for (const { data } of entrees) {
    applique(data, ['nom', 'resume', 'periode', 'role', 'enseignement']);
  }
  return entrees.sort(
    (a, b) =>
      Number(b.data.epingle) - Number(a.data.epingle) ||
      a.data.ordre - b.data.ordre,
  );
}

export async function getEtudes(): Promise<Etude[]> {
  const entrees = await getCollection('etudes', publie);
  for (const { data } of entrees) {
    applique(data, ['titre', 'sousTitre', 'periode', 'resume']);
    for (const chiffre of data.chiffres) applique(chiffre, ['label']);
  }
  return entrees.sort((a, b) => a.data.ordre - b.data.ordre);
}

/** Les notes se lisent de la plus récente à la plus ancienne. */
export async function getNotes(): Promise<Note[]> {
  const entrees = await getCollection('notes', publie);
  for (const { data } of entrees) applique(data, ['titre', 'resume']);
  return entrees.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/* -----------------------------------------------------------------------------
 * Taxonomies
 *
 * Une page filtrée n'existe que si elle regroupe au moins SEUIL entrées : une
 * page qui n'affiche qu'un seul élément n'aide personne à naviguer, et le plan
 * de contenu interdit les rubriques décoratives. Le seuil s'applique tout seul —
 * les pages apparaissent quand l'inventaire grossit, disparaissent s'il maigrit.
 * -------------------------------------------------------------------------- */

export const SEUIL_FILTRE = 2;

/** Slug d'URL : sans accent, sans majuscule, sans caractère à échapper. */
export function slugifie(valeur: string): string {
  return valeur
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface Groupe<T> {
  slug: string;
  label: string;
  entrees: T[];
}

function grouper<T>(entrees: T[], valeurs: (entree: T) => string[]): Groupe<T>[] {
  const groupes = new Map<string, Groupe<T>>();
  for (const entree of entrees) {
    for (const valeur of valeurs(entree)) {
      const slug = slugifie(valeur);
      const groupe = groupes.get(slug) ?? { slug, label: valeur, entrees: [] };
      groupe.entrees.push(entree);
      groupes.set(slug, groupe);
    }
  }
  return [...groupes.values()]
    .filter((groupe) => groupe.entrees.length >= SEUIL_FILTRE)
    .sort(
      (a, b) =>
        b.entrees.length - a.entrees.length ||
        a.label.localeCompare(b.label, 'fr'),
    );
}

/** Domaines et technologies qui méritent leur page, calculés une fois. */
export async function taxonomiesRealisations() {
  const realisations = await getRealisations();
  const domaines = grouper(realisations, (e) => e.data.domaines);
  const techs = grouper(realisations, (e) => e.data.stack);
  return {
    domaines,
    techs,
    /** Sert à savoir si une puce doit être un lien ou un simple libellé. */
    aUnePage: new Set([...domaines, ...techs].map((g) => g.slug)),
  };
}

export async function sujetsNotes() {
  const notes = await getNotes();
  const sujets = grouper(notes, (e) => e.data.sujets);
  return { sujets, aUnePage: new Set(sujets.map((g) => g.slug)) };
}

/* -----------------------------------------------------------------------------
 * Libellés
 * -------------------------------------------------------------------------- */

export type Ton = 'vif' | 'calme' | 'alerte';

export const STATUTS_REALISATION: Record<
  Realisation['data']['statut'],
  { label: string; ton: Ton }
> = {
  production: { label: 'En production', ton: 'vif' },
  'en-cours': { label: 'Mission en cours', ton: 'vif' },
  maintenu: { label: 'Maintenu', ton: 'vif' },
  termine: { label: 'Mission terminée', ton: 'calme' },
  pause: { label: 'En pause', ton: 'calme' },
  archive: { label: 'Archivé', ton: 'calme' },
};

/** Le niveau de finition d'une note est affiché, jamais deviné. */
export const STATUTS_NOTE: Record<
  Note['data']['statut'],
  { label: string; ton: Ton; aide: string }
> = {
  fragment: {
    label: 'Fragment',
    ton: 'calme',
    aide: 'Noté au vol, utile mais pas relu en profondeur.',
  },
  testee: {
    label: 'Testée',
    ton: 'vif',
    aide: 'Vérifiée au moins une fois dans un cas réel.',
  },
  stable: {
    label: 'Stable',
    ton: 'vif',
    aide: 'Vérifiée, et toujours valable à la dernière relecture.',
  },
  obsolete: {
    label: 'Obsolète',
    ton: 'alerte',
    aide: 'Conservée pour mémoire — ne plus s’y fier telle quelle.',
  },
};

/* -----------------------------------------------------------------------------
 * Dates — toujours en UTC : le YAML donne une date nue, pas un instant, et le
 * fuseau de la machine de build ne doit pas la faire reculer d'un jour.
 * -------------------------------------------------------------------------- */

const enFrancais = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export const formatDate = (date: Date) => enFrancais.format(date);
export const dateISO = (date: Date) => date.toISOString().slice(0, 10);

/* -----------------------------------------------------------------------------
 * Navigation
 * -------------------------------------------------------------------------- */

/**
 * Les sections du site, dans l'ordre de lecture. Une rubrique vide n'apparaît
 * pas (docs/08 §6) : le test porte sur le contenu publié, pas sur l'existence
 * du dossier.
 *
 * Source unique parce que la liste est rendue à DEUX endroits : l'en-tête sur
 * grand écran, le pied de page partout. Sur mobile l'en-tête n'affiche plus que
 * la marque et Contact — il occupait 158 px, soit 19 % de l'écran, avant le
 * moindre mot de contenu.
 */
export async function navigationPrincipale() {
  const [realisations, etudes, notes] = await Promise.all([
    getRealisations(),
    getEtudes(),
    getNotes(),
  ]);

  return [
    { href: '/realisations', label: 'Réalisations', actif: realisations.length > 0 },
    // « Études » seul se lit « parcours scolaire » en français : un relecteur a
    // cliqué en cherchant les diplômes et a trouvé Mibeko. L'URL ne bouge pas.
    { href: '/etudes', label: 'Études de cas', actif: etudes.length > 0 },
    { href: '/notes', label: 'Notes', actif: notes.length > 0 },
    { href: '/a-propos', label: 'À propos', actif: true },
  ].filter((item) => item.actif);
}

/** Une entrée est active sur sa page et sur toutes ses sous-pages. */
export function estActif(chemin: string, href: string): boolean {
  return href === '/'
    ? chemin === '/'
    : chemin === href || chemin.startsWith(`${href}/`);
}
