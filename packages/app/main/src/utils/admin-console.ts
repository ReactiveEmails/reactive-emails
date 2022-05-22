import $ from 'jquery';
import { customAlphabet } from 'nanoid';
import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as path from 'node:path';
import pWaitFor from 'p-wait-for';
import type { Browser, Page } from 'puppeteer-core';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz');

const require = createRequire(import.meta.url);

async function updateAddressLists(headlessPage: Page, email: string) {
	console.info('Navigating to Address Lists in Admin Console...');
	await headlessPage.goto(
		'https://admin.google.com/ac/apps/gmail/manageaddresslist'
	);

	console.info('Waiting for admin.google.com...');
	await pWaitFor(() =>
		headlessPage.url().startsWith('https://admin.google.com')
	);

	console.info('Loading jQuery onto the page...');
	await headlessPage.evaluate(
		fs.readFileSync(path.join(require.resolve('jquery')), 'utf8')
	);

	const clickInPage = async (elementId: string) => {
		await headlessPage.evaluate((elementId: string) => {
			// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
			(document.querySelector(`#${elementId}`) as HTMLElement).click();
		}, elementId);
	};

	{
		console.info('Finding the email address list edit button...');
		const elementId = nanoid();
		await headlessPage.waitForFunction(
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
		await headlessPage.waitForFunction(
			(elementId: string) =>
				$('div[role="button"]')
					.filter(function () {
						return (
							$(this).find('span:contains("Bulk-add addresses")').length > 0
						);
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
		await headlessPage.waitForFunction(
			(elementId: string) =>
				$('textarea[aria-label="Email address or domain name:"]').attr(
					'id',
					elementId
				).length > 0,
			{},
			elementId
		);

		await headlessPage.evaluate(
			(elementId: string, email: string) => {
				// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
				const element = document.querySelector(
					`#${elementId}`
				) as HTMLTextAreaElement;
				element.value = email;
			},
			elementId,
			email
		);
	}

	{
		console.info('Finding the add addresses button...');
		const elementId = nanoid();
		await headlessPage.waitForFunction(
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
		await headlessPage.waitForFunction(
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

	await headlessPage.waitForFunction(
		() => $('div:contains("Manage address lists settings updated")').length > 0
	);
}

type AddEmailToAdminConsoleProps = {
	email: string;
	headfullPage: Page;
	headlessPage: Page;
	browser: Browser;
};
export async function addEmailToAdminConsole({
	email,
	headfullPage,
	headlessPage,
	browser,
}: AddEmailToAdminConsoleProps) {
	fs.mkdirSync('context', { recursive: true });

	await headlessPage.setBypassCSP(true);

	console.info('Navigating to Sign in page...');
	await headlessPage.goto('https://accounts.google.com/signin/v2');

	if (headlessPage.url().startsWith('https://myaccount.google.com')) {
		// User is already logged in, we can auto-update the address lists
		await updateAddressLists(headlessPage, email);
	} else {
		await headfullPage.goto('https://accounts.google.com/signin/v2');

		// Wait for the user to log in
		console.info('Waiting for myaccount.google.com...');
		await pWaitFor(() =>
			headfullPage.url().startsWith('https://myaccount.google.com')
		);

		await browser.close();

		// Create a new page with the headless browser to update the address lists
		await updateAddressLists(headlessPage, email);
	}
}
