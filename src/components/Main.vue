<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Chip from 'primevue/chip'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import { usePasswordStore } from '@/stores/usePassword'
import { usePasswordActions } from '@/composables/usePasswordActions'
import Form from './Form.vue'
import type { PasswordEntry } from '@/types/password'

const searchQuery = ref('')
const showForm = ref(false)
const editingData = ref<PasswordEntry | null>(null)

const passwordStore = usePasswordStore()
const { addPassword, deletePassword, updatePassword } = usePasswordActions()

function handleEdit(index: number) {
	editingData.value = passwordStore.passwords[index]
	showForm.value = true
}

function handleDelete(index: number) {
	deletePassword(index)
}

function handleAddPassword() {
	editingData.value = null
	showForm.value = true
}

function handleCancelEdit() {
	showForm.value = false
	editingData.value = null
}

function handleFormSubmit(passwordData: PasswordEntry) {
	if (editingData.value) {
		const index = passwordStore.passwords.findIndex(
			p => p === editingData.value
		)
		if (index !== -1) {
			updatePassword(index, passwordData)
		}
	} else {
		addPassword(passwordData)
	}
	showForm.value = false
}
</script>

<template>
	<div class="top">
		<div class="title">
			Password Manager
			<Button
				class="top-button"
				icon="pi pi-plus"
				label="Add Password"
				@click="handleAddPassword"
			/>
		</div>
		<div class="search">
			<IconField>
				<InputIcon class="pi pi-search" />
				<InputText v-model="searchQuery" placeholder="Search..." size="small" />
			</IconField>
		</div>
	</div>
	<div class="table-container">
		<DataTable :value="passwordStore.passwords">
			<Column field="name" header="Name">
				<template #body="{ data }">
					{{ data.name }}
				</template>
			</Column>
			<Column field="mail" header="Mail">
				<template #body="{ data }">
					{{ data.mail }}
				</template>
			</Column>
			<Column field="password" header="Password">
				<template #body="{ data }"> •••••••• </template>
			</Column>
			<Column field="tags" header="Tags">
				<template #body="{ data }">
					<div class="flex gap-2">
						<Chip v-for="tag in data.tags" :key="tag.text" :label="tag.text" />
					</div>
				</template>
			</Column>
			<Column field="actions" header="Actions">
				<template #body="{ index }">
					<div class="actions">
						<Button
							icon="pi pi-pencil"
							class="p-button-rounded p-button-text"
							@click="handleEdit(index)"
						/>
						<Button
							icon="pi pi-trash"
							class="p-button-rounded p-button-text p-button-danger"
							@click="handleDelete(index)"
						/>
					</div>
				</template>
			</Column>
		</DataTable>
	</div>

	<teleport to="body">
		<div v-if="showForm" class="modal-overlay" @click.self="handleCancelEdit">
			<Form
				:editingData="editingData"
				@submit="handleFormSubmit"
				@cancel="handleCancelEdit"
			/>
		</div>
	</teleport>
</template>

<style scoped>
.top {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	max-width: 1500px;
	margin: 0 auto;
	padding: 1rem;
	box-sizing: border-box;
}

.title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 1rem;
	font-size: 1.5rem;
	font-weight: 600;
}

.search {
	width: 100%;
	margin-bottom: 1rem;
}

.table-container {
	width: 100%;
	max-width: 1500px;
	margin: 0 auto;
	overflow-x: auto;
}

.actions {
	display: flex;
	gap: 0.5rem;
}

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
}

:deep(.p-chip) {
	margin-right: 0.5rem;
	margin-bottom: 0.5rem;
}

:deep(.p-datatable) {
	table-layout: fixed;
}

:deep(.p-datatable-thead > tr > th),
:deep(.p-datatable-tbody > tr > td) {
	width: 200px;
	max-width: 200px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	padding: 0.5rem 1rem;
}

:deep(.p-column-name) {
	width: 250px;
	max-width: 250px;
}

:deep(.p-column-mail) {
	width: 300px;
	max-width: 300px;
}

:deep(.p-column-password) {
	width: 150px;
	max-width: 150px;
}

:deep(.p-column-tags) {
	width: 200px;
	max-width: 200px;
}

:deep(.p-column-actions) {
	width: 150px;
	max-width: 150px;
}

:deep(.p-chip) {
	display: inline-block;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	vertical-align: middle;
}

@media (max-width: 768px) {
	.title {
		flex-direction: column;
		gap: 1rem;
		text-align: center;
	}

	.top-button {
		width: 100%;
	}

	:deep(.p-datatable) {
		font-size: 0.9rem;
	}

	:deep(.p-column-title) {
		min-width: 80px;
	}

	:deep(.p-button) {
		padding: 0.5rem;
	}
}

@media (max-width: 480px) {
	:deep(.p-datatable) {
		display: block;
	}

	:deep(.p-datatable-thead) {
		display: none;
	}

	:deep(.p-datatable-tbody tr) {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.375rem;
		padding: 0.5rem;
	}

	:deep(.p-datatable-tbody td) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
		border: none;
	}

	:deep(.p-datatable-tbody td:before) {
		content: attr(data-label);
		font-weight: bold;
		margin-right: 1rem;
	}

	.table-container {
		padding: 0.5rem;
	}
}
</style>
