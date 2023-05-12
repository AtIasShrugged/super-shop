import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('ProductCategory')
export class ProductCategoryGQLType {
	@Field(() => ID)
	id!: number

	@Field(() => String)
	name!: string
}
