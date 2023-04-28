import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthPayload, AuthTokenDto } from './auth-types'

const ttl = process.env.authTokenTtl || 120
const jwtSecret = process.env.jwtSecret || 'alpine'

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	async createAuthToken({ id, role }: AuthTokenDto) {
		const payload: AuthPayload = {
			id,
			role,
			exp: Math.floor(Date.now() / 1000) + +ttl,
		}

		const token = await this.jwtService.signAsync(payload, { secret: jwtSecret })
		return token
	}
}
