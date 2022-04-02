import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import * as fs from 'fs';
import * as path from 'path';
import { Plugin } from 'rollup';
import { getProjectDir } from 'lion-system';

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
	plugins: [vue(), WindiCSS(), readmeLoader()],
});
