import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		/**
		 * A default timeout of 5000ms is sometimes not enough for playwright.
		 */
		testTimeout: 30_000,
		hookTimeout: 30_000,
	},
});
