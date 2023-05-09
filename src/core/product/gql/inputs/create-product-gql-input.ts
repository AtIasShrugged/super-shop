import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator'
import { ProductFieldGQLType } from '../types'
import { CreateProductFieldInput } from './'

@InputType('CreateProductInput')
export class CreateProductGQLInput {
	@IsString()
	@IsNotEmpty()
	@Field(() => String)
	ean!: string

	@IsString()
	@IsNotEmpty()
	@Field(() => String)
	brand!: string

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

	@IsPositive()
	@IsOptional()
	@Field(() => Int)
	discount!: number

	@IsString()
	@Field(() => String)
	category!: string

	@IsOptional()
	@Field(() => [CreateProductFieldInput], { nullable: true })
	fields: ProductFieldGQLType[] | null
}
