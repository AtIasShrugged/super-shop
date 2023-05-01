// construction for compatibility prisma role enum with entity role type
export const Role: { [x: string]: 'USER' | 'ADMIN' } = { USER: 'USER', ADMIN: 'ADMIN' }
export type Role = (typeof Role)[keyof typeof Role]

export type UserDto = {
	email: string
	password: string
	firstName: string
	lastName: string
	phoneNumber: string
	role?: Role
	isConfirmed?: boolean
}

export type SignUpDto = Omit<UserDto, 'role' | 'isConfirmed'>
