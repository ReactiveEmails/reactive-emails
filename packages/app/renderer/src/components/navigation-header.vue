<script setup lang="ts">
import { mdiCog } from '@mdi/js';
</script>

<template>
	<div class="row p-2">
		<div class="flex-1">
			<div class="mr-auto"></div>
		</div>
		<div class="flex-1 row justify-center font-bold">Reactive Emails</div>
		<div class="flex-1 row">
			<div class="ml-auto"></div>
			<router-link to="/settings">
				<VueIcon :icon="mdiCog"></VueIcon>
			</router-link>
		</div>
	</div>
</template>
