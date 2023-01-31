import { Injectable } from '@nestjs/common'
import { Product } from './product.entity'
import { ProductRepository } from './product.repository'
import * as ProductTypes from './types/product.types'

@Injectable()
export class ProductService {
	constructor(private repository: ProductRepository) {}

	public async getProducts() {
		const products = await this.repository.getAll()
		return products
	}

	public async findProductById(id: number) {
		const product = await this.repository.findById(id)
		return product
	}

	public async createProduct(dto: ProductTypes.CreateDTO) {
		const product = Product.create(dto)
		await this.repository.create(product)
		return product
	}
}
