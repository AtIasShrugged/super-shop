import { Field, InputType, Int } from '@nestjs/graphql'

@InputType('CreateProductInput')
export class CreateProductGQLInput {
	@Field(() => String)
	ean!: string

	@Field(() => String)
	name!: string

	@Field(() => String, { nullable: true })
	description!: string | null

	@Field(() => Int)
	cost!: number
}
