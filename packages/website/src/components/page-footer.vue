<script setup lang="ts">
import { mdiGithub } from '@mdi/js';
</script>

<template>
	<div class="py-4 px-8">
		<div class="h-[1px] mb-4 bg-gray-300"></div>
		<div class="column items-center gap-1">
			<div>
				Created by
				<a
					class="text-blue-400 hover:text-blue-500"
					href="https://github.com/leonzalion"
				>
					Leon Si
				</a>
				<div></div>
			</div>
			<a
				href="https://github.com/ReactiveEmails"
				class="transition-transform transform hover:scale-105"
			>
				<v-icon :icon="mdiGithub" />
			</a>
		</div>
	</div>
</template>
