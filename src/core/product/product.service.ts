import { Injectable } from '@nestjs/common'
import { CreateProductDto, CreateProductFieldDto, UpdateProductDto } from './domain/product-types'
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

	public async updateProduct(dto: UpdateProductDto) {
		const product = await this.repository.findById(+dto.id)
		const productEntity = Product.create({ ...product, category: product.category.name })

		productEntity.update(dto)
		productEntity.updateFields(dto.fields)

		const updatedProduct = await this.repository.update({
			...productEntity,
			fields: productEntity.fields,
		})

		return updatedProduct
	}

	public async deleteProduct(id: number) {
		const product = await this.repository.delete(id)
		return product
	}

	public async addFieldsToProduct(productId: number, fields: CreateProductFieldDto[]) {
		const newFields = await this.repository.addFieldsToProduct(productId, fields)
		return newFields
	}
}
