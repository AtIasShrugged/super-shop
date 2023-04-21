import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword, MaxLength } from 'class-validator'

@InputType('SignUpInput')
export class SignUpGQLInput {
	@IsEmail()
	@Field(() => String)
	email!: string

	@IsPhoneNumber('UA')
	@Field(() => String)
	phoneNumber!: string

	@Field(() => String)
	firstName!: string

	@Field(() => String)
	lastName!: string

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
