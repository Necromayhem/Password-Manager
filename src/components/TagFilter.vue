<script setup lang="ts">
import { Select } from '../components/primevue'

defineProps<{
	modelValue: string
	options: string[]
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
	<Select
		:modelValue="modelValue"
		@update:modelValue="value => emit('update:modelValue', value)"
		:options="options"
		placeholder="Filter by tag"
		class="tag-filter"
		optionLabel=""
	/>
</template>

<style scoped>
.tag-filter {
	min-width: 200px;
	margin-left: 1rem;
	margin-top: 0 !important;
}
</style>
