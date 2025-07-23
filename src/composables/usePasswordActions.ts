import { usePasswordStore } from '@/stores/usePassword'
import { useToast } from 'primevue/usetoast'
import type { PasswordEntry } from '@/types/password'

export function usePasswordActions() {
	const passwordStore = usePasswordStore()
	const toast = useToast()

	const addPassword = (newPassword: PasswordEntry) => {
		passwordStore.addPassword(newPassword)
		toast.add({
			severity: 'success',
			summary: 'Успешно',
			detail: 'Пароль успешно добавлен',
			life: 3000,
		})
	}

	const deletePassword = (index: number) => {
		passwordStore.deletePassword(index)
		toast.add({
			severity: 'warn',
			summary: 'Успешно',
			detail: 'Пароль успешно удалён',
			life: 3000,
		})
	}

	const updatePassword = (index: number, updatedPassword: PasswordEntry) => {
		passwordStore.updatePassword(index, updatedPassword)
		toast.add({
			severity: 'info',
			summary: 'Успешно',
			detail: 'Данные успешно обновлены',
			life: 3000,
		})
	}

	return {
		addPassword,
		deletePassword,
		updatePassword,
	}
}
