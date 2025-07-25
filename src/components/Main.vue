<script setup lang="ts">
import {
	DataTable,
	Chip,
	InputText,
	Button,
	Column,
} from '../components/primevue'
import SearchBar from './SearchBar.vue'
import TagFilter from './TagFilter.vue'
import { usePasswordManager } from '@/composables/usePasswordManager'
import { usePasswordStore } from '@/stores/usePassword'
import DeleteConfirmationDialog from './DeleteConfirmationDialog.vue'
import PasswordFormModal from './PasswordFormModal.vue'

const passwordStore = usePasswordStore()
const {
	editingData,
	showForm,
	editPassword,
	removePassword,
	submitPassword: formSubmit,
	cancelEdit,
	showPasswords,
	togglePasswordVisibility,
	confirmDelete,
	isDeleteDialogVisible,
	filteredPasswords,
	searchQuery,
	debouncedUpdateSearch,
	selectedTag,
	allTags,
	copyPassword,
} = usePasswordManager()

const addPassword = () => {
	editingData.value = null
	showForm.value = true
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
				@click="addPassword"
			/>
		</div>

		<DeleteConfirmationDialog
			v-model="isDeleteDialogVisible"
			@confirm="confirmDelete"
		/>

		<PasswordFormModal
			v-model="showForm"
			:editingData="editingData"
			@submit="formSubmit"
			@cancel="cancelEdit"
		/>

		<div v-if="passwordStore.passwords.length > 0" class="search-container">
			<SearchBar
				:modelValue="searchQuery"
				@update:modelValue="debouncedUpdateSearch"
			/>
			<TagFilter v-model="selectedTag" :options="allTags" />
		</div>
	</div>

	<div v-if="passwordStore.passwords.length > 0" class="table-container">
		<DataTable
			:value="filteredPasswords"
			paginator
			:rows="5"
			:rowsPerPageOptions="[5, 10, 20, 50]"
			paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
		>
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
				<template #body="{ data, index }">
					<span v-if="showPasswords[index]">{{ data.password }}</span>
					<span v-else>••••••••</span>
				</template>
			</Column>
			<Column field="tags" header="Tags">
				<template #body="{ data }">
					<div class="flex gap-2">
						<Chip v-for="tag in data.tags" :key="tag.text" :label="tag.text" />
					</div>
				</template>
			</Column>
			<Column field="actions">
				<template #body="{ data, index }">
					<div class="actions">
						<Button
							v-tooltip="
								showPasswords[index] ? 'Скрыть пароль' : 'Показать пароль'
							"
							icon="pi pi-eye"
							class="p-button-rounded p-button-text"
							@click="togglePasswordVisibility(index)"
						/>
						<Button
							v-tooltip="'Копировать пароль'"
							icon="pi pi-copy"
							class="p-button-rounded p-button-text"
							@click="copyPassword(data.password)"
						/>
						<Button
							icon="pi pi-pencil"
							class="p-button-rounded p-button-text"
							@click="editPassword(index)"
							v-tooltip="'Редактировать'"
						/>
						<Button
							icon="pi pi-trash"
							class="p-button-rounded p-button-text p-button-danger"
							@click="removePassword(index)"
							v-tooltip="'Удалить'"
						/>
					</div>
				</template>
			</Column>
		</DataTable>
	</div>
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

.password-cell {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.password-cell button {
	padding: 0.25rem;
	margin-left: 0.5rem;
}
.search-container {
	display: flex;
	width: 100%;
	margin-bottom: 1rem;
	align-items: center;
}
</style>
