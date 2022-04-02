/* eslint-disable @typescript-eslint/consistent-type-imports */

interface Exposed {
	readonly nodeCrypto: Readonly<
		typeof import('../../preload/src/node-crypto.js').nodeCrypto
	>;
	readonly versions: Readonly<
		typeof import('../../preload/src/versions.js').versions
	>;
}

interface Window extends Exposed {}
