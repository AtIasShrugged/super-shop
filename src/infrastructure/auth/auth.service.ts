import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthPayload, AuthTokenDto } from './auth-types'

const ttl = process.env.authTokenTtl || 120
const jwtSecret = process.env.jwtSecret || 'alpine'

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	async createAuthToken({ id }: AuthTokenDto) {
		const payload: AuthPayload = {
			id,
			exp: Math.floor(Date.now() / 1000) + +ttl,
		}

		const token = await this.jwtService.signAsync(payload, { secret: jwtSecret })
		return token
	}

	// async verifyAuthToken(token: string) {
	// 	try {
	// 		const context = await this.jwtService.verifyAsync(token, { secret: jwtSecret })
	// 		return context
	// 	} catch (err) {
	// 		console.log(err)
	// 		return null
	// 	}
	// }
}
