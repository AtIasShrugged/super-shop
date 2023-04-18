import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateProductDto {
	@IsString()
	@IsOptional()
	public ean: string

	@IsString()
	@IsOptional()
	public name: string

	@IsString()
	@IsOptional()
	public description: string

	@IsNumber()
	@IsOptional()
	public cost: number
}
