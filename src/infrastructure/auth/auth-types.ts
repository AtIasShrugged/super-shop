import { Role } from '../../core/user/domain/user-types'

export type AuthTokenDto = {
	id: number
	role?: Role
}

export type AuthPayload = {
	id: number
	exp: number
}
