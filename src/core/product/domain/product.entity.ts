import { Entity } from '../../../domain/Entity'
import { ProductDto, CreateProductDto, UpdateProductDto } from './product-types'

export class Product extends Entity<ProductDto> {
	public ean: string
	public name: string
	public description: string
	public cost: number

	private constructor(dto: CreateProductDto) {
		super()
		const { ean, name, description, cost } = dto
		this.ean = ean
		this.name = name
		this.description = description
		this.cost = cost
	}

	static create(dto: CreateProductDto) {
		const product = new Product(dto)
		return product
	}

	update(dto: UpdateProductDto) {
		const {
			name = this.name,
			description = this.description,
			cost = this.cost,
			ean = this.ean,
		} = dto

		this.name = name
		this.description = description
		this.cost = cost
		this.ean = ean
	}

	public toDto(): ProductDto {
		const { ean, name, description, cost } = this
		return { ean, name, description, cost }
	}
}
