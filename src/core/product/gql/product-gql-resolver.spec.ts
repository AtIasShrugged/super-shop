import { Test, TestingModule } from '@nestjs/testing'
import { ProductGQLResolver } from './product-gql-resolver'
import { ProductService } from '../product.service'
import {
	AbstractProductRepository,
	ProductFieldModel,
	ProductModel,
} from '../repository/abstract.product.repository'
import { StockStatus, UpdateProductDto } from '../domain/product-types'
import { Product } from '../domain/product.entity'
import { CreateProductGQLInput, UpdateProductGQLInput } from './inputs'

describe('ProductGQLResolver', () => {
	let productGQLResolver: ProductGQLResolver

	const productFields: ProductFieldModel[] = [
		{ id: 1, name: 'Processor', value: 'Apple A15 Bionic', description: 'Processor spec' },
	]
	const products: ProductModel[] = [
		{
			id: 1,
			brand: 'Apple',
			name: 'Iphone 14',
			description: 'Trash',
			cost: 1100,
			discount: 5,
			ean: '194252708385',
			category: {
				id: 1,
				name: 'Smartphone',
			},
			stockStatus: StockStatus.IN_STOCK,
			fields: productFields,
		},
	]

	const MockProductRepository: AbstractProductRepository = {
		create: jest.fn().mockImplementation((product: Product) =>
			Promise.resolve({
				...product,
				id: Date.now(),
				category: { id: Date.now(), name: product.category },
				fields: product.fields.map((field) => ({ ...field, id: Date.now() })),
			}),
		),
		update: jest.fn().mockImplementation((product: UpdateProductDto) =>
			Promise.resolve({
				...products[0],
				...product,
				category: products[0].category,
			}),
		),
		find: jest.fn().mockImplementation(() => Promise.resolve(products)),
		findById: jest.fn().mockImplementation((id: number) => Promise.resolve(products[id])),
		delete: jest.fn().mockImplementation((id: number) => Promise.resolve(products[id])),
		getProductFields: jest.fn().mockImplementation(() => Promise.resolve(productFields)),
		addFieldsToProduct: jest.fn().mockImplementation(() => Promise.resolve(productFields)),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductGQLResolver,
				ProductService,
				{ provide: AbstractProductRepository, useValue: MockProductRepository },
			],
		}).compile()

		productGQLResolver = module.get<ProductGQLResolver>(ProductGQLResolver)
	})

	describe('ProductGQLResolver', () => {
		it('get product by id', async () => {
			expect(await productGQLResolver.product(0)).toEqual(products[0])
			expect(await productGQLResolver.product(1)).toEqual(undefined)
		})

		it('get products list', async () => {
			expect(await productGQLResolver.productsList({})).toEqual(products)
		})

		it('create product', async () => {
			const product: CreateProductGQLInput = {
				ean: '123',
				name: 'TestPhone',
				description: 'Test',
				category: 'Smartphone',
				brand: 'Nothing',
				cost: 42,
				discount: 1,
				stockStatus: 'PENDING_SHIPMENT',
				fields: [
					{
						name: 'test field',
						value: 'test value',
						description: 'desc',
					},
				],
			}
			expect(await productGQLResolver.createProduct(product)).toEqual({
				...product,
				id: expect.any(Number),
				category: {
					id: expect.any(Number),
					name: product.category,
				},
				fields: product.fields.map((field) => ({
					id: expect.any(Number),
					...field,
				})),
			})
		})

		it('update product', async () => {
			const product: UpdateProductGQLInput = {
				id: 0,
				cost: 12345,
				ean: undefined,
				brand: undefined,
				category: undefined,
				description: undefined,
				discount: undefined,
				name: undefined,
				fields: undefined,
				stockStatus: undefined,
			}
			expect(await productGQLResolver.updateProduct(product)).toEqual({
				...products[0],
				cost: 12345,
			})
		})

		it('delete product', async () => {
			expect(await productGQLResolver.deleteProduct(0)).toEqual(products[0])
			expect(await productGQLResolver.deleteProduct(1)).toEqual(undefined)
		})

		it('add product fields', async () => {
			expect(await productGQLResolver.addFieldsToProduct(0, [])).toEqual(productFields)
		})
	})
})
