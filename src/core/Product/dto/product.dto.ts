import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ProductDto {
	@IsNumber()
	@IsNotEmpty()
	public id: number

	@IsString()
	@IsNotEmpty()
	public ean: string

	@IsString()
	@IsNotEmpty()
	public name: string

	@IsString()
	public description: string

	@IsNumber()
	@IsNotEmpty()
	public cost: number
}
