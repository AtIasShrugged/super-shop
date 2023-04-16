import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateProductDto {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	public ean: string

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	public name: string

	@IsString()
	@IsOptional()
	public description: string

	@IsNumber()
	@IsNotEmpty()
	@IsOptional()
	public cost: number
}
