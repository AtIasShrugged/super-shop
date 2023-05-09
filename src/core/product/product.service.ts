import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './domain/product-types'
import { Product } from './domain/product.entity'
import { AbstractProductRepository } from './repository/abstract.product.repository'
import { SearchOptions } from './gql/inputs'

@Injectable()
export class ProductService {
	constructor(private repository: AbstractProductRepository) {}

	public async findProducts(options: SearchOptions) {
		const products = await this.repository.find(options)
		return products
	}

	public async getProductFields(productId: number) {
		const fields = await this.repository.getProductFields(productId)
		return fields
	}

	public async findProductById(id: number) {
		const product = await this.repository.findById(id)
		return product
	}

	public async createProduct(dto: CreateProductDto) {
		const productEntity = Product.create(dto)
		const product = await this.repository.create(productEntity)
		return product
	}
}
