import { Field, ID, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator'
import { ProductFieldGQLType } from '../types'
import { UpdateProductFieldInput } from './'

@InputType('UpdateProductInput')
export class UpdateProductGQLInput {
	@IsNotEmpty()
	@Field(() => ID)
	id!: number

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	ean!: string | null

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	brand!: string | null

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	name!: string | null

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	description!: string | null

	@IsPositive()
	@IsOptional()
	@Field(() => Int, { nullable: true })
	cost!: number | null

	@IsPositive()
	@IsOptional()
	@Field(() => Int, { nullable: true })
	discount!: number

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	category!: string

	@IsOptional()
	@Field(() => [UpdateProductFieldInput], { nullable: true })
	fields: ProductFieldGQLType[] | null
}
