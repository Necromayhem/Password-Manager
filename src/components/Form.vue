<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePasswordForm } from '@/composables/usePasswordForm'
import { useGeneratePassword } from '../utils/useGeneratePassword.ts'
import type { PasswordEntry } from '@/types/password'
import { useToast, InputText, Button } from '../components/primevue'

const toast = useToast()
const props = defineProps<{
	editingData?: PasswordEntry | null
}>()

const emit = defineEmits(['submit', 'cancel'])

const {
	formData,
	hasChanges,
	submitPasswordForm,
	cancelPasswordForm,
	showPassword,
	errorFields,
} = usePasswordForm(props.editingData)

const { generateRandomPassword } = useGeneratePassword()

const isEditing = computed(
	() => props.editingData !== null && props.editingData !== undefined
)

const generatePassword = () => {
	formData.value.password = generateRandomPassword()
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
				:class="{ 'p-invalid': errorFields.name }"
			/>
		</div>
		<div class="form-row">
			<InputText
				class="input-text"
				v-model="formData.mail"
				placeholder="Mail"
				:class="{ 'p-invalid': errorFields.mail }"
			/>
		</div>
		<div class="form-row">
			<div class="password-input-wrapper">
				<InputText
					class="input-text"
					v-model="formData.password"
					:type="showPassword ? 'text' : 'password'"
					placeholder="Password"
					:class="{ 'p-invalid': errorFields.password }"
				/>
				<Button
					class="generate-button"
					icon="pi pi-sync"
					@click="generatePassword"
					text
					severity="secondary"
					v-tooltip="'Generate password'"
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
				placeholder="Tags"
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
	border: 1px solid var(--surface-border);
	border-radius: 5px;
	position: fixed;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1000;
	background: var(--surface-card);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.form-row {
	display: flex;
	justify-content: center;
	margin-bottom: 10px;
	width: 100%;
}

.form-actions {
	display: flex;
	flex-direction: column;
	width: 100%;
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
	padding-right: 70px;
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

.generate-button {
	position: absolute;
	right: 32px;
	top: 50%;
	transform: translateY(-50%);
	width: 32px;
	height: 32px;
	cursor: pointer;
}
</style>
