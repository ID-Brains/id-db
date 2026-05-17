import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function generateRssFeed(context: APIContext, options: {
  level?: number;
}) {
  const { level } = options;
  const docs = await getCollection('docs');

  const items = docs
    .filter((doc) => {
      if (level !== undefined && doc.data.level !== level) return false;
      return doc.data.date && !isNaN(new Date(doc.data.date).getTime());
    })
    .sort((a, b) => {
      const dateA = new Date(a.data.date).getTime();
      const dateB = new Date(b.data.date).getTime();
      return dateB - dateA;
    })
    .slice(0, level !== undefined ? 30 : 50);

  const levelSuffix = level !== undefined ? ` Level ${level}` : '';
  const siteUrl = context.site?.toString().replace(/\/$/, '') || 'https://ID-Brains.github.io/id-db';
  const baseUrl = siteUrl.endsWith('/id-db') ? siteUrl : `${siteUrl}/id-db`;

  return rss({
    title: `Project Hikma${levelSuffix}${level !== undefined ? ' Content' : ' - All Content'}`,
    description: level !== undefined
      ? `Academic notes, summaries, and resources for Level ${level} students at Project Hikma.`
      : 'Latest academic notes, summaries, and resources from Project Hikma - the student-driven knowledge base inspired by Bayt al-Hikma.',
    site: siteUrl,
    items: items.map((doc) => {
      const pubDate = new Date(doc.data.date);
      const language = doc.data.language || 'en';

      const categories = level !== undefined
        ? [doc.data.subject, `Term ${doc.data.term}`, ...(doc.data.tags || [])].filter(Boolean)
        : [doc.data.subject, `Level ${doc.data.level}`, `Term ${doc.data.term}`, ...(doc.data.tags || [])].filter(Boolean);

      return {
        title: doc.data.title,
        pubDate,
        description: doc.data.description || '',
        link: `${baseUrl}/${doc.id}/`,
        categories,
        customData: `
          <dc:creator>${escapeXml(doc.data.contributor || 'Anonymous')}</dc:creator>
          <dc:language>${language}</dc:language>
          ${level !== undefined ? '' : `<dc:subject>${escapeXml(doc.data.subject || '')}</dc:subject>`}
        `.trim(),
      };
    }),
    customData: `
      <language>en</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${baseUrl}/rss${level !== undefined ? `/level-${level}` : ''}.xml" rel="self" type="application/rss+xml" />
      ${level === undefined ? `
      <image>
        <url>${baseUrl}/Hikma_icon.svg</url>
        <title>Project Hikma</title>
        <link>${siteUrl}</link>
      </image>
      ` : ''}
    `.trim(),
    stylesheet: `${baseUrl}/rss/styles.xsl`,
  });
}
