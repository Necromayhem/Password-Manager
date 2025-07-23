import { ref, watchEffect } from 'vue'
import type { PasswordEntry, Tag } from '@/types/password'

export function usePasswordForm(initialData?: PasswordEntry | null) {
	const formData = ref({
		name: '',
		mail: '',
		password: '',
		tags: '',
	})

	watchEffect(() => {
		if (initialData) {
			formData.value = {
				name: initialData.name,
				mail: initialData.mail,
				password: initialData.password,
				tags: initialData.tags?.map(tag => tag.text).join('; ') || '',
			}
		}
	})

	const resetForm = () => {
		formData.value = {
			name: '',
			mail: '',
			password: '',
			tags: '',
		}
	}

	const preparePasswordData = (): PasswordEntry => {
		const tagsArray = formData.value.tags
			.split(';')
			.map(tag => tag.trim())
			.filter(tag => tag.length > 0)
			.map(text => ({ text }))

		return {
			name: formData.value.name,
			mail: formData.value.mail,
			password: formData.value.password,
			tags: tagsArray,
		}
	}

	return {
		formData,
		resetForm,
		preparePasswordData,
	}
}
