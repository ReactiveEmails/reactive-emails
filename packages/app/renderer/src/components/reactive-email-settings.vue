<script setup lang="ts">
import {
	mdiClipboardOutline,
	mdiEyeOffOutline,
	mdiEyeOutline,
	mdiRefresh,
} from '@mdi/js';
import clipboard from 'clipboardy';
import { nanoid } from 'nanoid-nice';
import { generateReactiveHash } from 'reactive-emails';
import { notify } from 'vue3-notify';

const shouldUseCustomDomain = $ref(false);
const domain = $ref('');
const emailUsername = $ref('');

let reactiveHashSecret = $ref('');
const isPasswordVisible = $ref(false);

/**
 * Generates a random 20-character reactive hash secret
 */
function generateReactiveHashSecret() {
	reactiveHashSecret = nanoid(20);
}

async function copyReactiveHashSecretToClipboard() {
	await clipboard.write(reactiveHashSecret);
	notify({
		text: 'Successfully copied to clipboard!',
		type: 'success',
	});
}

const exampleEmail = $computed(() => {
	const purpose = 'example';
	const versionNumber = 1;
	const reactiveHash = generateReactiveHash({
		purpose,
		secret: reactiveHashSecret,
		versionNumber,
	});

	if (shouldUseCustomDomain) {
		return `${purpose}.${versionNumber}.${reactiveHash}@${domain}`;
	} else {
		return `${emailUsername}+${purpose}.${versionNumber}.${reactiveHash}@${domain}`;
	}
});
</script>

<template>
	<div class="column gap-4 rounded-md border-1 m-4 p-4">
		<div class="column">
			<div class="grid grid-cols-[max-content,1fr] items-center gap-1">
				<label class="font-bold" for="custom-domain">Use Custom Domain?</label>
				<input
					id="custom-domain"
					v-model="shouldUseCustomDomain"
					type="checkbox"
					class="h-4 w-4 mt-0.2"
				/>

				<template v-if="shouldUseCustomDomain">
					<div class="column items-end">
						<label for="email-username">
							<span class="font-bold">Custom Domain</span>
						</label>
						<div class="text-[0.65rem]">
							(&lt;username&gt;@<span class="underline font-bold"
								>&lt;domain&gt;</span
							>)
						</div>
					</div>
					<input
						id="email-username"
						v-model="domain"
						class="border-2 rounded-sm p-2 h-8 text-sm"
					/>
				</template>
				<template v-else>
					<div class="column items-end">
						<label for="email-username">
							<span class="font-bold">Email Username</span>
						</label>
						<div class="text-[0.65rem]">
							(<span class="underline font-bold">&lt;username&gt;</span
							>@&lt;domain&gt;)
						</div>
					</div>
					<input
						id="email-username"
						v-model="emailUsername"
						class="border-2 rounded-sm p-2 h-8 text-sm"
					/>
					<div class="column items-end">
						<label for="email-domain">
							<span class="font-bold">Email Domain</span>
						</label>
						<div class="text-[0.65rem]">
							(&lt;username&gt;@<span class="underline font-bold"
								>&lt;domain&gt;</span
							>)
						</div>
					</div>
					<input
						id="email-domain"
						v-model="domain"
						class="border-2 rounded-sm p-2 h-8 text-sm"
						placeholder='(e.g., "gmail.com", "outlook.com", etc.)'
					/>
				</template>
			</div>
		</div>

		<div>
			<label class="font-bold" for="reactive-hash-secret">
				Reactive Hash Secret
			</label>
			<div class="row gap-1">
				<div class="relative">
					<input
						v-model="reactiveHashSecret"
						class="text-lg p-2 pr-16 border-2 rounded-sm h-10 w-80"
						:type="isPasswordVisible ? 'text' : 'password'"
					/>
					<div
						class="absolute row gap-1 right-1.5 top-1/2 transform -translate-y-1/2"
					>
						<button
							data-tippy-content="Show or hide the reactive hash secret."
							@click="isPasswordVisible = !isPasswordVisible"
						>
							<VueIcon
								size="25"
								:icon="isPasswordVisible ? mdiEyeOffOutline : mdiEyeOutline"
							/>
						</button>
						<button
							data-tippy-content="Generate a random reactive hash."
							@click="generateReactiveHashSecret"
						>
							<VueIcon size="25" :icon="mdiRefresh" />
						</button>
						<button
							data-tippy-content="Copy the reactive hash to clipboard."
							@click="copyReactiveHashSecretToClipboard"
						>
							<VueIcon size="25" :icon="mdiClipboardOutline" />
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="font-bold">Example Email</div>
		<div>{{ exampleEmail }}</div>

		<button
			class="px-4 py-2 self-center bg-green-400 rounded-md text-white font-medium"
		>
			Save Settings
		</button>
	</div>
</template>
