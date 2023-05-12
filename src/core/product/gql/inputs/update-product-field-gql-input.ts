import { Field, ID, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType('UpdateProductFieldInput')
export class UpdateProductFieldInput {
	@IsNotEmpty()
	@Field(() => ID)
	id!: number

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	name!: string | null

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	value!: string | null

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	description!: string | null
}
