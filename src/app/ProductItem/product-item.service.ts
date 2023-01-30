import { Injectable } from '@nestjs/common'
import { ProductItem, ProductItemType } from './product-item.entity'

export type ProductItemDto = {
	_id: number
	name: string
	description: string
	cost: number
}

export type createDto = Omit<ProductItemDto, '_id'>

const mockData: ProductItemDto[] = [
	{ _id: 1, name: 'Iphone X', description: 'Apple phone X gen', cost: 1000 },
	{ _id: 2, name: 'Samsung S22 Ultra', description: 'Samsung top flagman 2022', cost: 899 },
	{ _id: 3, name: 'Nokia 2210', description: 'Classic.', cost: 1 },
]

@Injectable()
export class ProductItemService {
	getAll() {
		// TODO: change to repository call
		return mockData
	}

	getById(id: number) {
		// TODO: change to repository call
		return mockData.find((p) => p._id === +id)
	}

	create(dto: createDto) {
		const product = ProductItem.create(dto)

		// TODO: change to repository call
		const _id = Date.now()
		mockData.push({ _id, ...product } as ProductItemDto)
	}
}
