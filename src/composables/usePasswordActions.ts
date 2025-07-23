import { usePasswordStore } from '@/stores/usePassword'
import type { PasswordEntry } from '@/types/password'

export function usePasswordActions() {
	const passwordStore = usePasswordStore()

	const addPassword = (newPassword: PasswordEntry) => {
		passwordStore.addPassword(newPassword)
	}

	const deletePassword = (index: number) => {
		passwordStore.deletePassword(index)
	}

	const updatePassword = (index: number, updatedPassword: PasswordEntry) => {
		passwordStore.updatePassword(index, updatedPassword)
	}

	return {
		addPassword,
		deletePassword,
		updatePassword,
	}
}
