<script setup lang="ts">
import {
	mdiAlert,
	mdiCheckCircle,
	mdiContentCopy,
	mdiEye,
	mdiEyeOff,
} from '@mdi/js';
import { copyToClipboard, Notify } from 'quasar';
import {
	defaultReactiveHashCharacterSet,
	defaultReactiveHashLength,
	generateReactiveHash,
} from 'reactive-emails';
import { watch } from 'vue';

let purpose = $ref('');
const reactiveHashSecret = $ref('mysecret');
const versionNumber = $ref(1);
const isReactiveHashVisible = $ref(true);
const showAdvancedOptions = $ref(false);
const reactiveHashCharacterSet = $ref(defaultReactiveHashCharacterSet);
const reactiveHashLength = $ref(defaultReactiveHashLength);
let customDomain = $ref(false);

let originalEmail = $ref('me@gmail.com');
function onOriginalEmailChange(event: Event) {
	const email = (event.target as HTMLInputElement).value;

	// Only update the email if there is only one @ symbol
	if ([...email].filter((char) => char === '@').length > 1) return;

	originalEmail = email;
}

// Whether the user has toggled the custom domain option
const hasCustomDomainBeenToggled = $ref(false);

const baseAddress = $computed(() => originalEmail.split('@')[0] ?? '');
const domain = $computed(() => originalEmail.split('@')[1] ?? '');

function onPurposeChange(event: Event) {
	purpose = (event.target as HTMLInputElement).value.toLowerCase();
}

const commonEmailDomains = new Set([
	'outlook.com',
	'gmail.com',
	'yahoo.com',
	'yahoo.ca',
	'inbox.com',
	'mail.com',
]);

// Automatically toggling on custom email
watch(
	() => originalEmail,
	(email) => {
		if (hasCustomDomainBeenToggled) return;

		if (commonEmailDomains.has(email.split('@')[1])) {
			customDomain = false;
		} else {
			customDomain = true;
		}
	}
);

const reactiveHash = $computed(() =>
	generateReactiveHash({
		purpose,
		secret: reactiveHashSecret,
		versionNumber,
		characterSet:
			reactiveHashCharacterSet.length === 0
				? defaultReactiveHashCharacterSet
				: reactiveHashCharacterSet,
		length: reactiveHashLength,
	})
);

const rawReactiveHash = $computed(() =>
	generateReactiveHash({
		purpose,
		secret: reactiveHashSecret,
		versionNumber,
		raw: true,
	})
);

const reactiveEmail = $computed(() => {
	const reactiveEmailBaseAddress =
		baseAddress.length === 0 ? 'me' : baseAddress;

	if (customDomain) {
		return `${purpose}.${versionNumber}.${reactiveHash}@${domain}`;
	} else {
		return `${reactiveEmailBaseAddress}+${purpose}.${versionNumber}.${reactiveHash}@${domain}`;
	}
});

async function copyReactiveEmailToClipboard() {
	try {
		await copyToClipboard(reactiveEmail);
		Notify.create({
			message: 'Successfully copied to clipboard!',
			type: 'positive',
			icon: mdiCheckCircle,
		});
	} catch {
		Notify.create({
			message: "Couldn't copy to clipboard.",
			type: 'negative',
			icon: mdiAlert,
		});
	}
}
</script>

<template>
	<div>
		<h1 class="py-4 text-4xl font-bold text-center">Reactive Emails Demo</h1>
		<div class="border-2 rounded-md max-w-xl p-8 mx-auto">
			<div class="column gap-5 items-center">
				<div
					class="grid grid-cols-[max-content,1fr] text-right items-center gap-x-1 gap-y-2 max-w-full"
				>
					<strong class="text-lg">Original Email:</strong>
					<input
						:value="originalEmail"
						type="email"
						class="input input-sm input-bordered !outline-none"
						@input="onOriginalEmailChange"
					/>
					<strong class="text-lg">Reactive Email:</strong>
					<div class="relative w-full overflow-hidden">
						<input
							v-autowidth
							readonly
							:value="reactiveEmail"
							type="email"
							class="!max-w-full input input-sm input-bordered !outline-none bg-gray-200 min-w-full pr-6.5"
						/>
						<button
							class="absolute top-1/2 transform -translate-y-1/2 right-0 mr-1.5 cursor-pointer"
							@click="copyReactiveEmailToClipboard"
						>
							<v-icon size="20px" :icon="mdiContentCopy" />
						</button>
					</div>
				</div>

				<div class="grid grid-cols-2 gap-x-2 gap-y-1 text-right">
					<strong>Email Purpose:</strong>
					<input
						:value="purpose"
						placeholder='(e.g., "amazon", "instagram")'
						class="input input-xs input-bordered !outline-none w-[200px]"
						@input="onPurposeChange"
					/>

					<strong>Version Number:</strong>
					<input
						v-model.number="versionNumber"
						type="number"
						min="1"
						class="input input-xs input-bordered !outline-none w-15"
					/>

					<strong>Reactive Hash Secret:</strong>
					<div class="relative">
						<input
							v-model="reactiveHashSecret"
							:type="isReactiveHashVisible ? 'text' : 'password'"
							class="input input-xs input-bordered !outline-none pr-6.5 w-full"
						/>
						<button
							class="absolute right-0 mr-1.5 cursor-pointer"
							@click.stop="isReactiveHashVisible = !isReactiveHashVisible"
						>
							<v-icon
								size="18px"
								:icon="isReactiveHashVisible ? mdiEye : mdiEyeOff"
							/>
						</button>
					</div>
				</div>

				<q-checkbox
					v-model="showAdvancedOptions"
					size="xs"
					label="Show Advanced Options"
					@mousedown.prevent
				/>

				<div
					v-show="showAdvancedOptions"
					class="grid grid-cols-2 items-center gap-x-2 gap-y-1 text-right"
				>
					<div class="column">
						<strong>Custom Domain</strong>
						<span class="text-xs text-gray-500">
							Removes the need for plus-addresses.
						</span>
					</div>

					<div class="row">
						<!-- @mousedown.prevent prevents text from being selected on double click -->
						<q-checkbox
							v-model="customDomain"
							size="xs"
							@update:model-value="hasCustomDomainBeenToggled = true"
							@mousedown.prevent
						>
						</q-checkbox>
					</div>

					<strong>Reactive Hash Length:</strong>
					<input
						v-model.number="reactiveHashLength"
						type="number"
						min="1"
						class="input input-xs input-bordered !outline-none w-15"
					/>

					<strong class="mt-1">Reactive Hash Character Set:</strong>
					<input
						v-model.number="reactiveHashCharacterSet"
						v-autowidth
						minlength="1"
						class="mt-1 input input-xs input-bordered !outline-none w-15"
					/>

					<div class="column">
						<strong>Raw Reactive Hash</strong>
						<span class="text-xs text-gray-500">
							The SHA256 hash of the reactive email before applying the
							character set mapping:
							<div class="mt-1 text-[0.6rem] break-all">
								<code>
									<span class="text-black">sha256(</span>
									<span class="text-gray-600">
										{{ `${purpose}${versionNumber}${reactiveHashSecret}` }}
									</span>
									<span class="text-black">)</span>
								</code>
							</div>
						</span>
					</div>

					<code class="text-left break-all overflow-scroll">{{
						rawReactiveHash
					}}</code>
				</div>

				<div class="text-gray-500 text-center">
					<strong>Note:</strong> The information entered in this demo never
					leaves your device. The reactive emails are generated entirely within
					your browser.
				</div>
			</div>
		</div>
	</div>
</template>
