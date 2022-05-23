<script setup lang="ts">
import { generateReactiveHash } from 'reactive-emails';

import { useReactiveEmailSettingsStore } from '~r/store/reactive-email-settings.js';

const reactiveEmailSettings = useReactiveEmailSettingsStore();

function onPurposeChange(event: Event) {
	reactiveEmailSettings.purpose = (
		event.target as HTMLInputElement
	).value.toLowerCase();
}

function onVersionNumberChange(event: Event) {
	reactiveEmailSettings.versionNumber = Number(
		(event.target as HTMLInputElement).value
	);
}

const reactiveHash = $computed(() =>
	generateReactiveHash({
		purpose: reactiveEmailSettings.purpose,
		secret: reactiveEmailSettings.reactiveHashSecret,
		versionNumber: reactiveEmailSettings.versionNumber,
	})
);

function generateReactiveEmail() {
	const { purpose, versionNumber, domain, customDomain, emailUsername } =
		reactiveEmailSettings;

	if (customDomain) {
		return `${purpose}${versionNumber}${reactiveHash}@${domain}`;
	} else {
		if (emailUsername === undefined) {
			throw new Error(
				'Email username must be provided if not using custom domain.'
			);
		}

		return `${emailUsername}+${purpose}${versionNumber}${reactiveHash}@${domain}`;
	}
}
</script>

<template>
	<label for="purpose">Purpose</label>
	<input id="purpose" type="text" @change="onPurposeChange" />
	<label for="version-number">Version Number</label>
	<input id="version-number" type="number" @change="onVersionNumberChange" />
	<button @click="generateReactiveEmail">Generate Email</button>
</template>
