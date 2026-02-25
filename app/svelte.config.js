import autoAdapter from '@sveltejs/adapter-auto';
import nodeAdapter from '@sveltejs/adapter-node';
import vercelAdapter from '@sveltejs/adapter-vercel';
// import adapter from 'svelte-adapter-bun'
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import { mdsvexOptions } from './mdsvex.config.js';
import { configDotenv } from 'dotenv';
configDotenv();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	vitePlugin: {
		inspector: true
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: process.env.NOT_VERCEL
			? nodeAdapter({
					out: 'build',
					precompress: { brotli: true, gzip: true }
				})
			: process.env.VERCEL
				? vercelAdapter({ runtime: 'nodejs24.x' })
				: autoAdapter({
						assets: true,
						precompress: { brotli: true, gzip: true }
					}) 
	}
};
export default config;
