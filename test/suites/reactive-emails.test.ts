import { expect, test } from 'vitest';
import { generateReactiveEmail } from '~/index.js';

test('generates correct reactive email', () => {
	expect(
		generateReactiveEmail({
			purpose: 'github',
			versionNumber: 1,
			reactiveHashSecret: 'mysecret',
			domain: 'example.com',
		})
	).toEqual('github1hzvnz@example.com');

	expect(
		generateReactiveEmail({
			purpose: 'github',
			reactiveHashSecret: 'mysecret',
			versionNumber: 2,
			domain: 'example.com',
		})
	).toEqual('github2qnhnn@example.com');
});
