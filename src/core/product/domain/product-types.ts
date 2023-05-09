export type ProductDto = {
	ean: string
	brand: string
	name: string
	description?: string
	cost: number
	discount?: number
	category: string
	fields?: ProductFieldDto[]
}

export type CreateProductDto = ProductDto

export type UpdateProductDto = Partial<CreateProductDto>

export type ProductFieldDto = {
	name: string
	value: string
	description?: string
}

export type CreateProductFieldDto = ProductFieldDto

export type UpdateProductFieldDto = Partial<ProductFieldDto>
