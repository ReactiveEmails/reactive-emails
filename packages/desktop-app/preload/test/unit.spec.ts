import * as process from 'node:process';
import { createHash } from 'node:crypto';
import { afterEach, expect, test, vi } from 'vitest';

const exposeInMainWorldMock = vi.fn();
vi.mock('electron', () => ({
	contextBridge: { exposeInMainWorld: exposeInMainWorldMock },
}));

afterEach(() => {
	vi.clearAllMocks();
});

test('versions', async () => {
	await import('../src/versions.js');
	expect(exposeInMainWorldMock).toBeCalledTimes(1);
	expect(exposeInMainWorldMock).lastCalledWith('versions', process.versions);
});

test('nodeCrypto', async () => {
	await import('../src/node-crypto.js');
	expect(exposeInMainWorldMock).toBeCalledTimes(1);
	expect(exposeInMainWorldMock.mock.calls[0]![0]).toBe('nodeCrypto');
	expect(exposeInMainWorldMock.mock.calls[0]![1]).toHaveProperty('sha256sum');

	const data = 'rawData';
	const expectedHash = createHash('sha256').update(data).digest('hex');

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	expect(exposeInMainWorldMock.mock.calls[0]![1].sha256sum(data)).toBe(
		expectedHash
	);
});
