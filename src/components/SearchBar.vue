<script setup lang="ts">
import { ref, watch } from 'vue'
import { InputText, IconField, InputIcon } from '../components/primevue'

const props = defineProps<{
	modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
const inputValue = ref(props.modelValue)

watch(inputValue, newValue => {
	emit('update:modelValue', newValue)
})
</script>

<template>
	<div class="search">
		<IconField>
			<InputIcon class="pi pi-search" />
			<InputText v-model="inputValue" placeholder="Search..." size="small" />
		</IconField>
	</div>
</template>

<style scoped>
.search {
	width: 100%;
	margin-bottom: 1rem;
}
</style>
