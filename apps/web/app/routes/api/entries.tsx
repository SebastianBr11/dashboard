import { json } from 'remix'
import type { LoaderFunction } from 'remix'
import prisma from '~/lib/db.server'
import { getFullEntry } from '~/lib/entries'

export const loader: LoaderFunction = async ({ request }) => {
	const entries = await prisma.entry.findMany()
	const fullEntries = entries.map(getFullEntry)
	return json({ entries: fullEntries }, 200)
}
