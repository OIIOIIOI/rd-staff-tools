<template>
	<div class="name-card" :class="classes">
		<div class="name" @click="toggleActive">
			<p>{{ skater.number }}</p>
			<p>{{ skater.name }}</p>
		</div>
		<div class="p-count" @click="skater.sendToTheBox()" @dblclick="skater.resetPenalties()">
			<p>{{ skater.penalties }}</p>
		</div>
		<div class="j-count">
			<p>{{ skater.jams }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "CounterName",
	emits: ['toggled'],
	props: {
		skater: Object,
		startActive: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			// active: this.startActive,
		}
	},
	computed: {
		classes () {
			let c = []
			if (this.skater.active)
				c.push('active')
			c.push(this.skater.position.toLowerCase())
			return c.join(' ');
		},
	},
	mounted () {
		// this.active = this.startActive
	},
	methods: {
		toggleActive () {
			this.skater.active = !this.skater.active
			// this.active = !this.active
			this.$emit('toggled', this.skater)
		}
	}
}
</script>

<style scoped>
div.name-card {
	@apply grid grid-cols-2 text-center items-center cursor-pointer select-none;
	@apply bg-zinc-800 text-zinc-300;
	
	> .name {
		@apply col-span-2 py-2;
		
		p:first-of-type {
			@apply text-xl font-bold mb-1;
		}
		p:last-of-type {
			@apply text-sm;
		}
	}
	> .p-count,
	> .j-count {
		@apply col-span-1 self-end py-1;
	}
	> .p-count {
		@apply bg-red-900 text-red-200;
	}
	> .j-count {
		@apply bg-zinc-700;
	}
	&.jammer .name {
		@apply text-teal-400;
	}
	&.pivot .name {
		@apply text-purple-400;
	}
	&.active {
		@apply bg-zinc-300 text-zinc-800;
		
		> .p-count { @apply bg-red-500; }
		> .j-count { @apply bg-zinc-100; }
		> .name { @apply text-zinc-800; }
		&.jammer {
			@apply bg-teal-400;
			
			> .j-count { @apply bg-teal-300; }
		}
		&.pivot {
			@apply bg-purple-400;
			
			> .j-count { @apply bg-purple-300; }
		}
	}
}
</style>