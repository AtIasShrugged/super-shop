import { Prisma } from '@prisma/client'
import { IProductRepository } from './types/product.repository.interface'
import { PrismaService } from '../../infrastructure/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductRepository implements IProductRepository {
	constructor(private prisma: PrismaService) {}

	async create(productInput: Prisma.ProductCreateInput) {
		console.log(productInput)

		const product = await this.prisma.product.create({ data: productInput })
		console.log(product)

		return product
	}

	async getAll() {
		const products = await this.prisma.product.findMany({ orderBy: { id: 'asc' } })
		console.log(products)

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
