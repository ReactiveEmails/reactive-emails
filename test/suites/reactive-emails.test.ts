import { expect, test } from 'vitest';
import {
	defaultReactiveHashCharacterSet,
	generateReactiveEmail,
} from '~/index.js';
import { defaultReactiveHashLength } from '~/utils/generate.js';

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

	expect(
		generateReactiveEmail({
			purpose: 'amazon',
			reactiveHashSecret: 'mysecret',
			versionNumber: 1,
			domain: 'example.com',
			reactiveHashOptions: {
				characterSet: defaultReactiveHashCharacterSet,
				length: defaultReactiveHashLength,
			},
		})
	).toEqual(
		generateReactiveEmail({
			purpose: 'amazon',
			reactiveHashSecret: 'mysecret',
			versionNumber: 1,
			domain: 'example.com',
			reactiveHashOptions: {
				characterSet: defaultReactiveHashCharacterSet,
				length: defaultReactiveHashLength,
			},
		})
	);
});
