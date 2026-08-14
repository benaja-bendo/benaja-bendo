import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getEtudes, getNotes } from '../lib/contenu';

/**
 * Le flux suit ce qui se publie : les notes et les études de cas. Les
 * brouillons en sont exclus par les helpers, pas par un filtre local — il n'y a
 * qu'une seule règle de publication dans le projet.
 */
export async function GET(context: APIContext) {
  const [notes, etudes] = await Promise.all([getNotes(), getEtudes()]);

  const items = [
    ...notes.map((note) => ({
      title: note.data.titre,
      description: note.data.resume,
      link: `/notes/${note.id}`,
      pubDate: note.data.date,
      categories: note.data.sujets,
    })),
    ...etudes.map((etude) => ({
      title: `Étude de cas — ${etude.data.titre}`,
      description: etude.data.resume,
      link: `/etudes/${etude.id}`,
      pubDate: etude.data.maj,
      categories: etude.data.tags,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Bénaja Bendo-Matondo',
    description:
      'Notes techniques et études de cas — ce que je construis, comment je décide, ce que j’apprends.',
    site: context.site!,
    items,
    customData: '<language>fr-fr</language>',
  });
}
