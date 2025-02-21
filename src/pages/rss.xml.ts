import rss from '@astrojs/rss';
import { AppConfig } from '@utils/AppConfig';
import { getCollection } from 'astro:content';

export const get = async () => {
  const posts = await getCollection('post');

  return rss({
    // `<title>` field in output xml
    title: AppConfig.title,
    // `<description>` field in output xml
    description: AppConfig.description,
    // base URL for RSS <item> links
    // SITE will use "site" from your project's astro.config.
    site: import.meta.env.SITE,
    // list of `<item>`s in output xml
    // simple example: generate items for every md file in /src/pages
    // see "Generating items" section for required frontmatter and advanced use cases
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
};
