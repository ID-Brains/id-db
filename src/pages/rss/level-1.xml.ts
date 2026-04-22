import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

/**
 * Level 1 RSS feed - includes only level 1 content
 * URL: /rss/level-1.xml
 */
export async function GET(context: APIContext) {
	const docs = await getCollection('docs');
	const LEVEL = 1;

	const items = docs
		.filter((doc) => {
			return (
				doc.data.level === LEVEL &&
				doc.data.date &&
				!isNaN(new Date(doc.data.date).getTime())
			);
		})
		.sort((a, b) => {
			const dateA = new Date(a.data.date).getTime();
			const dateB = new Date(b.data.date).getTime();
			return dateB - dateA;
		})
		.slice(0, 30);

	return rss({
		title: `Project Hikma - Level ${LEVEL} Content`,
		description: `Academic notes, summaries, and resources for Level ${LEVEL} students at Project Hikma.`,
		site: context.site?.toString() || 'https://ID-Brains.github.io/id-db',
		items: items.map((doc) => {
			const pubDate = new Date(doc.data.date);
			const language = doc.data.language || 'en';

			const categories = [
				doc.data.subject,
				`Term ${doc.data.term}`,
				...(doc.data.tags || []),
			].filter(Boolean);

			return {
				title: doc.data.title,
				pubDate: pubDate,
				description: doc.data.description || '',
				link: `/docs/${doc.id}/`,
				categories: categories,
				customData: `
					<dc:creator>${escapeXml(doc.data.contributor || 'Anonymous')}</dc:creator>
					<dc:language>${language}</dc:language>
				`,
			};
		}),
		customData: `
			<language>en</language>
			<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
			<atom:link href="${context.site}/rss/level-${LEVEL}.xml" rel="self" type="application/rss+xml" />
		`,
	});
}

function escapeXml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
