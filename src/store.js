import { defineStore } from 'pinia'
import _array from 'lodash/array'
import _collection from 'lodash/collection'

export const Position = {
	Jammer: 'Jammer',
	Pivot: 'Pivot',
	Blocker: 'Blocker'
}

class Skater {
	constructor (name, position) {
		this.name = name
		this.position = position
		this.reset()
	}
	pick (asRole) {
		this.jams++
		this.time = Date.now()
		if (asRole)
			this.timeAsRole = Date.now()
	}
	reset () {
		this.jams = 0
		this.time = Date.now()
		this.timeAsRole = Date.now()
	}
	randomize () {
		this.jams = Math.round(10 * Math.random())
		this.time = Date.now() - Math.round(100000 * Math.random())
		this.timeAsRole = Date.now() - Math.round(100000 * Math.random())
	}
}

export const useMainStore = defineStore('main', {
	state: () => {
		return {
			skaters: [
				// Jammers
				new Skater("Madame Moustache", Position.Jammer),
				new Skater("Progr'Hammer", Position.Jammer),
				new Skater("Pathé", Position.Jammer),
				new Skater("Chaton", Position.Jammer),
				// Blockers
				new Skater("Wild Purple", Position.Blocker),
				new Skater("Tchou'Baka", Position.Blocker),
				new Skater("Ellen Ripe-les", Position.Blocker),
				new Skater("Diplogrokus", Position.Blocker),
				new Skater("L'Amère Michel", Position.Blocker),
				// Pivots
				new Skater("La Grosse Loutre", Position.Pivot),
				new Skater("La Camibale", Position.Pivot),
				new Skater("Glory Owl", Position.Pivot),
				new Skater("BoobZilla", Position.Pivot),
			],
		}
	},
	getters: {
		jammers: (state) => _collection.filter(state.skaters, ['position', Position.Jammer]),
		pivots: (state) => _collection.filter(state.skaters, ['position', Position.Pivot]),
		blockers: (state) => _collection.filter(state.skaters, ['position', Position.Blocker]),
		allBlockers: (state) => _collection.filter(state.skaters, function(s) { return s.position !== Position.Jammer; }),
	},
	actions: {
		resetJams() {
			_collection.forEach(this.skaters, function (s) { s.reset() })
		},
		randomizeJams() {
			_collection.forEach(this.skaters, function (s) { s.randomize() })
		},
		getNextJammer() {
			let js = this.jammers
			js = _collection.orderBy(js, ['jams', 'time'], ['asc', 'asc'])
			let j = _array.head(js)
			j.pick(true)
			return j
		},
		getNextPivot() {
			let js = this.pivots
			// js = _collection.orderBy(js, ['jams', 'timeAsRole'], ['asc', 'asc'])
			js = _collection.orderBy(js, ['timeAsRole'], ['asc'])
			let j = _array.head(js)
			j.pick(true)
			return j
		},
		findFreePivot() {
			let js = this.pivots
			js = _collection.orderBy(js, ['timeAsRole', 'time'], ['asc', 'asc'])
			return _array.nth(js, 1)
		},
		getNextBlocker() {
			let js = this.allBlockers
			js = _collection.orderBy(js, ['jams', 'time'], ['asc', 'asc'])
			let i = 0
			let j = _array.nth(js, i)
			let fp = this.findFreePivot()
			// if (j.position === Position.Pivot)
			// 	j = this.findFreePivot()
			while (j.position === Position.Pivot && j.name !== fp.name)
			{
				i++
				j = _array.nth(js, i)
			}
			
			j.pick(j.position !== Position.Pivot)
			return j
		},
	},
})



/*
import { reactive } from 'vue'

const Position = {
	Jammer: 'Jammer',
	Pivot: 'Pivot',
	Blocker: 'Blocker'
}

class Skater {
	constructor (name, position) {
		this.name = name
		this.position = position
		this.jams = 0
	}
	addJam (n) {
		this.jams++
		console.log(n, this.jams)
	}
}

export const store = reactive({
	skaters: [
		new Skater("Pathé", Position.Jammer),
		new Skater("Progr'Hammer", Position.Jammer),
		new Skater("Chaton", Position.Jammer),
		new Skater("Madame Moustache", Position.Jammer),
		
		new Skater("BoobZilla", Position.Pivot),
		new Skater("La Camibale", Position.Pivot),
		new Skater("Glory Owl", Position.Pivot),
		new Skater("La Grosse Loutre", Position.Pivot),
		
		new Skater("Tchou'Baka", Position.Blocker),
		new Skater("Ellen Ripe-les", Position.Blocker),
		new Skater("Wild Purple", Position.Blocker),
		new Skater("Diplogrokus", Position.Blocker),
		new Skater("Crash Bambi Coot", Position.Blocker),
	],
	getJammers () {
		return _collection.filter(this.skaters, ['position', Position.Jammer])
	},
	getPivots () {
		return _collection.filter(this.skaters, ['position', Position.Pivot])
	},
	getNonPivots () {
		return _collection.filter(this.skaters, ['position', Position.Blocker])
	},
	getBlockers () {
		return _collection.filter(this.skaters, function(s) { return s.position === Position.Pivot || s.position === Position.Blocker; })
	},
	getNextJammer (n) {
		let jammers = _collection.filter(this.skaters, ['position', Position.Jammer])
		// jammers = _collection.sortBy(jammers, ['jams'])
		let jammer = _array.head(jammers)
		// jammer.addJam(n)
		return jammer
	},
})
*/