import { ref, watch, computed, onMounted } from 'vue'
import type { PasswordEntry, PasswordFormEmits } from '@/types/password'
import { useFormSession } from '@/services/form-session.service'
import { debounce } from '@/utils/debounce'

export function usePasswordForm(initialData?: PasswordEntry | null) {
	const {
		sessionFormData,
		saveFormSession,
		loadFormSession,
		clearFormSession,
	} = useFormSession()

	const formData = ref({
		name: '',
		mail: '',
		password: '',
		tags: '',
	})

	const originalData = ref<PasswordEntry | null>(null)

	onMounted(() => {
		const sessionData = loadFormSession()
		if (sessionData) {
			formData.value = {
				name: sessionData.name || '',
				mail: sessionData.mail || '',
				password: sessionData.password || '',
				tags: sessionData.tags?.map(tag => tag.text).join('; ') || '',
			}
		}
	})

	watch(
		() => initialData,
		newValue => {
			if (newValue) {
				originalData.value = newValue
				formData.value = {
					name: newValue.name,
					mail: newValue.mail,
					password: newValue.password,
					tags: newValue.tags?.map(tag => tag.text).join('; ') || '',
				}
			} else {
				originalData.value = null
			}
		},
		{ immediate: true }
	)

	const debouncedSave = debounce((data: Partial<PasswordEntry>) => {
		saveFormSession(data)
	}, 200)

	watch(
		() => ({
			name: formData.value.name,
			mail: formData.value.mail,
			password: formData.value.password,
			tags: formData.value.tags,
		}),
		newValue => {
			if (
				newValue.name ||
				newValue.mail ||
				newValue.password ||
				newValue.tags
			) {
				debouncedSave({
					name: newValue.name,
					mail: newValue.mail,
					password: newValue.password,
					tags: newValue.tags
						.split(';')
						.map(tag => tag.trim())
						.filter(tag => tag.length > 0)
						.map(text => ({ text })),
				})
			}
		}
		// { deep: true }
	)

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
		clearFormSession()
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

	const errorFields = ref({
		name: false,
		mail: false,
		password: false,
	})

	const clearErrors = () => {
		errorFields.value = {
			name: false,
			mail: false,
			password: false,
		}
	}

	const submitPasswordForm = (emit: PasswordFormEmits, toast: any) => {
		clearErrors()

		let hasError = false
		const newErrorFields = {
			name: !formData.value.name,
			mail: !formData.value.mail,
			password: !formData.value.password,
		}

		if (newErrorFields.name || newErrorFields.mail || newErrorFields.password) {
			errorFields.value = newErrorFields
			hasError = true

			toast.add({
				severity: 'error',
				summary: 'Ошибка',
				detail: 'Заполните все обязательные поля!',
				life: 3000,
			})

			setTimeout(clearErrors, 3000)
			return
		}

		emit('submit', preparePasswordData())
		resetForm()
	}

	const cancelPasswordForm = (emit: PasswordFormEmits) => {
		resetForm()
		emit('cancel')
	}

	const showPassword = ref(false)

	return {
		formData,
		hasChanges,
		resetForm,
		preparePasswordData,
		submitPasswordForm,
		cancelPasswordForm,
		showPassword,
		errorFields,
	}
}
