import { User } from '../domain/user.entity'
import { Role } from '../domain/user-types'

export type searchOptions = {
	limit?: number
	offset?: number
	order?: 'asc' | 'desc'
	email?: string
	phoneNumber?: string
}

export type UserModel = {
	id: number
	email: string
	phoneNumber: string
	firstName: string
	lastName: string
	password: string
	role: Role
	isConfirmed: boolean
}

export abstract class AbstractUserRepository {
	create: (user: User) => Promise<UserModel>
	find: (options: searchOptions) => Promise<UserModel[]>
	findById: (id: number) => Promise<UserModel>
}
