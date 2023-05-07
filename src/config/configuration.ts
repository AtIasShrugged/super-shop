export default () => ({
	database: {
		dbname: process.env.DATABASE_NAME || 'postgres',
		host: process.env.DATABASE_HOST || 'localhost',
		port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
		user: process.env.DATABASE_USER || 'admin',
		pass: process.env.DATABASE_PASS || 'admin',
	},
	security: {
		authTokenTtl: parseInt(process.env.AUTH_TOKEN_TTL, 10) || 120,
		jwtSecret: process.env.JWT_SECRET || 'secret',
	},
	admin: {
		email: process.env.ADMIN_EMAIL || 'qwe@qwe.qwe',
		phoneNumber: process.env.ADMIN_PHONE_NUMBER || '380999999999',
		password: process.env.ADMIN_PASSWORD || '',
	},
})
