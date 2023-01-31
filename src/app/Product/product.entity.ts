import { Entity } from 'src/domain/Entity'
import * as ProductTypes from './types/product.types'

export class Product extends Entity<ProductTypes.DTO> {
	private readonly id?: number
	public ean: string
	public name: string
	public description: string
	public cost: number

	private constructor(dto: ProductTypes.CreateDTO) {
		super()
		const { id, ean, name, description, cost } = dto
		this.id = id
		this.ean = ean
		this.name = name
		this.description = description
		this.cost = cost
	}

	static create(product: ProductTypes.CreateDTO) {
		const instance = new Product(product)
		return instance
	}

	update(product: ProductTypes.UpdateDTO) {
		const { name, description, cost } = product

		this.name = name
		this.description = description
		this.cost = cost
	}

	public toDto(): ProductTypes.DTO {
		const { id, ean, name, description, cost } = this
		return { id, ean, name, description, cost }
	}
}
