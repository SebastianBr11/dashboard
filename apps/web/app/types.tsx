import { Entry } from '@prisma/client'

export type FullEntry = Entry & {
	extra?: {
		img: string
	}
}
