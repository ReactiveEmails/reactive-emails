<script setup lang="ts">
const features = [
	{
		name: 'Isolated',
		description:
			'By using a separate email for each service, reactive emails limit the damage caused by accidental email address leaks and data breaches. In addition, the email for services can be individually changed without affecting other ones.',
	},
	{
		name: 'Deterministic',
		description:
			'Reactive emails are deterministically generated using a secret reactive hash that only you know. If you ever lose access to the reactive email you used for a service, you can easily recover it using your reactive hash.',
	},
];
</script>

<template>
	<div v-for="feature of features" :key="feature.name">
		<div>{{ feature.name }}</div>
		<div>{{ feature.description }}</div>
	</div>
</template>
