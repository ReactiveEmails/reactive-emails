import inquirer from 'inquirer';

import { generateReactiveEmail, generateReactiveHash } from '~/index.js';

const { purpose, versionNumber, reactiveHashSecret } = await inquirer.prompt<{
	purpose: string;
	versionNumber: number;
	reactiveHashSecret: string;
}>([
	{
		name: 'purpose',
		type: 'input',
		message: 'What is the purpose of this email?',
	},
	{
		name: 'versionNumber',
		type: 'number',
		message: 'What is the version number of this email?',
	},
	{
		name: 'reactiveHashSecret',
		message: 'What is the reactive hash secret?',
		type: 'input',
	},
]);

console.info(
	'Raw Hash:',
	generateReactiveHash({
		purpose,
		secret: reactiveHashSecret,
		versionNumber,
		mapCharacters: false,
	})
);

console.info(
	'Reactive Email:',
	generateReactiveEmail({
		domain: 'example.com',
		purpose,
		reactiveHashSecret,
		versionNumber,
	})
);
