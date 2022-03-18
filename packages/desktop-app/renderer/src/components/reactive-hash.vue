<script lang="ts" setup>
import { computed, ref } from 'vue';

const rawString = ref('Hello World');
/**
 * window.nodeCrypto was exposed from {@link module:preload}
 */
const hashedString = computed(() =>
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
	window.nodeCrypto.sha256sum(rawString.value)
);
</script>

<template>
	<label>
		Raw value
		<input v-model="rawString" type="text" />
	</label>
	<br />
	<label>
		Hashed by node:crypto
		<input v-model="hashedString" type="text" readonly />
	</label>
	<br /><br />
	<code>renderer/src/components/reactive-hash.vue</code>
</template>
