import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { ProductModule } from './core/product/product.module'
import { UserModule } from './core/user/user.module'
import configuration from './config/configuration'

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			expandVariables: true,
			isGlobal: true,
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
		}),
		ProductModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
