<script setup lang="ts">
import tippy from 'tippy.js';
import { onMounted } from 'vue';

import NavigationHeader from '~r/components/navigation-header.vue';

onMounted(() => {
	tippy('[data-tippy-content]');
});
</script>

<template>
	<NavigationHeader />
	<RouterView />
	<VueNotifications />
</template>
