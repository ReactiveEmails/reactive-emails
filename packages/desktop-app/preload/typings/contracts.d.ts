/* eslint-disable @typescript-eslint/consistent-type-imports */

interface Exposed {
	readonly nodeCrypto: Readonly<
		typeof import('../src/node-crypto.js').nodeCrypto
	>;
	readonly versions: Readonly<typeof import('../src/versions.js').versions>;
}

interface Window extends Exposed {}
