import { ref, computed } from 'vue'
import { usePasswordStore } from '@/stores/usePassword'
import { usePasswordActions } from './usePasswordActions'
import { useSearch } from './useSearch'
import type { PasswordEntry } from '@/types/password'

export function usePasswordManager() {
	const passwordStore = usePasswordStore()
	const { addPassword, deletePassword, updatePassword } = usePasswordActions()
	const {
		searchQuery,
		filteredPasswords: searchFilteredPasswords,
		debouncedUpdateSearch,
	} = useSearch()

	const selectedTag = ref<string>('All')
	const allTags = computed(() => {
		const tags = new Set<string>()
		passwordStore.passwords.forEach(password => {
			password.tags?.forEach(tag => tags.add(tag.text))
		})
		return ['All', ...Array.from(tags).sort()]
	})

	const filterByTag = (passwords: PasswordEntry[]) => {
		if (!selectedTag.value || selectedTag.value === 'All') return passwords
		return passwords.filter(password =>
			password.tags?.some(tag => tag.text === selectedTag.value)
		)
	}

	const editingData = ref<PasswordEntry | null>(null)
	const showForm = ref(false)
	const isDeleteDialogVisible = ref(false)
	const deleteIndex = ref<number>(-1)
	const showPasswords = ref<Record<number, boolean>>({})

	const filteredPasswords = computed(() => {
		return filterByTag(searchFilteredPasswords.value)
	})

	const editPassword = (index: number) => {
		if (index >= 0 && index < passwordStore.passwords.length) {
			editingData.value = { ...passwordStore.passwords[index] }
			showForm.value = true
		}
	}

	const removePassword = (index: number) => {
		if (index >= 0 && index < passwordStore.passwords.length) {
			deleteIndex.value = index
			isDeleteDialogVisible.value = true
		}
	}

	const confirmDelete = () => {
		if (
			deleteIndex.value >= 0 &&
			deleteIndex.value < passwordStore.passwords.length
		) {
			deletePassword(deleteIndex.value)
		}
		isDeleteDialogVisible.value = false
		deleteIndex.value = -1
	}

	const submitPassword = (passwordData: PasswordEntry) => {
		if (editingData.value) {
			const index = passwordStore.passwords.findIndex(
				p =>
					p.name === editingData.value?.name &&
					p.mail === editingData.value?.mail
			)
			if (index !== -1) updatePassword(index, passwordData)
		} else {
			addPassword(passwordData)
		}
		showForm.value = false
	}

	const cancelEdit = () => {
		showForm.value = false
		editingData.value = null
	}

	const togglePasswordVisibility = (index: number) => {
		showPasswords.value[index] = !showPasswords.value[index]
	}

	return {
		editingData,
		showForm,
		editPassword,
		removePassword,
		submitPassword,
		cancelEdit,
		showPasswords,
		togglePasswordVisibility,
		confirmDelete,
		deleteIndex,
		isDeleteDialogVisible,
		filteredPasswords,
		searchQuery,
		debouncedUpdateSearch,
		selectedTag,
		allTags,
	}
}
