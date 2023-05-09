import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { ProductService } from '../product.service'
import { CreateProductGQLInput, SearchOptions } from './inputs'
import { ProductFieldGQLType, ProductGQLType } from './types'

@Resolver(() => ProductGQLType)
export class ProductGQLResolver {
	constructor(private productService: ProductService) {}

	@ResolveField(() => [ProductFieldGQLType])
	productFields(@Parent() { id }: ProductGQLType) {
		return this.productService.getProductFields(id)
	}

	@Query(() => [ProductGQLType])
	productsList(@Args('searchOptions') options: SearchOptions) {
		return this.productService.findProducts(options)
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
