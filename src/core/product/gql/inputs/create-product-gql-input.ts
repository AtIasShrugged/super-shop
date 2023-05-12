import { Field, InputType, Int } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator'
import { ProductFieldGQLType } from '../types'
import { CreateProductFieldInput } from './'
import { StockStatus } from '../../domain/product-types'

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
	@IsNotEmpty()
	@Field(() => Int)
	cost!: number

	@IsPositive()
	@IsOptional()
	@Field(() => Int)
	discount!: number

	@IsEnum(StockStatus)
	@IsNotEmpty()
	@Field(() => StockStatus, { defaultValue: StockStatus.IN_STOCK })
	stockStatus!: StockStatus

	@IsString()
	@IsNotEmpty()
	@Field(() => String)
	category!: string

	@IsOptional()
	@Field(() => [CreateProductFieldInput], { nullable: true })
	fields: ProductFieldGQLType[] | null
}
