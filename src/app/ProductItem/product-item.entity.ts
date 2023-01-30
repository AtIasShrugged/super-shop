import { Entity } from 'src/domain/Entity'

export type ProductItemType = {
	name: string
	description: string
	cost: number
}

export type UpdateDTO = Partial<ProductItemType>

export class ProductItem extends Entity<ProductItemType> {
	constructor(props: ProductItemType) {
		super(props)
	}

	static create(product: ProductItemType) {
		const instance = new ProductItem(product)
		return instance
	}

	update(product: UpdateDTO) {
		const { name, description, cost } = product

		this.props.name = name
		this.props.description = description
		this.props.cost = cost
	}
}
