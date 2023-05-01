export type ProductDto = {
	ean: string
	name: string
	description?: string
	cost: number
}

export type CreateProductDto = ProductDto

export type UpdateProductDto = Partial<CreateProductDto>
