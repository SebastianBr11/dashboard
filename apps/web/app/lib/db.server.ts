import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

declare global {
	var prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient()
	prisma.$connect()
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient()
		global.prisma.$connect()
	}
	prisma = global.prisma
}

export default prisma
