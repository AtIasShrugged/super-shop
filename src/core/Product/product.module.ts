import { Module } from '@nestjs/common'
import { PrismaService } from 'src/infrastructure/prisma.service'
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module'
import { ProductRepository } from './repository/product.repository'
import { ProductService } from './product.service'
import { ProductGQLResolver } from './gql/product-gql-resolver'

@Module({
	imports: [PrismaModule],
	controllers: [],
	providers: [ProductGQLResolver, ProductService, PrismaService, ProductRepository],
})
export class ProductModule {}
