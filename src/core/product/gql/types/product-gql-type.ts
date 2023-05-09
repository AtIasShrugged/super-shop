import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { ProductFieldGQLType, ProductCategoryGQLType } from './'

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

	@Field(() => ProductCategoryGQLType)
	category!: string

	@Field(() => [ProductFieldGQLType], { nullable: true })
	fields: ProductFieldGQLType[] | null
}
