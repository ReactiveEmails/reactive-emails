import mockArgv from 'mock-argv';
import { expect, test } from 'vitest';
import { mockProcessStdout } from 'vitest-mock-process';

import {
	defaultReactiveHashCharacterSet,
	generateReactiveEmail,
} from '~/index.js';
import { defaultReactiveHashLength } from '~/utils/generate.js';

test('generates correct reactive email', () => {
	expect(
		generateReactiveEmail({
			purpose: 'Amazon',
			versionNumber: 1,
			reactiveHashSecret: 'mysecret',
			domain: 'example.com',
		})
	).toEqual('Amazon.1.nbqzn@example.com');

	expect(
		generateReactiveEmail({
			purpose: 'Amazon',
			reactiveHashSecret: 'mysecret',
			versionNumber: 2,
			domain: 'example.com',
		})
	).toEqual('Amazon.2.dbzzm@example.com');

	expect(
		generateReactiveEmail({
			purpose: 'Amazon',
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
			purpose: 'Amazon',
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

test('cli works', async () => {
	const mockStdout = mockProcessStdout();
	await mockArgv(
		['--purpose', 'amazon', '--secret', 'mysecret', '--version-number', '1'],
		async () => {
			await import('~/bin/cli.js');
			expect(mockStdout).toHaveBeenCalledWith('amazon.1.nnnbn@example.com');
		}
	);
});
