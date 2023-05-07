import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthPayload, AuthTokenDto } from './auth-types'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService, private configService: ConfigService) {}

	async createAuthToken({ id, role }: AuthTokenDto) {
		const ttl = this.configService.get<number>('security.authTokenTtl')
		const jwtSecret = this.configService.get<string>('security.jwtSecret')

		const payload: AuthPayload = {
			id,
			role,
			exp: Math.floor(Date.now() / 1000) + ttl,
		}

		const token = await this.jwtService.signAsync(payload, { secret: jwtSecret })
		return token
	}
}
