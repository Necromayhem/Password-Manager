import { ref, watchEffect, computed } from 'vue'
import type { PasswordEntry, PasswordFormEmits } from '@/types/password'

export function usePasswordForm(initialData?: PasswordEntry | null) {
	const formData = ref({
		name: '',
		mail: '',
		password: '',
		tags: '',
	})

	const originalData = ref<PasswordEntry | null>(null)

	watchEffect(() => {
		if (initialData) {
			originalData.value = initialData
			formData.value = {
				name: initialData.name,
				mail: initialData.mail,
				password: initialData.password,
				tags: initialData.tags?.map(tag => tag.text).join('; ') || '',
			}
		} else {
			originalData.value = null
		}
	})

	const hasChanges = computed(() => {
		if (!originalData.value) return false

		const currentTags = formData.value.tags
			.split(';')
			.map(tag => tag.trim())
			.filter(tag => tag.length > 0)

		const originalTags = originalData.value.tags?.map(tag => tag.text) || []

		return (
			formData.value.name !== originalData.value.name ||
			formData.value.mail !== originalData.value.mail ||
			formData.value.password !== originalData.value.password ||
			JSON.stringify(currentTags) !== JSON.stringify(originalTags)
		)
	})

	const resetForm = () => {
		formData.value = {
			name: '',
			mail: '',
			password: '',
			tags: '',
		}
		originalData.value = null
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

	const submitPasswordForm = (emit: PasswordFormEmits, toast: any) => {
		if (
			!formData.value.name ||
			!formData.value.mail ||
			!formData.value.password
		) {
			toast.add({
				severity: 'error',
				summary: 'Ошибка',
				detail: 'Заполните все обязательные поля!',
				life: 3000,
			})
			return
		}
		emit('submit', preparePasswordData())
		resetForm()
	}

	const cancelPasswordForm = (emit: PasswordFormEmits) => {
		resetForm()
		emit('cancel')
	}

	return {
		formData,
		hasChanges,
		resetForm,
		preparePasswordData,
		submitPasswordForm,
		cancelPasswordForm,
	}
}
