import { UserRole } from '../../core/user/domain/user-types'

export type AuthTokenDto = {
	id: number
	role?: UserRole
}

export type AuthPayload = {
	id: number
	exp: number
}
