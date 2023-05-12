import { Entity } from '../../../domain/Entity'
import {
	ProductDto,
	CreateProductDto,
	UpdateProductDto,
	ProductFieldDto,
	UpdateProductFieldDto,
	StockStatus,
} from './product-types'

export class Product extends Entity<ProductDto> {
	public readonly id?: number
	public ean: string
	public brand: string
	public name: string
	public description?: string
	public cost: number
	public discount: number
	public stockStatus: StockStatus
	public category: string
	public fields: ProductFieldDto[]

	private constructor(dto: CreateProductDto) {
		super()
		const { id, ean, brand, name, description, cost, discount, stockStatus, category, fields } = dto
		this.id = id
		this.ean = ean
		this.brand = brand
		this.name = name
		this.description = description
		this.cost = cost
		this.discount = discount
		this.stockStatus = stockStatus
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
			stockStatus = this.stockStatus,
			category = this.category,
			ean = this.ean,
		} = dto

		this.brand = brand
		this.name = name
		this.description = description
		this.cost = cost
		this.discount = discount
		this.stockStatus = stockStatus
		this.category = category
		this.ean = ean
	}

	updateFields(fields: UpdateProductFieldDto[]) {
		this.fields = this.fields.map((field) => {
			fields.map((newField) => {
				if (field.id == newField.id) {
					field.name = newField.name || field.name
					field.value = newField.value || field.value
					field.description = newField.description || field.description
				}
			})
			return field
		})
	}

	public toDto(): ProductDto {
		const { id, ean, brand, name, description, cost, discount, stockStatus, category, fields } =
			this
		return { id, ean, brand, name, description, cost, discount, stockStatus, category, fields }
	}
}
