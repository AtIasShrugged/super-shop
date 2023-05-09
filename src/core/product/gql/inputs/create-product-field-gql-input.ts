import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType('CreateProductFieldInput')
export class CreateProductFieldInput {
	@IsString()
	@IsNotEmpty()
	@Field(() => String)
	name!: string

	@IsString()
	@IsNotEmpty()
	@Field(() => String)
	value!: string

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	description!: string | null
}
