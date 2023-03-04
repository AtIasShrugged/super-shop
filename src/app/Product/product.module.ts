import { Module } from '@nestjs/common'
import { PrismaService } from 'src/infrastructure/prisma.service'
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module'
import { ProductController } from './product.controller'
import { ProductRepository } from './repository/product.repository'
import { ProductService } from './product.service'

@Module({
	imports: [PrismaModule],
	controllers: [ProductController],
	providers: [ProductService, PrismaService, ProductRepository],
})
export class ProductModule {}
