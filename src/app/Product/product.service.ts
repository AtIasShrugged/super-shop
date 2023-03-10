import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto'
import { Product } from './product.entity'
import { ProductRepository } from './repository/product.repository'

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

	public async createProduct(dto: CreateProductDto) {
		const product = Product.create(dto)
		await this.repository.create(product)
		return product
	}
}
