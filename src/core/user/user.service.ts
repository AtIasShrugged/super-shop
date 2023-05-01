import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AbstractUserRepository } from './repository/abstract.user.repository'
import { SignUpDto } from './domain/user-types'
import { User } from './domain/user.entity'
import { AuthService } from '../../infrastructure/auth/auth.service'

@Injectable()
export class UserService {
	constructor(private repository: AbstractUserRepository, private authService: AuthService) {}

	public async findUsers() {
		const users = await this.repository.find({})
		return users
	}

	public async findUserById(id: number) {
		const user = await this.repository.findById(id)
		return user
	}

	public async signUp(dto: SignUpDto) {
		const { email, phoneNumber } = dto
		const [user] = await this.repository.find({ email, phoneNumber })

		if (user) {
			throw new HttpException('Email or phone number already in use', HttpStatus.BAD_REQUEST)
		}

		const newUserEntity = await User.signUp(dto)
		const newUser = await this.repository.create(newUserEntity)

		return newUser
	}

	public async signIn(email: string, password: string) {
		const [user] = await this.repository.find({ email })
		if (!user) {
			throw new HttpException('Wrong email or password', HttpStatus.BAD_REQUEST)
		}

		const userEntity = User.create(user)

		if (!userEntity.checkPassword(password)) {
			throw new HttpException('Wrong email or password', HttpStatus.BAD_REQUEST)
		}

		return this.authService.createAuthToken({ id: user.id, role: user.role })
	}
}
