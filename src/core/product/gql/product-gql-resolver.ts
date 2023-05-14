import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ProductService } from '../product.service'
import {
	CreateProductFieldInput,
	CreateProductGQLInput,
	SearchOptions,
	UpdateProductGQLInput,
} from './inputs'
import { ProductFieldGQLType, ProductGQLType } from './types'

@Resolver(() => ProductGQLType)
export class ProductGQLResolver {
	constructor(private productService: ProductService) {}

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

	@Mutation(() => ProductGQLType)
	async updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductGQLInput) {
		const product = await this.productService.updateProduct(updateProductInput)
		return product
	}

	@Mutation(() => ProductGQLType)
	async deleteProduct(@Args('id', { type: () => Int }) id: number) {
		const product = await this.productService.deleteProduct(id)
		return product
	}

	@Mutation(() => [ProductFieldGQLType])
	async addFieldsToProduct(
		@Args('productId', { type: () => Int }) productId: number,
		@Args('fieldsInput', { type: () => [CreateProductFieldInput] })
		fieldsInput: CreateProductFieldInput[],
	) {
		const fields = await this.productService.addFieldsToProduct(productId, fieldsInput)
		return fields
	}
}
