import shajs from 'sha.js';

export const defaultReactiveHashCharacterSet = 'bdhmnqvz';
export const defaultReactiveHashLength = 5;

type GenerateReactiveHashProps = {
	purpose: string;
	versionNumber: number;
	secret: string;
	characterSet?: string;
	length?: number;
	raw?: boolean;

	/**
		If false, an array of digits will be returned instead of the resulting string from mapping the digits to characters using the character set.

		@default true
	*/
	mapCharacters?: boolean;
};

export function generateReactiveHash(
	props: Omit<GenerateReactiveHashProps, 'mapCharacters'> & {
		mapCharacters?: true;
	}
): string;
export function generateReactiveHash(
	props: Omit<GenerateReactiveHashProps, 'mapCharacters'> & {
		mapCharacters: false;
	}
): number[];
export function generateReactiveHash({
	purpose,
	versionNumber,
	secret,
	characterSet,
	length,
	raw,
	mapCharacters,
}: GenerateReactiveHashProps): number[] | string {
	const sha256Hash = shajs('sha256')
		.update(`${purpose}.${versionNumber}.${secret}`)
		.digest('hex');

	if (raw) {
		return sha256Hash;
	}

	const rawReactiveHashNumber = BigInt(`0x${sha256Hash}`);

	const reactiveHashCharacterSet =
		characterSet ?? defaultReactiveHashCharacterSet;

	const base = BigInt(reactiveHashCharacterSet.length);
	const lastDigits = [];
	const hashLength = BigInt(length ?? defaultReactiveHashLength);

	for (let i = hashLength - 1n; i >= 0; i -= 1n) {
		lastDigits.push((rawReactiveHashNumber / base ** i) % base);
	}

	mapCharacters = mapCharacters ?? true;
	if (!mapCharacters) {
		return lastDigits.map(Number);
	}

	const reactiveHash = lastDigits
		.map((digit) => reactiveHashCharacterSet.charAt(Number(digit)))
		.join('');

	return reactiveHash;
}

type GenerateReactiveEmailProps = {
	domain: string;
	purpose: string;
	versionNumber: number;
	reactiveHashSecret: string;
	reactiveHashOptions?: Omit<
		GenerateReactiveHashProps,
		'purpose' | 'versionNumber' | 'secret' | 'mapCharacters' | 'raw'
	>;
};
export function generateReactiveEmail({
	purpose,
	versionNumber,
	reactiveHashSecret,
	reactiveHashOptions,
	domain,
}: GenerateReactiveEmailProps) {
	const reactiveHash = generateReactiveHash({
		purpose,
		versionNumber,
		secret: reactiveHashSecret,
		...reactiveHashOptions,
	});
	return `${purpose}.${versionNumber}.${reactiveHash}@${domain}`;
}
