<script setup>
import CounterName from './CounterName.vue'
</script>

<template>
	<header class="mb-4">
		<button>GO</button>
	</header>
	<main class="grid grid-cols-1 gap-2">
		<template v-for="i in 4">
			<counter-name :skater="mainStore.jammers[i-1]"></counter-name>
			<counter-name :skater="mainStore.pivots[i-1]"></counter-name>
		</template>
		<counter-name v-for="s in mainStore.blockers" :skater="s"></counter-name>
	</main>
</template>

<script>
import { useMainStore } from '../store.js'
import { mapStores, mapActions } from 'pinia'

export default {
	name: "Counter",
	computed: {
		...mapStores(useMainStore),
	},
}
</script>

<style scoped>

</style>