import { createRequire } from 'node:module';
import * as fs from 'node:fs';
import * as path from 'node:path';
import puppeteer from 'puppeteer';
import $ from 'jquery';
import pWaitFor from 'p-wait-for';

const require = createRequire(import.meta.url);

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
await page.setBypassCSP(true);

// Load cookies if available
if (fs.existsSync('cookies.json')) {
	const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8')) as any[];
	await page.setCookie(...cookies);
}

console.info('Navigating to Sign in page...');
await page.goto('https://accounts.google.com/signin/v2');

console.info('Waiting for myaccount.google.com...');
await pWaitFor(() => page.url().startsWith('https://myaccount.google.com'));

const cookies = await page.cookies();
const cookiesJson = JSON.stringify(cookies);

fs.writeFileSync('cookies.json', cookiesJson);

console.info('Navigating to admin console...');
await page.goto('https://admin.google.com/ac/apps/gmail/routing');

console.info('Waiting for admin.google.com...');
await pWaitFor(() => page.url().startsWith('https://admin.google.com'));

console.info('Loading jQuery onto the page...');
await page.evaluate(
	fs.readFileSync(path.join(require.resolve('jquery')), 'utf8')
);

console.info('Finding the email address list edit button...');
await page.evaluate(() => {
	console.log($('tr:contains("Service Emails Forwarding")')
		.children('a:contains("Edit")')
		.attr('id', 'edit-button'));
});

console.info('Pressing the edit button...');
const serviceEmailsEditButton = await page.$('#edit-button');
console.log(serviceEmailsEditButton);
await serviceEmailsEditButton?.click();
