import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserGQLResolver } from './gql/user-gql-resolver'
import { PrismaModule } from '../../infrastructure/prisma/prisma.module'
import { PrismaService } from '../../infrastructure/prisma/prisma.service'
import { AbstractUserRepository } from './repository/abstract.user.repository'
import { UserRepository } from './repository/user.repository'
import { AuthModule } from '../../infrastructure/auth/auth.module'
import { AuthService } from '../../infrastructure/auth/auth.service'
import { JwtService } from '@nestjs/jwt'

@Module({
	imports: [PrismaModule, AuthModule],
	providers: [
		UserGQLResolver,
		UserService,
		PrismaService,
		AuthService,
		JwtService,
		{ provide: AbstractUserRepository, useClass: UserRepository },
	],
})
export class UserModule {}
