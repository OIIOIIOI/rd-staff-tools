<script setup>
import {Position} from "../store";
</script>

<template>
	<header class="grid grid-cols-8 gap-2">
		<a href="#/counter" class="btn-back">BACK</a>
	</header>
	<h1 class="mt-4 text-xl font-bold text-teal-400">Positions</h1>
	<template v-if="selectedSkater">
		<div class="mt-2 grid grid-cols-9 gap-2 items-center">
			<select v-model="selectedSkater">
				<option v-for="skater in allSkaters" :value="skater.name">{{ skater.name }}</option>
			</select>
			<div class="col-span-1 text-center"><span class="inline-block leading-none text-xl text-teal-400">></span></div>
			<select v-model="selectedPosition">
				<option :value="Position.Jammer">{{ Position.Jammer }}</option>
				<option :value="Position.Pivot">{{ Position.Pivot }}</option>
				<option :value="Position.Blocker">{{ Position.Blocker }}</option>
				<option :value="Position.Out">{{ Position.Out }}</option>
			</select>
		</div>
		<button @click="applyChange" class="mt-4 font-bold !bg-zinc-300 !text-zinc-800" :disabled="!isValidChoice">APPLY</button>
<!--		<p v-if="selectedSkater" class="mt-3 text-center">{{ selectedSkater.name }} <span class="italic text-zinc-400">({{ selectedSkater.position }})</span></p>-->
<!--		<p v-if="isValidChoice" class="text-center"><span class="italic text-zinc-400">now becomes</span> {{ selectedPosition }}</p>-->
	</template>
	
	<hr class="mt-8 mb-5 opacity-25">
	
	<template v-if="selectedSkaterForRole">
		<h1 class="text-xl font-bold text-teal-400">Roles</h1>
		<div class="mt-2 grid grid-cols-9 gap-2 items-center">
			<select v-model="selectedSkaterForRole">
				<option v-for="skater in allSkaters" :value="skater.name">{{ skater.name }}</option>
			</select>
			<div class="col-span-1 text-center"><span class="inline-block leading-none text-xl text-teal-400">></span></div>
			<select v-model="selectedRole">
				<option value="true">Head</option>
				<option value="false">Not head</option>
			</select>
		</div>
		<button @click="applyChangeForRole" class="mt-4 font-bold !bg-zinc-300 !text-zinc-800" :disabled="!isValidChoiceForRole">APPLY</button>
<!--		<p v-if="selectedSkaterForRole" class="mt-3 text-center">{{ selectedSkaterForRole.name }} <span class="italic text-zinc-400">({{ selectedSkaterForRole.isHead ? 'Head' : 'Not head' }})</span></p>-->
<!--		<p v-if="isValidChoiceForRole" class="text-center"><span class="italic text-zinc-400">now becomes</span> {{ selectedRole ? 'Head' : 'Not head' }}</p>-->
	</template>
</template>

<script>
import {mapStores} from "pinia/dist/pinia.esm-browser";
import {useMainStore} from "../store";
import _collection from "lodash/collection";
import {Position} from "../store";

export default {
	name: "EditView",
	data () {
		return {
			selectedSkater: false,
			selectedSkaterForRole: false,
			selectedPosition: Position.Blocker,
			selectedRole: true,
		}
	},
	computed: {
		...mapStores(useMainStore),
		allSkaters () {
			return this.mainStore.skaters
		},
		isValidChoice () {
			return this.selectedSkater && this.selectedPosition !== ''
		},
		isValidChoiceForRole () {
			return this.selectedSkaterForRole && this.selectedRole !== ''
		},
	},
	mounted () {
		this.selectedSkater = this.mainStore.skaters[0].name
		this.selectedSkaterForRole = this.mainStore.skaters[0].name
	},
	methods: {
		applyChange () {
			let s = this.mainStore.getByName(this.selectedSkater)
			s.position = this.selectedPosition
		},
		applyChangeForRole () {
			let s = this.mainStore.getByName(this.selectedSkaterForRole)
			s.isHead = this.selectedRole
		},
	}
}
</script>

<style scoped>
button, a {
	@apply w-full border-0 bg-zinc-800 py-2 col-span-1 text-center mr-0;
	
	&:disabled {
		@apply opacity-25;
	}
}
.btn-back {
	@apply col-span-8;
}
select {
	@apply col-span-4 bg-zinc-700 px-1 py-2;
}
</style>