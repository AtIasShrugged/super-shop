import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ProductGQLType } from './types/product-gql-type'
import { ProductService } from '../product.service'
import { CreateProductGQLInput } from './inputs/create-product-gql-input'

@Resolver(() => ProductGQLType)
export class ProductGQLResolver {
	constructor(private productService: ProductService) {}

	@Query(() => [ProductGQLType])
	productsList() {
		return this.productService.findProducts()
	}

	@Query(() => ProductGQLType)
	product(@Args('id', { type: () => Int }) id: number) {
		return this.productService.findProductById(id)
	}

	@Mutation(() => ProductGQLType)
	async createProduct(@Args('productInput') productInput: CreateProductGQLInput) {
		const product = await this.productService.createProduct(productInput)
		return product
	}
}
