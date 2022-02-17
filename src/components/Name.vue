<template>
	<div @click="toggleActive" :class="classes">
		<p>{{ skater.name }}</p>
	</div>
</template>

<script>
import { Position } from '../store.js'

export default {
	name: "Name",
	props: {
		skater: Object,
		startActive: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			active: false,
		}
	},
	computed: {
		classes () {
			let c = []
			if (this.active) c.push('active')
			c.push(this.skater.position.toLowerCase())
			return c.join(' ');
		},
	},
	mounted () {
		this.active = this.startActive
	},
	methods: {
		toggleActive () {
			this.active = !this.active
		}
	}
}
</script>

<style scoped>
div {
	@apply p-1 cursor-pointer select-none text-center flex justify-center items-center;
	@apply bg-zinc-800 text-zinc-300;
	
	&.jammer {
		@apply text-teal-400;
	}
	&.pivot {
		@apply text-purple-400;
	}
	&.active {
		@apply bg-zinc-300 text-zinc-800;
		
		&.jammer {
			@apply bg-teal-400;
		}
		&.pivot {
			@apply bg-purple-400;
		}
	}
}
</style>