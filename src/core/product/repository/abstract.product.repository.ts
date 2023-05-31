import { Product } from '../domain/product.entity'
import { SearchOptions } from '../gql/inputs'
import {
	ProductFieldDto,
	StockStatus,
	UpdateProductDto as UpdateProduct,
} from '../domain/product-types'

export type ProductFieldModel = {
	id: number
	name: string
	value: string
	description: string | null
}
export type ProductModel = {
	id: number
	brand: string
	name: string
	description: string | null
	cost: number
	discount: number
	ean: string
	category: {
		id: number
		name: string
	}
	stockStatus: StockStatus
	fields: ProductFieldModel[]
}

export abstract class AbstractProductRepository {
	create: (product: Product) => Promise<ProductModel>
	update: (product: UpdateProduct) => Promise<ProductModel>
	find: (options: SearchOptions) => Promise<ProductModel[]>
	delete: (id: number) => Promise<ProductModel>
	findById: (id: number) => Promise<ProductModel>
	getProductFields: (productId: number) => Promise<ProductFieldModel[]>
	addFieldsToProduct: (productId: number, fields: ProductFieldDto[]) => Promise<ProductFieldModel[]>
}
