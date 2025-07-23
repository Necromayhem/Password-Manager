import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Tag {
	text: string
}

export interface PasswordEntry {
	name: string
	mail: string
	password: string
	tags?: Tag[]
}

export const usePasswordStore = defineStore('password', () => {
	const passwords = ref<PasswordEntry[]>([])

	function addPassword(newPassword: PasswordEntry) {
		passwords.value.push(newPassword)
	}

	function deletePassword(index: number) {
		passwords.value.splice(index, 1)
	}

	function updatePassword(index: number, updatedPassword: PasswordEntry) {
		passwords.value[index] = updatedPassword
	}

	return {
		passwords,
		addPassword,
		deletePassword,
		updatePassword,
	}
})
