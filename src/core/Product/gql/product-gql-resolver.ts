import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { ProductGQLType } from './types/product-gql-type'
import { ProductService } from '../product.service'

@Resolver(() => ProductGQLType)
export class ProductGQLResolver {
	constructor(private productService: ProductService) {}

	@Query(() => [ProductGQLType])
	async productsList() {
		return this.productService.getProducts()
	}

	@Query(() => ProductGQLType)
	async product(@Args('id', { type: () => Int }) id: number) {
		return this.productService.findProductById(id)
	}
}
