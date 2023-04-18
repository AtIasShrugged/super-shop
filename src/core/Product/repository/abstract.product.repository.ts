import { Product as ProductModel } from '@prisma/client'
import { Product } from '../product.entity'

export abstract class AbstractProductRepository {
	create: (product: Product) => Promise<ProductModel>
	getAll: () => Promise<ProductModel[]>
	findById: (id: number) => Promise<ProductModel>
}
