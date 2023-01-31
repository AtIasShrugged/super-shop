import { PartialPick } from 'src/helpers/types'

export type DTO = {
	id: number
	ean: string
	name: string
	description: string
	cost: number
}

export type CreateDTO = PartialPick<DTO, 'ean' | 'name' | 'description' | 'cost'>

export type UpdateDTO = Partial<Omit<DTO, 'id'>>
