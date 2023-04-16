import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateProductDto } from './dto'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
	constructor(public productService: ProductService) {}

	@Get()
	findAll() {
		const products = this.productService.getProducts()
		return products
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		const product = this.productService.findProductById(id)
		return product
	}

	@Post()
	create(@Body() dto: CreateProductDto) {
		const product = this.productService.createProduct(dto)
		return product
	}
}
