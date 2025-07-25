<script setup lang="ts">
import Form from './Form.vue'

const props = defineProps<{
	modelValue: boolean
	editingData?: any
}>()

const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])

const cancel = () => {
	emit('cancel')
	emit('update:modelValue', false)
}
</script>

<template>
	<div v-if="props.modelValue" class="modal-overlay" @click.self="cancel">
		<Form
			:editingData="props.editingData"
			@submit="data => emit('submit', data)"
			@cancel="cancel"
		/>
	</div>
</template>

<style scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
	display: flex;
	justify-content: center;
	align-items: center;
	backdrop-filter: blur(5px);
}
</style>
