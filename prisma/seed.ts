import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	const iphone = await prisma.product.upsert({
		where: { ean: '194252708385' },
		update: {},
		create: {
			ean: '194252708385',
			name: 'Iphone 13',
			description: 'Apple Iphone 13 4/256gb Midnight',
			cost: 1000,
		},
	})
	const pixel = await prisma.product.upsert({
		where: { ean: '0840244700638' },
		update: {},
		create: {
			ean: '0840244700638',
			name: 'Pixel 7 Pro',
			description: 'Google Pixel 7 Pro 12/256gb Obsidian',
			cost: 900,
		},
	})

	console.log({ iphone, pixel })
}

main()
	.catch(async (e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
