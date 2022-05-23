<script setup lang="ts">
import {
	mdiClipboardOutline,
	mdiEyeOffOutline,
	mdiEyeOutline,
	mdiRefresh,
} from '@mdi/js';
import clipboard from 'clipboardy';
import { nanoid } from 'nanoid-nice';
import tippy from 'tippy.js';
import { onMounted } from 'vue';
import { notify } from 'vue3-notify';

let reactiveHashSecret = $ref('');
const isPasswordVisible = $ref(false);

onMounted(() => {
	tippy('[data-tippy-content]');
});

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
</script>

<template>
	<div class="column p-8">
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
	<VueNotifications />
</template>
