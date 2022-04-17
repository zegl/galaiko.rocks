import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

import { mdsvex } from 'mdsvex';
import image from 'svelte-image';

import slug from 'rehype-slug';
import autoLinkHeadings from 'rehype-autolink-headings';
import preview, { htmlFormatter } from 'remark-preview';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			smartypants: {
				dashes: 'oldschool'
			},
			layout: {
				posts: './src/routes/posts/_layout.svelte'
			},
			remarkPlugins: [
				preview(
					htmlFormatter({
						length: 10000,
						maxBlocks: 100,
						headings: true,
						ellipsis: true
					}),
					{
						attribute: 'html'
					}
				) // add html attribute to use in rss generation
			],
			rehypePlugins: [
				slug, // adds slug to headers
				[autoLinkHeadings, { behavior: 'wrap' }] //  adds a <a> around slugged headers
			]
		}),
		preprocess({ postcss: true, typescript: true }),
		image({
			optimizeRemote: true,
			placeholder: 'blur'
		})
	],
	kit: {
		adapter: adapter(),
		prerender: {
			default: true,
			enabled: true
		},
		trailingSlash: 'always'
	}
};

export default config;