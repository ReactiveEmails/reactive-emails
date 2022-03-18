import { test } from 'vitest';
import puppeteer from 'puppeteer';

test('admin console', async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('https://admin.google.com/ac/apps/gmail/routing');
});
