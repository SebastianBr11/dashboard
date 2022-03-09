import { json } from 'remix'
import type { LoaderFunction } from 'remix'
import prisma from '~/lib/db.server'
import { getFullEntry } from '~/lib/entries'
import { FullEntry } from '~/types'

export const loader: LoaderFunction = async ({ request }) => {
	const entries = await prisma.entry.findMany()
	const fullEntries = entries.map(getFullEntry)
	return json({ entries: fullEntries }, 200)
}

export type LoaderData = { entries: FullEntry[] }
