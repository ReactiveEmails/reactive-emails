import vue from '@vitejs/plugin-vue';
import { join } from 'desm';
import { getProjectDir } from 'lionconfig';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Plugin } from 'rollup';
import jsImports from 'rollup-plugin-js-imports';
import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';

function readmeLoader(): Plugin {
	const readmePath = path.join(
		getProjectDir(import.meta.url, { monorepoRoot: true }),
		'readme.md'
	);

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
		}),
		WindiCSS(),
		readmeLoader(),
		jsImports() as any,
	],
	build: {
		target: 'es2022',
	},
});
