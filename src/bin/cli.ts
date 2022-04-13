import { program } from 'commander';
import process from 'node:process';

import {
	generateReactiveEmail,
	generateReactiveHash,
} from '~/utils/generate.js';

program
	.showHelpAfterError()
	.requiredOption('-p, --purpose <purpose>', 'the purpose of the email')
	.requiredOption(
		'-n, --version-number <version-number>',
		'the version number of the email'
	)
	.requiredOption('-s, --secret <secret>', 'the reactive hash secret')
	.option(
		'-c, --character-set <character-set>',
		'the character set to use for the reactive email'
	)
	.option('-l, --length <length>', 'the length of the reactive hash')
	.option('-d, --domain <domain>', 'the domain of the email')
	.option('-h, --hash', 'generate the reactive hash instead of the email');

const { purpose, versionNumber, hash, secret, domain, length, characterSet } =
	program.parse().opts<{
		purpose: string;
		versionNumber: string;
		secret: string;
		hash?: boolean;
		domain?: string;
		length?: string;
		characterSet?: string;
	}>();

if (hash) {
	process.stdout.write(
		generateReactiveHash({
			purpose,
			secret,
			versionNumber: Number(versionNumber),
			characterSet,
			length: length === undefined ? undefined : Number(length),
		})
	);
} else {
	process.stdout.write(
		generateReactiveEmail({
			domain: domain ?? 'example.com',
			purpose,
			reactiveHashSecret: secret,
			versionNumber: Number(versionNumber),
			reactiveHashOptions: {
				characterSet,
				length: length === undefined ? undefined : Number(length),
			},
		})
	);
}
