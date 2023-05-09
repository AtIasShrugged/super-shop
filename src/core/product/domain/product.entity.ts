import { Entity } from '../../../domain/Entity'
import { ProductDto, CreateProductDto, UpdateProductDto, ProductFieldDto } from './product-types'

export class Product extends Entity<ProductDto> {
	public ean: string
	public brand: string
	public name: string
	public description?: string
	public cost: number
	public discount: number
	public category: string
	public fields: ProductFieldDto[]

	private constructor(dto: CreateProductDto) {
		super()
		const { ean, brand, name, description, cost, discount, category, fields } = dto
		this.ean = ean
		this.brand = brand
		this.name = name
		this.description = description
		this.cost = cost
		this.discount = discount
		this.category = category
		this.fields = fields
	}

	static create(dto: CreateProductDto) {
		const product = new Product(dto)
		return product
	}

	update(dto: UpdateProductDto) {
		const {
			brand = this.brand,
			name = this.name,
			description = this.description,
			cost = this.cost,
			discount = this.discount,
			category = this.category,
			ean = this.ean,
		} = dto

		this.brand = brand
		this.name = name
		this.description = description
		this.cost = cost
		this.discount = discount
		this.category = category
		this.ean = ean
	}

	public toDto(): ProductDto {
		const { ean, brand, name, description, cost, category, discount, fields } = this
		return { ean, brand, name, description, cost, category, discount, fields }
	}
}
