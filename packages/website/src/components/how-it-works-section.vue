<script setup lang="ts">
import 'github-markdown-css';

import Markdown from 'markdown-it';

import rawReadme from '~readme';

// Strip the title away from the readme
const readme = rawReadme.split('\n').slice(1).join('\n');
const md = new Markdown();
</script>

<template>
	<div class="w-full overflow-x-hidden">
		<div class="text-center text-4xl font-bold mt-3 mb-6">How it Works</div>
		<div class="markdown-body" v-html="md.render(readme)"></div>
	</div>
</template>
