import { Product as ProductModel } from '@prisma/client'
import { Product } from '../domain/product.entity'

export type searchOptions = {
	limit?: number
	offset?: number
	order?: 'asc' | 'desc'
}

export abstract class AbstractProductRepository {
	create: (product: Product) => Promise<ProductModel>
	find: (options: searchOptions) => Promise<ProductModel[]>
	findById: (id: number) => Promise<ProductModel>
}
