import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserGQLResolver } from './gql/user-gql-resolver'
import { PrismaModule } from '../../infrastructure/prisma/prisma.module'
import { PrismaService } from '../../infrastructure/prisma/prisma.service'
import { AbstractUserRepository } from './repository/abstract.user.repository'
import { UserRepository } from './repository/user.repository'

@Module({
	imports: [PrismaModule],
	providers: [
		UserGQLResolver,
		UserService,
		PrismaService,
		{ provide: AbstractUserRepository, useClass: UserRepository },
	],
})
export class UserModule {}
