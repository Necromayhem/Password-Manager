<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed } from 'vue'
import { usePasswordForm } from '@/composables/usePasswordForm'
import type { PasswordEntry } from '@/types/password'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const props = defineProps<{
	editingData?: PasswordEntry | null
}>()

const emit = defineEmits(['submit', 'cancel'])

const { formData, resetForm, preparePasswordData } = usePasswordForm(
	props.editingData
)

const isEditing = computed(
	() => props.editingData !== null && props.editingData !== undefined
)

function handleSubmit() {
	if (
		!formData.value.name ||
		!formData.value.mail ||
		!formData.value.password
	) {
		toast.add({
			severity: 'error',
			summary: 'Ошибка',
			detail: 'Заполните все обязательные поля!',
			life: 3000,
		})
		return
	}

	emit('submit', preparePasswordData())
	resetForm()
}

function handleCancel() {
	resetForm()
	emit('cancel')
}
</script>

<template>
	<div class="add-form" @click.stop>
		<h3>
			{{ isEditing ? 'Edit Password' : 'Add New Password' }}
		</h3>
		<div class="form-row">
			<InputText
				class="input-text"
				v-model="formData.name"
				placeholder="Name"
			/>
		</div>
		<div class="form-row">
			<InputText
				class="input-text"
				v-model="formData.mail"
				placeholder="Mail"
			/>
		</div>
		<div class="form-row">
			<InputText
				class="input-text"
				v-model="formData.password"
				placeholder="Password"
				type="password"
			/>
		</div>
		<div class="form-row">
			<InputText
				class="input-text"
				v-model="formData.tags"
				placeholder="Tags (separated by semicolon)"
			/>
		</div>
		<div class="form-actions">
			<Button
				class="form-button"
				:label="isEditing ? 'Update' : 'Add Password'"
				@click="handleSubmit"
			/>
			<Button
				v-if="isEditing"
				class="form-button"
				label="Cancel"
				severity="secondary"
				@click="handleCancel"
			/>
		</div>
	</div>
</template>

<style scoped>
.add-form {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 300px;
	margin: 20px auto;
	padding: 15px;
	border: 1px solid #ddd;
	border-radius: 5px;
	background: white;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1000;
}
.form-row {
	display: flex;
	justify-content: center;
	margin-bottom: 10px;
	width: 100%;
}
.input-text {
	width: 250px;
}
.form-actions {
	display: flex;
	flex-direction: column;
	width: 250px;
	gap: 10px;
}
.form-button {
	width: 100%;
	text-align: center;
}
</style>
