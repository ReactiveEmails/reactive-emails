/* eslint-disable @typescript-eslint/naming-convention */

import shajs from 'sha.js';

export const rawReactiveHashCharacterMap = {
	'0': 'b',
	'1': 'b',
	'2': 'd',
	'3': 'd',
	'4': 'h',
	'5': 'h',
	'6': 'm',
	'7': 'm',
	'8': 'n',
	'9': 'n',
	a: 'q',
	b: 'q',
	c: 'v',
	d: 'v',
	e: 'z',
	f: 'z',
};

type GenerateReactiveHashProps = {
	purpose: string;
	versionNumber: number;
	reactiveHashSecret: string;
};
export function generateReactiveHash({
	purpose,
	versionNumber,
	reactiveHashSecret,
}: GenerateReactiveHashProps) {
	const rawReactiveHash = shajs('sha256')
		.update(`${purpose}${versionNumber}${reactiveHashSecret}`)
		.digest('hex')
		.slice(0, 5);

	const reactiveHashArray = [];
	for (const char of rawReactiveHash) {
		reactiveHashArray.push(
			rawReactiveHashCharacterMap[
				char as keyof typeof rawReactiveHashCharacterMap
			]
		);
	}

	return reactiveHashArray.join('');
}

type GenerateReactiveEmailProps = GenerateReactiveHashProps & {
	domain: string;
};
export function generateReactiveEmail({
	purpose,
	versionNumber,
	reactiveHashSecret,
	domain,
}: GenerateReactiveEmailProps) {
	const reactiveHash = generateReactiveHash({
		purpose,
		versionNumber,
		reactiveHashSecret,
	});
	return `${purpose}${versionNumber}${reactiveHash}@${domain}`;
}
