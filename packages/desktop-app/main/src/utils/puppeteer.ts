import { app, BrowserWindow, ipcMain } from 'electron';
import type { Browser, Page } from 'puppeteer-core';
import puppeteer from 'puppeteer-core';
import pie from 'puppeteer-in-electron';
import onetime from 'onetime';

export const getPuppeteerBrowser = onetime(
	async () => pie.connect(app, puppeteer as any) as unknown as Promise<Browser>
);

export async function openPuppeteerPage() {
	const browser = await getPuppeteerBrowser();
	const window = BrowserWindow.getAllWindows().find((w) => !w.isDestroyed())!;
	const page = (await pie.getPage(browser as any, window)) as unknown as Page;
	return page;
}

export async function initializePuppeteerHandlers() {
	ipcMain.on('initialize-puppeteer', async () => {
		console.log('test');
		await openGoogleWorkspaceLogin(await openPuppeteerPage());
	});
}

export async function openGoogleWorkspaceLogin(page: Page) {
	await page.goto('https://accounts.google.com/signin/v2/identifier');
	await page.goto('https://admin.google.com/ac/apps/gmail/routing');
}
