import { AbstractProductRepository } from './abstract.product.repository'
import { PrismaService } from '../../../infrastructure/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateProductDto } from '../domain/product-types'
import { Order, OrderBy, SearchOptions } from '../gql/inputs'

@Injectable()
export class ProductRepository implements AbstractProductRepository {
	constructor(private prisma: PrismaService) {}

	async create(productInput: CreateProductDto) {
		const { ean, brand, name, description, cost, discount, fields, category } = productInput
		const product = await this.prisma.product.create({
			data: {
				ean,
				brand,
				name,
				cost,
				discount,
				description,
				category: {
					connectOrCreate: {
						where: {
							name: category,
						},
						create: {
							name: category,
						},
					},
				},
				fields: {
					connectOrCreate: fields.map((field) => ({
						where: {
							name_value: {
								name: field.name,
								value: field.value,
							},
						},
						create: {
							name: field.name,
							value: field.value,
							description: field.description,
						},
					})),
				},
			},
			include: {
				category: true,
				fields: true,
			},
		})
		return product
	}

	async find(options: SearchOptions) {
		const { limit = 10, offset = 0, order = Order.ASC, orderBy = OrderBy.NAME } = options
		const products = await this.prisma.product.findMany({
			include: {
				category: true,
				fields: true,
			},
			take: limit,
			skip: offset,
			orderBy: { [orderBy]: order },
		})
		return products
	}

	async getProductFields(productId: number) {
		const fields = await this.prisma.productField.findMany({
			where: {
				products: {
					every: {
						id: productId,
					},
				},
			},
		})
		return fields
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
