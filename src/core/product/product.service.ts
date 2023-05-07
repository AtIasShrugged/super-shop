import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './domain/product-types'
import { Product } from './domain/product.entity'
import { AbstractProductRepository } from './repository/abstract.product.repository'

@Injectable()
export class ProductService {
	constructor(private repository: AbstractProductRepository) {}

	public async findProducts() {
		const products = await this.repository.find({})
		return products
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