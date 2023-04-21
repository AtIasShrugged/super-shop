import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AbstractUserRepository } from './repository/abstract.user.repository'
import { SignUpDto } from './dto/sign-up.dto'
import { User } from './user.entity'

@Injectable()
export class UserService {
	constructor(private repository: AbstractUserRepository) {}

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
}
