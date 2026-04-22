// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import starlightGiscus from 'starlight-giscus';
import { starlightKatex } from 'starlight-katex';

const tailwindPlugin = /** @type {any} */ (tailwindcss());

// https://astro.build/config
export default defineConfig({
	site: 'https://ID-Brains.github.io/',
	base: '/id-db',
	vite: /** @type {any} */ ({
		resolve: /** @type {any} */ ({
			tsconfigPaths: true,
		}),
		plugins: [tailwindPlugin],
		globs: ['src/**/*.js'],
		exclude: ['node_modules'],
	}),
	integrations: [
		starlight({
			title: 'project-hikma',
			logo: {
				src: './public/Hikma_icon.svg',
			},
			favicon: '/Hikma_icon.svg',
			disable404Route: true,
			customCss: ['./src/styles/global.css'],
			tableOfContents: false,
			components: {
				Head: './src/components/starlight/Head.astro',
				Header: './src/components/starlight/CustomHeader.astro',
				MobileMenuFooter: './src/components/starlight/MobileMenuFooter.astro',
				Footer: './src/components/starlight/Footer.astro',
				Sidebar: './src/components/starlight/CustomSidebar.astro',
				PageTitle: './src/components/Ai_PageTitle.astro',
			},
			plugins: [
				starlightKatex(),
				starlightGiscus(/** @type {any} */ ({
					repo: 'ID-Brains/id-db',
					repoId: 'R_kgDOR9twsg',
					category: 'Q&A',
					categoryId: 'DIC_kwDOR9twss4C6rJv',
					mapping: 'pathname',
					reactionsEnabled: true,
					inputPosition: 'top',
					theme: 'preferred_color_scheme',
					lang: 'en',
					lazy: true,
				})),
			],

			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ID-Brains/id-db' }],
			sidebar: [
				{
					label: 'Level 1',
					collapsed: true,
					autogenerate: { directory: 'docs/level-1' },
				},
				{
					label: 'Level 2',
					collapsed: true,
					autogenerate: { directory: 'docs/level-2' },
				},
				{
					label: 'Level 3',
					collapsed: true,
					autogenerate: { directory: 'docs/level-3' },
				},
				{
					label: 'Level 4',
					collapsed: true,
					autogenerate: { directory: 'docs/level-4' },
				},
			],
		}),
	],
});
