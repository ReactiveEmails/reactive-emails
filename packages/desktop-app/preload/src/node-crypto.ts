import { type BinaryLike, createHash } from 'node:crypto';
import { ipcRenderer } from 'electron';
import { exposeInMainWorld } from './expose-in-main-world.js';

function sha256sum(data: BinaryLike) {
	ipcRenderer.send('initialize-puppeteer');
	return createHash('sha256').update(data).digest('hex');
}

// Export for types in contracts.d.ts
export const nodeCrypto = { sha256sum } as const;

exposeInMainWorld('nodeCrypto', nodeCrypto);
