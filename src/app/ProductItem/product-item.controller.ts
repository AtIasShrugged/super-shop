import { Controller, Get, Param, Post } from '@nestjs/common'
import { createDto, ProductItemDto, ProductItemService } from './product-item.service'

@Controller('products')
export class ProductItemController {
	constructor(public productItemService: ProductItemService) {}

	@Get()
	findAll(): ProductItemDto[] {
		return this.productItemService.getAll()
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.productItemService.getById(id)
	}

	@Post()
	create(dto: createDto) {
		this.productItemService.create(dto)
	}
}
