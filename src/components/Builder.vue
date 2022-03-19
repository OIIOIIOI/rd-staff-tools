<script setup>
import Name from './Name.vue'
import ListNameBuilder from './ListNameBuilder.vue'
</script>

<template>
	<main>
		<div class="flex">
			<button @click="clearLines()">Clear</button>
			<button @click="addLine()">Prochaine ligne</button>
			<div class="grow"></div>
			<a href="#/counter" class="p-3 inline-block border mr-4">Counter</a>
		</div>
		<hr class="my-4">
		<div class="grid grid-cols-3 gap-4">
			<div>
				<p class="font-bold text-lg mb-2">Jammeuses :</p>
				<list-name-builder v-for="s in mainStore.jammers" :skater="s"></list-name-builder>
			</div>
			<div>
				<p class="font-bold text-lg mb-2">Pivots :</p>
				<list-name-builder v-for="s in mainStore.pivots" :skater="s"></list-name-builder>
			</div>
			<div>
				<p class="font-bold text-lg mb-2">Bloqueuses :</p>
				<list-name-builder v-for="s in mainStore.blockers" :skater="s"></list-name-builder>
			</div>
		</div>
		<hr class="my-4">
		<div class="grid grid-cols-4 gap-8">
			<div class="col-span-3">
				<div v-for="(line, index) in lines" :key="index" class="mb-4 grid grid-cols-5 gap-4">
					<name v-for="s in line" :skater="s"></name>
				</div>
			</div>
			<div class="col-span-1">
				<p class="font-bold text-lg mb-2">Liste d'attente :</p>
				<list-name-builder v-for="s in allBlockersOrdered" :skater="s"></list-name-builder>
			</div>
		</div>
	</main>
</template>

<script>
import { useMainStore } from '../store.js'
import { mapStores, mapActions } from 'pinia'
import _collection from 'lodash/collection'

export default {
	name: "Builder",
	data() {
		return {
			lines: [],
		}
	},
	computed: {
		...mapStores(useMainStore),
		allBlockersOrdered () {
			return _collection.orderBy(this.mainStore.allBlockers, ['timeAsRole', 'time'], ['asc', 'asc'])
		},
	},
	methods: {
		...mapActions(useMainStore, [
			'resetAll',
			'randomizeJams',
			'getNextJammer',
			'getNextPivot',
			'getFreePivot',
			'getNextBlocker',
			'getByName',
		]),
		addLine () {
			this.lines.push([
				this.mainStore.getNextJammer(),
				this.mainStore.getNextPivot(),
				this.mainStore.getNextBlocker(),
				this.mainStore.getNextBlocker(),
				this.mainStore.getNextBlocker(),
			])
		},
		clearLines () {
			this.lines = []
			this.mainStore.resetAll()
		}
	},
	mounted() {
		// console.log(this.mainStore.getByName('Aline').number)
		// this.mainStore.$reset()
		// console.log(this.store.getJammers().map(function (s) { return s.name; }))
		// console.log(this.store.getPivots().map(function (s) { return s.name; }))
		// console.log(this.store.getNonPivots().map(function (s) { return s.name; }))
		// console.log(this.store.getBlockers().map(function (s) { return s.name; }))
	}
}
</script>

<style>
button {
	@apply p-3 inline-block border mr-4;
}
</style>
