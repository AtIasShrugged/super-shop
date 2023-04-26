import { Field, InputType } from '@nestjs/graphql'
import {
	IsEmail,
	IsNotEmpty,
	IsPhoneNumber,
	IsString,
	IsStrongPassword,
	MaxLength,
} from 'class-validator'

@InputType('SignUpInput')
export class SignUpGQLInput {
	@IsEmail()
	@IsNotEmpty()
	@Field(() => String)
	email!: string

	@IsPhoneNumber('UA')
	@IsNotEmpty()
	@Field(() => String)
	phoneNumber!: string

	@IsString()
	@IsNotEmpty()
	@Field(() => String)
	firstName!: string

	@IsString()
	@IsNotEmpty()
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
