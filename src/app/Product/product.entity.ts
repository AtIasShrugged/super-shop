import { Entity } from 'src/domain/Entity'
import { ProductDto, CreateProductDto, UpdateProductDto } from './dto'

export class Product extends Entity<ProductDto> {
	private readonly id?: number
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

	static create(product: CreateProductDto) {
		const instance = new Product(product)
		return instance
	}

	update(product: UpdateProductDto) {
		const { name, description, cost, ean } = product

		this.name = name
		this.description = description
		this.cost = cost
		this.ean = ean
	}

	public toDto(): ProductDto {
		const { id, ean, name, description, cost } = this
		return { id, ean, name, description, cost }
	}
}
