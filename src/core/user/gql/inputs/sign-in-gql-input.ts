import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength } from 'class-validator'

@InputType('SignInInput')
export class SignInGQLInput {
	@IsEmail()
	@IsNotEmpty()
	@Field(() => String)
	email!: string

	@IsNotEmpty()
	@MaxLength(30)
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
	})
	@Field(() => String)
	password!: string
}
