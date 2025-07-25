import { usePasswordStore } from '@/stores/usePassword'
import { useToast } from 'primevue/usetoast'
import type { PasswordEntry } from '@/types/password'
import { useClipboard } from '@vueuse/core'

export function usePasswordActions() {
	const passwordStore = usePasswordStore()
	const toast = useToast()
	const { copy } = useClipboard()

	const addPassword = (newPassword: PasswordEntry) => {
		passwordStore.addPassword(newPassword)
		showToast('success', 'Успешно', 'Пароль успешно добавлен')
	}

	const deletePassword = (index: number) => {
		const deletedItem = passwordStore.passwords[index]
		passwordStore.deletePassword(index)
		showToast('warn', 'Удалено', `Пароль для ${deletedItem.name} удалён`)
	}

	const updatePassword = (index: number, updatedPassword: PasswordEntry) => {
		passwordStore.updatePassword(index, updatedPassword)
		showToast('info', 'Обновлено', 'Данные успешно обновлены')
	}

	const copyPassword = async (password: string) => {
		try {
			await copy(password)
			showToast('info', 'Скопировано', 'Пароль скопирован в буфер обмена')
			return true
		} catch (error) {
			showToast('error', 'Ошибка', 'Не удалось скопировать пароль')
			return false
		}
	}

	const showToast = (
		severity: 'success' | 'info' | 'warn' | 'error',
		summary: string,
		detail: string
	) => {
		toast.add({
			severity,
			summary,
			detail,
			life: 3000,
		})
	}

	return {
		addPassword,
		deletePassword,
		updatePassword,
		copyPassword,
	}
}
