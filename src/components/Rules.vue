<script setup>
import RulesSection from './RulesSection.vue'
</script>

<template>
	<div class="wrapper">
		<rules-section v-for="chapter in rules" :section="chapter"></rules-section>
	</div>
</template>

<script>
export default {
	name: "Rules",
	data() {
		return {
			rules: []
		};
	},
	async mounted() {
		const res = await fetch("https://rdtom.herokuapp.com/api/rules?locale=en")
		this.rules = await res.json()
	}
}
</script>

<style>
.wrapper {
	@apply max-w-screen-lg mx-auto;
	@apply leading-tight;
}
</style>