import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ProductFieldGQLType, ProductCategoryGQLType } from './'
import { StockStatus } from '../../domain/product-types'

registerEnumType(StockStatus, { name: 'StockStatus' })

@ObjectType('Product')
export class ProductGQLType {
	@Field(() => ID)
	id!: number

	@Field(() => String)
	ean!: string

	@Field(() => String)
	brand!: string

	@Field(() => String)
	name!: string

	@Field(() => String, { nullable: true })
	description!: string | null

	@Field(() => Int)
	cost!: number

	@Field(() => Int)
	discount!: number

	@Field(() => StockStatus)
	stockStatus!: StockStatus

	@Field(() => ProductCategoryGQLType)
	category!: string

	@Field(() => [ProductFieldGQLType], { nullable: true })
	fields: ProductFieldGQLType[] | null
}
