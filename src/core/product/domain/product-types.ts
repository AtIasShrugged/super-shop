export type ProductDto = {
	id?: number
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

export type UpdateProductDto = Partial<Omit<CreateProductDto, 'fields'>> & {
	fields?: UpdateProductFieldDto[]
}

export type ProductFieldDto = {
	id?: number
	name: string
	value: string
	description?: string
}

export type CreateProductFieldDto = ProductFieldDto

export type UpdateProductFieldDto = Partial<ProductFieldDto>
