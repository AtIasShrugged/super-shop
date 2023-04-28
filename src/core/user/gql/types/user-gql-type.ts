import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Role } from '../../domain/user-types'

registerEnumType(Role, { name: 'Role' })

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

	@Field(() => Role)
	role: Role
}
