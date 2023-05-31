import { UserDto, SignUpDto, Role } from './user-types'
import * as bcrypt from 'bcrypt'

const PASSWORD_HASH_ROUNDS = Math.max(parseInt(process.env.PASSWORD_HASH_ROUNDS ?? ''), 0) || 10

export class User {
	public email: string
	public password: string
	public firstName: string
	public lastName: string
	public phoneNumber: string
	public role: Role
	public isConfirmed: boolean

	private constructor(dto: UserDto) {
		const {
			email,
			firstName,
			lastName,
			password = null,
			phoneNumber,
			role = Role.USER,
			isConfirmed = false,
		} = dto
		this.email = email
		this.firstName = firstName
		this.lastName = lastName
		this.password = password
		this.phoneNumber = phoneNumber
		this.role = role
		this.isConfirmed = isConfirmed
	}

	public static create(dto: UserDto) {
		const user = new User(dto)
		return user
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
}
