import { Prisma } from '@prisma/client'
import { AbstractUserRepository, searchOptions } from './abstract.user.repository'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository implements AbstractUserRepository {
	constructor(private prisma: PrismaService) {}

	async create(userInput: Prisma.UserCreateInput) {
		const user = await this.prisma.user.create({ data: userInput })
		return user
	}

	async find(options: searchOptions) {
		const { limit = 10, offset = 0, order = 'asc', email, phoneNumber } = options
		const query = {
			take: limit,
			skip: offset,
			orderBy: { id: order },
			where: {
				email,
				phoneNumber,
			},
		}

		if (!email) delete query.where.email
		if (!phoneNumber) delete query.where.phoneNumber

		const users = await this.prisma.user.findMany(query)
		return users
	}

	async findById(id: number) {
		const user = await this.prisma.user.findUniqueOrThrow({
			where: {
				id,
			},
		})
		return user
	}
}
