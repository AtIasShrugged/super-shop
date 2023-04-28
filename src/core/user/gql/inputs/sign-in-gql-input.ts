import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty } from 'class-validator'

@InputType('SignInInput')
export class SignInGQLInput {
	@IsEmail()
	@IsNotEmpty()
	@Field(() => String)
	email!: string

	@IsNotEmpty()
	@Field(() => String)
	password!: string
}
