<script setup lang="ts">
import { Button, Dialog } from '../components/primevue'

const props = defineProps<{
	modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue', 'confirm'])

const confirm = () => {
	emit('confirm')
	emit('update:modelValue', false)
}

const cancel = () => {
	emit('update:modelValue', false)
}
</script>

<template>
	<Dialog
		:visible="props.modelValue"
		@update:visible="value => emit('update:modelValue', value)"
		header="Confirm Delete"
		:style="{ width: '350px' }"
		:modal="true"
	>
		<div class="confirmation-content">
			<span>Are you sure you want to delete the data?</span>
		</div>
		<template #footer>
			<Button
				label="No"
				icon="pi pi-times"
				@click="cancel"
				class="p-button-text"
			/>
			<Button
				label="Yes"
				icon="pi pi-check"
				@click="confirm"
				class="p-button-danger"
				autofocus
			/>
		</template>
	</Dialog>
</template>

<style scoped>
.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
