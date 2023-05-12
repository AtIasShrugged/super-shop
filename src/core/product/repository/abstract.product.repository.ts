import { Product as PrismaProduct, ProductField, ProductCategory } from '@prisma/client'
import { Product } from '../domain/product.entity'
import { SearchOptions } from '../gql/inputs'
import { ProductFieldDto, UpdateProductDto as UpdateProduct } from '../domain/product-types'

export type ProductModel = PrismaProduct & { fields: ProductField[]; category: ProductCategory }

export abstract class AbstractProductRepository {
	create: (product: Product) => Promise<ProductModel>
	update: (product: UpdateProduct) => Promise<ProductModel>
	find: (options: SearchOptions) => Promise<ProductModel[]>
	delete: (id: number) => Promise<ProductModel>
	findById: (id: number) => Promise<ProductModel>
	getProductFields: (productId: number) => Promise<ProductField[]>
	addFieldsToProduct: (productId: number, fields: ProductFieldDto[]) => Promise<ProductField[]>
}
