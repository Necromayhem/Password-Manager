export interface Tag {
	text: string
}

export interface PasswordEntry {
	name: string
	mail: string
	password: string
	tags?: Tag[]
}

export type PasswordFormEmits = {
	(e: 'submit', data: PasswordEntry): void
	(e: 'cancel'): void
}
