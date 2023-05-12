import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('ProductField')
export class ProductFieldGQLType {
	@Field(() => ID)
	id!: number

	@Field(() => String)
	name!: string

	@Field(() => String)
	value!: string

	@Field(() => String, { nullable: true })
	description!: string | null
}
