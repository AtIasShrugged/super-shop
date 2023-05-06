import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator'

@InputType('CreateProductInput')
export class CreateProductGQLInput {
	@IsString()
	@IsNotEmpty()
	@Field(() => String)
	ean!: string

	@IsString()
	@IsNotEmpty()
	@Field(() => String)
	name!: string

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	description!: string | null

	@IsPositive()
	@Field(() => Int)
	cost!: number
}
