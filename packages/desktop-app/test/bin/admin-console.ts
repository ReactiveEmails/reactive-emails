import { createRequire } from 'node:module';
import * as fs from 'node:fs';
import * as path from 'node:path';
import puppeteer from 'puppeteer';
import $ from 'jquery';
import pWaitFor from 'p-wait-for';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz');

const require = createRequire(import.meta.url);

fs.mkdirSync('context', { recursive: true });
const browser = await puppeteer.launch({
	headless: false,
	userDataDir: 'context',
});
const page = await browser.newPage();
await page.setBypassCSP(true);

console.info('Navigating to Sign in page...');
await page.goto('https://accounts.google.com/signin/v2');

console.info('Waiting for myaccount.google.com...');
await pWaitFor(() => page.url().startsWith('https://myaccount.google.com'));

console.info('Navigating to Address Lists in Admin Console...');
await page.goto('https://admin.google.com/ac/apps/gmail/manageaddresslist');

console.info('Waiting for admin.google.com...');
await pWaitFor(() => page.url().startsWith('https://admin.google.com'));

console.info('Loading jQuery onto the page...');
await page.evaluate(
	fs.readFileSync(path.join(require.resolve('jquery')), 'utf8')
);

const clickInPage = async (elementId: string) => {
	await page.evaluate((elementId: string) => {
		// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
		(document.querySelector(`#${elementId}`) as HTMLElement).click();
	}, elementId);
};

{
	console.info('Finding the email address list edit button...');
	const elementId = nanoid();
	await page.waitForFunction(
		(elementId: string) =>
			$('tr:contains("Service Emails")')
				.find('a:contains("Edit")')
				.attr('id', elementId).length > 0,
		{},
		elementId
	);
	await clickInPage(elementId);
}

{
	console.info('Finding the bulk add addresses button...');
	const elementId = nanoid();
	await page.waitForFunction(
		(elementId: string) =>
			$('div[role="button"]')
				.filter(function () {
					return $(this).find('span:contains("Bulk-add addresses")').length > 0;
				})
				.eq(0)
				.attr('id', elementId).length > 0,
		{},
		elementId
	);
	await clickInPage(elementId);
}

{
	console.info('Finding the email address textbox...');
	const elementId = nanoid();
	await page.waitForFunction(
		(elementId: string) =>
			$('textarea[aria-label="Email address or domain name:"]').attr(
				'id',
				elementId
			).length > 0,
		{},
		elementId
	);

	await page.evaluate((elementId: string) => {
		// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
		(document.querySelector(`#${elementId}`) as HTMLTextAreaElement).value =
			'myemail@leonzalion.com';
	}, elementId);
}

{
	console.info('Finding the add addresses button...');
	const elementId = nanoid();
	await page.waitForFunction(
		(elementId: string) =>
			$('div[role="dialog"][aria-label*="Bulk-add addresses"]')
				.eq(0)
				.find('div[role="button"]')
				.filter(function () {
					console.log($(this).find('*'));
					return $(this).find('span:contains("Add")').length > 0;
				})
				.eq(0)
				.attr('id', elementId).length > 0,
		{},
		elementId
	);
	await clickInPage(elementId);
}

{
	console.info('Pressing the Save button...');
	const elementId = nanoid();
	await page.waitForFunction(
		(elementId: string) =>
			$('div[role="dialog"][aria-label*="Edit address list"]')
				.eq(0)
				.find('div[role="button"]:contains("Save")')
				.eq(0)
				.attr('id', elementId).length > 0,
		{},
		elementId
	);
	await clickInPage(elementId);
}

await page.waitForFunction(
	() => $('div:contains("Manage address lists settings updated"').length > 0
);

await browser.close();
