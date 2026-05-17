import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const CONTENT_TYPES = ['summary', 'quiz', 'notes', 'reference'] as const;

const contentSchema = z
	.object({
		title: z.string(),
		date: z.date(),
		description: z.string(),
		type: z.enum(CONTENT_TYPES).optional(),
		subject: z.string(),
		level: z.number().min(1).max(4),
		term: z.number().min(1).max(2),
		contributor: z.string(),
		tags: z.array(z.string()),
		language: z.enum(['ar', 'en']),
		giscus: z.boolean().optional(),
		isAiGenerated: z.boolean().optional(),
	})
	.transform((data) => ({
		...data,
		dir: data.language === 'ar' ? 'rtl' : 'ltr',
	}));

export type Format = {
	title: string;
	date: Date;
	description: string;
	type?: (typeof CONTENT_TYPES)[number];
	subject: string;
	level: number;
	term: number;
	contributor: string;
	tags: string[];
	language: 'ar' | 'en';
	giscus?: boolean;
	isAiGenerated?: boolean;
	dir: 'ltr' | 'rtl';
};

export const collections = {
	docs: defineCollection({
		schema: docsSchema({ extend: contentSchema }),
	}),
};
