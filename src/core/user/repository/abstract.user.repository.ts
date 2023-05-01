import { User as UserModel } from '@prisma/client'
import { User } from '../domain/user.entity'

export type searchOptions = {
	limit?: number
	offset?: number
	order?: 'asc' | 'desc'
	email?: string
	phoneNumber?: string
}

export abstract class AbstractUserRepository {
	create: (user: User) => Promise<UserModel>
	find: (options: searchOptions) => Promise<UserModel[]>
	findById: (id: number) => Promise<UserModel>
}
