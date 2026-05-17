import type { APIContext } from 'astro';
import { generateRssFeed } from '../../scripts/rss-utils';

export async function GET(context: APIContext) {
  return generateRssFeed(context, { level: 1 });
}
