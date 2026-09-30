import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getNotes, getRealisations } from '../lib/contenu';

/**
 * Le flux suit ce qui se publie : les articles et les réalisations. Les
 * brouillons en sont exclus par les helpers, pas par un filtre local — il n'y a
 * qu'une seule règle de publication dans le projet.
 *
 * Les études de cas y figuraient jusqu'au 30/09/2026 ; fusionnées dans les
 * réalisations, ce sont désormais ces dernières qui y entrent, datées de leur
 * dernière relecture.
 */
export async function GET(context: APIContext) {
  const [notes, realisations] = await Promise.all([getNotes(), getRealisations()]);
  const items = [
    ...notes.map((note) => ({
      title: note.data.titre,
      description: note.data.resume,
      link: `/articles/${note.id}`,
      pubDate: note.data.date,
      categories: note.data.sujets,
    })),
    ...realisations.map((realisation) => ({
      title: realisation.data.nom,
      description: realisation.data.resume,
      link: `/realisations/${realisation.id}`,
      pubDate: realisation.data.maj,
      categories: realisation.data.stack,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Bénaja Bendo-Matondo',
    description: 'Mes réalisations et mes articles techniques.',
    site: context.site!,
    items,
    customData: '<language>fr-fr</language>',
  });
}
