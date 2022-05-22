<script setup lang="ts">
import HowItWorksSection from '~/components/how-it-works-section.vue';
import PageFooter from '~/components/page-footer.vue';
import ReactiveEmailsDemo from '~/components/reactive-emails-demo.vue';
</script>

<template>
	<div class="column pt-8 items-stretch w-full">
		<div class="max-w-6xl column gap-5 items-center w-full px-8">
			<ReactiveEmailsDemo />
			<HowItWorksSection />
		</div>
		<PageFooter class="mt-auto" />
	</div>
</template>

<style>
html,
body,
#app {
	height: 100%;
}
</style>
