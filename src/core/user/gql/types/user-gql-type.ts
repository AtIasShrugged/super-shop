import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('User')
export class UserGQLType {
	@Field(() => ID)
	id!: number

	@Field(() => String)
	email!: string

	@Field(() => String)
	phoneNumber!: string

	@Field(() => String)
	firstName!: string

	@Field(() => String)
	lastName!: string
}
