import { useStorage } from '@vueuse/core'
import type { PasswordEntry } from '@/types/password'

const PASSWORD_STORAGE_KEY = 'password-manager-data'

export const usePasswordStorage = () => {
	const storage = useStorage<PasswordEntry[]>(PASSWORD_STORAGE_KEY, [])

	const savePasswords = (passwords: PasswordEntry[]) => {
		storage.value = passwords
	}

	const loadPasswords = (): PasswordEntry[] => {
		return storage.value || []
	}

	return {
		savePasswords,
		loadPasswords,
	}
}
