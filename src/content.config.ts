import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Modèle de contenu — voir docs/08-plan-contenu.md §4.
 *
 * Deux collections :
 *   realisations : une page par projet. Courte quand il y a peu à dire,
 *                  longue quand il y a de la matière (Mibeko, France Travail).
 *                  Un enseignement obligatoire.
 *   notes        : les articles (rubrique « Articles », /articles, depuis le
 *                  30/09/2026). Datés, statués, courts ou longs.
 *
 * Il y en avait trois jusqu'au 30/09/2026 : les études de cas (`etudes`)
 * doublonnaient leurs fiches. Elles ont été fusionnées dans les réalisations,
 * et leurs adresses redirigent (astro.config.mjs, firebase.json). Voir
 * docs/13-refonte-contenu.md §5.
 *
 * `brouillon: true` exclut une entrée de TOUTES les routes et du RSS (helpers
 * dans src/lib/contenu.ts) : c'est le seul mécanisme de non-publication.
 */

const lien = z.object({ label: z.string(), url: z.url() });

/**
 * Une preuve publique : un lien qu'un lecteur peut ouvrir pour vérifier une
 * affirmation, avec la mention de CE QU'IL prouve.
 *
 * Pourquoi un type distinct de `lien` : un audit du build du 14/08/2026 a
 * montré que le site ne sortait que vers LinkedIn, la racine du profil GitHub
 * et la page d'accueil de Mibeko. Les six dépôts publics et les deux fiches de
 * stores — c'est-à-dire tout ce qui permet de juger sur pièces — n'étaient liés
 * nulle part. Un `liens` générique n'aurait pas suffi : rendu en rangée de
 * boutons, huit liens indifférenciés ne disent pas lequel ouvrir.
 *
 * `famille` sert au regroupement à l'affichage, `quoi` à la légende.
 */
const preuve = z.object({
  label: z.string(),
  url: z.url(),
  /** Ce que ce lien démontre, en une ligne. Pas un slogan : une justification. */
  quoi: z.string(),
  famille: z.enum(['produit', 'application', 'code']).default('code'),
});

const realisations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/realisations' }),
  schema: z.object({
    nom: z.string(),
    resume: z.string(),
    /** Statut public. Une archive est un état, pas un abandon. */
    statut: z.enum([
      'production',
      'en-cours',
      'maintenu',
      'termine',
      'pause',
      'archive',
    ]),
    /** Période affichée, écrite en toutes lettres (« Depuis décembre 2025 »). */
    periode: z.string(),
    role: z.string(),
    stack: z.array(z.string()).default([]),
    domaines: z.array(z.string()).default([]),
    liens: z.array(lien).default([]),
    /** Liens vérifiables — dépôts, fiches de stores, produit en ligne. */
    preuves: z.array(preuve).default([]),
    /** Obligatoire : sans lui, l'inventaire redevient un CV en liste. */
    enseignement: z.string(),
    /**
     * Le type de travail, qui range la page Réalisations en trois groupes
     * (TYPES_REALISATION dans src/lib/contenu.ts). Un classement par type et
     * non par pays : les postes au Congo et chez Capgemini sont côte à côte.
     */
    type: z.enum(['produit', 'entreprise', 'avec-autres']),
    /** Quelques chiffres, affichés en tête de page. Venus des études de cas. */
    chiffres: z
      .array(z.object({ valeur: z.string(), label: z.string() }))
      .default([]),
    /** Ordre dans son groupe. */
    ordre: z.number().default(50),
    /** Date de dernière relecture, affichée. */
    maj: z.coerce.date(),
    brouillon: z.boolean().default(false),
    /** Mission client : aucun lien public exigé, périmètre borné à la place. */
    confidentiel: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    titre: z.string(),
    date: z.coerce.date(),
    maj: z.coerce.date().optional(),
    resume: z.string(),
    sujets: z.array(z.string()).default([]),
    /** Niveau de finition, explicite et non caché. */
    statut: z
      .enum(['fragment', 'testee', 'stable', 'obsolete'])
      .default('fragment'),
    /** `article` reste un format de note, pas une collection à part. */
    format: z.enum(['note', 'article']).default('note'),
    /**
     * Le projet dont parle l'article (identifiant d'une réalisation). Affiché
     * en tête d'article ; un identifiant inconnu arrête le build.
     */
    projet: z.string().optional(),
    /** Identifiant de la note qui remplace celle-ci, si elle est obsolète. */
    remplaceePar: z.string().optional(),
    sources: z.array(lien).default([]),
    brouillon: z.boolean().default(false),
  }),
});

export const collections = { realisations, notes };
