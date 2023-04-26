export type UserDto = {
	email: string
	password: string
	firstName: string
	lastName: string
	phoneNumber: string
	isConfirmed?: boolean
}

export type SignUpDto = Omit<UserDto, 'isConfirmed'>
