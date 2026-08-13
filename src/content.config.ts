import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro:schema';

/**
 * Collection « etudes » — études de cas (Mibeko, missions Capgemini…).
 * Content Layer API (Astro 5+) : chargeur glob + schéma Zod typé.
 */
const etudes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/etudes' }),
  schema: z.object({
    titre: z.string(),
    sousTitre: z.string().optional(),
    periode: z.string(),
    resume: z.string(),
    tags: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    chiffres: z
      .array(z.object({ valeur: z.string(), label: z.string() }))
      .default([]),
    liens: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
    ordre: z.number().default(0),
  }),
});

export const collections = { etudes };
