import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserGQLType } from './types/user-gql-type'
import { UserService } from '../user.service'
import { SignUpGQLInput } from './inputs/sign-up-gql-input'

@Resolver(() => UserGQLType)
export class UserGQLResolver {
	constructor(private userService: UserService) {}

	@Query(() => [UserGQLType])
	usersList() {
		return this.userService.findUsers()
	}

	@Query(() => UserGQLType)
	user(@Args('id', { type: () => Int }) id: number) {
		return this.userService.findUserById(id)
	}

	@Mutation(() => UserGQLType)
	async signUp(@Args('signUpInput') signUpInput: SignUpGQLInput) {
		const product = await this.userService.signUp(signUpInput)
		return product
	}
}
