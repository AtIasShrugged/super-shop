import { Product as ProductModel } from '@prisma/client'
import { Product } from '../product.entity'

export interface IProductRepository {
	create: (product: Product) => Promise<ProductModel>
	getAll: () => Promise<ProductModel[]>
	findById: (id: number) => Promise<ProductModel | null>
}
