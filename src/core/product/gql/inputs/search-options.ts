import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql'
import { IsEnum, IsNumber, IsOptional } from 'class-validator'

export enum OrderBy {
	ID = 'id',
	NAME = 'name',
	COST = 'cost',
	DISCOUNT = 'discount',
}

export enum Order {
	ASC = 'asc',
	DESC = 'desc',
}

registerEnumType(OrderBy, { name: 'orderBy' })
registerEnumType(Order, { name: 'order' })

@InputType('SearchOptions')
export class SearchOptions {
	@IsNumber()
	@IsOptional()
	@Field(() => Int, { nullable: true })
	limit?: number | null

	@IsNumber()
	@IsOptional()
	@Field(() => Int, { nullable: true })
	offset?: number | null

	@IsEnum(OrderBy)
	@IsOptional()
	@Field(() => OrderBy, { nullable: true })
	orderBy?: OrderBy | null

	@IsEnum(Order)
	@IsOptional()
	@Field(() => Order, { nullable: true })
	order?: Order | null
}
