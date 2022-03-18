import { createRequire } from 'node:module';
import * as fs from 'node:fs';
import * as path from 'node:path';
import puppeteer from 'puppeteer';
import $ from 'jquery';
import pWaitFor from 'p-wait-for';

const __require = createRequire(import.meta.url);

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

console.info('Navigating to Sign in page...');
await page.goto('https://accounts.google.com/signin/v2');

console.info('Waiting for myaccount.google.com...');
await pWaitFor(() => {
	console.log(page.url());
	return page.url().startsWith('https://myaccount.google.com');
});

console.info('Navigating to admin console...');
await page.goto('https://admin.google.com/ac/apps/gmail/routing');

console.info('Waiting for admin.google.com...');
await pWaitFor(() => {
	console.log(page.url());
	return page.url().startsWith('https://admin.google.com');
});

console.info('Loading jQuery onto the page...');
await page.evaluate(
	fs.readFileSync(path.join(__require.resolve('jquery')), 'utf8')
);

console.info('Finding the email address list edit button...');
await page.evaluate(() => {
	$('tr:contains("Service Emails Forwarding"')
		.children('a:contains("Edit")')
		.attr('id', 'edit-button');
});

const serviceEmailsEditButton = await page.$('#edit-button');
await serviceEmailsEditButton?.click();
