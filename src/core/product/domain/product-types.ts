export const StockStatus: {
	[x: string]: 'IN_STOCK' | 'OUT_OF_STOCK' | 'ENDS' | 'PENDING_SHIPMENT'
} = {
	IN_STOCK: 'IN_STOCK',
	OUT_OF_STOCK: 'OUT_OF_STOCK',
	ENDS: 'ENDS',
	PENDING_SHIPMENT: 'PENDING_SHIPMENT',
}
export type StockStatus = (typeof StockStatus)[keyof typeof StockStatus]

export type ProductDto = {
	id?: number
	ean: string
	brand: string
	name: string
	description?: string
	cost: number
	discount?: number
	stockStatus: StockStatus
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
