import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { PasswordEntry } from '@/types/password'
import { usePasswordStorage } from '@/services/storage.service'

export const usePasswordStore = defineStore('password', () => {
	const { loadPasswords, savePasswords } = usePasswordStorage()
	const passwords = ref<PasswordEntry[]>(loadPasswords())

	function addPassword(newPassword: PasswordEntry) {
		passwords.value.push(newPassword)
		savePasswords(passwords.value)
	}

	function deletePassword(index: number) {
		passwords.value.splice(index, 1)
		savePasswords(passwords.value)
	}

	function updatePassword(index: number, updatedPassword: PasswordEntry) {
		passwords.value[index] = updatedPassword
		savePasswords(passwords.value)
	}

	return {
		passwords,
		addPassword,
		deletePassword,
		updatePassword,
	}
})
