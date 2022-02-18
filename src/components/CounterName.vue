<template>
	<div class="name-card" :class="classes">
		<div class="p-count" @click="skater.sendToTheBox()" @dblclick="skater.resetPenalties()">
			<p>{{ skater.penalties }}</p>
		</div>
		<div class="j-count">
			<p>{{ skater.jams }}</p>
		</div>
		<div class="name" @click="toggleActive">
			<p>{{ skater.name }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "CounterName",
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
div.name-card {
	@apply h-7 grid grid-cols-6 items-center cursor-pointer select-none;
	@apply bg-zinc-800 text-zinc-300;
	
	> div {
		@apply h-full flex justify-center items-center text-center;
	}
	> .p-count {
		@apply col-span-1;
		@apply bg-red-900 text-red-200;
	}
	> .j-count {
		@apply col-span-1;
		@apply bg-zinc-700;
	}
	> .name {
		@apply col-span-4 text-sm;
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