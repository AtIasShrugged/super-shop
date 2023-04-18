import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto'
import { Product } from './product.entity'
import { AbstractProductRepository } from './repository/abstract.product.repository'

@Injectable()
export class ProductService {
	constructor(private repository: AbstractProductRepository) {}

	public async getProducts() {
		const products = await this.repository.getAll()
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
