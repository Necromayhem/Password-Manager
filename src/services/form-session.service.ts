import { ref } from 'vue'
import type { PasswordEntry } from '@/types/password'

const FORM_SESSION_KEY = 'form-session-data'

export const useFormSession = () => {
	const sessionFormData = ref<Partial<PasswordEntry> | null>(null)

	const saveFormSession = (data: Partial<PasswordEntry>) => {
		sessionFormData.value = data
		sessionStorage.setItem(FORM_SESSION_KEY, JSON.stringify(data))
	}

	const loadFormSession = (): Partial<PasswordEntry> | null => {
		const data = sessionStorage.getItem(FORM_SESSION_KEY)
		return data ? JSON.parse(data) : null
	}

	const clearFormSession = () => {
		sessionFormData.value = null
		sessionStorage.removeItem(FORM_SESSION_KEY)
	}

	return {
		sessionFormData,
		saveFormSession,
		loadFormSession,
		clearFormSession,
	}
}
