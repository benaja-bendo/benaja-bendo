import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const etudes = (await getCollection('etudes')).sort(
    (a, b) => a.data.ordre - b.data.ordre,
  );

  return rss({
    title: 'Bénaja Bendo-Matondo',
    description:
      'Développeur fullstack Java / Spring Boot · React. Études de cas et notes techniques.',
    site: context.site,
    items: etudes.map((e) => ({
      title: e.data.titre,
      description: e.data.resume,
      link: e.id === 'mibeko' ? '/mibeko' : `/experiences#${e.id}`,
    })),
    customData: '<language>fr-fr</language>',
  });
}
