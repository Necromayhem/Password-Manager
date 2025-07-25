import { ref, computed } from 'vue'
import { usePasswordStore } from '@/stores/usePassword'
import { debounce } from '@/utils/debounce'

export function useSearch() {
	const passwordStore = usePasswordStore()
	const searchQuery = ref('')

	const filteredPasswords = computed(() => {
		if (!searchQuery.value.trim()) return passwordStore.passwords

		const query = searchQuery.value.toLowerCase().trim()
		return passwordStore.passwords.filter(password => {
			const nameMatch = password.name.toLowerCase().includes(query)
			const mailMatch = password.mail.toLowerCase().includes(query)
			const tagsMatch =
				password.tags?.some(tag => tag.text.toLowerCase().includes(query)) ??
				false

			return nameMatch || mailMatch || tagsMatch
		})
	})

	const debouncedUpdateSearch = debounce((value: string) => {
		searchQuery.value = value
	}, 300)

	return {
		searchQuery,
		filteredPasswords,
		debouncedUpdateSearch,
	}
}
