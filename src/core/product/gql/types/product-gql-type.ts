import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType('Product')
export class ProductGQLType {
	@Field(() => ID)
	id!: number

	@Field(() => String)
	ean!: string

	@Field(() => String)
	name!: string

	@Field(() => String, { nullable: true })
	description!: string | null

	@Field(() => Int)
	cost!: number
}
