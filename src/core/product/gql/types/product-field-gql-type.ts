import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('ProductField')
export class ProductFieldGQLType {
	@Field(() => String)
	name!: string

	@Field(() => String)
	value!: string

	@Field(() => String, { nullable: true })
	description!: string | null
}
