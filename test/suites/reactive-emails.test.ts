import { expect, test } from 'vitest';
import { generateReactiveEmail } from '~/index.js';

test('generates correct reactive email', () => {
	expect(
		generateReactiveEmail({
			purpose: 'github',
			reactiveHashSecret: 'mysecret',
			versionNumber: 1,
			domain: 'example.com',
		})
	).toEqual('github1bmzvd@example.com');

	expect(
		generateReactiveEmail({
			purpose: 'github',
			reactiveHashSecret: 'mysecret',
			versionNumber: 2,
			domain: 'example.com',
		})
	).toEqual('github2nmbvm@example.com');
});
