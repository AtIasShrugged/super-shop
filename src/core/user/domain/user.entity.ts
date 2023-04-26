import { Entity } from '../../../domain/Entity'
import { UserDto, SignUpDto } from './user-types'
import * as bcrypt from 'bcrypt'

const PASSWORD_HASH_ROUNDS = Math.max(parseInt(process.env.PASSWORD_HASH_ROUNDS ?? ''), 0) || 10

export class User extends Entity<UserDto> {
	public email: string
	public password: string
	public firstName: string
	public lastName: string
	public phoneNumber: string
	public isConfirmed: boolean

	private constructor(dto: UserDto) {
		super()
		const { email, firstName, lastName, password = null, phoneNumber, isConfirmed = false } = dto
		this.email = email
		this.firstName = firstName
		this.lastName = lastName
		this.password = password
		this.phoneNumber = phoneNumber
		this.isConfirmed = isConfirmed
	}

	public static async signUp(dto: SignUpDto) {
		const user = new User(dto)
		await user.setPassword(dto.password)
		return user
	}

	public async setPassword(password: string) {
		const hash = await bcrypt.hash(password, PASSWORD_HASH_ROUNDS)
		this.password = hash
	}

	public async checkPassword(password: string) {
		if (!this.password) return false
		return await bcrypt.compare(password, this.password)
	}

	public toDto(): UserDto {
		const { email, firstName, lastName, password, phoneNumber } = this
		return { email, firstName, lastName, password, phoneNumber }
	}
}
