import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { postPath } from '../lib/urls';

export async function GET(context) {
  const posts = (await getCollection('articulos', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: [post.data.category],
      link: postPath(post),
    })),
    customData: '<language>es</language>',
  });
}
