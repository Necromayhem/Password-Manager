<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePasswordForm } from '@/composables/usePasswordForm'
import type { PasswordEntry } from '@/types/password'
import { useToast, InputText, Button, Password } from '../components/primevue'

const showPassword = ref(false)
const toast = useToast()
const props = defineProps<{
	editingData?: PasswordEntry | null
}>()

const emit = defineEmits(['submit', 'cancel'])

const { formData, hasChanges, submitPasswordForm, cancelPasswordForm } =
	usePasswordForm(props.editingData)

const isEditing = computed(
	() => props.editingData !== null && props.editingData !== undefined
)
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
			<div class="password-input-wrapper">
				<InputText
					class="input-text"
					v-model="formData.password"
					:type="showPassword ? 'text' : 'password'"
					placeholder="Password"
				/>
				<Button
					class="eye-button"
					:icon="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
					@click="showPassword = !showPassword"
					text
				/>
			</div>
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
				@click="submitPasswordForm(emit, toast)"
				:disabled="isEditing && !hasChanges"
			/>
			<Button
				v-if="isEditing"
				class="form-button"
				label="Cancel"
				severity="secondary"
				@click="cancelPasswordForm(emit)"
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
.password-input-wrapper {
	position: relative;
	width: 100%;
}

.input-text {
	width: 100%;
	padding-right: 35px;
}

.eye-button {
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 32px;
	height: 32px;
	cursor: pointer;
}
</style>
