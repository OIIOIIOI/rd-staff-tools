<template>
	<div class="mb-4 ml-6" :class="levelClass">
		<header class="title"><span v-if="section.isNumbered">{{ formattedNumber }} - </span>{{ section.title }}</header>
		<div v-if="hasContent" v-html="content" class="content"></div>
		<div v-if="section.children.length > 0" :style="style" class="mt-4">
			<rules-section v-for="child in section.children" :section="child" :level="level+1" :parent-number="formattedNumber"></rules-section>
		</div>
	</div>
</template>

<script>
import { marked } from 'marked';

export default {
	name: "RulesSection",
	props: {
		section: {
			type: Object,
			required: true,
		},
		level: {
			type: Number,
			default: 0,
		},
		parentNumber: {
			type: String,
			default: '',
		},
	},
	computed: {
		levelClass () {
			return `level-${this.level}`;
		},
		style () {
			return '';
			/*return `margin-left: ${this.level+1}rem;`;*/
		},
		hasContent () {
			return this.section != null && this.section.content != null;
		},
		content () {
			return this.hasContent ? marked.parse(this.section.content) : '';
		},
		formattedNumber () {
			return this.parentNumber !== '' ? `${this.parentNumber}.${this.section.order}` : `${this.section.order}`;
		}
	}
}
</script>

<style>
.level-0 {
	.title { @apply text-2xl; }
}
.level-1 {
	.title { @apply text-xl; }
}
.level-2 {
	.title { @apply text-lg; }
}
.content {
	@apply mt-4 text-zinc-300;
	
	strong {
		@apply text-zinc-100;
	}
	> p {
		@apply my-3;
	}
}
</style>