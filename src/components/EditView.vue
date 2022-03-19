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
			<select ref="skaterSelect" @change="onSkaterChange">
				<option v-for="skater in allSkaters" :value="skater.name">{{ skater.name }}</option>
			</select>
			<div class="col-span-1 text-center"><span class="inline-block leading-none text-xl text-teal-400">></span></div>
			<select ref="positionSelect" @change="onPositionChange">
				<option :value="Position.Jammer">{{ Position.Jammer }}</option>
				<option :value="Position.Pivot">{{ Position.Pivot }}</option>
				<option :value="Position.Blocker">{{ Position.Blocker }}</option>
				<option :value="Position.Out">{{ Position.Out }}</option>
			</select>
		</div>
		<button @click="applyChange" class="mt-4 font-bold !bg-zinc-300 !text-zinc-800" :disabled="!selectedSkaterFull">APPLY</button>
		<p v-if="selectedSkaterFull" class="mt-3 text-center">{{ selectedSkaterFull.name }} <span class="italic text-zinc-400">({{ selectedSkaterFull.position }})</span></p>
		<p v-if="selectedSkaterFull" class="text-center"><span class="italic text-zinc-400">now becomes</span> {{ selectedPosition }}</p>
	</template>
	
	<hr class="mt-8 mb-5 opacity-25">
	
	<template v-if="selectedSkaterForRole">
		<h1 class="text-xl font-bold text-teal-400">Roles</h1>
		<div class="mt-2 grid grid-cols-9 gap-2 items-center">
			<select ref="skaterForRoleSelect" @change="onSkaterForRoleChange">
				<option v-for="skater in allSkaters" :value="skater.name">{{ skater.name }}</option>
			</select>
			<div class="col-span-1 text-center"><span class="inline-block leading-none text-xl text-teal-400">></span></div>
			<select ref="roleSelect" @change="onRoleChange">
				<option :value="true">Head</option>
				<option :value="false">Not head</option>
			</select>
		</div>
		<button @click="applyChangeForRole" class="mt-4 font-bold !bg-zinc-300 !text-zinc-800" :disabled="!selectedSkaterForRoleFull">APPLY</button>
		<p v-if="selectedSkaterForRoleFull" class="mt-3 text-center">{{ selectedSkaterForRoleFull.name }} <span class="italic text-zinc-400">({{ selectedSkaterForRoleFull.isHead ? 'Head' : 'Not head' }})</span></p>
		<p v-if="selectedSkaterForRoleFull" class="text-center"><span class="italic text-zinc-400">now becomes</span> {{ selectedRole ? 'Head' : 'Not head' }}</p>
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
		selectedSkaterFull () {
			return this.mainStore.getByName(this.selectedSkater)
		},
		selectedSkaterForRoleFull () {
			return this.mainStore.getByName(this.selectedSkaterForRole)
		},
	},
	mounted () {
		this.selectedSkater = this.mainStore.skaters[0].name
		this.selectedSkaterForRole = this.mainStore.skaters[0].name
	},
	methods: {
		onSkaterChange (e) {
			this.selectedSkater = this.$refs.skaterSelect.value
			console.log(this.selectedSkater)
		},
		onPositionChange (e) {
			this.selectedPosition = this.$refs.positionSelect.value
			console.log(this.selectedPosition)
		},
		applyChange () {
			console.log(this.selectedSkater, this.selectedPosition)
			let s = this.mainStore.getByName(this.selectedSkater)
			console.log(s.number)
			s.position = this.selectedPosition
		},
		onSkaterForRoleChange (e) {
			this.selectedSkaterForRole = this.$refs.skaterForRoleSelect.value
			console.log(this.selectedSkaterForRole)
		},
		onRoleChange (e) {
			this.selectedRole = this.$refs.roleSelect.value
			console.log(this.selectedRole)
		},
		applyChangeForRole () {
			console.log(this.selectedSkaterForRole, this.selectedRole)
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