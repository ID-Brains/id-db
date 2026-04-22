import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

/**
 * Master RSS feed - includes all content across all levels
 * URL: /rss.xml
 */
export async function GET(context: APIContext) {
	const docs = await getCollection('docs');

	// Filter and sort items
	const items = docs
		.filter((doc) => {
			// Only include items with valid dates
			return doc.data.date && !isNaN(new Date(doc.data.date).getTime());
		})
		.sort((a, b) => {
			const dateA = new Date(a.data.date).getTime();
			const dateB = new Date(b.data.date).getTime();
			return dateB - dateA;
		})
		.slice(0, 50); // Limit to 50 most recent items

	return rss({
		title: 'Project Hikma - All Content',
		description:
			'Latest academic notes, summaries, and resources from Project Hikma - the student-driven knowledge base inspired by Bayt al-Hikma.',
		site: context.site?.toString() || 'https://ID-Brains.github.io/id-db',
		items: items.map((doc) => {
			const pubDate = new Date(doc.data.date);
			const language = doc.data.language || 'en';
			const level = doc.data.level;
			const term = doc.data.term;

			// Build categories from tags and metadata
			const categories = [
				doc.data.subject,
				`Level ${level}`,
				`Term ${term}`,
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
					<dc:subject>${escapeXml(doc.data.subject || '')}</dc:subject>
				`,
			};
		}),
		customData: `
			<language>en</language>
			<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
			<atom:link href="${context.site}/rss.xml" rel="self" type="application/rss+xml" />
			<image>
				<url>${context.site}/Hikma_icon.svg</url>
				<title>Project Hikma</title>
				<link>${context.site}</link>
			</image>
		`,
		stylesheet: '/rss/styles.xsl',
	});
}

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
