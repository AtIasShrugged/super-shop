import { Field, ID, InputType, Int } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator'
import { ProductFieldGQLType } from '../types'
import { UpdateProductFieldInput } from './'
import { StockStatus } from '../../domain/product-types'

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
	discount!: number | null

	@IsEnum(StockStatus)
	@IsOptional()
	@Field(() => StockStatus, { nullable: true })
	stockStatus!: StockStatus | null

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	category!: string | null

	@IsOptional()
	@Field(() => [UpdateProductFieldInput], { nullable: true })
	fields: ProductFieldGQLType[] | null
}
