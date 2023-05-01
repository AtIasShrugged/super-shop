import { Module } from '@nestjs/common'
import { PrismaService } from '../../infrastructure/prisma/prisma.service'
import { PrismaModule } from '../../infrastructure/prisma/prisma.module'
import { ProductRepository } from './repository/product.repository'
import { AbstractProductRepository } from './repository/abstract.product.repository'
import { ProductService } from './product.service'
import { ProductGQLResolver } from './gql/product-gql-resolver'

@Module({
	imports: [PrismaModule],
	providers: [
		ProductGQLResolver,
		ProductService,
		PrismaService,
		{ provide: AbstractProductRepository, useClass: ProductRepository },
	],
})
export class ProductModule {}
