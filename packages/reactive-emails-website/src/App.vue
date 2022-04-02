<script setup lang="ts">
import readme from '~readme';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();
</script>

<template>
	<div class="column w-full items-center mt-20">
		<div class="prose-lg text-left max-w-5xl" v-html="md.render(readme)"></div>
	</div>
</template>
