import { Test, TestingModule } from '@nestjs/testing'
import { AbstractUserRepository, UserModel } from '../repository/abstract.user.repository'
import { UserGQLResolver } from './user-gql-resolver'
import { UserService } from '../user.service'
import { Role } from '../domain/user-types'
import { AuthService } from '../../../infrastructure/auth/auth.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SignUpGQLInput } from './inputs/sign-up-gql-input'
import { User } from '../domain/user.entity'
import { HttpException } from '@nestjs/common'
import { SignInGQLInput } from './inputs/sign-in-gql-input'
import configuration from '../../../config/configuration'

describe('UserGQLResolver', () => {
	let userGQLResolver: UserGQLResolver
	let jwtService: JwtService
	let configService: ConfigService

	const users: UserModel[] = [
		{
			id: 1,
			email: 'john@doe.com',
			firstName: 'John',
			lastName: 'Doe',
			isConfirmed: true,
			role: Role.USER,
			phoneNumber: '380999999999',
			password: '$2a$10$6m.7Sn4jqb5ebx/RQLkSmuK1KsEpgVBlFQhXRMtWTk0lHPa2Z0z4q', // johndoe with 10 rounds salt
		},
	]

	const MockUserRepository: AbstractUserRepository = {
		create: jest.fn().mockImplementation((user: User) =>
			Promise.resolve({
				...user,
				isConfirmed: false,
				role: Role.USER,
				password: '$2a$10$EuuLLTc8VEwPUmSi8Umq2uHvtt5IBJiiXj19PIyvCQVPQpj25wmAu',
			}),
		),
		find: jest.fn().mockImplementation((options?: { email?: string; phoneNumber?: string }) => {
			let res: UserModel[]
			if (options?.email || options?.phoneNumber) {
				res = users.filter(
					(user) => user.email == options?.email || user?.phoneNumber == options.phoneNumber,
				)
			}

			if (options.email && !res?.length) return Promise.resolve([])
			return Promise.resolve(users)
		}),
		findById: jest.fn().mockImplementation((id: number) => Promise.resolve(users[id])),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({
					load: [configuration],
				}),
			],
			providers: [
				UserGQLResolver,
				UserService,
				AuthService,
				JwtService,
				{ provide: AbstractUserRepository, useValue: MockUserRepository },
			],
		}).compile()

		userGQLResolver = module.get<UserGQLResolver>(UserGQLResolver)
		jwtService = module.get<JwtService>(JwtService)
		configService = module.get(ConfigService)
	})

	describe('UserGQLResolver', () => {
		it('get users list', async () => {
			expect(await userGQLResolver.usersList()).toEqual(users)
		})

		it('get user by id', async () => {
			expect(await userGQLResolver.user(0)).toEqual(users[0])
		})

		it('signUp valid user', async () => {
			const signUpInput: SignUpGQLInput = {
				email: 'qwe@qwe.qwe',
				firstName: 'qwe',
				lastName: 'qwe',
				password: 'qwe',
				phoneNumber: '123',
			}

			expect(await userGQLResolver.signUp(signUpInput)).toEqual({
				...signUpInput,
				isConfirmed: false,
				role: Role.USER,
				password: '$2a$10$EuuLLTc8VEwPUmSi8Umq2uHvtt5IBJiiXj19PIyvCQVPQpj25wmAu',
			})
		})

		it('signUp user with taken data', async () => {
			const takenInput: SignUpGQLInput = {
				email: 'john@doe.com',
				firstName: 'John',
				lastName: 'Doe',
				password: 'johndoe',
				phoneNumber: '380999999999',
			}

			try {
				await userGQLResolver.signUp(takenInput)
			} catch (e) {
				expect(e).toBeInstanceOf(HttpException)
			}
		})

		it('signIn valid user', async () => {
			const signInInput: SignInGQLInput = {
				email: 'john@doe.com',
				password: 'johndoe',
			}

			const token = await userGQLResolver.signIn(signInInput)
			expect(
				await jwtService.verifyAsync(token, {
					secret: configService.get<string>('security.jwtSecret'),
				}),
			).toEqual({
				id: users[0].id,
				role: users[0].role,
				exp: expect.any(Number),
				iat: expect.any(Number),
			})
		})

		it('signIn with wrong password', async () => {
			const wrongPasswordInput: SignInGQLInput = {
				email: 'john@doe.com',
				password: 'qwe',
			}

			try {
				await userGQLResolver.signIn(wrongPasswordInput)
			} catch (e) {
				expect(e).toBeInstanceOf(HttpException)
			}
		})

		it('signIn with wrong email', async () => {
			const wrongEmailInput: SignInGQLInput = {
				email: 'qwe',
				password: 'johndoe',
			}

			try {
				await userGQLResolver.signIn(wrongEmailInput)
			} catch (e) {
				expect(e).toBeInstanceOf(HttpException)
			}
		})
	})
})
