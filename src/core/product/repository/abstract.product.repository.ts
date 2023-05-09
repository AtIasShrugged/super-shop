import { Product as ProductModel, ProductField } from '@prisma/client'
import { Product } from '../domain/product.entity'
import { SearchOptions } from '../gql/inputs'

export abstract class AbstractProductRepository {
	create: (product: Product) => Promise<ProductModel>
	find: (options: SearchOptions) => Promise<ProductModel[]>
	getProductFields: (productId: number) => Promise<ProductField[]>
	findById: (id: number) => Promise<ProductModel>
}
