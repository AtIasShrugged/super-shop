import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard, RolesGuard } from '../../../infrastructure/guards'
import { Roles } from '../../../infrastructure/decorators/roles.decorator'
import { UserGQLType } from './types/user-gql-type'
import { UserService } from '../user.service'
import { SignUpGQLInput } from './inputs/sign-up-gql-input'
import { SignInGQLInput } from './inputs/sign-in-gql-input'
import { Role } from '../domain/user-types'

@Resolver(() => UserGQLType)
export class UserGQLResolver {
	constructor(private userService: UserService) {}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	@Query(() => [UserGQLType])
	usersList() {
		return this.userService.findUsers()
	}

	@UseGuards(JwtAuthGuard)
	@Query(() => UserGQLType)
	user(@Args('id', { type: () => Int }) id: number) {
		return this.userService.findUserById(id)
	}

	@Mutation(() => UserGQLType)
	async signUp(@Args('signUpInput') signUpInput: SignUpGQLInput) {
		const product = await this.userService.signUp(signUpInput)
		return product
	}

	@Mutation(() => String)
	async signIn(@Args('signInInput') { email, password }: SignInGQLInput) {
		const token = await this.userService.signIn(email, password)
		return token
	}
}
