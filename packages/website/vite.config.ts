import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import vue from '@vitejs/plugin-vue';
import { join } from 'desm';
import { getProjectDir } from 'lion-system';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Plugin } from 'rollup';
import { defineConfig } from 'vite';
import jsImports from 'vite-plugin-js-imports';
import WindiCSS from 'vite-plugin-windicss';

function readmeLoader(): Plugin {
	const readmePath = path.join(getProjectDir(import.meta.url), 'readme.md');

	const readme = fs.readFileSync(readmePath, 'utf8');

	return {
		name: 'readme-loader',
		resolveId(source) {
			if (source === '~readme') {
				return source;
			}
		},
		load(id) {
			if (id === '~readme') {
				return `export default ${JSON.stringify(readme)}`;
			}
		},
	};
}

export default defineConfig({
	resolve: {
		alias: {
			'~': join(import.meta.url, 'src'),
		},
	},
	plugins: [
		vue({
			reactivityTransform: true,
			template: {
				transformAssetUrls,
			},
		}),
		quasar({}),
		WindiCSS(),
		readmeLoader(),
		jsImports(),
	],
	build: {
		target: 'es2022',
	},
});
