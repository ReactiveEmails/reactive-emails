import { app, BrowserWindow, ipcMain } from 'electron';
import type { Browser, Page } from 'puppeteer-core';
import puppeteer from 'puppeteer-core';
import pie from 'puppeteer-in-electron';
import onetime from 'onetime';
import { addEmailToAdminConsole } from './admin-console.js';

export const getPuppeteerBrowser = onetime(
	async () => pie.connect(app, puppeteer as any) as unknown as Promise<Browser>
);

export async function initializePuppeteerHandlers() {
	ipcMain.on('initialize-puppeteer', async () => {
		const browser = await getPuppeteerBrowser();
		const window = BrowserWindow.getAllWindows().find((w) => !w.isDestroyed())!;
		const headlessBrowserWindow = new BrowserWindow();

		const headfullPage = (await pie.getPage(
			browser as any,
			window
		)) as unknown as Page;
		const headlessPage = (await pie.getPage(
			browser as any,
			headlessBrowserWindow
		)) as unknown as Page;

		await addEmailToAdminConsole({
			headfullPage,
			headlessPage,
			browser,
			email: 'myemail@leonzalion.com',
		});
	});
}

export async function openGoogleWorkspaceLogin(page: Page) {
	await page.goto('https://admin.google.com/ac/apps/gmail/routing');
}
