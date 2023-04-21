import {
	IsStrongPassword,
	IsPhoneNumber,
	IsString,
	IsEmail,
	IsNotEmpty,
	MaxLength,
} from 'class-validator'

export class SignUpDto {
	@IsEmail()
	@IsNotEmpty()
	public email: string

	@IsString()
	@IsNotEmpty()
	@MaxLength(30)
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	})
	public password: string

	@IsString()
	@IsNotEmpty()
	public firstName: string

	@IsString()
	@IsNotEmpty()
	public lastName: string

	@IsPhoneNumber('UA')
	@IsNotEmpty()
	public phoneNumber: string
}
