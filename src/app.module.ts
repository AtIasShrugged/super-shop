import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductItemModule } from './app/ProductItem/product-item.module'

@Module({
	imports: [ProductItemModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
