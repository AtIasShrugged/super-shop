import { Prisma } from '@prisma/client'
import { AbstractProductRepository, searchOptions } from './abstract.product.repository'
import { PrismaService } from '../../../infrastructure/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductRepository implements AbstractProductRepository {
	constructor(private prisma: PrismaService) {}

	async create(productInput: Prisma.ProductCreateInput) {
		const product = await this.prisma.product.create({ data: productInput })
		return product
	}

	async find(options: searchOptions) {
		const { limit = 10, offset = 0, order = 'asc' } = options
		const products = await this.prisma.product.findMany({
			take: limit,
			skip: offset,
			orderBy: { name: order },
		})
		return products
	}

	async findById(id: number) {
		const product = await this.prisma.product.findUniqueOrThrow({
			where: {
				id,
			},
		})
		return product
	}
}
